"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/** `useLayoutEffect` that stays quiet during SSR. */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Tracks `prefers-reduced-motion`. Returns `null` until measured. */
export function useReducedMotion(): boolean | null {
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

/** True for precise pointers only — gates the custom cursor and hover art. */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return fine;
}

/** Generic media-query hook. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);

  return matches;
}

/**
 * Frame-rate independent value smoothing. Returns a ref holding the eased
 * value plus a setter for the target — used by the cursor and magnetics.
 */
export function useLerpedValue(initial = 0, factor = 0.12) {
  const target = useRef(initial);
  const current = useRef(initial);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      current.current += (target.current - current.current) * factor;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [factor]);

  return { target, current };
}
