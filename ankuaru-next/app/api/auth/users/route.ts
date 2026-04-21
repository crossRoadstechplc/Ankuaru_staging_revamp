import { NextResponse } from "next/server";
import { DEMO_USERS, sanitizeUser } from "@/lib/auth/users";

export async function GET() {
  return NextResponse.json({
    users: DEMO_USERS.map(sanitizeUser),
  });
}
