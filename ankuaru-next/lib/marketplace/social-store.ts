import fs from "node:fs/promises";
import path from "node:path";
import { Redis } from "@upstash/redis";

const FOLLOWS_PATH = path.join(process.cwd(), "data", "follows.json");
const NOTIFICATIONS_PATH = path.join(process.cwd(), "data", "notifications.json");
const FOLLOWS_REDIS_KEY = "ankuaru:marketplace:follows:v1";
const NOTIFICATIONS_REDIS_KEY = "ankuaru:marketplace:notifications:v1";

export type FollowMap = Record<string, string[]>;

export type MarketplaceNotification = {
  id: string;
  type: "new_follower_listing" | "bid_placed";
  listingId: string;
  fromUser: string;
  title: string;
  createdAt: string;
  read: boolean;
};

export type NotificationMap = Record<string, MarketplaceNotification[]>;

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

async function writeJsonFile(filePath: string, payload: unknown): Promise<void> {
  try {
    await fs.writeFile(filePath, JSON.stringify(payload), "utf-8");
  } catch {
    // Serverless local FS can be read-only; Redis (if configured) remains source of truth.
  }
}

export async function readFollows(): Promise<FollowMap> {
  const redis = getRedis();
  if (redis) {
    const raw = await redis.get<string>(FOLLOWS_REDIS_KEY);
    if (raw && typeof raw === "string") return JSON.parse(raw) as FollowMap;
    const seed = await readJsonFile<FollowMap>(FOLLOWS_PATH);
    await redis.set(FOLLOWS_REDIS_KEY, JSON.stringify(seed));
    return seed;
  }
  return readJsonFile<FollowMap>(FOLLOWS_PATH);
}

export async function writeFollows(follows: FollowMap): Promise<void> {
  const payload = JSON.stringify(follows);
  const redis = getRedis();
  if (redis) await redis.set(FOLLOWS_REDIS_KEY, payload);
  await writeJsonFile(FOLLOWS_PATH, follows);
}

export async function readNotifications(): Promise<NotificationMap> {
  const redis = getRedis();
  if (redis) {
    const raw = await redis.get<string>(NOTIFICATIONS_REDIS_KEY);
    if (raw && typeof raw === "string") return JSON.parse(raw) as NotificationMap;
    const seed = await readJsonFile<NotificationMap>(NOTIFICATIONS_PATH);
    await redis.set(NOTIFICATIONS_REDIS_KEY, JSON.stringify(seed));
    return seed;
  }
  return readJsonFile<NotificationMap>(NOTIFICATIONS_PATH);
}

export async function writeNotifications(notifications: NotificationMap): Promise<void> {
  const payload = JSON.stringify(notifications);
  const redis = getRedis();
  if (redis) await redis.set(NOTIFICATIONS_REDIS_KEY, payload);
  await writeJsonFile(NOTIFICATIONS_PATH, notifications);
}

export async function appendNotifications(
  userIds: string[],
  payload: Omit<MarketplaceNotification, "id" | "read">,
): Promise<{ added: number }> {
  if (!userIds.length) return { added: 0 };
  const notifications = await readNotifications();
  const baseId = `ntf-${Date.now()}`;
  let added = 0;
  userIds.forEach((userId, index) => {
    const list = notifications[userId] ?? [];
    const next = {
      ...payload,
      id: `${baseId}-${index}`,
      read: false,
    } satisfies MarketplaceNotification;
    notifications[userId] = [next, ...list].slice(0, 200);
    added += 1;
  });
  await writeNotifications(notifications);
  return { added };
}

export async function markNotificationsRead(userId: string, ids?: string[]): Promise<number> {
  const notifications = await readNotifications();
  const list = notifications[userId] ?? [];
  const idSet = ids && ids.length ? new Set(ids) : null;
  let changed = 0;
  notifications[userId] = list.map((item) => {
    const shouldRead = idSet ? idSet.has(item.id) : true;
    if (shouldRead && !item.read) {
      changed += 1;
      return { ...item, read: true };
    }
    return item;
  });
  if (changed > 0) await writeNotifications(notifications);
  return changed;
}
