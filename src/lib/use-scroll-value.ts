"use client";

import * as React from "react";

/**
 * A single rAF-throttled scroll subscription. Used instead of an animation
 * library above the fold so the hero and header cost almost no main-thread
 * time while the page is still loading.
 */
export function useScrollHandler(handler: (scrollY: number) => void) {
  const saved = React.useRef(handler);

  React.useEffect(() => {
    saved.current = handler;
  }, [handler]);

  React.useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        saved.current(window.scrollY);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}
