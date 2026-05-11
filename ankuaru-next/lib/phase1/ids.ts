export function makeId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}

/** Generates a human-readable lot code, e.g. LOT-AB3K-XR7P or AGG-CD4L-YS8Q */
export function makeLotCode(prefix = "LOT"): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const seg = (n: number) =>
    Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `${prefix}-${seg(4)}-${seg(4)}`;
}
