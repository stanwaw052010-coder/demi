import { MapPin, Phone } from "lucide-react";
import {
  ADDRESS,
  MAP_EMBED_SRC,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/lib/salon";

export default function Contact() {
  return (
    <section id="contacts" className="bg-ivory-2 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-wine">
            Контакти
          </p>
          <h2 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            Де нас знайти та як записатись
          </h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-blush">
            <iframe
              src={MAP_EMBED_SRC}
              title="Розташування салону VELLA на карті"
              className="h-[380px] w-full lg:h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 rounded-2xl bg-ivory p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-wine/10 text-wine">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-ink">Адреса</p>
                <p className="mt-1 text-sm text-ink-soft">{ADDRESS}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-ivory p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-wine/10 text-wine">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-ink">Телефон</p>
                <a
                  href={PHONE_HREF}
                  className="mt-1 block text-sm text-ink-soft hover:text-wine"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-wine p-6 text-center text-ivory">
              <p className="font-display text-lg">Записатись на примірку</p>
              <p className="mt-1 text-sm text-ivory/80">
                Зателефонуйте нам, щоб обрати зручний час
              </p>
              <a
                href={PHONE_HREF}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3 text-sm font-semibold text-wine hover:bg-ivory/90"
              >
                <Phone className="h-4 w-4" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
