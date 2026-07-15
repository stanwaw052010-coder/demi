"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, ArrowUpRight } from "lucide-react";
import { allServices, serviceCategories, type Service } from "@/data/services";
import { Input } from "@/components/ui/Input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";
import { BookButton } from "@/components/booking/BookButton";

function ServiceRow({ service }: { service: Service }) {
  return (
    <div className="flex flex-col gap-3 border-b border-navy-900/8 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <Link href={`/services/${service.slug}`} className="group flex-1">
        <p className="text-[15px] text-navy-900 transition-colors group-hover:text-gold-600">
          {service.name}
          {service.duration && (
            <span className="ml-2 text-xs text-navy-900/40">· {service.duration}</span>
          )}
        </p>
        {service.note && <p className="mt-0.5 text-xs text-navy-900/40">{service.note}</p>}
      </Link>
      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <span className="whitespace-nowrap font-serif text-lg text-navy-900">{service.price}</span>
        <BookButton variant="outline" size="sm" serviceName={service.name}>
          Записатися
        </BookButton>
      </div>
    </div>
  );
}

function ServicesExplorerInner() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const [query, setQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState(
    initialCategory && serviceCategories.some((c) => c.slug === initialCategory)
      ? initialCategory
      : serviceCategories[0].slug
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return allServices.filter((s) => s.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-900/35" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Пошук послуги, наприклад «манікюр» або «пілінг»"
          className="h-14 pl-11"
        />
      </div>

      {filtered ? (
        <div className="mt-10">
          <p className="mb-4 text-sm text-navy-900/50">
            Знайдено {filtered.length} {filtered.length === 1 ? "послугу" : "послуг"}
          </p>
          {filtered.length === 0 ? (
            <p className="py-10 text-center text-navy-900/50">
              Нічого не знайдено. Спробуйте інший запит.
            </p>
          ) : (
            <div className="divide-y divide-navy-900/8">
              {filtered.map((s) => (
                <ServiceRow key={s.slug} service={s} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-10">
          <TabsList>
            {serviceCategories.map((cat) => (
              <TabsTrigger key={cat.slug} value={cat.slug}>
                {cat.shortTitle}
              </TabsTrigger>
            ))}
          </TabsList>

          {serviceCategories.map((cat) => {
            const items = allServices.filter((s) => s.categorySlug === cat.slug);
            const subTitles = Array.from(new Set(items.map((s) => s.subcategoryTitle)));
            return (
              <TabsContent key={cat.slug} value={cat.slug}>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <p className="max-w-xl text-sm leading-relaxed text-navy-900/60">
                    {cat.description}
                  </p>
                  <Link
                    href={`/about`}
                    className="hidden shrink-0 items-center gap-1 text-sm text-gold-600 hover:underline lg:flex"
                  >
                    Про наш підхід <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <Accordion type="multiple" defaultValue={[subTitles[0]]} className="mt-8">
                  {subTitles.map((sub) => (
                    <AccordionItem key={sub} value={sub}>
                      <AccordionTrigger>{sub}</AccordionTrigger>
                      <AccordionContent>
                        <div className="divide-y divide-navy-900/8">
                          {items
                            .filter((s) => s.subcategoryTitle === sub)
                            .map((s) => (
                              <ServiceRow key={s.slug} service={s} />
                            ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            );
          })}
        </Tabs>
      )}
    </div>
  );
}

export function ServicesExplorer() {
  return (
    <React.Suspense fallback={null}>
      <ServicesExplorerInner />
    </React.Suspense>
  );
}
