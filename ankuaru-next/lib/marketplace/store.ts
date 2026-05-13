import fs from "node:fs/promises";
import path from "node:path";
import { Redis } from "@upstash/redis";

const LISTINGS_PATH = path.join(process.cwd(), "data", "listings.json");
const REDIS_KEY = "ankuaru:marketplace:listings:v1";

export type ListingsMap = Record<string, Record<string, unknown>>;

export type WriteListingsResult =
  | { ok: true; persistedWith: "redis" | "supabase" | "filesystem" }
  | { ok: false; message: string };

/** True on Vercel, Netlify Functions, AWS Lambda, etc. — no durable local disk for JSON writes. */
function isEphemeralDeployment(): boolean {
  return (
    process.env.VERCEL === "1" ||
    process.env.NETLIFY === "true" ||
    Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME)
  );
}

function persistenceHelp(): string {
  return (
    "For serverless demos without Redis: create table `marketplace_listings (id int primary key, data jsonb not null)` " +
    "and set `SUPABASE_URL` (or `NEXT_PUBLIC_SUPABASE_URL`) + `SUPABASE_SERVICE_ROLE_KEY` (legacy) or `SUPABASE_SECRET_KEY` (new `sb_secret_...` key). " +
    "Dashboard: Settings → API Keys. Alternatively Redis/KV env vars."
  );
}

function getRedis(): Redis | null {
  const url =
    (process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL)?.trim() || "";
  const token =
    (process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN)?.trim() || "";
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/** Supabase REST (free Postgres tier). Use a secret / service_role key only on the server — never expose publicly. */
function getSupabaseConfig(): { url: string; key: string } | null {
  const rawUrl =
    process.env.SUPABASE_URL?.trim() || process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
  /** Legacy JWT `service_role`, or new platform secret key `sb_secret_...` — see https://supabase.com/docs/guides/api/api-keys */
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SECRET_KEY?.trim() ||
    "";
  if (!rawUrl || !key) return null;
  return { url: rawUrl.replace(/\/+$/, ""), key };
}

async function fetchSupabaseListings(cfg: { url: string; key: string }): Promise<ListingsMap | null> {
  const res = await fetch(`${cfg.url}/rest/v1/marketplace_listings?id=eq.1&select=data`, {
    headers: {
      apikey: cfg.key,
      Authorization: `Bearer ${cfg.key}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Supabase read HTTP ${res.status}: ${t}`);
  }
  const rows = (await res.json()) as { data: unknown }[];
  if (!Array.isArray(rows) || rows.length === 0) {
    return null;
  }
  const raw = rows[0]?.data;
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return raw as ListingsMap;
  }
  return null;
}

async function upsertSupabaseListings(cfg: { url: string; key: string }, listings: ListingsMap): Promise<void> {
  const baseHeaders: Record<string, string> = {
    apikey: cfg.key,
    Authorization: `Bearer ${cfg.key}`,
    "Content-Type": "application/json",
  };

  /** PostgREST upsert: PK conflict on `id` merges row (required for reliable serverless persistence). */
  const upsert = await fetch(`${cfg.url}/rest/v1/marketplace_listings?on_conflict=id`, {
    method: "POST",
    headers: {
      ...baseHeaders,
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify([{ id: 1, data: listings }]),
    cache: "no-store",
  });

  if (upsert.ok) {
    return;
  }

  const primaryErr = await upsert.text().catch(() => "");

  const rowRes = await fetch(`${cfg.url}/rest/v1/marketplace_listings?id=eq.1&select=id`, {
    headers: {
      ...baseHeaders,
      Accept: "application/json",
    },
    cache: "no-store",
  });
  const rowJson = (await rowRes.json().catch(() => [])) as unknown;
  const exists = Array.isArray(rowJson) && rowJson.length > 0;

  if (exists) {
    const patch = await fetch(`${cfg.url}/rest/v1/marketplace_listings?id=eq.1`, {
      method: "PATCH",
      headers: {
        ...baseHeaders,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ data: listings }),
      cache: "no-store",
    });
    if (!patch.ok) {
      const t = await patch.text().catch(() => "");
      throw new Error(`Supabase PATCH failed HTTP ${patch.status}: ${t}`);
    }
    return;
  }

  const insert = await fetch(`${cfg.url}/rest/v1/marketplace_listings`, {
    method: "POST",
    headers: {
      ...baseHeaders,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ id: 1, data: listings }),
    cache: "no-store",
  });
  if (!insert.ok) {
    const t = await insert.text().catch(() => "");
    throw new Error(
      `Supabase listings write failed. Upsert: HTTP ${upsert.status} ${primaryErr}; INSERT: HTTP ${insert.status} ${t}`,
    );
  }
}

async function readListingsFile(): Promise<ListingsMap> {
  const raw = await fs.readFile(LISTINGS_PATH, "utf-8");
  return JSON.parse(raw) as ListingsMap;
}

/**
 * Shared marketplace data.
 *
 * - **Local:** reads/writes `data/listings.json` when no cloud backend is configured.
 * - **Redis:** `UPSTASH_*` or `KV_REST_*` env vars.
 * - **Supabase (free tier, good for demos):** `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`, table `marketplace_listings(id int pk, data jsonb)`.
 */
export async function readListings(): Promise<ListingsMap> {
  const redis = getRedis();
  if (redis) {
    const raw = await redis.get<string>(REDIS_KEY);
    if (raw && typeof raw === "string") {
      return JSON.parse(raw) as ListingsMap;
    }
    const seed = await readListingsFile();
    await redis.set(REDIS_KEY, JSON.stringify(seed));
    return seed;
  }

  const sb = getSupabaseConfig();
  if (sb) {
    try {
      const fromDb = await fetchSupabaseListings(sb);
      if (fromDb !== null && Object.keys(fromDb).length > 0) {
        return fromDb;
      }
      const seed = await readListingsFile();
      await upsertSupabaseListings(sb, seed);
      return seed;
    } catch (e) {
      console.error("[marketplace] Supabase read failed, falling back to listings.json:", e);
      return readListingsFile();
    }
  }

  return readListingsFile();
}

export async function writeListings(listings: ListingsMap): Promise<WriteListingsResult> {
  const payload = JSON.stringify(listings);
  const redis = getRedis();

  if (redis) {
    try {
      await redis.set(REDIS_KEY, payload);
      try {
        await fs.writeFile(LISTINGS_PATH, payload, "utf-8");
      } catch {
        // Mirror to disk when possible (local dev); Redis remains source of truth on serverless.
      }
      return { ok: true, persistedWith: "redis" };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return { ok: false, message: `Redis write failed: ${msg}` };
    }
  }

  const sb = getSupabaseConfig();
  if (sb) {
    try {
      await upsertSupabaseListings(sb, listings);
      try {
        await fs.writeFile(LISTINGS_PATH, payload, "utf-8");
      } catch {
        // Optional mirror when running locally with Supabase.
      }
      return { ok: true, persistedWith: "supabase" };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return { ok: false, message: msg };
    }
  }

  try {
    await fs.writeFile(LISTINGS_PATH, payload, "utf-8");
    return { ok: true, persistedWith: "filesystem" };
  } catch (e) {
    const sys = e instanceof Error ? e.message : String(e);
    const base = `Cannot write listings.json (${sys}).`;
    const looksServerlessFs =
      isEphemeralDeployment() || /EROFS|read-?only|EPERM|EACCES|ENOSPC/i.test(sys);
    if (looksServerlessFs) {
      return { ok: false, message: `${base} ${persistenceHelp()}` };
    }
    return { ok: false, message: base };
  }
}
