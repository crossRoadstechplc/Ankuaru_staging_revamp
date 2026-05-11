import { NextResponse } from "next/server";
import { actorFromRequest } from "@/lib/phase1/auth";
import { readPhase1Store, writePhase1Store } from "@/lib/phase1/store";
import { makeId, nowIso, makeLotCode } from "@/lib/phase1/ids";
import type { Event, Lot } from "@/lib/phase1/types";

export async function GET(request: Request) {
  const actor = actorFromRequest(request);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const store = await readPhase1Store();
  const lots = actor.role === "Admin" ? store.lots : store.lots.filter((l) => l.farmerId === actor.userId);
  return NextResponse.json({ lots });
}

export async function POST(request: Request) {
  const actor = actorFromRequest(request);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Farmer" && actor.role !== "Admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as { weightKg?: number; fieldId?: string; farmerId?: string };
  const weightKg = Number(body.weightKg);
  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    return NextResponse.json({ message: "weightKg must be a positive number." }, { status: 400 });
  }

  const farmerId = actor.role === "Admin" ? (body.farmerId?.trim() || "") : actor.userId;
  if (!farmerId) return NextResponse.json({ message: "farmerId is required." }, { status: 400 });

  const store = await readPhase1Store();
  const fieldId = body.fieldId?.trim() || undefined;
  if (fieldId) {
    const field = store.fields.find((f) => f.id === fieldId);
    if (!field) return NextResponse.json({ message: "Invalid fieldId." }, { status: 400 });
    if (actor.role !== "Admin" && field.farmerId !== actor.userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  }

  const ts = nowIso();
  const lot: Lot = {
    id: makeId("lot"),
    publicLotCode: makeLotCode("LOT"),
    farmerId,
    fieldId,
    form: "CHERRY",
    weightKg,
    status: "AT_FARM",
    validationStatus: "PENDING",
    createdAt: ts,
    updatedAt: ts,
  };

  const event: Event = {
    id: makeId("evt"),
    type: "PICK",
    timestamp: ts,
    actorId: farmerId,
    actorRole: "Farmer",
    inputLotIds: [],
    outputLotIds: [lot.id],
    metadata: fieldId ? { fieldId } : undefined,
  };

  store.lots.push(lot);
  store.events.push(event);
  await writePhase1Store(store);

  return NextResponse.json({ lot, event }, { status: 201 });
}

