import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { buttonClass } from "../ui/Button";
import { embedMapSrc, site } from "@/lib/site";

export function Location() {
  return (
    <section id="location" className="scroll-mt-24 bg-soft py-24 md:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <div className="flex flex-col gap-10">
          <SectionHeading eyebrow="Контакти" lines={["Ми поруч"]} />

          <div className="flex flex-col gap-8">
            <div className="flex gap-4">
              <MapPin className="mt-1 size-5 shrink-0 text-muted" strokeWidth={1.25} aria-hidden />
              <address className="text-[1.0625rem] leading-relaxed not-italic text-graphite">
                {site.address.street}
                <br />
                <span className="text-muted">
                  {site.address.district}, {site.address.region}, {site.address.postal}
                </span>
              </address>
            </div>

            <div className="flex gap-4">
              <Phone className="mt-1 size-5 shrink-0 text-muted" strokeWidth={1.25} aria-hidden />
              <a href={site.phone.href} className="link-underline text-[1.0625rem] text-graphite">
                {site.phone.label}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={site.address.maps}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonClass("solid", "w-full sm:w-auto")}
            >
              Прокласти маршрут
              <ArrowUpRight
                className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
                aria-hidden
              />
            </a>
            <a
              href={site.instagram.clinic}
              target="_blank"
              rel="noreferrer noopener"
              className={buttonClass("outline", "w-full sm:w-auto")}
            >
              {site.instagram.clinicHandle}
            </a>
          </div>
        </div>

        <Reveal y={40}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-line bg-second lg:aspect-[16/11]">
            {/* Підкладка: якщо Google Maps не завантажиться, місце
                не виглядатиме порожнім і лишиться шлях до маршруту. */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <MapPin className="size-6 text-muted" strokeWidth={1.25} aria-hidden />
              <p className="text-sm text-ink">{site.address.full}</p>
              <a
                href={site.address.maps}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline text-sm text-graphite"
              >
                Відкрити в Google Maps
              </a>
            </div>

            <iframe
              src={embedMapSrc}
              title={`Мапа: ${site.name}, ${site.address.full}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="relative size-full border-0 grayscale-[0.85] contrast-[1.05]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
