import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-espresso pt-28">
      <Image
        src="/images/hero-oil.jpg"
        alt="Тепле світло свічок і олія для масажу в студії SISTER'S"
        fill
        priority
        sizes="100vw"
        quality={70}
        className="object-cover opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-espresso/85 via-espresso/55 to-espresso"
      />
      <div aria-hidden className="ambient-glow absolute inset-0 mix-blend-screen" />

      <div className="relative mx-auto w-full max-w-[1160px] px-5 pb-10 sm:px-8 sm:pb-14">
        <p className="label-spaced text-gold">{site.nameSpaced}</p>

        <h1 className="mt-7 max-w-[16ch] text-balance text-[3rem] leading-[0.98] text-sand sm:text-7xl md:text-[5.6rem]">
          Тіло, яке <em className="not-italic text-gold-light">нарешті</em>{" "}
          <span className="italic">видихає</span>
        </h1>

        <p className="mt-7 max-w-[54ch] text-pretty text-[1.02rem] text-beige sm:text-lg">
          Масаж, обгортання, апаратні процедури, нарощення вій та воскова епіляція у Чернівцях.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="#zapys"
            className="label-spaced bg-gold px-8 py-4 text-center text-espresso transition-colors duration-300 hover:bg-gold-light"
          >
            Записатися
          </Link>
          <Link
            href="#prays"
            className="label-spaced border border-gold/45 px-8 py-4 text-center text-sand transition-colors duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold-light"
          >
            Подивитися прайс
          </Link>
        </div>

        <div className="mt-12 flex flex-col gap-x-8 gap-y-2.5 border-t border-gold/15 pt-6 text-sm text-beige sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={site.mapLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 transition-colors hover:text-gold"
          >
            <MapPin className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.25} aria-hidden />
            {site.address.full}
          </a>
          {site.masters.map((master) => (
            <a
              key={master.phone}
              href={`tel:${master.phone}`}
              className="inline-flex items-center gap-2.5 transition-colors hover:text-gold"
            >
              <Phone className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.25} aria-hidden />
              {master.phoneLabel}
              <span className="text-beige/70">— {master.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
