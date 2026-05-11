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

export function AggregatorWorkspace() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [lots, setLots] = useState<Lot[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (!authUser || authUser.role !== "Aggregator") return;
      try {
        const payload = await phase1Fetch<{ lots: Lot[] }>(authUser, "/api/phase1/lots");
        if (canceled) return;
        setLots(payload.lots);
        // derive recent AGGREGATE events from aggregated lots
        const aggLots = payload.lots
          .filter((l) => l.publicLotCode.startsWith("AGG-"))
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setEvents(
          aggLots.map<Event>((l) => ({
            id: l.id,
            type: "AGGREGATE",
            timestamp: l.createdAt,
            actorId: authUser.username,
            actorRole: "Aggregator",
            inputLotIds: [],
            outputLotIds: [l.id],
          })),
        );
      } catch {
        // silent
      }
    };
    void run();
    return () => {
      canceled = true;
    };
  }, [authUser]);

  const pending = useMemo(
    () => lots.filter((l) => l.validationStatus === "PENDING" && l.status === "AT_FARM").length,
    [lots],
  );
  const validated = useMemo(
    () => lots.filter((l) => l.validationStatus === "VALIDATED" && l.status === "AT_FARM").length,
    [lots],
  );
  const aggregated = useMemo(
    () => lots.filter((l) => l.publicLotCode.startsWith("AGG-")).length,
    [lots],
  );

  const ledgerRows = useMemo<DashLedgerRow[]>(
    () =>
      events.slice(0, 8).map((e) => {
        const lot = lots.find((l) => l.id === e.outputLotIds[0]);
        return {
          id: e.id,
          code: lot?.publicLotCode ?? "—",
          detail: lot ? `${lot.weightKg} kg · ${lot.status}` : "Aggregated lot",
          ts: e.timestamp,
        };
      }),
    [events, lots],
  );

  const modules = useMemo<DashModule[]>(
    () => [
      {
        id: "validation",
        title: "Aggregator lot validation",
        summary: `${pending} awaiting · ${validated} validated · ${lots.filter((l) => l.validationStatus === "REJECTED").length} rejected`,
        items: [
          {
            id: "agg-awaiting",
            label: "Awaiting validation",
            detail: `${pending} farmer-held lot(s) pending decision`,
            href: "/aggregator/lot-validation",
          },
          {
            id: "agg-validated",
            label: "Validated lots",
            detail: `${validated} lots cleared for aggregation`,
            href: "/aggregator/lot-validation",
          },
          {
            id: "agg-rejected",
            label: "Rejected lots",
            detail: `${lots.filter((l) => l.validationStatus === "REJECTED").length} not eligible`,
            href: "/aggregator/lot-validation",
          },
        ],
      },
      {
        id: "aggregation",
        title: "Aggregation activity",
        summary: `${aggregated} aggregated lot(s) produced`,
        items:
          aggregated === 0
            ? []
            : lots
                .filter((l) => l.publicLotCode.startsWith("AGG-"))
                .slice(0, 8)
                .map((l) => ({
                  id: l.id,
                  label: l.publicLotCode,
                  detail: `${l.weightKg} kg · ${l.status}`,
                  href: "/aggregator/aggregate",
                })),
      },
      {
        id: "farmer-lots",
        title: "Farmer origin lots",
        summary: `${lots.filter((l) => l.status === "AT_FARM").length} lot(s) still at farm`,
        items: lots
          .filter((l) => l.status === "AT_FARM")
          .slice(0, 8)
          .map((l) => ({
            id: l.id,
            label: l.publicLotCode,
            detail: `${l.weightKg} kg · farmer ${l.farmerId} · ${l.validationStatus}`,
            href: "/aggregator/farmer-lots",
          })),
      },
    ],
    [lots, pending, validated, aggregated],
  );

  if (!authUser || authUser.role !== "Aggregator") return null;

  return (
    <RoleShell role="Aggregator" navItems={NAV_BY_ROLE.Aggregator}>
      <RoleDashboard
        kicker="Aggregator"
        title="Recent aggregations"
        description="Source farmer lots, validate quality signals, and aggregate eligible inventory."
        stats={[
          {
            label: "Awaiting validation",
            value: pending,
            accent: pending > 0 ? "amber" : "normal",
          },
          { label: "Validated", value: validated },
          { label: "Aggregated lots", value: aggregated },
        ]}
        primaryAction={{ href: "/aggregator/lot-validation", label: "Validate lots" }}
        secondaryActions={[{ href: "/aggregator/aggregate", label: "Create aggregation" }]}
        ledgerTitle="Recent aggregations"
        ledgerBlurb="Output lot codes you produced. Follow a row to see the aggregation detail."
        ledgerRows={ledgerRows}
        modules={modules}
      />
    </RoleShell>
  );
}
