"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * The story — four chapters travelling horizontally while the section
 * is pinned. Each chapter carries a generative line-drawing scene
 * that draws itself as it approaches, like scenes in a film.
 */

const CHAPTERS = [
  {
    n: "01",
    year: "1962",
    title: "The First Serve",
    sub: "Where it began",
    body: "A meadow south of the river. One grass court, rolled by hand. The founders believed a club should be measured not by its gates, but by the quality of its silence at match point.",
    art: "serve",
  },
  {
    n: "02",
    year: "1974",
    title: "The Rally",
    sub: "The exchange of a lifetime",
    body: "Forty-one strokes. The longest rally in club history decided our philosophy forever: the point is never over. Persistence became the house style — in tennis, and in everything.",
    art: "rally",
  },
  {
    n: "03",
    year: "1991",
    title: "The Trophy Room",
    sub: "Silver, oak and quiet pride",
    body: "Members have lifted 214 titles on four continents. The trophy room stays dimly lit on purpose — glory here is remembered in a whisper, never a shout.",
    art: "trophy",
  },
  {
    n: "04",
    year: "NOW",
    title: "The Legacy",
    sub: "Above the game",
    body: "Twelve courts. Three surfaces. One standard. ELEVATE is no longer a place — it is a level. The next chapter is written by whoever dares to swing first.",
    art: "rings",
  },
] as const;

function Art({ kind }: { kind: (typeof CHAPTERS)[number]["art"] }) {
  const stroke = "rgba(237,232,219,0.5)";
  const gold = "rgba(194,161,94,0.9)";
  const lime = "rgba(217,247,79,0.85)";
  switch (kind) {
    case "serve":
      return (
        <svg viewBox="0 0 400 300" fill="none" className="h-full w-full">
          <path className="ch-draw" d="M20 270 H380" stroke={stroke} strokeWidth="1" />
          <path className="ch-draw" d="M60 270 V240 M340 270 V240" stroke={stroke} strokeWidth="1" />
          <path className="ch-draw" d="M40 260 C 120 40, 280 40, 372 210" stroke={gold} strokeWidth="1.5" strokeDasharray="1 7" strokeLinecap="round" />
          <circle className="ch-ball" cx="372" cy="210" r="7" fill={lime} />
          <path className="ch-draw" d="M200 270 V252" stroke={gold} strokeWidth="1" />
        </svg>
      );
    case "rally":
      return (
        <svg viewBox="0 0 400 300" fill="none" className="h-full w-full">
          <path className="ch-draw" d="M200 30 V270" stroke={stroke} strokeWidth="1" strokeDasharray="4 6" />
          <path
            className="ch-draw"
            d="M30 250 L120 70 L200 220 L285 60 L370 240"
            stroke={gold}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {[
            [30, 250], [120, 70], [200, 220], [285, 60], [370, 240],
          ].map(([x, y], i) => (
            <circle key={i} className="ch-ball" cx={x} cy={y} r="5" fill={i === 4 ? lime : "rgba(237,232,219,0.7)"} />
          ))}
        </svg>
      );
    case "trophy":
      return (
        <svg viewBox="0 0 400 300" fill="none" className="h-full w-full">
          <path
            className="ch-draw"
            d="M150 60 H250 V120 C250 165 222 190 200 190 C178 190 150 165 150 120 Z"
            stroke={gold}
            strokeWidth="1.5"
          />
          <path className="ch-draw" d="M150 75 C110 75 105 130 155 138 M250 75 C290 75 295 130 245 138" stroke={gold} strokeWidth="1.5" />
          <path className="ch-draw" d="M200 190 V225 M170 240 H230 M160 255 H240" stroke={gold} strokeWidth="1.5" />
          <path className="ch-draw" d="M175 95 L182 112 L200 114 L187 126 L191 144 L175 135 L159 144 L163 126 L150 114 L168 112 Z" stroke={stroke} strokeWidth="1" />
        </svg>
      );
    case "rings":
      return (
        <svg viewBox="0 0 400 300" fill="none" className="h-full w-full">
          {[110, 85, 60, 35].map((r, i) => (
            <circle key={r} className="ch-draw" cx="200" cy="150" r={r} stroke={i === 3 ? lime : i === 1 ? gold : stroke} strokeWidth="1.2" />
          ))}
          <path className="ch-draw" d="M200 40 V0 M200 260 V300 M90 150 H40 M310 150 H360" stroke={stroke} strokeWidth="1" />
        </svg>
      );
  }
}

