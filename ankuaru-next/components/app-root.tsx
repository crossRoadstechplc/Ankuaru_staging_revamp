"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LegacyShell } from "@/components/legacy-shell";
import { LoginScreen } from "@/components/login-screen";
import { useAppStore } from "@/lib/store/useAppStore";
import type { SanitizedUser } from "@/lib/auth/users";
import { AUTH_STORAGE_KEY } from "@/lib/auth/session";

export function AppRoot() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const authUser = useAppStore((s) => s.authUser);
  const login = useAppStore((s) => s.login);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!saved) return;
    try {
      login(JSON.parse(saved) as SanitizedUser);
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [login]);

  useEffect(() => {
    if (!isAuthenticated || !authUser) return;
    const role = authUser.role;
    if (role === "Trader") {
      if (pathname !== "/") router.replace("/");
      return;
    }

    const SECTION_ROOTS: Partial<Record<typeof role, string>> = {
      Admin: "/admin",
      Farmer: "/farmer",
      Aggregator: "/aggregator",
      Processor: "/processor",
      Transporter: "/transporter",
      Lab: "/lab",
      Bank: "/bank",
      Regulator: "/regulator",
    };
    const sectionRoot = SECTION_ROOTS[role];
    if (!sectionRoot) {
      router.replace("/");
      return;
    }
    const isSharedPage = pathname === "/account" || pathname === "/settings" || pathname === "/help";
    const inRoleSection = pathname.startsWith(sectionRoot);
    if (!inRoleSection && !isSharedPage) {
      router.replace(sectionRoot);
    }
  }, [authUser, isAuthenticated, pathname, router]);

  const onLogin = (user: SanitizedUser) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    login(user);
  };

  if (!isAuthenticated) return <LoginScreen onLogin={onLogin} />;
  if (authUser?.role === "Trader") return <LegacyShell />;
  return null;
}
