"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { phase1Fetch } from "@/lib/phase1/client";
import type { Lot } from "@/lib/phase1/types";
import { useAppStore } from "@/lib/store/useAppStore";

export function AggregatorValidateLotPage() {
  const params = useParams<{ lotId: string }>();
  const lotId = params?.lotId;
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [lot, setLot] = useState<Lot | null>(null);
  const [observedWeightKg, setObservedWeightKg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const canSubmit = useMemo(() => Boolean(lotId), [lotId]);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (!authUser || authUser.role !== "Aggregator" || !lotId) return;
      setLoading(true);
      setError("");
      try {
        const payload = await phase1Fetch<{ lots: Lot[] }>(authUser, "/api/phase1/lots");
        const found = payload.lots.find((l) => l.id === lotId) ?? null;
        if (!canceled) setLot(found);
      } catch (e) {
        if (!canceled) setError(e instanceof Error ? e.message : "Failed to load lot.");
      } finally {
        if (!canceled) setLoading(false);
      }
    };
    void run();
    return () => {
      canceled = true;
    };
  }, [authUser, lotId]);

  const submit = async (event: FormEvent, decision: "VALIDATED" | "REJECTED") => {
    event.preventDefault();
    if (!authUser || !lotId) return;
    setError("");
    try {
      const payload = await phase1Fetch<{ lot: Lot }>(authUser, "/api/phase1/lots/validate", {
        method: "POST",
        body: JSON.stringify({
          lotId,
          decision,
          observedWeightKg: observedWeightKg.trim() ? Number(observedWeightKg) : undefined,
        }),
      });
      setLot(payload.lot);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Validation failed.");
    }
  };

  if (!authUser || authUser.role !== "Aggregator") return null;

  return (
    <RoleShell
      role="Aggregator"
      navItems={[
        { id: "dash", label: "Dashboard", href: "/aggregator" },
        { id: "validation", label: "Lot Validation", href: "/aggregator/lot-validation" },
        { id: "agg", label: "Create Aggregation", href: "/aggregator/aggregate" },
        { id: "farmerLots", label: "Farmer Lots", href: "/aggregator/farmer-lots" },
      ]}
    >
      <div style={{ padding: 16, maxWidth: 820 }}>
        <div style={{ fontWeight: 800, letterSpacing: ".02em" }}>Validate lot</div>
        <div style={{ marginTop: 6, color: "var(--tx2)" }}>{lotId}</div>

        {error ? <div className="login-error" style={{ marginTop: 10 }}>{error}</div> : null}

        <div style={{ marginTop: 12, padding: 12, border: "1px solid var(--border)", borderRadius: 12, background: "#fff" }}>
          {loading ? (
            <div style={{ color: "var(--tx2)" }}>Loading…</div>
          ) : !lot ? (
            <div style={{ color: "var(--tx2)" }}>Lot not found.</div>
          ) : (
            <>
              <div style={{ fontWeight: 800 }}>{lot.publicLotCode}</div>
              <div style={{ marginTop: 6, fontSize: 12, color: "var(--tx2)" }}>
                {lot.form} · {lot.status} · validation {lot.validationStatus} · {lot.weightKg} kg
              </div>

              <form style={{ marginTop: 12, display: "grid", gap: 8 }} onSubmit={(e) => e.preventDefault()}>
                <label className="login-label" htmlFor="obs">
                  Observed weight (kg) — optional
                </label>
                <input
                  id="obs"
                  className="login-input text-black"
                  value={observedWeightKg}
                  onChange={(e) => setObservedWeightKg(e.target.value)}
                  placeholder="e.g. 49.5"
                  inputMode="decimal"
                />

                <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                  <button className="login-btn" disabled={!canSubmit} onClick={(e) => submit(e, "VALIDATED")}>
                    Approve
                  </button>
                  <button
                    className="login-btn"
                    disabled={!canSubmit}
                    style={{ borderColor: "rgba(178,58,58,.35)", background: "rgba(178,58,58,.08)", color: "#7a2a2a" }}
                    onClick={(e) => submit(e, "REJECTED")}
                  >
                    Reject
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </RoleShell>
  );
}

