"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useSectionTheme } from "@/lib/hooks";
import { SplitReveal } from "@/components/ui/Split";
import { STATS } from "@/data/content";

/** Large serif numerals that count themselves in, haloed in champagne. */
export function Stats() {
  const rootRef = useRef<HTMLElement>(null);
  useSectionTheme(rootRef, "dark");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-count]", root).forEach((el, i) => {
        const value = parseInt(el.dataset.count ?? "0", 10);
        const state = { v: 0 };
        gsap.to(state, {
          v: value,
          duration: 2.2,
          ease: "power3.inOut",
          delay: i * 0.12,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(state.v));
          },
        });

        // each figure floats at its own pace
        gsap.fromTo(
          el.closest("[data-stat]"),
          { y: 30 + i * 22 },
          {
            y: -(30 + i * 22),
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden px-6 py-36 md:px-10 md:py-52">
      {/* deep-field glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[70vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse, rgba(216,191,154,0.10) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />

      <div className="hairline-t mb-24 flex items-baseline justify-between pt-6">
        <span className="label-mono">05 — In numbers</span>
        <span className="label-mono hidden md:block">counted, never rounded up</span>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-20 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <div key={stat.label} data-stat className={i % 2 === 1 ? "lg:translate-y-16" : ""}>
            <p
              className="font-serif-display text-[clamp(4rem,9vw,8.5rem)] leading-none"
              style={{ textShadow: "0 0 60px rgba(216,191,154,0.35)" }}
            >
              <span data-count={stat.value}>0</span>
              <em className="text-champagne">{stat.suffix}</em>
            </p>
            <p className="label-mono mt-5 max-w-[18ch]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-32 flex justify-end">
        <SplitReveal
          as="p"
          className="font-serif-display block max-w-xl text-right text-[clamp(1.4rem,2.4vw,2.2rem)] leading-snug italic opacity-80"
        >
          Numbers we recite quietly, and only when asked.
        </SplitReveal>
      </div>
    </section>
  );
}
