"use client";

import { useRef } from "react";
import { gsap } from "@/lib/studio/gsap";
import { useIsoLayoutEffect, useReducedMotion } from "@/lib/studio/hooks";
import { STATS } from "@/lib/studio/content";

/**
 * Four figures, counted up once on entry. The readable value is always in the
 * DOM — the animation only overwrites it when motion is welcome, so screen
 * readers and no-JS visitors get the number, not a zero.
 */
export default function Stats() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useIsoLayoutEffect(() => {
    if (reduced !== false) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stat").forEach((stat) => {
        const output = stat.querySelector<HTMLElement>(".stat__value-num");
        if (!output) return;
        const to = Number(output.dataset.value ?? 0);
        const decimals = Number(output.dataset.decimals ?? 0);
        const counter = { value: 0 };

        gsap
          .timeline({
            scrollTrigger: { trigger: stat, start: "top 88%", once: true },
          })
          .from(stat, { autoAlpha: 0, y: 30, duration: 1 }, 0)
          .fromTo(
            stat.querySelector(".stat__rule span"),
            { scaleX: 0 },
            { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
            0
          )
          .to(
            counter,
            {
              value: to,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                output.textContent = counter.value.toFixed(decimals);
              },
            },
            0.1
          );
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="stats" aria-label="Studio in numbers">
      <div className="shell">
        <ul className="stats__grid">
          {STATS.map((stat) => (
            <li className="stat" key={stat.index}>
              <div className="stat__rule" aria-hidden>
                <span />
              </div>
              <p className="meta num stat__index">{stat.index}</p>
              <p className="stat__value display">
                <span
                  className="stat__value-num num"
                  data-value={stat.value}
                  data-decimals={"decimals" in stat ? stat.decimals : 0}
                >
                  {"decimals" in stat ? stat.value.toFixed(stat.decimals) : stat.value}
                </span>
                <span className="stat__suffix">{stat.suffix}</span>
              </p>
              <p className="meta meta--muted stat__label">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
