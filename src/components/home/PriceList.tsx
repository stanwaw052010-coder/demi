"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { PRICE_CATEGORIES } from "@/data/pricing";
import { PriceRows } from "@/components/shared/PriceRows";

export function PriceList() {
  const [query, setQuery] = useState("");
  const trimmed = query.trim();

  const searchResults = useMemo(() => {
    if (!trimmed) return null;
    const q = trimmed.toLowerCase();
    return PRICE_CATEGORIES.map((category) => ({
      category,
      items: category.groups.flatMap((group) =>
        group.items.filter((item) => item.name.toLowerCase().includes(q))
      ),
    })).filter((entry) => entry.items.length > 0);
  }, [trimmed]);

  return (
    <section className="section-y section-x bg-white" id="price">
      <div className="container-lux flex flex-col gap-10">
        <SectionHeading
          kicker="Прайс-лист"
          title="Вартість послуг"
          description="Повний перелік послуг та цін. Скористайтеся пошуком або оберіть категорію нижче."
        />

        <div className="relative mx-auto w-full max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Пошук послуги, наприклад «манікюр» або «пілінг»"
            className="pl-11 pr-11"
            aria-label="Пошук послуг у прайсі"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-navy-900"
              aria-label="Очистити пошук"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        {searchResults ? (
          <div className="flex flex-col gap-8">
            {searchResults.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">
                Нічого не знайдено. Спробуйте інший запит.
              </p>
            ) : (
              searchResults.map(({ category, items }) => (
                <div key={category.id}>
                  <h3 className="mb-1 font-serif text-lg text-navy-950">{category.title}</h3>
                  <PriceRows items={items} />
                </div>
              ))
            )}
          </div>
        ) : (
          <Tabs defaultValue={PRICE_CATEGORIES[0].id}>
            <TabsList>
              {PRICE_CATEGORIES.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {PRICE_CATEGORIES.map((category) => {
              const isFlat = category.groups.length === 1 && !category.groups[0].title;
              return (
                <TabsContent key={category.id} value={category.id} className="flex flex-col gap-4">
                  {isFlat ? (
                    <PriceRows items={category.groups[0].items} />
                  ) : (
                    <Accordion type="multiple" defaultValue={[category.groups[0]?.title ?? ""]}>
                      {category.groups.map((group) => (
                        <AccordionItem key={group.title} value={group.title ?? ""}>
                          <AccordionTrigger>{group.title}</AccordionTrigger>
                          <AccordionContent>
                            <PriceRows items={group.items} />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}

                  {category.note ? (
                    <p className="text-xs italic text-muted-foreground">{category.note}</p>
                  ) : null}

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Button variant="gold" asChild>
                      <Link href="#booking">Записатися на послугу</Link>
                    </Button>
                    {category.serviceSlug ? (
                      <Link
                        href={`/services/${category.serviceSlug}`}
                        className="text-sm text-navy-800 underline underline-offset-4 hover:text-navy-950"
                      >
                        Детальніше про напрям
                      </Link>
                    ) : null}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        )}
      </div>
    </section>
  );
}
