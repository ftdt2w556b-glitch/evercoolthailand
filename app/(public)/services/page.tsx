import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/server";
import ServicesGrid from "@/components/public/ServicesGrid";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "AC installation, repair, maintenance, air purifiers, custom AHU, and IAQ consultation in Thailand. Bangkok, Koh Tao & Surat Thani.",
};

export default async function ServicesPage() {
  const admin = createAdminClient();
  const { data: services } = await admin
    .from("services")
    .select("id, slug, name_en, name_th, description_en, description_th, icon, category")
    .eq("is_active", true)
    .order("display_order");

  const allServices = services ?? [];

  return (
    <main className="page-enter px-4 md:px-10 pt-6 pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ec-text leading-tight">All Services</h1>
        <p className="text-sm text-ec-text-muted mt-1">
          Professional HVAC &amp; IAQ solutions for Thailand
        </p>
      </div>

      <ServicesGrid services={allServices} />

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "https://evercoolthailand.com" },
              { name: "Services", url: "https://evercoolthailand.com/services" },
            ])
          ),
        }}
      />
      {allServices.slice(0, 3).map((svc) => (
        <script
          key={svc.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              serviceJsonLd({
                name: svc.name_en,
                description: svc.description_en,
                url: `https://evercoolthailand.com/quote?service=${svc.slug}`,
              })
            ),
          }}
        />
      ))}
    </main>
  );
}
