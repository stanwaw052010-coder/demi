const keywords = [
  "Подологія",
  "Апаратний педикюр",
  "Врослий ніготь",
  "Тріщини на п'ятах",
  "Манікюр",
  "Гель-лак",
  "Натоптиші та мозолі",
  "Гіперкератоз",
  "Догляд вдома",
  "Стерильність",
];

/** Нескінченна стрічка ключових напрямків. Чистий CSS-цикл, без JS. */
export function Marquee() {
  return (
    <section
      aria-label="Напрямки роботи студії"
      className="relative border-y border-graphite-200/70 bg-white py-6"
    >
      <div
        className="flex overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee items-center gap-10 pr-10">
          {[...keywords, ...keywords].map((word, i) => (
            <span key={`${word}-${i}`} className="flex items-center gap-10">
              <span className="text-[0.95rem] font-bold tracking-[-0.01em] whitespace-nowrap text-graphite-500">
                {word}
              </span>
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand-300" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
