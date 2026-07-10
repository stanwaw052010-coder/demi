"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ScrollEvent {
  direction: number;
  scroll: number;
}

interface AppContextValue {
  /** Preloader has finished — the scene may begin. */
  ready: boolean;
  setReady: (v: boolean) => void;
  /** Subscribe to smooth-scroll frames; returns an unsubscribe. */
  onScroll: (cb: (e: ScrollEvent) => void) => () => void;
  scrollTo: (target: string) => void;
  stopScroll: () => void;
  startScroll: () => void;
}

const AppContext = createContext<AppContextValue>({
  ready: false,
  setReady: () => {},
  onScroll: () => () => {},
  scrollTo: () => {},
  stopScroll: () => {},
  startScroll: () => {},
});

export const useApp = () => useContext(AppContext);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const listeners = useRef(new Set<(e: ScrollEvent) => void>());

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = instance;
    // handy for debugging & driving the page from devtools/tests
    (window as unknown as { __lenis?: Lenis }).__lenis = instance;

    instance.on("scroll", (e: { direction: number; scroll: number }) => {
      ScrollTrigger.update();
      for (const cb of listeners.current)
        cb({ direction: e.direction, scroll: e.scroll });
    });
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // hold the page still until the preloader releases it
    instance.stop();

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (ready) {
      lenisRef.current?.start();
      // pins & measurements settle once real content is revealed
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [ready]);

  const onScroll = useCallback((cb: (e: ScrollEvent) => void) => {
    listeners.current.add(cb);
    return () => {
      listeners.current.delete(cb);
    };
  }, []);

  const scrollTo = useCallback((target: string) => {
    lenisRef.current?.scrollTo(target, {
      duration: 1.8,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
  }, []);

  const stopScroll = useCallback(() => lenisRef.current?.stop(), []);
  const startScroll = useCallback(() => lenisRef.current?.start(), []);

  return (
    <AppContext.Provider
      value={{ ready, setReady, onScroll, scrollTo, stopScroll, startScroll }}
    >
      {children}
    </AppContext.Provider>
  );
}
