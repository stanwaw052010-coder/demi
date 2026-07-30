import { ArrowUpRight, Eye, Footprints, Leaf, Sparkles, Stethoscope, Zap } from "lucide-react";
import type { ComponentType } from "react";
import { MotionItem } from "@/components/ui/MotionItem";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { services, type Service } from "@/lib/site";
import { site } from "@/lib/site";

const icons: Record<Service["icon"], ComponentType<{ className?: string; strokeWidth?: number }>> = {
  podology: Stethoscope,
  nail: Sparkles,
  foot: Footprints,
  brows: Eye,
  laser: Zap,
  care: Leaf,
};

export function Services() {
  return (
    <section id="services" className="relative isolate overflow-hidden bg-graphite-50 py-24 md:py-32">
      <div className="container-x relative z-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Послуги"
            title="Всі процедури —"
            accent="один стандарт якості"
            text="Догляд за стопами, естетика нігтів і брів, лазерна епіляція. Однакова стерильність, однакова увага до деталей — незалежно від того, з чим ви прийшли."
            className="lg:max-w-2xl"
          />
          <Reveal direction="left" delay={0.2}>
            <Button href={site.booking.url} variant="light" size="lg">
              Обрати послугу онлайн
              <ArrowUpRight className="size-5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" strokeWidth={2.4} />
            </Button>
          </Reveal>
        </div>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
          {services.map((service) => {
            const Icon = icons[service.icon];

            return (
              <MotionItem key={service.slug} as="article" className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-5xl border border-graphite-200/70 bg-white p-8 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-transparent hover:shadow-lift">
                  {/* градієнтна підсвітка на hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-50 via-white to-aqua-200/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -right-16 size-56 rounded-full bg-brand-300/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <span className="grid size-14 place-items-center rounded-3xl bg-linear-to-br from-brand-600 to-brand-900 text-white shadow-glow transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-6">
                      <Icon className="size-6" strokeWidth={2.1} />
                    </span>
                    {service.featured && (
                      <span className="rounded-full bg-brand-50 px-3 py-1.5 text-[0.65rem] font-bold tracking-[0.14em] text-brand-700 uppercase ring-1 ring-brand-100">
                        Топ
                      </span>
                    )}
                  </div>

                  <h3 className="relative z-10 mt-7 text-[1.35rem] leading-tight font-extrabold tracking-[-0.03em] text-ink">
                    {service.title}
                  </h3>
                  <p className="relative z-10 mt-3.5 text-[0.95rem] leading-relaxed text-graphite-600 text-pretty">
                    {service.excerpt}
                  </p>

                  <ul className="relative z-10 mt-6 flex flex-col gap-2.5 border-t border-graphite-200/80 pt-6">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-[0.88rem] font-semibold text-graphite-700">
                        <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand-500" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={site.booking.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 mt-7 inline-flex items-center gap-2 text-[0.9rem] font-bold text-brand-700 transition-colors hover:text-brand-900"
                  >
                    Записатись
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.6}
                    />
                    <span className="absolute inset-0" aria-hidden />
                  </a>
                </div>
              </MotionItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
