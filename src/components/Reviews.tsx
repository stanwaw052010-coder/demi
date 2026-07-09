"use client";

import { REVIEWS } from "@/lib/site";
import { Eyebrow, Reveal, SectionTitle } from "./Reveal";

export default function Reviews() {
  return (
    <section id="reviews" className="bg-warm px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-[1040px]">
        <Reveal>
          <Eyebrow>Відгуки</Eyebrow>
          <SectionTitle>Що кажуть клієнтки</SectionTitle>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal
              key={r.name + r.service}
              delay={0.06 * i}
              className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <article className="hairline relative h-full border-[0.5px] bg-cream px-7 py-8">
                <span
                  aria-hidden
                  className="absolute top-2.5 left-5 font-display text-[72px] leading-none text-brand opacity-20"
                >
                  &ldquo;
                </span>
                <div
                  className="mb-4 text-xs tracking-[3px] text-brand-deep"
                  aria-label="5 зірок"
                >
                  ★★★★★
                </div>
                <p className="mb-5 text-sm leading-[1.82] italic text-muted">
                  «{r.text}»
                </p>
                <div className="text-[13px] font-normal text-ink">{r.name}</div>
                <div className="mt-0.5 text-[11px] tracking-[0.04em] text-muted-light">
                  {r.service}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
