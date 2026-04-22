import { NextResponse } from "next/server";
import {
  appendNotifications,
  markNotificationsRead,
  type MarketplaceNotification,
  type NotificationMap,
  readNotifications,
  writeNotifications,
} from "@/lib/marketplace/social-store";

export const dynamic = "force-dynamic";

const noStore = {
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
};

function toNotificationMap(input: unknown): NotificationMap | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const out: NotificationMap = {};
  for (const [userId, list] of Object.entries(input as Record<string, unknown>)) {
    if (!Array.isArray(list)) return null;
    const mapped: MarketplaceNotification[] = [];
    for (const item of list) {
      if (!item || typeof item !== "object") return null;
      const raw = item as Record<string, unknown>;
      if (
        typeof raw.id !== "string" ||
        (raw.type !== "new_follower_listing" && raw.type !== "bid_placed") ||
        typeof raw.listingId !== "string" ||
        typeof raw.fromUser !== "string" ||
        typeof raw.title !== "string" ||
        typeof raw.createdAt !== "string" ||
        typeof raw.read !== "boolean"
      ) {
        return null;
      }
      mapped.push({
        id: raw.id,
        type: raw.type,
        listingId: raw.listingId,
        fromUser: raw.fromUser,
        title: raw.title,
        createdAt: raw.createdAt,
        read: raw.read,
      });
    }
    out[userId] = mapped;
  }
  return out;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user = (searchParams.get("user") || "").trim();
  const notifications = await readNotifications();
  if (!user) {
    return NextResponse.json({ notifications }, { headers: noStore });
  }
  const items = notifications[user] ?? [];
  const unreadCount = items.filter((item) => !item.read).length;
  return NextResponse.json({ user, items, unreadCount }, { headers: noStore });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as { notifications?: unknown };
  const notifications = toNotificationMap(body.notifications);
  if (!notifications) {
    return NextResponse.json({ message: "Invalid notifications payload." }, { status: 400 });
  }
  await writeNotifications(notifications);
  return NextResponse.json({ ok: true, count: Object.keys(notifications).length }, { headers: noStore });
}

export async function POST(request: Request) {
  const body = (await request.json()) as
    | {
        action: "append";
        userIds: string[];
        payload: {
          type: "new_follower_listing" | "bid_placed";
          listingId: string;
          fromUser: string;
          title: string;
          createdAt?: string;
        };
      }
    | {
        action: "mark-read";
        userId: string;
        ids?: string[];
      };

  if (body.action === "append") {
    if (!Array.isArray(body.userIds) || body.userIds.length === 0 || !body.payload) {
      return NextResponse.json({ message: "Invalid append payload." }, { status: 400 });
    }
    const payload = {
      ...body.payload,
      createdAt: body.payload.createdAt || new Date().toISOString(),
    };
    const result = await appendNotifications(body.userIds, payload);
    return NextResponse.json({ ok: true, ...result }, { headers: noStore });
  }

  if (body.action === "mark-read") {
    if (!body.userId) {
      return NextResponse.json({ message: "Missing userId." }, { status: 400 });
    }
    const changed = await markNotificationsRead(body.userId, body.ids);
    return NextResponse.json({ ok: true, changed }, { headers: noStore });
  }

  return NextResponse.json({ message: "Unknown action." }, { status: 400 });
}
