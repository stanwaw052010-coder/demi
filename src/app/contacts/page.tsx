import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { BookingForm } from "@/components/booking/BookingForm";
import { siteConfig, mapsEmbedSrc } from "@/data/site";

export const metadata: Metadata = {
  title: "Контакти",
  description:
    "Контакти SPA-салону Спабель у Запоріжжі: адреса, телефон, графік роботи та форма запису онлайн.",
  openGraph: {
    title: `Контакти | ${siteConfig.name}`,
    description: "Адреса, телефон і форма запису SPA-салону Спабель у Запоріжжі.",
  },
};

export default function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакти"
        title="Завжди раді вас бачити"
        description="Залиште заявку онлайн або зателефонуйте — підберемо зручний час візиту."
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-spa grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <ul className="space-y-7 text-sm">
              <li className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                <div>
                  <p className="font-medium text-navy-900">Адреса</p>
                  <p className="mt-1 text-navy-900/60">{siteConfig.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                <div>
                  <p className="font-medium text-navy-900">Телефон</p>
                  <a href={siteConfig.phoneHref} className="mt-1 block text-navy-900/60 hover:text-gold-600">
                    {siteConfig.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                <div>
                  <p className="font-medium text-navy-900">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="mt-1 block text-navy-900/60 hover:text-gold-600">
                    {siteConfig.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                <div>
                  <p className="font-medium text-navy-900">Графік роботи</p>
                  {siteConfig.hours.map((h) => (
                    <p key={h.days} className="mt-1 text-navy-900/60">
                      {h.days}: {h.time}
                    </p>
                  ))}
                </div>
              </li>
            </ul>

            <div className="mt-10 overflow-hidden rounded-2xl">
              <iframe
                src={mapsEmbedSrc}
                title="Спабель на карті"
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-navy-900/10 p-6 sm:p-10">
              <h2 className="font-serif text-2xl text-navy-900">Форма запису</h2>
              <p className="mt-2 text-sm text-navy-900/50">
                Заповніть форму — адміністратор зв&apos;яжеться з вами для підтвердження часу.
              </p>
              <div className="mt-8">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
