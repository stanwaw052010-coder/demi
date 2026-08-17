import { ArrowRight, Check, Info } from "lucide-react";
import { MotionItem } from "@/components/ui/MotionItem";
import { PriceList } from "@/components/PriceList";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SoftGlow } from "@/components/ui/Aurora";
import { Button } from "@/components/ui/Button";
import { priceTiers, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="price" className="relative isolate overflow-hidden bg-white py-24 md:py-32">
      <SoftGlow />

      <div className="container-x relative z-10">
        <SectionHeading
          align="center"
          eyebrow="Прайс"
          title="Прозора вартість"
          accent="без сюрпризів"
          text="Ми називаємо ціну до початку роботи. Там, де вартість залежить від стану стопи, — підтверджуємо її після огляду, а не в кінці візиту."
          className="mx-auto"
        />

        <StaggerGroup className="mt-14 grid items-stretch gap-6 lg:grid-cols-3 md:mt-18">
          {priceTiers.map((tier) => (
            <MotionItem key={tier.name} as="article" className="h-full">
              <div
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-6xl p-8 transition-all duration-500 ease-out md:p-10",
                  tier.highlight
                    ? "grain bg-linear-to-br from-brand-800 via-brand-900 to-brand-950 text-white shadow-[0_50px_100px_-40px_rgb(10_27_68/0.75)] lg:-my-4 lg:py-14"
                    : "border border-graphite-200/70 bg-white hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift",
                )}
              >
                {tier.highlight && (
                  <>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-radial-[at_88%_6%] from-aqua-500/25 to-transparent to-55%"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-radial-[at_8%_96%] from-brand-500/30 to-transparent to-55%"
                    />
                  </>
                )}

                <div className="relative z-10 flex items-center justify-between gap-4">
                  <h3
                    className={cn(
                      "text-[1.3rem] leading-tight font-extrabold tracking-[-0.03em]",
                      tier.highlight ? "text-white" : "text-ink",
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.badge && (
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-3 py-1.5 text-[0.62rem] font-bold tracking-[0.14em] uppercase",
                        tier.highlight
                          ? "bg-white/12 text-aqua-300 ring-1 ring-white/20"
                          : "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
                      )}
                    >
                      {tier.badge}
                    </span>
                  )}
                </div>

                <p
                  className={cn(
                    "relative z-10 mt-3 text-[0.92rem] leading-relaxed text-pretty",
                    tier.highlight ? "text-white/60" : "text-graphite-500",
                  )}
                >
                  {tier.caption}
                </p>

                <div className="relative z-10 mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span
                    className={cn(
                      "leading-none font-extrabold tracking-[-0.045em]",
                      // довгі формулювання («Ціна уточнюється») набираємо дрібніше
                      tier.price.length > 12
                        ? "text-[clamp(1.5rem,1.15rem+0.9vw,2rem)]"
                        : "text-[clamp(1.9rem,1.3rem+1.6vw,2.75rem)]",
                      tier.highlight ? "text-white" : "text-gradient",
                    )}
                  >
                    {tier.price}
                  </span>
                  {tier.priceNote && (
                    <span
                      className={cn(
                        "text-[0.82rem] font-semibold",
                        tier.highlight ? "text-white/50" : "text-graphite-400",
                      )}
                    >
                      {tier.priceNote}
                    </span>
                  )}
                </div>

                <ul
                  className={cn(
                    "relative z-10 mt-8 flex flex-1 flex-col gap-3.5 border-t pt-8",
                    tier.highlight ? "border-white/12" : "border-graphite-200/80",
                  )}
                >
                  {tier.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                          tier.highlight ? "bg-aqua-400/20 text-aqua-300" : "bg-brand-50 text-brand-600",
                        )}
                      >
                        <Check className="size-3" strokeWidth={3.2} />
                      </span>
                      <span
                        className={cn(
                          "text-[0.92rem] leading-snug font-medium text-pretty",
                          tier.highlight ? "text-white/75" : "text-graphite-700",
                        )}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="relative z-10 mt-9">
                  <Button
                    href={tier.highlight ? site.booking.url : "#contacts"}
                    variant={tier.highlight ? "light" : "outline"}
                    size="md"
                    className="w-full"
                  >
                    {tier.highlight ? "Записатись онлайн" : "Уточнити вартість"}
                    <ArrowRight
                      className="size-[1.05rem] transition-transform duration-300 group-hover/btn:translate-x-1"
                      strokeWidth={2.4}
                    />
                  </Button>
                </div>
              </div>
            </MotionItem>
          ))}
        </StaggerGroup>

        {/* примітка про діапазони цін */}
        <Reveal direction="up" delay={0.1} className="mt-8">
          <div className="mx-auto flex max-w-3xl items-start gap-4 rounded-5xl border border-graphite-200/70 bg-graphite-50 p-8">
            <Info className="mt-0.5 size-5 shrink-0 text-brand-500" strokeWidth={2.3} />
            <p className="text-[0.92rem] leading-relaxed text-graphite-600 text-pretty">
              Там, де вказано діапазон, точну суму називаємо після огляду — вона залежить від складності
              роботи та стану стоп. Жодних доплат «по факту» в кінці візиту.
            </p>
          </div>
        </Reveal>

        {/* повний прайс-лист */}
        <Reveal direction="up" className="mt-20 md:mt-28">
          <h3 className="text-center text-[clamp(1.6rem,1.2rem+1.4vw,2.3rem)] leading-tight font-extrabold tracking-[-0.035em] text-ink text-balance">
            Повний <span className="font-serif font-medium text-brand-600 italic">прайс-лист</span>
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-center text-[0.98rem] leading-relaxed text-graphite-600 text-pretty">
            Усі процедури студії з цінами — так само, як в офіційному прайсі ProfiTime.
          </p>
        </Reveal>

        <div className="mt-12">
          <PriceList />
        </div>
      </div>
    </section>
  );
}
