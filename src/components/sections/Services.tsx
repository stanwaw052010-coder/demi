"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";
import { useFinePointer, useSectionTheme } from "@/lib/hooks";
import { Pic } from "@/components/ui/Pic";
import { SplitReveal } from "@/components/ui/Split";
import { SERVICES } from "@/data/content";

/**
 * The carte: editorial rows that come alive — a photograph chases
 * the cursor, light sweeps across the hovered line, and each row
 * unfolds into its own small dossier.
 */
export function Services() {
  const rootRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const fine = useFinePointer();
  const { scrollTo } = useApp();
  useSectionTheme(rootRef, "dark");

  // photograph that chases the cursor between rows
  useEffect(() => {
    if (!fine) return;
    const root = rootRef.current;
    const preview = previewRef.current;
    if (!root || !preview) return;

    const x = gsap.quickTo(preview, "x", { duration: 0.55, ease: "power3.out" });
    const y = gsap.quickTo(preview, "y", { duration: 0.7, ease: "power3.out" });
    const rotate = gsap.quickTo(preview, "rotation", { duration: 0.8, ease: "power3.out" });
    let lastX = 0;

    const onMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      rotate(gsap.utils.clamp(-9, 9, (e.clientX - lastX) * 0.35));
      lastX = e.clientX;
      x(relX - 140);
      y(relY - 190);
    };
    root.addEventListener("mousemove", onMove, { passive: true });
    return () => root.removeEventListener("mousemove", onMove);
  }, [fine]);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    gsap.to(preview, {
      scale: hovered === null ? 0.6 : 1,
      opacity: hovered === null ? 0 : 1,
      duration: 0.55,
      ease: hovered === null ? "power3.out" : "back.out(1.4)",
    });
  }, [hovered]);

  // rows rise in as the section enters
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-service-row]").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 88%", once: true },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="services" className="relative overflow-hidden px-6 py-32 md:px-10 md:py-44">
      <div className="hairline-t mb-8 flex items-baseline justify-between pt-6">
        <span className="label-mono">02 — La Carte</span>
        <span className="label-mono hidden md:block">six disciplines</span>
      </div>

      <SplitReveal
        as="h2"
        className="h-display mb-20 block max-w-4xl text-[clamp(2.6rem,6.5vw,6rem)]"
      >
        Rituals, not appointments
      </SplitReveal>

      {/* chasing photograph */}
      {fine && (
        <div
          ref={previewRef}
          className="pointer-events-none absolute top-0 left-0 z-20 aspect-[3/4] w-[280px] scale-50 opacity-0 shadow-2xl shadow-black/50 will-change-transform"
        >
          {SERVICES.map((s, i) => (
            <Pic
              key={s.id}
              src={s.image}
              alt=""
              sizes="280px"
              className={`absolute inset-0 transition-opacity duration-500 ${
                hovered === i ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      )}

      <div role="list">
        {SERVICES.map((s, i) => {
          const isOpen = open === i;
          return (
            <div
              key={s.id}
              role="listitem"
              data-service-row
              className="group relative border-t border-[var(--hairline)] last:border-b"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* light sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-champagne/[0.07] to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
              />
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                data-cursor
                data-cursor-text={isOpen ? "Close" : "Open"}
                aria-expanded={isOpen}
                className="relative flex w-full items-baseline justify-between gap-6 py-8 text-left md:py-10"
              >
                <span className="flex min-w-0 items-baseline gap-5 md:gap-10">
                  <span className="font-mono text-[11px] text-champagne/60">{s.index}</span>
                  <span className="relative min-w-0">
                    <span
                      className={`font-serif-display block text-[clamp(1.7rem,4.6vw,4rem)] leading-none transition-all duration-500 ${
                        isOpen
                          ? "translate-x-3 italic text-champagne md:translate-x-6"
                          : "group-hover:translate-x-3 group-hover:italic group-hover:text-champagne md:group-hover:translate-x-6"
                      }`}
                    >
                      {s.title}
                    </span>
                    <span
                      className={`font-serif-display pointer-events-none absolute top-full left-0 mt-1 text-sm text-[var(--fg-dim)] italic transition-all duration-500 ${
                        isOpen
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                      }`}
                    >
                      — {s.poetic}
                    </span>
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-5 md:gap-8">
                  <span className="font-mono text-[11px] tracking-[0.15em] whitespace-nowrap opacity-60">
                    {s.price}
                  </span>
                  <span
                    className={`relative block h-4 w-4 transition-transform duration-500 ${
                      isOpen ? "rotate-45" : "group-hover:rotate-90"
                    }`}
                    aria-hidden
                  >
                    <span className="absolute top-1/2 left-0 h-px w-full bg-current" />
                    <span className="absolute left-1/2 h-full w-px bg-current" />
                  </span>
                </span>
              </button>

              {/* dossier */}
              <div
                className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-wrap items-start justify-between gap-8 pb-10 pl-9 md:pl-16">
                    <p className="max-w-md text-sm leading-relaxed opacity-65">{s.description}</p>
                    <div className="flex items-center gap-8">
                      <span className="label-mono">{s.duration}</span>
                      <button
                        onClick={() => scrollTo("#reserve")}
                        data-cursor
                        data-cursor-text="Book"
                        className="link-sweep font-mono text-[11px] tracking-[0.24em] text-champagne uppercase"
                      >
                        Reserve this ritual →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
