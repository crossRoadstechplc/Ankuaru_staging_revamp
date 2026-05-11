"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { NAV_BY_ROLE } from "@/lib/phase1/nav";
import { phase1Fetch } from "@/lib/phase1/client";
import type { Driver, Lot, Vehicle } from "@/lib/phase1/types";
import { useAppStore } from "@/lib/store/useAppStore";

const DISPATCHABLE_STATUSES = ["AT_FARM", "READY_FOR_PROCESSING", "IN_PROCESSING", "ACTIVE"];

export function TransporterDispatchPage() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [lots, setLots] = useState<Lot[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedLotId, setSelectedLotId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    let canceled = false;
    const run = async () => {
      if (!authUser || authUser.role !== "Transporter") return;
      try {
        const [lotsRes, vRes, dRes] = await Promise.all([
          phase1Fetch<{ lots: Lot[] }>(authUser, "/api/phase1/lots"),
          phase1Fetch<{ vehicles: Vehicle[] }>(authUser, "/api/phase1/vehicles"),
          phase1Fetch<{ drivers: Driver[] }>(authUser, "/api/phase1/drivers"),
        ]);
        if (!canceled) {
          setLots(lotsRes.lots.filter((l) => DISPATCHABLE_STATUSES.includes(l.status)));
          setVehicles(vRes.vehicles);
          setDrivers(dRes.drivers);
        }
      } catch {
        // silent
      }
    };
    void run();
    return () => {
      canceled = true;
    };
  }, [authUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser || !selectedLotId || !vehicleId || !driverId) return;
    setError("");
    setSubmitting(true);
    try {
      await phase1Fetch(authUser, "/api/phase1/transport/dispatch", {
        method: "POST",
        body: JSON.stringify({
          lotId: selectedLotId,
          vehicleId,
          driverId,
          ...(locationStatus ? { locationStatus } : {}),
        }),
      });
      setSuccess(true);
      setTimeout(() => router.push("/transporter/dashboard"), 1800);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Dispatch failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!authUser || authUser.role !== "Transporter") return null;

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

  const inputField = (label: string, element: React.ReactNode) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--tx2)", marginBottom: 4 }}>
        {label}
      </label>
      {element}
    </div>
  );

  return (
    <RoleShell role="Transporter" navItems={NAV_BY_ROLE.Transporter}>
      <div style={{ padding: 16, maxWidth: 560 }}>
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
          Transporter
        </div>
        <div style={{ fontWeight: 800, fontSize: 18, color: "var(--tx)", marginBottom: 4 }}>
          Record Dispatch
        </div>
        <div style={{ fontSize: 12, color: "var(--tx2)", marginBottom: 20 }}>
          Select the lot to dispatch, assign a vehicle and driver. Custody moves to you (Transporter) and the lot
          status becomes IN TRANSIT.
        </div>

        {vehicles.length === 0 || drivers.length === 0 ? (
          <div
            style={{
              padding: "14px 18px",
              borderRadius: 10,
              background: "rgba(212,130,10,.07)",
              border: "1px solid rgba(212,130,10,.25)",
              color: "#7a4a00",
              fontSize: 12,
              marginBottom: 16,
            }}
          >
            You need at least one vehicle and one driver before dispatching.{" "}
            <a href="/transporter/fleet" style={{ color: "var(--amber)", fontWeight: 700 }}>
              Add to fleet →
            </a>
          </div>
        ) : null}

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
            Dispatch recorded. Lot is now IN TRANSIT. Redirecting…
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
                "Lot to dispatch",
                <select
                  style={selectStyle}
                  value={selectedLotId}
                  onChange={(e) => setSelectedLotId(e.target.value)}
                  required
                >
                  <option value="">Select a lot…</option>
                  {lots.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.publicLotCode} — {l.weightKg} kg · {l.form} · {l.status}
                    </option>
                  ))}
                </select>,
              )}

              {inputField(
                "Vehicle",
                <select
                  style={selectStyle}
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  required
                >
                  <option value="">Select a vehicle…</option>
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.plateNumber}{v.ownerName ? ` — ${v.ownerName}` : ""}
                    </option>
                  ))}
                </select>,
              )}

              {inputField(
                "Driver",
                <select
                  style={selectStyle}
                  value={driverId}
                  onChange={(e) => setDriverId(e.target.value)}
                  required
                >
                  <option value="">Select a driver…</option>
                  {drivers.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}{d.phone ? ` — ${d.phone}` : ""}
                    </option>
                  ))}
                </select>,
              )}

              {inputField(
                "Location status (optional)",
                <input
                  style={selectStyle}
                  type="text"
                  value={locationStatus}
                  onChange={(e) => setLocationStatus(e.target.value)}
                  placeholder="e.g. Departed warehouse Addis"
                />,
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
              disabled={submitting}
              style={{
                width: "100%",
                padding: "11px 0",
                borderRadius: 8,
                border: "none",
                background: "var(--dark)",
                color: "var(--amber)",
                fontWeight: 800,
                fontSize: 14,
                cursor: submitting ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                letterSpacing: ".03em",
              }}
            >
              {submitting ? "Recording dispatch…" : "Record Dispatch"}
            </button>
          </form>
        )}
      </div>
    </RoleShell>
  );
}
