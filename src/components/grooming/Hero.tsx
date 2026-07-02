import Image from "next/image";
import { Phone } from "lucide-react";
import { INSTAGRAM_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/salon";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/gallery/pomeranian.webp"
          alt="Доглянутий померанський шпіц після грумінгу в салоні Dog Style"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/55 to-ink/20" />
      </div>

      <div className="relative mx-auto flex min-h-[640px] max-w-6xl flex-col justify-center px-5 py-24">
        <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-cream/15 px-4 py-1.5 text-sm font-medium text-cream backdrop-blur-sm">
          Грумінг-салон у Кам&apos;янці-Подільському
        </p>
        <h1 className="max-w-xl font-serif text-4xl leading-tight text-cream sm:text-5xl">
          Ваш улюбленець заслуговує на дбайливий догляд
        </h1>
        <p className="mt-5 max-w-lg text-lg text-cream/85">
          Гігієнічний та комплексний грумінг, модельні стрижки і купання —
          з любов&apos;ю до кожного пухнастого клієнта.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
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
            className="flex items-center gap-2 rounded-full border border-cream/40 bg-cream/10 px-7 py-3.5 text-sm font-semibold text-cream backdrop-blur-sm transition-colors hover:bg-cream/20"
          >
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-cream/80">
          <span>🐾 Індивідуальний підхід</span>
          <span>🧴 Безпечна косметика</span>
          <span>💛 Турбота про кожного улюбленця</span>
        </div>
      </div>
    </section>
  );
}
