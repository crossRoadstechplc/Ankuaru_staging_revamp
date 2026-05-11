import { NextRequest, NextResponse } from "next/server";
import { actorFromRequest } from "@/lib/phase1/auth";
import { readPhase1Store, writePhase1Store } from "@/lib/phase1/store";
import { makeId } from "@/lib/phase1/ids";
import type { Event, LabResult, LabStatus } from "@/lib/phase1/types";

export async function GET(req: NextRequest) {
  const actor = actorFromRequest(req);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Lab" && actor.role !== "Admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const store = await readPhase1Store();
  return NextResponse.json({ labResults: store.labResults });
}

export async function POST(req: NextRequest) {
  const actor = actorFromRequest(req);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Lab") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  let body: { lotId: string; status: LabStatus; score?: number; notes?: string };
  try {
    body = (await req.json()) as { lotId: string; status: LabStatus; score?: number; notes?: string };
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const { lotId, status, score, notes } = body;
  if (!lotId || !status) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }
  if (!["PENDING", "APPROVED", "FAILED"].includes(status)) {
    return NextResponse.json({ message: "Invalid status value." }, { status: 400 });
  }

  const store = await readPhase1Store();
  const lot = store.lots.find((l) => l.id === lotId);
  if (!lot) return NextResponse.json({ message: "Lot not found." }, { status: 404 });
  if (lot.status !== "AT_LAB") {
    return NextResponse.json({ message: "Lot is not at lab." }, { status: 409 });
  }

  const now = new Date().toISOString();

  // Determine next lot status based on lab decision
  const nextLotStatus =
    status === "APPROVED" ? "READY_FOR_EXPORT" :
    status === "FAILED" ? "QUARANTINED" :
    "AT_LAB";

  const labResult: LabResult = {
    id: makeId("lab"),
    lotId,
    labUserId: actor.userId,
    status,
    score: typeof score === "number" ? score : undefined,
    notes: notes?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };

  const labEvent: Event = {
    id: makeId("evt"),
    type: "LAB_RESULT",
    timestamp: now,
    actorId: actor.userId,
    actorRole: "Lab",
    inputLotIds: [lotId],
    outputLotIds: [lotId],
    metadata: {
      labResultId: labResult.id,
      labStatus: status,
      ...(typeof score === "number" ? { score } : {}),
      ...(notes ? { notes } : {}),
    },
  };

  const updatedLots = store.lots.map((l) =>
    l.id === lotId
      ? { ...l, status: nextLotStatus, labStatus: status, updatedAt: now }
      : l,
  );

  await writePhase1Store({
    ...store,
    lots: updatedLots,
    labResults: [...store.labResults, labResult],
    events: [...store.events, labEvent],
  });

  return NextResponse.json({ labResult, newLotStatus: nextLotStatus }, { status: 201 });
}
