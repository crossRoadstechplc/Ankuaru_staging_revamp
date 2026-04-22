import { readFile, stat } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const STRIP = new Set(["password", "otp_hash", "session_token"]);

type JsonRecord = Record<string, unknown>;

function sanitizeUser(u: JsonRecord): JsonRecord {
  const o: JsonRecord = {};
  for (const [k, v] of Object.entries(u)) {
    if (STRIP.has(k)) continue;
    o[k] = v;
  }
  return o;
}

type DatasetJson = {
  users?: JsonRecord[];
  offers?: JsonRecord[];
};

let cached: DatasetJson | null = null;
let cachedOfferMtimeMs = 0;
let cachedUserMtimeMs = 0;

async function load(): Promise<DatasetJson> {
  const userPath = path.join(process.cwd(), "data", "userankuaru.json");
  const offerPath = path.join(process.cwd(), "data", "offer.json");
  const [userStat, offerStat] = await Promise.all([stat(userPath), stat(offerPath)]);
  const userMtimeMs = userStat.mtimeMs;
  const offerMtimeMs = offerStat.mtimeMs;
  if (cached && userMtimeMs === cachedUserMtimeMs && offerMtimeMs === cachedOfferMtimeMs) return cached;
  const [userRaw, offerRaw] = await Promise.all([readFile(userPath, "utf-8"), readFile(offerPath, "utf-8")]);
  const userData = JSON.parse(userRaw) as DatasetJson;
  const offerData = JSON.parse(offerRaw) as unknown;
  const offers = Array.isArray(offerData)
    ? (offerData as JsonRecord[])
    : ((offerData as DatasetJson).offers || []);
  cached = { users: userData.users || [], offers };
  cachedUserMtimeMs = userMtimeMs;
  cachedOfferMtimeMs = offerMtimeMs;
  return cached;
}

function parseNum(v: string | null, d: number, max?: number) {
  const n = parseInt(String(v ?? ""), 10);
  if (Number.isNaN(n) || n < 0) return d;
  if (max != null) return Math.min(n, max);
  return n;
}

function isUserVerifiedRecord(u: JsonRecord): boolean {
  const v = u["is_verified"];
  if (v === true || v === 1) return true;
  if (v === "1" || String(v).toLowerCase() === "true") return true;
  return false;
}

/** Heuristic: buy = IOI-style (seeking to purchase); sell = RFQ-style (offering / selling). Kept in sync with `l4InquirySide` in public/legacy/script.js */
function classifyInquiry(r: JsonRecord): "buy" | "sell" | "other" {
  const offerTypeText = [r["offer_type"], r["role"], r["phone"], r["status"], r["season"], r["business_type"]]
    .map((x) => String(x ?? "").toLowerCase())
    .join(" ");
  if (/\bsell\b/.test(offerTypeText)) return "sell";
  if (/\bbuy\b/.test(offerTypeText)) return "buy";
  if (/\bakrabi\b|\bexporter\b/.test(offerTypeText)) return "sell";
  return "buy";
}

function inquiryDatasetStats(inq: JsonRecord[]) {
  let buyIoi = 0;
  let sellRfq = 0;
  let inquiries = 0;
  for (const r of inq) {
    const s = classifyInquiry(r);
    if (s === "buy") buyIoi += 1;
    else if (s === "sell") sellRfq += 1;
    else inquiries += 1;
  }
  const total = inq.length;
  return { total, buyIoi, sellRfq, inquiries };
}

function normText(v: unknown): string {
  return String(v ?? "").trim().toLowerCase();
}

function offerMatchesUser(row: JsonRecord, user: string): boolean {
  const u = normText(user);
  if (!u) return true;
  const chunks = [row["user_name"], row["name"], row["sent"], row["user_id"], row["source"], row["phone"], row["phone_number"]]
    .map(normText)
    .filter(Boolean);
  if (!chunks.length) return false;
  if (chunks.some((c) => c.includes(u))) return true;
  const tokens = u.split(/[^a-z0-9]+/).filter((t) => t.length >= 3);
  if (!tokens.length) return false;
  return tokens.some((t) => chunks.some((c) => c.includes(t)));
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = (searchParams.get("type") || "users").toLowerCase();
    const user = (searchParams.get("user") || "").trim().toLowerCase();
    const limit = parseNum(searchParams.get("limit"), 80, 200);
    const offset = parseNum(searchParams.get("offset"), 0, undefined);
    const q = (searchParams.get("q") || "").trim().toLowerCase();
    const data = await load();

    if (type === "users") {
      const rawUsers = data.users;
      if (!rawUsers) {
        return Response.json({
          type: "users",
          total: 0,
          offset: 0,
          limit,
          items: [],
          stats: { total: 0, verifiedCount: 0 },
        });
      }
      const totalInDataset = rawUsers.length;
      const verifiedInDataset = rawUsers.filter((u) => isUserVerifiedRecord(u as JsonRecord)).length;
      const filtered = q
        ? rawUsers.filter((u) => {
            const name = String(u["name"] ?? "");
            const phone = String(u["contact_information"] ?? "");
            const bus = String(u["business_name"] ?? "");
            return (
              name.toLowerCase().includes(q) || phone.toLowerCase().includes(q) || bus.toLowerCase().includes(q)
            );
          })
        : rawUsers;
      const total = filtered.length;
      const page = filtered.slice(offset, offset + limit).map((u) => sanitizeUser(u as JsonRecord));
      return Response.json({
        type: "users",
        total,
        offset,
        limit,
        items: page,
        stats: { total: totalInDataset, verifiedCount: verifiedInDataset },
      });
    }

    if (type === "inquiries" || type === "generalinqueries" || type === "offers") {
      const inq = data.offers;
      if (!inq) {
        return Response.json({
          type: "inquiries",
          total: 0,
          offset: 0,
          limit,
          items: [],
          stats: { total: 0, buyIoi: 0, sellRfq: 0, inquiries: 0 },
        });
      }
      const scoped = user ? inq.filter((row) => offerMatchesUser(row as JsonRecord, user)) : inq;
      // If user-scope cannot be resolved from noisy source fields, fall back to full dataset (avoid blank Transactions page).
      const userScoped = scoped.length ? scoped : inq;
      const ds = inquiryDatasetStats(userScoped as JsonRecord[]);
      const filtered = q
        ? userScoped.filter((row) => {
            const r = row as JsonRecord;
            const un = String(r["user_name"] ?? r["name"] ?? "");
            const desc = String(r["description"] ?? r["category"] ?? "");
            const prod = String(r["product_name"] ?? r["product"] ?? "");
            const status = String(r["status"] ?? "");
            const sent = String(r["sent"] ?? r["source"] ?? "");
            return (
              un.toLowerCase().includes(q) ||
              desc.toLowerCase().includes(q) ||
              prod.toLowerCase().includes(q) ||
              status.toLowerCase().includes(q) ||
              sent.toLowerCase().includes(q)
            );
          })
        : userScoped;
      const total = filtered.length;
      const page = filtered.slice(offset, offset + limit) as JsonRecord[];
      return Response.json({
        type: "inquiries",
        total,
        offset,
        limit,
        items: page,
        stats: ds,
      });
    }

    return Response.json({ error: "type must be users or inquiries/offers" }, { status: 400 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "load failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
