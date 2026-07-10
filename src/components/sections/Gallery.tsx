"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useSectionTheme } from "@/lib/hooks";
import { Pic } from "@/components/ui/Pic";
import { IMAGES } from "@/data/content";

/**
 * Pinned horizontal promenade. The page stops, the wall of
 * photographs travels instead; every plate drifts inside its own
 * frame at a slightly different pace (parallax within parallax).
 * Falls back to a native snap-scroll strip on touch/small screens.
 */
export function Gallery() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  useSectionTheme(rootRef, "dark");

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current)
              barRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      // each plate drifts inside its frame while the wall travels
      gsap.utils.toArray<HTMLElement>("[data-plate-img]", track).forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -7, scale: 1.18 },
          {
            xPercent: 7,
            scale: 1.18,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });

      // captions surface as their plate arrives
      gsap.utils.toArray<HTMLElement>("[data-plate]", track).forEach((plate) => {
        gsap.fromTo(
          plate,
          { y: 40, opacity: 0.4 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: plate,
              containerAnimation: tween,
              start: "left 92%",
              once: true,
            },
          },
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="gallery"
      className="relative overflow-hidden"
      data-cursor
      data-cursor-text="Scroll"
    >
      <div className="flex h-svh flex-col justify-center">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory items-center gap-[7vw] overflow-x-auto px-[7vw] py-6 will-change-transform md:snap-none md:overflow-visible"
        >
          {/* frontispiece */}
          <div className="w-[76vw] shrink-0 snap-center md:w-[30vw]" data-plate>
            <span className="label-mono mb-8 block">03 — Selected works</span>
            <h2 className="h-display text-[clamp(2.6rem,5.5vw,5.2rem)]">
              Seven
              <br />
              <em className="text-champagne">plates</em>
            </h2>
            <p className="mt-8 max-w-[26ch] text-sm leading-relaxed opacity-55">
              Unretouched work, photographed on the atelier floor in
              available light.
            </p>
          </div>

          {IMAGES.gallery.map((item, i) => (
            <figure
              key={item.src}
              data-plate
              className={`group shrink-0 snap-center ${
                i % 3 === 0
                  ? "w-[72vw] self-center md:w-[30vw]"
                  : i % 3 === 1
                    ? "w-[64vw] self-start pt-[6vh] md:w-[22vw]"
                    : "w-[68vw] self-end pb-[4vh] md:w-[26vw]"
              }`}
            >
              <div
                className={`overflow-hidden ${
                  i % 3 === 1 ? "aspect-[3/4]" : i % 3 === 2 ? "aspect-[4/5]" : "aspect-[5/6]"
                }`}
              >
                <div data-plate-img className="h-full w-full will-change-transform">
                  <Pic
                    src={item.src}
                    alt={item.caption}
                    sizes="(min-width:768px) 30vw, 72vw"
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[1400ms] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.07]"
                  />
                </div>
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between">
                <span className="font-serif-display text-sm italic opacity-70">
                  {item.caption}
                </span>
                <span className="font-mono text-[10px] opacity-40">
                  {String(i + 1).padStart(2, "0")} / 07
                </span>
              </figcaption>
            </figure>
          ))}

          {/* colophon */}
          <div className="flex w-[70vw] shrink-0 snap-center flex-col items-start justify-center md:w-[34vw]">
            <p className="font-serif-display text-[clamp(2rem,3.6vw,3.4rem)] leading-tight italic">
              the archive
              <br />
              continues…
            </p>
            <a
              href="#"
              data-cursor
              data-cursor-text="Open"
              className="link-sweep mt-8 font-mono text-[11px] tracking-[0.26em] text-champagne uppercase"
            >
              @lumea.atelier — Instagram
            </a>
          </div>
        </div>

        {/* travel gauge */}
        <div className="mx-[7vw] mt-2 hidden h-px bg-[var(--hairline)] md:block">
          <div
            ref={barRef}
            className="h-full origin-left bg-champagne"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
