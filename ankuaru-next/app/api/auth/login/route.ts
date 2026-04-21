import { NextResponse } from "next/server";
import { DEMO_USERS, sanitizeUser } from "@/lib/auth/users";

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };
  const username = body.username?.trim();
  const password = body.password;

  if (!username || !password) {
    return NextResponse.json({ message: "Username and password are required." }, { status: 400 });
  }

  const user = DEMO_USERS.find((item) => item.username === username && item.password === password);
  if (!user) {
    return NextResponse.json({ message: "Invalid username or password." }, { status: 401 });
  }

  return NextResponse.json({
    message: "Login successful",
    user: sanitizeUser(user),
  });
}
