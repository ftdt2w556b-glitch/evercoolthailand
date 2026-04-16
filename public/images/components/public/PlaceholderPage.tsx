"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";

export default function PlaceholderPage({ title }: { title: string }) {
  const { t } = useLanguage();
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center page-enter">
      <div className="w-16 h-16 rounded-2xl bg-ec-teal/10 flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-ec-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <h1 className="text-xl font-bold text-ec-text mb-2">{title}</h1>
      <p className="text-ec-text-muted text-sm">{t.comingSoon}</p>
    </main>
  );
}
