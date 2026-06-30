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
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Контакти" }]} />
          <h1 className="mt-8 mb-10 text-3xl font-extrabold text-gray-900 sm:text-4xl">Контакти</h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact info */}
            <div className="space-y-5">
              {[
                {
                  icon: Phone,
                  label: "Телефони",
                  content: (
                    <div className="space-y-1">
                      <a
                        href="tel:+380672546266"
                        className="block font-semibold text-orange-500 hover:text-orange-600"
                      >
                        +38 (067) 254-62-66
                      </a>
                      <a
                        href="tel:+380991129526"
                        className="block font-semibold text-orange-500 hover:text-orange-600"
                      >
                        +38 (099) 112-95-26
                      </a>
                      <a
                        href="tel:+380962770540"
                        className="block font-semibold text-orange-500 hover:text-orange-600"
                      >
                        +38 (096) 277-05-40
                      </a>
                    </div>
                  ),
                },
                {
                  icon: Mail,
                  label: "Email",
                  content: (
                    <a
                      href="mailto:info@sprinter.org.ua"
                      className="font-semibold text-orange-500 hover:text-orange-600"
                    >
                      info@sprinter.org.ua
                    </a>
                  ),
                },
                {
                  icon: MapPin,
                  label: "Адреса",
                  content: (
                    <span className="text-gray-700">м. Харків, Просп. Героїв Харкова, 210</span>
                  ),
                },
                {
                  icon: Clock,
                  label: "Графік роботи",
                  content: (
                    <div className="space-y-1 text-gray-700">
                      <div>Пн–П&apos;ят: 9:00–18:00</div>
                      <div>Субота: 9:00–16:00</div>
                      <div className="text-gray-400">Неділя: вихідний</div>
                    </div>
                  ),
                },
              ].map(({ icon: Icon, label, content }) => (
                <div
                  key={label}
                  className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                    <Icon className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="mb-1 text-xs font-medium text-gray-400">{label}</div>
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
