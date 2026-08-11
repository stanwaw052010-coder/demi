import { Clock, HeartHandshake, MapPin, Sparkles, Stethoscope, TrendingUp } from "lucide-react";
import type { ComponentType } from "react";
import { Aurora } from "@/components/ui/Aurora";
import { MotionItem } from "@/components/ui/MotionItem";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { advantages, safetySteps, type Advantage } from "@/lib/site";

const icons: Record<Advantage["icon"], ComponentType<{ className?: string; strokeWidth?: number }>> = {
  stethoscope: Stethoscope,
  sparkles: Sparkles,
  clock: Clock,
  pin: MapPin,
  heart: HeartHandshake,
  chart: TrendingUp,
};

export function Advantages() {
  return (
    <section
      id="advantages"
      className="relative isolate grain overflow-hidden bg-brand-950 py-24 md:py-32"
    >
      <Aurora />

      <div className="container-x relative z-10">
        <SectionHeading
          tone="light"
          align="center"
          eyebrow="Наші переваги"
          title="Чому клієнти повертаються"
          accent="саме сюди"
          text="Шість причин, які клієнти називають найчастіше — і які ми свідомо тримаємо як стандарт роботи студії."
          className="mx-auto"
        />

        <StaggerGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-18">
          {advantages.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <MotionItem key={item.title} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-5xl p-8 transition-all duration-500 ease-out glass hover:-translate-y-1.5 hover:bg-white/[0.11]">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-radial-[at_92%_4%] from-aqua-400/22 to-transparent to-55% opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="grid size-13 place-items-center rounded-2xl bg-white/10 text-aqua-300 ring-1 ring-white/15 transition-all duration-500 group-hover:bg-white group-hover:text-brand-800">
                      <Icon className="size-6" strokeWidth={2.1} />
                    </span>
                    <span className="font-serif text-3xl leading-none font-medium text-white/12 italic">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="relative z-10 mt-7 text-[1.2rem] leading-tight font-extrabold tracking-[-0.025em] text-white">
                    {item.title}
                  </h3>
                  <p className="relative z-10 mt-3 text-[0.93rem] leading-relaxed text-white/60 text-pretty">
                    {item.text}
                  </p>
                </div>
              </MotionItem>
            );
          })}
        </StaggerGroup>

        {/* -------------------- Безпека -------------------- */}
        <div className="mt-24 md:mt-32">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <SectionHeading
              tone="light"
              eyebrow="Безпека"
              title="Стерильність, яку"
              accent="видно"
              text="Чотири кроки, які проходить кожен інструмент перед тим, як торкнутися вас. Останній крок ви бачите на власні очі."
            />

            <div className="relative">
              <span
                aria-hidden
                className="absolute top-6 bottom-6 left-[1.65rem] w-px bg-linear-to-b from-aqua-400/60 via-white/15 to-transparent sm:left-[1.9rem]"
              />
              <ol className="flex flex-col gap-4">
                {safetySteps.map((step, i) => (
                  <Reveal key={step.step} direction="left" delay={i * 0.08} as="li">
                    <div className="group relative flex gap-5 rounded-4xl p-5 transition-colors duration-500 hover:bg-white/[0.06] sm:gap-6 sm:p-6">
                      <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full bg-brand-950 text-[0.95rem] font-extrabold text-aqua-300 ring-1 ring-white/15 transition-all duration-500 group-hover:bg-white group-hover:text-brand-900 sm:size-16">
                        {step.step}
                      </span>
                      <div className="pt-2">
                        <h3 className="text-[1.08rem] font-extrabold tracking-[-0.02em] text-white">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-[0.92rem] leading-relaxed text-white/60 text-pretty">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
