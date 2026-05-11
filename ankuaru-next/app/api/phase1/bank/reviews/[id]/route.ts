import { NextRequest, NextResponse } from "next/server";
import { actorFromRequest } from "@/lib/phase1/auth";
import { readPhase1Store, writePhase1Store } from "@/lib/phase1/store";
import { makeId } from "@/lib/phase1/ids";
import type { BankReviewStatus, Event } from "@/lib/phase1/types";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const actor = actorFromRequest(req);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Bank" && actor.role !== "Admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const store = await readPhase1Store();
  const review = store.bankReviews.find((r) => r.id === id);
  if (!review) return NextResponse.json({ message: "Not found." }, { status: 404 });
  return NextResponse.json({ bankReview: review });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const actor = actorFromRequest(req);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Bank") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { id } = await params;
  let body: {
    reviewStatus?: BankReviewStatus;
    financialAssessment?: string;
    backgroundCheckStatus?: string;
    notes?: string;
  };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const store = await readPhase1Store();
  const review = store.bankReviews.find((r) => r.id === id);
  if (!review) return NextResponse.json({ message: "Not found." }, { status: 404 });

  const now = new Date().toISOString();
  const newStatus = body.reviewStatus ?? review.reviewStatus;
  const isApproved = newStatus === "APPROVED";
  const isRejected = newStatus === "REJECTED";

  const updatedReview = {
    ...review,
    reviewStatus: newStatus,
    financialAssessment: body.financialAssessment ?? review.financialAssessment,
    backgroundCheckStatus: body.backgroundCheckStatus ?? review.backgroundCheckStatus,
    notes: body.notes ?? review.notes,
    approvedAt: isApproved && !review.approvedAt ? now : review.approvedAt,
    rejectedAt: isRejected && !review.rejectedAt ? now : review.rejectedAt,
    updatedAt: now,
  };

  // Emit BANK_APPROVED event when status moves to APPROVED
  const newEvents: Event[] = [];
  if (isApproved && review.reviewStatus !== "APPROVED") {
    newEvents.push({
      id: makeId("evt"),
      type: "BANK_APPROVED",
      timestamp: now,
      actorId: actor.userId,
      actorRole: "Bank",
      inputLotIds: [],
      outputLotIds: [],
      metadata: {
        reviewId: id,
        applicantUserId: review.applicantUserId,
      },
    });
  }

  const updatedReviews = store.bankReviews.map((r) => (r.id === id ? updatedReview : r));
  await writePhase1Store({
    ...store,
    bankReviews: updatedReviews,
    events: [...store.events, ...newEvents],
  });

  return NextResponse.json({ bankReview: updatedReview });
}
