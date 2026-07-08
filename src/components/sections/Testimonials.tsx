import { Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";
import { TESTIMONIALS } from "@/lib/site";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-warm-deep py-28 md:py-40">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal variant="fade">
              <span className="mb-6 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-olive">
                <span className="h-px w-8 bg-green" />
                Відгуки
              </span>
            </Reveal>
            <SplitReveal
              as="h2"
              text="Що кажуть наші клієнтки"
              className="font-display text-4xl leading-[1.15] text-ink md:text-[2.75rem]"
            />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="no-scrollbar container-x flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={i}
              variant="up"
              delay={i * 0.06}
              className="w-[85%] flex-none snap-start sm:w-[60%] lg:w-[32%]"
            >
              <figure className="flex h-full flex-col rounded-lg border border-line bg-warm p-9">
                <div className="flex gap-1 text-green">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={15} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-6 flex-1 text-[15.5px] leading-[1.85] text-body">
                  &laquo;{t.quote}&raquo;
                </blockquote>
                <figcaption className="mt-7 border-t border-line pt-5 text-[12px] font-semibold uppercase tracking-[0.1em] text-olive">
                  Клієнтка Rayskaya Beauty Space
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
