import { NextResponse } from "next/server";
import { readFollows, writeFollows } from "@/lib/marketplace/social-store";

export const dynamic = "force-dynamic";

const noStore = {
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
};

export async function GET() {
  const follows = await readFollows();
  return NextResponse.json({ follows }, { headers: noStore });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as { follows?: Record<string, string[]> };
  if (!body.follows || typeof body.follows !== "object") {
    return NextResponse.json({ message: "Invalid follows payload." }, { status: 400 });
  }
  await writeFollows(body.follows);
  return NextResponse.json({ ok: true, count: Object.keys(body.follows).length }, { headers: noStore });
}
