"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsCoarse, useReducedMotion } from "@/lib/hooks";

/**
 * Custom cursor — a gold dot with a lagging ring that stretches with
 * velocity, expands over interactive targets and can show a label
 * (via [data-cursor="View"] on any element).
 */
export default function Cursor() {
  const coarse = useIsCoarse();
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (coarse || reduced) return;
    document.documentElement.classList.add("cursor-native-hidden");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...pos };
    const vel = { x: 0, y: 0 };
    let hoverEl: HTMLElement | null = null;
    let raf = 0;
    let idleScale = 1;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const t = (e.target as HTMLElement).closest<HTMLElement>(
        "a,button,[data-cursor],input,select,textarea,[data-magnetic]"
      );
      if (t !== hoverEl) {
        hoverEl = t;
        const text = t?.dataset.cursor ?? "";
        label.textContent = text;
        gsap.to(label, {
          opacity: text ? 1 : 0,
          scale: text ? 1 : 0.6,
          duration: 0.35,
        });
        idleScale = t ? (text ? 3.4 : 1.9) : 1;
        gsap.to(dot, { scale: t ? 0.4 : 1, duration: 0.35 });
      }
    };

    const onDown = () => gsap.to(ring, { scale: 0.85, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.45, ease: "elastic.out(1,0.4)" });

    const loop = () => {
      // dot: instant; ring: eased with velocity stretch
      vel.x = pos.x - ringPos.x;
      vel.y = pos.y - ringPos.y;
      ringPos.x += vel.x * 0.16;
      ringPos.y += vel.y * 0.16;

      const speed = Math.min(Math.hypot(vel.x, vel.y), 120);
      const stretch = 1 + speed * 0.0035;
      const angle = (Math.atan2(vel.y, vel.x) * 180) / Math.PI;

      dot.style.transform = `translate3d(${pos.x}px,${pos.y}px,0) translate(-50%,-50%) scale(${gsap.getProperty(dot, "scale")})`;
      ring.style.transform = `translate3d(${ringPos.x}px,${ringPos.y}px,0) translate(-50%,-50%) rotate(${angle}deg) scale(${stretch * idleScale}, ${(2 - stretch) * idleScale}) rotate(${-angle}deg)`;
      label.style.transform = `translate3d(${ringPos.x}px,${ringPos.y}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      document.documentElement.classList.remove("cursor-native-hidden");
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [coarse, reduced]);

  if (coarse || reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[400]">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-[rgba(194,161,94,0.65)] mix-blend-difference"
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-[5px] w-[5px] rounded-full bg-[var(--lime)]"
      />
      <div
        ref={labelRef}
        className="font-mono-label absolute left-0 top-0 flex items-center justify-center text-[9px] text-[var(--ivory)] opacity-0"
      />
    </div>
  );
}
