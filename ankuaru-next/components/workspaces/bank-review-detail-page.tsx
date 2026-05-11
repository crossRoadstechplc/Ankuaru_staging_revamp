"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RoleShell } from "@/components/role-shell";
import { NAV_BY_ROLE } from "@/lib/phase1/nav";
import { phase1Fetch } from "@/lib/phase1/client";
import type { BankReview, BankReviewStatus } from "@/lib/phase1/types";
import { useAppStore } from "@/lib/store/useAppStore";

const STATUS_OPTIONS: { value: BankReviewStatus; label: string }[] = [
  { value: "PENDING_REVIEW", label: "Pending review" },
  { value: "BACKGROUND_CHECK_IN_PROGRESS", label: "Background check in progress" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

export function BankReviewDetailPage({ reviewId }: { reviewId: string }) {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [review, setReview] = useState<BankReview | null>(null);
  const [reviewStatus, setReviewStatus] = useState<BankReviewStatus>("PENDING_REVIEW");
  const [financialAssessment, setFinancialAssessment] = useState("");
  const [backgroundCheckStatus, setBackgroundCheckStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (!authUser || authUser.role !== "Bank") return;
      try {
        const res = await phase1Fetch<{ bankReview: BankReview }>(
          authUser, `/api/phase1/bank/reviews/${reviewId}`,
        );
        if (!canceled && res.bankReview) {
          setReview(res.bankReview);
          setReviewStatus(res.bankReview.reviewStatus);
          setFinancialAssessment(res.bankReview.financialAssessment ?? "");
          setBackgroundCheckStatus(res.bankReview.backgroundCheckStatus ?? "");
          setNotes(res.bankReview.notes ?? "");
        }
      } catch {
        // silent
      }
    };
    void run();
    return () => { canceled = true; };
  }, [authUser, reviewId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser || !review) return;
    setError("");
    setSubmitting(true);
    try {
      const res = await phase1Fetch<{ bankReview: BankReview }>(
        authUser,
        `/api/phase1/bank/reviews/${reviewId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            reviewStatus,
            financialAssessment: financialAssessment || undefined,
            backgroundCheckStatus: backgroundCheckStatus || undefined,
            notes: notes || undefined,
          }),
        },
      );
      setReview(res.bankReview);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!authUser || authUser.role !== "Bank") return null;

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "8px 10px", border: "1px solid var(--border)", borderRadius: 7,
    background: "#fff", fontSize: 13, color: "var(--tx)", fontFamily: "inherit",
  };

  const inputField = (label: string, element: React.ReactNode) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--tx2)", marginBottom: 4 }}>
        {label}
      </label>
      {element}
    </div>
  );

  return (
    <RoleShell role="Bank" navItems={NAV_BY_ROLE.Bank}>
      <div style={{ padding: 16, maxWidth: 580 }}>
        <Link
          href="/bank/onboarding"
          style={{ fontSize: 11, color: "var(--tx3)", textDecoration: "none", marginBottom: 14, display: "inline-block" }}
        >
          ← Back to Onboarding
        </Link>
        <div
          style={{
            fontSize: 10, fontWeight: 700, letterSpacing: ".12em",
            textTransform: "uppercase", color: "var(--amber)", marginBottom: 4,
          }}
        >
          Bank
        </div>
        <div style={{ fontWeight: 800, fontSize: 18, color: "var(--tx)", marginBottom: 4 }}>
          Onboarding Review
        </div>

        {review && (
          <div
            style={{
              padding: "10px 14px", borderRadius: 9, background: "var(--bg)",
              border: "1px solid var(--border2)", fontSize: 12, color: "var(--tx2)", marginBottom: 20,
            }}
          >
            Applicant: <strong style={{ color: "var(--tx)" }}>{review.applicantUserId}</strong>
            {" · "}Opened {review.createdAt.slice(0, 10)}
          </div>
        )}

        {!review ? (
          <div style={{ fontSize: 13, color: "var(--tx3)" }}>Loading review…</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div
              style={{
                border: "1px solid var(--border)", borderRadius: 12, background: "#fff",
                padding: "16px 18px", marginBottom: 14,
              }}
            >
              {inputField(
                "Review status",
                <select
                  style={inputStyle}
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value as BankReviewStatus)}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>,
              )}

              {inputField(
                "Financial assessment",
                <input
                  style={inputStyle}
                  type="text"
                  value={financialAssessment}
                  onChange={(e) => setFinancialAssessment(e.target.value)}
                  placeholder="e.g. Creditworthy — 3 years trading history"
                />,
              )}

              {inputField(
                "Background check status",
                <input
                  style={inputStyle}
                  type="text"
                  value={backgroundCheckStatus}
                  onChange={(e) => setBackgroundCheckStatus(e.target.value)}
                  placeholder="e.g. Clear — no adverse findings"
                />,
              )}

              {inputField(
                "Notes",
                <textarea
                  style={{ ...inputStyle, minHeight: 72, resize: "vertical" }}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Internal notes about this applicant…"
                />,
              )}
            </div>

            {error && (
              <div
                style={{
                  marginBottom: 12, padding: "10px 14px", borderRadius: 8,
                  background: "rgba(178,58,58,.07)", border: "1px solid rgba(178,58,58,.2)",
                  color: "#7a2a2a", fontSize: 12, fontWeight: 600,
                }}
              >
                {error}
              </div>
            )}

            {saved && (
              <div
                style={{
                  marginBottom: 12, padding: "10px 14px", borderRadius: 8,
                  background: "rgba(22,101,52,.08)", border: "1px solid rgba(22,101,52,.25)",
                  color: "#14532d", fontSize: 12, fontWeight: 700,
                }}
              >
                Review updated successfully.
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: "100%", padding: "11px 0", borderRadius: 8, border: "none",
                background: "var(--dark)", color: "var(--amber)",
                fontWeight: 800, fontSize: 14, cursor: submitting ? "not-allowed" : "pointer",
                fontFamily: "inherit", letterSpacing: ".03em",
              }}
            >
              {submitting ? "Saving…" : "Save Review"}
            </button>
          </form>
        )}
      </div>
    </RoleShell>
  );
}
