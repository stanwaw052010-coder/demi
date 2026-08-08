"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/studio/gsap";
import { useIsoLayoutEffect, useReducedMotion } from "@/lib/studio/hooks";
import { TESTIMONIALS } from "@/lib/studio/content";
import { SplitWords } from "./primitives/SplitText";

const DWELL = 7000;

/**
 * One voice at a time, at full size. Advances on a timer that pauses on hover,
 * on focus, and whenever the section is off screen; arrow keys move it by hand.
 */
export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  const go = useCallback((delta: number) => {
    setIndex((i) => (i + delta + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  /* Only run the timer while the section is actually on screen. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || paused) return;
    const id = window.setTimeout(() => go(1), DWELL);
    return () => window.clearTimeout(id);
  }, [visible, paused, index, go]);

  /* Progress bar mirrors the timer. */
  useIsoLayoutEffect(() => {
    const el = bar.current;
    if (!el) return;
    gsap.killTweensOf(el);
    if (reduced || !visible || paused) {
      gsap.set(el, { scaleX: paused ? undefined : 0 });
      return;
    }
    gsap.fromTo(
      el,
      { scaleX: 0 },
      { scaleX: 1, duration: DWELL / 1000, ease: "none" }
    );
  }, [index, visible, paused, reduced]);

  /* Quote transition. */
  useIsoLayoutEffect(() => {
    if (reduced !== false) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(".quote__mark", { autoAlpha: 0, duration: 0.6 }, 0)
        .from(
          ".quote__body .word",
          { yPercent: 110, duration: 1.05, stagger: 0.035 },
          0
        )
        .from(".quote__by > *", { autoAlpha: 0, y: 14, stagger: 0.07 }, 0.25);
    }, stage);
    return () => ctx.revert();
  }, [index, reduced]);

  const current = TESTIMONIALS[index];

  return (
    <section
      ref={root}
      className="voices"
      aria-labelledby="voices-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="shell voices__inner">
        <header className="section-head voices__head">
          <p className="meta" id="voices-title">
            (06) — In their words
          </p>
          <p className="meta meta--muted num">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(TESTIMONIALS.length).padStart(2, "0")}
          </p>
        </header>

        <div
          ref={stage}
          className="voices__stage"
          aria-live="polite"
          aria-atomic="true"
        >
          <blockquote className="quote" key={index}>
            <span className="quote__mark display" aria-hidden>
              “
            </span>
            <p className="quote__body display">
              <SplitWords text={current.quote} />
            </p>
            <footer className="quote__by">
              <span className="quote__name">{current.name}</span>
              <span className="meta meta--muted">{current.meta}</span>
            </footer>
          </blockquote>
        </div>

        <div className="voices__controls">
          <div className="voices__bar" aria-hidden>
            <span ref={bar} />
          </div>
          <div className="voices__buttons">
            <button
              type="button"
              className="meta voices__btn"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              data-cursor="hover"
            >
              ←
            </button>
            <button
              type="button"
              className="meta voices__btn"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              data-cursor="hover"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
