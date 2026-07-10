"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";
import { useSectionTheme } from "@/lib/hooks";
import { Magnetic } from "@/components/ui/Magnetic";

/** Closing titles: Kyiv time, the colophon, and the name of the house, set enormous. */
export function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useApp();
  const [time, setTime] = useState("--:--:--");
  useSectionTheme(rootRef, "dark");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Europe/Kyiv",
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // the name rises out of the very bottom of the page
  // (one solid mask reveal — background-clip:text breaks with
  // transformed descendant spans, so no per-char split here)
  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;
    const word = el.querySelector<HTMLElement>("[data-house-word]");
    const tween = gsap.fromTo(
      word,
      { yPercent: 60, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.6,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 97%", once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <footer ref={rootRef} className="relative overflow-hidden bg-ink px-6 pt-28 text-ivory md:px-10">
      <div className="hairline-t flex flex-wrap items-start justify-between gap-10 pt-10 pb-20">
        <div>
          <p className="label-mono mb-3">the atelier</p>
          <p className="text-sm leading-loose opacity-70">
            12 Yaroslaviv Val St
            <br />
            Kyiv, Ukraine
          </p>
        </div>
        <div>
          <p className="label-mono mb-3">hours</p>
          <p className="text-sm leading-loose opacity-70">
            Tue – Sun
            <br />
            10:00 – 21:00
          </p>
        </div>
        <div>
          <p className="label-mono mb-3">enquiries</p>
          <p className="text-sm leading-loose opacity-70">
            bonjour@lumea.studio
            <br />
            +380 44 000 11 22
          </p>
        </div>
        <div>
          <p className="label-mono mb-3">follow</p>
          <div className="flex flex-col gap-1 text-sm leading-loose">
            {["Instagram", "Telegram", "Pinterest"].map((s) => (
              <a
                key={s}
                href="#"
                data-cursor
                data-cursor-text="Open"
                className="link-sweep w-fit opacity-70 transition-opacity hover:opacity-100"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="label-mono mb-3">kyiv, now</p>
          <p className="font-serif-display text-2xl tabular-nums italic">{time}</p>
          <Magnetic strength={0.5} className="mt-6 inline-block">
            <button
              onClick={() => scrollTo("#top")}
              data-cursor
              data-cursor-text="Top"
              aria-label="Back to top"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-ivory/20 transition-colors duration-500 hover:border-champagne hover:text-champagne"
            >
              ↑
            </button>
          </Magnetic>
        </div>
      </div>

      {/* the name of the house */}
      <div ref={wordRef} className="relative -mb-[1.5vw] overflow-hidden select-none" aria-hidden>
        <p
          data-house-word
          className="h-display pt-[0.16em] text-center text-[21.5vw] leading-[0.82] whitespace-nowrap will-change-transform"
          style={{
            background:
              "linear-gradient(180deg, rgba(243,238,229,0.92) 18%, rgba(216,191,154,0.25))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          LUMÉA
        </p>
      </div>

      <div className="hairline-t flex flex-wrap items-center justify-between gap-3 py-6">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-40">
          © MMXXVI Lumea Beauty Atelier
        </p>
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-40">
          a concept demonstration — gsap · lenis · framer motion · next.js
        </p>
      </div>
    </footer>
  );
}
