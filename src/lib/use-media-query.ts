"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * A media query as an external store, which is what it is. Using
 * useSyncExternalStore instead of useEffect plus setState avoids the cascading
 * render that reading a matchMedia in an effect body causes, and gives the
 * right answer on the very first client render.
 *
 * Returns `false` during server rendering, so components must be written so
 * that the server output is the safe variant: content visible, motion off.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
