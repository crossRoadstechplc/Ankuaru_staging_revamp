import fs from "node:fs/promises";
import path from "node:path";

const LISTINGS_PATH = path.join(process.cwd(), "data", "listings.json");

export type ListingsMap = Record<string, Record<string, unknown>>;

export async function readListings(): Promise<ListingsMap> {
  const raw = await fs.readFile(LISTINGS_PATH, "utf-8");
  return JSON.parse(raw) as ListingsMap;
}

export async function writeListings(listings: ListingsMap): Promise<void> {
  await fs.writeFile(LISTINGS_PATH, JSON.stringify(listings, null, 2), "utf-8");
}
