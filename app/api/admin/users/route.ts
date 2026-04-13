import { NextResponse } from "next/server";
import { createSupabaseServerClient, createAdminClient } from "@/lib/supabase/server";

// Only admin can manage users
async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (profile?.role !== "admin") return null;
  return user;
}

// GET — list all staff profiles
export async function GET() {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("profiles")
    .select("id, name, email, role, department, is_active, created_at, last_login")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST — create a new user
export async function POST(request: Request) {
  const caller = await requireAdmin();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { name, email, password, role, department } = await request.json();
  if (!email || !password || !role) {
    return NextResponse.json({ error: "Email, password and role are required" }, { status: 400 });
  }

  const admin = createAdminClient();

  // Create auth user
  const { data: authData, error: authError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authError || !authData.user) {
    return NextResponse.json({ error: authError?.message ?? "Failed to create user" }, { status: 500 });
  }

  // Create profile
  const { error: profileError } = await admin.from("profiles").insert({
    id: authData.user.id,
    name,
    email,
    role,
    department: department || null,
    is_active: true,
  });

  if (profileError) {
    // Rollback auth user
    await admin.auth.admin.deleteUser(authData.user.id);
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: authData.user.id });
}

// PATCH — update role / active status / department
export async function PATCH(request: Request) {
  const caller = await requireAdmin();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id, role, is_active, department, name } = await request.json();
  if (!id) return NextResponse.json({ error: "User ID required" }, { status: 400 });

  const admin = createAdminClient();
  const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (role !== undefined) updates.role = role;
  if (is_active !== undefined) updates.is_active = is_active;
  if (department !== undefined) updates.department = department;
  if (name !== undefined) updates.name = name;

  const { error } = await admin.from("profiles").update(updates).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

// DELETE — deactivate (soft delete) a user
export async function DELETE(request: Request) {
  const caller = await requireAdmin();
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "User ID required" }, { status: 400 });

  // Prevent self-deletion
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user?.id === id) return NextResponse.json({ error: "Cannot deactivate your own account" }, { status: 400 });

  const admin = createAdminClient();
  const { error } = await admin.from("profiles").update({ is_active: false, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
