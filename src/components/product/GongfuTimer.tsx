"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { Gongfu, LiquorKey } from "@content/types";
import { infusionColour } from "@/lib/liquor";

interface Step {
  /** 0 is the rinse; 1 and up are real infusions. */
  index: number;
  seconds: number;
  colour: string;
}

/**
 * The gongfu timer. A working tool, not an ornament.
 *
 * The circle is the gaiwan seen from above and fills with the colour *this*
 * infusion gives: pale on the first pour, deepest around the third to fifth,
 * fading again towards the last. That curve comes from the tea's own data
 * (see infusionStrength), which is what makes the colour information rather
 * than decoration.
 *
 * The sweep is two half-discs driven by a CSS animation on `transform` alone,
 * so the browser runs it on the compositor and no JavaScript executes per
 * frame; only the seconds readout ticks, four times a second. Under
 * prefers-reduced-motion everything else on the site stops, but this keeps
 * running, because a timer that does not move is broken rather than calm.
 */
export function GongfuTimer({
  gongfu,
  liquor,
  vesselLabel,
}: {
  gongfu: Gongfu;
  liquor: LiquorKey;
  vesselLabel: string;
}) {
  const t = useTranslations("product");
  const actions = useTranslations("actions");

  const steps = useMemo<Step[]>(() => {
    const list: Step[] = [];
    if (gongfu.rinseSeconds !== null) {
      // The rinse gets poured away, so it wears a pale wash rather than the
      // colour of the first real infusion.
      list.push({
        index: 0,
        seconds: gongfu.rinseSeconds,
        colour: `color-mix(in srgb, ${infusionColour(liquor, 1, gongfu.infusions)} 38%, var(--color-mist))`,
      });
    }
    for (let i = 1; i <= gongfu.infusions; i += 1) {
      list.push({
        index: i,
        seconds: gongfu.firstSeconds + (i - 1) * gongfu.incrementSeconds,
        colour: infusionColour(liquor, i, gongfu.infusions),
      });
    }
    return list;
  }, [gongfu, liquor]);

  const [cursor, setCursor] = useState(0);
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(steps[0]?.seconds ?? 0);
  const [finished, setFinished] = useState(false);
  const [sound, setSound] = useState(false);
  /** Bumped to restart the CSS animation from zero. */
  const [runKey, setRunKey] = useState(0);

  const deadline = useRef<number | null>(null);
  const step = steps[Math.min(cursor, steps.length - 1)];

  const chime = useCallback(() => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.([90, 60, 140]);
    }
    if (!sound) return;
    try {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      const context = new Ctor();
      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.type = "sine";
      osc.frequency.value = 528;
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.22, context.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1.1);
      osc.connect(gain).connect(context.destination);
      osc.start();
      osc.stop(context.currentTime + 1.15);
      osc.onended = () => context.close();
    } catch {
      // Audio is a nicety; a blocked AudioContext must not break the timer.
    }
  }, [sound]);

  useEffect(() => {
    if (!running || !step) return;
    deadline.current = Date.now() + remaining * 1000;

    const tick = window.setInterval(() => {
      const left = Math.max(0, (deadline.current ?? 0) - Date.now()) / 1000;
      setRemaining(left);
      if (left > 0) return;

      window.clearInterval(tick);
      chime();
      const next = cursor + 1;
      if (next >= steps.length) {
        setRunning(false);
        setFinished(true);
        setRemaining(0);
        return;
      }
      setCursor(next);
      setRemaining(steps[next].seconds);
      setRunKey((k) => k + 1);
    }, 250);

    return () => window.clearInterval(tick);
    // `remaining` is intentionally not a dependency: it is the value the run
    // starts from, and re-running on every tick would reset the deadline.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, cursor, runKey, steps, chime]);

  function reset() {
    setRunning(false);
    setFinished(false);
    setCursor(0);
    setRemaining(steps[0]?.seconds ?? 0);
    setRunKey((k) => k + 1);
  }

  function skip() {
    const next = Math.min(cursor + 1, steps.length - 1);
    setCursor(next);
    setRemaining(steps[next].seconds);
    setFinished(false);
    setRunKey((k) => k + 1);
  }

  const isRinse = step?.index === 0;
  const label = isRinse
    ? t("timerRinse")
    : `${t("timerInfusion")} ${step?.index ?? 1} ${t("timerOf", { total: gongfu.infusions })}`;

  return (
    <section aria-labelledby="wy-timer" className="wy-rule pt-6">
      <h2 id="wy-timer" className="text-[1.5rem]">
        {t("timerTitle")}
      </h2>
      <p className="wy-prose mt-2 text-[1rem]">{t("timerLede")}</p>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-8">
        <div
          className="wy-pie"
          key={runKey}
          style={{
            ["--wy-pie-colour" as string]: step?.colour ?? "var(--color-mist)",
            ["--wy-pie-duration" as string]: `${step?.seconds ?? 0}s`,
            ["--wy-pie-state" as string]: running ? "running" : "paused",
          }}
          role="timer"
          aria-live="off"
          aria-label={t("timerAria", {
            current: Math.max(1, step?.index ?? 1),
            total: gongfu.infusions,
            seconds: Math.ceil(remaining),
          })}
        >
          <span className="wy-pie-half wy-pie-r" aria-hidden="true">
            <span className="wy-pie-fill" />
          </span>
          <span className="wy-pie-half wy-pie-l" aria-hidden="true">
            <span className="wy-pie-fill" />
          </span>
          <span className="wy-pie-face">
            <span className="wy-label">{label}</span>
            <strong className="tnum wy-pie-count">{Math.ceil(remaining)}</strong>
            <span className="wy-label">{vesselLabel}</span>
          </span>
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="wy-btn wy-btn-solid"
              onClick={() => {
                if (finished) reset();
                setRunning((v) => !v);
              }}
            >
              {running ? actions("pauseTimer") : actions("startTimer")}
            </button>
            <button type="button" className="wy-btn wy-btn-quiet" onClick={skip}>
              {actions("nextInfusion")}
            </button>
            <button type="button" className="wy-btn wy-btn-quiet" onClick={reset}>
              {actions("resetTimer")}
            </button>
          </div>

          <label className="flex items-center gap-2.5 mt-4 text-micro text-stone">
            <input
              type="checkbox"
              checked={sound}
              onChange={(event) => setSound(event.target.checked)}
            />
            {t("timerSound")}
          </label>

          {/* The colour curve of the whole session, at a glance. */}
          <ol className="flex flex-wrap gap-1.5 mt-6" aria-hidden="true">
            {steps.map((s, i) => (
              <li
                key={s.index}
                title={s.index === 0 ? t("timerRinse") : `${s.index}`}
                style={{
                  width: "1.05rem",
                  height: "1.05rem",
                  borderRadius: "9999px",
                  background: s.colour,
                  opacity: i < cursor ? 0.35 : 1,
                  outline: i === cursor ? "1px solid var(--color-pine)" : "none",
                  outlineOffset: "2px",
                  border: "1px solid color-mix(in srgb, var(--color-ink) 14%, transparent)",
                }}
              />
            ))}
          </ol>

          <p className="sr-only" role="status" aria-live="polite">
            {finished
              ? t("timerDone")
              : running
                ? t("timerAnnounce", { current: Math.max(1, step?.index ?? 1) })
                : ""}
          </p>

          {finished ? <p className="wy-prose mt-6 text-[1rem]">{t("timerDone")}</p> : null}
        </div>
      </div>
    </section>
  );
}
