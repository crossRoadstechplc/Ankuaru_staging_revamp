"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { RoleDashboard } from "@/components/workspaces/role-dashboard";
import type { DashLedgerRow, DashModule } from "@/components/workspaces/role-dashboard";
import { phase1Fetch } from "@/lib/phase1/client";
import type { LabResult, Lot } from "@/lib/phase1/types";
import { NAV_BY_ROLE } from "@/lib/phase1/nav";
import { useAppStore } from "@/lib/store/useAppStore";

export function LabWorkspace() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [queue, setQueue] = useState<Lot[]>([]);
  const [labResults, setLabResults] = useState<LabResult[]>([]);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (!authUser || authUser.role !== "Lab") return;
      try {
        const [q, r] = await Promise.all([
          phase1Fetch<{ lots: Lot[] }>(authUser, "/api/phase1/lab/queue"),
          phase1Fetch<{ labResults: LabResult[] }>(authUser, "/api/phase1/lab/results"),
        ]);
        if (!canceled) {
          setQueue(q.lots);
          setLabResults(r.labResults);
        }
      } catch {
        // silent
      }
    };
    void run();
    return () => { canceled = true; };
  }, [authUser]);

  const approved = useMemo(() => labResults.filter((r) => r.status === "APPROVED").length, [labResults]);
  const failed = useMemo(() => labResults.filter((r) => r.status === "FAILED").length, [labResults]);

  const ledgerRows = useMemo<DashLedgerRow[]>(
    () =>
      labResults
        .slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, 8)
        .map((r) => {
          const lot = queue.find((l) => l.id === r.lotId);
          return {
            id: r.id,
            code: lot?.publicLotCode ?? r.lotId,
            detail: [
              `status: ${r.status}`,
              typeof r.score === "number" ? `score: ${r.score}` : null,
              r.notes ? `notes: ${r.notes}` : null,
            ]
              .filter(Boolean)
              .join(" · "),
            ts: r.createdAt,
          };
        }),
    [labResults, queue],
  );

  const modules = useMemo<DashModule[]>(
    () => [
      {
        id: "queue",
        title: "Assessment queue",
        summary: `${queue.length} lot(s) awaiting lab assessment`,
        items: queue.slice(0, 8).map((l) => ({
          id: l.id,
          label: l.publicLotCode,
          detail: `${l.weightKg} kg · ${l.form} · lab status: ${l.labStatus ?? "pending"}`,
          href: `/lab/assess/${l.id}`,
        })),
      },
      {
        id: "results",
        title: "Lab results",
        summary: `${approved} approved · ${failed} failed · ${labResults.length} total`,
        items: labResults
          .slice()
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
          .slice(0, 8)
          .map((r) => ({
            id: r.id,
            label: r.lotId,
            detail: `${r.status}${typeof r.score === "number" ? ` · score ${r.score}` : ""}`,
          })),
      },
    ],
    [queue, labResults, approved, failed],
  );

  if (!authUser || authUser.role !== "Lab") return null;

  return (
    <RoleShell role="Lab" navItems={NAV_BY_ROLE.Lab}>
      <RoleDashboard
        kicker="Lab"
        title="Lab workspace"
        description="Assess lots delivered for quality testing. Approve to move lots to READY FOR EXPORT, or fail them to quarantine."
        stats={[
          { label: "Awaiting assessment", value: queue.length, accent: queue.length > 0 ? "amber" : "normal" },
          { label: "Approved", value: approved },
          { label: "Failed / Quarantined", value: failed, accent: failed > 0 ? "red" : "normal" },
        ]}
        primaryAction={{ href: "/lab/queue", label: "View assessment queue" }}
        ledgerTitle="Recent lab results"
        ledgerBlurb="Each row is a lab result you submitted for a lot."
        ledgerRows={ledgerRows}
        modules={modules}
      />
    </RoleShell>
  );
}
