import type { Metadata } from "next";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Admin Dashboard" };

export const dynamic = "force-dynamic";

function StatCard({ label, value, href, color }: {
  label: string; value: number; href: string; color: string;
}) {
  return (
    <Link href={href} className="bg-ec-card rounded-2xl border border-ec-border p-4 hover:border-ec-teal/30 transition-all">
      <p className="text-xs font-semibold text-ec-text-muted mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </Link>
  );
}

export default async function DashboardPage() {
  const admin = createAdminClient();

  const [
    { count: newQuotes },
    { count: pendingBookings },
    { count: newMessages },
    { count: totalQuotes },
    { data: recentQuotes },
    { data: recentBookings },
  ] = await Promise.all([
    admin.from("quotes").select("*", { count: "exact", head: true }).eq("status", "new"),
    admin.from("bookings").select("*", { count: "exact", head: true }).eq("status", "pending"),
    admin.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "new"),
    admin.from("quotes").select("*", { count: "exact", head: true }),
    admin.from("quotes").select("id, name, service_type, status, created_at").order("created_at", { ascending: false }).limit(5),
    admin.from("bookings").select("id, name, service_name, booking_date, booking_time, status").order("created_at", { ascending: false }).limit(5),
  ]);

  return (
    <div>
      <h1 className="text-xl font-bold text-ec-text mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <StatCard label="New Quotes" value={newQuotes ?? 0} href="/admin/quotes" color="text-blue-400" />
        <StatCard label="Pending Bookings" value={pendingBookings ?? 0} href="/admin/bookings" color="text-amber-400" />
        <StatCard label="New Messages" value={newMessages ?? 0} href="/admin/messages" color="text-purple-400" />
        <StatCard label="Total Quotes" value={totalQuotes ?? 0} href="/admin/quotes" color="text-ec-teal" />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Recent Quotes */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-ec-text">Recent Quotes</h2>
            <Link href="/admin/quotes" className="text-xs text-ec-teal hover:underline">View all</Link>
          </div>
          <div className="flex flex-col gap-2">
            {(recentQuotes ?? []).map((q) => (
              <div key={q.id} className="bg-ec-card rounded-xl border border-ec-border px-3 py-2.5 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ec-text truncate">{q.name}</p>
                  <p className="text-xs text-ec-text-muted capitalize">{(q.service_type as string).replace(/-/g, " ")}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg shrink-0 ${q.status === "new" ? "bg-blue-500/15 text-blue-400" : "bg-gray-500/15 text-gray-400"}`}>
                  {q.status as string}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-ec-text">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-xs text-ec-teal hover:underline">View all</Link>
          </div>
          <div className="flex flex-col gap-2">
            {(recentBookings ?? []).map((b) => (
              <div key={b.id} className="bg-ec-card rounded-xl border border-ec-border px-3 py-2.5 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ec-text truncate">{b.name}</p>
                  <p className="text-xs text-ec-text-muted">{b.booking_date as string} · {b.booking_time as string}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg shrink-0 ${b.status === "pending" ? "bg-amber-500/15 text-amber-400" : "bg-green-500/15 text-green-400"}`}>
                  {b.status as string}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
