"use client";

import { useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Magnetic wrapper — the child is pulled toward the cursor with a
 * spring, and snaps back elastically on leave. Pointer-fine only.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      const el = ref.current;
      if (!el || e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    [strength]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 1.05,
      ease: "elastic.out(1, 0.32)",
      overwrite: "auto",
    });
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
