import { PERSONAL_INSTAGRAM_HANDLE, PERSONAL_INSTAGRAM_URL } from "@/lib/mentor";
import { Instagram } from "./icons";

export default function Cta() {
  return (
    <section id="contacts" className="py-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border border-green/30 bg-concrete-2 px-8 py-16 text-center">
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
          className="mt-2 flex items-center gap-3 rounded-full bg-green px-8 py-4 text-lg font-semibold text-cream shadow-lg shadow-green/20 transition-colors hover:bg-green-dark"
        >
          <Instagram className="h-5 w-5" />
          {PERSONAL_INSTAGRAM_HANDLE}
        </a>
      </div>
    </section>
  );
}
