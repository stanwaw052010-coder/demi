"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSectionTheme } from "@/lib/hooks";
import { Pic } from "@/components/ui/Pic";
import { ScrubWords, SplitReveal } from "@/components/ui/Split";
import { IMAGES } from "@/data/content";

const CHAPTERS = [
  {
    title: "The consultation",
    body: "Nothing begins at the chair. It begins at a low table, over tea, with photographs of you at your happiest — because that is the brief. We read bone structure, habit, temperament. Only then do we reach for scissors.",
  },
  {
    title: "The craft",
    body: "Nine artisans, each with a single discipline and a decade behind it. Colour is mixed to the millilitre and logged like a recipe. Cuts are sculpted dry, so they fall the way your day actually falls.",
  },
  {
    title: "The room",
    body: "Lime-washed walls, one chair per room, no clocks. The loudest sound is water. You will not be shown to a mirror until the work deserves it — and it always, eventually, deserves it.",
  },
];

export function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useSectionTheme(rootRef, "light");

  // sticky image stack follows the chapters
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const blocks = root.querySelectorAll<HTMLElement>("[data-chapter]");
    const triggers = Array.from(blocks).map((block, i) =>
      ScrollTrigger.create({
        trigger: block,
        start: "top 60%",
        end: "bottom 60%",
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      }),
    );

    // floating collage pieces drift at their own pace
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: parseFloat(el.dataset.float ?? "20") },
          {
            yPercent: -parseFloat(el.dataset.float ?? "20"),
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 },
          },
        );
      });
    }, root);

    return () => {
      triggers.forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} id="manifesto" className="relative px-6 py-32 md:px-10 md:py-44">
      <div className="hairline-t mb-20 flex items-baseline justify-between pt-6">
        <span className="label-mono">01 — Manifesto</span>
        <span className="label-mono hidden md:block">est. MMXIV</span>
      </div>

      {/* the creed — read at scroll pace */}
      <div className="relative mx-auto max-w-5xl">
        <div
          data-float="26"
          className="absolute -top-10 right-[2%] hidden w-40 rotate-[6deg] lg:block"
        >
          <Pic src={IMAGES.manifesto[1]} alt="" sizes="10rem" className="aspect-[3/4]" />
        </div>
        <ScrubWords className="font-serif-display max-w-4xl text-[clamp(2.1rem,4.6vw,4.3rem)] leading-[1.12]">
          We do not do makeovers. We compose light — on skin, in hair, around a face. Beauty here is not applied; it is revealed, slowly, the way a photograph surfaces in a darkroom.
        </ScrubWords>
      </div>

      {/* chapters + sticky stack */}
      <div className="mt-36 grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="relative order-2 lg:order-1">
          <div className="sticky top-[12vh] aspect-[3/4] max-h-[76vh] w-full overflow-hidden">
            {IMAGES.manifesto.map((src, i) => (
              <Pic
                key={src}
                src={src}
                alt={CHAPTERS[i]?.title ?? "Atelier"}
                sizes="(min-width:1024px) 45vw, 90vw"
                className={`absolute inset-0 transition-all duration-[900ms] ease-[cubic-bezier(0.33,1,0.68,1)] ${
                  active === i ? "scale-100 opacity-100" : "scale-[1.07] opacity-0"
                }`}
              />
            ))}
            <span className="label-mono absolute bottom-4 left-4 z-10 !text-ivory/80 mix-blend-difference">
              fig. 0{active + 1}
            </span>
          </div>
        </div>

        <div className="order-1 flex flex-col gap-[38vh] py-[14vh] lg:order-2">
          {CHAPTERS.map((c, i) => (
            <article key={c.title} data-chapter>
              <span className="label-mono mb-6 block !text-[var(--accent)]">
                chapitre 0{i + 1}
              </span>
              <SplitReveal
                as="h3"
                className="font-serif-display mb-6 block text-[clamp(1.9rem,3.2vw,3rem)] leading-tight"
              >
                {c.title}
              </SplitReveal>
              <p className="max-w-md text-[0.95rem] leading-relaxed opacity-70">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
