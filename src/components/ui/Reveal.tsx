"use client";

import { useEffect, useRef, type ReactNode } from "react";
import clsx from "clsx";
import { gsap } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** ScrollTrigger start, default "top 82%" */
  start?: string;
}

/**
 * A photograph unveils itself: the frame wipes open from the bottom
 * while the image settles out of a slight zoom. Runs once.
 */
export function Reveal({ children, className, start = "top 82%" }: RevealProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: frame, start, once: true },
      defaults: { duration: 1.5, ease: "power4.out" },
    });
    tl.fromTo(
      frame,
      { clipPath: "inset(86% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)" },
      0,
    ).fromTo(inner, { scale: 1.18, yPercent: 6 }, { scale: 1, yPercent: 0 }, 0);
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [start]);

  return (
    <div ref={frameRef} className={clsx("will-change-[clip-path]", className)}>
      <div ref={innerRef} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
