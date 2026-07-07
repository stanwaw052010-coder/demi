import { Quote, Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Олена",
    text: "Прийшла з болем, а вийшла з планом лікування на зрозумілій мові без залякувань. Дуже дякую команді!",
  },
  {
    name: "Максим",
    text: "Робили складне видалення зуба мудрості — все пройшло швидко, акуратно і без ускладнень.",
  },
  {
    name: "Ірина",
    text: "Поставили імплант, супроводжували на кожному етапі. Приємно, коли лікар не поспішає і все пояснює.",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#ff6f91]">
          Відгуки
        </p>
        <h2 className="mt-3 text-3xl font-bold text-[#0d3b3e] sm:text-4xl">
          Що кажуть наші пацієнти
        </h2>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {REVIEWS.map((r) => (
          <div
            key={r.name}
            className="flex flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm shadow-black/[0.02]"
          >
            <Quote className="h-6 w-6 text-[#ff6f91]" />
            <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">
              «{r.text}»
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-sm font-semibold text-[#0d3b3e]">
                {r.name}
              </span>
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-[#ff8a65] text-[#ff8a65]"
                  />
                ))}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
