import { Phone } from "lucide-react";
import { INSTAGRAM_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/salon";

export default function CtaBanner() {
  return (
    <section className="bg-ink py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-5 text-center">
        <h2 className="font-serif text-3xl text-cream sm:text-4xl">
          Готові побалувати свого улюбленця?
        </h2>
        <p className="max-w-lg text-cream/75">
          Запишіться зручним способом — напишіть в Instagram або зателефонуйте
          нам напряму.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-cream shadow-lg shadow-brand/30 transition-colors hover:bg-brand-dark"
          >
            Записатися в Instagram
          </a>
          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
