import Image from "next/image";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      {/* ── Closing CTA ─────────────────────────────── */}
      <div className="container-x relative border-b border-white/10 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
          <Reveal>
            <span className="eyebrow text-white/85">Запис на прийом</span>
            <h2 className="display-tight mt-6 max-w-[16ch] font-display text-[36px] font-light text-white sm:text-[52px] lg:text-[64px]">
              Здорова усмішка починається{" "}
              <span className="accent text-sand">з розмови</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-md text-[16px] leading-relaxed text-white/85 md:text-[17px]">
              Розкажіть, що вас турбує — ми підберемо час консультації та
              складемо план лікування з прозорим кошторисом.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={site.phoneHref} variant="inverted" size="lg">
                {site.phone}
                <Phone className="size-4" strokeWidth={1.75} />
              </ButtonLink>
              <ButtonLink
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="border border-white/20 bg-transparent text-white hover:bg-white/10 shadow-none"
              >
                Instagram
                <ArrowUpRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Columns ─────────────────────────────────── */}
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-4">
        <div>
          <Logo tone="light" />
          <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-white/85">
            Сімейна стоматологія Наталії Жилан. Лікування під мікроскопом,
            естетика та турбота про кожного пацієнта — від першого візиту.
          </p>
        </div>

        <nav aria-label="Навігація у футері">
          <h3 className="eyebrow text-white/85">Навігація</h3>
          <ul className="mt-6 space-y-3.5">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[14px] text-white/85 transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow text-white/85">Послуги</h3>
          <ul className="mt-6 space-y-3.5">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href="#services"
                  className="text-[14px] text-white/85 transition-colors duration-300 hover:text-white"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-white/85">Контакти</h3>
          <ul className="mt-6 space-y-4">
            <li>
              <a
                href={site.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-[16px] font-medium text-white transition-colors duration-300 hover:underline"
              >
                <MapPin
                  className="mt-0.5 size-5 shrink-0"
                  strokeWidth={2}
                />
                {site.address}
              </a>
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="group flex items-center gap-3 text-[19px] font-bold tabular-nums text-white transition-colors duration-300 hover:underline"
              >
                <Phone className="size-5 shrink-0" strokeWidth={2.25} />
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={site.phone2Href}
                className="group flex items-center gap-3 pl-8 text-[19px] font-bold tabular-nums text-white transition-colors duration-300 hover:underline"
              >
                {site.phone2}
              </a>
            </li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-[14px] text-white/85 transition-colors duration-300 hover:text-white"
              >
                <InstagramIcon
                  className="size-4 shrink-0 text-white/55"
                  strokeWidth={1.5}
                />
                {site.instagramHandle}
              </a>
            </li>
          </ul>

          <dl className="mt-7 divide-y divide-white/10 border-t border-white/10 pt-2">
            {site.hours.map((h) => (
              <div
                key={h.days}
                className="flex items-baseline justify-between gap-3 py-1.5"
              >
                <dt className="text-[13px] text-white/70">{h.days}</dt>
                <dd className="whitespace-nowrap text-right text-[13px] font-medium tabular-nums text-white/90">
                  {h.time}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ── The printed lock-up, full size ──────────── */}
      <div className="container-x flex justify-center border-t border-white/10 py-14">
        <Image
          src="/logo-light.png"
          alt="Dental Clinic Nataly Zhylan"
          width={480}
          height={592}
          sizes="260px"
          className="h-52 w-auto opacity-95 md:h-64"
        />
      </div>

      <div className="container-x relative flex flex-col gap-4 border-t border-white/10 py-7 text-[12px] text-white/85 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. Усі права захищені.
        </p>
        <p>
          {site.doctor} · Ліцензована стоматологічна практика, {site.city}
        </p>
      </div>
    </footer>
  );
}
