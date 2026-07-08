import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";
import { SERVICES } from "@/lib/site";

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-40">
      <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal variant="fade">
              <span className="mb-6 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-olive">
                <span className="h-px w-8 bg-green" />
                Наші послуги
              </span>
            </Reveal>
            <SplitReveal
              as="h2"
              text="Повний спектр естетичної косметології"
              className="font-display max-w-sm text-4xl leading-[1.15] text-ink md:text-[2.75rem]"
            />
            <Reveal variant="up" delay={0.1}>
              <p className="mt-7 max-w-sm text-[16px] leading-relaxed text-body">
                Кожен напрямок підбирається індивідуально під стан шкіри та мету
                клієнта — без шаблонних рішень.
              </p>
              <a
                href="#booking"
                className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-green-dark"
              >
                Записатися на консультацію
                <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} variant="up" delay={i * 0.05}>
              <a
                href="#booking"
                className="group flex flex-col gap-4 border-t border-line py-9 first:border-t last:border-b md:flex-row md:items-center md:justify-between md:gap-10"
              >
                <div className="flex items-baseline gap-6 md:w-1/2">
                  <span className="font-display text-lg text-green/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl text-ink transition-colors duration-300 group-hover:text-green-dark md:text-[1.7rem]">
                    {service.title}
                  </h3>
                </div>
                <p className="text-[15px] leading-relaxed text-body md:w-1/2">
                  {service.description}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
