"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { phase1Fetch } from "@/lib/phase1/client";
import type { Field } from "@/lib/phase1/types";
import { useAppStore } from "@/lib/store/useAppStore";

export function FarmerFieldsPage() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [fields, setFields] = useState<Field[]>([]);
  const [name, setName] = useState("");
  const [areaSqm, setAreaSqm] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const disabled = useMemo(() => !name.trim(), [name]);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (!authUser || authUser.role !== "Farmer") return;
      setLoading(true);
      setError("");
      try {
        const payload = await phase1Fetch<{ fields: Field[] }>(authUser, "/api/phase1/fields");
        if (!canceled) setFields(payload.fields);
      } catch (e) {
        if (!canceled) setError(e instanceof Error ? e.message : "Failed to load fields.");
      } finally {
        if (!canceled) setLoading(false);
      }
    };
    void run();
    return () => {
      canceled = true;
    };
  }, [authUser]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!authUser) return;
    setError("");
    try {
      const payload = await phase1Fetch<{ field: Field }>(authUser, "/api/phase1/fields", {
        method: "POST",
        body: JSON.stringify({
          name,
          areaSqm: areaSqm.trim() ? Number(areaSqm) : undefined,
        }),
      });
      setFields((prev) => [payload.field, ...prev]);
      setName("");
      setAreaSqm("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Create field failed.");
    }
  };

  if (!authUser || authUser.role !== "Farmer") return null;

  return (
    <RoleShell
      role="Farmer"
      navItems={[
        { id: "dash", label: "Dashboard", href: "/farmer" },
        { id: "fields", label: "Fields", href: "/farmer/fields" },
        { id: "lots", label: "Lots", href: "/farmer/lots" },
      ]}
    >
      <div style={{ padding: 16 }}>
        <div style={{ fontWeight: 800, letterSpacing: ".02em" }}>Fields</div>

        <form onSubmit={submit} style={{ marginTop: 12, display: "grid", gap: 8, maxWidth: 520 }}>
          <label className="login-label" htmlFor="field-name">
            Field name
          </label>
          <input
            id="field-name"
            className="login-input text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Plot A"
          />
          <label className="login-label" htmlFor="field-area">
            Area (sqm) — optional
          </label>
          <input
            id="field-area"
            className="login-input text-black"
            value={areaSqm}
            onChange={(e) => setAreaSqm(e.target.value)}
            placeholder="e.g. 1200"
          />
          {error ? <div className="login-error">{error}</div> : null}
          <button className="login-btn" type="submit" disabled={disabled}>
            Add field
          </button>
        </form>

        <div style={{ marginTop: 16, color: "var(--tx2)" }}>{loading ? "Loading…" : `${fields.length} field(s)`}</div>

        <div style={{ marginTop: 10, display: "grid", gap: 8, maxWidth: 720 }}>
          {fields.map((f) => (
            <div key={f.id} style={{ padding: 12, border: "1px solid var(--border)", borderRadius: 10, background: "#fff" }}>
              <div style={{ fontWeight: 700 }}>{f.name}</div>
              <div style={{ marginTop: 4, fontSize: 12, color: "var(--tx2)" }}>
                {f.areaSqm ? `${f.areaSqm} sqm` : "area unknown"} · {f.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </RoleShell>
  );
}

