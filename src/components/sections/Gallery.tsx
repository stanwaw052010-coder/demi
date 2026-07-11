"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { TextReveal, FadeUp } from "@/components/fx/Reveal";

/**
 * The gallery — not a grid. Six art prints float in space at
 * different depths, drifting against the cursor and the scroll.
 * Every print is generative: drawn in code, in the house palette.
 */

type Print = {
  id: string;
  caption: string;
  meta: string;
  depth: number; // 1 = closest, moves the most
  className: string; // absolute placement on desktop
  render: React.ReactNode;
};

const grass = (
  <div className="h-full w-full" style={{
    background:
      "repeating-linear-gradient(90deg, #0e3a26 0 42px, #12472e 42px 84px)",
  }}>
    <div className="h-full w-full" style={{
      background:
        "radial-gradient(90% 70% at 60% 8%, rgba(233,215,160,0.28), transparent 55%)",
    }} />
  </div>
);

const matchPoint = (
  <div className="relative h-full w-full" style={{ background: "linear-gradient(165deg, #081208 0%, #0c2b1b 70%, #123f2b 100%)" }}>
    <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full" fill="none">
      <path d="M20 380 C 80 120, 180 60, 290 130" stroke="rgba(194,161,94,0.85)" strokeWidth="1.6" strokeDasharray="2 7" />
      <circle cx="290" cy="130" r="7" fill="#d9f74f" />
      <path d="M0 340 H300" stroke="rgba(237,232,219,0.25)" strokeWidth="1" />
      <path d="M150 340 V320" stroke="rgba(237,232,219,0.25)" strokeWidth="1" />
    </svg>
  </div>
);

const clay = (
  <div className="relative h-full w-full" style={{ background: "linear-gradient(180deg, #7a3d24 0%, #93502e 55%, #6b3520 100%)" }}>
    <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full" fill="none">
      <path d="M40 90 C 120 130, 190 220, 250 330" stroke="rgba(240,230,210,0.5)" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
      <path d="M60 70 L110 120 M90 60 L130 110" stroke="rgba(240,230,210,0.35)" strokeWidth="2" />
      <path d="M0 360 H300" stroke="rgba(240,230,210,0.65)" strokeWidth="3" />
    </svg>
  </div>
);

const lights = (
  <div className="relative h-full w-full" style={{ background: "radial-gradient(70% 55% at 50% 30%, rgba(217,247,79,0.2), transparent 60%), #05070a" }}>
    <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full" fill="none">
      {Array.from({ length: 10 }, (_, i) => (
        <line key={`v${i}`} x1={30 + i * 27} y1="230" x2={30 + i * 27} y2="330" stroke="rgba(237,232,219,0.2)" strokeWidth="1" />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <line key={`h${i}`} x1="30" y1={230 + i * 25} x2="273" y2={230 + i * 25} stroke="rgba(237,232,219,0.2)" strokeWidth="1" />
      ))}
      <line x1="10" y1="228" x2="290" y2="228" stroke="rgba(237,232,219,0.6)" strokeWidth="3" />
      <circle cx="150" cy="80" r="26" fill="rgba(217,247,79,0.9)" filter="blur(18px)" />
    </svg>
  </div>
);

const champagne = (
  <div className="relative flex h-full w-full items-center justify-center" style={{ background: "linear-gradient(160deg, #2a2113 0%, #6b5732 55%, #c2a15e 130%)" }}>
    <span className="font-serif-it text-[3rem] text-[rgba(237,232,219,0.9)]">Élever</span>
    <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full" fill="none">
      <circle cx="150" cy="200" r="110" stroke="rgba(237,232,219,0.3)" strokeWidth="1" />
      <circle cx="150" cy="200" r="130" stroke="rgba(237,232,219,0.14)" strokeWidth="1" />
    </svg>
  </div>
);

const rain = (
  <div className="relative h-full w-full" style={{ background: "linear-gradient(180deg, #10141a 0%, #151916 100%)" }}>
    <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full" fill="none">
      {Array.from({ length: 26 }, (_, i) => {
        const x = (i * 37) % 300;
        const y = (i * 53) % 320;
        return <line key={i} x1={x} y1={y} x2={x - 6} y2={y + 26} stroke="rgba(237,232,219,0.2)" strokeWidth="1" />;
      })}
      <rect x="0" y="330" width="300" height="70" fill="rgba(14,58,38,0.4)" />
      <path d="M0 330 H300" stroke="rgba(237,232,219,0.3)" strokeWidth="1" />
    </svg>
  </div>
);

