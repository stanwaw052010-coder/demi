"use client";

import { useRef } from "react";
import { gsap } from "@/lib/studio/gsap";
import { useIsoLayoutEffect, useReducedMotion } from "@/lib/studio/hooks";
import { STUDIO } from "@/lib/studio/content";
import { SplitChars } from "./primitives/SplitText";
import Magnetic from "./primitives/Magnetic";

/**
 * The close. One question, one control — the fill grows from wherever the
 * pointer crossed the edge and drains back out the way it left.
 */
export default function BookingCTA() {
  const root = useRef<HTMLElement>(null);
  const button = useRef<HTMLAnchorElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    if (reduced !== false) return;
    const ctx = gsap.context(() => {
      gsap.from(".booking__line .char", {
        yPercent: 112,
        duration: 1.25,
        stagger: 0.022,
        ease: "expo.out",
        scrollTrigger: { trigger: ".booking__title", start: "top 84%", once: true },
      });
      gsap.from(".booking__aside > *", {
        autoAlpha: 0,
        y: 22,
        duration: 1,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: ".booking__aside", start: "top 90%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  const originFrom = (e: React.PointerEvent) => {
    const el = button.current;
    const circle = fill.current;
    if (!el || !circle) return null;
    const rect = el.getBoundingClientRect();
    circle.style.left = `${e.clientX - rect.left}px`;
    circle.style.top = `${e.clientY - rect.top}px`;
    return circle;
  };

  const onEnter = (e: React.PointerEvent) => {
    if (reduced !== false) return;
    const circle = originFrom(e);
    if (!circle) return;
    gsap.killTweensOf(circle);
    gsap.fromTo(
      circle,
      { scale: 0 },
      { scale: 1, duration: 0.72, ease: "expo.out" }
    );
  };

  const onLeave = (e: React.PointerEvent) => {
    if (reduced !== false) return;
    const circle = originFrom(e);
    if (!circle) return;
    gsap.killTweensOf(circle);
    gsap.to(circle, { scale: 0, duration: 0.55, ease: "expo.in" });
  };

  return (
    <section ref={root} id="contact" className="booking" aria-labelledby="booking-title">
      <div className="shell">
        <header className="section-head">
          <p className="meta">(07) — Booking</p>
          <p className="meta meta--muted">Two weeks ahead, on average</p>
        </header>

        <h2 id="booking-title" className="booking__title display">
          <span className="booking__line">
            <SplitChars text="Ready for your" />
          </span>
          <span className="booking__line booking__line--italic display--italic">
            <SplitChars text="next set?" />
          </span>
        </h2>

        <div className="booking__row">
          <Magnetic className="booking__magnet" strength={0.2} radius={140}>
            <a
              ref={button}
              className="booking__button"
              href={`mailto:${STUDIO.email}?subject=Appointment%20request`}
              data-cursor="label:BOOK"
              onPointerEnter={onEnter}
              onPointerLeave={onLeave}
            >
              <span ref={fill} className="booking__fill" aria-hidden />
              <span className="booking__button-label">
                Book your appointment
              </span>
              <span className="booking__button-arrow" aria-hidden>
                ↗
              </span>
            </a>
          </Magnetic>

          <div className="booking__aside">
            <div>
              <p className="meta meta--muted">Direct</p>
              <a className="u-line booking__link" href={`tel:${STUDIO.phone.replace(/\s/g, "")}`}>
                {STUDIO.phone}
              </a>
            </div>
            <div>
              <p className="meta meta--muted">Hours</p>
              {STUDIO.hours.map((line) => (
                <p key={line} className="booking__link">
                  {line}
                </p>
              ))}
            </div>
            <div>
              <p className="meta meta--muted">Studio</p>
              {STUDIO.address.map((line) => (
                <p key={line} className="booking__link">
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
