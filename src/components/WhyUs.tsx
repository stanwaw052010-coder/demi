const benefits = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Гарантія якості",
    description:
      "Кожна деталь перевірена. Продаємо лише оригінальні та сертифіковані аналоги від перевірених виробників.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "Доставка по Україні",
    description:
      "Відправляємо Новою Поштою та Укрпоштою. Харків — самовивіз того ж дня при наявності товару.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Швидке замовлення",
    description:
      "Оформте замовлення онлайн за 2 хвилини або зателефонуйте — підберемо деталь за вашим авто.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "Досвідчені консультанти",
    description:
      "Менеджери знають автомобілі. Допоможемо підібрати аналог, якщо оригінал відсутній або надто дорогий.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
    title: "Зручна оплата",
    description:
      "Оплата готівкою, карткою, банківським переказом. Для юридичних осіб — рахунок-фактура.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    title: "Легке повернення",
    description:
      "Повернення або обмін протягом 14 днів, якщо деталь не підійшла або виявилась бракованою.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16 animate-on-scroll">
          <span className="inline-block text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3">
            Чому ми
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Нам довіряють{" "}
            <span className="text-gradient">тисячі</span> клієнтів
          </h2>
          <p className="text-lg text-gray-500">
            За 15 років роботи ми стали надійним партнером для власників
            автомобілів, СТО і авторемонтних майстерень по всій Україні.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="group flex gap-5 p-6 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-300 animate-on-scroll"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-orange-50 group-hover:bg-orange-100 text-orange-500 flex items-center justify-center transition-colors duration-300">
                {b.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
