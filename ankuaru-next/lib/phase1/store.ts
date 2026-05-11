import fs from "node:fs/promises";
import path from "node:path";
import type { Phase1Store } from "@/lib/phase1/types";

const STORE_PATH = path.join(process.cwd(), "data", "phase1-store.json");

const emptyStore = (): Phase1Store => ({
  fields: [],
  lots: [],
  events: [],
  vehicles: [],
  drivers: [],
  labResults: [],
  bankReviews: [],
});

async function readStoreFile(): Promise<Phase1Store> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Phase1Store;
    return {
      fields: Array.isArray(parsed.fields) ? parsed.fields : [],
      lots: Array.isArray(parsed.lots) ? parsed.lots : [],
      events: Array.isArray(parsed.events) ? parsed.events : [],
      vehicles: Array.isArray(parsed.vehicles) ? parsed.vehicles : [],
      drivers: Array.isArray(parsed.drivers) ? parsed.drivers : [],
      labResults: Array.isArray(parsed.labResults) ? parsed.labResults : [],
      bankReviews: Array.isArray(parsed.bankReviews) ? parsed.bankReviews : [],
    };
  } catch {
    return emptyStore();
  }
}

export async function readPhase1Store(): Promise<Phase1Store> {
  return readStoreFile();
}

export async function writePhase1Store(next: Phase1Store): Promise<void> {
  const payload = JSON.stringify(next, null, 2);
  try {
    await fs.writeFile(STORE_PATH, payload, "utf-8");
  } catch {
    // ignore on read-only FS
  }
}
