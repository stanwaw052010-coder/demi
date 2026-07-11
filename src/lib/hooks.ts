"use client";

import { useCallback, useSyncExternalStore } from "react";

export function useMedia(query: string, initial = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query]
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => initial
  );
}

export const useIsCoarse = () => useMedia("(pointer: coarse)");
export const useReducedMotion = () =>
  useMedia("(prefers-reduced-motion: reduce)");
