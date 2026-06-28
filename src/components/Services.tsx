import { ArrowRight } from "lucide-react";

const categories = [
  {
    emoji: "🔧",
    title: "Запчастини за артикулом",
    description: "Точний пошук деталей за OEM або кодом виробника",
    href: "http://sprinter.org.ua/price",
    accent: "from-orange-500/10 to-orange-600/5",
    badge: "Популярне",
  },
  {
    emoji: "🚗",
    title: "Кузовні запчастини",
    description: "Бампери, крила, капоти, двері та скло для всіх марок",
    href: "http://sprinter.org.ua/CarBodyCatalog.aspx",
    accent: "from-blue-500/10 to-blue-600/5",
    badge: null,
  },
  {
    emoji: "🛞",
    title: "Ходова частина",
    description: "Амортизатори, ресори, кермові наконечники, стійки",
    href: "http://sprinter.org.ua/price",
    accent: "from-purple-500/10 to-purple-600/5",
    badge: null,
  },
  {
    emoji: "🛑",
    title: "Гальмівна система",
    description: "Колодки, диски, барабани, супорти та РТЦ",
    href: "http://sprinter.org.ua/price",
    accent: "from-red-500/10 to-red-600/5",
    badge: null,
  },
  {
    emoji: "⚡",
    title: "Електрика та освітлення",
    description: "Генератори, стартери, датчики, фари та LED лампи",
    href: "http://sprinter.org.ua/price",
    accent: "from-yellow-500/10 to-yellow-600/5",
    badge: null,
  },
  {
    emoji: "🔩",
    title: "Двигун та КПП",
    description: "Поршнева група, прокладки, ремні ГРМ, фільтри",
    href: "http://sprinter.org.ua/price",
    accent: "from-green-500/10 to-green-600/5",
    badge: null,
  },
  {
    emoji: "🛢️",
    title: "Моторні оливи",
    description: "Підбір масла за маркою авто, допуском і в'язкістю",
    href: "http://sprinter.org.ua/MotorOil.aspx",
    accent: "from-stone-500/10 to-stone-600/5",
    badge: "Хіт",
  },
  {
    emoji: "🔋",
    title: "Акумулятори",
    description: "Акумулятори для легкових та вантажних авто, мото",
    href: "http://sprinter.org.ua/CarRechargeableBattery.aspx",
    accent: "from-teal-500/10 to-teal-600/5",
    badge: null,
  },
];

export default function Services() {
  return (
    <section id="catalog" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 animate-on-scroll">
          <span className="inline-block text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3">
            Каталог
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Категорії запчастин
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Оригінальні та аналогові деталі для іномарок і вітчизняних авто.
            Швидкий підбір за маркою, моделлю або артикулом.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <a
              key={cat.title}
              href={cat.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col p-6 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl hover:shadow-orange-50 transition-all duration-300 hover:-translate-y-1 animate-on-scroll"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Badge */}
              {cat.badge && (
                <span className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 bg-orange-100 text-orange-600 rounded-full">
                  {cat.badge}
                </span>
              )}

              {/* Icon bg */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.accent} flex items-center justify-center mb-5 text-2xl group-hover:scale-110 transition-transform duration-300`}
              >
                {cat.emoji}
              </div>

              <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors leading-snug">
                {cat.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                {cat.description}
              </p>

              <div className="flex items-center gap-1 mt-4 text-orange-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Переглянути
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="http://sprinter.org.ua/price"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25"
          >
            Весь каталог запчастин
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
