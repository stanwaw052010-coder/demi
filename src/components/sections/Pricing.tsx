import { ArrowRight, BadgePercent, Check, Info } from "lucide-react";
import { MotionItem } from "@/components/ui/MotionItem";
import { Reveal, StaggerGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SoftGlow } from "@/components/ui/Aurora";
import { Button } from "@/components/ui/Button";
import { priceTiers, promo, site } from "@/lib/site";
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
                      className="pointer-events-none absolute -top-28 -right-20 size-72 animate-float-slow rounded-full bg-aqua-500/25 blur-[80px]"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-24 -left-16 size-64 animate-float rounded-full bg-brand-500/30 blur-[80px]"
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
                    href={tier.highlight ? site.booking.url : "#consultation"}
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

        {/* промо + примітка */}
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <Reveal direction="up" delay={0.1}>
            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-5xl bg-linear-to-r from-brand-50 via-white to-aqua-200/40 p-8 ring-1 ring-brand-100 sm:flex-row sm:items-center md:p-10">
              <span
                aria-hidden
                className="pointer-events-none absolute -top-16 right-10 size-52 rounded-full bg-brand-300/25 blur-3xl"
              />
              <div className="relative z-10 flex items-start gap-5">
                <span className="grid size-14 shrink-0 place-items-center rounded-3xl bg-linear-to-br from-brand-600 to-brand-900 text-white shadow-glow">
                  <BadgePercent className="size-6" strokeWidth={2.2} />
                </span>
                <div>
                  <h3 className="text-[1.35rem] leading-tight font-extrabold tracking-[-0.03em] text-ink">
                    {promo.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-[0.92rem] leading-relaxed text-graphite-600 text-pretty">
                    {promo.text}
                  </p>
                </div>
              </div>
              <Button href={site.booking.url} size="lg" className="relative z-10 shrink-0">
                Скористатись
              </Button>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.18}>
            <div className="flex h-full items-start gap-4 rounded-5xl border border-graphite-200/70 bg-graphite-50 p-8">
              <Info className="mt-0.5 size-5 shrink-0 text-brand-500" strokeWidth={2.3} />
              <p className="text-[0.88rem] leading-relaxed text-graphite-600 text-pretty">
                Повний актуальний прайс на всі позиції надсилаємо у Instagram або називаємо телефоном —
                вартість залежить від складності роботи та стану стоп.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
