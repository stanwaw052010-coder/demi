import { Clock, MapPin, Phone } from "lucide-react";
import {
  ADDRESS,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  MAP_EMBED_SRC,
  PHONE_DISPLAY,
  PHONE_HREF,
  WORKING_HOURS,
} from "@/lib/salon";
import { InstagramIcon } from "./icons";

export default function Contact() {
  return (
    <section id="contacts" className="bg-cream-2 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Контакти
          </p>
          <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
            Де нас знайти та як записатись
          </h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-brand-light/50">
            <iframe
              src={MAP_EMBED_SRC}
              title="Розташування салону Dog Style на карті"
              className="h-[380px] w-full lg:h-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 rounded-2xl bg-cream p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand-dark">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-ink">Адреса</p>
                <p className="mt-1 text-sm text-ink-soft">{ADDRESS}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-cream p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand-dark">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-ink">Телефон</p>
                <a
                  href={PHONE_HREF}
                  className="mt-1 block text-sm text-ink-soft hover:text-brand"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-cream p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand-dark">
                <InstagramIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-ink">Instagram</p>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-sm text-ink-soft hover:text-brand"
                >
                  {INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-cream p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand-dark">
                <Clock className="h-5 w-5" />
              </span>
              <div className="w-full">
                <p className="font-semibold text-ink">Графік роботи</p>
                <ul className="mt-2 space-y-1 text-sm text-ink-soft">
                  {WORKING_HOURS.map(({ day, hours }) => (
                    <li key={day} className="flex justify-between gap-4">
                      <span>{day}</span>
                      <span className={hours === "Закрито" ? "text-brand-dark" : ""}>
                        {hours}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
