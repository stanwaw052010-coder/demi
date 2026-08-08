"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/studio/gsap";
import { useIsoLayoutEffect, useReducedMotion } from "@/lib/studio/hooks";
import { useIntro } from "@/lib/studio/intro";
import { scrollToSection } from "@/lib/studio/scroll";
import { HERO_MEDIA, STUDIO } from "@/lib/studio/content";
import { SplitChars } from "./primitives/SplitText";
import Magnetic from "./primitives/Magnetic";

const LINES = ["Beauty", "in every", "detail."];

/**
 * The opening frame. Type is set in three masked lines that arrive glyph by
 * glyph while the plate behind them uncovers; on scroll the whole composition
 * separates into layers at different speeds.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { revealed } = useIntro();
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    if (reduced === null || reduced) return;
    const ctx = gsap.context(() => {
      gsap.set(".hero__plate", { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(".hero__plate img", { scale: 1.22 });
      gsap.set(".hero__line .char", { yPercent: 116 });
      gsap.set(".hero__fade", { autoAlpha: 0, y: 18 });
      gsap.set(".hero__aside", { clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(".hero__rule span", { scaleX: 0 });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  /* Entrance — cued by the preloader curtain. */
  useEffect(() => {
    if (!revealed || reduced === null || reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(".hero__plate", {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.6,
        ease: "expo.inOut",
      })
        .to(".hero__plate img", { scale: 1, duration: 2.2 }, 0)
        .to(
          ".hero__line .char",
          { yPercent: 0, duration: 1.35, stagger: 0.028 },
          0.32
        )
        .to(
          ".hero__rule span",
          { scaleX: 1, duration: 1.4, ease: "power3.inOut" },
          0.5
        )
        .to(
          ".hero__fade",
          { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.09 },
          0.72
        )
        .to(
          ".hero__aside",
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" },
          0.95
        );
    }, root);
    return () => ctx.revert();
  }, [revealed, reduced]);

  /* Scroll separation. */
  useIsoLayoutEffect(() => {
    if (reduced !== false) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      tl.to(".hero__type", { yPercent: -34, ease: "none" }, 0)
        .to(".hero__plate img", { yPercent: 12, scale: 1.08, ease: "none" }, 0)
        .to(".hero__aside", { yPercent: -22, ease: "none" }, 0)
        .to(".hero__foot", { autoAlpha: 0, ease: "none", duration: 0.4 }, 0);
    }, root);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} id="home" className="hero" aria-label="Introduction">
      <div className="hero__plate" data-cursor="label:EXPLORE">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_MEDIA.primary.src}
          alt={HERO_MEDIA.primary.alt}
          width={HERO_MEDIA.primary.width}
          height={HERO_MEDIA.primary.height}
          fetchPriority="high"
          decoding="sync"
        />
      </div>

      <div className="hero__grid shell">
        <p className="meta hero__label hero__fade">{STUDIO.label}</p>

        <h1 className="hero__type display">
          {LINES.map((line, i) => (
            <span className="hero__line" key={line} data-line={i}>
              <SplitChars text={line} />
            </span>
          ))}
        </h1>

        <div className="hero__rule" aria-hidden>
          <span />
        </div>

        <div className="hero__foot">
          <div className="hero__cta hero__fade">
            <Magnetic strength={0.28} radius={90}>
              <button
                type="button"
                className="cta-inline"
                data-cursor="label:BOOK"
                onClick={() => scrollToSection("contact")}
              >
                <span className="cta-inline__text">Book appointment</span>
                <span className="cta-inline__arrow" aria-hidden>
                  ↗
                </span>
              </button>
            </Magnetic>
            <p className="meta meta--muted hero__cta-note hero__fade">
              By appointment only · {STUDIO.city}
            </p>
          </div>

          <button
            type="button"
            className="hero__scroll hero__fade meta"
            onClick={() => scrollToSection("services")}
          >
            Scroll to explore
            <span className="hero__scroll-arrow" aria-hidden>
              ↓
            </span>
          </button>
        </div>
      </div>

      <figure className="hero__aside">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_MEDIA.secondary.src}
          alt={HERO_MEDIA.secondary.alt}
          width={HERO_MEDIA.secondary.width}
          height={HERO_MEDIA.secondary.height}
          loading="lazy"
          decoding="async"
        />
        <figcaption className="meta hero__aside-caption">
          Fig. 01 — Coffin / Noir
        </figcaption>
      </figure>
    </section>
  );
}
