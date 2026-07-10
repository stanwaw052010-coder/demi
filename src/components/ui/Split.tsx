"use client";

import {
  createElement,
  Fragment,
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap } from "@/lib/gsap";

type SplitType = "words" | "chars";

/** Pure markup: text split into masked words or characters. */
export function splitNodes(text: string, type: SplitType): ReactNode[] {
  return text.split(" ").map((word, wi) => (
    <Fragment key={wi}>
      <span className="split-mask whitespace-nowrap">
        {type === "chars" ? (
          word.split("").map((ch, ci) => (
            <span key={ci} className="split-unit">
              {ch}
            </span>
          ))
        ) : (
          <span className="split-unit">{word}</span>
        )}
      </span>{" "}
    </Fragment>
  ));
}

interface SplitRevealProps {
  children: string;
  as?: ElementType;
  type?: SplitType;
  className?: string;
  /** seconds, added on top of the stagger */
  delay?: number;
  /** ScrollTrigger start, default "top 85%" */
  start?: string;
  stagger?: number;
  y?: string;
}

/**
 * Text rises out of masked lines, unit by unit,
 * the first time it enters the viewport.
 */
export function SplitReveal({
  children,
  as = "span",
  type = "words",
  className,
  delay = 0,
  start = "top 85%",
  stagger = 0.045,
  y = "110%",
}: SplitRevealProps) {
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const units = el.querySelectorAll<HTMLElement>(".split-unit");
    const tween = gsap.fromTo(
      units,
      { y, rotate: 2.5 },
      {
        y: 0,
        rotate: 0,
        duration: 1.15,
        ease: "power4.out",
        delay,
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [children, delay, start, stagger, y]);

  return createElement(
    as,
    { className, "aria-label": children },
    <span aria-hidden ref={innerRef}>
      {splitNodes(children, type)}
    </span>,
  );
}

/**
 * Words fade from ghost to full ink as the user scrolls through —
 * the reading pace is the scroll pace.
 */
export function ScrubWords({
  children,
  className,
  as = "p",
}: {
  children: string;
  className?: string;
  as?: ElementType;
}) {
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const units = el.querySelectorAll<HTMLElement>(".split-unit");
    const tween = gsap.fromTo(
      units,
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          end: "bottom 45%",
          scrub: 0.6,
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [children]);

  return createElement(
    as,
    { className, "aria-label": children },
    <span aria-hidden ref={innerRef}>
      {splitNodes(children, "words")}
    </span>,
  );
}
