"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { phase1Fetch } from "@/lib/phase1/client";
import type { Field } from "@/lib/phase1/types";
import { useAppStore } from "@/lib/store/useAppStore";

export function AdminFieldsPage() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const [fields, setFields] = useState<Field[]>([]);
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
        const payload = await phase1Fetch<{ fields: Field[] }>(authUser, "/api/phase1/fields");
        if (!canceled) setFields(payload.fields);
      } catch (e) {
        if (!canceled) setError(e instanceof Error ? e.message : "Failed to load fields.");
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
        <div style={{ fontWeight: 800, letterSpacing: ".02em" }}>Fields (global)</div>
        {error ? <div className="login-error" style={{ marginTop: 10 }}>{error}</div> : null}

        <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
          {fields.map((f) => (
            <div key={f.id} style={{ padding: 12, border: "1px solid var(--border)", borderRadius: 12, background: "#fff" }}>
              <div style={{ fontWeight: 800 }}>{f.name}</div>
              <div style={{ marginTop: 6, fontSize: 12, color: "var(--tx2)" }}>
                farmer {f.farmerId} · {f.areaSqm ? `${f.areaSqm} sqm` : "area unknown"} · {f.id}
              </div>
            </div>
          ))}
          {fields.length === 0 ? <div style={{ fontSize: 12, color: "var(--tx3)" }}>No fields yet.</div> : null}
        </div>
      </div>
    </RoleShell>
  );
}

