import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient, createAdminClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Dashboard | Evercool Portal" };
export const dynamic = "force-dynamic";

type Role = "admin" | "sales" | "manager" | "owner" | "technician" | "staff";

function StatCard({ label, value, href, color, icon }: {
  label: string; value: number | string; href?: string; color: string; icon?: React.ReactNode;
}) {
  const inner = (
    <div className="bg-ec-card rounded-2xl border border-ec-border p-4 hover:border-ec-teal/30 transition-all h-full">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-ec-text-muted">{label}</p>
        {icon && <span className="text-ec-text-muted/40">{icon}</span>}
      </div>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : <div>{inner}</div>;
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase.from("profiles").select("role, name").eq("id", user.id).maybeSingle();
  if (!profile) redirect("/admin/login");

  const role = profile.role as Role;
  const admin = createAdminClient();

  // Fetch data relevant to the role
  const [
    { count: newQuotes },
    { count: newMessages },
    { count: totalQuotes },
    { count: acceptedQuotes },
    { data: recentQuotes },
    { data: recentMessages },
  ] = await Promise.all([
    admin.from("quotes").select("*", { count: "exact", head: true }).eq("status", "new"),
    admin.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "new"),
    admin.from("quotes").select("*", { count: "exact", head: true }),
    admin.from("quotes").select("*", { count: "exact", head: true }).eq("status", "accepted"),
    admin.from("quotes").select("id, name, service_type, status, created_at, property_type").order("created_at", { ascending: false }).limit(6),
    admin.from("contact_messages").select("id, name, subject, status, created_at").order("created_at", { ascending: false }).limit(5),
  ]);

  const greeting = profile.name ? `Welcome back, ${profile.name.split(" ")[0]}` : "Welcome back";

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-ec-text">{greeting}</h1>
        <p className="text-xs text-ec-text-muted mt-0.5 capitalize">{role} dashboard · Evercool Thailand</p>
      </div>

      {/* ── ADMIN view ─────────────────────────────────── */}
      {role === "admin" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <StatCard label="New Quotes" value={newQuotes ?? 0} href="/admin/quotes" color="text-blue-400" />
            <StatCard label="New Messages" value={newMessages ?? 0} href="/admin/messages" color="text-purple-400" />
            <StatCard label="Total Quotes" value={totalQuotes ?? 0} href="/admin/quotes" color="text-ec-teal" />
            <StatCard label="Accepted Quotes" value={acceptedQuotes ?? 0} href="/admin/quotes" color="text-green-400" />
          </div>
          <div className="grid sm:grid-cols-3 gap-3 mb-8">
            {[
              { href: "/admin/users",    label: "Manage Users",   desc: "Create accounts & assign roles", color: "text-red-400" },
              { href: "/admin/articles", label: "Articles",       desc: "Edit blog & learn content",      color: "text-amber-400" },
              { href: "/admin/gallery",  label: "Gallery",        desc: "Manage project photos",          color: "text-teal-400" },
            ].map(q => (
              <Link key={q.href} href={q.href} className="bg-ec-card border border-ec-border rounded-2xl p-4 hover:border-ec-teal/30 transition-all">
                <p className={`text-sm font-bold ${q.color} mb-1`}>{q.label}</p>
                <p className="text-xs text-ec-text-muted">{q.desc}</p>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* ── OWNER view ─────────────────────────────────── */}
      {role === "owner" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <StatCard label="Total Quotes" value={totalQuotes ?? 0} href="/admin/quotes" color="text-ec-teal" />
            <StatCard label="Accepted" value={acceptedQuotes ?? 0} href="/admin/quotes" color="text-green-400" />
            <StatCard label="New Leads" value={newQuotes ?? 0} href="/admin/quotes" color="text-blue-400" />
            <StatCard label="New Messages" value={newMessages ?? 0} href="/admin/messages" color="text-purple-400" />
          </div>
          <div className="bg-ec-card border border-ec-border rounded-2xl p-5 mb-6">
            <p className="text-xs font-bold text-ec-text-muted uppercase tracking-widest mb-3">Pipeline Overview</p>
            <p className="text-sm text-ec-text-muted">Charts and financial reports coming soon. Data will populate as the team logs activity.</p>
          </div>
        </>
      )}

      {/* ── MANAGER view ───────────────────────────────── */}
      {role === "manager" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <StatCard label="New Quotes" value={newQuotes ?? 0} href="/admin/quotes" color="text-blue-400" />
            <StatCard label="Accepted" value={acceptedQuotes ?? 0} href="/admin/quotes" color="text-green-400" />
            <StatCard label="New Messages" value={newMessages ?? 0} href="/admin/messages" color="text-purple-400" />
            <StatCard label="Total Quotes" value={totalQuotes ?? 0} href="/admin/quotes" color="text-ec-teal" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            <Link href="/admin/team" className="bg-ec-card border border-ec-border rounded-2xl p-4 hover:border-ec-teal/30 transition-all">
              <p className="text-sm font-bold text-amber-400 mb-1">Team</p>
              <p className="text-xs text-ec-text-muted">View and manage your team members</p>
            </Link>
            <Link href="/admin/reports" className="bg-ec-card border border-ec-border rounded-2xl p-4 hover:border-ec-teal/30 transition-all">
              <p className="text-sm font-bold text-ec-teal mb-1">Reports</p>
              <p className="text-xs text-ec-text-muted">Sales activity and performance</p>
            </Link>
          </div>
        </>
      )}

      {/* ── SALES view ─────────────────────────────────── */}
      {role === "sales" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            <StatCard label="New Quotes" value={newQuotes ?? 0} href="/admin/quotes" color="text-blue-400" />
            <StatCard label="Accepted" value={acceptedQuotes ?? 0} href="/admin/quotes" color="text-green-400" />
            <StatCard label="New Messages" value={newMessages ?? 0} href="/admin/messages" color="text-purple-400" />
          </div>
        </>
      )}

      {/* ── TECHNICIAN / STAFF view ────────────────────── */}
      {(role === "technician" || role === "staff") && (
        <div className="bg-ec-card border border-ec-border rounded-2xl p-6 text-center">
          <p className="text-sm font-semibold text-ec-text mb-2">Your workspace is being set up</p>
          <p className="text-xs text-ec-text-muted">Job assignments and field tools will appear here shortly.</p>
        </div>
      )}

      {/* Recent quotes — visible to admin, sales, manager, owner */}
      {["admin", "sales", "manager", "owner"].includes(role) && (
        <div className="grid sm:grid-cols-2 gap-6">
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
                    <p className="text-xs text-ec-text-muted capitalize">{String(q.service_type).replace(/-/g, " ")} · {q.property_type}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg shrink-0 ${
                    q.status === "new" ? "bg-blue-500/15 text-blue-400" :
                    q.status === "accepted" ? "bg-green-500/15 text-green-400" :
                    "bg-gray-500/15 text-gray-400"
                  }`}>{q.status as string}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-ec-text">Recent Messages</h2>
              <Link href="/admin/messages" className="text-xs text-ec-teal hover:underline">View all</Link>
            </div>
            <div className="flex flex-col gap-2">
              {(recentMessages ?? []).map((m) => (
                <div key={m.id} className="bg-ec-card rounded-xl border border-ec-border px-3 py-2.5 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ec-text truncate">{m.name}</p>
                    <p className="text-xs text-ec-text-muted truncate">{m.subject}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg shrink-0 ${m.status === "new" ? "bg-purple-500/15 text-purple-400" : "bg-gray-500/15 text-gray-400"}`}>{m.status as string}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
