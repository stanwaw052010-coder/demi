const PRICES = [
  { name: "Гігієнічний манікюр", range: "300–350" },
  { name: "Покриття гель-лаком", range: "600–700" },
  { name: "Нарощення", range: "750–850" },
  { name: "Гігієнічний педикюр", range: "550–650" },
  { name: "Педикюр з покриттям", range: "800–850" },
];

export default function Prices() {
  return (
    <section id="prices" className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-xl text-center">
        <span className="text-xs font-semibold tracking-widest text-brand-dark">
          ЦІНИ
        </span>
        <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">Прайс</h2>
      </div>

      <div className="mt-12 overflow-hidden rounded-3xl bg-white shadow-sm shadow-pink-100/60 ring-1 ring-pink-100">
        {PRICES.map((item, i) => (
          <div
            key={item.name}
            className={`flex items-center justify-between gap-4 px-6 py-5 sm:px-10 ${
              i !== PRICES.length - 1 ? "border-b border-pink-50" : ""
            }`}
          >
            <span className="font-serif text-base text-foreground sm:text-lg">
              {item.name}
            </span>
            <span className="whitespace-nowrap font-semibold text-brand-dark">
              {item.range} грн
            </span>
          </div>
        ))}
      </div>

      <p className="mt-5 text-center text-xs text-foreground/50">
        Точна вартість залежить від довжини нігтя та складності дизайну
      </p>
    </section>
  );
}
