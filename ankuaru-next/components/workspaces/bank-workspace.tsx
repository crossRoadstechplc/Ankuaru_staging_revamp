"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { RoleDashboard } from "@/components/workspaces/role-dashboard";
import type { DashLedgerRow, DashModule } from "@/components/workspaces/role-dashboard";
import { phase1Fetch } from "@/lib/phase1/client";
import type { BankReview } from "@/lib/phase1/types";
import { NAV_BY_ROLE } from "@/lib/phase1/nav";
import { useAppStore } from "@/lib/store/useAppStore";

export function BankWorkspace() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const [reviews, setReviews] = useState<BankReview[]>([]);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (!authUser || authUser.role !== "Bank") return;
      try {
        const res = await phase1Fetch<{ bankReviews: BankReview[] }>(authUser, "/api/phase1/bank/reviews");
        if (!canceled) setReviews(res.bankReviews);
      } catch {
        // silent
      }
    };
    void run();
    return () => { canceled = true; };
  }, [authUser]);

  const pending = useMemo(() => reviews.filter((r) => r.reviewStatus === "PENDING_REVIEW").length, [reviews]);
  const inProgress = useMemo(() => reviews.filter((r) => r.reviewStatus === "BACKGROUND_CHECK_IN_PROGRESS").length, [reviews]);
  const approved = useMemo(() => reviews.filter((r) => r.reviewStatus === "APPROVED").length, [reviews]);
  const rejected = useMemo(() => reviews.filter((r) => r.reviewStatus === "REJECTED").length, [reviews]);

  const ledgerRows = useMemo<DashLedgerRow[]>(
    () =>
      reviews
        .slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, 8)
        .map((r) => ({
          id: r.id,
          code: r.applicantUserId,
          detail: `status: ${r.reviewStatus}${r.notes ? ` · ${r.notes}` : ""}`,
          ts: r.updatedAt,
        })),
    [reviews],
  );

  const STATUS_LABEL: Record<string, string> = {
    PENDING_REVIEW: "Pending",
    BACKGROUND_CHECK_IN_PROGRESS: "In progress",
    APPROVED: "Approved",
    REJECTED: "Rejected",
  };

  const modules = useMemo<DashModule[]>(
    () => [
      {
        id: "pending",
        title: "Pending onboarding reviews",
        summary: `${pending} pending · ${inProgress} in progress`,
        items: reviews
          .filter((r) => r.reviewStatus === "PENDING_REVIEW" || r.reviewStatus === "BACKGROUND_CHECK_IN_PROGRESS")
          .slice(0, 8)
          .map((r) => ({
            id: r.id,
            label: r.applicantUserId,
            detail: `${STATUS_LABEL[r.reviewStatus] ?? r.reviewStatus} · opened ${r.createdAt.slice(0, 10)}`,
            href: `/bank/onboarding/${r.id}`,
          })),
      },
      {
        id: "completed",
        title: "Completed reviews",
        summary: `${approved} approved · ${rejected} rejected`,
        items: reviews
          .filter((r) => r.reviewStatus === "APPROVED" || r.reviewStatus === "REJECTED")
          .slice()
          .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
          .slice(0, 8)
          .map((r) => ({
            id: r.id,
            label: r.applicantUserId,
            detail: `${STATUS_LABEL[r.reviewStatus] ?? r.reviewStatus}${r.approvedAt ? ` · ${r.approvedAt.slice(0, 10)}` : r.rejectedAt ? ` · ${r.rejectedAt.slice(0, 10)}` : ""}`,
            href: `/bank/onboarding/${r.id}`,
          })),
      },
    ],
    [reviews, pending, inProgress, approved, rejected],
  );

  if (!authUser || authUser.role !== "Bank") return null;

  return (
    <RoleShell role="Bank" navItems={NAV_BY_ROLE.Bank}>
      <RoleDashboard
        kicker="Bank"
        title="Bank workspace"
        description="Review applicant onboarding cases and manage financial assessments. Approved participants gain access to the platform."
        stats={[
          { label: "Pending review", value: pending, accent: pending > 0 ? "amber" : "normal" },
          { label: "In progress", value: inProgress },
          { label: "Approved", value: approved },
          { label: "Rejected", value: rejected, accent: rejected > 0 ? "red" : "normal" },
        ]}
        primaryAction={{ href: "/bank/onboarding", label: "View onboarding queue" }}
        ledgerTitle="Recent review activity"
        ledgerBlurb="Each row is an onboarding case. Click Onboarding Reviews to create or manage cases."
        ledgerRows={ledgerRows}
        modules={modules}
      />
    </RoleShell>
  );
}
