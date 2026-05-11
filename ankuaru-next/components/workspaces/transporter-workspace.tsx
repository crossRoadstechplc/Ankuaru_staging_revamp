"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleShell } from "@/components/role-shell";
import { RoleDashboard } from "@/components/workspaces/role-dashboard";
import type { DashLedgerRow, DashModule } from "@/components/workspaces/role-dashboard";
import { phase1Fetch } from "@/lib/phase1/client";
import type { Driver, Event, Lot, Vehicle } from "@/lib/phase1/types";
import { NAV_BY_ROLE } from "@/lib/phase1/nav";
import { useAppStore } from "@/lib/store/useAppStore";

export function TransporterWorkspace() {
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  const [lots, setLots] = useState<Lot[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

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
        if (canceled) return;
        setLots(lotsRes.lots);
        setVehicles(vRes.vehicles);
        setDrivers(dRes.drivers);
        // Build transport events from custodian data
        const transportLots = lotsRes.lots
          .filter((l) => l.custodianId === authUser.username || l.status === "IN_TRANSIT")
          .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
        setEvents(
          transportLots.map<Event>((l) => ({
            id: l.id,
            type: l.status === "IN_TRANSIT" ? "DISPATCH" : "RECEIPT",
            timestamp: l.updatedAt,
            actorId: authUser.username,
            actorRole: "Transporter",
            inputLotIds: [l.id],
            outputLotIds: [l.id],
          })),
        );
      } catch {
        // show empty state
      }
    };
    void run();
    return () => {
      canceled = true;
    };
  }, [authUser]);

  const inTransitLots = useMemo(() => lots.filter((l) => l.status === "IN_TRANSIT"), [lots]);
  const completedLots = useMemo(
    () => lots.filter((l) => l.custodianId === authUser?.username && l.status !== "IN_TRANSIT"),
    [lots, authUser],
  );

  const ledgerRows = useMemo<DashLedgerRow[]>(
    () =>
      events.slice(0, 8).map((e) => {
        const lot = lots.find((l) => l.id === e.inputLotIds[0]);
        return {
          id: e.id,
          code: lot?.publicLotCode ?? e.inputLotIds[0] ?? "—",
          detail: [
            lot ? `${lot.weightKg} kg` : null,
            lot ? lot.form : null,
            lot ? `status: ${lot.status}` : null,
          ]
            .filter(Boolean)
            .join(" · "),
          ts: e.timestamp,
        };
      }),
    [events, lots],
  );

  const modules = useMemo<DashModule[]>(
    () => [
      {
        id: "inTransit",
        title: "In transit",
        summary: `${inTransitLots.length} lot(s) currently in transit`,
        items: inTransitLots.slice(0, 8).map((l) => ({
          id: l.id,
          label: l.publicLotCode,
          detail: `${l.weightKg} kg · ${l.form} · custodian: ${l.custodianId ?? "—"}`,
          href: "/transporter/receipt",
        })),
      },
      {
        id: "fleet",
        title: "Fleet snapshot",
        summary: `${vehicles.length} vehicle(s) · ${drivers.length} driver(s) registered`,
        items: [
          ...vehicles.slice(0, 4).map((v) => ({
            id: v.id,
            label: v.plateNumber,
            detail: v.ownerName ? `Owner: ${v.ownerName}` : "No owner name",
            href: "/transporter/fleet",
          })),
          ...drivers.slice(0, 4).map((d) => ({
            id: d.id,
            label: d.name,
            detail: d.phone ? `Phone: ${d.phone}` : "No phone",
            href: "/transporter/fleet",
          })),
        ],
      },
    ],
    [inTransitLots, vehicles, drivers],
  );

  if (!authUser || authUser.role !== "Transporter") return null;

  return (
    <RoleShell role="Transporter" navItems={NAV_BY_ROLE.Transporter}>
      <RoleDashboard
        kicker="Transporter"
        title="Transport workspace"
        description="Manage lot custody movements. Record dispatch to move lots in transit, then record receipt to hand over to the next custodian."
        stats={[
          { label: "In transit", value: inTransitLots.length, accent: inTransitLots.length > 0 ? "amber" : "normal" },
          { label: "Vehicles", value: vehicles.length },
          { label: "Drivers", value: drivers.length },
        ]}
        primaryAction={{ href: "/transporter/dispatch", label: "Record dispatch" }}
        secondaryActions={[
          { href: "/transporter/receipt", label: "Record receipt" },
          { href: "/transporter/fleet", label: "Manage fleet" },
        ]}
        ledgerTitle="Recent transport activity"
        ledgerBlurb="Recent dispatch and receipt events for lots under your custody."
        ledgerRows={ledgerRows}
        modules={modules}
      />
    </RoleShell>
  );
}
