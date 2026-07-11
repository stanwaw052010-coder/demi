"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import { MoveHorizontal } from "lucide-react";
import { Reveal, TextReveal } from "@/components/ui/Reveal";

export default function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  }, []);

  return (
    <section className="relative py-28 sm:py-40">
      <div className="container-lux">
        <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="overline mb-6">Трансформація · До / Після</p>
            </Reveal>
            <h2 className="h-section max-w-2xl font-display text-fg">
              <TextReveal text="Різниця, яку" />
              <br />
              <TextReveal text="відчуваєш" delay={0.1} />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-xs text-muted-2">
              Потягніть повзунок, щоб побачити результат роботи наших майстрів.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div
            ref={ref}
            className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl border border-white/8 sm:aspect-[16/8]"
            onMouseMove={(e) => dragging.current && update(e.clientX)}
            onMouseDown={(e) => {
              dragging.current = true;
              update(e.clientX);
            }}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onTouchMove={(e) => update(e.touches[0].clientX)}
          >
            {/* After (base) */}
            <Image
              src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1600&auto=format&fit=crop"
              alt="Після стрижки"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 right-4 rounded-full glass border border-white/10 px-3 py-1 text-xs text-fg">
              Після
            </span>

            {/* Before (clipped via clip-path so image never squishes) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <Image
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1600&auto=format&fit=crop"
                alt="До стрижки"
                fill
                sizes="100vw"
                className="object-cover grayscale"
              />
              <span className="absolute bottom-4 left-4 rounded-full glass border border-white/10 px-3 py-1 text-xs text-fg">
                До
              </span>
            </div>

            {/* Handle */}
            <div
              className="absolute inset-y-0 z-10 flex items-center"
              style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
            >
              <div className="h-full w-px bg-white/70" />
              <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fg text-bg shadow-xl">
                <MoveHorizontal size={18} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
