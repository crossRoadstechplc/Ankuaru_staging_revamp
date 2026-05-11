"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { phase1Fetch } from "@/lib/phase1/client";
import type { Lot } from "@/lib/phase1/types";
import { useAppStore } from "@/lib/store/useAppStore";

export function AggregatorFarmerLotsPage() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [lots, setLots] = useState<Lot[]>([]);
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
        if (!canceled) setLots(payload.lots.filter((l) => l.status === "AT_FARM"));
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

  const groups = useMemo(() => {
    const map = new Map<string, Lot[]>();
    for (const lot of lots) {
      const key = lot.farmerId || "unknown";
      const arr = map.get(key) ?? [];
      arr.push(lot);
      map.set(key, arr);
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [lots]);

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
        <div style={{ fontWeight: 800, letterSpacing: ".02em" }}>Farmer Lots</div>
        <div style={{ marginTop: 6, color: "var(--tx2)" }}>All origin lots still at farm (custody/ownership).</div>

        {error ? <div className="login-error" style={{ marginTop: 10 }}>{error}</div> : null}

        <div style={{ marginTop: 12, color: "var(--tx2)" }}>{loading ? "Loading…" : `${lots.length} lot(s)`}</div>

        <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
          {groups.map(([farmerId, items]) => (
            <div key={farmerId} style={{ padding: 12, border: "1px solid var(--border)", borderRadius: 12, background: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ fontWeight: 800 }}>{`Farmer: ${farmerId}`}</div>
                <div style={{ fontSize: 12, color: "var(--tx2)" }}>{items.length}</div>
              </div>
              <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
                {items.slice(0, 20).map((l) => (
                  <div key={l.id} style={{ padding: 10, border: "1px solid var(--border)", borderRadius: 10, background: "var(--bg)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <div style={{ fontWeight: 700 }}>{l.publicLotCode}</div>
                      <div style={{ fontSize: 12, color: "var(--tx2)" }}>{l.weightKg} kg</div>
                    </div>
                    <div style={{ marginTop: 4, fontSize: 12, color: "var(--tx2)" }}>
                      {l.form} · {l.status} · {l.validationStatus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {groups.length === 0 ? <div style={{ fontSize: 12, color: "var(--tx3)" }}>No farmer lots yet.</div> : null}
        </div>
      </div>
    </RoleShell>
  );
}

