import { NextRequest, NextResponse } from "next/server";
import { actorFromRequest } from "@/lib/phase1/auth";
import { readPhase1Store, writePhase1Store } from "@/lib/phase1/store";
import { makeId } from "@/lib/phase1/ids";
import type { Event, LotStatus } from "@/lib/phase1/types";

type ReceiptRequest = {
  lotId: string;
  nextCustodianId: string;
  nextCustodianRole: string;
  vehicleId?: string;
  driverId?: string;
  locationStatus?: string;
};

export async function POST(req: NextRequest) {
  const actor = actorFromRequest(req);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Transporter") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  let body: ReceiptRequest;
  try {
    body = (await req.json()) as ReceiptRequest;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const { lotId, nextCustodianId, nextCustodianRole, vehicleId, driverId, locationStatus } = body;
  if (!lotId || !nextCustodianId || !nextCustodianRole) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  const store = await readPhase1Store();
  const lot = store.lots.find((l) => l.id === lotId);
  if (!lot) return NextResponse.json({ message: "Lot not found." }, { status: 404 });
  if (lot.status !== "IN_TRANSIT") {
    return NextResponse.json({ message: "Lot is not in transit." }, { status: 409 });
  }

  const now = new Date().toISOString();

  // Determine next lot status based on receiver role
  const nextStatus: LotStatus = nextCustodianRole.toLowerCase() === "lab" ? "AT_LAB" : "ACTIVE";

  const vehicle = vehicleId ? store.vehicles.find((v) => v.id === vehicleId) : undefined;
  const driver = driverId ? store.drivers.find((d) => d.id === driverId) : undefined;

  const receiptEvent: Event = {
    id: makeId("evt"),
    type: "RECEIPT",
    timestamp: now,
    actorId: actor.userId,
    actorRole: "Transporter",
    inputLotIds: [lotId],
    outputLotIds: [lotId],
    metadata: {
      custodyTransfer: "from_transporter",
      nextCustodianId,
      nextCustodianRole,
      ownerUnchanged: true,
      ...(vehicle ? { vehicleId, plateNumber: vehicle.plateNumber } : {}),
      ...(driver ? { driverId, driverName: driver.name } : {}),
      ...(locationStatus ? { locationStatus } : {}),
    },
  };

  const updatedLots = store.lots.map((l) =>
    l.id === lotId
      ? {
          ...l,
          status: nextStatus,
          custodianId: nextCustodianId,
          custodianRole: nextCustodianRole,
          updatedAt: now,
        }
      : l,
  );

  await writePhase1Store({ ...store, lots: updatedLots, events: [...store.events, receiptEvent] });

  return NextResponse.json({ event: receiptEvent, newStatus: nextStatus }, { status: 201 });
}
