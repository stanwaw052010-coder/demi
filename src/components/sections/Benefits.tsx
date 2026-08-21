import { BatteryCharging, Heart, Moon, Sparkles, Waves } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { MaskText } from "@/components/ui/motion";
import { benefits } from "@/data/content";

const icons = {
  waves: Waves,
  heart: Heart,
  sparkles: Sparkles,
  battery: BatteryCharging,
  moon: Moon,
} as const;

export function Benefits() {
  return (
    <Section id="efekt" tone="cream">
      <div className="flex flex-col gap-5">
        <SectionLabel tone="ink">Е Ф Е К Т</SectionLabel>
        <MaskText
          parts={[{ text: "Що дає" }, { text: "регулярний масаж", className: "italic text-ink/80" }]}
          className="max-w-[18ch] text-balance text-[2.2rem] leading-[1.06] text-ink sm:text-5xl md:text-[3.5rem]"
        />
      </div>

      <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
        {benefits.map((benefit, index) => {
          const Icon = icons[benefit.icon];
          return (
            <Reveal as="li" key={benefit.text} index={index} className="group flex flex-col gap-4">
              <span className="relative flex h-12 w-12 items-center justify-center text-gold-deep">
                <span
                  aria-hidden
                  className="absolute inset-0 border border-ink/20 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 group-hover:border-gold-deep/60"
                />
                <Icon
                  className="relative h-5 w-5 transition-transform duration-700 group-hover:scale-110"
                  strokeWidth={1.1}
                  aria-hidden
                />
              </span>
              <p className="text-pretty text-[0.98rem] leading-snug text-ink">{benefit.text}</p>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
