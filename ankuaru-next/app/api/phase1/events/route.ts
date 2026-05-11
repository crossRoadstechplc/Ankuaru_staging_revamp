import { NextResponse } from "next/server";
import { actorFromRequest } from "@/lib/phase1/auth";
import { readPhase1Store } from "@/lib/phase1/store";

export async function GET(request: Request) {
  const actor = actorFromRequest(request);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Admin") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const store = await readPhase1Store();
  return NextResponse.json({ events: store.events });
}

