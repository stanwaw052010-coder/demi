"use client";

import * as React from "react";

/**
 * Mounted once per page: watches every `[data-reveal]` element and flips it to
 * its shown state. One observer, one client boundary — the reveals themselves
 * stay server-rendered markup.
 */
export function RevealObserver() {
  React.useEffect(() => {
    const show = (node: HTMLElement) => {
      node.dataset.shown = "true";
    };

    const find = (root: ParentNode) =>
      Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      find(document).forEach(show);
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

    const watch = (node: HTMLElement) => {
      if (node.dataset.shown) return;
      observer.observe(node);
    };

    find(document).forEach(watch);

    /* Sections that swap content — the before/after case switcher, for one —
       mount reveals long after this ran, so keep watching for new ones. */
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const added of record.addedNodes) {
          if (!(added instanceof HTMLElement)) continue;
          if (added.hasAttribute("data-reveal")) watch(added);
          find(added).forEach(watch);
        }
      }
    });

    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
