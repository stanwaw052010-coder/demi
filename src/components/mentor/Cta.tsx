import { PERSONAL_INSTAGRAM_HANDLE, PERSONAL_INSTAGRAM_URL } from "@/lib/mentor";
import { Instagram } from "./icons";
import Reveal from "./Reveal";

export default function Cta() {
  return (
    <section className="py-24">
      <Reveal className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-green/30 bg-concrete-2 px-8 py-16 text-center">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-green/10 blur-3xl" />
        <div className="relative flex flex-col items-center gap-6">
          <h2 className="font-display text-3xl uppercase text-cream sm:text-4xl">
            Готові змінити своє життя?
          </h2>
          <p className="max-w-lg text-cream-soft">
            Напишіть мені в Instagram — розповім про навчання, формат та
            найближчий набір.
          </p>
          <a
            href={PERSONAL_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-3 rounded-full bg-green px-8 py-4 text-lg font-semibold text-cream shadow-lg shadow-green/20 transition-transform hover:-translate-y-0.5 hover:bg-green-dark"
          >
            <Instagram className="h-5 w-5" />
            {PERSONAL_INSTAGRAM_HANDLE}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
