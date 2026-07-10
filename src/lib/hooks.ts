"use client";

import { type RefObject, useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Crossfades the whole page between dark & ivory while the
 * given section occupies the middle of the viewport.
 */
export function useSectionTheme(
  ref: RefObject<HTMLElement | null>,
  theme: "dark" | "light",
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 55%",
      end: "bottom 45%",
      onToggle: (self) => {
        if (self.isActive) document.body.dataset.theme = theme;
      },
    });
    return () => st.kill();
  }, [ref, theme]);
}

/** True on devices with a fine pointer (mouse/trackpad). */
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

/** True when the user prefers reduced motion. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
