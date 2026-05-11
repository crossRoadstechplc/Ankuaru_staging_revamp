import { NextRequest, NextResponse } from "next/server";
import { actorFromRequest } from "@/lib/phase1/auth";
import { readPhase1Store, writePhase1Store } from "@/lib/phase1/store";
import { makeId } from "@/lib/phase1/ids";
import type { Vehicle } from "@/lib/phase1/types";

export async function GET(req: NextRequest) {
  const actor = actorFromRequest(req);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Transporter" && actor.role !== "Admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const store = await readPhase1Store();
  return NextResponse.json({ vehicles: store.vehicles });
}

export async function POST(req: NextRequest) {
  const actor = actorFromRequest(req);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Transporter" && actor.role !== "Admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  let body: { plateNumber: string; ownerName?: string };
  try {
    body = (await req.json()) as { plateNumber: string; ownerName?: string };
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (!body.plateNumber?.trim()) {
    return NextResponse.json({ message: "Plate number is required." }, { status: 400 });
  }

  const store = await readPhase1Store();
  const existing = store.vehicles.find(
    (v) => v.plateNumber.toLowerCase() === body.plateNumber.trim().toLowerCase(),
  );
  if (existing) {
    return NextResponse.json({ message: "Plate number already exists." }, { status: 409 });
  }

  const now = new Date().toISOString();
  const vehicle: Vehicle = {
    id: makeId("veh"),
    plateNumber: body.plateNumber.trim().toUpperCase(),
    ownerName: body.ownerName?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };

  await writePhase1Store({ ...store, vehicles: [...store.vehicles, vehicle] });
  return NextResponse.json({ vehicle }, { status: 201 });
}
