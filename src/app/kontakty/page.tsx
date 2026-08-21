import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Contacts } from "@/components/sections/Contacts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакти — Чернівці, вул. Головна, 283 Б",
  description:
    "Як знайти SISTER'S Beauty Studio: Чернівці, вул. Головна, 283 Б. Телефони Ірини та Анжели, Instagram Direct, години роботи та карта проїзду.",
  alternates: { canonical: "/kontakty" },
};

export default function ContactsPage() {
  return (
    <>
      <Header />
      <main id="main" className="pt-[68px] md:pt-[76px]">
        <Section tone="espresso" className="pb-2">
          <SectionLabel>К О Н Т А К Т И</SectionLabel>
          <h1 className="mt-5 max-w-[20ch] text-balance text-[2.4rem] leading-[1.04] text-sand sm:text-6xl md:text-[4rem]">
            Чекаємо на вас у <span className="italic text-gold-light">Чернівцях</span>
          </h1>
          <p className="mt-6 max-w-[60ch] text-pretty text-beige">
            {site.address.full}. Зателефонуйте або напишіть у Direct — підкажемо процедуру та
            підберемо час.
          </p>
        </Section>

        <Contacts compact />

        <Section tone="cocoa" className="py-14">
          <Link
            href="/"
            className="label-spaced inline-flex items-center gap-2 text-gold transition-colors hover:text-gold-light"
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
