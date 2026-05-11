"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RoleShell } from "@/components/role-shell";
import { NAV_BY_ROLE } from "@/lib/phase1/nav";
import { phase1Fetch } from "@/lib/phase1/client";
import type { Lot } from "@/lib/phase1/types";
import { useAppStore } from "@/lib/store/useAppStore";

export function LabQueuePage() {
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
      if (!authUser || authUser.role !== "Lab") return;
      setLoading(true);
      try {
        const res = await phase1Fetch<{ lots: Lot[] }>(authUser, "/api/phase1/lab/queue");
        if (!canceled) setLots(res.lots);
      } catch {
        // silent
      } finally {
        if (!canceled) setLoading(false);
      }
    };
    void run();
    return () => { canceled = true; };
  }, [authUser]);

  if (!authUser || authUser.role !== "Lab") return null;

  return (
    <RoleShell role="Lab" navItems={NAV_BY_ROLE.Lab}>
      <div style={{ padding: 16, maxWidth: 860 }}>
        <div
          style={{
            fontSize: 10, fontWeight: 700, letterSpacing: ".12em",
            textTransform: "uppercase", color: "var(--amber)", marginBottom: 4,
          }}
        >
          Lab
        </div>
        <div style={{ fontWeight: 800, fontSize: 18, color: "var(--tx)", marginBottom: 4 }}>
          Assessment Queue
        </div>
        <div style={{ fontSize: 12, color: "var(--tx2)", marginBottom: 20 }}>
          Lots delivered by transporter for quality testing. Click &quot;Assess&quot; to submit a lab result.
        </div>

        {loading ? (
          <div style={{ fontSize: 13, color: "var(--tx3)" }}>Loading queue…</div>
        ) : lots.length === 0 ? (
          <div
            style={{
              border: "1px dashed var(--border2)", borderRadius: 10, padding: "32px 24px",
              textAlign: "center", background: "var(--bg)",
            }}
          >
            <div style={{ fontSize: 13, color: "var(--tx3)" }}>
              No lots awaiting assessment. Transporter must deliver lots with nextCustodianRole set to Lab.
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {lots.map((lot) => (
              <div
                key={lot.id}
                style={{
                  border: "1px solid var(--border)", borderRadius: 10, background: "#fff",
                  padding: "12px 16px", display: "flex", justifyContent: "space-between",
                  alignItems: "center", gap: 12,
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "var(--tx)" }}>
                    {lot.publicLotCode}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--tx2)", marginTop: 4 }}>
                    {lot.weightKg} kg · {lot.form} · status: {lot.status}
                    {lot.processingMethod ? ` · method: ${lot.processingMethod}` : ""}
                  </div>
                </div>
                <Link
                  href={`/lab/assess/${lot.id}`}
                  style={{
                    fontSize: 11, fontWeight: 700, color: "var(--amber)", textDecoration: "none",
                    border: "1px solid rgba(212,130,10,.25)", borderRadius: 6,
                    padding: "4px 12px", background: "rgba(212,130,10,.07)", whiteSpace: "nowrap",
                  }}
                >
                  Assess →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </RoleShell>
  );
}
