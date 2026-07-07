import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { SITE } from "@/data/site";

export function Contacts() {
  return (
    <section className="section-y section-x bg-secondary/50" id="contacts">
      <div className="container-lux flex flex-col gap-14">
        <SectionHeading
          kicker="Як нас знайти"
          title="Контакти"
          description="Завітайте до нас особисто або зв'яжіться будь-яким зручним способом."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-600" />
              <div>
                <h3 className="font-serif text-lg text-navy-950">Адреса</h3>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-muted-foreground hover:text-navy-900"
                >
                  {SITE.addressFull}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-gold-600" />
              <div>
                <h3 className="font-serif text-lg text-navy-950">Телефон</h3>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="text-sm text-muted-foreground hover:text-navy-900"
                >
                  {SITE.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-gold-600" />
              <div>
                <h3 className="font-serif text-lg text-navy-950">Email</h3>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-muted-foreground hover:text-navy-900"
                >
                  {SITE.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-gold-600" />
              <div>
                <h3 className="font-serif text-lg text-navy-950">Графік роботи</h3>
                <div className="flex flex-col text-sm text-muted-foreground">
                  {SITE.workingHours.map((row) => (
                    <span key={row.days}>
                      {row.days}: {row.hours}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-h-[360px] w-full overflow-hidden border border-border">
            <iframe
              src={SITE.mapsEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 360 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Карта — ${SITE.name}`}
              className="h-full min-h-[360px] w-full grayscale-[15%]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
