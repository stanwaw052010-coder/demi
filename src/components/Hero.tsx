"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import MagneticButton from "./MagneticButton";
import SmartImage from "./SmartImage";
import { IMAGES } from "@/lib/site";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-logo", {
        y: 34,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.2,
        delay: 0.15,
      })
        .from(
          ".hero-sub",
          { y: 30, opacity: 0, filter: "blur(8px)", duration: 1.1 },
          "-=0.75"
        )
        .from(
          ".hero-cta",
          { y: 28, opacity: 0, duration: 0.9 },
          "-=0.7"
        )
        .from(
          ".hero-photo",
          { scale: 1.12, opacity: 0, duration: 1.6, ease: "power3.out" },
          0.3
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
        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
          <Image
            src="/logo/rayskaya-dark.svg"
            alt="Rayskaya Beauty Space"
            width={520}
            height={153}
            priority
            className="hero-logo h-auto w-[280px] sm:w-[360px] md:w-[420px] lg:w-[460px]"
          />

          <p className="hero-sub mt-8 max-w-lg text-lg leading-relaxed text-olive md:text-xl">
            Косметологія і естетика обличчя та тіла.{" "}
            <br className="max-sm:hidden" />
            Індивідуальний підхід — сучасні методики.
          </p>

          <div className="mt-11 hero-cta">
            <MagneticButton
              href="#booking"
              className="items-center justify-center rounded-full bg-brand px-9 py-4.5 text-base font-semibold text-white shadow-[0_16px_40px_rgba(141,183,72,0.4)] transition-colors duration-300 hover:bg-brand-deep"
            >
              Записатися онлайн
            </MagneticButton>
          </div>
        </div>

        {/* Права частина — фото */}
        <div className="relative lg:h-[calc(100svh-76px)] lg:min-h-[620px]">
          <div className="hero-photo relative h-[440px] overflow-hidden rounded-[40px] shadow-[0_40px_90px_rgba(34,39,25,0.18)] sm:h-[540px] lg:absolute lg:inset-y-10 lg:left-0 lg:right-[-40px] lg:h-auto lg:rounded-[48px]">
            <SmartImage
              src={IMAGES.hero.src}
              fallbackSrc={IMAGES.hero.fallback}
              alt="Косметологічна процедура у Rayskaya Beauty Space"
              className="hero-photo-inner absolute -inset-y-10 inset-x-0"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
