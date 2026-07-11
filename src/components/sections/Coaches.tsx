"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { TextReveal, FadeUp } from "@/components/fx/Reveal";

/**
 * The faculty — no stock headshots. Each coach is drawn as their
 * signature shot: a generative line portrait that comes alive on
 * hover, with the record sliding in underneath.
 */

const COACHES = [
  {
    initials: "AV",
    name: "Aleksander Voss",
    role: "Head of Performance",
    signature: "The flat serve",
    art: "serve",
    stats: [
      ["ATP career high", "No. 14"],
      ["Aces on record", "4,812"],
      ["Years at ELEVATE", "11"],
    ],
    quote: "A serve is a promise you make before the ball leaves your hand.",
  },
  {
    initials: "MK",
    name: "Mirei Kato",
    role: "Director, Academy",
    signature: "The topspin forehand",
    art: "topspin",
    stats: [
      ["WTA titles", "9"],
      ["Juniors to tour", "23"],
      ["Years at ELEVATE", "8"],
    ],
    quote: "Spin is geometry you can feel. I teach geometry.",
  },
  {
    initials: "RD",
    name: "Rafael Duarte",
    role: "Clay Court Specialist",
    signature: "The sliding backhand",
    art: "slice",
    stats: [
      ["Roland-Garros QF", "3×"],
      ["Clay win rate", "78%"],
      ["Years at ELEVATE", "14"],
    ],
    quote: "Clay forgives nothing and rewards everything. Like me.",
  },
  {
    initials: "IS",
    name: "Ingrid Sørensen",
    role: "Mental Performance",
    signature: "The still mind",
    art: "still",
    stats: [
      ["Grand Slam finalists", "6"],
      ["Olympic medallists", "4"],
      ["Years at ELEVATE", "6"],
    ],
    quote: "Match point is just a point. My job is making you believe that.",
  },
] as const;

function Portrait({ art, initials }: { art: string; initials: string }) {
  const gold = "rgba(194,161,94,0.75)";
  const ivory = "rgba(237,232,219,0.3)";
  const lime = "rgba(217,247,79,0.7)";
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <span
        className="font-serif-it select-none text-[7.5rem] leading-none text-[rgba(237,232,219,0.09)] transition-colors duration-700 group-hover:text-[rgba(237,232,219,0.16)]"
        aria-hidden
      >
        {initials}
      </span>
      <svg viewBox="0 0 300 300" fill="none" className="coach-art absolute inset-0 h-full w-full">
        {art === "serve" && (
          <>
            <path className="ca-line" d="M60 260 C 90 120, 150 60, 250 60" stroke={gold} strokeWidth="1.5" strokeDasharray="2 8" />
            <circle className="ca-dot" cx="250" cy="60" r="6" fill={lime} />
            <path className="ca-line" d="M40 270 H260" stroke={ivory} strokeWidth="1" />
            <path className="ca-line" d="M60 240 C 70 200, 60 170, 80 140" stroke={ivory} strokeWidth="1.5" />
          </>
        )}
        {art === "topspin" && (
          <>
            <path className="ca-line" d="M40 220 C 120 240, 130 140, 90 130 C 60 125, 70 190, 160 170 C 230 152, 250 90, 255 60" stroke={gold} strokeWidth="1.5" />
            <circle className="ca-dot" cx="255" cy="60" r="6" fill={lime} />
            <path className="ca-line" d="M30 262 H270" stroke={ivory} strokeWidth="1" />
          </>
        )}
        {art === "slice" && (
          <>
            <path className="ca-line" d="M40 90 C 130 110, 200 170, 265 235" stroke={gold} strokeWidth="1.5" strokeDasharray="10 6" />
            <path className="ca-line" d="M40 250 C 110 245, 200 248, 265 252" stroke={ivory} strokeWidth="1" />
            <path className="ca-line" d="M60 250 L110 210 M100 252 L150 216" stroke={ivory} strokeWidth="1" />
            <circle className="ca-dot" cx="265" cy="235" r="6" fill={lime} />
          </>
        )}
        {art === "still" && (
          <>
            {[95, 70, 45].map((r) => (
              <circle key={r} className="ca-line" cx="150" cy="150" r={r} stroke={ivory} strokeWidth="1" />
            ))}
            <circle className="ca-line" cx="150" cy="150" r="20" stroke={gold} strokeWidth="1.5" />
            <circle className="ca-dot" cx="150" cy="150" r="5" fill={lime} />
          </>
        )}
      </svg>
    </div>
  );
}

