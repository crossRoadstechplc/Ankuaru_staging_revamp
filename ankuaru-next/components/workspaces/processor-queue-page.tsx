"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RoleShell } from "@/components/role-shell";
import { NAV_BY_ROLE } from "@/lib/phase1/nav";
import { phase1Fetch } from "@/lib/phase1/client";
import type { Lot } from "@/lib/phase1/types";
import { useAppStore } from "@/lib/store/useAppStore";

export function ProcessorQueuePage() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const [lots, setLots] = useState<Lot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (!authUser || authUser.role !== "Processor") return;
      setLoading(true);
      try {
        const res = await phase1Fetch<{ lots: Lot[] }>(authUser, "/api/phase1/processor/queue");
        if (!canceled) setLots(res.lots);
      } catch {
        // silent
      } finally {
        if (!canceled) setLoading(false);
      }
    };
    void run();
    return () => {
      canceled = true;
    };
  }, [authUser]);

  if (!authUser || authUser.role !== "Processor") return null;

  return (
    <RoleShell role="Processor" navItems={NAV_BY_ROLE.Processor}>
      <div style={{ padding: 16, maxWidth: 860 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
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
              Processor
            </div>
            <div style={{ fontWeight: 800, fontSize: 18, color: "var(--tx)" }}>Processing Queue</div>
            <div style={{ fontSize: 12, color: "var(--tx2)", marginTop: 4 }}>
              Lots aggregated and ready for processing. Click &quot;Record&quot; to start a processing run.
            </div>
          </div>
          <Link
            href="/processor/record"
            style={{
              padding: "9px 18px",
              border: "1px solid rgba(212,130,10,.34)",
              borderRadius: 8,
              background: "rgba(212,130,10,.13)",
              color: "#7a4a00",
              fontWeight: 700,
              fontSize: 12,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Record Processing
          </Link>
        </div>

        {loading ? (
          <div style={{ fontSize: 13, color: "var(--tx3)" }}>Loading queue…</div>
        ) : lots.length === 0 ? (
          <div
            style={{
              border: "1px dashed var(--border2)",
              borderRadius: 10,
              padding: "32px 24px",
              textAlign: "center",
              background: "var(--bg)",
            }}
          >
            <div style={{ fontSize: 13, color: "var(--tx3)" }}>
              No lots ready for processing yet. Aggregator must aggregate and mark lots as READY_FOR_PROCESSING.
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {lots.map((lot) => (
              <div
                key={lot.id}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  background: "#fff",
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--tx)" }}>{lot.publicLotCode}</div>
                  <div style={{ fontSize: 11, color: "var(--tx2)", marginTop: 4 }}>
                    {lot.weightKg} kg · {lot.form} · Farmer: {lot.farmerId}
                  </div>
                  {lot.fieldId && (
                    <div style={{ fontSize: 11, color: "var(--tx3)", marginTop: 2 }}>Field: {lot.fieldId}</div>
                  )}
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: 8,
                      background: "rgba(212,130,10,.12)",
                      color: "#7a4a00",
                    }}
                  >
                    READY
                  </span>
                  <Link
                    href={`/processor/record?lotId=${lot.id}`}
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--amber)",
                      textDecoration: "none",
                      border: "1px solid rgba(212,130,10,.25)",
                      borderRadius: 6,
                      padding: "4px 10px",
                      background: "rgba(212,130,10,.07)",
                    }}
                  >
                    Record →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </RoleShell>
  );
}
