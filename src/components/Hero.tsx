"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles, BadgeCheck } from "lucide-react";
import MagneticButton from "./MagneticButton";
import SmartImage from "./SmartImage";
import { IMAGES } from "@/lib/site";

const LINE_1 = ["Косметологія", "і", "естетика"];
const LINE_2 = ["обличчя", "та", "тіла."];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-word", {
        yPercent: 120,
        opacity: 0,
        duration: 1.3,
        stagger: 0.07,
        delay: 0.15,
      })
        .from(
          ".hero-sub",
          { y: 34, opacity: 0, filter: "blur(8px)", duration: 1.1 },
          "-=0.8"
        )
        .from(
          ".hero-cta",
          { y: 28, opacity: 0, duration: 0.9, stagger: 0.12 },
          "-=0.7"
        )
        .from(
          ".hero-photo",
          { scale: 1.12, opacity: 0, duration: 1.6, ease: "power3.out" },
          0.3
        )
        .from(
          ".hero-chip",
          { y: 24, opacity: 0, duration: 0.9, stagger: 0.15 },
          "-=0.9"
        );

      // Parallax фото при скролі
      gsap.to(".hero-photo-inner", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
      gsap.to(".hero-blob", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative overflow-hidden pt-[76px]"
    >
      {/* Декоративний фон */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="hero-blob absolute -left-40 top-24 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(141,183,72,0.18)_0%,transparent_65%)]" />
        <div className="hero-blob absolute -right-32 bottom-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(141,183,72,0.14)_0%,transparent_65%)]" />
        <svg
          className="absolute right-[38%] top-24 h-64 w-64 text-brand/25 animate-spin-slow max-lg:hidden"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle
            cx="100"
            cy="100"
            r="96"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 8"
          />
        </svg>
      </div>

      <div className="mx-auto grid max-w-[1360px] items-center gap-14 px-5 pb-16 pt-10 md:px-10 lg:min-h-[calc(100svh-76px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-20 lg:pt-0">
        {/* Ліва частина */}
        <div className="relative z-10">
          <p className="eyebrow mb-8">Rayskaya Beauty Space · Харків</p>

          <h1 className="h-display text-[clamp(2.5rem,5vw,4.5rem)]">
            <span className="block overflow-hidden pb-1">
              {LINE_1.map((w, i) => (
                <span
                  key={i}
                  className={`hero-word mr-[0.28em] inline-block ${
                    w === "естетика" ? "italic text-brand-deep" : ""
                  }`}
                >
                  {w}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden pb-2">
              {LINE_2.map((w, i) => (
                <span key={i} className="hero-word mr-[0.28em] inline-block">
                  {w}
                </span>
              ))}
            </span>
          </h1>

          <p className="hero-sub mt-7 max-w-md text-lg leading-relaxed text-olive md:text-xl">
            Індивідуальний підхід — <br className="max-sm:hidden" />
            сучасні методики.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-4">
            <span className="hero-cta">
              <MagneticButton
                href="#booking"
                className="items-center justify-center rounded-full bg-brand px-9 py-4.5 text-base font-semibold text-white shadow-[0_16px_40px_rgba(141,183,72,0.4)] transition-colors duration-300 hover:bg-brand-deep"
              >
                Записатися
              </MagneticButton>
            </span>
            <span className="hero-cta">
              <MagneticButton
                href="#contacts"
                className="items-center justify-center rounded-full border border-ink/15 bg-white/60 px-9 py-4.5 text-base font-semibold text-ink backdrop-blur transition-all duration-300 hover:border-brand hover:text-brand-deep"
              >
                Консультація
              </MagneticButton>
            </span>
          </div>

          <div className="mt-14 flex flex-wrap gap-x-10 gap-y-4 text-sm text-olive">
            <div className="flex items-center gap-2.5">
              <BadgeCheck className="h-5 w-5 text-brand-deep" />
              Сертифіковані косметологи
            </div>
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-brand-deep" />
              Понад 13 років досвіду
            </div>
          </div>
        </div>

        {/* Права частина — фото */}
        <div className="relative lg:h-[calc(100svh-76px)] lg:min-h-[620px]">
          <div className="hero-photo relative h-[440px] overflow-hidden rounded-[40px] shadow-[0_40px_90px_rgba(34,39,25,0.18)] sm:h-[540px] lg:absolute lg:inset-y-10 lg:left-0 lg:right-[-40px] lg:h-auto lg:rounded-[48px]">
            <SmartImage
              src={IMAGES.hero}
              alt="Косметологічна процедура у Rayskaya Beauty Space"
              className="hero-photo-inner absolute -inset-y-10 inset-x-0"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
          </div>

          {/* Плаваючі картки */}
          <div className="hero-chip absolute -left-4 bottom-24 animate-floaty-soft rounded-3xl border border-white/60 bg-white/80 px-6 py-4 shadow-[0_20px_50px_rgba(34,39,25,0.14)] backdrop-blur-xl max-sm:bottom-16 lg:-left-12">
            <p className="font-display text-3xl text-ink">13+</p>
            <p className="mt-0.5 text-[13px] font-medium text-olive">
              років досвіду
            </p>
          </div>
          <div className="hero-chip absolute -bottom-6 right-6 animate-floaty rounded-3xl bg-ink/90 px-6 py-4 text-white shadow-[0_24px_60px_rgba(34,39,25,0.3)] backdrop-blur-xl lg:right-0">
            <p className="text-[13px] font-medium text-white/70">
              Медичний підхід
            </p>
            <p className="mt-0.5 text-[15px] font-semibold">
              та естетика luxury
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
