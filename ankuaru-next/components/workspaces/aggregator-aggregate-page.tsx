"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { phase1Fetch } from "@/lib/phase1/client";
import type { Lot } from "@/lib/phase1/types";
import { useAppStore } from "@/lib/store/useAppStore";

export function AggregatorAggregatePage() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [lots, setLots] = useState<Lot[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [outputWeightKg, setOutputWeightKg] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (!authUser || authUser.role !== "Aggregator") return;
      setLoading(true);
      setError("");
      try {
        const payload = await phase1Fetch<{ lots: Lot[] }>(authUser, "/api/phase1/lots");
        if (!canceled) setLots(payload.lots);
      } catch (e) {
        if (!canceled) setError(e instanceof Error ? e.message : "Failed to load lots.");
      } finally {
        if (!canceled) setLoading(false);
      }
    };
    void run();
    return () => {
      canceled = true;
    };
  }, [authUser]);

  const eligible = useMemo(
    () => lots.filter((l) => l.validationStatus === "VALIDATED" && l.status === "AT_FARM"),
    [lots],
  );

  const selectedIds = useMemo(() => eligible.filter((l) => selected[l.id]).map((l) => l.id), [eligible, selected]);
  const selectedSum = useMemo(
    () => eligible.filter((l) => selected[l.id]).reduce((acc, l) => acc + l.weightKg, 0),
    [eligible, selected],
  );

  const disabled = selectedIds.length < 2;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!authUser) return;
    setError("");
    setResult("");
    try {
      const payload = await phase1Fetch<{ outputLot: Lot }>(authUser, "/api/phase1/lots/aggregate", {
        method: "POST",
        body: JSON.stringify({
          inputLotIds: selectedIds,
          outputWeightKg: outputWeightKg.trim() ? Number(outputWeightKg) : undefined,
        }),
      });
      setResult(`Created ${payload.outputLot.publicLotCode} (${payload.outputLot.weightKg} kg)`);
      setSelected({});
      setOutputWeightKg("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Aggregation failed.");
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
      <div style={{ padding: 16, maxWidth: 980 }}>
        <div style={{ fontWeight: 800, letterSpacing: ".02em" }}>Create Aggregation</div>
        <div style={{ marginTop: 6, color: "var(--tx2)" }}>Select 2+ validated origin lots to combine.</div>

        {error ? <div className="login-error" style={{ marginTop: 10 }}>{error}</div> : null}
        {result ? (
          <div style={{ marginTop: 10, fontSize: 12, color: "var(--tx2)" }}>{result}</div>
        ) : null}

        <form onSubmit={submit} style={{ marginTop: 12, display: "grid", gap: 10 }}>
          <div style={{ padding: 12, border: "1px solid var(--border)", borderRadius: 12, background: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div style={{ fontWeight: 800 }}>Eligible lots</div>
              <div style={{ fontSize: 12, color: "var(--tx2)" }}>{loading ? "…" : `${eligible.length}`}</div>
            </div>
            <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
              {eligible.slice(0, 30).map((l) => (
                <label
                  key={l.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    padding: 10,
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    background: "var(--bg)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <input
                      type="checkbox"
                      checked={Boolean(selected[l.id])}
                      onChange={(e) => setSelected((prev) => ({ ...prev, [l.id]: e.target.checked }))}
                    />
                    <div>
                      <div style={{ fontWeight: 700 }}>{l.publicLotCode}</div>
                      <div style={{ marginTop: 2, fontSize: 12, color: "var(--tx2)" }}>
                        {l.weightKg} kg · farmer {l.farmerId}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
              {eligible.length === 0 ? <div style={{ fontSize: 12, color: "var(--tx3)" }}>No validated lots yet.</div> : null}
            </div>
          </div>

          <div style={{ padding: 12, border: "1px solid var(--border)", borderRadius: 12, background: "#fff" }}>
            <div style={{ fontWeight: 800 }}>Output</div>
            <div style={{ marginTop: 6, fontSize: 12, color: "var(--tx2)" }}>
              Selected: {selectedIds.length} lot(s) · Sum: {selectedSum} kg
            </div>
            <label className="login-label" htmlFor="outW" style={{ marginTop: 10 }}>
              Output weight (kg) — optional (defaults to sum)
            </label>
            <input
              id="outW"
              className="login-input text-black"
              value={outputWeightKg}
              onChange={(e) => setOutputWeightKg(e.target.value)}
              placeholder={`${selectedSum}`}
              inputMode="decimal"
            />
            <button className="login-btn" style={{ marginTop: 10 }} type="submit" disabled={disabled}>
              Create aggregation
            </button>
            {disabled ? (
              <div style={{ marginTop: 6, fontSize: 11, color: "var(--tx3)" }}>Select at least 2 lots.</div>
            ) : null}
          </div>
        </form>
      </div>
    </RoleShell>
  );
}

