"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { RoleDashboard } from "@/components/workspaces/role-dashboard";
import type { DashLedgerRow, DashModule } from "@/components/workspaces/role-dashboard";
import { phase1Fetch } from "@/lib/phase1/client";
import type { Event, Lot } from "@/lib/phase1/types";
import { NAV_BY_ROLE } from "@/lib/phase1/nav";
import { useAppStore } from "@/lib/store/useAppStore";

type OverviewStats = {
  totalLots: number;
  totalEvents: number;
  totalFields: number;
  labResults: number;
  bankReviews: number;
};

export function RegulatorWorkspace() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [lots, setLots] = useState<Lot[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (!authUser || authUser.role !== "Regulator") return;
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
      }
    };
    void run();
    return () => { canceled = true; };
  }, [authUser]);

  const ledgerRows = useMemo<DashLedgerRow[]>(
    () =>
      events.slice(0, 8).map((e) => {
        const lot = lots.find((l) => l.id === e.outputLotIds[0] || l.id === e.inputLotIds[0]);
        return {
          id: e.id,
          code: lot ? lot.publicLotCode : e.type,
          detail: `${e.type} · role: ${e.actorRole}`,
          ts: e.timestamp,
        };
      }),
    [events, lots],
  );

  const lotsByStatus = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const l of lots) counts[l.status] = (counts[l.status] ?? 0) + 1;
    return counts;
  }, [lots]);

  const modules = useMemo<DashModule[]>(
    () => [
      {
        id: "lotStatus",
        title: "Lot status overview",
        summary: `${lots.length} total lots across the platform`,
        items: Object.entries(lotsByStatus).map(([status, count]) => ({
          id: status,
          label: status,
          detail: `${count} lot(s)`,
        })),
      },
      {
        id: "events",
        title: "High-signal events",
        summary: `${events.length} traceability events (last 50)`,
        items: events.slice(0, 8).map((e) => ({
          id: e.id,
          label: e.type,
          detail: `actor role: ${e.actorRole} · ${e.timestamp.slice(0, 16).replace("T", " ")}`,
        })),
      },
    ],
    [lots, lotsByStatus, events],
  );

  if (!authUser || authUser.role !== "Regulator") return null;

  return (
    <RoleShell role="Regulator" navItems={NAV_BY_ROLE.Regulator}>
      <RoleDashboard
        kicker="Regulator"
        title="Oversight dashboard"
        description="Read-only visibility across the full platform traceability chain. No create or manage operations are available for this role."
        stats={[
          { label: "Total lots", value: stats?.totalLots ?? 0 },
          { label: "Events", value: stats?.totalEvents ?? 0 },
          { label: "Fields", value: stats?.totalFields ?? 0 },
          { label: "Lab results", value: stats?.labResults ?? 0 },
          { label: "Bank reviews", value: stats?.bankReviews ?? 0 },
        ]}
        primaryAction={{ href: "/regulator/oversight", label: "Full oversight view" }}
        ledgerTitle="Oversight ledger sample"
        ledgerBlurb="High-signal events across all roles — aggregate, process, dispatch, lab, bank."
        ledgerRows={ledgerRows}
        modules={modules}
      />
    </RoleShell>
  );
}
