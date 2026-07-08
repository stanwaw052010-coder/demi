import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PhotoSlot } from "@/components/shared/PhotoSlot";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { SERVICES } from "@/data/services";
import { ICON_MAP } from "@/lib/icons";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Всі послуги",
  description:
    "Повний перелік напрямів салону Спабель: лазерна епіляція, IPL Shiny, косметологія, SPA та масаж, перукарські послуги, нігтьовий сервіс.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Всі послуги — ${SITE.name}`,
    description: "Повний перелік напрямів салону краси та SPA Спабель у Запоріжжі.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative flex min-h-[42vh] items-end overflow-hidden bg-navy-950">
        <PhotoSlot
          category="cosmetolog"
          index={4}
          alt="Послуги салону Спабель"
          label="Косметолог — фото 4"
          className="absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/30" />
        <div className="container-lux section-x relative z-10 flex flex-col gap-4 pb-16 pt-32">
          <span className="text-xs sm:text-sm tracking-[0.4em] uppercase text-gold-400">
            Каталог послуг
          </span>
          <h1 className="max-w-2xl text-4xl font-medium leading-[1.1] text-white sm:text-5xl">
            Всі послуги салону
          </h1>
        </div>
      </section>

      <section className="section-y section-x bg-white">
        <div className="container-lux flex flex-col gap-14">
          <SectionHeading
            kicker="Напрями"
            title="Оберіть свій ритуал турботи"
            description="Кожен напрям відкриває детальний опис, перелік процедур та актуальні ціни."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon];
              return (
                <Reveal key={service.slug} delay={i * 0.06}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col overflow-hidden border border-border bg-white"
                  >
                    <PhotoSlot
                      category={service.photoCategory}
                      index={service.photoIndexes[0]}
                      alt={service.title}
                      label={`${service.shortTitle} — фото`}
                      className="aspect-[4/3] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <Icon className="h-5 w-5 text-gold-600" strokeWidth={1.25} />
                      <h2 className="font-serif text-xl text-navy-950">{service.title}</h2>
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        {service.shortDescription}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-navy-900">
                        Детальніше
                        <ArrowUpRight className="h-3.5 w-3.5 text-gold-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div className="border border-border bg-secondary/50 p-8 text-center sm:p-10">
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground">
              Повний прайс-лист з усіма цінами та пошуком по послугах доступний на{" "}
              <Link href="/#price" className="text-navy-900 underline underline-offset-4">
                головній сторінці
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
