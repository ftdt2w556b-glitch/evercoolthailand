"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import TestimonialsCarousel from "@/components/public/TestimonialsCarousel";

const SERVICES = [
  { key: "svcInstall" as const, descKey: "svcInstallDesc" as const, icon: "❄️", href: "/quote?service=ac-installation" },
  { key: "svcRepair" as const, descKey: "svcRepairDesc" as const, icon: "🔧", href: "/quote?service=ac-repair" },
  { key: "svcMaintenance" as const, descKey: "svcMaintenanceDesc" as const, icon: "🛡️", href: "/quote?service=ac-maintenance" },
  { key: "svcPurifier" as const, descKey: "svcPurifierDesc" as const, icon: "🌬️", href: "/quote?service=air-purifier" },
  { key: "svcAHU" as const, descKey: "svcAHUDesc" as const, icon: "⚙️", href: "/quote?service=custom-ahu" },
  { key: "svcConsultation" as const, descKey: "svcConsultationDesc" as const, icon: "📋", href: "/quote?service=iaq-consultation" },
];

const TRUST_ITEMS = [
  { key: "trustYears" as const, labelKey: "trustYearsLabel" as const, icon: "🏆" },
  { key: "trustCertified" as const, labelKey: "trustCertifiedLabel" as const, icon: "✅" },
  { key: "trustProjects" as const, labelKey: "trustProjectsLabel" as const, icon: "🏗️" },
  { key: "trustAreas" as const, labelKey: "trustAreasLabel" as const, icon: "🗺️" },
];

const IAQ_ITEMS = [
  { key: "iaqHumidity" as const, descKey: "iaqHumidityDesc" as const, icon: "💧" },
  { key: "iaqMold" as const, descKey: "iaqMoldDesc" as const, icon: "🍄" },
  { key: "iaqPollution" as const, descKey: "iaqPollutionDesc" as const, icon: "🏙️" },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <main className="page-enter">
      {/* Hero Section */}
      <section className="hero-bg text-white px-5 pt-8 pb-10 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-medium mb-4 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-ec-green-light animate-pulse" />
            Thailand&apos;s IAQ Specialists
          </div>
          <h1 className="text-2xl font-bold leading-tight mb-3 tracking-tight">
            {t.heroTagline}
          </h1>
          <p className="text-sm text-white/75 leading-relaxed max-w-[320px] mx-auto">
            {t.heroSubtitle}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/quote"
            className="bg-ec-teal hover:bg-ec-teal-light text-white font-bold text-base rounded-2xl py-3.5 text-center shadow-lg shadow-ec-teal/25 transition-all active:scale-[0.98]"
          >
            {t.heroQuoteBtn}
          </Link>
          <Link
            href="/book"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-sm rounded-2xl py-3 text-center border border-white/20 transition-all active:scale-[0.98]"
          >
            {t.heroBookBtn}
          </Link>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="px-4 -mt-5">
        <div className="bg-ec-card rounded-2xl shadow-lg border border-ec-border p-4">
          <div className="grid grid-cols-4 gap-2">
            {TRUST_ITEMS.map((item) => (
              <div key={item.key} className="text-center">
                <div className="text-lg mb-1">{item.icon}</div>
                <p className="text-xs font-bold text-ec-text leading-tight">{t[item.key]}</p>
                <p className="text-[10px] text-ec-text-muted">{t[item.labelKey]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 mt-6">
        <h2 className="text-lg font-bold text-ec-text mb-3 px-1">
          {t.navServices}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {SERVICES.map((svc) => (
            <Link
              key={svc.key}
              href={svc.href}
              className="bg-ec-card rounded-2xl p-4 border border-ec-border hover:border-ec-teal/30 hover:shadow-md transition-all active:scale-[0.98] group"
            >
              <div className="text-2xl mb-2">{svc.icon}</div>
              <h3 className="text-sm font-semibold text-ec-text group-hover:text-ec-teal transition-colors leading-tight">
                {t[svc.key]}
              </h3>
              <p className="text-[11px] text-ec-text-muted mt-1 leading-snug line-clamp-2">
                {t[svc.descKey]}
              </p>
            </Link>
          ))}
        </div>
        <Link
          href="/services"
          className="block text-center text-sm font-semibold text-ec-teal mt-4 py-2 hover:underline"
        >
          {t.viewAllServices} &rarr;
        </Link>
      </section>

      {/* IAQ Highlights */}
      <section className="px-4 mt-8 mb-6">
        <h2 className="text-lg font-bold text-ec-text mb-3 px-1">
          {t.iaqTitle}
        </h2>
        <div className="flex flex-col gap-3">
          {IAQ_ITEMS.map((item) => (
            <div
              key={item.key}
              className="bg-ec-card rounded-2xl p-4 border border-ec-border flex gap-3"
            >
              <div className="text-2xl shrink-0 mt-0.5">{item.icon}</div>
              <div>
                <h3 className="text-sm font-semibold text-ec-text">{t[item.key]}</h3>
                <p className="text-xs text-ec-text-muted mt-1 leading-relaxed">
                  {t[item.descKey]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* See Our Work */}
      <section className="px-4 mt-4 mb-2">
        <Link
          href="/gallery"
          className="flex items-center justify-between bg-ec-card rounded-2xl border border-ec-border p-4 hover:border-ec-teal/30 transition-all active:scale-[0.98]"
        >
          <div>
            <p className="text-sm font-bold text-ec-text">{t.seeOurWork}</p>
            <p className="text-xs text-ec-text-muted mt-0.5">{t.gallerySubtitle}</p>
          </div>
          <svg className="w-5 h-5 text-ec-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>

      {/* WhatsApp CTA */}
      <section className="px-4 mt-4 mb-8">
        <a
          href="https://wa.me/66955622892"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm rounded-2xl py-3.5 transition-all active:scale-[0.98]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>
      </section>

      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Evercool Thailand",
            description: "Thailand's trusted IAQ & HVAC specialists. AC installation, repair, maintenance, air purifiers, and custom solutions.",
            telephone: "+66955622892",
            url: "https://evercoolthailand.com",
            areaServed: { "@type": "Country", name: "Thailand" },
            serviceType: ["HVAC", "Air Conditioning", "Air Quality", "AC Installation", "AC Repair"],
          }),
        }}
      />
    </main>
  );
}
