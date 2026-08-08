"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/studio/gsap";
import { useIsoLayoutEffect, useReducedMotion } from "@/lib/studio/hooks";
import { lockScroll, unlockScroll } from "@/lib/studio/scroll";
import { useIntro } from "@/lib/studio/intro";
import { STUDIO } from "@/lib/studio/content";
import { SplitChars } from "./primitives/SplitText";

const SESSION_KEY = "atelier-ivoire:intro";

/**
 * Opening sequence.
 *
 *   0.00  ground
 *   0.20  metadata + progress rule
 *   0.35  wordmark rises, glyph by glyph
 *   0.40  counter runs 000 → 100
 *   1.75  wordmark clears
 *   1.95  curtain lifts — the hero is already animating underneath
 *
 * Replayed once per session. Under reduced motion it collapses to a short
 * cross-fade, and with JavaScript disabled it never paints at all.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const { reveal } = useIntro();
  const [done, setDone] = useState(false);

  useIsoLayoutEffect(() => {
    if (reduced === null) return;
    const el = root.current;
    if (!el) return;

    const seen =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem(SESSION_KEY) === "1";

    const finish = () => {
      setDone(true);
      unlockScroll();
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* private mode — replay the intro, no harm done */
      }
    };

    lockScroll();
    window.scrollTo(0, 0);

    if (reduced || seen) {
      const tl = gsap.timeline({
        onComplete: finish,
        defaults: { ease: "power2.inOut" },
      });
      tl.to(el, { autoAlpha: 0, duration: reduced ? 0.2 : 0.45 }, 0).add(
        reveal,
        0
      );
      return () => {
        tl.kill();
      };
    }

    const ctx = gsap.context(() => {
      const count = { value: 0 };
      const tl = gsap.timeline({ onComplete: finish });

      tl.from(".pre-meta", {
        autoAlpha: 0,
        y: 12,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      })
        .fromTo(
          ".pre-rule span",
          { scaleX: 0 },
          { scaleX: 1, duration: 2.1, ease: "power2.inOut" },
          0.1
        )
        .from(
          ".pre-mark .char",
          {
            yPercent: 118,
            duration: 1.25,
            stagger: 0.045,
            ease: "expo.out",
          },
          0.28
        )
        .to(
          count,
          {
            value: 100,
            duration: 1.85,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current) {
                counter.current.textContent = String(
                  Math.round(count.value)
                ).padStart(3, "0");
              }
            },
          },
          0.32
        )
        .to(
          ".pre-mark .char",
          {
            yPercent: -118,
            duration: 0.95,
            stagger: 0.028,
            ease: "expo.inOut",
          },
          1.78
        )
        .to(".pre-meta, .pre-rule", { autoAlpha: 0, duration: 0.5 }, 1.82)
        .to(
          el,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1.15,
            ease: "expo.inOut",
          },
          1.98
        )
        .add(reveal, 2.02);
    }, root);

    return () => ctx.revert();
  }, [reduced, reveal]);

  if (done) return null;

  return (
    <div
      ref={root}
      className="studio-preloader"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="studio-preloader__inner">
        <p className="meta pre-meta">{STUDIO.label}</p>
        <h1 className="display pre-mark">
          <SplitChars text={STUDIO.mark} />
        </h1>
        <div className="pre-foot">
          <p className="meta pre-meta">Preparing the studio</p>
          <p className="meta num pre-meta">
            <span ref={counter}>000</span>
          </p>
        </div>
        <div className="pre-rule">
          <span />
        </div>
      </div>
    </div>
  );
}
