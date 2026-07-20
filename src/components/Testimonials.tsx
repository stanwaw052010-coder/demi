"use client";

import { Star, Quote } from "lucide-react";
import { Reveal } from "./Reveal";

const reviews = [
  {
    name: "Оксана",
    role: "клієнтка · 6 місяців",
    text: "Ходжу до Анжели вже пів року — целюліт помітно зменшився, а ноги більше не набрякають після роботи. Найкращий масаж у Бучі!",
    initial: "О",
  },
  {
    name: "Ірина",
    role: "курс LPG",
    text: "Після курсу мінус 6 см у талії та зовсім інший силует. Анжела — професіонал з великої літери, все пояснює й підтримує.",
    initial: "І",
  },
  {
    name: "Марина",
    role: "клієнтка",
    text: "Дуже приємна атмосфера, руки золоті. Виходжу після сеансу наче новенька — і тіло легке, і настрій чудовий.",
    initial: "М",
  },
  {
    name: "Юлія",
    role: "випускниця курсу",
    text: "Проходила навчання з ендосфери — багато практики, все структуровано. Тепер сама працюю майстром і маю клієнтів!",
    initial: "Ю",
  },
  {
    name: "Катерина",
    role: "клієнтка",
    text: "Набряки знімає буквально за пару сеансів. Дуже уважна до деталей, підбирає програму саме під тебе. Рекомендую!",
    initial: "К",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-lg">
            <Reveal>
              <span className="eyebrow text-rose-deep">Відгуки</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
                Що кажуть мої{" "}
                <em className="text-rose-gradient not-italic">клієнтки</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-sm text-ink-soft">
                <strong className="text-ink">5.0</strong> · сотні відгуків
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
            {reviews.map((r) => (
              <article
                key={r.name}
                className="flex w-[85vw] max-w-sm flex-none snap-start flex-col rounded-3xl bg-cream-2 p-8 shadow-[0_2px_24px_-16px_rgba(34,26,21,0.4)] ring-1 ring-gold/10 sm:w-[26rem]"
              >
                <Quote className="h-9 w-9 text-rose/40" />
                <p className="mt-5 flex-1 text-lg leading-relaxed text-ink">
                  {r.text}
                </p>
                <div className="mt-7 flex items-center gap-4 border-t border-gold/10 pt-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep font-display text-xl text-cream">
                    {r.initial}
                  </span>
                  <div>
                    <div className="font-semibold text-ink">{r.name}</div>
                    <div className="text-xs uppercase tracking-wider text-ink-soft">
                      {r.role}
                    </div>
                  </div>
                  <div className="ml-auto flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
        <p className="mt-2 text-center text-xs uppercase tracking-widest text-ink-soft sm:hidden">
          ← гортайте →
        </p>
      </div>
    </section>
  );
}
