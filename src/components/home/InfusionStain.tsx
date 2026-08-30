"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const SESSION_KEY = "wy-infusion-seen";
/** Hard ceiling. The brief allows 2.5 s; the scene finishes inside 2.4 s. */
const DURATION = 2400;

/**
 * The signature scene: a diffuse stain of liquor spreads from a point on the
 * right, thins, and settles into a pale green haze with the wordmark left
 * standing in it.
 *
 * The organic edge comes from a *static* feTurbulence + feDisplacementMap; the
 * motion itself is only transform and opacity, so the filter is rasterised once
 * and the animation stays on the compositor at 60 fps. Animating the filter
 * primitives directly would look the same and cost a repaint every frame.
 *
 * Plays once per session, is skipped by any click, key or scroll, and does not
 * run at all under prefers-reduced-motion. The wordmark is visible in the
 * server HTML, so nothing depends on this component to read the page.
 */
export function InfusionStain() {
  const t = useTranslations("actions");
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const started = useRef(false);

  useLayoutEffect(() => {
    if (started.current) return;
    started.current = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = true;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Private mode: treat as seen and skip rather than replay every page.
    }
    if (reduced || seen) {
      setPhase("done");
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Nothing to do.
    }

    // Set before paint, so the wordmark never flashes in and then out.
    document.getElementById("wy-hero")?.setAttribute("data-infusion", "playing");
    setPhase("playing");
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;

    const finish = () => {
      document.getElementById("wy-hero")?.setAttribute("data-infusion", "done");
      setPhase("done");
    };

    const timer = window.setTimeout(finish, DURATION);
    const options = { once: true, passive: true } as const;
    window.addEventListener("pointerdown", finish, options);
    window.addEventListener("keydown", finish, options);
    window.addEventListener("wheel", finish, options);
    window.addEventListener("touchstart", finish, options);
    window.addEventListener("scroll", finish, options);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("keydown", finish);
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchstart", finish);
      window.removeEventListener("scroll", finish);
    };
  }, [phase]);

  if (phase !== "playing") return null;

  return (
    <>
      <svg
        className="wy-stain"
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id="wy-warp" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.021"
              numOctaves="4"
              seed="11"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="118"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <radialGradient id="wy-brew" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-liquor-sheng)" stopOpacity="0.85" />
            <stop offset="46%" stopColor="var(--color-liquor-oolong)" stopOpacity="0.55" />
            <stop offset="76%" stopColor="var(--color-sage)" stopOpacity="0.34" />
            <stop offset="100%" stopColor="var(--color-sage)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g filter="url(#wy-warp)">
          <circle className="wy-stain-core" cx="742" cy="286" r="150" fill="url(#wy-brew)" />
          <circle className="wy-stain-edge" cx="742" cy="286" r="150" fill="url(#wy-brew)" />
        </g>
      </svg>
      <p className="sr-only" aria-live="polite">
        {t("skipAnimation")}
      </p>
    </>
  );
}
