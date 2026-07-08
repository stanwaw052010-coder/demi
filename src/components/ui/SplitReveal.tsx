"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SplitRevealProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  by?: "word" | "line";
  delay?: number;
  start?: string;
};

export default function SplitReveal({
  text,
  as = "h2",
  className,
  delay = 0,
  start = "top 85%",
}: SplitRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLSpanElement>(".split-word");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0, y: "60%", filter: "blur(10px)" },
        {
          opacity: 1,
          y: "0%",
          filter: "blur(0px)",
          duration: 1,
          delay,
          ease: "power3.out",
          stagger: 0.045,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, start]);

  const words = text.split(" ");

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.15em] align-bottom">
          <span className="split-word inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
