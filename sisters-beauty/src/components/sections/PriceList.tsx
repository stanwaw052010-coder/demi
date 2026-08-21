"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { PriceRow } from "@/components/ui/PriceRow";
import { EffectsList } from "@/components/ui/EffectsList";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { priceCategories, priceNote, type ServiceCategory } from "@/data/services";
import { cn } from "@/lib/utils";

const HASH_PREFIX = "prays-";

function CategoryBody({ category }: { category: ServiceCategory }) {
  const isArosha = category.id === "arosha";

  return (
    <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
      <div>
        {category.intro ? (
          <p className="max-w-[68ch] text-pretty text-[0.98rem] text-beige">{category.intro}</p>
        ) : null}

        <div className="mt-8">
          {category.services.map((service) => (
            <PriceRow key={service.id} service={service} compact={isArosha} />
          ))}
        </div>

        {isArosha ? (
          <Link
            href="#arosha"
            className="label-spaced mt-7 inline-flex items-center gap-2 text-gold transition-colors hover:text-gold-light"
          >
            Детальніше про всі 8 програм
            <ChevronDown className="h-4 w-4" strokeWidth={1.25} aria-hidden />
          </Link>
        ) : null}

        {category.note ? (
          <p className="mt-7 border-l border-gold/40 pl-4 text-xs text-beige">{category.note}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-8">
        <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[3/4]">
          <Image
            src={category.image}
            alt={category.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 32vw"
            className="object-cover opacity-90"
          />
        </div>
        {category.effects ? (
          <div>
            <p className="label-spaced mb-4 text-gold">Е Ф Е К Т</p>
            <EffectsList items={category.effects} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function PriceList() {
  const [activeId, setActiveId] = useState<string>(priceCategories[0].id);
  const [openId, setOpenId] = useState<string | null>(priceCategories[0].id);

  const syncFromHash = useCallback(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash.startsWith(HASH_PREFIX)) return;
    const id = hash.slice(HASH_PREFIX.length);
    if (priceCategories.some((category) => category.id === id)) {
      setActiveId(id);
      setOpenId(id);
    }
  }, []);

  useEffect(() => {
    // синхронізація з хешем — підписка на зовнішній стан (адресний рядок),
    // початкове читання відкладаємо на кадр, щоб не каскадити рендери
    const frame = requestAnimationFrame(syncFromHash);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [syncFromHash]);

  return (
    <section id="prays" className="scroll-mt-24 bg-cocoa px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto w-full max-w-[1160px]">
        {/* якорі для карток напрямків */}
        {priceCategories.map((category) => (
          <span
            key={category.id}
            id={`${HASH_PREFIX}${category.id}`}
            aria-hidden
            className="block h-0 scroll-mt-28"
          />
        ))}

        <div className="flex flex-col gap-5">
          <SectionLabel>П Р А Й С</SectionLabel>
          <h2 className="text-balance text-[2.2rem] leading-[1.06] text-sand sm:text-5xl md:text-[3.5rem]">
            Меню процедур
          </h2>
          <p className="max-w-[62ch] text-pretty text-[0.98rem] text-beige">
            Повний перелік послуг студії з актуальними цінами. Тривалість і кількість процедур
            підбираємо на першій зустрічі.
          </p>
        </div>

        {/* ── Десктоп: таби ── */}
        <div className="mt-14 hidden lg:block">
          <div
            role="tablist"
            aria-label="Категорії прайсу"
            className="flex flex-wrap gap-x-8 gap-y-3 border-b border-gold/15 pb-4"
          >
            {priceCategories.map((category) => (
              <button
                key={category.id}
                role="tab"
                type="button"
                id={`tab-${category.id}`}
                aria-selected={activeId === category.id}
                aria-controls={`panel-${category.id}`}
                onClick={() => setActiveId(category.id)}
                className={cn(
                  "label-spaced relative pb-3 transition-colors duration-300",
                  activeId === category.id
                    ? "text-gold-light"
                    : "text-beige hover:text-sand",
                )}
              >
                {category.tabTitle}
                <span
                  aria-hidden
                  className={cn(
                    "absolute bottom-0 left-0 h-px bg-gold transition-all duration-500",
                    activeId === category.id ? "w-full" : "w-0",
                  )}
                />
              </button>
            ))}
          </div>

          {priceCategories.map((category) =>
            category.id === activeId ? (
              <div
                key={category.id}
                role="tabpanel"
                id={`panel-${category.id}`}
                aria-labelledby={`tab-${category.id}`}
                className="hairline mt-10 p-10"
              >
                <p className="label-spaced text-gold">{category.label}</p>
                <h3 className="mt-4 text-4xl text-sand">{category.title}</h3>
                <div className="mt-8">
                  <CategoryBody category={category} />
                </div>
              </div>
            ) : null,
          )}
        </div>

        {/* ── Мобайл і планшет: акордеон ── */}
        <div className="mt-12 flex flex-col lg:hidden">
          {priceCategories.map((category) => {
            const open = openId === category.id;
            return (
              <div key={category.id} className="border-b border-gold/15">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : category.id)}
                    aria-expanded={open}
                    aria-controls={`acc-${category.id}`}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <span>
                      <span className="label-spaced block text-gold">{category.label}</span>
                      <span className="mt-2 block font-display text-2xl text-sand">
                        {category.title}
                      </span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-gold transition-transform duration-500",
                        open && "rotate-180",
                      )}
                      strokeWidth={1.25}
                      aria-hidden
                    />
                  </button>
                </h3>
                <div id={`acc-${category.id}`} hidden={!open} className="pb-10">
                  <CategoryBody category={category} />
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-xs text-beige">{priceNote}</p>
      </div>
    </section>
  );
}
