"use client";

import Link from "next/link";
import { CSSProperties } from "react";

/* ── tiny sub-components using only legacy.css / globals.css tokens ── */

function SectionCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 14,
        background: "#fff",
        padding: "14px 16px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </div>
  );
}

function ModuleTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ fontWeight: 800, fontSize: 16, letterSpacing: ".01em", color: "var(--tx)" }}
    >
      {children}
    </div>
  );
}

function ModuleBlurb({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 4, fontSize: 12, color: "var(--tx2)", lineHeight: 1.5 }}>
      {children}
    </div>
  );
}

function StatPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: "amber" | "red" | "normal";
}) {
  const bg =
    accent === "amber"
      ? "rgba(212,130,10,.09)"
      : accent === "red"
        ? "rgba(178,58,58,.08)"
        : "var(--bg)";
  const color =
    accent === "amber" ? "#7a4a00" : accent === "red" ? "#7a2a2a" : "var(--tx)";
  return (
    <div
      style={{
        padding: "8px 14px",
        borderRadius: 10,
        background: bg,
        border: "1px solid var(--border)",
        minWidth: 80,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: 10, color: "var(--tx3)", marginTop: 2, letterSpacing: ".04em" }}>
        {label}
      </div>
    </div>
  );
}

function ActionBtn({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-block",
        padding: "8px 16px",
        border: "1px solid rgba(212,130,10,.34)",
        borderRadius: 8,
        background: "rgba(212,130,10,.13)",
        color: "#7a4a00",
        fontWeight: 700,
        fontSize: 12,
        textDecoration: "none",
      }}
    >
      {label}
    </Link>
  );
}

function OutlineBtn({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-block",
        padding: "8px 16px",
        border: "1px solid var(--border)",
        borderRadius: 8,
        background: "#fff",
        color: "var(--tx2)",
        fontWeight: 600,
        fontSize: 12,
        textDecoration: "none",
      }}
    >
      {label}
    </Link>
  );
}

export type DashLedgerRow = {
  id: string;
  code: string;
  detail: string;
  ts: string;
};

export type DashModuleRow = {
  id: string;
  label: string;
  detail: string;
  href?: string;
};

export type DashModule = {
  id: string;
  title: string;
  summary: string;
  items: DashModuleRow[];
};

export type RoleDashboardProps = {
  kicker: string;
  title: string;
  description: string;
  stats: { label: string; value: string | number; accent?: "amber" | "red" | "normal" }[];
  primaryAction?: { href: string; label: string };
  secondaryActions?: { href: string; label: string }[];
  ledgerTitle: string;
  ledgerBlurb: string;
  ledgerRows: DashLedgerRow[];
  modules: DashModule[];
};

export function RoleDashboard({
  kicker,
  title,
  description,
  stats,
  primaryAction,
  secondaryActions = [],
  ledgerTitle,
  ledgerBlurb,
  ledgerRows,
  modules,
}: RoleDashboardProps) {
  return (
    <div style={{ padding: 16, maxWidth: 980, display: "grid", gap: 14 }}>
      {/* ── Header ── */}
      <SectionCard>
        <Kicker>{kicker}</Kicker>
        <ModuleTitle>{title}</ModuleTitle>
        <ModuleBlurb>{description}</ModuleBlurb>

        {stats.length > 0 ? (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
            {stats.map((s) => (
              <StatPill key={s.label} label={s.label} value={s.value} accent={s.accent} />
            ))}
          </div>
        ) : null}

        {(primaryAction || secondaryActions.length > 0) ? (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
            {primaryAction ? <ActionBtn href={primaryAction.href} label={primaryAction.label} /> : null}
            {secondaryActions.map((a) => (
              <OutlineBtn key={a.href} href={a.href} label={a.label} />
            ))}
          </div>
        ) : null}
      </SectionCard>

      {/* ── Ledger strip ── */}
      <SectionCard>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div>
            <Kicker>Recent activity</Kicker>
            <ModuleTitle>{ledgerTitle}</ModuleTitle>
            <ModuleBlurb>{ledgerBlurb}</ModuleBlurb>
          </div>
        </div>
        <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
          {ledgerRows.length === 0 ? (
            <div style={{ fontSize: 12, color: "var(--tx3)" }}>No activity yet.</div>
          ) : (
            ledgerRows.slice(0, 8).map((row) => (
              <div
                key={row.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: "1px solid var(--border2)",
                  background: "var(--bg)",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{row.code}</div>
                  <div style={{ fontSize: 11, color: "var(--tx2)", marginTop: 2 }}>{row.detail}</div>
                </div>
                <div style={{ fontSize: 11, color: "var(--tx3)", whiteSpace: "nowrap", alignSelf: "flex-start" }}>
                  {row.ts.slice(0, 16).replace("T", " ")}
                </div>
              </div>
            ))
          )}
        </div>
      </SectionCard>

      {/* ── Focus modules ── */}
      {modules.map((mod, i) => (
        <SectionCard key={mod.id}>
          <details open={i === 0}>
            <summary
              style={{
                cursor: "pointer",
                listStyle: "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div>
                <ModuleTitle>{mod.title}</ModuleTitle>
                <ModuleBlurb>{mod.summary}</ModuleBlurb>
              </div>
              <div
                style={{ fontSize: 11, color: "var(--tx3)", whiteSpace: "nowrap", paddingTop: 4 }}
              >
                {mod.items.length} item(s) ▾
              </div>
            </summary>

            <div style={{ marginTop: 12, borderTop: "1px solid var(--border2)", paddingTop: 12, display: "grid", gap: 8 }}>
              {mod.items.length === 0 ? (
                <div style={{ fontSize: 12, color: "var(--tx3)" }}>No data yet.</div>
              ) : (
                mod.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: "1px solid var(--border2)",
                      background: "var(--bg)",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: "var(--tx2)", marginTop: 2 }}>{item.detail}</div>
                    </div>
                    {item.href ? (
                      <Link
                        href={item.href}
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "var(--amber)",
                          textDecoration: "none",
                          whiteSpace: "nowrap",
                          border: "1px solid rgba(212,130,10,.25)",
                          borderRadius: 6,
                          padding: "4px 10px",
                          background: "rgba(212,130,10,.07)",
                        }}
                      >
                        Open
                      </Link>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </details>
        </SectionCard>
      ))}
    </div>
  );
}
