"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RoleShell } from "@/components/role-shell";
import { NAV_BY_ROLE } from "@/lib/phase1/nav";
import { phase1Fetch } from "@/lib/phase1/client";
import type { BankReview } from "@/lib/phase1/types";
import { useAppStore } from "@/lib/store/useAppStore";

const STATUS_COLOR: Record<string, { bg: string; color: string }> = {
  PENDING_REVIEW: { bg: "rgba(212,130,10,.12)", color: "#7a4a00" },
  BACKGROUND_CHECK_IN_PROGRESS: { bg: "rgba(37,99,235,.1)", color: "#1e3a8a" },
  APPROVED: { bg: "rgba(22,101,52,.1)", color: "#14532d" },
  REJECTED: { bg: "rgba(178,58,58,.1)", color: "#7a2a2a" },
};

const STATUS_LABEL: Record<string, string> = {
  PENDING_REVIEW: "Pending",
  BACKGROUND_CHECK_IN_PROGRESS: "In progress",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export function BankOnboardingPage() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [reviews, setReviews] = useState<BankReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [applicantId, setApplicantId] = useState("");
  const [notes, setNotes] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  const loadReviews = async () => {
    if (!authUser || authUser.role !== "Bank") return;
    setLoading(true);
    try {
      const res = await phase1Fetch<{ bankReviews: BankReview[] }>(authUser, "/api/phase1/bank/reviews");
      setReviews(res.bankReviews);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadReviews(); }, [authUser]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser || !applicantId.trim()) return;
    setCreateError("");
    setCreating(true);
    try {
      await phase1Fetch(authUser, "/api/phase1/bank/reviews", {
        method: "POST",
        body: JSON.stringify({ applicantUserId: applicantId, notes: notes || undefined }),
      });
      setApplicantId("");
      setNotes("");
      await loadReviews();
    } catch (err: unknown) {
      setCreateError(err instanceof Error ? err.message : "Failed to create review.");
    } finally {
      setCreating(false);
    }
  };

  if (!authUser || authUser.role !== "Bank") return null;

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "8px 10px", border: "1px solid var(--border)", borderRadius: 7,
    background: "#fff", fontSize: 13, color: "var(--tx)", fontFamily: "inherit",
    boxSizing: "border-box",
  };

  return (
    <RoleShell role="Bank" navItems={NAV_BY_ROLE.Bank}>
      <div style={{ padding: 16, maxWidth: 800 }}>
        <div
          style={{
            fontSize: 10, fontWeight: 700, letterSpacing: ".12em",
            textTransform: "uppercase", color: "var(--amber)", marginBottom: 4,
          }}
        >
          Bank
        </div>
        <div style={{ fontWeight: 800, fontSize: 18, color: "var(--tx)", marginBottom: 4 }}>
          Onboarding Reviews
        </div>
        <div style={{ fontSize: 12, color: "var(--tx2)", marginBottom: 20 }}>
          Manage applicant onboarding cases. Create a new case or click a review to update its status.
        </div>

        {/* Create new review */}
        <div
          style={{
            border: "1px solid var(--border)", borderRadius: 12, background: "#fff",
            padding: "16px 18px", marginBottom: 20,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 13, color: "var(--tx)", marginBottom: 12 }}>
            Open a new onboarding case
          </div>
          <form onSubmit={handleCreate} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input
              style={{ ...inputStyle, flex: "1 1 200px" }}
              type="text"
              placeholder="Applicant username *"
              value={applicantId}
              onChange={(e) => setApplicantId(e.target.value)}
              required
            />
            <input
              style={{ ...inputStyle, flex: "2 1 260px" }}
              type="text"
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <button
              type="submit"
              disabled={creating}
              style={{
                padding: "8px 20px", border: "none", borderRadius: 7, background: "var(--dark)",
                color: "var(--amber)", fontWeight: 700, fontSize: 12, fontFamily: "inherit",
                cursor: creating ? "not-allowed" : "pointer", whiteSpace: "nowrap",
              }}
            >
              {creating ? "Creating…" : "+ Open case"}
            </button>
          </form>
          {createError && (
            <div style={{ marginTop: 8, fontSize: 12, color: "#7a2a2a" }}>{createError}</div>
          )}
        </div>

        {/* Reviews list */}
        {loading ? (
          <div style={{ fontSize: 13, color: "var(--tx3)" }}>Loading reviews…</div>
        ) : reviews.length === 0 ? (
          <div
            style={{
              border: "1px dashed var(--border2)", borderRadius: 10, padding: "32px 24px",
              textAlign: "center", background: "var(--bg)",
            }}
          >
            <div style={{ fontSize: 13, color: "var(--tx3)" }}>
              No onboarding cases yet. Open a case above.
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {reviews
              .slice()
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .map((r) => {
                const sc = STATUS_COLOR[r.reviewStatus] ?? { bg: "var(--bg)", color: "var(--tx2)" };
                return (
                  <div
                    key={r.id}
                    style={{
                      border: "1px solid var(--border)", borderRadius: 10, background: "#fff",
                      padding: "12px 16px", display: "flex", justifyContent: "space-between",
                      alignItems: "center", gap: 12,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "var(--tx)" }}>
                        {r.applicantUserId}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--tx2)", marginTop: 3 }}>
                        Opened {r.createdAt.slice(0, 10)} · reviewer: {r.reviewerBankUserId}
                        {r.notes ? ` · ${r.notes}` : ""}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                      <span
                        style={{
                          fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 8,
                          background: sc.bg, color: sc.color,
                        }}
                      >
                        {STATUS_LABEL[r.reviewStatus] ?? r.reviewStatus}
                      </span>
                      <Link
                        href={`/bank/onboarding/${r.id}`}
                        style={{
                          fontSize: 11, fontWeight: 700, color: "var(--amber)", textDecoration: "none",
                          border: "1px solid rgba(212,130,10,.25)", borderRadius: 6,
                          padding: "4px 10px", background: "rgba(212,130,10,.07)",
                        }}
                      >
                        Review →
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </RoleShell>
  );
}
