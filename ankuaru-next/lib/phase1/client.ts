import type { SanitizedUser } from "@/lib/auth/users";

export async function phase1Fetch<T>(
  user: SanitizedUser,
  input: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("x-ankuaru-user", user.username);
  headers.set("x-ankuaru-role", user.role);
  if (!headers.has("Content-Type") && init.body) headers.set("Content-Type", "application/json");

  const response = await fetch(input, { ...init, headers });

  if (!response.ok) {
    let message = `Request failed (${response.status}).`;
    try {
      const err = (await response.json()) as { message?: string };
      if (err.message) message = err.message;
    } catch {
      // Non-JSON body (e.g. HTML error page) — use the default message above
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
}

