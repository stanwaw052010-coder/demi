"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/components/providers/AppProvider";

/** A champagne hairline along the top edge — the journey, measured. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const { onScroll } = useApp();

  useEffect(() => {
    return onScroll(({ scroll }) => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current && max > 0) {
        barRef.current.style.transform = `scaleX(${Math.min(1, scroll / max)})`;
      }
    });
  }, [onScroll]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[65] h-[2px]" aria-hidden>
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-champagne/70 shadow-[0_0_12px_rgba(216,191,154,0.6)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
