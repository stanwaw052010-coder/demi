import { ArrowUpRight, Phone } from "lucide-react";
import { priceGroups, type PriceItem } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";

/** 1200 → «1 200» with a thin space, so columns of figures stay aligned. */
function hryvnia(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
        {item.price === null ? (
          <span className="text-[14px] font-medium text-graphite">
            за консультацією
          </span>
        ) : (
          <>
            {item.from && (
              <span
                className={cn(
                  "mr-1.5 text-[13px] font-medium",
                  item.featured ? "text-white/70" : "text-clay",
                )}
              >
                від
              </span>
            )}
            <span className="text-[18px] font-bold tabular-nums tracking-[-0.02em] md:text-[20px]">
              {hryvnia(item.price)}
            </span>
            <span
              className={cn(
                "ml-1 text-[14px] font-semibold",
                item.featured ? "text-white/70" : "text-clay",
              )}
            >
              ₴
            </span>
          </>
        )}
      </span>
    </li>
  );
}

export function Prices() {
  return (
    <section id="prices" className="grain relative bg-mist py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          index="02"
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

        <div className="mt-14 grid gap-4 md:mt-20 lg:grid-cols-2 lg:gap-5">
          {priceGroups.map((group, i) => (
            <Reveal key={group.id} delay={(i % 2) * 0.08} className="h-full">
              <div className="hairline flex h-full flex-col rounded-[24px] bg-white p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="font-mono text-[11px] tabular-nums text-ink/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-6 bg-ink/15" />
                  <h3 className="eyebrow">{group.label}</h3>
                </div>

                <ul className="mt-3 divide-y divide-ink/[0.07]">
                  {group.items.map((item) => (
                    <PriceRow key={item.title} item={item} />
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

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
