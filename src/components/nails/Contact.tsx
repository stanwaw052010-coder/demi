import { MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-pink-100 via-pink-50 to-yellow-100 px-6 py-14 text-center sm:px-16">
        <span className="text-xs font-semibold tracking-widest text-brand-dark">
          ЗАПИС
        </span>
        <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">
          Запишіться на манікюр
        </h2>
        <p className="mx-auto mt-4 max-w-md text-foreground/70">
          Зателефонуйте, щоб обрати зручний час — буду рада вас бачити в студії.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="tel:+380989723943"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white shadow-sm shadow-pink-200 transition-colors hover:bg-brand-dark"
          >
            <Phone className="h-4 w-4" />
            098 972 39 43
          </a>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-8 py-3.5 text-sm font-medium text-foreground/70 ring-1 ring-pink-200">
            <MapPin className="h-4 w-4 text-brand-dark" />
            м. Бурштин, Юнашків
          </div>
        </div>
      </div>
    </section>
  );
}
