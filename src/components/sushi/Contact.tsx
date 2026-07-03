import { Clock, MapPin, Phone } from "lucide-react";
import {
  ADDRESS,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  MAP_EMBED_SRC,
  PHONE_DISPLAY,
  PHONE_HREF,
  WORKING_HOURS_LABEL,
} from "@/lib/menu";
import { InstagramIcon } from "./icons";

export default function Contact() {
  return (
    <section id="contacts" className="bg-charcoal-2 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-red">
            Контакти
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase text-cream sm:text-4xl">
            Де нас знайти та як замовити
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <iframe
              src={MAP_EMBED_SRC}
              title="Розташування Nata-Sushi на карті"
              className="h-[380px] w-full lg:h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 rounded-2xl bg-charcoal p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red/15 text-red">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-cream">Адреса</p>
                <p className="mt-1 text-sm text-cream-soft">{ADDRESS}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-charcoal p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red/15 text-red">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-cream">Телефон</p>
                <a
                  href={PHONE_HREF}
                  className="mt-1 block text-sm text-cream-soft hover:text-red"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-charcoal p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red/15 text-red">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-cream">Графік роботи</p>
                <p className="mt-1 text-sm text-cream-soft">{WORKING_HOURS_LABEL}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-red p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream/15 text-cream">
                <InstagramIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-cream">Instagram</p>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block break-all text-sm text-cream/85 hover:text-cream"
                >
                  {INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
