"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/studio/gsap";
import { useIsoLayoutEffect, useReducedMotion } from "@/lib/studio/hooks";
import { WORKS } from "@/lib/studio/content";

/**
 * Selected work, read sideways.
 *
 * ≥1024px: the section pins and the track travels horizontally under the
 * scroll, plates set at five different heights so the eye never settles into a
 * grid. Each plate drifts a little against the pointer.
 *
 * Below that the same track becomes a native snap-scrolling rail — touch does
 * the work, nothing is pinned, and no scroll listener runs.
 */
export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    if (reduced === null) return;
    const section = root.current;
    const rail = track.current;
    if (!section || !rail) return;

    const mm = gsap.matchMedia();

    mm.add(
      { desktop: "(min-width: 1024px)", motion: "(prefers-reduced-motion: no-preference)" },
      (context) => {
        if (!context.conditions?.desktop || !context.conditions?.motion) return;

        const distance = () => Math.max(0, rail.scrollWidth - window.innerWidth);

        const tween = gsap.to(rail, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        /* Plates arrive as they cross into frame. */
        const plates = gsap.utils.toArray<HTMLElement>(".work__plate", rail);
        plates.forEach((plate) => {
          gsap.fromTo(
            plate,
            { clipPath: "inset(0% 0% 100% 0%)", scale: 0.96 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              duration: 1.15,
              ease: "expo.out",
              scrollTrigger: {
                trigger: plate,
                containerAnimation: tween,
                start: "left 92%",
                once: true,
              },
            }
          );
        });

        /* Pointer drift. */
        const setters = plates.map((plate) => ({
          el: plate,
          x: gsap.quickTo(plate.querySelector("img"), "x", {
            duration: 0.9,
            ease: "power3.out",
          }),
          y: gsap.quickTo(plate.querySelector("img"), "y", {
            duration: 0.9,
            ease: "power3.out",
          }),
        }));

        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          setters.forEach(({ x, y }, i) => {
            const depth = 8 + (i % 3) * 7;
            x(-nx * depth);
            y(-ny * depth);
          });
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      }
    );

    return () => mm.revert();
  }, [reduced]);

  useIsoLayoutEffect(() => {
    if (reduced !== false) return;
    const ctx = gsap.context(() => {
      gsap.from(".gallery__head > *", {
        yPercent: 60,
        autoAlpha: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: ".gallery__head", start: "top 90%", once: true },
      });
    }, root);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} id="work" className="gallery" aria-labelledby="gallery-title">
      <div className="gallery__frame">
        <header className="section-head gallery__head shell">
          <h2 id="gallery-title" className="display gallery__title">
            Selected work
          </h2>
          <p className="meta meta--muted">(03) — {WORKS.length} sets · 2023—2025</p>
        </header>

        <ul ref={track} className="gallery__track">
          {WORKS.map((work) => (
            <li key={work.no} className="work" data-span={work.span}>
              <figure className="work__figure">
                <div
                  className="work__plate"
                  data-cursor="label:VIEW"
                  tabIndex={0}
                  role="img"
                  aria-label={`${work.title} — ${work.category}. ${work.media.alt}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={work.media.src}
                    alt=""
                    width={work.media.width}
                    height={work.media.height}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                  <span className="meta num work__no">No. {work.no}</span>
                </div>
                <figcaption className="work__caption">
                  <span className="work__title">{work.title}</span>
                  <span className="meta meta--muted work__category">
                    {work.category}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
          <li className="work work--end" aria-hidden>
            <p className="display work__end">
              More
              <br />
              on request
            </p>
          </li>
        </ul>

        <p className="meta meta--muted gallery__hint shell">
          <span className="gallery__hint-desktop">Scroll to travel the archive</span>
          <span className="gallery__hint-touch">Swipe the archive →</span>
        </p>
      </div>
    </section>
  );
}
