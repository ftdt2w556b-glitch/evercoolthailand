import { createSupabaseServerClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-ec-bg">
      {user && <AdminNav userEmail={user.email ?? ""} />}
      <div className="max-w-[900px] mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  );
}
