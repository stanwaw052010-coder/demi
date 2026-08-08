"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/studio/gsap";
import { useIsoLayoutEffect, useReducedMotion } from "@/lib/studio/hooks";
import type { Media } from "@/lib/studio/content";

type Props = {
  media: Media;
  className?: string;
  /** Direction the mask opens from. */
  from?: "bottom" | "top" | "left" | "right";
  /** Overscale used for the counter-move. 1 disables it. */
  scale?: number;
  /** Continues a slow parallax drift while the element is on screen. */
  parallax?: number;
  priority?: boolean;
  sizes?: string;
  cursor?: string;
  delay?: number;
};

const CLIPS = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * The house image treatment: a clip-path curtain, a counter-scaling plate
 * underneath, and an optional parallax drift. Aspect ratio is reserved from
 * the intrinsic size so nothing shifts while the asset decodes.
 */
export default function RevealMedia({
  media,
  className,
  from = "bottom",
  scale = 1.16,
  parallax = 0,
  priority = false,
  cursor,
  delay = 0,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    if (reduced === null) return;
    const el = root.current;
    if (!el) return;
    const img = el.querySelector("img");
    if (!img) return;

    if (reduced) {
      gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(img, { scale: 1, yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(el, { clipPath: CLIPS[from] });
      gsap.set(img, { scale });

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        delay,
      });

      tl.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5 }).to(
        img,
        { scale: 1, duration: 1.7 },
        0
      );

      if (parallax) {
        gsap.fromTo(
          img,
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reduced, from, scale, parallax, delay]);

  return (
    <div
      ref={root}
      className={`reveal ${className ?? ""}`}
      style={{ aspectRatio: `${media.width} / ${media.height}` }}
      data-cursor={cursor}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        draggable={false}
      />
    </div>
  );
}
