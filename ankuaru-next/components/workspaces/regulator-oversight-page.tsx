"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { NAV_BY_ROLE } from "@/lib/phase1/nav";
import { phase1Fetch } from "@/lib/phase1/client";
import type { Event, Lot } from "@/lib/phase1/types";
import { useAppStore } from "@/lib/store/useAppStore";

type OverviewStats = {
  totalLots: number;
  totalEvents: number;
  totalFields: number;
  labResults: number;
  bankReviews: number;
};

const STATUS_CHIP: Record<string, { bg: string; color: string }> = {
  AT_FARM: { bg: "rgba(22,101,52,.09)", color: "#14532d" },
  READY_FOR_PROCESSING: { bg: "rgba(212,130,10,.12)", color: "#7a4a00" },
  IN_PROCESSING: { bg: "rgba(37,99,235,.1)", color: "#1e3a8a" },
  IN_TRANSIT: { bg: "rgba(124,58,237,.1)", color: "#4c1d95" },
  ACTIVE: { bg: "rgba(22,101,52,.09)", color: "#14532d" },
  AT_LAB: { bg: "rgba(212,130,10,.12)", color: "#7a4a00" },
  READY_FOR_EXPORT: { bg: "rgba(22,101,52,.15)", color: "#14532d" },
  CLOSED: { bg: "rgba(100,100,100,.1)", color: "#555" },
  QUARANTINED: { bg: "rgba(178,58,58,.1)", color: "#7a2a2a" },
};

export function RegulatorOversightPage() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [lots, setLots] = useState<Lot[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"lots" | "events">("lots");

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (!authUser || authUser.role !== "Regulator") return;
      setLoading(true);
      try {
        const res = await phase1Fetch<{ stats: OverviewStats; lots: Lot[]; oversightEvents: Event[] }>(
          authUser, "/api/phase1/regulator/overview",
        );
        if (!canceled) {
          setStats(res.stats);
          setLots(res.lots);
          setEvents(res.oversightEvents);
        }
      } catch {
        // silent
      } finally {
        if (!canceled) setLoading(false);
      }
    };
    void run();
    return () => { canceled = true; };
  }, [authUser]);

  if (!authUser || authUser.role !== "Regulator") return null;

  const tabBtn = (id: "lots" | "events", label: string) => (
    <button
      type="button"
      onClick={() => setTab(id)}
      style={{
        padding: "7px 18px", border: "none", borderRadius: "8px 8px 0 0",
        background: tab === id ? "#fff" : "transparent",
        borderBottom: tab === id ? "2px solid var(--amber)" : "2px solid transparent",
        color: tab === id ? "var(--tx)" : "var(--tx3)",
        fontWeight: tab === id ? 700 : 500, fontSize: 12,
        cursor: "pointer", fontFamily: "inherit",
      }}
    >
      {label}
    </button>
  );

  return (
    <RoleShell role="Regulator" navItems={NAV_BY_ROLE.Regulator}>
      <div style={{ padding: 16, maxWidth: 960 }}>
        <div
          style={{
            fontSize: 10, fontWeight: 700, letterSpacing: ".12em",
            textTransform: "uppercase", color: "var(--amber)", marginBottom: 4,
          }}
        >
          Regulator
        </div>
        <div style={{ fontWeight: 800, fontSize: 18, color: "var(--tx)", marginBottom: 4 }}>Oversight</div>
        <div style={{ fontSize: 12, color: "var(--tx2)", marginBottom: 20 }}>
          Read-only view of all platform lots and traceability events.
        </div>

        {/* Stats bar */}
        {stats && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
            {[
              ["Lots", stats.totalLots],
              ["Events", stats.totalEvents],
              ["Fields", stats.totalFields],
              ["Lab results", stats.labResults],
              ["Bank reviews", stats.bankReviews],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  padding: "8px 14px", borderRadius: 10, background: "#fff",
                  border: "1px solid var(--border)", textAlign: "center", minWidth: 80,
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 800, color: "var(--tx)" }}>{value}</div>
                <div style={{ fontSize: 10, color: "var(--tx3)", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div style={{ borderBottom: "1px solid var(--border2)", marginBottom: 14 }}>
          {tabBtn("lots", `Lots (${lots.length})`)}
          {tabBtn("events", `Events (${events.length})`)}
        </div>

        {loading ? (
          <div style={{ fontSize: 13, color: "var(--tx3)" }}>Loading…</div>
        ) : tab === "lots" ? (
          lots.length === 0 ? (
            <div style={{ fontSize: 13, color: "var(--tx3)" }}>No lots on the platform yet.</div>
          ) : (
            <div style={{ display: "grid", gap: 8 }}>
              {lots.map((lot) => {
                const sc = STATUS_CHIP[lot.status] ?? { bg: "var(--bg)", color: "var(--tx2)" };
                return (
                  <div
                    key={lot.id}
                    style={{
                      border: "1px solid var(--border)", borderRadius: 10, background: "#fff",
                      padding: "10px 14px", display: "flex", justifyContent: "space-between",
                      alignItems: "center", gap: 12,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "var(--tx)" }}>
                        {lot.publicLotCode}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--tx2)", marginTop: 3 }}>
                        {lot.weightKg} kg · {lot.form}
                        {lot.processingMethod ? ` · ${lot.processingMethod}` : ""}
                        {lot.labStatus ? ` · lab: ${lot.labStatus}` : ""}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: 10, fontWeight: 700, padding: "3px 8px",
                        borderRadius: 8, background: sc.bg, color: sc.color, whiteSpace: "nowrap",
                      }}
                    >
                      {lot.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          events.length === 0 ? (
            <div style={{ fontSize: 13, color: "var(--tx3)" }}>No oversight events yet.</div>
          ) : (
            <div style={{ display: "grid", gap: 8 }}>
              {events.map((e) => (
                <div
                  key={e.id}
                  style={{
                    border: "1px solid var(--border)", borderRadius: 10, background: "#fff",
                    padding: "10px 14px", display: "flex", justifyContent: "space-between",
                    alignItems: "center", gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "var(--tx)" }}>{e.type}</div>
                    <div style={{ fontSize: 11, color: "var(--tx2)", marginTop: 3 }}>
                      actor role: {e.actorRole}
                      {e.inputLotIds.length > 0 ? ` · lots: ${e.inputLotIds.slice(0, 2).join(", ")}` : ""}
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--tx3)", whiteSpace: "nowrap" }}>
                    {e.timestamp.slice(0, 16).replace("T", " ")}
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </RoleShell>
  );
}
