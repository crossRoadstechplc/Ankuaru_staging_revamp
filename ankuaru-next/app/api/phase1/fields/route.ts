import { NextResponse } from "next/server";
import { actorFromRequest } from "@/lib/phase1/auth";
import { readPhase1Store, writePhase1Store } from "@/lib/phase1/store";
import { makeId, nowIso } from "@/lib/phase1/ids";
import type { Field } from "@/lib/phase1/types";

export async function GET(request: Request) {
  const actor = actorFromRequest(request);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const store = await readPhase1Store();
  const fields = actor.role === "Admin" ? store.fields : store.fields.filter((f) => f.farmerId === actor.userId);
  return NextResponse.json({ fields });
}

export async function POST(request: Request) {
  const actor = actorFromRequest(request);
  if (!actor) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (actor.role !== "Farmer" && actor.role !== "Admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as { name?: string; areaSqm?: number; farmerId?: string };
  const name = body.name?.trim();
  if (!name) return NextResponse.json({ message: "Field name is required." }, { status: 400 });

  const farmerId = actor.role === "Admin" ? (body.farmerId?.trim() || "") : actor.userId;
  if (!farmerId) return NextResponse.json({ message: "farmerId is required." }, { status: 400 });

  const store = await readPhase1Store();
  const ts = nowIso();
  const field: Field = {
    id: makeId("field"),
    name,
    farmerId,
    areaSqm: typeof body.areaSqm === "number" ? body.areaSqm : undefined,
    createdAt: ts,
    updatedAt: ts,
  };
  store.fields.push(field);
  await writePhase1Store(store);

  return NextResponse.json({ field }, { status: 201 });
}

