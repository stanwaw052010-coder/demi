"use client";

import { Phone, MapPin, Clock } from "lucide-react";

const nav = [
  { label: "Головна", href: "#hero" },
  { label: "Каталог", href: "#catalog" },
  { label: "Чому ми", href: "#why-us" },
  { label: "Доставка", href: "#delivery" },
  { label: "Контакти", href: "#contact" },
];

const catalog = [
  { label: "Кузовні запчастини", href: "http://sprinter.org.ua/CarBodyCatalog.aspx" },
  { label: "Моторна олива", href: "http://sprinter.org.ua/MotorOil.aspx" },
  { label: "Акумулятори", href: "http://sprinter.org.ua/CarRechargeableBattery.aspx" },
  { label: "Пошук за артикулом", href: "http://sprinter.org.ua/price" },
  { label: "Доставка та оплата", href: "http://sprinter.org.ua/DeliveryPayment.aspx" },
  { label: "Повернення", href: "http://sprinter.org.ua/MoneyBack.aspx" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a0a0a] text-gray-400 border-t border-white/5">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-none tracking-wide">
                  СПРИНТЕР
                </div>
                <div className="text-[10px] text-orange-400 font-medium tracking-widest uppercase leading-none">
                  Автозапчастини
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 mb-6">
              Інтернет-магазин автозапчастин у Харкові. Понад 100 000 позицій у
              наявності. Допоможемо підібрати деталь для будь-якого авто.
            </p>

            {/* Contact quick */}
            <div className="space-y-3">
              <a
                href="tel:+380672546266"
                className="flex items-center gap-2.5 text-sm hover:text-orange-400 transition-colors group"
              >
                <Phone className="w-4 h-4 text-orange-500 group-hover:text-orange-400 shrink-0" />
                +38 (067) 254-62-66
              </a>
              <div className="flex items-start gap-2.5 text-sm">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>м. Харків, Проспект Героїв Харкова, 210</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                Пн–Сб: 9:00–18:00
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
              Навігація
            </h4>
            <ul className="space-y-3">
              {nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        scrollTo(link.href);
                      }
                    }}
                    className="text-sm hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
              Каталог
            </h4>
            <ul className="space-y-3">
              {catalog.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Прийоми оплати + заклик до дії */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">
              Оплата
            </h4>
            <div className="space-y-2 mb-8">
              {["Готівка", "Картка (Visa/MC)", "Банківський переказ", "Рахунок для юр. осіб"].map((m) => (
                <div key={m} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  {m}
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-orange-500/10 border border-orange-500/20">
              <div className="text-white font-semibold text-sm mb-2">
                Потрібна допомога?
              </div>
              <p className="text-xs text-gray-400 mb-4">
                Зателефонуйте або залиште заявку — підберемо деталь для вашого авто.
              </p>
              <a
                href="tel:+380672546266"
                className="block text-center px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-xl transition-colors"
              >
                Зателефонувати
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Спринтер — Автозапчастини. Всі права захищені.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="http://sprinter.org.ua/MoneyBack.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Повернення товару
            </a>
            <a
              href="http://sprinter.org.ua/DeliveryPayment.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Умови доставки
            </a>
            <a
              href="http://sprinter.org.ua/Misc/OfferToSuppliers.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Співробітництво
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
