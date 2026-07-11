"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Counter from "@/components/fx/Counter";
import { TextReveal, FadeUp } from "@/components/fx/Reveal";

/**
 * The season in numbers — counters with momentum, and the club's
 * form curve drawing itself in real time.
 */

const NUMBERS = [
  { v: 214, suffix: "", label: "Titles lifted by members" },
  { v: 23, suffix: "", label: "Juniors turned professional" },
  { v: 640, suffix: "", label: "Members — capped, forever" },
  { v: 98.4, suffix: "%", decimals: 1, label: "Renew their membership" },
] as const;

// monthly match-win ratio, plotted
const FORM = [52, 58, 55, 63, 61, 70, 74, 68, 79, 83, 80, 88];

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  const W = 1000;
  const H = 360;
  const pts = FORM.map((v, i) => ({
    x: (i / (FORM.length - 1)) * (W - 80) + 40,
    y: H - 40 - ((v - 40) / 55) * (H - 90),
  }));
  // smooth the polyline with Catmull-Rom → bezier
  const path = pts.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const p0 = arr[i - 1];
    const cx = (p0.x + p.x) / 2;
    return `${acc} C ${cx} ${p0.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
  }, "");
  const area = `${path} L ${pts[pts.length - 1].x} ${H - 30} L ${pts[0].x} ${H - 30} Z`;

  useGSAP(
    () => {
      const line = root.current!.querySelector<SVGPathElement>(".form-line")!;
      const len = line.getTotalLength();
      const st = { trigger: ".form-chart", start: "top 74%" } as const;

      gsap.fromTo(
        line,
        { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, duration: 2.6, ease: "power2.inOut", scrollTrigger: st }
      );
      gsap.fromTo(
        ".form-area",
        { opacity: 0 },
        { opacity: 1, duration: 1.4, delay: 1.4, scrollTrigger: st }
      );
      gsap.fromTo(
        ".form-dot",
        { scale: 0, transformOrigin: "center" },
        { scale: 1, duration: 0.6, delay: 2.4, ease: "back.out(3)", scrollTrigger: st }
      );
      gsap.fromTo(
        ".form-grid-line",
        { scaleX: 0 },
        { scaleX: 1, stagger: 0.08, duration: 1, ease: "expo.out", transformOrigin: "left", scrollTrigger: st }
      );
      gsap.fromTo(
        ".stat-cell",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".stat-row", start: "top 80%" },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} id="numbers" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1720px] px-6 md:px-10">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">
          <div>
            <FadeUp>
              <span className="font-mono-label mb-5 block text-[var(--gold)]">
                07 — The Numbers
              </span>
            </FadeUp>
            <TextReveal as="h2" className="display-lg text-[clamp(3rem,7vw,7rem)]">
              Form is
            </TextReveal>
            <TextReveal as="h2" className="display-lg text-[clamp(3rem,7vw,7rem)]" delay={0.12}>
              <span className="font-serif-it normal-case text-[var(--gold-bright)]">temporary,</span>{" "}
              class isn&apos;t
            </TextReveal>
          </div>
          <FadeUp delay={0.2} className="max-w-[32ch]">
            <p className="text-[0.95rem] leading-[1.85] text-[var(--ivory-60)]">
              Club match-win ratio, rolling twelve months. The curve only
              bends one way here.
            </p>
          </FadeUp>
        </div>

        {/* chart */}
        <div className="form-chart relative overflow-hidden rounded-3xl border border-[var(--line-soft)] bg-[#080d09] p-6 md:p-10">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-mono-label text-[var(--ivory-38)]">WIN RATIO — TRAILING 12 MO.</span>
            <span className="font-mono-label text-[var(--lime)]">▲ 88% THIS MONTH</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" fill="none">
            <defs>
              <linearGradient id="formfill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(217,247,79,0.22)" />
                <stop offset="100%" stopColor="rgba(217,247,79,0)" />
              </linearGradient>
              <linearGradient id="formstroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#c2a15e" />
                <stop offset="100%" stopColor="#d9f74f" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75, 1].map((f) => (
              <line
                key={f}
                className="form-grid-line"
                x1="40"
                x2={W - 40}
                y1={40 + (H - 70) * (1 - f)}
                y2={40 + (H - 70) * (1 - f)}
                stroke="rgba(237,232,219,0.07)"
                strokeWidth="1"
              />
            ))}
            <path className="form-area" d={area} fill="url(#formfill)" opacity="0" />
            <path className="form-line" d={path} stroke="url(#formstroke)" strokeWidth="2.5" strokeLinecap="round" />
            <circle className="form-dot" cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="7" fill="#d9f74f" />
            <circle className="form-dot" cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="14" fill="none" stroke="rgba(217,247,79,0.4)" strokeWidth="1" />
          </svg>
          <div className="mt-4 flex justify-between px-2">
            {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((mo, i) => (
              <span key={i} className="font-mono-label text-[var(--ivory-38)]">
                {mo}
              </span>
            ))}
          </div>
        </div>

        {/* counters */}
        <div className="stat-row mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[var(--line-soft)] bg-[var(--line-soft)] sm:grid-cols-2 xl:grid-cols-4">
          {NUMBERS.map((n) => (
            <div key={n.label} className="stat-cell bg-[var(--bg)] px-8 py-10">
              <Counter
                to={n.v}
                suffix={n.suffix}
                decimals={"decimals" in n ? n.decimals : 0}
                className="display-xl block text-[clamp(3.4rem,6vw,5.6rem)] text-[var(--ivory)]"
              />
              <span className="font-mono-label mt-3 block text-[var(--ivory-38)]">
                {n.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