const PRINTS: Print[] = [
  { id: "01", caption: "Championship point", meta: "GRASS · FINAL · 19:42", depth: 1, className: "left-[4%] top-[8%] w-[28%] max-w-[350px]", render: matchPoint },
  { id: "02", caption: "The grass at dawn", meta: "COURT ONE · 06:15", depth: 3, className: "left-[40%] top-[2%] w-[23%] max-w-[290px]", render: grass },
  { id: "03", caption: "Clay, court five", meta: "TERRE BATTUE · SLIDE", depth: 2, className: "right-[4%] top-[14%] w-[25%] max-w-[320px]", render: clay },
  { id: "04", caption: "Under the lights", meta: "NIGHT SESSION · 800 LUX", depth: 2, className: "left-[13%] bottom-[8%] w-[25%] max-w-[320px]", render: lights },
  { id: "05", caption: "The champagne hour", meta: "CLUBHOUSE · GOLDEN HOUR", depth: 4, className: "left-[45%] bottom-[16%] w-[19%] max-w-[250px]", render: champagne },
  { id: "06", caption: "Rain delay", meta: "PAVILION · PATIENCE", depth: 1, className: "right-[7%] bottom-[6%] w-[23%] max-w-[290px]", render: rain },
];

export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prints = gsap.utils.toArray<HTMLElement>(".g-print");

      // depth parallax on scroll
      prints.forEach((p) => {
        const depth = Number(p.dataset.depth ?? 2);
        gsap.fromTo(
          p,
          { y: 22 * depth },
          {
            y: -22 * depth,
            ease: "none",
            scrollTrigger: {
              trigger: stage.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // entrance
      gsap.fromTo(
        prints,
        { opacity: 0, scale: 0.86, yPercent: 8 },
        {
          opacity: 1,
          scale: 1,
          yPercent: 0,
          stagger: 0.09,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: { trigger: stage.current, start: "top 74%" },
        }
      );

      // cursor drift — each depth its own factor, springy
      const mm = gsap.matchMedia();
      mm.add("(pointer: fine) and (min-width: 1024px)", () => {
        const movers = prints.map((p) => ({
          x: gsap.quickTo(p, "x", { duration: 1.1, ease: "power3.out" }),
          depth: Number(p.dataset.depth ?? 2),
        }));
        const onMove = (e: PointerEvent) => {
          const r = stage.current!.getBoundingClientRect();
          const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
          movers.forEach((mv) => mv.x(-nx * 10 * mv.depth));
        };
        stage.current!.addEventListener("pointermove", onMove);
        return () => stage.current?.removeEventListener("pointermove", onMove);
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="moments" className="relative overflow-hidden border-t border-[var(--line-soft)] py-28 md:py-40">
      <div className="mx-auto max-w-[1720px] px-6 md:px-10">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-24">
          <div>
            <FadeUp>
              <span className="font-mono-label mb-5 block text-[var(--gold)]">
                08 — The Moments
              </span>
            </FadeUp>
            <TextReveal as="h2" className="display-lg text-[clamp(3rem,7.5vw,7.5rem)]">
              Hung in the
            </TextReveal>
            <TextReveal as="h2" className="display-lg text-[clamp(3rem,7.5vw,7.5rem)]" delay={0.12}>
              <span className="font-serif-it normal-case text-[var(--gold-bright)]">long</span> corridor
            </TextReveal>
          </div>
          <FadeUp delay={0.2} className="max-w-[32ch]">
            <p className="text-[0.95rem] leading-[1.85] text-[var(--ivory-60)]">
              Six prints from the club archive — drawn, not photographed.
              They drift; move your cursor through them.
            </p>
          </FadeUp>
        </div>

        {/* floating stage on desktop, loose column on mobile */}
        <div
          ref={stage}
          className="relative grid grid-cols-2 gap-4 lg:block lg:h-[112vh]"
        >
          {PRINTS.map((p, i) => (
            <figure
              key={p.id}
              data-depth={p.depth}
              className={`g-print print-frame group relative rounded-2xl border border-[var(--line-soft)] bg-[var(--panel)] lg:absolute! ${p.className} ${
                i % 3 === 1 ? "translate-y-6 lg:translate-y-0" : ""
              }`}
              data-cursor="MOMENT"
              style={{ willChange: "transform" }}
            >
              <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                <div className="h-full w-full transition-transform duration-1000 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
                  {p.render}
                </div>
              </div>
              <span className="font-mono-label absolute left-4 top-4 text-[rgba(237,232,219,0.75)]">
                {p.id}
              </span>
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 rounded-b-2xl bg-gradient-to-t from-[rgba(4,6,5,0.92)] to-transparent p-5 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="font-serif-it text-lg text-[var(--ivory)]">{p.caption}</div>
                <div className="font-mono-label mt-1 text-[var(--gold)]">{p.meta}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
