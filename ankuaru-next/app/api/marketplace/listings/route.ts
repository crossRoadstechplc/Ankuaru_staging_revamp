import { NextResponse } from "next/server";
import { readListings, writeListings } from "@/lib/marketplace/store";

export const dynamic = "force-dynamic";

const noStore = {
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
};

export async function GET() {
  const listings = await readListings();
  return NextResponse.json({ listings }, { headers: noStore });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as { listings?: Record<string, Record<string, unknown>> };
  if (!body.listings || typeof body.listings !== "object") {
    return NextResponse.json({ message: "Invalid listings payload." }, { status: 400 });
  }
  await writeListings(body.listings);
  return NextResponse.json({ ok: true, count: Object.keys(body.listings).length }, { headers: noStore });
}
