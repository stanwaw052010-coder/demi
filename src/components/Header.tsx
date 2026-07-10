"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";
import { useFinePointer } from "@/lib/hooks";
import { Magnetic } from "@/components/ui/Magnetic";
import { Pic } from "@/components/ui/Pic";
import { NAV_LINKS } from "@/data/content";

export function Header() {
  const { ready, scrollTo, onScroll, stopScroll, startScroll } = useApp();
  const fine = useFinePointer();
  const barRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(0);
  const hidden = useRef(false);

  // slide in once the curtain lifts
  useEffect(() => {
    if (!ready || !barRef.current) return;
    gsap.fromTo(
      barRef.current,
      // y:0 clears the SSR translateY(-120%) that GSAP parses as a px base
      { yPercent: -120, y: 0 },
      { yPercent: 0, y: 0, duration: 1.2, ease: "power4.out", delay: 0.65 },
    );
  }, [ready]);

  // hide on scroll down, return on scroll up
  useEffect(() => {
    return onScroll(({ direction, scroll }) => {
      if (open) return;
      const shouldHide = direction === 1 && scroll > 140;
      if (shouldHide !== hidden.current) {
        hidden.current = shouldHide;
        gsap.to(barRef.current, {
          yPercent: shouldHide ? -120 : 0,
          duration: 0.7,
          ease: "power3.out",
        });
      }
    });
  }, [onScroll, open]);

  // menu open / close choreography
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const links = overlay.querySelectorAll<HTMLElement>("[data-menu-link]");
    const meta = overlay.querySelectorAll<HTMLElement>("[data-menu-meta]");

    if (open) {
      stopScroll();
      gsap.timeline()
        .set(overlay, { pointerEvents: "auto" })
        .to(overlay, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.inOut" })
        .fromTo(
          links,
          { yPercent: 120, rotate: 3 },
          { yPercent: 0, rotate: 0, duration: 0.9, ease: "power4.out", stagger: 0.07 },
          "-=0.35",
        )
        .fromTo(
          meta,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 },
          "-=0.55",
        );
    } else {
      startScroll();
      gsap.timeline()
        .to(overlay, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.7, ease: "power4.inOut" })
        .set(overlay, { pointerEvents: "none" });
    }
  }, [open, stopScroll, startScroll]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    // let the curtain start closing before travelling
    setTimeout(() => scrollTo(href), 350);
  };

  return (
    <>
      <header
        ref={barRef}
        className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-6 py-5 mix-blend-difference md:px-10"
        style={{ transform: "translateY(-120%)" }}
      >
        <button
          onClick={() => scrollTo("#top")}
          data-cursor
          data-cursor-text="Top"
          className="font-serif-display text-xl tracking-wide text-ivory md:text-2xl"
          aria-label="LUMÉA — back to top"
        >
          LUMÉA<span className="text-champagne">*</span>
        </button>

        <div className="flex items-center gap-8">
          <span className="label-mono hidden !text-ivory/60 md:block">
            Kyiv — Atelier Nº1
          </span>
          <Magnetic strength={0.4}>
            <button
              onClick={() => setOpen((v) => !v)}
              data-cursor
              data-cursor-text={open ? "Close" : "Menu"}
              className="group flex items-center gap-3 py-2 text-ivory"
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              <span className="font-mono text-[11px] tracking-[0.3em] uppercase">
                {open ? "Close" : "Menu"}
              </span>
              <span className="relative block h-[10px] w-7">
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-500 ${
                    open ? "top-1/2 rotate-45" : "top-0 group-hover:w-2/3"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-500 ${
                    open ? "top-1/2 -rotate-45" : "top-full"
                  }`}
                />
              </span>
            </button>
          </Magnetic>
        </div>
      </header>

      {/* full-screen menu */}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[55] bg-ink text-ivory"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(90% 70% at 80% 110%, rgba(216,191,154,0.14), transparent 60%)",
          }}
        />
        <div className="relative flex h-full flex-col justify-between px-6 pt-28 pb-10 md:px-10">
          <nav className="flex max-w-5xl flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <div key={link.href} className="overflow-hidden py-1">
                <button
                  data-menu-link
                  data-cursor
                  data-cursor-text="Go"
                  onClick={() => go(link.href)}
                  onMouseEnter={() => setPreview(i)}
                  className="group flex items-baseline gap-5 text-left"
                >
                  <span className="font-mono text-[11px] text-champagne/70">
                    0{i + 1}
                  </span>
                  <span className="font-serif-display text-[clamp(2.4rem,7.5vw,5.6rem)] leading-[1.02] transition-all duration-500 group-hover:translate-x-4 group-hover:italic group-hover:text-champagne">
                    {link.label}
                  </span>
                </button>
              </div>
            ))}
          </nav>

          {/* hover preview — desktop only */}
          {fine && (
            <div className="pointer-events-none absolute top-1/2 right-[8vw] hidden aspect-[3/4] w-[24vw] max-w-sm -translate-y-1/2 lg:block">
              {NAV_LINKS.map((link, i) => (
                <Pic
                  key={link.href}
                  src={link.preview}
                  alt=""
                  sizes="24vw"
                  className={`absolute inset-0 transition-all duration-700 ${
                    preview === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                  }`}
                />
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-end justify-between gap-6">
            <p data-menu-meta className="label-mono">
              12 Yaroslaviv Val St, Kyiv
              <br />
              Tue – Sun, 10:00 – 21:00
            </p>
            <div data-menu-meta className="flex gap-6">
              {["Instagram", "Telegram", "Pinterest"].map((s) => (
                <a key={s} href="#" className="link-sweep font-mono text-[11px] tracking-[0.2em] uppercase" data-cursor data-cursor-text="Open">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
