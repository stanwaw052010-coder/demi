import { MapPin, Phone, Sparkles } from "lucide-react";
import PhotoPlaceholder from "./PhotoPlaceholder";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-pink-50 via-cream to-cream"
    >
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-pink-200/50 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-24 h-80 w-80 rounded-full bg-yellow-200/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-dark ring-1 ring-pink-200">
            <Sparkles className="h-3.5 w-3.5" />
            СТУДІЯ МАНІКЮРУ ТА ПЕДИКЮРУ
          </span>

          <h1 className="mt-6 font-serif text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Доглянуті нігті —
            <br />
            <span className="text-brand-dark">це турбота про себе</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/70">
            Гігієнічний манікюр, стійке покриття гель-лаком, акуратне
            нарощення та педикюр у затишній студії в Бурштині. Індивідуальний
            підхід та стерильні інструменти для кожного клієнта.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="tel:+380989723943"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-sm shadow-pink-200 transition-colors hover:bg-brand-dark"
            >
              <Phone className="h-4 w-4" />
              Записатись на манікюр
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/60 px-7 py-3.5 text-sm font-semibold text-foreground/80 transition-colors hover:bg-white"
            >
              Наші роботи
            </a>
          </div>

          <div className="mt-10 flex items-center gap-2 text-sm text-foreground/60">
            <MapPin className="h-4 w-4 shrink-0 text-brand-dark" />
            м. Бурштин, Юнашків
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <PhotoPlaceholder
            label="Фото власниці студії"
            filename="owner.jpg"
            className="aspect-[4/5] w-full shadow-xl shadow-pink-100"
          />
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white px-5 py-4 shadow-lg shadow-pink-100 sm:block">
            <p className="font-script text-xl text-brand-dark">Наталія Пархуц</p>
            <p className="text-xs text-foreground/50">майстер манікюру та педикюру</p>
          </div>
        </div>
      </div>
    </section>
  );
}
