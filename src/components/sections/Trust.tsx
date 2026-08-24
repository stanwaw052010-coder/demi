import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

/**
 * Свідомо без «до/після»: реальних фотографій лікування клініка
 * не надавала, а вигадані результати — це обман пацієнта.
 * Тому акцент на підході, а не на демонстрації випадків.
 */
export function Trust() {
  return (
    <section className="relative overflow-hidden bg-graphite py-24 text-white md:py-32">
      <Image
        src="/images/trust.svg"
        alt=""
        aria-hidden
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover opacity-60"
      />

      <div className="shell relative grid gap-12 lg:grid-cols-2 lg:items-end">
        <SectionHeading
          eyebrow="Наш підхід"
          tone="light"
          lines={["Результат, якому", "можна довіряти"]}
          description="Ми не обіцяємо універсальних рішень. Спершу — огляд і розмова, потім — план, зрозумілий пацієнту на кожному кроці."
        />

        <Reveal delay={0.1}>
          <dl className="grid gap-8 sm:grid-cols-2">
            <div className="flex flex-col gap-2 border-t border-white/15 pt-5">
              <dt className="text-[1.0625rem] text-white">Прозорий план</dt>
              <dd className="text-sm leading-relaxed text-white/55">
                Пояснюємо кожен етап до початку лікування.
              </dd>
            </div>
            <div className="flex flex-col gap-2 border-t border-white/15 pt-5">
              <dt className="text-[1.0625rem] text-white">Спокійний темп</dt>
              <dd className="text-sm leading-relaxed text-white/55">
                Не квапимо й не наполягаємо на зайвих процедурах.
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
