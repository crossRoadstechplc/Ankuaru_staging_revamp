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

export function FarmerWorkspace() {
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
      if (!authUser || authUser.role !== "Farmer") return;
      try {
        const [f, l] = await Promise.all([
          phase1Fetch<{ fields: Field[] }>(authUser, "/api/phase1/fields"),
          phase1Fetch<{ lots: Lot[] }>(authUser, "/api/phase1/farmer/lots"),
        ]);
        if (canceled) return;
        setFields(f.fields);
        setLots(l.lots);
        const pickEvents = l.lots
          .map<Event>((lot) => ({
            id: lot.id,
            type: "PICK",
            timestamp: lot.createdAt,
            actorId: lot.farmerId,
            actorRole: "Farmer",
            inputLotIds: [],
            outputLotIds: [lot.id],
            metadata: lot.fieldId ? { fieldId: lot.fieldId } : undefined,
          }))
          .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
        setEvents(pickEvents);
      } catch {
        // silent — show empty state
      }
    };
    void run();
    return () => {
      canceled = true;
    };
  }, [authUser]);

  const pendingValidation = useMemo(
    () => lots.filter((l) => l.validationStatus === "PENDING").length,
    [lots],
  );

  const ledgerRows = useMemo<DashLedgerRow[]>(
    () =>
      events.slice(0, 8).map((e) => {
        const lot = lots.find((l) => l.id === e.outputLotIds[0]);
        const field = fields.find((f) => f.id === (e.metadata?.fieldId as string | undefined));
        return {
          id: e.id,
          code: lot?.publicLotCode ?? e.outputLotIds[0] ?? "—",
          detail: [
            lot ? `${lot.weightKg} kg` : null,
            field ? field.name : "Origin pick",
            lot ? `validation: ${lot.validationStatus}` : null,
          ]
            .filter(Boolean)
            .join(" · "),
          ts: e.timestamp,
        };
      }),
    [events, lots, fields],
  );

  const modules = useMemo<DashModule[]>(
    () => [
      {
        id: "fields",
        title: "Field registry",
        summary: `${fields.length} production field(s) registered`,
        items: fields.slice(0, 8).map((f) => ({
          id: f.id,
          label: f.name,
          detail: f.areaSqm ? `${f.areaSqm} sqm` : "Area not set",
          href: "/farmer/fields",
        })),
      },
      {
        id: "lots",
        title: "Origin lots",
        summary: `${lots.length} lot(s) · ${pendingValidation} awaiting aggregator validation`,
        items: lots.slice(0, 8).map((l) => ({
          id: l.id,
          label: l.publicLotCode,
          detail: `${l.weightKg} kg · ${l.form} · ${l.validationStatus}`,
          href: "/farmer/lots",
        })),
      },
    ],
    [fields, lots, pendingValidation],
  );

  if (!authUser || authUser.role !== "Farmer") return null;

  return (
    <RoleShell role="Farmer" navItems={NAV_BY_ROLE.Farmer}>
      <RoleDashboard
        kicker="Farmer"
        title="Recent origin picks"
        description="Track production plots and picked lots. Each lot you create starts the traceability chain."
        stats={[
          { label: "Fields", value: fields.length },
          { label: "Lots", value: lots.length },
          {
            label: "Awaiting validation",
            value: pendingValidation,
            accent: pendingValidation > 0 ? "amber" : "normal",
          },
        ]}
        primaryAction={{ href: "/farmer/lots", label: "Create pick lot" }}
        secondaryActions={[{ href: "/farmer/fields", label: "Add field" }]}
        ledgerTitle="Recent origin picks"
        ledgerBlurb="Each row is a lot code you created from the field. Open Lots for full detail."
        ledgerRows={ledgerRows}
        modules={modules}
      />
    </RoleShell>
  );
}
