"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { phase1Fetch } from "@/lib/phase1/client";
import type { Lot } from "@/lib/phase1/types";
import { useAppStore } from "@/lib/store/useAppStore";

export function AdminLotsPage() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const [lots, setLots] = useState<Lot[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (!authUser || authUser.role !== "Admin") return;
      setError("");
      try {
        const payload = await phase1Fetch<{ lots: Lot[] }>(authUser, "/api/phase1/lots");
        if (!canceled) setLots(payload.lots);
      } catch (e) {
        if (!canceled) setError(e instanceof Error ? e.message : "Failed to load lots.");
      }
    };
    void run();
    return () => {
      canceled = true;
    };
  }, [authUser]);

  if (!authUser || authUser.role !== "Admin") return null;

  return (
    <RoleShell
      role="Admin"
      navItems={[
        { id: "dash", label: "Dashboard", href: "/admin" },
        { id: "fields", label: "Fields", href: "/admin/fields" },
        { id: "lots", label: "Lots", href: "/admin/lots" },
        { id: "events", label: "Events", href: "/admin/events" },
      ]}
    >
      <div style={{ padding: 16, maxWidth: 980 }}>
        <div style={{ fontWeight: 800, letterSpacing: ".02em" }}>Lots (global)</div>
        {error ? <div className="login-error" style={{ marginTop: 10 }}>{error}</div> : null}

        <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
          {lots.map((l) => (
            <div key={l.id} style={{ padding: 12, border: "1px solid var(--border)", borderRadius: 12, background: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ fontWeight: 800 }}>{l.publicLotCode}</div>
                <div style={{ fontSize: 12, color: "var(--tx2)" }}>{l.weightKg} kg</div>
              </div>
              <div style={{ marginTop: 6, fontSize: 12, color: "var(--tx2)" }}>
                {l.form} · {l.status} · validation {l.validationStatus}
                {l.farmerId ? ` · farmer ${l.farmerId}` : ""}
              </div>
            </div>
          ))}
          {lots.length === 0 ? <div style={{ fontSize: 12, color: "var(--tx3)" }}>No lots yet.</div> : null}
        </div>
      </div>
    </RoleShell>
  );
}

