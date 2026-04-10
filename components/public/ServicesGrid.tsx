"use client";

import { useState } from "react";
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
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-xl ${style.bg}`}>
                  {svc.icon}
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
