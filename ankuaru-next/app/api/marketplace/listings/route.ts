import { NextResponse } from "next/server";
import { readListings, writeListings } from "@/lib/marketplace/store";

export async function GET() {
  const listings = await readListings();
  return NextResponse.json({ listings });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as { listings?: Record<string, Record<string, unknown>> };
  if (!body.listings || typeof body.listings !== "object") {
    return NextResponse.json({ message: "Invalid listings payload." }, { status: 400 });
  }
  await writeListings(body.listings);
  return NextResponse.json({ ok: true, count: Object.keys(body.listings).length });
}
