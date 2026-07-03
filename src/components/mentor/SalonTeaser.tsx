import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SALON_NAME, SALON_SERVICES, SALON_TAGLINE, PHOTOS } from "@/lib/mentor";
import Photo from "./Photo";
import Reveal from "./Reveal";

export default function SalonTeaser() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <Photo
            src={PHOTOS.salon.src}
            alt={PHOTOS.salon.alt}
            className="aspect-[4/3] w-full"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-green-light">
            Мій салон
          </p>
          <h2 className="mt-4 font-display text-3xl uppercase text-cream sm:text-4xl">
            {SALON_NAME}
          </h2>
          <p className="mt-2 text-cream-soft">{SALON_TAGLINE}</p>

          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {SALON_SERVICES.map((service) => (
              <li key={service} className="flex items-center gap-2 text-sm text-cream-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-green-light" />
                {service}
              </li>
            ))}
          </ul>

          <Link
            href="/salon"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-green-light hover:text-green-light"
          >
            Детальніше про салон
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
