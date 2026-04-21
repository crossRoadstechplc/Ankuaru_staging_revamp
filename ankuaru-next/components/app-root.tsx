"use client";

import { useEffect } from "react";
import { LegacyShell } from "@/components/legacy-shell";
import { LoginScreen } from "@/components/login-screen";
import { useAppStore } from "@/lib/store/useAppStore";
import type { SanitizedUser } from "@/lib/auth/users";
import { AUTH_STORAGE_KEY } from "@/lib/auth/session";

export function AppRoot() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const login = useAppStore((s) => s.login);

  useEffect(() => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!saved) return;
    try {
      login(JSON.parse(saved) as SanitizedUser);
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [login]);

  const onLogin = (user: SanitizedUser) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    login(user);
  };

  if (!isAuthenticated) return <LoginScreen onLogin={onLogin} />;
  return <LegacyShell />;
}
