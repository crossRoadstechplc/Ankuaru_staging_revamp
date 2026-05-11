import { NextRequest, NextResponse } from "next/server";
import { actorFromRequest } from "@/lib/phase1/auth";
import { readPhase1Store } from "@/lib/phase1/store";

export async function GET(req: NextRequest) {
  const actor = actorFromRequest(req);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Processor" && actor.role !== "Admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const store = await readPhase1Store();
  const queue = store.lots.filter((l) => l.status === "READY_FOR_PROCESSING");

  return NextResponse.json({ lots: queue });
}
