import { NextRequest, NextResponse } from "next/server";
import { actorFromRequest } from "@/lib/phase1/auth";
import { readPhase1Store, writePhase1Store } from "@/lib/phase1/store";
import { makeId } from "@/lib/phase1/ids";
import type { BankReview } from "@/lib/phase1/types";

export async function GET(req: NextRequest) {
  const actor = actorFromRequest(req);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Bank" && actor.role !== "Admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const store = await readPhase1Store();
  return NextResponse.json({ bankReviews: store.bankReviews });
}

export async function POST(req: NextRequest) {
  const actor = actorFromRequest(req);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Bank" && actor.role !== "Admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  let body: { applicantUserId: string; notes?: string };
  try {
    body = (await req.json()) as { applicantUserId: string; notes?: string };
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (!body.applicantUserId?.trim()) {
    return NextResponse.json({ message: "Applicant user ID is required." }, { status: 400 });
  }

  const now = new Date().toISOString();
  const review: BankReview = {
    id: makeId("bnk"),
    applicantUserId: body.applicantUserId.trim(),
    reviewerBankUserId: actor.userId,
    reviewStatus: "PENDING_REVIEW",
    notes: body.notes?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };

  const store = await readPhase1Store();
  await writePhase1Store({ ...store, bankReviews: [...store.bankReviews, review] });
  return NextResponse.json({ bankReview: review }, { status: 201 });
}
