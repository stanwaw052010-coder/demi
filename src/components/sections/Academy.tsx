"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { TextReveal, FadeUp } from "@/components/fx/Reveal";

/**
 * The academy — a single line drawn down the page. The ball travels
 * it as you scroll: from the first bounce to the professional tour.
 */

const STAGES = [
  {
    tag: "AGE 5 — 8",
    title: "The First Bounce",
    body: "Foam balls, short courts, long laughter. We teach the love before we teach the grip.",
    metric: ["Sessions / week", "2"],
  },
  {
    tag: "AGE 9 — 13",
    title: "The Junior",
    body: "Footwork patterns, first serves, first nerves. The rituals of a player begin to form.",
    metric: ["Sessions / week", "4"],
  },
  {
    tag: "AGE 14 — 17",
    title: "The Tournament Years",
    body: "National draws, travel, wins and losses that matter. Character is built between matches, not during them.",
    metric: ["Tournaments / year", "18"],
  },
  {
    tag: "AGE 18 — 21",
    title: "The Champion",
    body: "ITF points, sponsorship, a team around one athlete. The academy narrows to a single sharpened purpose.",
    metric: ["Staff per athlete", "5"],
  },
  {
    tag: "THE TOUR",
    title: "The Professional",
    body: "Twenty-three ELEVATE juniors have reached the professional tour. Their names hang in the clubhouse hall — with room deliberately left for more.",
    metric: ["Pros produced", "23"],
  },
] as const;

export default function Academy() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // spine grows with scroll
      gsap.fromTo(
        ".acad-spine-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".acad-flow",
            start: "top 62%",
            end: "bottom 62%",
            scrub: 0.4,
          },
        }
      );
      // the ball rides the spine
      gsap.fromTo(
        ".acad-ball",
        { top: "0%" },
        {
          top: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ".acad-flow",
            start: "top 62%",
            end: "bottom 62%",
            scrub: 0.4,
          },
        }
      );
      // stages surface as the ball passes
      gsap.utils.toArray<HTMLElement>(".acad-stage").forEach((stage) => {
        gsap.fromTo(
          stage.querySelectorAll(".acad-in"),
          { y: 54, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: stage, start: "top 72%" },
          }
        );
        gsap.fromTo(
          stage.querySelector(".acad-node"),
          { scale: 0 },
          {
            scale: 1,
            duration: 0.7,
            ease: "back.out(3)",
            scrollTrigger: { trigger: stage, start: "top 62%" },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="academy"
      className="relative border-t border-[var(--line-soft)] bg-[#070b08] py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="mb-20 text-center md:mb-28">
          <FadeUp>
            <span className="font-mono-label mb-5 block text-[var(--gold)]">
              06 — The Academy
            </span>
          </FadeUp>
          <TextReveal as="h2" className="display-lg justify-center text-center text-[clamp(3rem,7.5vw,7rem)]">
            Every pro was
          </TextReveal>
          <TextReveal
            as="h2"
            className="display-lg justify-center text-center text-[clamp(3rem,7.5vw,7rem)]"
            delay={0.12}
          >
            once{" "}
            <span className="font-serif-it normal-case text-[var(--gold-bright)]">five years old</span>
          </TextReveal>
        </div>

        <div className="acad-flow relative">
          {/* spine */}
          <div className="absolute left-4 top-0 h-full w-px bg-[var(--line-soft)] md:left-1/2">
            <div className="acad-spine-fill h-full w-px origin-top bg-gradient-to-b from-[var(--gold)] via-[var(--gold)] to-[var(--lime)]" />
          </div>
          {/* travelling ball */}
          <div
            className="acad-ball absolute left-4 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
            style={{ top: "0%" }}
            aria-hidden
          >
            <div
              className="h-4 w-4 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 32% 30%, #eaff70, #cfe93f 50%, #93ad20)",
                boxShadow: "0 0 22px rgba(217,247,79,0.65)",
              }}
            />
          </div>

          <div className="flex flex-col gap-24 md:gap-36">
            {STAGES.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={s.title}
                  className={`acad-stage relative grid items-center gap-6 pl-12 md:grid-cols-2 md:gap-0 md:pl-0`}
                >
                  {/* node on the spine */}
                  <div className="acad-node absolute left-4 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-[var(--gold)] bg-[var(--bg)] md:left-1/2 md:top-1/2 md:-translate-y-1/2" />

                  <div
                    className={`${
                      left ? "md:pr-20 md:text-right" : "md:order-2 md:pl-20"
                    }`}
                  >
                    <span className="acad-in font-mono-label block text-[var(--lime)]">
                      {s.tag}
                    </span>
                    <h3 className="acad-in display-md mt-3 text-[clamp(1.8rem,3.4vw,2.9rem)]">
                      {s.title}
                    </h3>
                    <p className="acad-in mt-4 max-w-[44ch] text-[0.92rem] leading-[1.85] text-[var(--ivory-60)] md:ml-auto">
                      {s.body}
                    </p>
                  </div>

                  <div className={`${left ? "md:order-2 md:pl-20" : "md:pr-20 md:text-right"}`}>
                    <div className="acad-in inline-block rounded-2xl border border-[var(--line-soft)] px-7 py-5 glass">
                      <span className="font-mono-label text-[var(--ivory-38)]">
                        {s.metric[0]}
                      </span>
                      <div className="display-lg mt-1 text-5xl text-[var(--gold-bright)]">
                        {s.metric[1]}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
