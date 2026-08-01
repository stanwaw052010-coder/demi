"use client";

import * as React from "react";

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts up the first time it enters the viewport. React renders the final
 * value, so the number is right before hydration, without JS and after any
 * re-render — the animation only ever writes over it on its way up from zero.
 */
export function Counter({
  value,
  suffix = "",
  duration = 1800,
  className,
  suffixClassName,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
  suffixClassName?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    node.textContent = "0";

    let frame = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      node.textContent = `${Math.round(easeOutExpo(progress) * value)}`;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span className={className}>
      <span ref={ref}>{value}</span>
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </span>
  );
}
