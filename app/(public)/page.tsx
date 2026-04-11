"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import ProjectReferences from "@/components/public/ProjectReferences";

const SERVICES = [
  {
    key: "svcInstall" as const,
    descKey: "svcInstallDesc" as const,
    href: "/quote?service=ac-installation",
    color: "bg-sky-500/10 text-sky-500",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.707.707m13.136 13.136.707.707M1 12h1m20 0h1M4.22 19.78l.707-.707M18.364 5.636l.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0l2 2m-2-2l-2 2" />
      </svg>
    ),
  },
  {
    key: "svcRepair" as const,
    descKey: "svcRepairDesc" as const,
    href: "/quote?service=ac-repair",
    color: "bg-orange-500/10 text-orange-500",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
  {
    key: "svcMaintenance" as const,
    descKey: "svcMaintenanceDesc" as const,
    href: "/quote?service=ac-maintenance",
    color: "bg-emerald-500/10 text-emerald-600",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    key: "svcPurifier" as const,
    descKey: "svcPurifierDesc" as const,
    href: "/quote?service=air-purifier",
    color: "bg-cyan-500/10 text-cyan-500",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    key: "svcAHU" as const,
    descKey: "svcAHUDesc" as const,
    href: "/quote?service=custom-ahu",
    color: "bg-violet-500/10 text-violet-500",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    key: "svcConsultation" as const,
    descKey: "svcConsultationDesc" as const,
    href: "/quote?service=iaq-consultation",
    color: "bg-amber-500/10 text-amber-500",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
];

const TRUST_ITEMS = [
  {
    key: "trustYears" as const,
    labelKey: "trustYearsLabel" as const,
    icon: (
      <svg className="w-5 h-5 text-ec-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    key: "trustCertified" as const,
    labelKey: "trustCertifiedLabel" as const,
    icon: (
      <svg className="w-5 h-5 text-ec-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    key: "trustProjects" as const,
    labelKey: "trustProjectsLabel" as const,
    icon: (
      <svg className="w-5 h-5 text-ec-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    key: "trustAreas" as const,
    labelKey: "trustAreasLabel" as const,
    icon: (
      <svg className="w-5 h-5 text-ec-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const IAQ_ITEMS = [
  {
    key: "iaqHumidity" as const,
    descKey: "iaqHumidityDesc" as const,
    color: "bg-blue-500/10",
    iconColor: "text-blue-500",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    key: "iaqMold" as const,
    descKey: "iaqMoldDesc" as const,
    color: "bg-amber-500/10",
    iconColor: "text-amber-500",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    key: "iaqPollution" as const,
    descKey: "iaqPollutionDesc" as const,
    color: "bg-slate-500/10",
    iconColor: "text-slate-500",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <main className="page-enter">
      {/* Hero Section */}
      <section className="hero-bg text-white px-5 pt-10 pb-10 md:px-10 md:pt-14 md:pb-14 relative overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border border-white/8 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

        <div className="md:max-w-xl relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold mb-5 border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-ec-green-light animate-pulse" />
            Licensed HVAC Contractor · Bangkok &amp; Islands
          </div>
          <h1 className="text-[2rem] md:text-5xl font-black leading-[1.15] mb-3 tracking-tight">
            {t.heroTagline}
          </h1>
          <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-[340px]">
            AC installation, repair, maintenance &amp; air purifiers. Serving Bangkok, Koh Tao and Surat Thani.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 relative md:max-w-sm">
          <Link
            href="/quote"
            className="flex-1 bg-ec-teal hover:bg-ec-teal-light text-white font-bold text-[15px] rounded-2xl py-4 text-center shadow-lg shadow-ec-teal/30 transition-all active:scale-[0.98]"
          >
            {t.heroQuoteBtn}
          </Link>
          <Link
            href="/book"
            className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-sm rounded-2xl py-3.5 text-center border border-white/20 transition-all active:scale-[0.98]"
          >
            {t.heroBookBtn}
          </Link>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="px-4 md:px-10 pt-6">
        <div className="bg-ec-card rounded-2xl shadow-xl border border-ec-border p-4">
          <div className="grid grid-cols-4 divide-x divide-ec-border/50">
            {TRUST_ITEMS.map((item) => (
              <div key={item.key} className="text-center px-1">
                <div className="flex justify-center mb-1.5">{item.icon}</div>
                <p className="text-[11px] font-bold text-ec-text leading-tight">{t[item.key]}</p>
                <p className="text-[9px] text-ec-text-muted mt-0.5 leading-tight">{t[item.labelKey]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 md:px-10 mt-7">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[17px] font-bold text-ec-text">{t.navServices}</h2>
          <Link href="/services" className="text-xs font-semibold text-ec-teal hover:underline">
            {t.viewAllServices} &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {SERVICES.map((svc) => (
            <Link
              key={svc.key}
              href={svc.href}
              className="bg-ec-card rounded-2xl p-4 border border-ec-border hover:border-ec-teal/40 hover:shadow-md transition-all active:scale-[0.98] group"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${svc.color}`}>
                {svc.icon}
              </div>
              <h3 className="text-sm font-semibold text-ec-text group-hover:text-ec-teal transition-colors leading-tight">
                {t[svc.key]}
              </h3>
              <p className="text-[11px] text-ec-text-muted mt-1 leading-snug line-clamp-2">
                {t[svc.descKey]}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* IAQ Highlights */}
      <section className="px-4 md:px-10 mt-8">
        <h2 className="text-[17px] font-bold text-ec-text mb-1">{t.iaqTitle}</h2>
        <p className="text-xs text-ec-text-muted mb-4">Thailand&apos;s climate demands superior indoor air quality</p>
        <div className="flex flex-col md:flex-row gap-3">
          {IAQ_ITEMS.map((item) => (
            <div
              key={item.key}
              className="bg-ec-card rounded-2xl p-4 border border-ec-border flex gap-3 items-start"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color} ${item.iconColor}`}>
                {item.icon}
              </div>
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

      {/* Why Choose Us */}
      <section className="px-4 md:px-10 mt-8">
        <div className="bg-ec-navy rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-ec-teal/10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <h2 className="text-base font-bold mb-1 relative">Why EverCool Thailand?</h2>
          <p className="text-xs text-white/50 mb-4">A branch of Ever Cool HK, sister company of Tech Free. Est. 1998.</p>
          <div className="flex flex-col gap-3 relative">
            {[
              { title: "International Certifications", desc: "ISO 9001, EN1886, AHRI 1350, VDI 6022, and BS476 fire rated — meeting the highest global HVAC standards" },
              { title: "20+ Years in HVAC", desc: "Founded 1998 in Hong Kong and Macau, now serving all of Thailand from our Nonthaburi office" },
              { title: "Custom AHU Manufacturing", desc: "250,000+ sqft factory producing TECH FREE air handling units for hospitals, hotels, and commercial buildings" },
              { title: "Authorised Broan Distributor", desc: "Official Broan ventilation partner for Thailand — residential and commercial fresh air solutions" },
              { title: "VDI 6022 Certified Technicians", desc: "Our Thailand team holds VDI 6022 hygiene certification for air conditioning systems" },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-ec-teal/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-ec-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">{item.title}</p>
                  <p className="text-xs text-white/60 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Strip */}
      <section className="px-4 md:px-10 mt-5">
        <div className="bg-ec-card rounded-2xl border border-ec-border p-4">
          <p className="text-[10px] font-semibold text-ec-text-muted uppercase tracking-widest mb-3">Certifications &amp; Standards</p>
          <div className="flex flex-wrap gap-2">
            {["ISO 9001", "EN 1886", "AHRI 1350", "AHRI 410", "VDI 6022", "BS 476", "EN 13501"].map((cert) => (
              <span key={cert} className="px-2.5 py-1 rounded-lg bg-ec-teal/8 border border-ec-teal/20 text-ec-teal text-[11px] font-semibold">
                {cert}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-ec-text-muted mt-3">Danfoss Strategic Partner · Green Building Association Member</p>
        </div>
      </section>

      {/* TECH FREE Products Teaser */}
      <section className="px-4 md:px-10 mt-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-[17px] font-bold text-ec-text">TECH FREE Products</h2>
            <p className="text-xs text-ec-text-muted mt-0.5">Industrial AHU systems &amp; components</p>
          </div>
          <Link href="/products" className="text-xs font-semibold text-ec-teal hover:underline shrink-0">
            View All &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: "Air Handling Units",
              sub: "Modular, Integrated, Hygienic",
              href: "/products#ahu",
              icon: (
                <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              ),
              bg: "bg-sky-500/10",
            },
            {
              label: "Heat Recovery",
              sub: "Heat Pipe, Dual System",
              href: "/products#heat",
              icon: (
                <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              bg: "bg-violet-500/10",
            },
            {
              label: "Outdoor Units",
              sub: "Packaged, Dry Cooler",
              href: "/products#outdoor",
              icon: (
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              ),
              bg: "bg-emerald-500/10",
            },
            {
              label: "Components",
              sub: "Coils, EC Fan Coil",
              href: "/products#components",
              icon: (
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              bg: "bg-amber-500/10",
            },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="bg-ec-card rounded-2xl p-3.5 border border-ec-border hover:border-ec-teal/30 transition-all active:scale-[0.98] group"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 ${item.bg}`}>
                {item.icon}
              </div>
              <p className="text-xs font-bold text-ec-text group-hover:text-ec-teal transition-colors leading-tight">{item.label}</p>
              <p className="text-[10px] text-ec-text-muted mt-0.5 leading-snug">{item.sub}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Project References */}
      <ProjectReferences />

      {/* See Our Work */}
      <section className="px-4 md:px-10 mt-4">
        <Link
          href="/gallery"
          className="flex items-center justify-between bg-ec-card rounded-2xl border border-ec-border p-4 hover:border-ec-teal/30 transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ec-teal/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-ec-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-ec-text">{t.seeOurWork}</p>
              <p className="text-xs text-ec-text-muted mt-0.5">{t.gallerySubtitle}</p>
            </div>
          </div>
          <svg className="w-4 h-4 text-ec-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>

      {/* WhatsApp CTA */}
      <section className="px-4 md:px-10 mt-3 mb-8">
        <a
          href="https://wa.me/66955622892"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm rounded-2xl py-4 transition-all active:scale-[0.98]"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Chat on WhatsApp
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
