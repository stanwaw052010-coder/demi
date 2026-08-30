"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Opacity and an 8px lift, once, and only where it sets the rhythm of a page.
 * At most four per page — beyond that it stops being a device and becomes a tic.
 *
 * Content is visible in the server HTML and stays visible unless the client
 * decides it can animate: the hidden state is only ever applied to an element
 * that is below the fold, with an observer already attached. Nothing on this
 * site can end up permanently invisible because a script did not run.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "li";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(true);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;
    // Only arm what has not been seen yet; anything already on screen stays put.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setArmed(true);
    setShown(false);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || !armed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.04 },
    );
    observer.observe(node);

    // Belt and braces: never leave content hidden if the observer never fires.
    const failsafe = window.setTimeout(() => setShown(true), 2500);
    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [armed]);

  return (
    <Tag
      ref={ref as never}
      className={`${armed ? "wy-reveal " : ""}${className ?? ""}`}
      data-shown={shown ? "true" : undefined}
      style={armed && shown ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
