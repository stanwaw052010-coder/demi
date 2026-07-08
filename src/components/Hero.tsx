"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, Sparkles } from "lucide-react";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const LINES = ["Косметологія", "і естетика", "обличчя та тіла."];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const ease = "power4.out";
      gsap
        .timeline({ defaults: { ease } })
        .from(".hero-line > span", {
          yPercent: 115,
          duration: 1.4,
          stagger: 0.12,
          delay: 0.15,
        })
        .from(
          ".hero-sub",
          { y: 26, opacity: 0, filter: "blur(8px)", duration: 1.1 },
          "-=0.9",
        )
        .from(
          ".hero-ctas",
          { y: 22, opacity: 0, duration: 0.9 },
          "-=0.8",
        )
        .from(
          ".hero-visual",
          { y: 60, opacity: 0, scale: 0.96, duration: 1.5, ease: "power3.out" },
          0.35,
        )
        .from(
          ".hero-meta",
          { opacity: 0, y: 14, duration: 0.8 },
          "-=0.7",
        );

      // gentle parallax on scroll
      gsap.to(".hero-visual", {
        yPercent: 9,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.2 },
      });
      gsap.to(".hero-blob-a", {
        yPercent: 24,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.6 },
      });
      gsap.to(".hero-blob-b", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1.6 },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative overflow-hidden pt-28 lg:pt-36"
    >
      {/* decorative green field */}
      <div
        aria-hidden
        className="hero-blob-a pointer-events-none absolute -top-40 right-[-14%] size-[560px] rounded-full bg-brand-mist blur-3xl"
      />
      <div
        aria-hidden
        className="hero-blob-b pointer-events-none absolute bottom-[-30%] left-[-10%] size-[480px] rounded-full bg-brand/15 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24">
        <div className="relative z-10">
          <p className="hero-meta mb-7 inline-flex items-center gap-2.5 rounded-full border border-brand/30 bg-white/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-olive backdrop-blur">
            <Sparkles className="size-3.5 text-brand" strokeWidth={1.75} />
            Beauty space · Харків
          </p>

          <h1 className="font-display text-[13vw] leading-[1.04] font-medium tracking-tight text-ink sm:text-6xl lg:text-[4.6rem] xl:text-[5.2rem]">
            {LINES.map((line, i) => (
              <span key={i} className="split-line hero-line">
                <span>
                  {i === 2 ? (
                    <>
                      <em className="font-display font-normal italic text-olive">
                        обличчя
                      </em>{" "}
                      та тіла.
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-sub mt-7 max-w-md text-lg leading-relaxed text-stone">
            Індивідуальний підхід — сучасні методики.
          </p>

          <div className="hero-ctas mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#booking"
              className="rounded-full bg-brand px-9 py-4.5 text-base font-semibold text-white shadow-[0_18px_44px_-14px_rgba(141,183,72,0.95)] transition-colors duration-300 hover:bg-olive"
            >
              Записатися
            </MagneticButton>
            <MagneticButton
              href="#booking"
              className="gap-2 rounded-full border border-ink/15 bg-white/50 px-9 py-4.5 text-base font-semibold text-ink backdrop-blur transition-colors duration-300 hover:border-brand hover:text-olive"
            >
              Консультація
              <ArrowDownRight className="size-4.5" strokeWidth={1.75} />
            </MagneticButton>
          </div>

          <div className="hero-meta mt-14 flex items-center gap-8 border-t border-ink/10 pt-7 text-sm text-stone">
            <div>
              <p className="font-display text-2xl text-ink">13+ років</p>
              <p className="mt-1">досвіду фахівців</p>
            </div>
            <span className="h-10 w-px bg-ink/10" aria-hidden />
            <div>
              <p className="font-display text-2xl text-ink">5 напрямів</p>
              <p className="mt-1">косметології</p>
            </div>
            <span className="hidden h-10 w-px bg-ink/10 sm:block" aria-hidden />
            <div className="hidden sm:block">
              <p className="font-display text-2xl text-ink">100%</p>
              <p className="mt-1">сертифіковані препарати</p>
            </div>
          </div>
        </div>

        {/* visual */}
        <div className="hero-visual relative">
          <div className="grain relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-[0_40px_90px_-30px_rgba(52,66,31,0.45)]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/hero-visual.jpg)" }}
            />
            {/* stylised interior: green wall + shelves silhouette */}
            <svg
              viewBox="0 0 400 500"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              <defs>
                <linearGradient id="heroGlass" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0.06" />
                </linearGradient>
              </defs>
              <g stroke="#5e7a34" strokeOpacity="0.35" strokeWidth="1" fill="none">
                <circle cx="318" cy="96" r="70" />
                <circle cx="318" cy="96" r="102" strokeOpacity="0.18" />
                <path d="M-20 380 Q 120 320 200 372 T 420 356" strokeOpacity="0.3" />
                <path d="M-20 404 Q 130 348 210 396 T 420 382" strokeOpacity="0.18" />
              </g>
              <g
                className="animate-float"
                style={{ transformOrigin: "80px 220px" }}
                transform="translate(0 74)"
              >
                <rect x="42" y="108" width="86" height="120" rx="18" fill="url(#heroGlass)" />
                <rect x="58" y="128" width="54" height="7" rx="3.5" fill="#5e7a34" opacity="0.4" />
                <rect x="58" y="145" width="38" height="7" rx="3.5" fill="#5e7a34" opacity="0.25" />
                <circle cx="70" cy="196" r="12" fill="#8db748" opacity="0.55" />
                <rect x="90" y="188" width="24" height="16" rx="8" fill="#5e7a34" opacity="0.3" />
              </g>
            </svg>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7">
              <div className="rounded-3xl bg-white/70 px-5 py-4 backdrop-blur-md">
                <p className="font-display text-lg leading-snug text-deep">
                  Простір краси,
                  <br />
                  де турбота — це естетика
                </p>
              </div>
            </div>
          </div>

          {/* floating badge */}
          <div className="animate-float-slow absolute -left-6 top-10 hidden rounded-3xl border border-white/60 bg-white/80 px-5 py-4 shadow-[0_24px_50px_-24px_rgba(52,66,31,0.4)] backdrop-blur-md lg:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-olive">
              Онлайн-запис
            </p>
            <p className="mt-1 text-sm font-medium text-ink">
              у власному застосунку
            </p>
          </div>

          <div
            aria-hidden
            className="absolute -right-8 -top-8 -z-10 size-40 rounded-full border border-brand/40"
          />
          <div
            aria-hidden
            className="absolute -bottom-10 -left-10 -z-10 size-56 rounded-full bg-brand/20 blur-2xl"
          />
        </div>
      </div>
    </section>
  );
}
