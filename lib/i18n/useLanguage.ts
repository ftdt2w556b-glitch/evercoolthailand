"use client";

import { useState, useEffect } from "react";
import { translations, Lang } from "./translations";

export function useLanguage() {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("ec_lang") as Lang | null;
    if (saved && (saved === "en" || saved === "th")) {
      setLangState(saved);
    }
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("ec_lang", l);
  }

  return { lang, t: translations[lang], setLang };
}
