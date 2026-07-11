"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Number that counts up with a long expo tail — feels like momentum
 * bleeding off, not a linear ticker.
 */
export default function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2.4,
  className = "",
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const state = { v: 0 };
      gsap.to(state, {
        v: to,
        duration,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
        onUpdate() {
          el.textContent = `${prefix}${state.v.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}${suffix}`;
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}0{suffix}
    </span>
  );
}
