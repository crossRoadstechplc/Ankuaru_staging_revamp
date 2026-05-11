"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { NAV_BY_ROLE } from "@/lib/phase1/nav";
import { phase1Fetch } from "@/lib/phase1/client";
import type { Lot, LotForm, ProcessingMethod, ByproductKind } from "@/lib/phase1/types";
import { useAppStore } from "@/lib/store/useAppStore";

const OUTPUT_FORMS: Exclude<LotForm, "BYPRODUCT">[] = ["GREEN", "PARCHMENT", "CHERRY"];
const METHODS: ProcessingMethod[] = ["washed", "natural"];
const BYPRODUCT_KINDS: ByproductKind[] = ["pulp", "husk", "parchment", "defects", "moistureLoss"];

type ByproductRow = { kind: ByproductKind; weightKg: string };

export function ProcessorRecordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [queue, setQueue] = useState<Lot[]>([]);
  const [selectedLotId, setSelectedLotId] = useState(searchParams.get("lotId") ?? "");
  const [inputWeight, setInputWeight] = useState("");
  const [outputWeight, setOutputWeight] = useState("");
  const [outputForm, setOutputForm] = useState<Exclude<LotForm, "BYPRODUCT">>("GREEN");
  const [method, setMethod] = useState<ProcessingMethod>("washed");
  const [byproducts, setByproducts] = useState<ByproductRow[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (!authUser || authUser.role !== "Processor") return;
      try {
        const res = await phase1Fetch<{ lots: Lot[] }>(authUser, "/api/phase1/processor/queue");
        if (!canceled) setQueue(res.lots);
      } catch {
        // silent
      }
    };
    void run();
    return () => {
      canceled = true;
    };
  }, [authUser]);

  const selectedLot = queue.find((l) => l.id === selectedLotId);

  const addByproduct = () => {
    setByproducts((prev) => [...prev, { kind: "pulp", weightKg: "" }]);
  };

  const removeByproduct = (idx: number) => {
    setByproducts((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateByproduct = (idx: number, field: keyof ByproductRow, value: string) => {
    setByproducts((prev) => prev.map((b, i) => (i === idx ? { ...b, [field]: value } : b)));
  };

  const byproductTotal = byproducts.reduce((sum, b) => sum + (parseFloat(b.weightKg) || 0), 0);
  const balanceOk =
    inputWeight && outputWeight
      ? Math.abs(parseFloat(inputWeight) - parseFloat(outputWeight) - byproductTotal) < 0.01
      : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser || !selectedLotId || !inputWeight || !outputWeight) return;
    setError("");
    setSubmitting(true);
    try {
      await phase1Fetch(authUser, "/api/phase1/processor/process", {
        method: "POST",
        body: JSON.stringify({
          inputLotId: selectedLotId,
          inputWeightKg: parseFloat(inputWeight),
          outputWeightKg: parseFloat(outputWeight),
          outputForm,
          processingMethod: method,
          byproducts: byproducts
            .filter((b) => parseFloat(b.weightKg) > 0)
            .map((b) => ({ kind: b.kind, weightKg: parseFloat(b.weightKg) })),
        }),
      });
      setSuccess(true);
      setTimeout(() => router.push("/processor/queue"), 1800);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Processing failed. Please check all values.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!authUser || authUser.role !== "Processor") return null;

  const inputField = (label: string, element: React.ReactNode) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--tx2)", marginBottom: 4 }}>
        {label}
      </label>
      {element}
    </div>
  );

  const selectStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 10px",
    border: "1px solid var(--border)",
    borderRadius: 7,
    background: "#fff",
    fontSize: 13,
    color: "var(--tx)",
    fontFamily: "inherit",
  };

  const inputStyle: React.CSSProperties = { ...selectStyle };

  return (
    <RoleShell role="Processor" navItems={NAV_BY_ROLE.Processor}>
      <div style={{ padding: 16, maxWidth: 640 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: "var(--amber)",
            marginBottom: 4,
          }}
        >
          Processor
        </div>
        <div style={{ fontWeight: 800, fontSize: 18, color: "var(--tx)", marginBottom: 4 }}>
          Record Processing
        </div>
        <div style={{ fontSize: 12, color: "var(--tx2)", marginBottom: 20 }}>
          Select a lot from the processing queue, define output weights, form, and method. Byproducts must balance
          the mass equation: input = output + all byproducts.
        </div>

        {success ? (
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 10,
              background: "rgba(22,101,52,.08)",
              border: "1px solid rgba(22,101,52,.25)",
              color: "#14532d",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            Processing recorded. Redirecting to queue…
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: 12,
                background: "#fff",
                padding: "16px 18px",
                marginBottom: 14,
              }}
            >
              {inputField(
                "Input lot (READY FOR PROCESSING)",
                <select
                  style={selectStyle}
                  value={selectedLotId}
                  onChange={(e) => setSelectedLotId(e.target.value)}
                  required
                >
                  <option value="">Select a lot…</option>
                  {queue.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.publicLotCode} — {l.weightKg} kg · {l.form}
                    </option>
                  ))}
                </select>,
              )}

              {selectedLot && (
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--tx3)",
                    padding: "8px 10px",
                    background: "var(--bg)",
                    borderRadius: 7,
                    marginBottom: 14,
                  }}
                >
                  Available: <strong>{selectedLot.weightKg} kg</strong> · Farmer: {selectedLot.farmerId}
                  {selectedLot.fieldId ? ` · Field: ${selectedLot.fieldId}` : ""}
                </div>
              )}

              {inputField(
                "Input weight used (kg)",
                <input
                  style={inputStyle}
                  type="number"
                  min="0.01"
                  step="0.01"
                  max={selectedLot?.weightKg}
                  value={inputWeight}
                  onChange={(e) => setInputWeight(e.target.value)}
                  placeholder="e.g. 500"
                  required
                />,
              )}

              {inputField(
                "Output form",
                <select
                  style={selectStyle}
                  value={outputForm}
                  onChange={(e) => setOutputForm(e.target.value as Exclude<LotForm, "BYPRODUCT">)}
                >
                  {OUTPUT_FORMS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>,
              )}

              {inputField(
                "Output weight (kg)",
                <input
                  style={inputStyle}
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={outputWeight}
                  onChange={(e) => setOutputWeight(e.target.value)}
                  placeholder="e.g. 420"
                  required
                />,
              )}

              {inputField(
                "Processing method",
                <select
                  style={selectStyle}
                  value={method}
                  onChange={(e) => setMethod(e.target.value as ProcessingMethod)}
                >
                  {METHODS.map((m) => (
                    <option key={m} value={m}>
                      {m.charAt(0).toUpperCase() + m.slice(1)}
                    </option>
                  ))}
                </select>,
              )}
            </div>

            {/* Byproducts */}
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: 12,
                background: "#fff",
                padding: "16px 18px",
                marginBottom: 14,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: "var(--tx)" }}>
                  Byproducts
                </div>
                <button
                  type="button"
                  onClick={addByproduct}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    background: "var(--bg)",
                    cursor: "pointer",
                    color: "var(--tx2)",
                    fontFamily: "inherit",
                  }}
                >
                  + Add byproduct
                </button>
              </div>

              {byproducts.length === 0 ? (
                <div style={{ fontSize: 12, color: "var(--tx3)" }}>
                  No byproducts added. If there are no byproducts, output weight must equal input weight.
                </div>
              ) : (
                <div style={{ display: "grid", gap: 8 }}>
                  {byproducts.map((b, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <select
                        style={{ ...selectStyle, flex: 1 }}
                        value={b.kind}
                        onChange={(e) => updateByproduct(i, "kind", e.target.value)}
                      >
                        {BYPRODUCT_KINDS.map((k) => (
                          <option key={k} value={k}>
                            {k}
                          </option>
                        ))}
                      </select>
                      <input
                        style={{ ...inputStyle, width: 100 }}
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={b.weightKg}
                        onChange={(e) => updateByproduct(i, "weightKg", e.target.value)}
                        placeholder="kg"
                      />
                      <button
                        type="button"
                        onClick={() => removeByproduct(i)}
                        style={{
                          width: 28,
                          height: 28,
                          border: "1px solid var(--border)",
                          borderRadius: 6,
                          background: "#fff",
                          cursor: "pointer",
                          color: "var(--tx3)",
                          fontFamily: "inherit",
                          fontSize: 14,
                          flexShrink: 0,
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {inputWeight && outputWeight && (
                <div
                  style={{
                    marginTop: 12,
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: balanceOk === true ? "rgba(22,101,52,.07)" : balanceOk === false ? "rgba(178,58,58,.07)" : "var(--bg)",
                    border: `1px solid ${balanceOk === true ? "rgba(22,101,52,.25)" : balanceOk === false ? "rgba(178,58,58,.25)" : "var(--border)"}`,
                    fontSize: 12,
                    color: balanceOk === true ? "#14532d" : balanceOk === false ? "#7a2a2a" : "var(--tx2)",
                    fontWeight: 600,
                  }}
                >
                  Mass balance: {parseFloat(inputWeight) || 0} kg in ={" "}
                  {parseFloat(outputWeight) || 0} + {byproductTotal.toFixed(2)} kg byproducts ={" "}
                  {(parseFloat(outputWeight) + byproductTotal).toFixed(2)} kg
                  {balanceOk === true ? " ✓ balanced" : balanceOk === false ? " ✗ does not balance" : ""}
                </div>
              )}
            </div>

            {error && (
              <div
                style={{
                  marginBottom: 12,
                  padding: "10px 14px",
                  borderRadius: 8,
                  background: "rgba(178,58,58,.07)",
                  border: "1px solid rgba(178,58,58,.2)",
                  color: "#7a2a2a",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || balanceOk === false}
              style={{
                width: "100%",
                padding: "11px 0",
                borderRadius: 8,
                border: "none",
                background: balanceOk === false ? "#e5e5e5" : "var(--dark)",
                color: balanceOk === false ? "#aaa" : "var(--amber)",
                fontWeight: 800,
                fontSize: 14,
                cursor: submitting || balanceOk === false ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                letterSpacing: ".03em",
              }}
            >
              {submitting ? "Recording…" : "Record Processing"}
            </button>
          </form>
        )}
      </div>
    </RoleShell>
  );
}
