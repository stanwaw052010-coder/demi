"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Collapse, MaskText } from "@/components/ui/motion";
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

        <motion.div
          className="mt-8"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.07, delayChildren: 0.12 }}
        >
          {category.services.map((service) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <PriceRow service={service} compact={isArosha} />
            </motion.div>
          ))}
        </motion.div>

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
          <p className="mt-7 rounded-[var(--r-md)] border border-gold/25 bg-espresso/40 px-5 py-4 text-xs text-beige">
            {category.note}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-8">
        <div className="arch relative aspect-[4/3] w-full shadow-[var(--shadow-soft)] lg:aspect-[3/4]">
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
    <section
      id="prays"
      className="curve-top relative z-10 scroll-mt-24 bg-cocoa px-5 py-20 sm:px-8 md:py-28"
    >
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
          <MaskText
            parts={[{ text: "Меню" }, { text: "процедур", className: "italic text-gold-light" }]}
            className="text-balance text-[2.2rem] leading-[1.06] text-sand sm:text-5xl md:text-[3.5rem]"
          />
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
            className="flex flex-wrap gap-2"
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
                  "label-spaced relative rounded-[var(--r-pill)] px-5 py-3 transition-colors duration-300",
                  activeId === category.id
                    ? "text-espresso"
                    : "text-beige hover:text-sand",
                )}
              >
                {activeId === category.id ? (
                  <motion.span
                    aria-hidden
                    layoutId="price-tab-pill"
                    transition={{ type: "spring", stiffness: 320, damping: 34 }}
                    className="absolute inset-0 rounded-[var(--r-pill)] bg-gold"
                  />
                ) : null}
                <span className="relative">{category.tabTitle}</span>
              </button>
            ))}
          </div>

          {priceCategories.map((category) =>
            category.id === activeId ? (
              <motion.div
                key={category.id}
                role="tabpanel"
                id={`panel-${category.id}`}
                aria-labelledby={`tab-${category.id}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="hairline mt-10 rounded-[var(--r-xl)] bg-espresso/35 p-10 shadow-[var(--shadow-soft)]"
              >
                <p className="label-spaced text-gold">{category.label}</p>
                <h3 className="mt-4 text-4xl text-sand">{category.title}</h3>
                <div className="mt-8">
                  <CategoryBody category={category} />
                </div>
              </motion.div>
            ) : null,
          )}
        </div>

        {/* ── Мобайл і планшет: акордеон ── */}
        <div className="mt-12 flex flex-col lg:hidden">
          {priceCategories.map((category) => {
            const open = openId === category.id;
            return (
              <div
                key={category.id}
                className={cn(
                  "card mb-3 overflow-hidden rounded-[var(--r-lg)] px-5 transition-colors duration-500",
                  open ? "border-gold/45" : "",
                )}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : category.id)}
                    aria-expanded={open}
                    aria-controls={`acc-${category.id}`}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <span>
                      <span className="label-spaced block text-[0.6rem] tracking-[0.16em] text-gold sm:text-xs sm:tracking-[0.25em]">
                        {category.label}
                      </span>
                      <span className="mt-2 block font-display text-2xl text-sand">
                        {category.title}
                      </span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-9 w-9 shrink-0 rounded-full border border-gold/30 p-2 text-gold transition-transform duration-500",
                        open && "rotate-180",
                      )}
                      strokeWidth={1.25}
                      aria-hidden
                    />
                  </button>
                </h3>
                <Collapse open={open} id={`acc-${category.id}`}>
                  <div className="pb-8">
                    <CategoryBody category={category} />
                  </div>
                </Collapse>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-xs text-beige">{priceNote}</p>
      </div>
    </section>
  );
}
