import type { Metadata } from "next";
import Link from "next/link";

import { PhotoSlot } from "@/components/shared/PhotoSlot";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { ABOUT_TEXT } from "@/data/about";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Про нас",
  description:
    "Спабель — салон краси повного циклу в Запоріжжі. SPA-капсула Neoqi Medic, косметологія, перукарня та нігтьовий сервіс в атмосфері спокою та турботи.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `Про нас — ${SITE.name}`,
    description: "Історія та філософія салону краси та SPA Спабель у Запоріжжі.",
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative flex min-h-[42vh] items-end overflow-hidden bg-navy-950">
        <PhotoSlot
          category="spa"
          index={3}
          alt="Про салон Спабель"
          label="Спа — фото 3"
          className="absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/30" />
        <div className="container-lux section-x relative z-10 flex flex-col gap-4 pb-16 pt-32">
          <span className="text-xs sm:text-sm tracking-[0.4em] uppercase text-gold-400">
            Спабель
          </span>
          <h1 className="max-w-2xl text-4xl font-medium leading-[1.1] text-white sm:text-5xl">
            Про нас
          </h1>
        </div>
      </section>

      <section className="section-y section-x bg-white">
        <div className="container-lux grid grid-cols-1 gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="flex flex-col gap-6">
            {ABOUT_TEXT.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm sm:text-base leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-4">
            <PhotoSlot
              category="cosmetolog"
              index={1}
              alt="Косметолог Спабель"
              label="Косметолог — фото 1"
              className="aspect-[4/5] w-full"
            />
            <div className="grid grid-cols-2 gap-4">
              <PhotoSlot
                category="hairdresser"
                index={1}
                alt="Перукар Спабель"
                label="Перукар — фото 1"
                className="aspect-square"
              />
              <PhotoSlot
                category="podolog"
                index={1}
                alt="Подолог Спабель"
                label="Подолог — фото 1"
                className="aspect-square"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-x pb-20 sm:pb-28">
        <div className="container-lux flex flex-col items-center gap-4 border border-border bg-navy-950 p-10 text-center sm:p-14">
          <h2 className="font-serif text-2xl text-white sm:text-3xl">
            Ласкаво просимо до «Спабель»
          </h2>
          <p className="max-w-md text-sm text-white/70">
            Запишіться на процедуру та відчуйте турботу з першої хвилини.
          </p>
          <Button variant="gold" size="lg" asChild className="mt-2">
            <Link href="/#booking">Записатися</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
