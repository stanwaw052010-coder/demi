"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { splitText } from "@/lib/split";

/**
 * Scroll-triggered text reveal. `chars` rise from below a mask with a
 * rotational settle; `words` fade-slide with stagger.
 */
export function TextReveal({
  children,
  as: Tag = "div",
  mode = "chars",
  className = "",
  delay = 0,
  stagger,
  start = "top 85%",
  once = true,
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  mode?: "chars" | "words";
  className?: string;
  delay?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = splitText(el, mode);
      gsap.set(el, { autoAlpha: 1 });
      gsap.from(targets, {
        yPercent: 118,
        rotate: mode === "chars" ? 6 : 0,
        opacity: mode === "words" ? 0 : 1,
        duration: 1.15,
        ease: "expo.out",
        delay,
        stagger: stagger ?? (mode === "chars" ? 0.024 : 0.05),
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
    },
    { scope: ref }
  );

  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`invisible overflow-hidden ${className}`}
      style={{ clipPath: "inset(-20% -5% -12% -5%)" }}
    >
      {children}
    </Comp>
  );
}

/**
 * Simple fade-up for blocks of UI.
 */
export function FadeUp({
  children,
  className = "",
  delay = 0,
  y = 44,
  start = "top 88%",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.3,
          ease: "expo.out",
          delay,
          scrollTrigger: { trigger: ref.current, start },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`invisible ${className}`}>
      {children}
    </div>
  );
}
