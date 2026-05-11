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

export function ProcessorWorkspace() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [queue, setQueue] = useState<Lot[]>([]);
  const [allLots, setAllLots] = useState<Lot[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (!authUser || authUser.role !== "Processor") return;
      try {
        const [q, lotsRes] = await Promise.all([
          phase1Fetch<{ lots: Lot[] }>(authUser, "/api/phase1/processor/queue"),
          phase1Fetch<{ lots: Lot[] }>(authUser, "/api/phase1/lots"),
        ]);
        if (canceled) return;
        setQueue(q.lots);
        setAllLots(lotsRes.lots);
        // Build process events from lot history (output lots with IN_PROCESSING status)
        const processedLots = lotsRes.lots
          .filter((l) => l.parentLotIds && l.parentLotIds.length > 0 && l.custodianId === authUser.username)
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setEvents(
          processedLots.map<Event>((l) => ({
            id: l.id,
            type: "PROCESS",
            timestamp: l.createdAt,
            actorId: authUser.username,
            actorRole: "Processor",
            inputLotIds: l.parentLotIds ?? [],
            outputLotIds: [l.id],
            metadata: { processingMethod: l.processingMethod },
          })),
        );
      } catch {
        // show empty state silently
      }
    };
    void run();
    return () => {
      canceled = true;
    };
  }, [authUser]);

  const inProcessingLots = useMemo(
    () => allLots.filter((l) => l.status === "IN_PROCESSING"),
    [allLots],
  );

  const ledgerRows = useMemo<DashLedgerRow[]>(
    () =>
      events.slice(0, 8).map((e) => {
        const outputLot = allLots.find((l) => l.id === e.outputLotIds[0]);
        return {
          id: e.id,
          code: outputLot?.publicLotCode ?? e.outputLotIds[0] ?? "—",
          detail: [
            outputLot ? `${outputLot.weightKg} kg` : null,
            outputLot ? outputLot.form : null,
            e.metadata?.processingMethod ? `method: ${String(e.metadata.processingMethod)}` : null,
          ]
            .filter(Boolean)
            .join(" · "),
          ts: e.timestamp,
        };
      }),
    [events, allLots],
  );

  const modules = useMemo<DashModule[]>(
    () => [
      {
        id: "queue",
        title: "Processing queue",
        summary: `${queue.length} lot(s) ready for processing`,
        items: queue.slice(0, 8).map((l) => ({
          id: l.id,
          label: l.publicLotCode,
          detail: `${l.weightKg} kg · ${l.form}`,
          href: "/processor/queue",
        })),
      },
      {
        id: "inProcessing",
        title: "In processing",
        summary: `${inProcessingLots.length} output lot(s) currently being processed`,
        items: inProcessingLots.slice(0, 8).map((l) => ({
          id: l.id,
          label: l.publicLotCode,
          detail: `${l.weightKg} kg · ${l.form} · method: ${l.processingMethod ?? "—"}`,
          href: "/processor/queue",
        })),
      },
    ],
    [queue, inProcessingLots],
  );

  if (!authUser || authUser.role !== "Processor") return null;

  return (
    <RoleShell role="Processor" navItems={NAV_BY_ROLE.Processor}>
      <RoleDashboard
        kicker="Processor"
        title="Processing workspace"
        description="Manage lot transformation from raw cherry to processed output. Each processing run records a mass-balanced event on the traceability chain."
        stats={[
          { label: "Ready for processing", value: queue.length, accent: queue.length > 0 ? "amber" : "normal" },
          { label: "In processing", value: inProcessingLots.length },
          { label: "Output lots created", value: events.length },
        ]}
        primaryAction={{ href: "/processor/queue", label: "View processing queue" }}
        secondaryActions={[{ href: "/processor/record", label: "Record processing" }]}
        ledgerTitle="Recent processing runs"
        ledgerBlurb="Each row is an output lot from a processing run you recorded."
        ledgerRows={ledgerRows}
        modules={modules}
      />
    </RoleShell>
  );
}
