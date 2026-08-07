import Image from "next/image";
import { ArrowDownRight, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { ViberIcon } from "@/components/ui/icons";

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

      <div className="container-x relative z-10 pb-10 pt-44 text-center sm:pt-40 md:pt-44 lg:pt-48">
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

        <p
          style={{ animationDelay: "0.1s" }}
          className="enter mx-auto mt-6 max-w-[42ch] text-[15px] leading-relaxed text-white/75 md:max-w-[58ch] md:text-[16px]"
        >
          Лікування під мікроскопом, художня реставрація, імплантація та
          відбілювання — у кабінеті Наталії Жилан.
        </p>

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
          <a
            href={site.phoneHref}
            className="group inline-flex items-center gap-2.5 text-white"
          >
            <Phone className="size-4 shrink-0" strokeWidth={2.25} />
            <span className="text-[19px] font-bold tabular-nums tracking-[-0.01em] underline-offset-4 group-hover:underline md:text-[21px]">
              {site.phone}
            </span>
          </a>

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

          <p className="text-[13px] text-white/55">{site.hoursShort}</p>
        </div>
      </div>

      {/* ── The doctor ───────────────────────────────────
          A narrow screen is close to the photograph's own 4:5, so there it
          runs full width. A wide one is not: stretched edge to edge the frame
          becomes a 3:1 panorama and crops the portrait down to a forehead.
          From lg it keeps its proportions and stands centred instead. */}
      <div className="relative mt-6 h-[340px] sm:h-[420px] lg:mx-auto lg:mt-10 lg:aspect-4/5 lg:h-auto lg:w-[460px] lg:overflow-hidden lg:rounded-t-[28px] xl:w-[520px]">
        <Image
          src="/images/hero.jpg"
          alt={`${site.doctor} — лікар-стоматолог, ${site.name}`}
          fill
          /* The headline is the LCP element; this sits under it. */
          fetchPriority="low"
          sizes="(max-width: 1024px) 100vw, 520px"
          className="object-cover object-[50%_18%] lg:object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-ink via-ink/25 to-transparent lg:via-ink/10"
        />
        <div
          aria-hidden
          /* Melts into the cream band that follows — only while full-bleed */
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cream to-transparent lg:hidden"
        />
      </div>
    </section>
  );
}
