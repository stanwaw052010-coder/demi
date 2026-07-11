"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { TextReveal, FadeUp } from "@/components/fx/Reveal";

/**
 * The grounds — one court, four lights. Sky, sun, shadows and line
 * temperature all morph as the visitor moves through the day.
 */

const MODES = [
  {
    id: "dawn",
    label: "Dawn",
    time: "06:12",
    note: "First light. Dew still on the grass — the club belongs to the early ones.",
    sky: "linear-gradient(180deg, #0c1a2e 0%, #35486b 46%, #b98a6e 78%, #0d130e 78.5%, #060806 100%)",
    glow: { x: 18, y: 62, scale: 0.8, color: "rgba(233,178,120,0.5)" },
    surface: "rgba(16, 48, 32, 0.92)",
    line: "rgba(237,232,219,0.55)",
    shadow: { skew: -38, opacity: 0.34 },
  },
  {
    id: "noon",
    label: "Noon",
    time: "12:47",
    note: "Hard light, short shadows. Championship conditions — nowhere to hide.",
    sky: "linear-gradient(180deg, #16324a 0%, #3f6d8e 60%, #9db3a5 78%, #0d130e 78.5%, #060806 100%)",
    glow: { x: 50, y: 14, scale: 1.05, color: "rgba(244,240,228,0.55)" },
    surface: "rgba(22, 66, 42, 1)",
    line: "rgba(244,240,228,0.85)",
    shadow: { skew: -6, opacity: 0.16 },
  },
  {
    id: "golden",
    label: "Golden Hour",
    time: "19:38",
    note: "The hour the photographers wait for. Everything the light touches turns to champagne.",
    sky: "linear-gradient(180deg, #241a2e 0%, #6b3a41 44%, #d99a56 78%, #0d130e 78.5%, #060806 100%)",
    glow: { x: 78, y: 58, scale: 1.25, color: "rgba(216,155,86,0.65)" },
    surface: "rgba(46, 52, 28, 0.95)",
    line: "rgba(244,226,190,0.8)",
    shadow: { skew: 42, opacity: 0.42 },
  },
  {
    id: "night",
    label: "Night",
    time: "22:04",
    note: "Floodlit and silent. Just you, the baseline, and eight hundred lux of truth.",
    sky: "linear-gradient(180deg, #04060a 0%, #0a1220 58%, #16283a 78%, #0d130e 78.5%, #060806 100%)",
    glow: { x: 50, y: 30, scale: 0.55, color: "rgba(217,247,79,0.28)" },
    surface: "rgba(10, 34, 24, 1)",
    line: "rgba(217,247,79,0.5)",
    shadow: { skew: 0, opacity: 0.55 },
  },
] as const;

