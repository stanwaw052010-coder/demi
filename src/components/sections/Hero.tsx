"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";
import { Particles } from "@/components/fx/Particles";
import { Marquee } from "@/components/ui/Marquee";
import { Pic } from "@/components/ui/Pic";
import { PillButton } from "@/components/ui/PillButton";
import { splitNodes } from "@/components/ui/Split";
import { IMAGES, MARQUEE_ITEMS } from "@/data/content";

export function Hero() {
  const { ready, scrollTo } = useApp();
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // entrance — begins the moment the preloader curtain lifts
  useEffect(() => {
    if (!ready || !rootRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        imageRef.current,
        { scale: 1.25 },
        { scale: 1.06, duration: 2.6, ease: "power2.out" },
        0,
      )
        .fromTo(
          "[data-hero-kicker]",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1 },
          0.35,
        )
        .fromTo(
          "[data-hero-title] .split-unit",
          { yPercent: 118, rotate: 4 },
          { yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.06 },
          0.45,
        )
        .fromTo(
          "[data-hero-sub]",
          { opacity: 0, filter: "blur(12px)", y: 20 },
          { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.2 },
          1.05,
        )
        .fromTo(
          "[data-hero-copy], [data-hero-cta]",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          1.2,
        )
        .fromTo(
          "[data-hero-foot]",
          { opacity: 0 },
          { opacity: 1, duration: 1.2 },
          1.5,
        );

      // endless slow breath on the image after the entrance
      gsap.to(imageRef.current, {
        scale: 1.12,
        duration: 16,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2.6,
      });

      // scroll exit — scene sinks like a film dolly
      gsap.to(contentRef.current, {
        yPercent: 18,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "85% top",
          scrub: 0.5,
        },
      });
      gsap.to(imageRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [ready]);

  // mouse parallax — every layer breathes with the cursor
  useEffect(() => {
    if (!fine || reduced || !rootRef.current) return;
    const root = rootRef.current;
    const layers = root.querySelectorAll<HTMLElement>("[data-depth]");
    const movers = Array.from(layers).map((el) => ({
      depth: parseFloat(el.dataset.depth ?? "0"),
      x: gsap.quickTo(el, "x", { duration: 1.4, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 1.4, ease: "power3.out" }),
    }));
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      for (const m of movers) {
        m.x(nx * m.depth * 60);
        m.y(ny * m.depth * 60);
      }
    };
    root.addEventListener("mousemove", onMove, { passive: true });
    return () => root.removeEventListener("mousemove", onMove);
  }, [fine, reduced]);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
      aria-label="LUMÉA — beauty atelier"
    >
      {/* photographic ground */}
      <div data-depth="-0.25" className="absolute -inset-[4%]">
        <div ref={imageRef} className="h-full w-full will-change-transform">
          <Pic
            src={IMAGES.hero}
            alt="Editorial beauty portrait in golden light"
            className="h-full w-full"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
      </div>

      {/* drifting light leaks */}
      <div
        data-depth="0.9"
        className="light-leak top-[8%] right-[6%] h-[42vmin] w-[42vmin]"
        style={{ background: "radial-gradient(circle, rgba(216,191,154,0.30), transparent 65%)" }}
      />
      <div
        data-depth="0.55"
        className="light-leak bottom-[22%] left-[38%] h-[34vmin] w-[34vmin]"
        style={{ background: "radial-gradient(circle, rgba(179,146,78,0.22), transparent 65%)" }}
      />

      {/* golden dust */}
      <Particles className="absolute inset-0 h-full w-full" count={70} />

      {/* composition */}
      <div ref={contentRef} className="relative z-10 px-6 pt-28 pb-12 md:px-10 md:pb-14">
        <p data-hero-kicker data-depth="0.16" className="label-mono mb-6 opacity-0">
          Beauty Atelier — Est. 2014, Kyiv
        </p>

        <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-10">
          <h1
            data-hero-title
            data-depth="0.1"
            aria-label="LUMÉA"
            className="h-display text-[clamp(4.6rem,17.5vw,17rem)] text-ivory"
          >
            <span aria-hidden>{splitNodes("LUMÉA", "chars")}</span>
          </h1>

          <div className="max-w-md pb-[1.2vw]" data-depth="0.2">
            <p
              data-hero-sub
              className="font-serif-display mb-5 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight italic opacity-0"
            >
              where light learns
              <br /> to linger
            </p>
            <p data-hero-copy className="mb-8 max-w-sm text-sm leading-relaxed text-ivory/60 opacity-0">
              An atelier of quiet luxury. Hair, skin and self — measured,
              mixed and finished by hand, the way couture is.
            </p>
            <div data-hero-cta className="flex flex-wrap items-center gap-5 opacity-0">
              <PillButton onClick={() => scrollTo("#reserve")}>Reserve a visit</PillButton>
              <button
                onClick={() => scrollTo("#manifesto")}
                data-cursor
                data-cursor-text="Down"
                className="link-sweep font-mono text-[11px] tracking-[0.26em] text-ivory/70 uppercase"
              >
                Explore the atelier ↓
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* service belt */}
      <div data-hero-foot className="hairline-t relative z-10 opacity-0">
        <Marquee duration={36} className="py-4">
          {MARQUEE_ITEMS.map((item) => (
            <span key={item} className="flex items-center">
              <span className="font-serif-display px-6 text-lg text-ivory/70 italic">
                {item}
              </span>
              <span className="text-champagne/70">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
