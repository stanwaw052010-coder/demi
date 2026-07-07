import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { ADVANTAGES } from "@/data/advantages";
import { ICON_MAP } from "@/lib/icons";

export function Advantages() {
  return (
    <section className="section-y section-x bg-white">
      <div className="container-lux flex flex-col gap-14">
        <SectionHeading
          kicker="Чому саме ми"
          title="Переваги Спабель"
          description="Кожна деталь нашого салону працює на ваш комфорт — від першого дзвінка до останньої процедури."
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((advantage, i) => {
            const Icon = ICON_MAP[advantage.icon];
            return (
              <Reveal key={advantage.title} delay={i * 0.05}>
                <div className="flex h-full flex-col gap-4 bg-white p-8 transition-colors hover:bg-secondary/60">
                  <Icon className="h-7 w-7 text-gold-600" strokeWidth={1.25} />
                  <h3 className="font-serif text-lg text-navy-950">{advantage.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {advantage.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
