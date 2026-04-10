import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";
import AdminServiceForm from "@/components/admin/AdminServiceForm";

export const metadata: Metadata = { title: "Services — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const admin = createAdminClient();
  const { data: services } = await admin
    .from("services")
    .select("id, name_en, name_th, slug, category, description_en, is_active")
    .order("sort_order", { ascending: true });

  const all = services ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-ec-text">Services ({all.length})</h1>
      </div>

      {/* Add new */}
      <div className="bg-ec-card rounded-2xl border border-ec-border p-4 mb-6">
        <h2 className="text-sm font-bold text-ec-text mb-3">Add New Service</h2>
        <AdminServiceForm />
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {all.map((s) => (
          <div key={s.id} className="bg-ec-card rounded-2xl border border-ec-border p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-bold text-ec-text truncate">{s.name_en}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${s.is_active ? "bg-green-500/15 text-green-400" : "bg-gray-500/15 text-gray-400"}`}>
                    {s.is_active ? "Active" : "Hidden"}
                  </span>
                </div>
                {s.name_th && <p className="text-xs text-ec-text-muted">{s.name_th}</p>}
                <p className="text-xs text-ec-text-muted/60 mt-1">{s.slug} · {s.category}</p>
                {s.description_en && (
                  <p className="text-xs text-ec-text-muted mt-1 line-clamp-2">{s.description_en}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <AdminServiceForm service={s} />
                <DeleteButton table="services" id={s.id} />
              </div>
            </div>
          </div>
        ))}
        {all.length === 0 && (
          <p className="text-sm text-ec-text-muted text-center py-8">No services yet.</p>
        )}
      </div>
    </div>
  );
}
