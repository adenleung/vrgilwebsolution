"use client";
import { useEffect } from "react";
// Content is always visible, including before JS and when motion is disabled.
export function JourneyEnhancement() {
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add("reached");
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.45 },
    );
    document
      .querySelectorAll(".journey-step")
      .forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);
  return null;
}