function CoachCard({ coach }: { coach: (typeof COACHES)[number] }) {
  const card = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = card.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotateY: px * 10,
      rotateX: -py * 8,
      transformPerspective: 900,
      duration: 0.7,
      ease: "power3.out",
    });
  };
  const onLeave = () => {
    gsap.to(card.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 1.1,
      ease: "elastic.out(1, 0.45)",
    });
  };

  return (
    <div
      ref={card}
      className="coach-card group relative overflow-hidden rounded-3xl border border-[var(--line-soft)] bg-[#0a0f0b] transition-colors duration-700 hover:border-[rgba(194,161,94,0.35)]"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-cursor="MEET"
      style={{ clipPath: "inset(100% 0 0 0)", willChange: "transform" }}
    >
      <div className="relative h-[300px]">
        <Portrait art={coach.art} initials={coach.initials} />
        <div className="absolute left-5 top-5">
          <span className="font-mono-label text-[var(--lime)]">{coach.signature}</span>
        </div>
      </div>

      <div className="relative border-t border-[var(--line-soft)] p-6">
        <h3 className="display-md text-2xl">{coach.name}</h3>
        <p className="font-mono-label mt-2 text-[var(--gold)]">{coach.role}</p>
        <p className="font-serif-it mt-4 text-[1.02rem] leading-snug text-[var(--ivory-60)]">
          “{coach.quote}”
        </p>
      </div>

      {/* record — slides up over the portrait on hover */}
      <div className="absolute inset-x-0 top-0 h-[300px] translate-y-[-101%] bg-[rgba(7,10,8,0.88)] backdrop-blur-md transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
        <div className="flex h-full flex-col justify-center gap-4 px-7">
          <span className="font-mono-label text-[var(--ivory-38)]">The record</span>
          {coach.stats.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between border-b border-[var(--line-soft)] pb-3">
              <span className="text-[0.8rem] text-[var(--ivory-60)]">{k}</span>
              <span className="display-md text-xl text-[var(--gold-bright)]">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Coaches() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to(".coach-card", {
        clipPath: "inset(0% 0 0 0)",
        stagger: 0.12,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ".coach-grid", start: "top 78%" },
      });
      // portraits keep breathing
      gsap.utils.toArray<SVGPathElement>(".ca-line").forEach((p, i) => {
        const len = p.getTotalLength();
        gsap.fromTo(
          p,
          { strokeDasharray: p.getAttribute("stroke-dasharray") ?? `${len}`, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 1.8,
            delay: 0.5 + (i % 4) * 0.15,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ".coach-grid", start: "top 75%" },
          }
        );
      });
      gsap.fromTo(
        ".ca-dot",
        { scale: 0, transformOrigin: "center" },
        {
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          delay: 1.4,
          ease: "back.out(2.6)",
          scrollTrigger: { trigger: ".coach-grid", start: "top 75%" },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} id="coaches" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[1720px] px-6 md:px-10">
        <div className="mb-14 md:mb-20">
          <FadeUp>
            <span className="font-mono-label mb-5 block text-[var(--gold)]">
              05 — The Faculty
            </span>
          </FadeUp>
          <TextReveal as="h2" className="display-lg text-[clamp(3rem,7.5vw,7.5rem)]">
            Taught by people
          </TextReveal>
          <TextReveal as="h2" className="display-lg text-[clamp(3rem,7.5vw,7.5rem)]" delay={0.12}>
            the tour still{" "}
            <span className="font-serif-it normal-case text-[var(--gold-bright)]">fears</span>
          </TextReveal>
        </div>

        <div className="coach-grid grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {COACHES.map((c) => (
            <CoachCard key={c.name} coach={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
