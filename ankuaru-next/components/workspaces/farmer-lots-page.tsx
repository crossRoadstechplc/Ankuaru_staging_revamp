"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { phase1Fetch } from "@/lib/phase1/client";
import type { Field, Lot } from "@/lib/phase1/types";
import { useAppStore } from "@/lib/store/useAppStore";

export function FarmerLotsPage() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [lots, setLots] = useState<Lot[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [fieldId, setFieldId] = useState<string>("");
  const [weightKg, setWeightKg] = useState<string>("50");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const disabled = useMemo(() => Number(weightKg) <= 0, [weightKg]);

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
        const [lotsPayload, fieldsPayload] = await Promise.all([
          phase1Fetch<{ lots: Lot[] }>(authUser, "/api/phase1/farmer/lots"),
          phase1Fetch<{ fields: Field[] }>(authUser, "/api/phase1/fields"),
        ]);
        if (!canceled) {
          setLots(lotsPayload.lots);
          setFields(fieldsPayload.fields);
          if (!fieldId && fieldsPayload.fields[0]) setFieldId(fieldsPayload.fields[0].id);
        }
      } catch (e) {
        if (!canceled) setError(e instanceof Error ? e.message : "Failed to load lots.");
      } finally {
        if (!canceled) setLoading(false);
      }
    };
    void run();
    return () => {
      canceled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!authUser) return;
    setError("");
    try {
      const payload = await phase1Fetch<{ lot: Lot }>(authUser, "/api/phase1/farmer/lots", {
        method: "POST",
        body: JSON.stringify({
          fieldId: fieldId || undefined,
          weightKg: Number(weightKg),
        }),
      });
      setLots((prev) => [payload.lot, ...prev]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Create lot failed.");
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
        <div style={{ fontWeight: 800, letterSpacing: ".02em" }}>Lots (Origin picks)</div>

        <form onSubmit={submit} style={{ marginTop: 12, display: "grid", gap: 8, maxWidth: 520 }}>
          <label className="login-label" htmlFor="field">
            Field (optional)
          </label>
          <select id="field" className="login-input text-black" value={fieldId} onChange={(e) => setFieldId(e.target.value)}>
            <option value="">—</option>
            {fields.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>

          <label className="login-label" htmlFor="weight">
            Weight (kg)
          </label>
          <input
            id="weight"
            className="login-input text-black"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            inputMode="decimal"
          />

          {error ? <div className="login-error">{error}</div> : null}
          <button className="login-btn" type="submit" disabled={disabled}>
            Create pick lot
          </button>
        </form>

        <div style={{ marginTop: 16, color: "var(--tx2)" }}>{loading ? "Loading…" : `${lots.length} lot(s)`}</div>

        <div style={{ marginTop: 10, display: "grid", gap: 8, maxWidth: 860 }}>
          {lots.map((l) => (
            <div key={l.id} style={{ padding: 12, border: "1px solid var(--border)", borderRadius: 10, background: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ fontWeight: 700 }}>{l.publicLotCode}</div>
                <div style={{ fontSize: 12, color: "var(--tx2)" }}>{l.weightKg} kg</div>
              </div>
              <div style={{ marginTop: 4, fontSize: 12, color: "var(--tx2)" }}>
                {l.form} · {l.status} · validation {l.validationStatus}
                {l.fieldId ? ` · field ${l.fieldId}` : ""}
              </div>
            </div>
          ))}
        </div>
      </div>
    </RoleShell>
  );
}

