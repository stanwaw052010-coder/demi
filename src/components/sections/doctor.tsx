import Image from "next/image";
import { Quote } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

const credentials = [
  { year: "2005", text: "Початок практики — терапевтична стоматологія" },
  { year: "2012", text: "Спеціалізація: художня реставрація та естетика" },
  { year: "2018", text: "Робота під операційним мікроскопом" },
  { year: "2025", text: "Понад 1000 пацієнтів щороку в Тернополі" },
];

export function Doctor() {
  return (
    <section id="doctor" className="grain relative bg-mist py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
          {/* Portrait */}
          <Reveal y={40}>
            <div className="relative">
              {/* Corner brackets — a quiet frame around the portrait */}
              <span
                aria-hidden
                className="absolute -left-3 -top-3 hidden size-16 rounded-tl-[20px] border-l border-t border-sand md:block"
              />
              <span
                aria-hidden
                className="absolute -bottom-3 -right-3 hidden size-16 rounded-br-[20px] border-b border-r border-sand md:block"
              />

              <div className="relative aspect-4/5 overflow-hidden rounded-[24px] bg-white shadow-[0_40px_110px_-60px_rgba(17,17,17,0.5)]">
                <Image
                  src="/images/doctor.jpg"
                  alt={`${site.doctor} — лікар-стоматолог у Тернополі`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              <div className="absolute -bottom-6 left-6 right-6 rounded-[20px] border border-ink/[0.06] bg-white/85 p-5 backdrop-blur-md shadow-[0_24px_60px_-36px_rgba(17,17,17,0.5)] sm:-bottom-8 sm:right-auto sm:pr-10">
                <p className="font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">
                  {site.doctor}
                </p>
                <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-ink/60">
                  Засновниця клініки
                </p>
              </div>
            </div>
          </Reveal>

          {/* Story */}
          <div className="pt-6 lg:pt-4">
            <Reveal>
              <div className="flex items-center gap-3">
                <span aria-hidden className="font-mono text-[11px] tabular-nums text-ink/30">
                  05
                </span>
                <span className="h-px w-8 bg-ink/15" />
                <span className="eyebrow">Про лікаря</span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="display-tight mt-6 font-display text-[32px] font-light text-ink sm:text-[44px] lg:text-[52px]">
                Двадцять років{" "}
                <span className="accent text-clay">однієї справи</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-graphite/75 md:text-[17px]">
                <p>
                  Наталія Жилан прийшла у стоматологію понад двадцять років тому —
                  і відтоді щодня доводить, що лікування може бути спокійним.
                  Пацієнти, які колись боялися крісла, сьогодні приводять сюди
                  своїх дітей.
                </p>
                <p>
                  У роботі — операційний мікроскоп, сертифіковані матеріали та
                  принцип максимального збереження власних тканин зуба. Кожен
                  план лікування обговорюється до початку роботи: без
                  несподіванок у кошторисі та без зайвих втручань.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <figure className="mt-10 rounded-[24px] border border-ink/[0.07] bg-white p-7 md:p-9">
                <Quote
                  className="size-6 text-sand"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <blockquote className="mt-5 font-display text-[20px] font-light leading-snug tracking-[-0.02em] text-ink md:text-[24px]">
                  «Я лікую не зуб, а людину. Тому спершу слухаю, а вже потім беру
                  інструмент».
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  <span className="accent text-[26px] leading-none text-clay">
                    {site.doctor}
                  </span>
                  <span
                    aria-hidden
                    className="h-px flex-1 bg-gradient-to-r from-sand to-transparent"
                  />
                </figcaption>
              </figure>
            </Reveal>

            <div className="mt-10 divide-y divide-ink/[0.08] border-t border-ink/[0.08]">
              {credentials.map((c, i) => (
                <Reveal key={c.year} delay={0.06 + i * 0.05}>
                  <div className="flex items-baseline gap-6 py-4">
                    <span className="w-14 shrink-0 font-mono text-[12px] tabular-nums text-ink/60">
                      {c.year}
                    </span>
                    <span className="text-[15px] text-graphite/75">{c.text}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <ButtonLink href="#contacts" size="lg" className="mt-10">
                Записатися до Наталії
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
