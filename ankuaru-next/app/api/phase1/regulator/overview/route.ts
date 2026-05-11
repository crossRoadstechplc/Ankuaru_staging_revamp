import { NextRequest, NextResponse } from "next/server";
import { actorFromRequest } from "@/lib/phase1/auth";
import { readPhase1Store } from "@/lib/phase1/store";

export async function GET(req: NextRequest) {
  const actor = actorFromRequest(req);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Regulator" && actor.role !== "Admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const store = await readPhase1Store();

  // Regulator gets a read-only redacted view — no owner/custodian identity details
  const redactedLots = store.lots.map(({ farmerId: _f, custodianId: _c, ...rest }) => rest);

  const oversightEvents = store.events
    .filter((e) =>
      ["AGGREGATE", "PROCESS", "DISPATCH", "RECEIPT", "LAB_RESULT", "BANK_APPROVED", "VALIDATE_LOT"].includes(
        e.type,
      ),
    )
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 50);

  return NextResponse.json({
    stats: {
      totalLots: store.lots.length,
      totalEvents: store.events.length,
      totalFields: store.fields.length,
      labResults: store.labResults.length,
      bankReviews: store.bankReviews.length,
    },
    lots: redactedLots,
    oversightEvents,
  });
}
