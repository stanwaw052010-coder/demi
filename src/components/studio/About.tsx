"use client";

import { useRef } from "react";
import { gsap } from "@/lib/studio/gsap";
import { useIsoLayoutEffect, useReducedMotion } from "@/lib/studio/hooks";
import { ABOUT_MEDIA } from "@/lib/studio/content";
import { SplitWords } from "./primitives/SplitText";
import RevealMedia from "./primitives/RevealMedia";

/**
 * The statement. Two oversized lines resolve word by word against the scroll,
 * the second set in outline so the sentence reads as one thought given in two
 * weights.
 */
export default function About() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    if (reduced !== false) return;
    const ctx = gsap.context(() => {
      gsap.from(".about__statement .word", {
        yPercent: 108,
        duration: 1.25,
        stagger: 0.055,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".about__statement",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".about__note", {
        autoAlpha: 0,
        y: 26,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about__notes", start: "top 86%", once: true },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} id="about" className="about" aria-labelledby="about-title">
      <div className="shell">
        <header className="section-head about__head">
          <p className="meta" id="about-title">
            (04) — The studio
          </p>
          <p className="meta meta--muted">Berlin · Est. 2024</p>
        </header>

        <div className="about__statement display">
          <p className="about__line">
            <SplitWords text="We don't just do nails." />
          </p>
          <p className="about__line about__line--outline">
            <SplitWords text="We create details you remember." />
          </p>
        </div>

        <div className="about__grid">
          <figure className="about__figure about__figure--tall">
            <RevealMedia media={ABOUT_MEDIA.primary} parallax={4} />
            <figcaption className="meta meta--muted">
              Fig. 04 — Pearl / almond, three coats
            </figcaption>
          </figure>

          <div className="about__notes">
            <p className="about__note about__lead">
              A three-chair studio on Torstraße. No queue, no upsell, no music
              you have to talk over — one artist with your hands for as long as
              the work takes.
            </p>
            <p className="about__note">
              We work dry, file by hand, and build structure before colour. It
              is slower. It is also why a set holds its line for four weeks and
              grows out without a ledge.
            </p>
            <div className="about__note about__meta-grid">
              <div>
                <p className="meta meta--muted">Approach</p>
                <p>Structure first, colour last</p>
              </div>
              <div>
                <p className="meta meta--muted">Products</p>
                <p>HEMA-free, 21-free lacquers</p>
              </div>
              <div>
                <p className="meta meta--muted">Capacity</p>
                <p>Six appointments a day</p>
              </div>
              <div>
                <p className="meta meta--muted">Artists</p>
                <p>Three, trained in-house</p>
              </div>
            </div>
          </div>

          <figure className="about__figure about__figure--wide">
            <RevealMedia media={ABOUT_MEDIA.secondary} from="left" parallax={3} />
            <figcaption className="meta meta--muted">
              Fig. 05 — Nude on warm skin, matte top
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
