import { GraduationCap, MapPin } from "lucide-react";
import {
  PERSONAL_INSTAGRAM_HANDLE,
  PERSONAL_INSTAGRAM_URL,
  SALON_ADDRESS,
  SALON_INSTAGRAM_HANDLE,
  SALON_INSTAGRAM_URL,
  SALON_MAP_EMBED_SRC,
  SALON_NAME,
} from "@/lib/mentor";
import { Instagram } from "./icons";
import Reveal from "./Reveal";

export default function ContactCards() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="flex h-full flex-col items-center rounded-3xl border border-green/20 bg-concrete-2 p-10 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green/15 text-green-light">
              <GraduationCap className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-display text-xl uppercase text-cream">
              Навчання
            </h2>
            <p className="mt-2 max-w-xs text-sm text-cream-soft">
              Питання про програму, формат та найближчий набір — пишіть
              особисто.
            </p>
            <a
              href={PERSONAL_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 text-sm font-semibold text-cream hover:bg-green-dark"
            >
              <Instagram className="h-4 w-4" />
              {PERSONAL_INSTAGRAM_HANDLE}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex h-full flex-col items-center rounded-3xl border border-green/20 bg-concrete-2 p-10 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green/15 text-green-light">
              <MapPin className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-display text-xl uppercase text-cream">
              {SALON_NAME}
            </h2>
            <p className="mt-2 max-w-xs text-sm text-cream-soft">
              Запис на перукарські послуги, манікюр, косметологію та інше.
            </p>
            <a
              href={SALON_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 text-sm font-semibold text-cream hover:bg-green-dark"
            >
              <Instagram className="h-4 w-4" />
              {SALON_INSTAGRAM_HANDLE}
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-6 overflow-hidden rounded-3xl border border-white/10">
        <iframe
          src={SALON_MAP_EMBED_SRC}
          title={`${SALON_NAME} на карті`}
          className="h-[360px] w-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <p className="bg-concrete px-6 py-4 text-sm text-cream-soft">{SALON_ADDRESS}</p>
      </Reveal>
    </section>
  );
}
