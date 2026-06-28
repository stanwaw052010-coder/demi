const steps = [
  {
    number: "01",
    title: "Знайдіть деталь",
    description:
      "Введіть артикул, OEM-код або назву деталі в пошуку. Або оберіть категорію в каталозі.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Оформіть замовлення",
    description:
      "Додайте деталь у кошик та оформіть онлайн, або зателефонуйте — ми швидко опрацюємо запит.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Отримайте деталь",
    description:
      "Самовивіз у Харкові того ж дня або доставка по Україні Новою Поштою. Надійно та вчасно.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section
      id="delivery"
      className="py-20 lg:py-28 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Bg decoration */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: "40px 40px",
      }} />
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block text-sm font-semibold text-orange-400 uppercase tracking-widest mb-3">
            Як це працює
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Просто. Швидко. Надійно.
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Від пошуку до отримання деталі — три прості кроки
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-14 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center animate-on-scroll"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Number + icon circle */}
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-400 mb-0 transition-all duration-300 hover:bg-orange-500/10 hover:border-orange-500/30">
                  {step.icon}
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{step.number.slice(-1)}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="http://sprinter.org.ua/DeliveryPayment.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold text-base border border-orange-500/30 hover:border-orange-400/50 px-6 py-3 rounded-xl transition-all duration-200 hover:bg-orange-500/10"
          >
            Детальніше про доставку та оплату
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
