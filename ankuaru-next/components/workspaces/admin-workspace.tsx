"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { RoleDashboard } from "@/components/workspaces/role-dashboard";
import type { DashLedgerRow, DashModule } from "@/components/workspaces/role-dashboard";
import { phase1Fetch } from "@/lib/phase1/client";
import type { Event, Field, Lot } from "@/lib/phase1/types";
import { NAV_BY_ROLE } from "@/lib/phase1/nav";
import { useAppStore } from "@/lib/store/useAppStore";

export function AdminWorkspace() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [fields, setFields] = useState<Field[]>([]);
  const [lots, setLots] = useState<Lot[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (!authUser || authUser.role !== "Admin") return;
      try {
        const [f, l, e] = await Promise.all([
          phase1Fetch<{ fields: Field[] }>(authUser, "/api/phase1/fields"),
          phase1Fetch<{ lots: Lot[] }>(authUser, "/api/phase1/lots"),
          phase1Fetch<{ events: Event[] }>(authUser, "/api/phase1/events"),
        ]);
        if (canceled) return;
        setFields(f.fields);
        setLots(l.lots);
        setEvents(e.events.slice().reverse());
      } catch {
        // silent
      }
    };
    void run();
    return () => {
      canceled = true;
    };
  }, [authUser]);

  const ledgerRows = useMemo<DashLedgerRow[]>(
    () =>
      events.slice(0, 8).map((e) => {
        const lotId = e.outputLotIds[0] ?? e.inputLotIds[0];
        const lot = lots.find((l) => l.id === lotId);
        return {
          id: e.id,
          code: lot?.publicLotCode ?? e.type,
          detail: `${e.type} · ${e.actorRole} · ${e.actorId}`,
          ts: e.timestamp,
        };
      }),
    [events, lots],
  );

  const modules = useMemo<DashModule[]>(
    () => [
      {
        id: "master-data",
        title: "Master data",
        summary: `${fields.length} fields · ${lots.length} lots · ${events.length} events`,
        items: [
          { id: "fields", label: "Fields", detail: `${fields.length} farm production plots`, href: "/admin/fields" },
          { id: "lots", label: "Lots", detail: `${lots.length} snapshots & transforms`, href: "/admin/lots" },
          { id: "events", label: "Events", detail: `${events.length} ledger records`, href: "/admin/events" },
        ],
      },
      {
        id: "recent-lots",
        title: "All lots",
        summary: `${lots.length} lot(s) across all farmers`,
        items: lots.slice(0, 8).map((l) => ({
          id: l.id,
          label: l.publicLotCode,
          detail: `${l.weightKg} kg · ${l.form} · ${l.status} · ${l.validationStatus} · farmer ${l.farmerId}`,
          href: "/admin/lots",
        })),
      },
    ],
    [fields, lots, events],
  );

  if (!authUser || authUser.role !== "Admin") return null;

  return (
    <RoleShell role="Admin" navItems={NAV_BY_ROLE.Admin}>
      <RoleDashboard
        kicker="Admin"
        title="Cross-role ledger highlights"
        description="Platform master data. Latest events across all farmers, aggregators, and processors."
        stats={[
          { label: "Fields", value: fields.length },
          { label: "Lots", value: lots.length },
          { label: "Events", value: events.length },
        ]}
        primaryAction={{ href: "/admin/lots", label: "View all lots" }}
        secondaryActions={[
          { href: "/admin/fields", label: "Fields" },
          { href: "/admin/events", label: "Events" },
        ]}
        ledgerTitle="Latest ledger events"
        ledgerBlurb="Most recent events across all roles — newest first."
        ledgerRows={ledgerRows}
        modules={modules}
      />
    </RoleShell>
  );
}
