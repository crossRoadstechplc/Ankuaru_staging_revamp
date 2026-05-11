import { NextResponse } from "next/server";
import { actorFromRequest } from "@/lib/phase1/auth";
import { readPhase1Store } from "@/lib/phase1/store";

export async function GET(request: Request) {
  const actor = actorFromRequest(request);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const store = await readPhase1Store();
  const broadAccessRoles = ["Admin", "Aggregator", "Processor", "Transporter"];
  if (broadAccessRoles.includes(actor.role)) {
    return NextResponse.json({ lots: store.lots });
  }

  // Farmers use the farmer lots endpoint (scoped).
  return NextResponse.json({ message: "Forbidden" }, { status: 403 });
}

