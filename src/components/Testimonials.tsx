const reviews = [
  {
    name: "Олексій Дмитренко",
    role: "Власник СТО, Харків",
    avatar: "ОД",
    stars: 5,
    text: "Замовляємо запчастини у Спринтера вже 5 років. Менеджери завжди допоможуть підібрати аналог, ціни адекватні, доставка швидка. Рекомендую всім майстрам!",
    date: "Лютий 2025",
  },
  {
    name: "Марина Коваль",
    role: "Приватний клієнт",
    avatar: "МК",
    stars: 5,
    text: "Шукала гальмівні диски для BMW. Підібрали по коду за 5 хвилин, прийшли наступного дня. Дуже зручний сервіс і приємні ціни порівняно з іншими магазинами.",
    date: "Березень 2025",
  },
  {
    name: "Сергій Бондаренко",
    role: "Автомеханік, Харків",
    avatar: "СБ",
    stars: 5,
    text: "Давній клієнт. Велике різноманіття запчастин, завжди є в наявності те, що треба. Зручний пошук по артикулу. Дякую колективу за якісну роботу!",
    date: "Квітень 2025",
  },
  {
    name: "Наталія Яковенко",
    role: "Приватний клієнт, Полтава",
    avatar: "НЯ",
    stars: 5,
    text: "Замовляла фільтри та оливу дистанційно. Упакували добре, доставка Новою Поштою за 2 дні. Все відповідало опису. Однозначно буду замовляти ще!",
    date: "Травень 2025",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-orange-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="reviews" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 animate-on-scroll">
          <div>
            <span className="inline-block text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3">
              Відгуки
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Що кажуть клієнти
            </h2>
          </div>
          {/* Summary */}
          <div className="flex items-center gap-4 shrink-0 bg-white rounded-2xl px-6 py-4 border border-gray-100 shadow-sm">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-gray-900">5.0</div>
              <Stars count={5} />
              <div className="text-xs text-gray-400 mt-1">50 000+ клієнтів</div>
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {reviews.map((review, i) => (
            <div
              key={review.name}
              className="flex flex-col bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-100 transition-all duration-300 hover:-translate-y-1 animate-on-scroll"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Stars */}
              <Stars count={review.stars} />

              {/* Text */}
              <p className="mt-4 text-sm text-gray-600 leading-relaxed flex-1 italic">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-gray-50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {review.avatar}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-gray-900 truncate">
                    {review.name}
                  </div>
                  <div className="text-xs text-gray-400 truncate">{review.role}</div>
                </div>
                <div className="ml-auto text-xs text-gray-300 shrink-0">
                  {review.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
