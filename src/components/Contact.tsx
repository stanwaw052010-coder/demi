"use client";

import { useState } from "react";
import { Phone, MapPin, Clock, Mail, CheckCircle } from "lucide-react";

const phones = [
  { number: "+38 (067) 254-62-66", op: "Kyivstar" },
  { number: "+38 (099) 112-95-26", op: "MTS" },
  { number: "+38 (096) 277-05-40", op: "Life" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.name = "Введіть ім'я (мін. 2 символи)";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10)
      errs.phone = "Введіть коректний номер телефону";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    // Simulate send
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      setForm({ name: "", phone: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 animate-on-scroll">
          <span className="inline-block text-sm font-semibold text-orange-500 uppercase tracking-widest mb-3">
            Контакти
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Зв&apos;яжіться з нами
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Готові допомогти з підбором запчастин. Телефонуйте або заповніть
            форму — передзвонимо протягом 15 хвилин.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left: contact info */}
          <div className="lg:col-span-2 space-y-8 animate-on-scroll">
            {/* Phones */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Телефони
              </h3>
              <div className="space-y-3">
                {phones.map((p) => (
                  <a
                    key={p.number}
                    href={`tel:${p.number.replace(/\D/g, "")}`}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-orange-200 bg-gray-50 hover:bg-orange-50 group transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-orange-100 group-hover:bg-orange-200 flex items-center justify-center transition-colors shrink-0">
                      <Phone className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm group-hover:text-orange-600 transition-colors">
                        {p.number}
                      </div>
                      <div className="text-xs text-gray-400">{p.op}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Адреса
              </h3>
              <div className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    м. Харків
                  </div>
                  <div className="text-sm text-gray-500">
                    Проспект Героїв Харкова, 210
                  </div>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Графік роботи
              </h3>
              <div className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-orange-500" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between gap-8 text-sm">
                    <span className="text-gray-600 font-medium">Пн – Сб</span>
                    <span className="text-gray-900 font-semibold">9:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between gap-8 text-sm">
                    <span className="text-gray-600 font-medium">Неділя</span>
                    <span className="text-red-400 font-semibold">Вихідний</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Ел. пошта
              </h3>
              <div className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-orange-500" />
                </div>
                <div className="self-center">
                  <a
                    href="mailto:info@sprinter.org.ua"
                    className="text-sm font-medium text-gray-900 hover:text-orange-500 transition-colors"
                  >
                    info@sprinter.org.ua
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: map + form */}
          <div className="lg:col-span-3 space-y-8 animate-on-scroll" style={{ animationDelay: "150ms" }}>
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm" style={{ height: "280px" }}>
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=36.30%2C49.98%2C36.35%2C50.02&layer=mapnik&marker=50.0000%2C36.3200"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Карта розташування Спринтер"
              />
            </div>

            {/* Contact form */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 lg:p-8">
              {done ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle className="w-14 h-14 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Дякуємо за звернення!
                  </h3>
                  <p className="text-gray-500">
                    Ми передзвонимо вам протягом 15 хвилин у робочий час.
                  </p>
                  <button
                    onClick={() => setDone(false)}
                    className="mt-6 px-6 py-2.5 border border-gray-200 hover:border-orange-300 text-sm font-medium text-gray-600 hover:text-orange-600 rounded-lg transition-colors"
                  >
                    Надіслати ще одне
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Замовити зворотній дзвінок
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Залиште контакти — передзвонимо і підберемо деталь для вашого авто
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                          Ім&apos;я *
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                          }
                          placeholder="Ваше ім'я"
                          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 ${
                            errors.name ? "border-red-400" : "border-gray-200"
                          }`}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                          Телефон *
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, phone: e.target.value }))
                          }
                          placeholder="+38 (0__) ___-__-__"
                          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 ${
                            errors.phone ? "border-red-400" : "border-gray-200"
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                        Яку деталь шукаєте?
                      </label>
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, message: e.target.value }))
                        }
                        placeholder="Марка авто, рік, артикул або назва деталі..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 text-base"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Надсилаємо...
                        </>
                      ) : (
                        "Замовити дзвінок"
                      )}
                    </button>
                    <p className="text-center text-xs text-gray-400">
                      Надсилаючи форму, ви погоджуєтесь з обробкою персональних даних
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
