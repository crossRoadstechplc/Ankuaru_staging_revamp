import { NextRequest, NextResponse } from "next/server";
import { actorFromRequest } from "@/lib/phase1/auth";
import { readPhase1Store, writePhase1Store } from "@/lib/phase1/store";
import { makeId } from "@/lib/phase1/ids";
import type { Event } from "@/lib/phase1/types";

type DispatchRequest = {
  lotId: string;
  vehicleId: string;
  driverId: string;
  locationStatus?: string;
};

export async function POST(req: NextRequest) {
  const actor = actorFromRequest(req);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Transporter") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  let body: DispatchRequest;
  try {
    body = (await req.json()) as DispatchRequest;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const { lotId, vehicleId, driverId, locationStatus } = body;
  if (!lotId || !vehicleId || !driverId) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  const store = await readPhase1Store();
  const lot = store.lots.find((l) => l.id === lotId);
  if (!lot) return NextResponse.json({ message: "Lot not found." }, { status: 404 });
  if (lot.status === "CLOSED" || lot.status === "QUARANTINED") {
    return NextResponse.json({ message: "Lot is closed or quarantined." }, { status: 409 });
  }
  if (lot.status === "IN_TRANSIT") {
    return NextResponse.json({ message: "Lot is already in transit." }, { status: 409 });
  }

  const vehicle = store.vehicles.find((v) => v.id === vehicleId);
  const driver = store.drivers.find((d) => d.id === driverId);
  if (!vehicle) return NextResponse.json({ message: "Vehicle not found." }, { status: 404 });
  if (!driver) return NextResponse.json({ message: "Driver not found." }, { status: 404 });

  const now = new Date().toISOString();

  const dispatchEvent: Event = {
    id: makeId("evt"),
    type: "DISPATCH",
    timestamp: now,
    actorId: actor.userId,
    actorRole: "Transporter",
    inputLotIds: [lotId],
    outputLotIds: [lotId],
    metadata: {
      vehicleId,
      driverId,
      plateNumber: vehicle.plateNumber,
      driverName: driver.name,
      custodyTransfer: "to_transporter",
      ownerUnchanged: true,
      ...(locationStatus ? { locationStatus } : {}),
    },
  };

  const updatedLots = store.lots.map((l) =>
    l.id === lotId
      ? { ...l, status: "IN_TRANSIT" as const, custodianId: actor.userId, custodianRole: "Transporter", updatedAt: now }
      : l,
  );

  await writePhase1Store({ ...store, lots: updatedLots, events: [...store.events, dispatchEvent] });

  return NextResponse.json({ event: dispatchEvent }, { status: 201 });
}
