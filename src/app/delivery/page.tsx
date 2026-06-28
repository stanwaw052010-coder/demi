import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Truck, MapPin, Clock, CreditCard } from "lucide-react";

export const metadata = {
  title: "Доставка і оплата | Спринтер",
};

export default function DeliveryPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb items={[{ label: "Доставка і оплата" }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-8 mb-10">Доставка і оплата</h1>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Нова Пошта</h2>
                  <p className="text-sm text-gray-500">По всій Україні, 1–2 робочих дні</p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <p>Відправляємо щодня до 16:00. Якщо замовлення оформлено до 14:00 — відправляємо того ж дня.</p>
                <p>Вартість доставки визначається тарифами Нової Пошти залежно від ваги та габаритів посилки. Для замовлень від 5 000 грн — доставка за наш рахунок.</p>
                <p>Оплата готівкою при отриманні (накладний платіж) або онлайн при оформленні.</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Самовивіз, Харків</h2>
                  <p className="text-sm text-gray-500">Просп. Героїв Харкова, 210</p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <p>Самовивіз зі складу в Харкові. Ціна при самовивозі відповідає ціні на сайті.</p>
                <p>Попередньо оформіть замовлення на сайті або зателефонуйте. Ми підготуємо замовлення та повідомимо про готовність.</p>
                <p><strong className="text-gray-900">Графік:</strong> Пн–Сб 9:00–18:00, Нд — вихідний.</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center shrink-0">
                  <CreditCard className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Способи оплати</h2>
                  <p className="text-sm text-gray-500">Декілька зручних варіантів</p>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-gray-600">
                {[
                  "Картка Visa / MasterCard онлайн на сайті",
                  "Накладний платіж при отриманні (Нова Пошта)",
                  "Готівка при самовивозі в Харкові",
                  "Банківський переказ для фізичних осіб",
                  "Безготівковий розрахунок з ПДВ для юридичних осіб",
                ].map((m) => (
                  <li key={m} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">✓</span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
