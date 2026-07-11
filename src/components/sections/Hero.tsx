"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, useGSAP } from "@/lib/gsap";
import { splitText } from "@/lib/split";
import Magnetic from "@/lib/Magnetic";
import { useLenis } from "@/lib/SmoothScroll";

const BallScene = dynamic(() => import("@/components/three/BallScene"), {
  ssr: false,
});

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const chars = splitText(
          root.current!.querySelector<HTMLElement>(".hero-word")!,
          "chars"
        );

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(".hero-rays", { opacity: 1, duration: 2.2, ease: "power2.out" }, 0)
          .fromTo(
            chars,
            { yPercent: 112, rotate: 8 },
            { yPercent: 0, rotate: 0, duration: 1.35, stagger: 0.055 },
            0.15
          )
          .fromTo(
            ".hero-tag",
            { clipPath: "inset(0 100% 0 0)", opacity: 1 },
            { clipPath: "inset(0 0% 0 0)", duration: 1.2 },
            0.75
          )
          .fromTo(
            ".hero-meta-item",
            { y: 26, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.09, duration: 1 },
            0.9
          )
          .fromTo(
            ".hero-ball",
            { y: "-64vh", scale: 0.5, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, duration: 1.25, ease: "power3.inOut" },
            0.55
          )
          // impact — camera jolt + flare the instant the ball settles
          .to(
            root.current,
            {
              keyframes: [
                { x: -7, y: 5, duration: 0.05 },
                { x: 6, y: -4, duration: 0.05 },
                { x: -4, y: 2, duration: 0.06 },
                { x: 2, y: -1, duration: 0.07 },
                { x: 0, y: 0, duration: 0.1 },
              ],
              ease: "none",
            },
            1.78
          )
          .fromTo(
            ".hero-flare",
            { opacity: 0.9, scaleX: 0.2 },
            { opacity: 0, scaleX: 1.6, duration: 0.9, ease: "power2.out" },
            1.78
          )
          .fromTo(
            ".hero-cue",
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 1 },
            2.1
          )
          .fromTo(
            ".hero-ring",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.4 },
            1.9
          );

        // scroll exit — type accelerates away with motion blur, ball parallax
        gsap.to(".hero-inner", {
          yPercent: -26,
          opacity: 0,
          filter: "blur(14px)",
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "88% top",
            scrub: 0.6,
          },
        });
        gsap.to(".hero-ball", {
          yPercent: 34,
          scale: 0.82,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.4,
          },
        });
        gsap.to(".hero-cue", {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "18% top",
            scrub: true,
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [".hero-rays", ".hero-tag", ".hero-meta-item", ".hero-ball", ".hero-cue", ".hero-ring"],
          { opacity: 1, clearProps: "transform,clipPath" }
        );
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [ready] }
  );

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const t = document.querySelector(href);
    if (t && lenis?.current) lenis.current.scrollTo(t as HTMLElement, { duration: 1.9 });
    else t?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={root}
      id="hero"
      className="vignette relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden"
    >
      {/* deep green atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 70% 12%, rgba(14,58,38,0.55), transparent 60%), radial-gradient(70% 60% at 12% 88%, rgba(11,43,27,0.5), transparent 60%), linear-gradient(180deg, #060806 0%, #081009 55%, #060806 100%)",
        }}
      />

      {/* light rays */}
      <div className="hero-rays absolute inset-0 opacity-0" aria-hidden>
        <div
          className="absolute -left-[10%] -top-[40%] h-[150%] w-[42%] blur-3xl"
          style={{
            background:
              "linear-gradient(190deg, rgba(237,232,219,0.10), transparent 62%)",
            animation: "ray-drift 11s ease-in-out infinite",
          }}
        />
        <div
          className="absolute left-[22%] -top-[46%] h-[150%] w-[26%] blur-3xl"
          style={{
            background:
              "linear-gradient(196deg, rgba(217,247,79,0.06), transparent 55%)",
            animation: "ray-drift 14s ease-in-out -4s infinite",
          }}
        />
      </div>

      {/* impact flare */}
      <div
        className="hero-flare pointer-events-none absolute left-1/2 top-1/2 h-px w-[80vw] -translate-x-1/2 bg-[var(--lime)] opacity-0"
        style={{ boxShadow: "0 0 60px 6px rgba(217,247,79,0.5)" }}
        aria-hidden
      />

      {/* 3D ball — visually in front of the word, but clicks pass through */}
      <div className="hero-ball pointer-events-none absolute inset-0 z-[30] opacity-0">
        <BallScene active={ready} />
      </div>

      {/* typography */}
      <div className="hero-inner relative z-20 flex flex-1 flex-col items-center justify-center px-6">
        <p className="font-mono-label mb-6 text-[var(--gold)] md:mb-8">
          A private tennis club — est. 1962
        </p>
        <h1
          className="hero-word grad-hero display-xl select-none overflow-hidden text-center text-[clamp(4.2rem,16.5vw,18.5rem)] leading-[0.86]"
          style={{ paddingBottom: "0.06em" }}
        >
          ELEVATE
        </h1>
        <div className="mt-5 flex flex-col items-center gap-2 md:mt-8">
          <p
            className="hero-tag font-serif-it text-[clamp(1.5rem,3.4vw,3rem)] text-[var(--ivory)]"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            Above the game<span className="text-[var(--gold)]">.</span>
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:mt-14">
          <Magnetic strength={0.32} className="hero-meta-item opacity-0">
            <a
              href="#story"
              onClick={(e) => go(e, "#story")}
              className="btn-pill border border-[var(--line)] px-8 py-3.5 font-mono-label text-[var(--ivory)] hover:text-[#0a0e0b]"
              data-cursor="ENTER"
            >
              <span className="btn-fill bg-[var(--ivory)]" />
              Enter the club
            </a>
          </Magnetic>
          <Magnetic strength={0.32} className="hero-meta-item opacity-0">
            <a
              href="#begin"
              onClick={(e) => go(e, "#begin")}
              className="btn-pill border border-[rgba(217,247,79,0.4)] px-8 py-3.5 font-mono-label text-[var(--lime)] hover:text-[#0a0e0b]"
              data-cursor="PLAY"
            >
              <span className="btn-fill bg-[var(--lime)]" />
              Book a court
            </a>
          </Magnetic>
        </div>
      </div>

      {/* rotating ring */}
      <div className="hero-ring pointer-events-none absolute bottom-16 right-8 z-20 hidden opacity-0 lg:block">
        <svg
          width="128"
          height="128"
          viewBox="0 0 128 128"
          style={{ animation: "spin-slow 26s linear infinite" }}
        >
          <defs>
            <path id="ringpath" d="M64,64 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text className="font-mono-label" fill="rgba(237,232,219,0.5)" fontSize="9.5" letterSpacing="3">
            <textPath href="#ringpath">
              ABOVE THE GAME — SINCE 1962 —
            </textPath>
          </text>
        </svg>
      </div>

      {/* meta row */}
      <div className="relative z-20 flex items-end justify-between px-6 pb-6 md:px-10 md:pb-8">
        <div className="hero-meta-item font-mono-label text-[var(--ivory-38)] opacity-0">
          51.4183° N — 0.2206° W
        </div>
        <div className="hero-cue flex flex-col items-center gap-2 opacity-0">
          <span className="font-mono-label text-[var(--ivory-60)]">Scroll</span>
          <span className="relative block h-10 w-px overflow-hidden bg-[var(--line)]">
            <span
              className="absolute left-0 top-0 h-4 w-px bg-[var(--gold)]"
              style={{ animation: "cue-fall 1.6s cubic-bezier(0.65,0,0.35,1) infinite" }}
            />
          </span>
        </div>
        <div className="hero-meta-item font-mono-label text-[var(--ivory-38)] opacity-0">
          GRASS · CLAY · HARD
        </div>
      </div>

    </section>
  );
}
