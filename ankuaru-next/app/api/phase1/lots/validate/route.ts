import { NextResponse } from "next/server";
import { actorFromRequest } from "@/lib/phase1/auth";
import { readPhase1Store, writePhase1Store } from "@/lib/phase1/store";
import { makeId, nowIso } from "@/lib/phase1/ids";
import type { Event } from "@/lib/phase1/types";

export async function POST(request: Request) {
  const actor = actorFromRequest(request);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Aggregator" && actor.role !== "Admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as {
    lotId?: string;
    decision?: "VALIDATED" | "REJECTED";
    observedWeightKg?: number;
  };

  const lotId = body.lotId?.trim();
  if (!lotId) return NextResponse.json({ message: "lotId is required." }, { status: 400 });
  if (body.decision !== "VALIDATED" && body.decision !== "REJECTED") {
    return NextResponse.json({ message: "decision must be VALIDATED or REJECTED." }, { status: 400 });
  }

  const store = await readPhase1Store();
  const idx = store.lots.findIndex((l) => l.id === lotId);
  if (idx < 0) return NextResponse.json({ message: "Not found" }, { status: 404 });

  const lot = store.lots[idx];
  if (lot.validationStatus !== "PENDING") {
    return NextResponse.json({ message: "Lot is not pending validation." }, { status: 409 });
  }

  const ts = nowIso();
  const nextLot = {
    ...lot,
    validationStatus: body.decision,
    updatedAt: ts,
    weightKg:
      typeof body.observedWeightKg === "number" && Number.isFinite(body.observedWeightKg) && body.observedWeightKg > 0
        ? body.observedWeightKg
        : lot.weightKg,
    status: body.decision === "REJECTED" ? "QUARANTINED" : lot.status,
  } as const;

  const event: Event = {
    id: makeId("evt"),
    type: "VALIDATE_LOT",
    timestamp: ts,
    actorId: actor.userId,
    actorRole: actor.role,
    inputLotIds: [lotId],
    outputLotIds: [lotId],
    metadata: {
      decision: body.decision,
      observedWeightKg:
        typeof body.observedWeightKg === "number" && Number.isFinite(body.observedWeightKg) ? body.observedWeightKg : undefined,
    },
  };

  store.lots[idx] = nextLot;
  store.events.push(event);
  await writePhase1Store(store);

  return NextResponse.json({ lot: nextLot, event });
}