export default function Story() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(".ch-panel");
        const getX = () =>
          -(track.current!.scrollWidth - window.innerWidth);

        const tween = gsap.to(track.current, {
          x: getX,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${track.current!.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 0.55,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate(self) {
              gsap.set(".story-progress", { scaleX: self.progress });
            },
          },
        });

        panels.forEach((panel) => {
          const paths = panel.querySelectorAll<SVGPathElement>(".ch-draw");
          paths.forEach((p) => {
            const len = p.getTotalLength();
            gsap.fromTo(
              p,
              { strokeDasharray: p.getAttribute("stroke-dasharray") ?? len, strokeDashoffset: len },
              {
                strokeDashoffset: 0,
                duration: 1.6,
                ease: "power2.inOut",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: tween,
                  start: "left 70%",
                },
              }
            );
          });
          gsap.fromTo(
            panel.querySelectorAll(".ch-ball"),
            { scale: 0, transformOrigin: "center" },
            {
              scale: 1,
              stagger: 0.14,
              duration: 0.7,
              ease: "back.out(2.4)",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left 60%",
              },
            }
          );
          // parallax inside each panel
          gsap.fromTo(
            panel.querySelector(".ch-year"),
            { xPercent: 14 },
            {
              xPercent: -14,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      });

      // mobile: chapters stack vertically, still draw in
      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<SVGPathElement>(".ch-draw").forEach((p) => {
          const len = p.getTotalLength();
          gsap.fromTo(
            p,
            { strokeDasharray: p.getAttribute("stroke-dasharray") ?? len, strokeDashoffset: len },
            {
              strokeDashoffset: 0,
              duration: 1.6,
              ease: "power2.inOut",
              scrollTrigger: { trigger: p, start: "top 80%" },
            }
          );
        });
        gsap.utils.toArray<HTMLElement>(".ch-ball").forEach((b) => {
          gsap.fromTo(
            b,
            { scale: 0, transformOrigin: "center" },
            {
              scale: 1,
              duration: 0.7,
              ease: "back.out(2.4)",
              scrollTrigger: { trigger: b, start: "top 82%" },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="story" className="relative overflow-hidden bg-[#070b08]">
      <div
        ref={track}
        className="flex flex-col lg:h-[100svh] lg:w-max lg:flex-row lg:items-stretch"
      >
        {/* intro card */}
        <div className="ch-panel flex flex-col justify-center px-6 py-24 md:px-10 lg:h-full lg:w-[44vw] lg:shrink-0 lg:py-0">
          <span className="font-mono-label mb-6 block text-[var(--gold)]">
            02 — The Story
          </span>
          <h2 className="display-lg text-[clamp(3rem,7vw,7.5rem)]">
            Sixty years,
            <br />
            <span className="font-serif-it normal-case text-[var(--gold-bright)]">
              four
            </span>{" "}
            chapters
          </h2>
          <p className="mt-8 max-w-[38ch] text-[0.95rem] leading-relaxed text-[var(--ivory-60)]">
            Scroll — and move through the club the way a point unfolds:
            serve, rally, triumph, legacy.
          </p>
        </div>

        {CHAPTERS.map((ch) => (
          <article
            key={ch.n}
            className="ch-panel relative flex flex-col justify-center border-t border-[var(--line-soft)] px-6 py-24 md:px-10 lg:h-full lg:w-[72vw] lg:shrink-0 lg:border-l lg:border-t-0 lg:px-20 lg:py-0"
          >
            <div
              className="ch-year display-xl pointer-events-none absolute right-4 top-10 select-none text-[clamp(5rem,13vw,13rem)] text-transparent lg:top-1/2 lg:-translate-y-1/2"
              style={{ WebkitTextStroke: "1px rgba(237,232,219,0.13)" }}
              aria-hidden
            >
              {ch.year}
            </div>
            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              <div>
                <div className="mb-5 flex items-center gap-4">
                  <span className="font-mono-label text-[var(--lime)]">CH. {ch.n}</span>
                  <span className="h-px w-14 bg-[var(--gold)]/50" />
                  <span className="font-mono-label text-[var(--ivory-38)]">{ch.year}</span>
                </div>
                <h3 className="display-lg text-[clamp(2.6rem,5vw,5.4rem)]">{ch.title}</h3>
                <p className="font-serif-it mt-3 text-[clamp(1.2rem,1.9vw,1.75rem)] text-[var(--gold-bright)]">
                  {ch.sub}
                </p>
                <p className="mt-7 max-w-[46ch] text-[0.95rem] leading-[1.85] text-[var(--ivory-60)]">
                  {ch.body}
                </p>
              </div>
              <div className="h-[240px] md:h-[300px]">
                <Art kind={ch.art} />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* progress */}
      <div className="pointer-events-none absolute bottom-8 left-6 right-6 hidden items-center gap-4 md:left-10 md:right-10 lg:flex">
        <span className="font-mono-label text-[var(--ivory-38)]">SERVE</span>
        <div className="h-px flex-1 bg-[var(--line-soft)]">
          <div className="story-progress h-px origin-left scale-x-0 bg-[var(--gold)]" />
        </div>
        <span className="font-mono-label text-[var(--ivory-38)]">LEGACY</span>
      </div>
    </section>
  );
}
