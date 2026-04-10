import { NextResponse } from "next/server";
import { createAdminClient, createSupabaseServerClient } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

async function verifyAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  return !!profile;
}

export async function PATCH(request: Request, { params }: Params) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const { status } = await request.json();
  const admin = createAdminClient();
  const { error } = await admin.from("bookings").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: "Update failed" }, { status: 500 });
  return NextResponse.json({ success: true });
}
