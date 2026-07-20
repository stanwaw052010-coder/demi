"use client";

import { Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { PhotoArt, BotanicalSprig } from "./Decor";

const points = [
  "Сертифікований майстер ендосфера- та LPG-терапії",
  "Викладач авторських курсів масажу",
  "Індивідуальний протокол під вашу мету",
  "Робота на професійному апаратному обладнанні",
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Portrait */}
        <Reveal direction="right" className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-sm lg:mx-0 lg:max-w-none">
            <PhotoArt
              variant="rose"
              motif="sprig"
              className="aspect-[4/5] w-full rounded-[2rem] shadow-xl"
            />
            <div className="absolute -bottom-8 -right-4 w-48 rounded-2xl bg-ink px-6 py-5 text-cream shadow-2xl sm:-right-8">
              <div className="font-display text-2xl italic">Анжела</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-gold-soft">
                масажист · викладач
              </div>
            </div>
            <BotanicalSprig className="absolute -left-8 -top-8 hidden h-28 text-gold/40 lg:block" />
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow text-rose-deep">Про мене</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Мистецтво повертати тілу{" "}
              <em className="text-rose-gradient not-italic">гармонію</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Мене звати Анжела Кропивницька. Вже понад вісім років я допомагаю
              жінкам почуватися впевнено у власному тілі — за допомогою
              апаратних та ручних технік корекції фігури.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 leading-relaxed text-ink-soft">
              Кожен сеанс — це не просто процедура, а турбота про ваше здоров&apos;я
              та красу. Я не обіцяю чарівництва — я даю чесний результат,
              побудований на знаннях, досвіді та щирій любові до своєї справи.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-rose/15 text-rose-deep">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-snug text-ink">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.25}>
            <blockquote className="mt-9 border-l-2 border-rose pl-5 font-display text-xl italic text-ink">
              «Нехай ваше життя складається так, щоб масаж був не розкішшю, а
              приємною звичкою.»
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
