import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Shield, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Гарантія | Спринтер",
};

export default function WarrantyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb items={[{ label: "Гарантія" }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-8 mb-10">Гарантія якості</h1>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-10 text-white mb-8">
            <Shield className="w-12 h-12 mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-3">Ми гарантуємо якість кожної деталі</h2>
            <p className="text-orange-100 leading-relaxed">
              Всі запчастини в нашому магазині — від офіційних виробників та дистриб'юторів. Ми не продаємо підробки.
            </p>
          </div>

          <div className="space-y-5">
            {[
              {
                title: "Оригінальні запчастини",
                period: "12 місяців",
                desc: "На оригінальні деталі Mercedes-Benz та Volkswagen надається заводська гарантія 12 місяців від дати продажу.",
              },
              {
                title: "Аналоги брендових виробників",
                period: "6–12 місяців",
                desc: "Bosch, Febi, Mahle, Meyle, Valeo та інші — гарантія 6 до 12 місяців залежно від виробника та типу деталі.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-200 p-7 flex gap-5">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <span className="text-xs px-2.5 py-1 bg-green-50 text-green-700 rounded-full font-semibold">{item.period}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-2xl border border-gray-200 p-7">
              <h3 className="font-bold text-gray-900 mb-4">Умови гарантії</h3>
              <ul className="space-y-2.5 text-sm text-gray-600">
                {[
                  "Деталь встановлена кваліфікованим механіком у відповідності до технологічного регламенту",
                  "Дефект виник при нормальній експлуатації, не через механічне пошкодження",
                  "Збережений чек або підтвердження замовлення",
                  "Деталь не зазнавала самостійного ремонту або модифікації",
                ].map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    {c}
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
