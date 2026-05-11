import { NextResponse } from "next/server";
import { actorFromRequest } from "@/lib/phase1/auth";
import { readPhase1Store, writePhase1Store } from "@/lib/phase1/store";
import { makeId, nowIso, makeLotCode } from "@/lib/phase1/ids";
import type { Event, Lot } from "@/lib/phase1/types";

export async function POST(request: Request) {
  const actor = actorFromRequest(request);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Aggregator" && actor.role !== "Admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as { inputLotIds?: string[]; outputWeightKg?: number };
  const inputLotIds = Array.isArray(body.inputLotIds) ? body.inputLotIds.map((s) => String(s).trim()).filter(Boolean) : [];
  if (inputLotIds.length < 2) {
    return NextResponse.json({ message: "inputLotIds must include at least 2 lots." }, { status: 400 });
  }

  const store = await readPhase1Store();
  const inputs = inputLotIds.map((id) => store.lots.find((l) => l.id === id)).filter(Boolean) as Lot[];
  if (inputs.length !== inputLotIds.length) {
    return NextResponse.json({ message: "One or more input lots not found." }, { status: 404 });
  }

  const invalid = inputs.find((l) => l.validationStatus !== "VALIDATED" || l.status !== "AT_FARM");
  if (invalid) {
    return NextResponse.json(
      { message: "All input lots must be VALIDATED and AT_FARM before aggregation." },
      { status: 409 },
    );
  }

  const ts = nowIso();
  const sumKg = inputs.reduce((acc, l) => acc + (Number.isFinite(l.weightKg) ? l.weightKg : 0), 0);
  const outputWeightKg =
    typeof body.outputWeightKg === "number" && Number.isFinite(body.outputWeightKg) && body.outputWeightKg > 0
      ? body.outputWeightKg
      : sumKg;

  const out: Lot = {
    id: makeId("lot"),
    publicLotCode: makeLotCode("AGG"),
    farmerId: "—",
    form: "CHERRY",
    weightKg: outputWeightKg,
    status: "READY_FOR_PROCESSING",
    validationStatus: "VALIDATED",
    createdAt: ts,
    updatedAt: ts,
  };

  const event: Event = {
    id: makeId("evt"),
    type: "AGGREGATE",
    timestamp: ts,
    actorId: actor.userId,
    actorRole: actor.role,
    inputLotIds,
    outputLotIds: [out.id],
    metadata: { outputWeightKg, inputCount: inputLotIds.length },
  };

  store.lots.push(out);
  store.events.push(event);
  await writePhase1Store(store);

  return NextResponse.json({ outputLot: out, event }, { status: 201 });
}

