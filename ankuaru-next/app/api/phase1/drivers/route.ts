import { NextRequest, NextResponse } from "next/server";
import { actorFromRequest } from "@/lib/phase1/auth";
import { readPhase1Store, writePhase1Store } from "@/lib/phase1/store";
import { makeId } from "@/lib/phase1/ids";
import type { Driver } from "@/lib/phase1/types";

export async function GET(req: NextRequest) {
  const actor = actorFromRequest(req);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Transporter" && actor.role !== "Admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const store = await readPhase1Store();
  return NextResponse.json({ drivers: store.drivers });
}

export async function POST(req: NextRequest) {
  const actor = actorFromRequest(req);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Transporter" && actor.role !== "Admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  let body: { name: string; phone?: string };
  try {
    body = (await req.json()) as { name: string; phone?: string };
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (!body.name?.trim()) {
    return NextResponse.json({ message: "Driver name is required." }, { status: 400 });
  }

  const now = new Date().toISOString();
  const driver: Driver = {
    id: makeId("drv"),
    name: body.name.trim(),
    phone: body.phone?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };

  const store = await readPhase1Store();
  await writePhase1Store({ ...store, drivers: [...store.drivers, driver] });
  return NextResponse.json({ driver }, { status: 201 });
}
