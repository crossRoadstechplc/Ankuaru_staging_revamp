"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { NAV_BY_ROLE } from "@/lib/phase1/nav";
import { useAppStore } from "@/lib/store/useAppStore";

export default function RegulatorPage() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  if (!authUser || authUser.role !== "Regulator") return null;
  return (
    <RoleShell role="Regulator" navItems={NAV_BY_ROLE.Regulator}>
      <div />
    </RoleShell>
  );
}
