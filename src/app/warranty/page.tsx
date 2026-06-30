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
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Гарантія" }]} />
          <h1 className="mt-8 mb-10 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Гарантія якості
          </h1>

          <div className="mb-8 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 p-10 text-white">
            <Shield className="mb-4 h-12 w-12 opacity-90" />
            <h2 className="mb-3 text-2xl font-bold">Ми гарантуємо якість кожної деталі</h2>
            <p className="leading-relaxed text-orange-100">
              Всі запчастини в нашому магазині — від офіційних виробників та дистриб&apos;юторів. Ми
              не продаємо підробки.
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
              <div
                key={item.title}
                className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-7"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                  <CheckCircle className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-gray-200 bg-white p-7">
              <h3 className="mb-4 font-bold text-gray-900">Умови гарантії</h3>
              <ul className="space-y-2.5 text-sm text-gray-600">
                {[
                  "Деталь встановлена кваліфікованим механіком у відповідності до технологічного регламенту",
                  "Дефект виник при нормальній експлуатації, не через механічне пошкодження",
                  "Збережений чек або підтвердження замовлення",
                  "Деталь не зазнавала самостійного ремонту або модифікації",
                ].map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
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
