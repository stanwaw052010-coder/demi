"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { TeaCategory } from "@content/types";

export interface TeaPanel {
  category: TeaCategory;
  hanzi: string;
  label: string;
  collectionSlug: string;
  oxidation: string;
  count: number;
  note: string;
}

/**
 * The eight kinds, in the order they are made: unoxidised through to fully
 * post-fermented. Horizontal because that order is a real sequence and reading
 * it sideways mirrors it.
 *
 * Desktop pins the section and drives translateX from scroll progress across
 * roughly two screens. Below 60rem, and under reduced motion, it degrades to an
 * ordinary swipe carousel with scroll snapping — not a squeezed desktop.
 */
export function EightTeas({ panels }: { panels: TeaPanel[] }) {
  const t = useTranslations("home");
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [jacking, setJacking] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 60rem)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setJacking(wide.matches && !still.matches);
    sync();
    wide.addEventListener("change", sync);
    still.addEventListener("change", sync);
    return () => {
      wide.removeEventListener("change", sync);
      still.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!jacking) {
      setProgress(0);
      if (track.current) track.current.style.transform = "";
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const section = outer.current;
      const rail = track.current;
      if (!section || !rail) return;

      const rect = section.getBoundingClientRect();
      const travel = section.offsetHeight - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      const distance = Math.max(0, rail.scrollWidth - window.innerWidth + 96);

      // Transform only: no layout, no paint, straight to the compositor.
      rail.style.transform = `translate3d(${-(p * distance).toFixed(2)}px, 0, 0)`;
      setProgress(p);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [jacking]);

  return (
    <section
      ref={outer}
      aria-labelledby="wy-eight"
      className="wy-rule"
      style={jacking ? { height: "220vh" } : undefined}
    >
      <div
        className={jacking ? "sticky top-0 h-svh flex flex-col justify-center overflow-hidden" : "wy-section"}
      >
        <div className="wy-shell">
          <div className="wy-grid">
            <div className="wy-margin">
              <p className="wy-hanzi text-[1.5rem] text-pine">八大茶类</p>
              <p className="wy-label mt-1">{t("eightHint")}</p>
            </div>
            <div className="wy-main">
              <h2 id="wy-eight">{t("eightTitle")}</h2>
              <p className="wy-lead mt-4 text-stone">{t("eightLede")}</p>
            </div>
          </div>
        </div>

        <div
          className={
            jacking
              ? "mt-12"
              : "mt-10 overflow-x-auto wy-hide-scrollbar wy-snap-x overscroll-x-contain"
          }
          style={jacking ? undefined : { paddingInline: "var(--gutter)" }}
          tabIndex={jacking ? undefined : 0}
          role={jacking ? undefined : "region"}
          aria-label={jacking ? undefined : t("eightTitle")}
        >
          <div
            ref={track}
            className="flex"
            style={{
              width: "max-content",
              paddingInline: jacking ? "var(--gutter)" : 0,
              willChange: jacking ? "transform" : undefined,
            }}
          >
            {panels.map((panel) => (
              <Link
                key={panel.category}
                href={{ pathname: "/collecties/[slug]", params: { slug: panel.collectionSlug } }}
                className="wy-snap-item group relative flex flex-col justify-between bg-paper p-6 md:p-8"
                style={{
                  width: "clamp(15rem, 24vw, 20rem)",
                  minHeight: "clamp(19rem, 34vh, 24rem)",
                  borderLeft: "1px solid var(--rule)",
                }}
              >
                <div>
                  <span
                    className="block rounded-full"
                    style={{
                      width: "3.25rem",
                      height: "3.25rem",
                      background: `var(--color-liquor-${liquorFor(panel.category)})`,
                      border: "1px solid color-mix(in srgb, var(--color-ink) 18%, transparent)",
                    }}
                    aria-hidden="true"
                  />
                  <p className="wy-hanzi mt-6 text-[1.375rem] text-pine">{panel.hanzi}</p>
                  <h3 className="mt-1 text-[1.5rem]">
                    <span className="wy-link">{panel.label}</span>
                  </h3>
                  <p className="mt-3 text-[var(--text-micro)] text-stone" style={{ maxWidth: "26ch" }}>
                    {panel.note}
                  </p>
                </div>

                <dl className="wy-meta mt-8">
                  <div>
                    <dt className="sr-only">{t("eightOxidation")}</dt>
                    <dd className="tnum">{panel.oxidation}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">{t("eightTitle")}</dt>
                    <dd className="tnum">{t("eightCount", { count: panel.count })}</dd>
                  </div>
                </dl>
              </Link>
            ))}
          </div>
        </div>

        {jacking ? (
          <div className="wy-shell mt-10">
            <div
              className="relative h-px bg-[var(--rule)]"
              role="progressbar"
              aria-label={t("eightProgress")}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
            >
              <span
                className="absolute inset-y-0 left-0 bg-pine"
                style={{
                  width: "100%",
                  transformOrigin: "left",
                  transform: `scaleX(${progress.toFixed(3)})`,
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function liquorFor(category: TeaCategory): string {
  if (category === "sheng") return "sheng";
  if (category === "shou") return "shou";
  return category;
}
