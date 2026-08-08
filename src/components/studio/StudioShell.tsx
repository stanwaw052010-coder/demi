"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/studio/gsap";
import { useReducedMotion } from "@/lib/studio/hooks";
import { registerLenis } from "@/lib/studio/scroll";
import { IntroProvider } from "@/lib/studio/intro";
import Cursor from "./Cursor";
import Preloader from "./Preloader";

/**
 * Route runtime: smooth scrolling, the scroll-driven animation clock, the
 * custom pointer, film grain and the opening sequence.
 *
 * Lenis drives ScrollTrigger from GSAP's ticker so there is exactly one rAF
 * loop on the page and scroll-linked animation never runs a frame behind.
 */
export default function StudioShell({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced !== false) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
    });

    registerLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      registerLenis(null);
      lenis.destroy();
    };
  }, [reduced]);

  /* Late-loading webfonts change measured heights; re-measure once settled. */
  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <IntroProvider>
      <Preloader />
      <Cursor />
      <div className="studio-grain" aria-hidden />
      {children}
    </IntroProvider>
  );
}
