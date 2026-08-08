"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useFinePointer, useReducedMotion } from "@/lib/studio/hooks";

type Props = {
  children: ReactNode;
  className?: string;
  /** How far the element may travel, as a fraction of the pointer offset. */
  strength?: number;
  /** Inner element travels further, for a subtle parallax inside the button. */
  innerStrength?: number;
  radius?: number;
};

/**
 * Magnetism with lerped physics. The wrapper drifts toward the pointer while
 * it is inside `radius`, and eases home when it leaves. Disabled for coarse
 * pointers and reduced motion.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.32,
  innerStrength = 0.14,
  radius = 120,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!fine || reduced !== false) return;
    const el = root.current;
    if (!el) return;
    const inner = el.firstElementChild as HTMLElement | null;

    const target = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    let frame = 0;
    let active = false;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const distance = Math.hypot(dx, dy);
      const reach = Math.max(rect.width, rect.height) / 2 + radius;

      if (distance < reach) {
        active = true;
        target.x = dx * strength;
        target.y = dy * strength;
      } else if (active) {
        active = false;
        target.x = 0;
        target.y = 0;
      }
    };

    const tick = () => {
      eased.x += (target.x - eased.x) * 0.13;
      eased.y += (target.y - eased.y) * 0.13;
      el.style.transform = `translate3d(${eased.x.toFixed(2)}px, ${eased.y.toFixed(
        2
      )}px, 0)`;
      if (inner) {
        inner.style.transform = `translate3d(${(eased.x * innerStrength * 3).toFixed(
          2
        )}px, ${(eased.y * innerStrength * 3).toFixed(2)}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      el.style.transform = "";
      if (inner) inner.style.transform = "";
    };
  }, [fine, reduced, strength, innerStrength, radius]);

  return (
    <div ref={root} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
