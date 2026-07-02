import Image from "next/image";
import { Heart, PawPrint, Sparkles } from "lucide-react";

const POINTS = [
  {
    icon: Heart,
    title: "Любов до тварин",
    text: "До кожного собаки — терплячий і дбайливий підхід, без поспіху та стресу.",
  },
  {
    icon: Sparkles,
    title: "Акуратний результат",
    text: "Стрижки за стандартами породи або за побажанням господаря.",
  },
  {
    icon: PawPrint,
    title: "Комфортна атмосфера",
    text: "Спокійна обстановка та якісна косметика для чутливої шкіри.",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
          <Image
            src="/gallery/owner-dog.webp"
            alt="Власниця салону Dog Style з доглянутим песиком"
            fill
            sizes="(min-width: 768px) 480px, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Про салон
          </p>
          <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
            Dog Style — простір, де про вашого собаку подбають як удома
          </h2>
          <p className="mt-5 text-ink-soft leading-relaxed">
            Я власниця салону Dog Style і вважаю, що кожен собака заслуговує
            відчувати себе доглянутим, спокійним і красивим. Приймаю
            улюбленців будь-якого розміру та породи, підбираю формат стрижки
            індивідуально та завжди знаходжу підхід навіть до найбільш
            сором&apos;язливих клієнтів.
          </p>

          <div className="mt-8 space-y-5">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light/60 text-brand-dark">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">{title}</p>
                  <p className="text-sm text-ink-soft">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
