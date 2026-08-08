"use client";

import type Lenis from "lenis";

/**
 * A single Lenis instance is shared for the whole route. Overlays (preloader,
 * fullscreen menu) lock scrolling through here so the smooth-scroll runtime
 * and the native fallback stay in sync.
 */

let instance: Lenis | null = null;
let locks = 0;

export function registerLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

export function lockScroll() {
  locks += 1;
  if (locks > 1) return;
  instance?.stop();
  document.documentElement.style.setProperty("overflow", "hidden");
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  instance?.start();
  document.documentElement.style.removeProperty("overflow");
}

/** Smooth-scrolls to a section, falling back to native behaviour. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el, { offset: 0, duration: 1.5 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
