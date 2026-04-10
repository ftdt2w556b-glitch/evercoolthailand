import { NextResponse } from "next/server";
import webpush from "web-push";
import { createAdminClient } from "@/lib/supabase/server";

// VAPID keys — generate once: npx web-push generate-vapid-keys
// Then set in .env.local / Vercel:
//   VAPID_PUBLIC_KEY=...
//   VAPID_PRIVATE_KEY=...
//   VAPID_SUBJECT=mailto:info@evercoolthailand.com

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT ?? "mailto:info@evercoolthailand.com",
  process.env.VAPID_PUBLIC_KEY ?? "",
  process.env.VAPID_PRIVATE_KEY ?? ""
);

export async function POST(request: Request) {
  // Verify admin — must include admin API key header
  const authHeader = request.headers.get("x-admin-key");
  if (authHeader !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json() as {
      title: string;
      body: string;
      url?: string;
      customerIds?: string[];  // if empty, sends to all subscribers
    };

    const admin = createAdminClient();
    let query = admin.from("push_subscriptions").select("endpoint, p256dh, auth");
    if (body.customerIds?.length) {
      query = query.in("customer_id", body.customerIds);
    }
    const { data: subs } = await query;
    if (!subs?.length) return NextResponse.json({ sent: 0 });

    const payload = JSON.stringify({
      title: body.title,
      body: body.body,
      url: body.url ?? "/",
    });

    const results = await Promise.allSettled(
      subs.map((sub) =>
        webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload
        )
      )
    );

    const sent = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.length - sent;
    return NextResponse.json({ sent, failed });
  } catch (err) {
    console.error("Push send error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
