"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, useGSAP } from "@/lib/gsap";
import { TextReveal, FadeUp } from "@/components/fx/Reveal";

const RacketScene = dynamic(() => import("@/components/three/RacketScene"), {
  ssr: false,
});

const SPECS = [
  ["Frame", "Aerospace graphite, hand-laid"],
  ["Weight", "305 g unstrung"],
  ["Balance", "315 mm — head light"],
  ["String bed", "16 × 19, natural gut"],
  ["Tension", "23.5 kg, tuned per member"],
  ["Finish", "Matte graphite, champagne inlay"],
] as const;

export default function Instrument() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".spec-row",
        { opacity: 0, x: -32 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.09,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".spec-list", start: "top 78%" },
        }
      );
      // the whole scene drifts slightly against scroll — depth
      gsap.fromTo(
        ".racket-stage",
        { y: 70 },
        {
          y: -70,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="instrument"
      className="relative overflow-hidden border-y border-[var(--line-soft)] bg-[#080c09] py-28 md:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 65% at 72% 50%, rgba(14,58,38,0.4), transparent 70%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1720px] items-center gap-14 px-6 md:px-10 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <FadeUp>
            <span className="font-mono-label mb-5 block text-[var(--gold)]">
              04 — The Instrument
            </span>
          </FadeUp>
          <TextReveal
            as="h2"
            mode="words"
            className="display-lg max-w-[12ch] text-[clamp(2.6rem,4.6vw,4.9rem)]"
          >
            Built like a{" "}
            <span className="font-serif-it normal-case text-[var(--gold-bright)]">watch,</span>{" "}
            swung like a{" "}
            <span className="font-serif-it normal-case text-[var(--gold-bright)]">hammer</span>
          </TextReveal>

          <FadeUp delay={0.25} className="mt-8 max-w-[44ch]">
            <p className="text-[0.95rem] leading-[1.85] text-[var(--ivory-60)]">
              Every member is fitted for their frame in our workshop — weighed,
              balanced and strung by hand. Take it for a spin.
            </p>
          </FadeUp>

          <div className="spec-list mt-10 border-t border-[var(--line-soft)]">
            {SPECS.map(([k, v]) => (
              <div
                key={k}
                className="spec-row group flex items-baseline justify-between gap-6 border-b border-[var(--line-soft)] py-4 transition-colors duration-500 hover:border-[rgba(194,161,94,0.4)]"
              >
                <span className="font-mono-label text-[var(--ivory-38)] transition-colors duration-500 group-hover:text-[var(--gold)]">
                  {k}
                </span>
                <span className="text-right text-[0.9rem] text-[var(--ivory)]">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="racket-stage relative h-[64vh] min-h-[420px] lg:h-[76vh]">
          <RacketScene />
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
            <span className="font-mono-label text-[var(--ivory-38)]">
              Drag to spin — it keeps the momentum
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
