"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { phase1Fetch } from "@/lib/phase1/client";
import type { Lot } from "@/lib/phase1/types";
import { useAppStore } from "@/lib/store/useAppStore";

export function AggregatorLotValidationPage() {
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

  const buckets = useMemo(() => {
    const pending = lots.filter((l) => l.validationStatus === "PENDING" && l.status === "AT_FARM");
    const validated = lots.filter((l) => l.validationStatus === "VALIDATED");
    const rejected = lots.filter((l) => l.validationStatus === "REJECTED" || l.status === "QUARANTINED");
    return { pending, validated, rejected };
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
      <div style={{ padding: 16 }}>
        <div style={{ fontWeight: 800, letterSpacing: ".02em" }}>Lot Validation</div>
        <div style={{ marginTop: 6, color: "var(--tx2)" }}>
          Pending lots are farmer origin picks awaiting Aggregator decision.
        </div>

        {error ? <div className="login-error" style={{ marginTop: 10 }}>{error}</div> : null}

        <div style={{ marginTop: 16, display: "grid", gap: 12, maxWidth: 980 }}>
          {(
            [
              { id: "pending", title: "Awaiting validation", items: buckets.pending },
              { id: "validated", title: "Validated lots", items: buckets.validated },
              { id: "rejected", title: "Rejected / quarantined", items: buckets.rejected },
            ] as const
          ).map((bucket) => (
            <div
              key={bucket.id}
              style={{ padding: 12, border: "1px solid var(--border)", borderRadius: 12, background: "#fff" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ fontWeight: 800 }}>{bucket.title}</div>
                <div style={{ fontSize: 12, color: "var(--tx2)" }}>{loading ? "…" : `${bucket.items.length}`}</div>
              </div>
              <div style={{ marginTop: 8, display: "grid", gap: 8 }}>
                {bucket.items.slice(0, 12).map((l) => (
                  <Link
                    key={l.id}
                    href={`/aggregator/lot-validation/${l.id}`}
                    style={{
                      display: "block",
                      padding: 10,
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      background: "var(--bg)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <div style={{ fontWeight: 700 }}>{l.publicLotCode}</div>
                      <div style={{ fontSize: 12, color: "var(--tx2)" }}>{l.weightKg} kg</div>
                    </div>
                    <div style={{ marginTop: 4, fontSize: 12, color: "var(--tx2)" }}>
                      {l.form} · {l.status} · {l.validationStatus}
                      {l.farmerId ? ` · farmer ${l.farmerId}` : ""}
                    </div>
                  </Link>
                ))}
                {bucket.items.length === 0 ? (
                  <div style={{ fontSize: 12, color: "var(--tx3)" }}>No lots in this bucket.</div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </RoleShell>
  );
}

