import Image from "next/image";
import { Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/menu";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/menu/hero-burrito.jpg"
          alt="Фірмовий суші-ролл Nata-Sushi"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/20" />
      </div>

      <div className="relative mx-auto flex min-h-[640px] max-w-6xl flex-col justify-center px-5 py-24">
        <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-cream/10 px-4 py-1.5 text-sm font-medium text-cream backdrop-blur-sm">
          Суші-бар у Перещепиному
        </p>
        <h1 className="max-w-xl font-display text-5xl uppercase leading-tight text-cream sm:text-6xl">
          Nata-Sushi
        </h1>
        <p className="mt-5 max-w-lg text-lg text-cream-soft">
          Свіжі роли, гарячі удони та авторські сети. Замовляйте онлайн —
          телефоном або в Instagram.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#rolls"
            className="rounded-full bg-red px-7 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-red/30 transition-colors hover:bg-red-dark"
          >
            Переглянути меню
          </a>
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 rounded-full border border-cream/30 bg-cream/5 px-7 py-3.5 text-sm font-semibold text-cream backdrop-blur-sm transition-colors hover:bg-cream/10"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
