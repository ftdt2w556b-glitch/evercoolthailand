"use client";
import { useEffect } from "react";

export default function GrayscaleOnScroll() {
  useEffect(() => {
    // Only activate on touch/mobile where hover doesn't work
    if (!window.matchMedia("(hover: none)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("grayscale");
            entry.target.classList.add("grayscale-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4, rootMargin: "0px 0px -50% 0px" }
    );

    document.querySelectorAll(".grayscale").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
