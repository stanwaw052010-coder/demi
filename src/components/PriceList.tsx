"use client";

import { useState } from "react";
import { priceList, type PriceRow } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Повний прайс-лист із перемиканням між напрямками. */
export function PriceList() {
  const [active, setActive] = useState(0);
  const category = priceList[active];

  return (
    <div>
      {/* перемикач напрямків: індикатор їде transform-ом, без JS-анімації */}
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="Напрямки прайсу"
          className="relative inline-flex rounded-full border border-graphite-200/80 bg-white p-1.5 shadow-soft"
        >
          <span
            aria-hidden
            className="absolute inset-y-1.5 left-1.5 rounded-full bg-linear-to-br from-brand-600 via-brand-700 to-brand-900 shadow-glow transition-transform duration-450 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              width: `calc((100% - 0.75rem) / ${priceList.length})`,
              transform: `translateX(${active * 100}%)`,
            }}
          />
          {priceList.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "relative z-10 flex-1 cursor-pointer rounded-full px-6 py-3 text-[0.92rem] font-bold tracking-[-0.01em] whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 sm:px-8",
                i === active ? "text-white" : "text-graphite-600 hover:text-brand-800",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* key перезапускає CSS-анімацію появи при зміні вкладки */}
      <div key={category.id} className="animate-tab-in">
          <p className="mt-6 text-center text-[0.92rem] font-medium text-graphite-500">
            {category.caption}
          </p>

          <div className="mt-10 lg:columns-2 lg:gap-6">
            {category.groups.map((group) => (
              <section
                key={group.title}
                className="mb-6 break-inside-avoid rounded-5xl border border-graphite-200/70 bg-white p-7 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:p-8"
              >
                <h3 className="text-[1.15rem] leading-tight font-extrabold tracking-[-0.025em] text-ink">
                  {group.title}
                </h3>
                {group.note && (
                  <p className="mt-2.5 text-[0.83rem] leading-relaxed text-graphite-500 text-pretty">
                    {group.note}
                  </p>
                )}

                {group.columns && (
                  <div className="mt-6 flex items-baseline justify-end gap-3 border-b border-graphite-200/80 pb-2.5">
                    {group.columns.map((label) => (
                      <span
                        key={label}
                        className="w-[3.9rem] text-right text-[0.66rem] font-bold tracking-[0.12em] text-graphite-400 uppercase sm:w-20"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                )}

                <ul className={cn("flex flex-col gap-4", group.columns ? "mt-4" : "mt-6")}>
                  {group.rows.map((row, i) => (
                    <Row key={`${row.name}-${i}`} row={row} dual={Boolean(group.columns)} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
      </div>
    </div>
  );
}

function Row({ row, dual }: { row: PriceRow; dual: boolean }) {
  const prices = Array.isArray(row.price) ? row.price : [row.price];

  return (
    <li className="flex items-baseline gap-3">
      {/* на мобільних із двома колонками віддаємо назві весь вільний простір */}
      <span className={cn("min-w-0 shrink", dual && "flex-1 sm:flex-none")}>
        <span className="block text-[0.92rem] leading-snug font-semibold text-graphite-700 text-pretty">
          {row.name}
        </span>
        {row.note && (
          <span className="mt-0.5 block text-[0.78rem] leading-snug text-graphite-400 italic">
            {row.note}
          </span>
        )}
      </span>

      <span
        aria-hidden
        className={cn(
          "min-w-4 flex-1 translate-y-[-0.25rem] border-b border-dashed border-graphite-200",
          dual && "hidden sm:block",
        )}
      />

      {dual ? (
        prices.map((price, i) => (
          <span
            key={i}
            className={cn(
              "w-[3.9rem] shrink-0 text-right text-[0.9rem] font-extrabold tracking-[-0.02em] tabular-nums sm:w-20",
              i === 0 ? "text-graphite-500" : "text-brand-800",
            )}
          >
            {price}
          </span>
        ))
      ) : (
        <span className="shrink-0 text-right text-[0.95rem] font-extrabold tracking-[-0.02em] tabular-nums text-brand-800">
          {prices[0]}
        </span>
      )}
    </li>
  );
}
