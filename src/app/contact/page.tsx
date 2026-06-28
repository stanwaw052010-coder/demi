import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import ContactForm from "./ContactForm";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

export const metadata = {
  title: "Контакти | Спринтер",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb items={[{ label: "Контакти" }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-8 mb-10">Контакти</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact info */}
            <div className="space-y-5">
              {[
                {
                  icon: Phone,
                  label: "Телефон",
                  content: <a href="tel:+380672546266" className="text-orange-500 hover:text-orange-600 font-semibold">+38 (067) 254-62-66</a>,
                },
                {
                  icon: Mail,
                  label: "Email",
                  content: <a href="mailto:info@sprinter.org.ua" className="text-orange-500 hover:text-orange-600 font-semibold">info@sprinter.org.ua</a>,
                },
                {
                  icon: MapPin,
                  label: "Адреса",
                  content: <span className="text-gray-700">м. Харків, Просп. Героїв Харкова, 210</span>,
                },
                {
                  icon: Clock,
                  label: "Графік роботи",
                  content: (
                    <div className="text-gray-700 space-y-1">
                      <div>Пн–П'ят: 9:00–18:00</div>
                      <div>Субота: 9:00–16:00</div>
                      <div className="text-gray-400">Неділя: вихідний</div>
                    </div>
                  ),
                },
              ].map(({ icon: Icon, label, content }) => (
                <div key={label} className="bg-white rounded-2xl border border-gray-200 p-6 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-1">{label}</div>
                    <div className="text-sm">{content}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
