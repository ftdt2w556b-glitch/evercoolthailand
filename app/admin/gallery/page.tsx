import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";
import AdminGalleryForm from "@/components/admin/AdminGalleryForm";

export const metadata: Metadata = { title: "Gallery — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const admin = createAdminClient();
  const { data: items } = await admin
    .from("gallery_items")
    .select("id, title, title_th, category, location, before_image_path, after_image_path, created_at")
    .order("created_at", { ascending: false });

  const all = items ?? [];

  // Get signed URLs for preview
  const withUrls = await Promise.all(
    all.map(async (item) => {
      let beforeUrl: string | null = null;
      let afterUrl: string | null = null;
      if (item.before_image_path) {
        const { data } = admin.storage.from("gallery-images").getPublicUrl(item.before_image_path as string);
        beforeUrl = data.publicUrl;
      }
      if (item.after_image_path) {
        const { data } = admin.storage.from("gallery-images").getPublicUrl(item.after_image_path as string);
        afterUrl = data.publicUrl;
      }
      return { ...item, beforeUrl, afterUrl };
    })
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-ec-text">Gallery ({all.length})</h1>
      </div>

      {/* Add new */}
      <div className="bg-ec-card rounded-2xl border border-ec-border p-4 mb-6">
        <h2 className="text-sm font-bold text-ec-text mb-3">Add Gallery Item</h2>
        <AdminGalleryForm />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {withUrls.map((item) => (
          <div key={item.id} className="bg-ec-card rounded-2xl border border-ec-border overflow-hidden">
            {/* Before image preview */}
            <div className="aspect-video bg-ec-bg relative">
              {item.beforeUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.beforeUrl} alt={item.title as string} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-ec-text-muted">No image</div>
              )}
              <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-white rounded px-1.5 py-0.5">Before</span>
            </div>
            <div className="p-3">
              <p className="text-sm font-bold text-ec-text truncate">{item.title}</p>
              <p className="text-xs text-ec-text-muted capitalize">{item.category as string}{item.location ? ` · ${item.location}` : ""}</p>
              <div className="flex items-center gap-3 mt-2">
                <DeleteButton table="gallery" id={item.id} label="Remove" />
              </div>
            </div>
          </div>
        ))}
        {all.length === 0 && (
          <p className="text-sm text-ec-text-muted text-center py-8 col-span-2">No gallery items yet.</p>
        )}
      </div>
    </div>
  );
}
