import { Clock, MapPin, Phone, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MaskText } from "@/components/ui/motion";
import { InstagramIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon | typeof InstagramIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--r-md)] px-4 py-5 transition-colors duration-500 hover:bg-gold/5">
      <dt className="label-spaced flex items-center gap-3 text-beige">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 text-gold">
          <Icon className="h-4 w-4" strokeWidth={1.25} aria-hidden />
        </span>
        {label}
      </dt>
      <dd className="mt-3 pl-12">{children}</dd>
    </div>
  );
}

/**
 * @param compact — на сторінці /kontakty заголовок уже є вище, тому там його ховаємо.
 */
export function Contacts({ compact = false }: { compact?: boolean } = {}) {
  return (
    <Section id="kontakty" tone="espresso" className={compact ? "pt-4" : undefined}>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="flex flex-col gap-5">
          {compact ? null : (
            <>
              <SectionLabel>К О Н Т А К Т И</SectionLabel>
              <MaskText
                parts={[{ text: "Знайти" }, { text: "нас", className: "italic text-gold-light" }]}
                className="text-balance text-[2.2rem] leading-[1.06] text-sand sm:text-5xl md:text-[3.5rem]"
              />
            </>
          )}

          <dl className="mt-6 flex flex-col divide-y divide-gold/12 rounded-[var(--r-lg)] border border-gold/15 p-2">
            <ContactRow icon={MapPin} label="Адреса">
              <a
                href={site.mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-2xl text-sand transition-colors hover:text-gold"
              >
                {site.address.full}
              </a>
            </ContactRow>

            <ContactRow icon={Phone} label="Телефони">
              <span className="flex flex-col gap-1.5">
                {site.masters.map((master) => (
                  <a
                    key={master.phone}
                    href={`tel:${master.phone}`}
                    className="font-display text-2xl text-sand transition-colors hover:text-gold"
                  >
                    {master.phoneLabel}
                    <span className="ml-3 font-sans text-sm text-beige">— {master.name}</span>
                  </a>
                ))}
              </span>
            </ContactRow>

            <ContactRow icon={InstagramIcon} label="Instagram">
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-2xl text-sand transition-colors hover:text-gold"
              >
                {site.instagram.handle}
              </a>
            </ContactRow>

            <ContactRow icon={Clock} label="Години роботи">
              <span className="text-sand">{site.hours.label}</span>
              <span className="mt-1 block text-sm text-beige">{site.hours.sundayLabel}</span>
            </ContactRow>
          </dl>
        </div>

        <div className="hairline overflow-hidden p-2 shadow-[var(--shadow-soft)]">
          <iframe
            src={site.mapEmbedUrl}
            title="Карта: SISTER'S Beauty Studio, Чернівці, вул. Головна, 283 Б"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[380px] w-full rounded-[var(--r-md)] border-0 grayscale-[35%] sm:h-[520px]"
          />
        </div>
      </div>
    </Section>
  );
}
