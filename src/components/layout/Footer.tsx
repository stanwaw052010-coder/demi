import Link from "next/link";
import { Phone, MapPin, Clock, Mail, Send } from "lucide-react";
import { vehicles } from "@/lib/vehicles";
import { categories } from "@/lib/categories";

const links = {
  catalog: vehicles.map((v) => ({ label: v.name, href: `/catalog/${v.slug}` })),
  info: [
    { label: "Про компанію", href: "/about" },
    { label: "Доставка і оплата", href: "/delivery" },
    { label: "Гарантія", href: "/warranty" },
    { label: "Повернення", href: "/returns" },
    { label: "Блог", href: "/blog" },
  ],
  categories: [
    ...categories.slice(0, 4).map((c) => ({
      label: c.name,
      href: `/catalog/mercedes-sprinter/${c.slug}`,
    })),
    { label: "Моторні оливи", href: "/oils" },
    { label: "Акумулятори", href: "/batteries" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-gray-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <div className="leading-none">
                <div className="text-white font-bold text-lg tracking-wide">СПРИНТЕР</div>
                <div className="text-[10px] text-orange-400 font-medium tracking-widest uppercase">Автозапчастини</div>
              </div>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-xs">
              Спеціалізований інтернет-магазин запчастин для Mercedes Sprinter, Vito, VW Crafter та LT. Понад 8 000 позицій в наявності.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 text-sm">
                <Phone className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a href="tel:+380672546266" className="block hover:text-orange-400 transition-colors">+38 (067) 254-62-66</a>
                  <a href="tel:+380991129526" className="block hover:text-orange-400 transition-colors">+38 (099) 112-95-26</a>
                  <a href="tel:+380962770540" className="block hover:text-orange-400 transition-colors">+38 (096) 277-05-40</a>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-sm">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>м. Харків, Просп. Героїв Харкова, 210</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                Пн–Сб: 9:00–18:00
              </div>
              <a href="mailto:info@sprinter.org.ua" className="flex items-center gap-2.5 text-sm hover:text-orange-400 transition-colors">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                info@sprinter.org.ua
              </a>
            </div>
          </div>

          {/* Catalog by vehicle */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Авто</h4>
            <ul className="space-y-2.5">
              {links.catalog.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-orange-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Категорії</h4>
            <ul className="space-y-2.5">
              {links.categories.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-orange-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Інформація</h4>
            <ul className="space-y-2.5 mb-6">
              {links.info.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-orange-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Newsletter */}
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-white text-xs font-semibold mb-1">Новини та акції</div>
              <p className="text-xs text-gray-500 mb-3">Підпишіться на знижки</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 min-w-0 px-3 py-2 bg-white/8 border border-white/10 rounded-lg text-xs text-gray-300 placeholder-gray-600 outline-none focus:border-orange-500/50"
                />
                <button className="p-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors">
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} Спринтер — Автозапчастини. Всі права захищені.</p>
          <div className="flex items-center gap-5">
            <Link href="/returns" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Повернення</Link>
            <Link href="/delivery" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Доставка</Link>
            <Link href="/warranty" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Гарантія</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
