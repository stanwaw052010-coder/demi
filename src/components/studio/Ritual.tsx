"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/studio/gsap";
import { useIsoLayoutEffect, useReducedMotion } from "@/lib/studio/hooks";
import { scrollToSection } from "@/lib/studio/scroll";
import { SERVICES } from "@/lib/studio/content";
import RevealMedia from "./primitives/RevealMedia";

/**
 * The service index. On a pointer device the panel stays put while the list
 * is walked through — by scroll position, or by hover, whichever moved last.
 * The plate on the right wipes between treatments and the ground tint drifts
 * with them. On narrow screens the same data reads as a stack of editorial
 * entries, each with its own plate.
 */
export default function Ritual() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  /* Scroll drives the index while the section is held. */
  useIsoLayoutEffect(() => {
    if (reduced === null) return;
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const next = Math.min(
            SERVICES.length - 1,
            Math.floor(self.progress * SERVICES.length * 1.0001)
          );
          setActive((current) => (current === next ? current : next));
        },
      });
    });

    return () => mm.revert();
  }, [reduced]);

  /* Plate + tint respond to the index. */
  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || reduced === null) return;

    const ctx = gsap.context(() => {
      const plates = gsap.utils.toArray<HTMLElement>(".ritual__plate");
      plates.forEach((plate, i) => {
        const isActive = i === active;
        gsap.to(plate, {
          clipPath: isActive ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
          duration: reduced ? 0.15 : 0.95,
          ease: "expo.inOut",
          overwrite: true,
        });
        gsap.to(plate.querySelector("img"), {
          scale: isActive ? 1 : 1.14,
          duration: reduced ? 0.15 : 1.3,
          ease: "expo.out",
          overwrite: true,
        });
      });

      gsap.to(".ritual__sticky", {
        backgroundColor: SERVICES[active].tint,
        duration: reduced ? 0.15 : 1.1,
        ease: "power2.out",
      });
    }, root);

    return () => ctx.revert();
  }, [active, reduced]);

  /* Entrance for the heading. */
  useIsoLayoutEffect(() => {
    if (reduced !== false) return;
    const ctx = gsap.context(() => {
      gsap.from(".ritual__head > *", {
        yPercent: 60,
        autoAlpha: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ritual__head", start: "top 88%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      id="services"
      className="ritual"
      aria-labelledby="ritual-title"
      style={{ ["--ritual-steps" as string]: SERVICES.length }}
    >
      <div className="ritual__sticky">
        <div className="shell ritual__inner">
          <header className="section-head ritual__head">
            <h2 id="ritual-title" className="display ritual__title">
              The Ritual
            </h2>
            <p className="meta meta--muted">(02) — Five treatments</p>
          </header>

          <div className="ritual__body">
            <ol className="ritual__list">
              {SERVICES.map((service, i) => (
                <li
                  key={service.index}
                  className="ritual__item"
                  data-active={i === active || undefined}
                >
                  <button
                    type="button"
                    className="ritual__row"
                    data-cursor="hover"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => scrollToSection("contact")}
                    aria-describedby={`ritual-copy-${service.index}`}
                  >
                    <span className="meta num ritual__index">{service.index}</span>
                    <span className="ritual__name display">{service.title}</span>
                    <span className="ritual__price meta num">{service.price}</span>
                  </button>

                  <div className="ritual__detail">
                    <div className="ritual__detail-inner">
                      <p
                        className="ritual__copy"
                        id={`ritual-copy-${service.index}`}
                      >
                        {service.copy}
                      </p>
                      <p className="meta meta--muted ritual__duration">
                        {service.sub} · {service.duration}
                      </p>
                    </div>
                  </div>

                  <div className="ritual__item-media">
                    <RevealMedia media={service.media} scale={1.12} />
                  </div>
                </li>
              ))}
            </ol>

            <div className="ritual__stage" aria-hidden>
              {SERVICES.map((service, i) => (
                <figure
                  key={service.index}
                  className="ritual__plate"
                  style={{ zIndex: i === active ? 2 : 1 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.media.src}
                    alt=""
                    width={service.media.width}
                    height={service.media.height}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
              <figcaption className="meta ritual__stage-caption">
                {SERVICES[active].index} / {String(SERVICES.length).padStart(2, "0")}
                <span>{SERVICES[active].duration}</span>
              </figcaption>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
