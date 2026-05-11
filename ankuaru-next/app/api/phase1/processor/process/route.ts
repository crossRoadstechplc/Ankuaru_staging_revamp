import { NextRequest, NextResponse } from "next/server";
import { actorFromRequest } from "@/lib/phase1/auth";
import { readPhase1Store, writePhase1Store } from "@/lib/phase1/store";
import { makeId, makeLotCode } from "@/lib/phase1/ids";
import type { Lot, Event, ByproductKind, LotForm, ProcessingMethod } from "@/lib/phase1/types";

const MASS_BALANCE_EPSILON = 0.01;

type ByproductInput = {
  kind: ByproductKind;
  weightKg: number;
};

type ProcessRequest = {
  inputLotId: string;
  inputWeightKg: number;
  outputWeightKg: number;
  outputForm: Exclude<LotForm, "BYPRODUCT">;
  processingMethod: ProcessingMethod;
  byproducts?: ByproductInput[];
};

export async function POST(req: NextRequest) {
  const actor = actorFromRequest(req);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Processor") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  let body: ProcessRequest;
  try {
    body = (await req.json()) as ProcessRequest;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const { inputLotId, inputWeightKg, outputWeightKg, outputForm, processingMethod, byproducts = [] } = body;

  if (!inputLotId || !inputWeightKg || !outputWeightKg || !outputForm || !processingMethod) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }
  if (outputForm === "BYPRODUCT") {
    return NextResponse.json({ message: "Output form cannot be BYPRODUCT." }, { status: 400 });
  }

  const store = await readPhase1Store();
  const inputLot = store.lots.find((l) => l.id === inputLotId);

  if (!inputLot) return NextResponse.json({ message: "Lot not found." }, { status: 404 });
  if (inputLot.status !== "READY_FOR_PROCESSING") {
    return NextResponse.json({ message: "Lot is not ready for processing." }, { status: 409 });
  }
  if (inputWeightKg > inputLot.weightKg + MASS_BALANCE_EPSILON) {
    return NextResponse.json({ message: "Input weight exceeds lot weight." }, { status: 400 });
  }

  // Mass balance check
  const byproductTotal = byproducts.reduce((sum, b) => sum + b.weightKg, 0);
  const balanceDiff = Math.abs(inputWeightKg - outputWeightKg - byproductTotal);
  if (balanceDiff > MASS_BALANCE_EPSILON) {
    return NextResponse.json(
      {
        message: `Mass balance failed: inputWeightKg (${inputWeightKg}) must equal outputWeightKg (${outputWeightKg}) + byproducts (${byproductTotal}).`,
      },
      { status: 400 },
    );
  }

  const now = new Date().toISOString();

  // Create primary output lot
  const primaryOutputLot: Lot = {
    id: makeId("lot"),
    publicLotCode: makeLotCode(),
    farmerId: inputLot.farmerId,
    fieldId: inputLot.fieldId,
    form: outputForm,
    weightKg: outputWeightKg,
    status: "IN_PROCESSING",
    validationStatus: "VALIDATED",
    parentLotIds: [inputLotId],
    processingMethod,
    custodianId: actor.userId,
    custodianRole: "Processor",
    createdAt: now,
    updatedAt: now,
  };

  // Create byproduct lots
  const byproductLots: Lot[] = byproducts
    .filter((b) => b.weightKg > 0)
    .map((b) => ({
      id: makeId("lot"),
      publicLotCode: makeLotCode(),
      farmerId: inputLot.farmerId,
      fieldId: inputLot.fieldId,
      form: "BYPRODUCT" as const,
      weightKg: b.weightKg,
      status: "IN_PROCESSING" as const,
      validationStatus: "VALIDATED" as const,
      parentLotIds: [inputLotId],
      processingMethod,
      byproductKind: b.kind,
      custodianId: actor.userId,
      custodianRole: "Processor",
      createdAt: now,
      updatedAt: now,
    }));

  const allOutputLots = [primaryOutputLot, ...byproductLots];
  const outputLotIds = allOutputLots.map((l) => l.id);

  // Update input lot: reduce weight or close it
  const remainingWeight = inputLot.weightKg - inputWeightKg;
  const updatedInputLot: Lot = {
    ...inputLot,
    weightKg: Math.max(0, remainingWeight),
    status: remainingWeight <= MASS_BALANCE_EPSILON ? "CLOSED" : "READY_FOR_PROCESSING",
    childLotIds: [...(inputLot.childLotIds ?? []), ...outputLotIds],
    updatedAt: now,
  };

  // Create PROCESS event
  const processEvent: Event = {
    id: makeId("evt"),
    type: "PROCESS",
    timestamp: now,
    actorId: actor.userId,
    actorRole: "Processor",
    inputLotIds: [inputLotId],
    outputLotIds,
    metadata: {
      processingMethod,
      primaryOutputLotId: primaryOutputLot.id,
      byproductLotIds: byproductLots.map((l) => l.id),
      inputWeightKg,
      outputWeightKg,
      byproductTotal,
      massBalanceCheck: "passed",
    },
  };

  const updatedLots = store.lots.map((l) => (l.id === inputLotId ? updatedInputLot : l));
  await writePhase1Store({
    ...store,
    lots: [...updatedLots, ...allOutputLots],
    events: [...store.events, processEvent],
  });

  return NextResponse.json(
    {
      event: processEvent,
      primaryOutputLot,
      byproductLots,
      inputLotClosed: updatedInputLot.status === "CLOSED",
    },
    { status: 201 },
  );
}
