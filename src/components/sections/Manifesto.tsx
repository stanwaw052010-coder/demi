"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Pinned manifesto — the statement lights up word by word as the
 * user scrolls through it, held in place like a title card.
 */

// [text, style?] — "serif" renders italic serif gold, "lime" accents
const WORDS: Array<[string, ("serif" | "lime")?]> = [
  ["Tennis"], ["is"], ["not"], ["a"], ["sport."],
  ["It"], ["is"], ["a"], ["conversation", "serif"],
  ["held"], ["at"], ["two", "lime"], ["hundred", "lime"], ["kilometres", "lime"], ["an", "lime"], ["hour.", "lime"],
  ["We"], ["built"], ["a"], ["place"], ["where"],
  ["every"], ["surface,"], ["every"], ["shadow"], ["and"], ["every"], ["silence", "serif"],
  ["is"], ["tuned"], ["to"], ["one"], ["thing"], ["—"],
  ["the"], ["perfect", "serif"], ["strike.", "serif"],
];

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(".mfw");
      gsap.fromTo(
        words,
        { opacity: 0.1, filter: "blur(2px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=210%",
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
          },
        }
      );
      gsap.fromTo(
        ".mf-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=210%",
            scrub: 0.4,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="manifesto"
      className="relative flex h-[100svh] items-center overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 50%, rgba(11,43,27,0.35), transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <div className="mb-10 flex items-center gap-5">
          <span className="font-mono-label text-[var(--gold)]">01 — The Belief</span>
          <span className="mf-rule h-px flex-1 origin-left bg-[var(--line)]" />
        </div>
        <p className="display-md text-[clamp(1.9rem,4.6vw,4.4rem)] leading-[1.14] text-[var(--ivory)]">
          {WORDS.map(([w, style], i) => (
            <span key={i}>
              <span
                className={`mfw inline-block ${
                  style === "serif"
                    ? "font-serif-it normal-case text-[var(--gold-bright)]"
                    : style === "lime"
                    ? "text-[var(--lime)]"
                    : ""
                }`}
              >
                {w}
              </span>{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
