"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";

const WORDS = ["la lumière", "le rituel", "l’éclat"];

/**
 * Cinematic opening titles: a breathing champagne halo, three
 * whispered words, a counter set in serif — then the curtain lifts.
 */
export function Preloader() {
  const { setReady } = useApp();
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const brandRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const progress = { v: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setGone(true),
      });

      // breathing halo, runs underneath everything
      gsap.to(haloRef.current, {
        scale: 1.35,
        opacity: 0.8,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      tl.fromTo(
        brandRef.current,
        { opacity: 0, letterSpacing: "0.9em" },
        { opacity: 1, letterSpacing: "0.34em", duration: 1.4, ease: "power2.out" },
        0.1,
      );

      // counter + progress hairline
      tl.to(
        progress,
        {
          v: 100,
          duration: 2.6,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current)
              counterRef.current.textContent = String(Math.round(progress.v)).padStart(3, "0");
            if (barRef.current)
              barRef.current.style.transform = `scaleX(${progress.v / 100})`;
          },
        },
        0.2,
      );

      // whispered words, one after another
      WORDS.forEach((_, i) => {
        const el = wordRefs.current[i];
        if (!el) return;
        tl.fromTo(
          el,
          { opacity: 0, yPercent: 60, filter: "blur(10px)" },
          { opacity: 1, yPercent: 0, filter: "blur(0px)", duration: 0.55, ease: "power2.out" },
          0.25 + i * 0.85,
        ).to(
          el,
          { opacity: 0, yPercent: -60, filter: "blur(10px)", duration: 0.45, ease: "power2.in" },
          0.25 + i * 0.85 + 0.62,
        );
      });

      // exit — everything sinks, curtain lifts, scene begins beneath it
      tl.to([counterRef.current, brandRef.current], {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: "power2.in",
      }, 2.9);
      tl.to("[data-pre-bar]", { opacity: 0, duration: 0.4 }, 2.95);
      tl.to(haloRef.current, { scale: 3.2, opacity: 0, duration: 0.9, ease: "power2.in" }, 2.95);
      tl.add(() => setReady(true), 3.05);
      tl.to(root, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.05,
        ease: "power4.inOut",
      }, 3.15);
    }, root);

    return () => ctx.revert();
  }, [setReady]);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-ink text-ivory"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden
    >
      {/* morphing halo */}
      <div
        ref={haloRef}
        className="absolute h-[46vmin] w-[46vmin] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(216,191,154,0.22) 0%, rgba(216,191,154,0.06) 45%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <p
        ref={brandRef}
        className="absolute top-10 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.34em] uppercase opacity-0"
      >
        Lumea · Beauty Atelier
      </p>

      {/* whispered words */}
      <div className="relative h-[1.4em] w-full text-center">
        {WORDS.map((w, i) => (
          <span
            key={w}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            className="font-serif-display absolute inset-x-0 text-[clamp(2.6rem,7vw,6rem)] italic opacity-0"
          >
            {w}
          </span>
        ))}
      </div>

      {/* serif counter */}
      <span
        ref={counterRef}
        className="font-serif-display absolute right-[5vw] bottom-[4vh] text-[clamp(5rem,16vw,15rem)] leading-none text-ivory/90"
      >
        000
      </span>

      {/* progress hairline */}
      <div data-pre-bar className="absolute bottom-0 left-0 h-px w-full bg-ivory/10">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-champagne shadow-[0_0_18px_rgba(216,191,154,0.8)]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
