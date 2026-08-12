import Image from "next/image";
import { ArrowDownRight, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { heroServices } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button";
import { InstagramIcon, ViberIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * Full-bleed dark opening: the clinic's name at poster size, one loud call to
 * action, the number spelled out, and the doctor filling the bottom of the
 * frame. Built to be recognised in one glance rather than read.
 *
 * No client hooks — static markup, so the first screen ships no JavaScript.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="grain relative overflow-hidden bg-ink text-white"
    >
      {/* A single soft light behind the wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.10),transparent)]"
      />

      <div /* The bar above is three lines tall on a phone now — clear it. */
        className="container-x relative z-10 pb-10 pt-56 text-center sm:pt-44 md:pt-48 lg:pt-52">
        <p className="enter eyebrow text-white/70">
          {site.doctor} · 20+ років практики
        </p>

        {/* The brand name is already in the header, the footer and the tab
            title — spelling it out here too just read as a repetition. What
            the headline has to say is what kind of clinic this is.

            Not animated either: it is the largest thing on the screen, so
            fading it in would delay the paint the browser measures. */}
        <h1 className="display-tight mt-5 font-display text-[46px] font-light leading-[0.92] sm:text-[76px] lg:text-[100px] xl:text-[112px]">
          Сучасна
          <br />
          стоматологія{" "}
          {/* nowrap so the «у» never gets stranded at the end of a line */}
          <span className="accent whitespace-nowrap text-white">
            у Тернополі
          </span>
        </h1>

        {/* Раніше це був суцільний абзац через кому — клініка попросила
            розписати кожну послугу окремим рядком, щоб перелік читався. */}
        <p
          style={{ animationDelay: "0.1s" }}
          className="enter mx-auto mt-6 max-w-[46ch] text-[15px] font-medium leading-relaxed text-white md:text-[17px]"
        >
          Надаємо весь спектр стоматологічних послуг:
        </p>

        <ul
          style={{ animationDelay: "0.14s" }}
          className="enter mx-auto mt-4 grid max-w-[440px] gap-x-10 gap-y-2 text-left md:max-w-[880px] md:grid-cols-2"
        >
          {heroServices.map((s) => (
            <li
              key={s}
              className="flex items-start gap-2.5 text-[15px] leading-snug text-white/80 md:text-[16px]"
            >
              {/* em-based offset lands the dash on the x-height of the first
                  line, whatever the font size — items-baseline dropped it to
                  the bottom of a wrapped item instead. */}
              <span
                aria-hidden
                className="mt-[0.62em] h-px w-3 shrink-0 bg-white/45"
              />
              <span>{s}</span>
            </li>
          ))}
        </ul>

        <div
          style={{ animationDelay: "0.16s" }}
          className="enter mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center"
        >
          <ButtonLink
            href="#booking"
            variant="inverted"
            size="lg"
            className="text-[17px] font-bold"
          >
            Запис на консультацію
            <ArrowDownRight className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0.5 group-hover/btn:translate-y-0.5" />
          </ButtonLink>
          <ButtonLink
            href={site.viber}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="border border-white/30 bg-transparent font-semibold text-white shadow-none hover:bg-white/10"
          >
            <ViberIcon className="size-[18px]" />
            Написати у Viber
          </ButtonLink>
        </div>

        {/* Contacts stay deliberately small — the name is the loud element
            here, and the number is already large in the bar above. */}
        <div className="mt-9 flex flex-col items-center gap-2.5">
          <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-5">
            {[
              { value: site.phone, href: site.phoneHref, icon: true },
              { value: site.phone2, href: site.phone2Href, icon: false },
            ].map((line) => (
              <a
                key={line.href}
                href={line.href}
                className="group inline-flex items-center gap-2.5 text-white"
              >
                {line.icon && (
                  <Phone className="size-4 shrink-0" strokeWidth={2.25} />
                )}
                <span className="text-[19px] font-bold tabular-nums tracking-[-0.01em] underline-offset-4 group-hover:underline md:text-[21px]">
                  {line.value}
                </span>
              </a>
            ))}
          </div>

          <a
            href={site.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-white/70"
          >
            <MapPin className="size-[15px] shrink-0" strokeWidth={2.25} />
            <span className="text-[14px] font-medium underline-offset-4 group-hover:underline">
              {site.address}
            </span>
          </a>

          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-white/10"
          >
            <InstagramIcon className="size-[17px]" strokeWidth={1.75} />
            {site.instagramHandle}
          </a>

          {/* The full week, spelled out — the clinic asked for every day to
              carry its own hours rather than a «Пн–Пт» range. */}
          <dl className="mt-3 w-full max-w-[300px] divide-y divide-white/10 border-y border-white/10">
            {site.hours.map((h) => {
              const closed = h.time === "Вихідний";
              return (
                <div
                  key={h.days}
                  className="flex items-baseline justify-between gap-3 py-1.5"
                >
                  <dt
                    className={cn(
                      "text-[13px]",
                      closed ? "text-white/40" : "text-white/70",
                    )}
                  >
                    {h.days}
                  </dt>
                  <dd
                    className={cn(
                      "whitespace-nowrap text-right text-[13px] font-medium tabular-nums",
                      closed ? "text-white/40" : "text-white/90",
                    )}
                  >
                    {h.time}
                  </dd>
                </div>
              );
            })}
          </dl>

        </div>
      </div>

      {/* ── The doctor ───────────────────────────────────
          The frame keeps the photograph's own 7:10 at every width, so nothing
          is cropped: a fixed height used to swallow the bottom third of the
          picture on a phone and turn it into a 3:1 panorama on a desktop.
          The file itself is a taller crop than before — at 4:5 her hands and
          the instrument fell outside the frame.
          Full width on a phone, centred at its own size from lg. */}
      <div className="relative mt-6 aspect-7/10 lg:mx-auto lg:mt-10 lg:w-[420px] lg:overflow-hidden lg:rounded-t-[28px] xl:w-[470px]">
        <Image
          src="/images/hero.jpg"
          alt={`${site.doctor} — лікар-стоматолог, ${site.name}`}
          fill
          /* The headline is the LCP element; this sits under it. */
          fetchPriority="low"
          quality={88}
          sizes="(max-width: 1024px) 100vw, 470px"
          className="object-cover object-center"
        />
        <div
          aria-hidden
          /* Melts into the cream band that follows — only while full-bleed.
             Kept short so it never washes over the logo on her polo. */
          className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-cream to-transparent lg:hidden"
        />
      </div>
    </section>
  );
}
