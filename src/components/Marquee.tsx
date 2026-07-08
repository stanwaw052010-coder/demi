const WORDS = [
  "Краса",
  "Здоров’я",
  "Індивідуальність",
  "Молодість",
  "Естетика",
  "Природність",
];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden border-y border-line/80 bg-white/50 py-5">
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center" aria-hidden={half === 1}>
            {row.map((w, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center whitespace-nowrap px-6 font-display text-lg italic text-olive/80 md:text-xl"
              >
                {w}
                <span className="ml-12 inline-block h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
