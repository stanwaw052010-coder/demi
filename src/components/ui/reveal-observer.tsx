"use client";

import * as React from "react";

/**
 * Mounted once per page: watches every `[data-reveal]` element and flips it to
 * its shown state. One observer, one client boundary — the reveals themselves
 * stay server-rendered markup.
 */
export function RevealObserver() {
  React.useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!nodes.length) return;

    const show = (node: HTMLElement) => {
      node.dataset.shown = "true";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "-8% 0px -6% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}
