import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Shield, Truck, Award, Users } from "lucide-react";

export const metadata = {
  title: "Про компанію | Спринтер",
  description: "Про магазин запчастин Спринтер — 15 років досвіду, Харків, запчастини для Mercedes та VW.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb items={[{ label: "Про компанію" }]} />

          <div className="mt-8 bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">Про компанію</h1>
            <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
              <p>
                <strong className="text-gray-900">«Спринтер — Автозапчастини»</strong> — спеціалізований інтернет-магазин запчастин для комерційного транспорту Mercedes та Volkswagen. Ми працюємо з 2008 року і за цей час стали одним із найнадійніших постачальників у Харківському регіоні та по всій Україні.
              </p>
              <p>
                Наша спеціалізація — Mercedes Sprinter (W901–W907), Mercedes Vito, Volkswagen Crafter та LT. Ми не займаємось усіма марками підряд — ми глибоко знаємо ці автомобілі, їхні технічні особливості та слабкі місця.
              </p>
              <p>
                Понад 8 000 позицій у наявності на нашому складі в Харкові. Ми працюємо з офіційними дистриб'юторами Bosch, Febi Bilstein, Mahle, Meyle, Valeo, Mann-Filter та інших провідних виробників.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-8">
            {[
              { icon: Award, num: "15+", label: "Років досвіду" },
              { icon: Users, num: "8 500+", label: "Клієнтів щороку" },
              { icon: Shield, num: "8 000+", label: "Позицій у наявності" },
              { icon: Truck, num: "1–2", label: "Дні доставки" },
            ].map(({ icon: Icon, num, label }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                <Icon className="w-6 h-6 text-orange-500 mx-auto mb-3" />
                <div className="text-2xl font-black text-gray-900 mb-1">{num}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-10">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Наша адреса</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p><strong className="text-gray-900">Адреса:</strong> м. Харків, Просп. Героїв Харкова, 210</p>
              <p><strong className="text-gray-900">Телефон:</strong> <a href="tel:+380672546266" className="text-orange-500 hover:text-orange-600">+38 (067) 254-62-66</a></p>
              <p><strong className="text-gray-900">Email:</strong> <a href="mailto:info@sprinter.org.ua" className="text-orange-500 hover:text-orange-600">info@sprinter.org.ua</a></p>
              <p><strong className="text-gray-900">Графік роботи:</strong> Пн–Сб: 9:00–18:00</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
