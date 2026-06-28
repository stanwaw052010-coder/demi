import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RefreshCw } from "lucide-react";

export const metadata = {
  title: "Повернення | Спринтер",
};

export default function ReturnsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb items={[{ label: "Повернення" }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-8 mb-10">Повернення товару</h1>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-gray-200 p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">14 днів на повернення</h2>
                  <p className="text-sm text-gray-500">Без зайвих питань</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Якщо деталь вам не підійшла або ви вирішили відмовитись від покупки — ви можете повернути товар протягом 14 календарних днів з дати отримання. Повернення коштів здійснюється протягом 3–5 робочих днів.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Умови повернення</h2>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "Товар у оригінальній упаковці виробника",
                  "Товар не встановлювався і не монтувався",
                  "Немає слідів механічних пошкоджень чи спроб монтажу",
                  "Збережений чек або підтвердження замовлення",
                ].map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <span className="text-orange-500 mt-0.5 font-bold">✓</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Як здійснити повернення</h2>
              <ol className="space-y-4 text-sm text-gray-600">
                {[
                  "Зателефонуйте нам або напишіть на email — повідомте про намір повернути товар.",
                  "Отримайте від нас підтвердження та адресу для відправки.",
                  "Надішліть товар Новою Поштою. Якщо помилка на нашій стороні — витрати на доставку компенсуємо ми.",
                  "Після отримання та перевірки товару — повертаємо кошти на картку протягом 3–5 днів.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 text-sm text-orange-900">
              <strong>Контакти для повернень:</strong><br />
              Телефон: <a href="tel:+380672546266" className="font-semibold hover:underline">+38 (067) 254-62-66</a><br />
              Email: <a href="mailto:info@sprinter.org.ua" className="font-semibold hover:underline">info@sprinter.org.ua</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
