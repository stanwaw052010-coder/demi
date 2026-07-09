"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { CalendarDays, Phone } from "lucide-react";
import { ADDRESS, CITY, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-in", {
          y: 30,
          opacity: 0,
          duration: 1.15,
          stagger: 0.12,
          delay: 0.1,
        });
      gsap.to(".hero-orb-a", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });
      gsap.to(".hero-orb-b", {
        yPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      aria-label="Головна секція"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-20 text-center sm:px-10"
      style={{
        background:
          "linear-gradient(150deg, #fdfdfb 0%, #f3f6e9 40%, #e6eed2 80%, #dbe6bf 100%)",
      }}
    >
      <div
        aria-hidden
        className="hero-orb-a pointer-events-none absolute -top-24 -right-28 size-[520px]"
        style={{
          background:
            "radial-gradient(circle, rgba(141,183,72,0.13) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="hero-orb-b pointer-events-none absolute -bottom-16 -left-20 size-[380px]"
        style={{
          background:
            "radial-gradient(circle, rgba(110,150,52,0.1) 0%, transparent 65%)",
        }}
      />

      <p className="hero-in mb-6 text-[11px] uppercase tracking-[0.3em] text-brand-deep">
        {CITY} · {ADDRESS}
      </p>
      <h1 className="hero-in font-display text-[clamp(52px,9vw,88px)] leading-[1.04] font-light tracking-[0.01em] text-ink">
        Rayskaya
        <br />
        <em className="italic text-brand-deep">Beauty</em>
      </h1>
      <div className="hero-in font-display text-[clamp(28px,4.5vw,46px)] font-light italic tracking-[0.03em] text-dark-mid opacity-70">
        Space
      </div>
      <p className="hero-in mx-auto mt-8 mb-12 max-w-md text-[15px] leading-[1.75] tracking-[0.02em] text-muted">
        Косметологія і естетика обличчя та тіла.
        <br />
        Індивідуальний підхід — сучасні методики.
      </p>
      <div className="hero-in flex flex-wrap justify-center gap-3.5">
        <MagneticButton
          href="#booking"
          className="gap-2 bg-brand px-9 py-4 text-[12px] font-normal uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:bg-brand-deep"
        >
          <CalendarDays className="size-4" strokeWidth={1.5} />
          Записатися онлайн
        </MagneticButton>
        <MagneticButton
          href={`tel:${PHONE_TEL}`}
          className="gap-2 border-[0.5px] border-ink/30 px-9 py-4 text-[12px] font-normal uppercase tracking-[0.14em] text-ink transition-colors duration-200 hover:border-brand-deep hover:text-brand-deep"
        >
          <Phone className="size-4" strokeWidth={1.5} />
          {PHONE_DISPLAY}
        </MagneticButton>
      </div>

      <div
        className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5"
        aria-hidden
      >
        <div
          className="animate-scroll-pulse h-12 w-px"
          style={{
            background: "linear-gradient(to bottom, #8db748, transparent)",
          }}
        />
        <span className="text-[10px] uppercase tracking-[0.22em] text-muted-light">
          Гортати
        </span>
      </div>
    </section>
  );
}
