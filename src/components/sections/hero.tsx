import Image from "next/image";
import { ArrowDownRight, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { ViberIcon } from "@/components/ui/icons";

/**
 * A calling card, not a poster. The clinic asked for the first screen to be
 * read at a glance — mark, name, address, number, one action — so nothing
 * here competes with the phone number, and the photographs sit below it in
 * a strip instead of filling the screen.
 *
 * No client hooks: this whole section is static markup.
 */
const strip = [
  { src: "/images/hero.jpg", label: "Наталія Жилан" },
  { src: "/images/doctor-logo-wall.jpg", label: "Наша клініка" },
  { src: "/images/equipment.jpg", label: "Мікроскоп" },
  { src: "/images/whitening-process.jpg", label: "Відбілювання Beyond" },
  { src: "/images/kids-3.jpg", label: "Дитячий прийом" },
  { src: "/images/doctor-office.jpg", label: "Кабінет" },
];

export function Hero() {
  return (
    <section
      id="top"
      /* The header is fixed and two rows tall on a phone — clear it. */
      className="grain relative overflow-hidden bg-white pt-48 sm:pt-44 md:pt-48 lg:pt-52"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-52 left-1/2 h-[620px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(47,52,59,0.07),transparent)]"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-[36rem] text-center">
          <Image
            src="/logo-dark.png"
            alt={`${site.name} — ${site.doctor}`}
            width={480}
            height={592}
            priority
            sizes="(max-width: 768px) 190px, 240px"
            className="enter mx-auto h-28 w-auto sm:h-32 md:h-36"
          />

          <h1
            style={{ animationDelay: "0.08s" }}
            className="enter mt-6 font-display text-[19px] font-medium tracking-[-0.01em] text-graphite sm:text-[21px]"
          >
            Сучасна стоматологія у Тернополі
          </h1>

          {/* No entrance animation here on purpose: the number is the largest
              element on the first screen, so fading it in delays the paint
              Lighthouse measures — and delays the one thing a patient
              actually came for. */}
          <div className="mt-7 border-y border-ink/10 py-7">
            <a
              href={site.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-ink"
            >
              <MapPin className="size-[17px] shrink-0" strokeWidth={2.25} />
              <span className="text-[16px] font-semibold tracking-[-0.01em] underline-offset-4 group-hover:underline md:text-[18px]">
                {site.address}
              </span>
            </a>

            <a
              href={site.phoneHref}
              className="mt-3 block font-display text-[32px] font-bold tabular-nums leading-none tracking-[-0.03em] text-ink underline-offset-[6px] hover:underline sm:text-[38px] md:text-[44px]"
            >
              {site.phone}
            </a>

            <p className="mt-3 text-[15px] font-medium text-graphite">
              Пн–Пт 09:00 — 19:00
              <span className="text-ink/25"> · </span>
              Сб за записом
            </p>
          </div>

          <div
            style={{ animationDelay: "0.2s" }}
            className="enter mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <ButtonLink href="#booking" size="lg" className="font-semibold">
              Записатися
              <ArrowDownRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0.5 group-hover/btn:translate-y-0.5" />
            </ButtonLink>
            <ButtonLink
              href={site.viber}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
              className="font-semibold"
            >
              <ViberIcon className="size-[18px]" />
              Написати у Viber
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* ── Photo strip, scrolled sideways ───────────── */}
      <div
        style={{ animationDelay: "0.28s" }}
        className="enter no-scrollbar carousel-inset mt-14 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:mt-16 md:gap-4"
      >
        {strip.map((photo) => (
          <figure
            key={photo.src}
            className="relative aspect-4/5 w-[72%] shrink-0 snap-start overflow-hidden rounded-[20px] bg-mist sm:w-[46%] lg:w-[26%] xl:w-[22%]"
          >
            <Image
              src={photo.src}
              alt={photo.label}
              fill
              /* The strip starts below the fold on a phone. */
              fetchPriority="low"
              sizes="(max-width: 640px) 72vw, (max-width: 1024px) 46vw, 26vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"
            />
            <figcaption className="absolute bottom-4 left-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white">
              {photo.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
