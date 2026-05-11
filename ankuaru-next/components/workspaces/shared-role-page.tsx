"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { NAV_BY_ROLE } from "@/lib/phase1/nav";
import type { NavRole } from "@/lib/phase1/nav";
import { useAppStore } from "@/lib/store/useAppStore";

type SharedRolePageProps = {
  title: "Account" | "Settings" | "Help";
  blurb: string;
};

export function SharedRolePage({ title, blurb }: SharedRolePageProps) {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  if (!authUser || authUser.role === "Trader") return null;
  if (!(authUser.role in NAV_BY_ROLE)) return null;

  const role = authUser.role as NavRole;

  return (
    <RoleShell role={role} navItems={NAV_BY_ROLE[role]}>
      <div style={{ padding: 16 }}>
        <div style={{ fontWeight: 800, letterSpacing: ".02em" }}>{title}</div>
        <div style={{ marginTop: 6, color: "var(--tx2)" }}>{blurb}</div>
      </div>
    </RoleShell>
  );
}

