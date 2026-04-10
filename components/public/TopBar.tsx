"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useTheme } from "@/lib/theme";
import LanguageSwitcher from "./LanguageSwitcher";

export default function TopBar() {
  const { lang, t, setLang } = useLanguage();
  const { toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-ec-navy/95 backdrop-blur-sm text-white">
      <div className="flex items-center justify-between px-4 py-2.5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-ec-teal flex items-center justify-center text-white font-bold text-xs">
            EC
          </div>
          <span className="font-semibold text-sm tracking-wide">Evercool</span>
        </Link>

        <div className="flex items-center gap-1">
          <a
            href="tel:+66955622892"
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs hover:bg-white/10 transition-colors"
            aria-label={t.callUs}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="hidden sm:inline">095-562-2892</span>
          </a>

          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            <svg className="w-4 h-4 dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <svg className="w-4 h-4 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>

          <LanguageSwitcher current={lang} onChange={setLang} />
        </div>
      </div>
    </header>
  );
}
