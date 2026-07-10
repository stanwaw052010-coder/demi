"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { useFinePointer } from "@/lib/hooks";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/** Element is gently pulled towards the cursor, then springs home. */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !fine) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.35)" });
  };

  return (
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}
