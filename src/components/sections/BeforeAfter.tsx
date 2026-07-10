"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSectionTheme } from "@/lib/hooks";
import { Pic } from "@/components/ui/Pic";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/Split";
import { IMAGES } from "@/data/content";

/**
 * Draggable comparison. The divider follows the pointer through a
 * lerp, so it moves like something with mass — and on first sight
 * it demonstrates itself with a slow, wordless swing.
 */
export function BeforeAfter() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const target = useRef(0.5);
  const current = useRef(0.5);
  const dragging = useRef(false);
  useSectionTheme(rootRef, "light");

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let raf = 0;
    const render = () => {
      raf = requestAnimationFrame(render);
      const next = current.current + (target.current - current.current) * 0.09;
      if (Math.abs(next - current.current) < 0.0001) return;
      current.current = next;
      stage.style.setProperty("--x", String(next));
    };
    render();

    const position = (clientX: number) => {
      const rect = stage.getBoundingClientRect();
      target.current = gsap.utils.clamp(0.02, 0.98, (clientX - rect.left) / rect.width);
    };

    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      stage.setPointerCapture(e.pointerId);
      position(e.clientX);
    };
    const onMove = (e: PointerEvent) => {
      if (dragging.current) position(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };

    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);

    // wordless demonstration on first approach
    const hint = { v: 0.5 };
    const st = ScrollTrigger.create({
      trigger: stage,
      start: "top 70%",
      once: true,
      onEnter: () => {
        gsap.to(hint, {
          v: 0.72,
          duration: 1.4,
          ease: "power2.inOut",
          yoyo: true,
          repeat: 1,
          onUpdate: () => {
            if (!dragging.current) target.current = hint.v;
          },
        });
      },
    });

    return () => {
      cancelAnimationFrame(raf);
      st.kill();
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="transformations"
      className="px-6 py-32 md:px-10 md:py-44"
    >
      <div className="hairline-t mb-8 flex items-baseline justify-between pt-6">
        <span className="label-mono">04 — Transformations</span>
        <span className="label-mono hidden md:block">drag the light</span>
      </div>

      <SplitReveal
        as="h2"
        className="h-display mb-6 block max-w-4xl text-[clamp(2.6rem,6.5vw,6rem)]"
      >
        The quiet before, the quiet after
      </SplitReveal>
      <p className="mb-16 max-w-md text-sm leading-relaxed opacity-60">
        No filters, no ring lights, no retouching. One guest, one morning at
        the atelier — pull the seam of light across her day.
      </p>

      <Reveal className="mx-auto w-full max-w-5xl">
      <div
        ref={stageRef}
        className="relative aspect-[4/5] w-full touch-pan-y overflow-hidden select-none md:aspect-[16/9]"
        style={{ "--x": "0.5" } as React.CSSProperties}
        data-cursor
        data-cursor-text="Drag"
        role="slider"
        aria-label="Before and after comparison"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
        tabIndex={0}
      >
        {/* after — the ground */}
        <Pic
          src={IMAGES.beforeAfter.after}
          alt="After — finished look"
          sizes="(min-width:1024px) 64rem, 100vw"
          className="absolute inset-0"
        />
        {/* before — clipped to the left of the seam */}
        <div
          className="absolute inset-0"
          style={{ clipPath: "inset(0 calc((1 - var(--x)) * 100%) 0 0)" }}
        >
          <Pic
            src={IMAGES.beforeAfter.before}
            alt="Before — bare morning face"
            sizes="(min-width:1024px) 64rem, 100vw"
            className="absolute inset-0"
            imgClassName="grayscale-[0.35] brightness-[0.92]"
          />
        </div>

        {/* the seam */}
        <div
          className="absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-ivory/85 shadow-[0_0_24px_rgba(216,191,154,0.65)]"
          style={{ left: "calc(var(--x) * 100%)" }}
        >
          <span className="glass absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full !border-ivory/40 text-ivory">
            <span className="font-mono text-[10px] tracking-widest">‹ ›</span>
          </span>
        </div>

        <span className="label-mono absolute top-5 left-5 z-10 !text-ivory/85 mix-blend-difference">
          avant
        </span>
        <span className="label-mono absolute top-5 right-5 z-10 !text-ivory/85 mix-blend-difference">
          après
        </span>
      </div>
      </Reveal>
    </section>
  );
}
