"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { NAV_BY_ROLE } from "@/lib/phase1/nav";
import { phase1Fetch } from "@/lib/phase1/client";
import type { Driver, Vehicle } from "@/lib/phase1/types";
import { useAppStore } from "@/lib/store/useAppStore";

export function TransporterFleetPage() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  // Vehicle form
  const [plateNumber, setPlateNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [vehicleSubmitting, setVehicleSubmitting] = useState(false);
  const [vehicleError, setVehicleError] = useState("");

  // Driver form
  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [driverSubmitting, setDriverSubmitting] = useState(false);
  const [driverError, setDriverError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  const loadFleet = async () => {
    if (!authUser || authUser.role !== "Transporter") return;
    try {
      const [vRes, dRes] = await Promise.all([
        phase1Fetch<{ vehicles: Vehicle[] }>(authUser, "/api/phase1/vehicles"),
        phase1Fetch<{ drivers: Driver[] }>(authUser, "/api/phase1/drivers"),
      ]);
      setVehicles(vRes.vehicles);
      setDrivers(dRes.drivers);
    } catch {
      // silent
    }
  };

  useEffect(() => {
    void loadFleet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser || !plateNumber.trim()) return;
    setVehicleError("");
    setVehicleSubmitting(true);
    try {
      await phase1Fetch(authUser, "/api/phase1/vehicles", {
        method: "POST",
        body: JSON.stringify({ plateNumber, ownerName: ownerName || undefined }),
      });
      setPlateNumber("");
      setOwnerName("");
      await loadFleet();
    } catch (err: unknown) {
      setVehicleError(err instanceof Error ? err.message : "Failed to add vehicle.");
    } finally {
      setVehicleSubmitting(false);
    }
  };

  const handleAddDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser || !driverName.trim()) return;
    setDriverError("");
    setDriverSubmitting(true);
    try {
      await phase1Fetch(authUser, "/api/phase1/drivers", {
        method: "POST",
        body: JSON.stringify({ name: driverName, phone: driverPhone || undefined }),
      });
      setDriverName("");
      setDriverPhone("");
      await loadFleet();
    } catch (err: unknown) {
      setDriverError(err instanceof Error ? err.message : "Failed to add driver.");
    } finally {
      setDriverSubmitting(false);
    }
  };

  if (!authUser || authUser.role !== "Transporter") return null;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 10px",
    border: "1px solid var(--border)",
    borderRadius: 7,
    background: "#fff",
    fontSize: 13,
    color: "var(--tx)",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  const sectionCard = (title: string, count: number, body: React.ReactNode) => (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 12,
        background: "#fff",
        padding: "16px 18px",
        marginBottom: 16,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: "var(--tx)" }}>{title}</div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 10,
            background: "var(--bg)",
            border: "1px solid var(--border2)",
            color: "var(--tx2)",
          }}
        >
          {count} registered
        </span>
      </div>
      {body}
    </div>
  );

  return (
    <RoleShell role="Transporter" navItems={NAV_BY_ROLE.Transporter}>
      <div style={{ padding: 16, maxWidth: 720 }}>
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
        <div style={{ fontWeight: 800, fontSize: 18, color: "var(--tx)", marginBottom: 4 }}>Fleet Management</div>
        <div style={{ fontSize: 12, color: "var(--tx2)", marginBottom: 20 }}>
          Manage your vehicles and drivers. You must have at least one of each to record a dispatch.
        </div>

        {/* Vehicles */}
        {sectionCard(
          "Vehicles",
          vehicles.length,
          <>
            <form onSubmit={handleAddVehicle} style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
              <input
                style={{ ...inputStyle, flex: "1 1 160px" }}
                type="text"
                placeholder="Plate number *"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
                required
              />
              <input
                style={{ ...inputStyle, flex: "1 1 160px" }}
                type="text"
                placeholder="Owner name (optional)"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
              <button
                type="submit"
                disabled={vehicleSubmitting}
                style={{
                  padding: "8px 18px",
                  border: "none",
                  borderRadius: 7,
                  background: "var(--dark)",
                  color: "var(--amber)",
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: vehicleSubmitting ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                }}
              >
                {vehicleSubmitting ? "Adding…" : "+ Add vehicle"}
              </button>
            </form>
            {vehicleError && (
              <div
                style={{
                  marginBottom: 10,
                  padding: "8px 12px",
                  borderRadius: 7,
                  background: "rgba(178,58,58,.07)",
                  border: "1px solid rgba(178,58,58,.2)",
                  color: "#7a2a2a",
                  fontSize: 12,
                }}
              >
                {vehicleError}
              </div>
            )}
            {vehicles.length === 0 ? (
              <div style={{ fontSize: 12, color: "var(--tx3)" }}>No vehicles registered yet.</div>
            ) : (
              <div style={{ display: "grid", gap: 8 }}>
                {vehicles.map((v) => (
                  <div
                    key={v.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "9px 12px",
                      borderRadius: 9,
                      border: "1px solid var(--border2)",
                      background: "var(--bg)",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "var(--tx)" }}>{v.plateNumber}</div>
                      {v.ownerName && (
                        <div style={{ fontSize: 11, color: "var(--tx3)", marginTop: 2 }}>{v.ownerName}</div>
                      )}
                    </div>
                    <div style={{ fontSize: 10, color: "var(--tx3)" }}>{v.createdAt.slice(0, 10)}</div>
                  </div>
                ))}
              </div>
            )}
          </>,
        )}

        {/* Drivers */}
        {sectionCard(
          "Drivers",
          drivers.length,
          <>
            <form onSubmit={handleAddDriver} style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
              <input
                style={{ ...inputStyle, flex: "1 1 160px" }}
                type="text"
                placeholder="Driver name *"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                required
              />
              <input
                style={{ ...inputStyle, flex: "1 1 160px" }}
                type="tel"
                placeholder="Phone (optional)"
                value={driverPhone}
                onChange={(e) => setDriverPhone(e.target.value)}
              />
              <button
                type="submit"
                disabled={driverSubmitting}
                style={{
                  padding: "8px 18px",
                  border: "none",
                  borderRadius: 7,
                  background: "var(--dark)",
                  color: "var(--amber)",
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: driverSubmitting ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                }}
              >
                {driverSubmitting ? "Adding…" : "+ Add driver"}
              </button>
            </form>
            {driverError && (
              <div
                style={{
                  marginBottom: 10,
                  padding: "8px 12px",
                  borderRadius: 7,
                  background: "rgba(178,58,58,.07)",
                  border: "1px solid rgba(178,58,58,.2)",
                  color: "#7a2a2a",
                  fontSize: 12,
                }}
              >
                {driverError}
              </div>
            )}
            {drivers.length === 0 ? (
              <div style={{ fontSize: 12, color: "var(--tx3)" }}>No drivers registered yet.</div>
            ) : (
              <div style={{ display: "grid", gap: 8 }}>
                {drivers.map((d) => (
                  <div
                    key={d.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "9px 12px",
                      borderRadius: 9,
                      border: "1px solid var(--border2)",
                      background: "var(--bg)",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "var(--tx)" }}>{d.name}</div>
                      {d.phone && (
                        <div style={{ fontSize: 11, color: "var(--tx3)", marginTop: 2 }}>{d.phone}</div>
                      )}
                    </div>
                    <div style={{ fontSize: 10, color: "var(--tx3)" }}>{d.createdAt.slice(0, 10)}</div>
                  </div>
                ))}
              </div>
            )}
          </>,
        )}
      </div>
    </RoleShell>
  );
}
