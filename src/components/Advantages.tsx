"use client";

import {
  Award,
  HeartHandshake,
  MonitorCog,
  ShieldCheck,
  Sofa,
} from "lucide-react";
import { Eyebrow, Reveal } from "./Reveal";

const ITEMS = [
  {
    icon: Award,
    title: "Досвідчені фахівці",
    text: "Сертифіковані косметологи з медичною освітою, понад 13 років досвіду та постійним підвищенням кваліфікації в Україні й за кордоном.",
  },
  {
    icon: MonitorCog,
    title: "Сучасне обладнання",
    text: "Працюємо на обладнанні провідних світових брендів для апаратної косметології та лазерних процедур.",
  },
  {
    icon: ShieldCheck,
    title: "Безпечні процедури",
    text: "Використовуємо лише сертифіковані препарати та сучасні протоколи.",
  },
  {
    icon: HeartHandshake,
    title: "Індивідуальний підхід",
    text: "Для кожного клієнта складаємо персональний план догляду з урахуванням стану шкіри, особливостей організму та бажаного результату.",
  },
  {
    icon: Sofa,
    title: "Комфорт",
    text: "Ми створили простір, у якому приємно піклуватися про себе: затишна атмосфера і уважний сервіс.",
  },
];

export default function Advantages() {
  return (
    <section id="advantages" className="relative py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-7xl bg-ink/10"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Reveal>
              <Eyebrow>Чому обирають нас</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-4xl leading-[1.12] font-medium tracking-tight text-ink text-balance sm:text-5xl">
                Наші <em className="font-normal italic text-olive">переваги</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="max-w-xl text-lg leading-relaxed text-stone lg:justify-self-end">
              Пʼять принципів, на яких тримається довіра наших клієнтів — від
              першої консультації до видимого результату.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {ITEMS.map((item, i) => (
            <Reveal
              key={item.title}
              delay={0.08 * i}
              className={
                i < 2
                  ? "lg:col-span-3"
                  : "sm:last:col-span-2 lg:col-span-2 lg:last:col-span-2"
              }
            >
              <article className="group relative h-full overflow-hidden rounded-[2rem] border border-ink/8 bg-white/70 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/50 hover:shadow-[0_30px_60px_-30px_rgba(94,122,52,0.45)] lg:p-9">
                <div
                  aria-hidden
                  className="absolute -right-16 -top-16 size-40 rounded-full bg-brand-mist opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative flex size-14 items-center justify-center rounded-2xl border border-brand/35 bg-brand-mist/60 text-olive transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                  <item.icon className="size-6" strokeWidth={1.5} />
                </div>
                <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.26em] text-brand">
                  0{i + 1}
                </p>
                <h3 className="mt-2 font-display text-2xl font-medium text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-stone">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
