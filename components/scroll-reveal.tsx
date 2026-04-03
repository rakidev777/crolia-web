"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-scale"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    for (const el of targets) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return null;
}
