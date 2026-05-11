"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { NAV_BY_ROLE } from "@/lib/phase1/nav";
import { phase1Fetch } from "@/lib/phase1/client";
import type { Lot } from "@/lib/phase1/types";
import { useAppStore } from "@/lib/store/useAppStore";

const RECEIVER_ROLES = ["Farmer", "Aggregator", "Processor", "Transporter", "Lab", "Admin"];

export function TransporterReceiptPage() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [lots, setLots] = useState<Lot[]>([]);
  const [selectedLotId, setSelectedLotId] = useState("");
  const [nextCustodianId, setNextCustodianId] = useState("");
  const [nextCustodianRole, setNextCustodianRole] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ newStatus: string } | null>(null);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (!authUser || authUser.role !== "Transporter") return;
      try {
        const res = await phase1Fetch<{ lots: Lot[] }>(authUser, "/api/phase1/lots");
        if (!canceled) setLots(res.lots.filter((l) => l.status === "IN_TRANSIT"));
      } catch {
        // silent
      }
    };
    void run();
    return () => {
      canceled = true;
    };
  }, [authUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser || !selectedLotId || !nextCustodianId || !nextCustodianRole) return;
    setError("");
    setSubmitting(true);
    try {
      const res = await phase1Fetch<{ newStatus: string }>(authUser, "/api/phase1/transport/receipt", {
        method: "POST",
        body: JSON.stringify({
          lotId: selectedLotId,
          nextCustodianId,
          nextCustodianRole,
          ...(locationStatus ? { locationStatus } : {}),
        }),
      });
      setSuccess(res);
      setTimeout(() => router.push("/transporter/dashboard"), 1800);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Receipt failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!authUser || authUser.role !== "Transporter") return null;

  const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 10px",
    border: "1px solid var(--border)",
    borderRadius: 7,
    background: "#fff",
    fontSize: 13,
    color: "var(--tx)",
    fontFamily: "inherit",
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
    <RoleShell role="Transporter" navItems={NAV_BY_ROLE.Transporter}>
      <div style={{ padding: 16, maxWidth: 560 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: "var(--amber)",
            marginBottom: 4,
          }}
        >
          Transporter
        </div>
        <div style={{ fontWeight: 800, fontSize: 18, color: "var(--tx)", marginBottom: 4 }}>
          Record Receipt
        </div>
        <div style={{ fontSize: 12, color: "var(--tx2)", marginBottom: 20 }}>
          Select an in-transit lot and specify who receives custody next. If the receiver is Lab, the lot becomes
          AT_LAB; otherwise it becomes ACTIVE.
        </div>

        {success ? (
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 10,
              background: "rgba(22,101,52,.08)",
              border: "1px solid rgba(22,101,52,.25)",
              color: "#14532d",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            Receipt recorded. Lot is now {success.newStatus}. Redirecting…
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: 12,
                background: "#fff",
                padding: "16px 18px",
                marginBottom: 14,
              }}
            >
              {lots.length === 0 ? (
                <div style={{ fontSize: 12, color: "var(--tx3)", marginBottom: 8 }}>
                  No lots currently in transit.
                </div>
              ) : (
                inputField(
                  "In-transit lot",
                  <select
                    style={selectStyle}
                    value={selectedLotId}
                    onChange={(e) => setSelectedLotId(e.target.value)}
                    required
                  >
                    <option value="">Select a lot…</option>
                    {lots.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.publicLotCode} — {l.weightKg} kg · {l.form}
                      </option>
                    ))}
                  </select>,
                )
              )}

              {inputField(
                "Next custodian ID (username)",
                <input
                  style={selectStyle}
                  type="text"
                  value={nextCustodianId}
                  onChange={(e) => setNextCustodianId(e.target.value)}
                  placeholder="e.g. processor.demo"
                  required
                />,
              )}

              {inputField(
                "Next custodian role",
                <select
                  style={selectStyle}
                  value={nextCustodianRole}
                  onChange={(e) => setNextCustodianRole(e.target.value)}
                  required
                >
                  <option value="">Select role…</option>
                  {RECEIVER_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>,
              )}

              {inputField(
                "Location status (optional)",
                <input
                  style={selectStyle}
                  type="text"
                  value={locationStatus}
                  onChange={(e) => setLocationStatus(e.target.value)}
                  placeholder="e.g. Arrived at processing facility"
                />,
              )}

              {nextCustodianRole && (
                <div
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: "var(--bg)",
                    border: "1px solid var(--border2)",
                    fontSize: 12,
                    color: "var(--tx2)",
                  }}
                >
                  Lot will become:{" "}
                  <strong>
                    {nextCustodianRole.toLowerCase() === "lab" ? "AT_LAB" : "ACTIVE"}
                  </strong>
                </div>
              )}
            </div>

            {error && (
              <div
                style={{
                  marginBottom: 12,
                  padding: "10px 14px",
                  borderRadius: 8,
                  background: "rgba(178,58,58,.07)",
                  border: "1px solid rgba(178,58,58,.2)",
                  color: "#7a2a2a",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || lots.length === 0}
              style={{
                width: "100%",
                padding: "11px 0",
                borderRadius: 8,
                border: "none",
                background: lots.length === 0 ? "#e5e5e5" : "var(--dark)",
                color: lots.length === 0 ? "#aaa" : "var(--amber)",
                fontWeight: 800,
                fontSize: 14,
                cursor: submitting || lots.length === 0 ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                letterSpacing: ".03em",
              }}
            >
              {submitting ? "Recording receipt…" : "Record Receipt"}
            </button>
          </form>
        )}
      </div>
    </RoleShell>
  );
}
