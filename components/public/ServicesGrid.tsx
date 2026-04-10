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
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-4 -mx-4">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeFilter === f.key
                ? "bg-ec-teal text-white shadow-sm"
                : "bg-ec-card border border-ec-border text-ec-text-muted hover:border-ec-teal/30"
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

          return (
            <div
              key={svc.id}
              className="bg-ec-card rounded-2xl border border-ec-border overflow-hidden transition-all"
            >
              {/* Card Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : svc.id)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <span className="text-2xl shrink-0">{svc.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-ec-text leading-tight">
                    {name}
                  </h3>
                  {!isExpanded && (
                    <p className="text-xs text-ec-text-muted mt-0.5 line-clamp-1">
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
                    className="block w-full text-center bg-ec-teal hover:bg-ec-teal-light text-white font-semibold text-sm rounded-xl py-2.5 transition-all active:scale-[0.98]"
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
