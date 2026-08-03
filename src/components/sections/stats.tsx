import { Sparkles } from "lucide-react";
import { stats } from "@/lib/content";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";

const topRow = "flex min-h-[46px] items-end sm:min-h-[58px] lg:min-h-[70px]";

export function Stats() {
  return (
    <section className="grain relative bg-cream py-20 md:py-28">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-10">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="flex h-full flex-col md:border-r md:border-sand/40 md:pr-8">
                <div className={topRow}>
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="display-tight font-display text-[44px] font-light leading-none tabular-nums text-ink sm:text-[56px] lg:text-[68px]"
                    suffixClassName="accent ml-0.5 text-clay"
                  />
                </div>
                <p className="mt-5 text-[15px] font-medium tracking-[-0.01em] text-ink md:text-[16px]">
                  {stat.label}
                </p>
                <p className="mt-1.5 text-[14px] text-graphite">{stat.note}</p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.24}>
            <div className="flex h-full flex-col">
              <div className={topRow}>
                <Sparkles
                  className="size-10 text-clay lg:size-12"
                  strokeWidth={0.8}
                  aria-hidden
                />
              </div>
              <p className="mt-5 text-[15px] font-medium tracking-[-0.01em] text-ink md:text-[16px]">
                Сучасне обладнання
              </p>
              <p className="mt-1.5 text-[14px] text-graphite">
                цифрова діагностика та стерильність
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
