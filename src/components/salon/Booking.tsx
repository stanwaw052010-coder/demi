"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Check } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { fadeUp, staggerContainer } from "@/lib/utils";
import { site } from "@/lib/site";

export default function Booking() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span variants={fadeUp} className="text-rose-dark font-semibold text-sm tracking-widest uppercase">
            Контакти
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-serif text-4xl sm:text-5xl font-bold text-ink mt-3 mb-6">
            Записатися на візит
          </motion.h2>
          <motion.p variants={fadeUp} className="text-ink/60 text-lg leading-relaxed mb-8">
            Найшвидший спосіб записатись — написати в Instagram Direct. Також можна залишити заявку нижче або
            зателефонувати.
          </motion.p>

          <motion.div variants={staggerContainer} className="space-y-4">
            <motion.a
              variants={fadeUp}
              href={site.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-ink/80 hover:text-rose-dark transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-rose/10 flex items-center justify-center shrink-0">
                <InstagramIcon className="w-5 h-5 text-rose-dark" />
              </div>
              <span className="text-sm font-medium">@{site.instagramHandle}</span>
            </motion.a>
            <motion.a variants={fadeUp} href={site.phoneHref} className="flex items-center gap-3 text-ink/80 hover:text-rose-dark transition-colors">
              <div className="w-10 h-10 rounded-xl bg-rose/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-rose-dark" />
              </div>
              <span className="text-sm font-medium">{site.phone}</span>
            </motion.a>
            <motion.div variants={fadeUp} className="flex items-center gap-3 text-ink/80">
              <div className="w-10 h-10 rounded-xl bg-rose/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-rose-dark" />
              </div>
              <span className="text-sm font-medium">{site.address}</span>
            </motion.div>
            <motion.div variants={fadeUp} className="flex items-center gap-3 text-ink/80">
              <div className="w-10 h-10 rounded-xl bg-rose/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-rose-dark" />
              </div>
              <div className="text-sm font-medium space-x-3">
                {site.hours.map((h) => (
                  <span key={h.days}>{h.days}: {h.time}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-3xl border border-rose/12 bg-white p-8 shadow-sm"
        >
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10 gap-4">
              <div className="w-14 h-14 rounded-full bg-rose/15 flex items-center justify-center">
                <Check className="w-7 h-7 text-rose-dark" />
              </div>
              <h3 className="font-serif text-xl font-bold text-ink">Дякуємо за заявку!</h3>
              <p className="text-sm text-ink/60 max-w-xs">
                Ми зв&apos;яжемось з вами найближчим часом для підтвердження запису. Також можете написати одразу в
                Instagram — так буде швидше.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-ink mb-1">Залишити заявку</h3>
              <div>
                <label className="text-xs font-medium text-ink/60 mb-1.5 block">Ім&apos;я</label>
                <input
                  required
                  type="text"
                  placeholder="Ваше ім'я"
                  className="w-full px-4 py-3 bg-cream border border-rose/15 rounded-xl text-sm text-ink placeholder-ink/30 outline-none focus:border-rose/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-ink/60 mb-1.5 block">Телефон</label>
                <input
                  required
                  type="tel"
                  placeholder="+38 (0__) ___-__-__"
                  className="w-full px-4 py-3 bg-cream border border-rose/15 rounded-xl text-sm text-ink placeholder-ink/30 outline-none focus:border-rose/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-ink/60 mb-1.5 block">Послуга</label>
                <select className="w-full px-4 py-3 bg-cream border border-rose/15 rounded-xl text-sm text-ink outline-none focus:border-rose/50 transition-colors">
                  <option>Манікюр</option>
                  <option>Педикюр</option>
                  <option>Нарощування нігтів</option>
                  <option>Дизайн та нейл-арт</option>
                  <option>Інше</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-rose hover:bg-rose-dark text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-rose/30"
              >
                Надіслати заявку
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
