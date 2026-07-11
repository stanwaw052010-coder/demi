"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const WORDS = ["PRECISION", "POWER", "GRACE", "VELOCITY", "CONTROL"];
const GLYPHS = "AEHKLMNORTVX0123456789";

/**
 * Cinematic preloader — a ball bouncing with squash-and-stretch,
 * court lines drawing themselves, an organic counter, scrambled
 * word cycle, then a two-panel curtain wipe into the hero.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const ball = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // — ball bounce loop with squash & stretch
      const bounce = gsap.timeline({ repeat: -1 });
      bounce
        .fromTo(
          ball.current,
          { y: -92, scaleX: 0.94, scaleY: 1.06 },
          { y: 0, scaleX: 0.94, scaleY: 1.06, duration: 0.42, ease: "power2.in" }
        )
        .to(ball.current, {
          scaleX: 1.32,
          scaleY: 0.62,
          duration: 0.09,
          ease: "power1.out",
        })
        .to(ball.current, {
          scaleX: 0.94,
          scaleY: 1.06,
          y: -92,
          duration: 0.46,
          ease: "power2.out",
        })
        .fromTo(
          shadow.current,
          { scaleX: 0.55, opacity: 0.16 },
          { scaleX: 1, opacity: 0.42, duration: 0.42, ease: "power2.in" },
          0
        )
        .to(
          shadow.current,
          { scaleX: 0.55, opacity: 0.16, duration: 0.46, ease: "power2.out" },
          0.51
        );

      // — court lines draw in
      gsap.utils.toArray<SVGPathElement>(".pre-line").forEach((p, i) => {
        const len = p.getTotalLength();
        gsap.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 1.4,
            delay: 0.15 + i * 0.12,
            ease: "power3.inOut",
          }
        );
      });

      // — organic counter 0 → 100
      const state = { v: 0 };
      gsap.to(state, {
        v: 100,
        duration: 2.7,
        ease: "power2.inOut",
        onUpdate() {
          if (counter.current)
            counter.current.textContent = String(Math.round(state.v)).padStart(3, "0");
        },
        onComplete: leave,
      });
    }, root);

    // — scrambled word cycle
    let wi = 0;
    const wordTimer = setInterval(() => {
      wi = (wi + 1) % WORDS.length;
      const target = WORDS[wi];
      let frame = 0;
      const scramble = setInterval(() => {
        frame++;
        if (!word.current) return clearInterval(scramble);
        word.current.textContent = target
          .split("")
          .map((c, i) =>
            i < frame ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]
          )
          .join("");
        if (frame >= target.length) clearInterval(scramble);
      }, 34);
    }, 640);

    // — curtain exit
    function leave() {
      clearInterval(wordTimer);
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = prev;
          setGone(true);
          onDone();
        },
      });
      tl.to(ball.current, {
        y: -260,
        scale: 0.5,
        opacity: 0,
        duration: 0.55,
        ease: "power3.in",
      })
        .to(
          ".pre-fade",
          { opacity: 0, y: -24, stagger: 0.05, duration: 0.5, ease: "power2.in" },
          "<"
        )
        .to(
          ".pre-line",
          { stroke: "#d9f74f", opacity: 0, duration: 0.4, stagger: 0.04 },
          "<0.1"
        )
        .to(".pre-panel-top", {
          yPercent: -100,
          duration: 1.05,
          ease: "power4.inOut",
        }, "-=0.1")
        .to(
          ".pre-panel-bottom",
          { yPercent: 100, duration: 1.05, ease: "power4.inOut" },
          "<"
        );
    }

    return () => {
      clearInterval(wordTimer);
      ctx.revert();
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[500]" aria-hidden>
      {/* curtain panels */}
      <div className="pre-panel-top absolute inset-x-0 top-0 h-1/2 bg-[#070a08]">
        <div className="absolute inset-x-0 bottom-0 h-px bg-[rgba(194,161,94,0.25)]" />
      </div>
      <div className="pre-panel-bottom absolute inset-x-0 bottom-0 h-1/2 bg-[#070a08]" />

      {/* content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* court rectangle drawing itself */}
        <svg
          className="pre-fade absolute h-[320px] w-[480px] max-w-[86vw]"
          viewBox="0 0 480 320"
          fill="none"
        >
          <path className="pre-line" d="M40 20 H440 V300 H40 Z" stroke="rgba(237,232,219,0.22)" strokeWidth="1" />
          <path className="pre-line" d="M40 160 H440" stroke="rgba(237,232,219,0.22)" strokeWidth="1" />
          <path className="pre-line" d="M120 20 V300" stroke="rgba(237,232,219,0.14)" strokeWidth="1" />
          <path className="pre-line" d="M360 20 V300" stroke="rgba(237,232,219,0.14)" strokeWidth="1" />
          <path className="pre-line" d="M120 90 H360 M120 230 H360" stroke="rgba(237,232,219,0.14)" strokeWidth="1" />
          <path className="pre-line" d="M240 90 V230" stroke="rgba(194,161,94,0.5)" strokeWidth="1" />
        </svg>

        {/* bouncing ball */}
        <div className="relative flex h-[140px] flex-col items-center justify-end">
          <div
            ref={ball}
            className="relative z-10 h-9 w-9 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 32% 30%, #eaff70 0%, #cfe93f 42%, #93ad20 100%)",
              boxShadow: "0 0 34px rgba(217,247,79,0.35)",
            }}
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 70% 75%, transparent 55%, rgba(20,30,8,0.4) 100%)",
              }}
            />
          </div>
          <div
            ref={shadow}
            className="mt-2 h-[7px] w-12 rounded-[50%] bg-black/60 blur-[3px]"
          />
        </div>
      </div>

      {/* meta */}
      <div className="pre-fade font-mono-label absolute left-6 top-6 text-[var(--ivory-60)] md:left-10 md:top-8">
        ELEVATE — TENNIS CLUB
      </div>
      <div className="pre-fade font-mono-label absolute right-6 top-6 text-[var(--gold)] md:right-10 md:top-8">
        <span ref={word}>PRECISION</span>
      </div>
      <div className="pre-fade absolute bottom-6 left-6 md:bottom-8 md:left-10">
        <span
          ref={counter}
          className="display-lg text-6xl tabular-nums text-[var(--ivory)] md:text-8xl"
        >
          000
        </span>
        <span className="font-mono-label ml-3 text-[var(--ivory-38)]">%</span>
      </div>
      <div className="pre-fade font-mono-label absolute bottom-8 right-6 text-[var(--ivory-38)] md:bottom-10 md:right-10">
        LOADING THE COURT
      </div>
    </div>
  );
}
