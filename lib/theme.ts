"use client";

import { useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    const saved = localStorage.getItem("ec_theme") as Theme | null;
    if (saved) {
      setThemeState(saved);
      applyTheme(saved);
    }
  }, []);

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem("ec_theme", t);
    applyTheme(t);
  }

  function toggleTheme() {
    const current = document.documentElement.classList.contains("dark");
    setTheme(current ? "light" : "dark");
  }

  return { theme, setTheme, toggleTheme };
}

function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  const isDark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}
