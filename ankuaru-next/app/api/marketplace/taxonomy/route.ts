import { NextResponse } from "next/server";
import taxonomy from "@/data/taxonomy.json";

export async function GET() {
  return NextResponse.json({ taxonomy });
}
