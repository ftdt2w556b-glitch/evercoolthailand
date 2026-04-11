"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import type { translations } from "@/lib/i18n/translations";

type TranslationKey = keyof typeof translations.en;

type Service = {
  id: number;
  slug: string;
  name_en: string;
  name_th: string;
  description_en: string;
  description_th: string;
  icon: string;
  category: string;
};

type FilterKey =
  | "all"
  | "installation"
  | "repair"
  | "maintenance"
  | "purification"
  | "custom"
  | "distribution";

const FILTERS: { key: FilterKey; labelKey: TranslationKey }[] = [
  { key: "all", labelKey: "servicesFilterAll" },
  { key: "installation", labelKey: "servicesFilterInstallation" },
  { key: "repair", labelKey: "servicesFilterRepair" },
  { key: "maintenance", labelKey: "servicesFilterMaintenance" },
  { key: "purification", labelKey: "servicesFilterPurification" },
  { key: "custom", labelKey: "servicesFilterCustom" },
  { key: "distribution", labelKey: "servicesFilterDistribution" },
];

const ICON_MAP: Record<string, React.ReactNode> = {
  snowflake: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.707.707m13.136 13.136.707.707M1 12h1m20 0h1M4.22 19.78l.707-.707M18.364 5.636l.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
    </svg>
  ),
  wrench: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
    </svg>
  ),
  shield: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  wind: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  cog: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  package: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  clipboard: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  default: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
};

const CATEGORY_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  installation: { bg: "bg-sky-500/10", text: "text-sky-600", label: "Installation" },
  repair: { bg: "bg-orange-500/10", text: "text-orange-600", label: "Repair" },
  maintenance: { bg: "bg-emerald-500/10", text: "text-emerald-700", label: "Maintenance" },
  purification: { bg: "bg-cyan-500/10", text: "text-cyan-600", label: "Purification" },
  custom: { bg: "bg-violet-500/10", text: "text-violet-600", label: "Custom" },
  consultation: { bg: "bg-amber-500/10", text: "text-amber-600", label: "Consultation" },
  distribution: { bg: "bg-slate-500/10", text: "text-slate-600", label: "Distribution" },
};

export default function ServicesGrid({ services }: { services: Service[] }) {
  const { t, lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered =
    activeFilter === "all"
      ? services
      : services.filter((s) => s.category === activeFilter);

  return (
    <div>
      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeFilter === f.key
                ? "bg-ec-teal text-white shadow-sm"
                : "bg-ec-card border border-ec-border text-ec-text-muted hover:border-ec-teal/40"
            }`}
          >
            {t[f.labelKey]}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="mt-4 flex flex-col gap-3">
        {filtered.map((svc) => {
          const isExpanded = expandedId === svc.id;
          const name = lang === "th" ? svc.name_th : svc.name_en;
          const description = lang === "th" ? svc.description_th : svc.description_en;
          const style = CATEGORY_STYLE[svc.category] ?? CATEGORY_STYLE.custom;

          return (
            <div
              key={svc.id}
              className="bg-ec-card rounded-2xl border border-ec-border overflow-hidden transition-all"
            >
              {/* Card Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : svc.id)}
                className="w-full flex items-center gap-3.5 p-4 text-left"
              >
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${style.bg} ${style.text}`}>
                  {ICON_MAP[svc.icon] ?? ICON_MAP.default}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-ec-text leading-tight">
                      {name}
                    </h3>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${style.bg} ${style.text} shrink-0`}>
                      {style.label}
                    </span>
                  </div>
                  {!isExpanded && (
                    <p className="text-xs text-ec-text-muted line-clamp-1">
                      {description}
                    </p>
                  )}
                </div>
                <svg
                  className={`w-4 h-4 text-ec-text-muted shrink-0 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-ec-border/50 pt-3">
                  <p className="text-sm text-ec-text-muted leading-relaxed mb-4">
                    {description}
                  </p>
                  <Link
                    href={`/quote?service=${svc.slug}`}
                    className="block w-full text-center bg-ec-teal hover:bg-ec-teal-light text-white font-semibold text-sm rounded-xl py-3 transition-all active:scale-[0.98]"
                  >
                    {t.requestService}
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
