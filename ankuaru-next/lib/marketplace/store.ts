import fs from "node:fs/promises";
import path from "node:path";
import { Redis } from "@upstash/redis";

const LISTINGS_PATH = path.join(process.cwd(), "data", "listings.json");
const REDIS_KEY = "ankuaru:marketplace:listings:v1";

export type ListingsMap = Record<string, Record<string, unknown>>;

export type WriteListingsResult =
  | { ok: true; persistedWith: "redis" | "filesystem" }
  | { ok: false; message: string };

/** True on Vercel, Netlify Functions, AWS Lambda, etc. — no durable local disk for JSON writes. */
function isEphemeralDeployment(): boolean {
  return (
    process.env.VERCEL === "1" ||
    process.env.NETLIFY === "true" ||
    Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME)
  );
}

function redisHelp(): string {
  return (
    "Configure a REST Redis compatible store (Upstash or Vercel KV): set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN, " +
    "or KV_REST_API_URL + KV_REST_API_TOKEN. Without it, marketplace changes cannot persist on serverless hosts."
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

async function readListingsFile(): Promise<ListingsMap> {
  const raw = await fs.readFile(LISTINGS_PATH, "utf-8");
  return JSON.parse(raw) as ListingsMap;
}

/**
 * Shared marketplace data.
 *
 * - **Local / single Node host:** reads and writes `data/listings.json`.
 * - **Vercel / Netlify / serverless:** the filesystem is not a writable database; configure
 *   `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` (Upstash), or
 *   `KV_REST_API_URL` + `KV_REST_API_TOKEN` (Vercel KV). Redis is seeded from `data/listings.json` at build on first read.
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

  try {
    await fs.writeFile(LISTINGS_PATH, payload, "utf-8");
    return { ok: true, persistedWith: "filesystem" };
  } catch (e) {
    const sys = e instanceof Error ? e.message : String(e);
    const base = `Cannot write listings.json (${sys}).`;
    const looksServerlessFs =
      isEphemeralDeployment() || /EROFS|read-?only|EPERM|EACCES|ENOSPC/i.test(sys);
    if (looksServerlessFs) {
      return { ok: false, message: `${base} ${redisHelp()}` };
    }
    return { ok: false, message: base };
  }
}
