import {
  Activity,
  ArrowUpRight,
  Award,
  Baby,
  Gem,
  Microscope,
  Phone,
  Route,
  Scissors,
  type LucideIcon,
} from "lucide-react";
import { priceGroups, priceHighlights, type PriceItem } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";

const icons: Record<string, LucideIcon> = {
  activity: Activity,
  microscope: Microscope,
  gem: Gem,
  award: Award,
  scissors: Scissors,
  baby: Baby,
  route: Route,
};

/** 1200 → «1 200» with a thin space, so columns of figures stay aligned. */
function grouped(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");
}

/**
 * One figure, a range («1 700 — 2 200») or «уточнюйте», in hryvnia or euro.
 * `muted` is the dimmer tone used for the «від» prefix and the currency sign.
 */
function PriceValue({
  item,
  size = "row",
  muted,
}: {
  item: Pick<PriceItem, "price" | "to" | "from" | "currency">;
  size?: "row" | "large";
  muted: string;
}) {
  if (item.price === null) {
    return (
      <span className={cn("text-[14px] font-medium", muted)}>уточнюйте</span>
    );
  }

  const figure =
    size === "large"
      ? "font-display text-[34px] font-bold tabular-nums leading-none tracking-[-0.035em] md:text-[40px]"
      : "text-[18px] font-bold tabular-nums tracking-[-0.02em] md:text-[20px]";
  const sign =
    size === "large" ? "text-[20px] font-semibold" : "text-[14px] font-semibold";

  return (
    <>
      {item.from && (
        <span className={cn("mr-1.5 text-[13px] font-medium", muted)}>від</span>
      )}
      <span className={figure}>
        {grouped(item.price)}
        {item.to !== undefined && ` \u2014 ${grouped(item.to)}`}
      </span>
      <span className={cn("ml-1", sign, muted)}>
        {item.currency === "EUR" ? "€" : "₴"}
      </span>
    </>
  );
}

function PriceRow({ item }: { item: PriceItem }) {
  return (
    <li
      className={cn(
        "flex items-baseline justify-between gap-3 py-4",
        item.featured && "-mx-4 rounded-[16px] bg-ink px-4 text-white md:-mx-5 md:px-5",
      )}
    >
      {/* min-w-0 so a long name wraps instead of squeezing the price out */}
      <span className="min-w-0">
        <span
          className={cn(
            "block text-[16px] font-medium leading-snug tracking-[-0.01em] md:text-[17px]",
            item.featured ? "text-white" : "text-ink",
          )}
        >
          {item.title}
        </span>
        {item.note && (
          <span
            className={cn(
              "mt-1 block text-[13px] leading-snug",
              item.featured ? "text-white/70" : "text-graphite",
            )}
          >
            {item.note}
          </span>
        )}
      </span>

      {/* Dotted leader, the way a printed price list does it. Too tight to
          be worth it on a phone — there the name and price just sit apart. */}
      <span
        aria-hidden
        className={cn(
          "rule-dotted mb-1.5 hidden h-px min-w-6 flex-1 sm:block",
          item.featured && "opacity-0",
        )}
      />

      <span
        className={cn(
          "shrink-0 whitespace-nowrap text-right",
          item.featured ? "text-white" : "text-ink",
        )}
      >
        <PriceValue
          item={item}
          muted={item.featured ? "text-white/70" : "text-clay"}
        />
      </span>
    </li>
  );
}

export function Prices() {
  return (
    <section id="prices" className="grain relative bg-mist py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="03"
          eyebrow="Ціни"
          title={
            <>
              Прозорий кошторис —{" "}
              <span className="accent text-clay">без сюрпризів</span>
            </>
          }
          description="Вартість ви бачите до того, як сісти в крісло. На консультації складаємо план лікування з переліком робіт і підсумковою сумою."
          action={
            <ButtonLink href="#booking" variant="secondary" size="md">
              Отримати розрахунок
            </ButtonLink>
          }
        />

        {/* The three figures patients ask about first, set large */}
        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 lg:gap-5">
          {priceHighlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="h-full">
              <div
                className={cn(
                  "group relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] p-7 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 md:p-8",
                  item.dark
                    ? "bg-ink text-white shadow-[0_30px_80px_-50px_rgba(17,17,17,0.7)]"
                    : "hairline bg-white",
                )}
              >
                <div>
                  <span
                    className={cn(
                      "eyebrow",
                      item.dark ? "text-white/70" : "text-clay",
                    )}
                  >
                    {item.label}
                  </span>
                  <h3
                    className={cn(
                      "mt-5 font-display text-[22px] font-light tracking-[-0.025em] md:text-[25px]",
                      item.dark ? "text-white" : "text-ink",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 max-w-[32ch] text-[14px] leading-relaxed",
                      item.dark ? "text-white/75" : "text-graphite",
                    )}
                  >
                    {item.note}
                  </p>
                </div>

                <p
                  className={cn(
                    "mt-10 flex flex-wrap items-baseline",
                    item.dark ? "text-white" : "text-ink",
                  )}
                >
                  <PriceValue
                    item={item}
                    size="large"
                    muted={item.dark ? "text-white/70" : "text-clay"}
                  />
                </p>

                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100",
                    item.dark
                      ? "bg-gradient-to-r from-white/70 to-transparent"
                      : "bg-gradient-to-r from-ink/50 to-transparent",
                  )}
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2 lg:gap-5">
          {priceGroups.map((group, i) => {
            const Icon = icons[group.icon];
            return (
              <Reveal key={group.id} delay={(i % 2) * 0.08} className="h-full">
                <div className="hairline flex h-full flex-col rounded-[24px] bg-white p-6 md:p-8">
                  <div className="flex items-center gap-3.5 border-b border-ink/[0.07] pb-5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-mist text-ink">
                      {Icon && (
                        <Icon className="size-5" strokeWidth={1.25} aria-hidden />
                      )}
                    </span>
                    <h3 className="font-display text-[18px] font-light tracking-[-0.02em] text-ink md:text-[20px]">
                      {group.label}
                    </h3>
                    <span
                      aria-hidden
                      className="ml-auto font-mono text-[11px] tabular-nums text-ink/40"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <ul className="divide-y divide-ink/[0.07]">
                    {group.items.map((item) => (
                      <PriceRow key={item.title} item={item} />
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}

          {/* Closing note + call, filling the odd cell of the grid */}
          <Reveal delay={0.08} className="h-full">
            <div className="flex h-full flex-col justify-between gap-8 rounded-[24px] bg-ink p-7 text-white md:p-9">
              <div>
                <span className="eyebrow text-white/70">Точна сума</span>
                <p className="mt-5 font-display text-[24px] font-light leading-snug tracking-[-0.02em] md:text-[28px]">
                  Ціни орієнтовні. Остаточну вартість визначаємо після огляду —
                  і <span className="accent text-white">до початку лікування</span>.
                </p>
                <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-white/80">
                  Ніяких дописаних сум під час прийому: якщо план змінюється,
                  ми спершу узгоджуємо це з вами.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={site.phoneHref}
                  variant="inverted"
                  size="lg"
                  className="font-semibold tabular-nums"
                >
                  <Phone className="size-4" strokeWidth={2.25} />
                  {site.phone}
                </ButtonLink>
                <ButtonLink
                  href="#booking"
                  size="lg"
                  className="border border-white/25 bg-transparent font-semibold text-white shadow-none hover:bg-white/10"
                >
                  Записатися
                  <ArrowUpRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
