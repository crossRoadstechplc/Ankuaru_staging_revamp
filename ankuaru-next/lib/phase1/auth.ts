import type { Phase1Role } from "@/lib/phase1/types";

export type Phase1Actor = { userId: string; role: Phase1Role };

const VALID_ROLES: Phase1Role[] = ["Admin", "Farmer", "Aggregator", "Processor", "Transporter", "Lab", "Bank", "Regulator"];

export function actorFromRequest(request: Request): Phase1Actor | null {
  const userId = request.headers.get("x-ankuaru-user")?.trim();
  const role = request.headers.get("x-ankuaru-role")?.trim() as Phase1Role | undefined;
  if (!userId || !role) return null;
  if (!VALID_ROLES.includes(role)) return null;
  return { userId, role };
}
