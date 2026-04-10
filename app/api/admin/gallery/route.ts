import { NextResponse } from "next/server";
import { createAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function verifyAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const admin = createAdminClient();
  const { data } = await admin.from("profiles").select("id").eq("id", user.id).maybeSingle();
  return !!data;
}

export async function POST(request: Request) {
  if (!await verifyAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const formData = await request.formData();
  const admin = createAdminClient();

  const title = formData.get("title") as string;
  const titleTh = formData.get("title_th") as string | null;
  const category = formData.get("category") as string;
  const location = formData.get("location") as string | null;

  let beforePath: string | null = null;
  let afterPath: string | null = null;

  for (const key of ["before_image", "after_image"] as const) {
    const file = formData.get(key) as File | null;
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = file.name.split(".").pop() ?? "jpg";
      const fileName = `gallery/${Date.now()}-${key}.${ext}`;
      const { error } = await admin.storage.from("gallery-images").upload(fileName, buffer, {
        contentType: file.type, upsert: false,
      });
      if (!error) {
        if (key === "before_image") beforePath = fileName;
        else afterPath = fileName;
      }
    }
  }

  const { data, error } = await admin.from("gallery_items").insert({
    title, title_th: titleTh, category, location,
    before_image_path: beforePath, after_image_path: afterPath,
  }).select("id").single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ id: data.id });
}