export default function Grounds() {
  const root = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState(0);
  const [auto, setAuto] = useState(true);

  // auto-advance until the visitor takes over
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setMode((m) => (m + 1) % MODES.length), 5200);
    return () => clearInterval(t);
  }, [auto]);

  // morph the scene on mode change
  useEffect(() => {
    const m = MODES[mode];
    const q = gsap.utils.selector(scene.current);
    gsap.to(q(".sky-layer"), {
      opacity: (i: number) => (i === mode ? 1 : 0),
      duration: 1.6,
      ease: "power2.inOut",
    });
    gsap.to(q(".sun-glow"), {
      left: `${m.glow.x}%`,
      top: `${m.glow.y}%`,
      scale: m.glow.scale,
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.to(q(".sun-core"), { background: m.glow.color, duration: 1.6 });
    gsap.to(q(".court-surface"), { fill: m.surface, duration: 1.6 });
    gsap.to(q(".court-line"), { stroke: m.line, duration: 1.6 });
    gsap.to(q(".net-shadow"), {
      skewX: m.shadow.skew,
      opacity: m.shadow.opacity,
      duration: 1.8,
      ease: "power3.inOut",
    });
    gsap.fromTo(
      q(".mode-note"),
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" }
    );
  }, [mode]);

  useGSAP(
    () => {
      // court lines draw themselves the first time the scene appears
      gsap.utils.toArray<SVGPathElement>(".court-line").forEach((p, i) => {
        const len = p.getTotalLength();
        gsap.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 1.5,
            delay: i * 0.07,
            ease: "power3.inOut",
            scrollTrigger: { trigger: scene.current, start: "top 75%" },
          }
        );
      });
      gsap.fromTo(
        scene.current,
        { clipPath: "inset(12% 6% 12% 6% round 24px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          ease: "none",
          scrollTrigger: {
            trigger: scene.current,
            start: "top 90%",
            end: "top 30%",
            scrub: 0.5,
          },
        }
      );
    },
    { scope: root }
  );

  const m = MODES[mode];

  return (
    <section ref={root} id="grounds" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1720px] px-6 md:px-10">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">
          <div>
            <FadeUp>
              <span className="font-mono-label mb-5 block text-[var(--gold)]">
                03 — The Grounds
              </span>
            </FadeUp>
            <TextReveal as="h2" className="display-lg text-[clamp(3rem,7.5vw,7.5rem)]">
              One court,
            </TextReveal>
            <TextReveal
              as="h2"
              className="display-lg text-[clamp(3rem,7.5vw,7.5rem)] text-[var(--gold-bright)]"
              delay={0.12}
            >
              four lights
            </TextReveal>
          </div>
          <FadeUp delay={0.2} className="max-w-[34ch]">
            <p className="text-[0.95rem] leading-[1.85] text-[var(--ivory-60)]">
              Twelve championship courts across grass, clay and cushioned
              hard. Open 06:00 — 23:00, lit to broadcast standard after dark.
            </p>
          </FadeUp>
        </div>

        {/* scene */}
        <div
          ref={scene}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--line-soft)] sm:aspect-[16/10] lg:aspect-[21/10]"
          style={{ clipPath: "inset(0 round 24px)" }}
        >
          {/* stacked skies */}
          {MODES.map((mm, i) => (
            <div
              key={mm.id}
              className="sky-layer absolute inset-0"
              style={{ background: mm.sky, opacity: i === 0 ? 1 : 0 }}
            />
          ))}

          {/* sun / moon / floodlight glow */}
          <div
            className="sun-glow pointer-events-none absolute h-[46%] w-[30%] -translate-x-1/2 -translate-y-1/2"
            style={{ left: "18%", top: "62%" }}
          >
            <div
              className="sun-core h-full w-full rounded-full blur-3xl"
              style={{ background: MODES[0].glow.color }}
            />
          </div>

          {/* court */}
          <svg
            viewBox="0 0 1000 560"
            preserveAspectRatio="xMidYMax slice"
            className="absolute inset-x-0 bottom-0 h-[68%] w-full"
            fill="none"
          >
            {/* apron */}
            <polygon points="0,180 1000,180 1000,560 0,560" fill="rgba(9,17,12,0.94)" />
            {/* playing surface */}
            <polygon
              className="court-surface"
              points="330,200 670,200 905,540 95,540"
              fill="rgba(16,48,32,0.92)"
            />
            {/* net shadow */}
            <polygon
              className="net-shadow"
              points="215,368 785,368 830,432 172,432"
              fill="rgba(3,6,4,0.8)"
              opacity="0.3"
              style={{ transformOrigin: "50% 100%" }}
            />
            {/* doubles boundary */}
            <path className="court-line" d="M330 200 L670 200 L905 540 L95 540 Z" stroke="rgba(237,232,219,0.55)" strokeWidth="2" />
            {/* singles lines */}
            <path className="court-line" d="M368 200 L233 540 M632 200 L767 540" stroke="rgba(237,232,219,0.55)" strokeWidth="1.5" />
            {/* service lines */}
            <path className="court-line" d="M414 265 L586 265 M310 415 L690 415" stroke="rgba(237,232,219,0.55)" strokeWidth="1.5" />
            {/* centre service line + marks */}
            <path className="court-line" d="M500 265 L500 415 M500 200 L500 214 M500 526 L500 540" stroke="rgba(237,232,219,0.55)" strokeWidth="1.5" />
            {/* net */}
            <g>
              <line x1="212" y1="368" x2="788" y2="368" stroke="rgba(237,232,219,0.8)" strokeWidth="3" />
              <polygon points="212,368 788,368 788,318 212,318" fill="rgba(6,9,7,0.35)" />
              {Array.from({ length: 40 }, (_, i) => (
                <line key={`v${i}`} x1={212 + i * 14.77} y1="318" x2={212 + i * 14.77} y2="368" stroke="rgba(237,232,219,0.14)" strokeWidth="1" />
              ))}
              {Array.from({ length: 4 }, (_, i) => (
                <line key={`h${i}`} x1="212" y1={318 + i * 12.5} x2="788" y2={318 + i * 12.5} stroke="rgba(237,232,219,0.14)" strokeWidth="1" />
              ))}
              <line x1="212" y1="308" x2="212" y2="372" stroke="rgba(237,232,219,0.7)" strokeWidth="4" />
              <line x1="788" y1="308" x2="788" y2="372" stroke="rgba(237,232,219,0.7)" strokeWidth="4" />
            </g>
          </svg>

          {/* meta overlay */}
          <div className="absolute left-5 top-5 md:left-8 md:top-8">
            <div className="glass rounded-2xl px-5 py-4">
              <div className="font-mono-label text-[var(--gold)]">{m.time} — {m.label}</div>
              <p className="mode-note mt-2 max-w-[30ch] text-[0.8rem] leading-relaxed text-[var(--ivory-60)]">
                {m.note}
              </p>
            </div>
          </div>

          {/* mode switch */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1 rounded-full p-1 glass md:bottom-8">
            {MODES.map((mm, i) => (
              <button
                key={mm.id}
                onClick={() => {
                  setAuto(false);
                  setMode(i);
                }}
                data-cursor={mm.label.toUpperCase()}
                className={`rounded-full px-4 py-2 font-mono-label transition-all duration-500 md:px-5 ${
                  i === mode
                    ? "bg-[var(--ivory)] text-[#0a0e0b]"
                    : "text-[var(--ivory-60)] hover:text-[var(--ivory)]"
                }`}
              >
                {mm.label}
              </button>
            ))}
          </div>
        </div>

        {/* surface strip */}
        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--line-soft)] bg-[var(--line-soft)] sm:grid-cols-3">
          {[
            ["Grass", "04 courts", "Cut to 8 mm, rolled daily"],
            ["Clay", "05 courts", "Italian terre battue, hand-swept"],
            ["Hard", "03 courts", "Cushioned acrylic, US Open pace"],
          ].map(([name, count, note]) => (
            <div
              key={name}
              className="group bg-[var(--bg)] px-7 py-6 transition-colors duration-500 hover:bg-[#0b130d]"
            >
              <div className="flex items-baseline justify-between">
                <span className="display-md text-xl">{name}</span>
                <span className="font-mono-label text-[var(--gold)]">{count}</span>
              </div>
              <p className="mt-2 text-[0.8rem] text-[var(--ivory-38)] transition-colors duration-500 group-hover:text-[var(--ivory-60)]">
                {note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
