import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PriceRow } from "@/components/ui/PriceRow";
import { EffectsList } from "@/components/ui/EffectsList";
import { priceCategories, priceNote } from "@/data/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Прайс на масаж і б'юті-послуги — Чернівці",
  description:
    "Повний прайс SISTER'S Beauty Studio: ручний масаж від 500 грн, стоун-терапія 1500 грн, обгортання AROSHA 2500 грн, гіпсування BODY CODE, вогняний масаж, масаж для вагітних. Чернівці, вул. Головна, 283 Б.",
  alternates: { canonical: "/pryslist" },
};

export default function PriceListPage() {
  return (
    <>
      <Header />
      <main id="main" className="pt-[68px] md:pt-[76px]">
        <Section tone="espresso" className="pb-10">
          <SectionLabel>П О В Н И Й   П Р А Й С</SectionLabel>
          <h1 className="mt-5 max-w-[20ch] text-balance text-[2.4rem] leading-[1.04] text-sand sm:text-6xl md:text-[4rem]">
            Прайс студії <span className="italic text-gold-light">SISTER&rsquo;S</span>
          </h1>
          <p className="mt-6 max-w-[62ch] text-pretty text-beige">
            Усі процедури студії з актуальними цінами. {site.address.full}.
          </p>
          <Link
            href="/#zapys"
            className="label-spaced mt-9 inline-flex bg-gold px-8 py-4 text-espresso transition-colors duration-300 hover:bg-gold-light"
          >
            Записатися
          </Link>
        </Section>

        {priceCategories.map((category, index) => (
          <Section
            key={category.id}
            id={category.id}
            tone={index % 2 === 0 ? "espresso" : "cocoa"}
            className="py-14 md:py-20"
          >
            <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
              <div>
                <p className="label-spaced text-gold">{category.label}</p>
                <h2 className="mt-4 text-3xl text-sand sm:text-4xl">{category.title}</h2>
                {category.intro ? (
                  <p className="mt-5 max-w-[68ch] text-pretty text-[0.95rem] text-beige">
                    {category.intro}
                  </p>
                ) : null}
                <div className="mt-8">
                  {category.services.map((service) => (
                    <PriceRow key={service.id} service={service} />
                  ))}
                </div>
                {category.note ? (
                  <p className="mt-7 border-l border-gold/40 pl-4 text-xs text-beige">
                    {category.note}
                  </p>
                ) : null}
              </div>
              {category.effects ? (
                <div className="lg:pt-16">
                  <p className="label-spaced mb-4 text-gold">Е Ф Е К Т</p>
                  <EffectsList items={category.effects} />
                </div>
              ) : null}
            </div>
          </Section>
        ))}

        <Section tone="espresso" className="py-14">
          <p className="text-xs text-beige">{priceNote}</p>
          <Link
            href="/"
            className="label-spaced mt-8 inline-flex items-center gap-2 text-gold transition-colors hover:text-gold-light"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.25} aria-hidden />
            На головну
          </Link>
        </Section>
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}
