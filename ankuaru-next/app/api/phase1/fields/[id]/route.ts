import { NextResponse } from "next/server";
import { actorFromRequest } from "@/lib/phase1/auth";
import { readPhase1Store, writePhase1Store } from "@/lib/phase1/store";
import { nowIso } from "@/lib/phase1/ids";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const actor = actorFromRequest(request);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const store = await readPhase1Store();
  const field = store.fields.find((f) => f.id === id);
  if (!field) return NextResponse.json({ message: "Not found" }, { status: 404 });

  if (actor.role !== "Admin" && field.farmerId !== actor.userId) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ field });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const actor = actorFromRequest(request);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const body = (await request.json()) as { name?: string; areaSqm?: number };
  const store = await readPhase1Store();
  const idx = store.fields.findIndex((f) => f.id === id);
  if (idx < 0) return NextResponse.json({ message: "Not found" }, { status: 404 });

  const field = store.fields[idx];
  if (actor.role !== "Admin" && field.farmerId !== actor.userId) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const name = body.name?.trim();
  const next = {
    ...field,
    name: name ? name : field.name,
    areaSqm: typeof body.areaSqm === "number" ? body.areaSqm : field.areaSqm,
    updatedAt: nowIso(),
  };
  store.fields[idx] = next;
  await writePhase1Store(store);
  return NextResponse.json({ field: next });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const actor = actorFromRequest(request);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const store = await readPhase1Store();
  const field = store.fields.find((f) => f.id === id);
  if (!field) return NextResponse.json({ message: "Not found" }, { status: 404 });

  if (actor.role !== "Admin" && field.farmerId !== actor.userId) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  store.fields = store.fields.filter((f) => f.id !== id);
  await writePhase1Store(store);
  return NextResponse.json({ ok: true });
}

