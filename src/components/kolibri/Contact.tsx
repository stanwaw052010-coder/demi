import { Clock, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "./Icons";

const MAP_QUERY = encodeURIComponent(
  "вул. Дмитра Майбороди 2а, Україна"
);

export default function Contact() {
  return (
    <section id="contact" className="bg-[#f4f9f8] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#ff6f91]">
            Контакти
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0d3b3e] sm:text-4xl">
            Запишіться на консультацію
          </h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-5 rounded-3xl bg-white p-8 shadow-sm shadow-black/[0.02] ring-1 ring-black/5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0d3b3e]/5">
                <MapPin className="h-5 w-5 text-[#0d3b3e]" />
              </div>
              <div>
                <p className="font-semibold text-[#0d3b3e]">Адреса</p>
                <p className="mt-1 text-sm text-gray-600">
                  вул. Дмитра Майбороди, 2а
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0d3b3e]/5">
                <Phone className="h-5 w-5 text-[#0d3b3e]" />
              </div>
              <div>
                <p className="font-semibold text-[#0d3b3e]">Телефони</p>
                <p className="mt-1 text-sm text-gray-600">
                  <a href="tel:+380930900600" className="hover:text-[#0d3b3e]">
                    093 090 0600
                  </a>{" "}
                  ·{" "}
                  <a href="tel:+380680500400" className="hover:text-[#0d3b3e]">
                    068 050 0400
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0d3b3e]/5">
                <Clock className="h-5 w-5 text-[#0d3b3e]" />
              </div>
              <div>
                <p className="font-semibold text-[#0d3b3e]">Графік роботи</p>
                <p className="mt-1 text-sm text-gray-600">Пн–Пт: 09:00–19:00</p>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-3 border-t border-gray-100 pt-6">
              <a
                href="https://maps.app.goo.gl/tMuzzXi42y5qTFM38?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full bg-[#0d3b3e] px-6 py-3 text-center text-sm font-semibold text-white"
              >
                Прокласти маршрут
              </a>
              <a
                href="https://www.instagram.com/kolibri.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-[#0d3b3e]"
              >
                <InstagramIcon className="h-4 w-4" />
                Instagram
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl ring-1 ring-black/5">
            <iframe
              title="Карта — KOLIBRI"
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              className="h-full min-h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
