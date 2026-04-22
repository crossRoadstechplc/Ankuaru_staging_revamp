import fs from "node:fs/promises";
import path from "node:path";
import { Redis } from "@upstash/redis";

const LISTINGS_PATH = path.join(process.cwd(), "data", "listings.json");
const REDIS_KEY = "ankuaru:marketplace:listings:v1";

export type ListingsMap = Record<string, Record<string, unknown>>;

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
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
 * - **Local / single Node host:** reads and writes `data/listings.json` (unchanged).
 * - **Vercel / serverless:** the deployment filesystem is not a shared database; each
 *   instance can see different data unless you set a shared store. Configure:
 *   `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` (free tier at upstash.com).
 *   On first use, Redis is seeded from `data/listings.json` in the build.
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

export async function writeListings(listings: ListingsMap): Promise<void> {
  const payload = JSON.stringify(listings);
  const redis = getRedis();
  if (redis) {
    await redis.set(REDIS_KEY, payload);
  }
  try {
    await fs.writeFile(LISTINGS_PATH, payload, "utf-8");
  } catch {
    // Typical on serverless read-only FS; Redis (if configured) is the source of truth.
  }
}
