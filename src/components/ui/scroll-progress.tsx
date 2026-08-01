"use client";

import * as React from "react";
import { useScrollHandler } from "@/lib/use-scroll-value";

/** Hairline reading progress at the very top of the page. */
export function ScrollProgress() {
  const ref = React.useRef<HTMLDivElement>(null);

  useScrollHandler((y) => {
    const bar = ref.current;
    if (!bar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(y / max, 1) : 0;
    bar.style.transform = `scaleX(${progress})`;
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-px bg-transparent"
    >
      <div
        ref={ref}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-clay via-sand to-ink/70 will-change-transform"
      />
    </div>
  );
}
