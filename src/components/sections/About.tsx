import { Quote } from "lucide-react";
import Image from "next/image";
import { SoftGlow } from "@/components/ui/Aurora";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionItem } from "@/components/ui/MotionItem";

const stats = [
  { value: "24/7", label: "Онлайн запис у будь-яку годину" },
  { value: "4 в 1", label: "Подологія, нігті, брови, лазерна епіляція" },
  { value: "0 грн", label: "Консультація подолога для нових клієнтів" },
  { value: "4", label: "Майстрині, кожна у своєму напрямку" },
];

export function About() {
  return (
    <section id="about" className="relative isolate overflow-hidden bg-white py-24 md:py-32">
      <SoftGlow />

      <div className="container-x relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* візуал */}
          <Reveal direction="right" className="order-2 lg:order-1">
            <div className="relative">
              <div className="relative aspect-4/5 overflow-hidden rounded-6xl shadow-lift ring-1 ring-brand-100">
                <Image
                  src="/gallery/studio-sign.jpg"
                  alt="Вивіска ProfiTime у студії на пл. Шевченка, 3"
                  fill
                  sizes="(max-width: 1024px) 90vw, 38vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-brand-950/85 via-brand-950/15 to-transparent"
                />
                <div className="absolute inset-x-6 bottom-6 rounded-4xl px-6 py-5 glass">
                  <p className="text-[0.68rem] font-bold tracking-[0.2em] text-aqua-300 uppercase">
                    Простір у центрі міста
                  </p>
                  <p className="mt-2 text-[1.02rem] leading-snug font-bold text-white">
                    пл. Шевченка, 3 · Вишгород
                  </p>
                </div>
              </div>

              <div className="absolute -top-6 -right-4 hidden max-w-[15rem] rounded-4xl bg-white px-6 py-5 shadow-lift ring-1 ring-graphite-200/70 md:block">
                <Quote className="size-6 text-brand-300" strokeWidth={2.2} />
                <p className="mt-3 text-[0.9rem] leading-snug font-semibold text-graphite-700 text-pretty">
                  Здорові стопи — це не косметика. Це щоденний комфорт.
                </p>
              </div>
            </div>
          </Reveal>

          {/* текст */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Про студію"
              title="Не просто педикюр —"
              accent="робота з проблематикою"
              text={
                <>
                  ProfiTime — простір у Вишгороді, де подологія, нігтьовий сервіс, брови та лазерна епіляція
                  живуть під одним дахом. Ми починаємо з огляду й пояснюємо, що саме відбувається зі стопою
                  чи нігтем, звідки взялася проблема і що з нею робити далі.
                </>
              }
            />

            <Reveal direction="up" delay={0.2}>
              <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-graphite-600 text-pretty">
                Тому наші клієнти не «ходять на процедури» роками по колу: вони отримують план, бачать
                результат і повертаються вже за доглядом, а не за порятунком. А запис працює цілодобово —
                обираєте час тоді, коли зручно вам.
              </p>
            </Reveal>

            <StaggerGroup className="mt-11 grid grid-cols-2 gap-4 sm:gap-5">
              {stats.map((stat) => (
                <MotionItem
                  key={stat.value}
                  className="group rounded-4xl border border-graphite-200/70 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
                >
                  <p className="text-[2rem] leading-none font-extrabold tracking-[-0.04em] text-gradient">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[0.85rem] leading-snug font-medium text-graphite-500 text-pretty">
                    {stat.label}
                  </p>
                </MotionItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
