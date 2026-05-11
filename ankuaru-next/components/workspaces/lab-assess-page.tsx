"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { NAV_BY_ROLE } from "@/lib/phase1/nav";
import { phase1Fetch } from "@/lib/phase1/client";
import type { LabStatus, Lot } from "@/lib/phase1/types";
import { useAppStore } from "@/lib/store/useAppStore";

export function LabAssessPage({ lotId }: { lotId: string }) {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [lot, setLot] = useState<Lot | null>(null);
  const [status, setStatus] = useState<Exclude<LabStatus, "NOT_REQUIRED">>("PENDING");
  const [score, setScore] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ newLotStatus: string } | null>(null);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (!authUser || authUser.role !== "Lab") return;
      try {
        const res = await phase1Fetch<{ lots: Lot[] }>(authUser, "/api/phase1/lab/queue");
        if (!canceled) {
          const found = res.lots.find((l) => l.id === lotId);
          setLot(found ?? null);
        }
      } catch {
        // silent
      }
    };
    void run();
    return () => { canceled = true; };
  }, [authUser, lotId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser || !lotId) return;
    setError("");
    setSubmitting(true);
    try {
      const res = await phase1Fetch<{ newLotStatus: string }>(authUser, "/api/phase1/lab/results", {
        method: "POST",
        body: JSON.stringify({
          lotId,
          status,
          score: score ? parseFloat(score) : undefined,
          notes: notes || undefined,
        }),
      });
      setSuccess(res);
      setTimeout(() => router.push("/lab/queue"), 1800);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!authUser || authUser.role !== "Lab") return null;

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "8px 10px", border: "1px solid var(--border)",
    borderRadius: 7, background: "#fff", fontSize: 13, color: "var(--tx)", fontFamily: "inherit",
  };

  const inputField = (label: string, element: React.ReactNode) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--tx2)", marginBottom: 4 }}>
        {label}
      </label>
      {element}
    </div>
  );

  const DECISION_OPTS: { value: Exclude<LabStatus, "NOT_REQUIRED">; label: string; color: string; bg: string }[] = [
    { value: "APPROVED", label: "APPROVED — lot passes, moves to READY FOR EXPORT", color: "#14532d", bg: "rgba(22,101,52,.08)" },
    { value: "FAILED", label: "FAILED — lot fails, moves to QUARANTINED", color: "#7a2a2a", bg: "rgba(178,58,58,.08)" },
    { value: "PENDING", label: "PENDING — save progress, lot stays AT LAB", color: "#7a4a00", bg: "rgba(212,130,10,.08)" },
  ];

  return (
    <RoleShell role="Lab" navItems={NAV_BY_ROLE.Lab}>
      <div style={{ padding: 16, maxWidth: 560 }}>
        <div
          style={{
            fontSize: 10, fontWeight: 700, letterSpacing: ".12em",
            textTransform: "uppercase", color: "var(--amber)", marginBottom: 4,
          }}
        >
          Lab
        </div>
        <div style={{ fontWeight: 800, fontSize: 18, color: "var(--tx)", marginBottom: 4 }}>
          Assess Lot
        </div>

        {lot ? (
          <div
            style={{
              padding: "10px 14px", borderRadius: 9, background: "var(--bg)",
              border: "1px solid var(--border2)", fontSize: 12, color: "var(--tx2)",
              marginBottom: 20,
            }}
          >
            <strong style={{ color: "var(--tx)" }}>{lot.publicLotCode}</strong>
            {" — "}{lot.weightKg} kg · {lot.form}
            {lot.processingMethod ? ` · ${lot.processingMethod}` : ""}
          </div>
        ) : (
          <div style={{ fontSize: 12, color: "var(--tx3)", marginBottom: 20 }}>
            Lot ID: {lotId} (not in queue or already assessed)
          </div>
        )}

        {success ? (
          <div
            style={{
              padding: "16px 20px", borderRadius: 10,
              background: "rgba(22,101,52,.08)", border: "1px solid rgba(22,101,52,.25)",
              color: "#14532d", fontWeight: 700, fontSize: 13,
            }}
          >
            Result submitted. Lot is now {success.newLotStatus}. Redirecting…
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div
              style={{
                border: "1px solid var(--border)", borderRadius: 12,
                background: "#fff", padding: "16px 18px", marginBottom: 14,
              }}
            >
              {inputField(
                "Decision",
                <div style={{ display: "grid", gap: 8 }}>
                  {DECISION_OPTS.map((opt) => (
                    <label
                      key={opt.value}
                      style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "10px 14px", borderRadius: 9, cursor: "pointer",
                        border: `1px solid ${status === opt.value ? "rgba(212,130,10,.4)" : "var(--border2)"}`,
                        background: status === opt.value ? opt.bg : "var(--bg)",
                      }}
                    >
                      <input
                        type="radio"
                        name="status"
                        value={opt.value}
                        checked={status === opt.value}
                        onChange={() => setStatus(opt.value)}
                        style={{ accentColor: "var(--amber)" }}
                      />
                      <span style={{ fontSize: 12, fontWeight: 600, color: status === opt.value ? opt.color : "var(--tx2)" }}>
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>,
              )}

              {inputField(
                "Quality score (0–100, optional)",
                <input
                  style={inputStyle}
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="e.g. 82.5"
                />,
              )}

              {inputField(
                "Notes (optional)",
                <textarea
                  style={{ ...inputStyle, minHeight: 72, resize: "vertical" }}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Observations, moisture %, defect notes…"
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

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: "100%", padding: "11px 0", borderRadius: 8, border: "none",
                background: "var(--dark)", color: "var(--amber)",
                fontWeight: 800, fontSize: 14,
                cursor: submitting ? "not-allowed" : "pointer",
                fontFamily: "inherit", letterSpacing: ".03em",
              }}
            >
              {submitting ? "Submitting…" : "Submit Lab Result"}
            </button>
          </form>
        )}
      </div>
    </RoleShell>
  );
}
