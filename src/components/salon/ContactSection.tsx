'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

const PHONE_ADMIN = '+380979861437';
const PHONE_MANAGER = '+380989506332';
const ADDRESS = 'вул. Михайла Грушевського, 33, Коростень';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=вул.+Михайла+Грушевського,+33,+Коростень,+Житомирська+область,+Україна';

const hours = [
  { days: "Понеділок — П'ятниця", time: '09:00 — 19:00' },
  { days: 'Субота', time: '09:00 — 18:00' },
  { days: 'Неділя', time: '10:00 — 16:00' },
];

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="contacts" className="py-28 bg-[#FBF8F5]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <div className="w-8 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase">Контакти</span>
            <div className="w-8 h-px bg-[#C9A96E]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl text-[#1A1A1A] mb-4"
          >
            Знайдіть нас
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#8A8278] text-lg max-w-md mx-auto"
          >
            Ми знаходимось у центрі Коростеня і будемо раді вас бачити!
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-5"
          >
            {/* Address */}
            <div className="p-7 rounded-2xl border border-[#E8D5B0]/60 bg-white">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={20} className="text-[#C9A96E]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs tracking-widest text-[#B0A898] uppercase mb-1.5">Адреса</p>
                  <p className="text-[#1A1A1A] font-medium leading-snug">{ADDRESS}</p>
                  <p className="text-[#8A8278] text-sm mt-0.5">Житомирська область, Україна</p>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-[#C9A96E] text-sm hover:text-[#A88542] transition-colors"
                  >
                    <Navigation size={13} />
                    Побудувати маршрут
                  </a>
                </div>
              </div>
            </div>

            {/* Phones */}
            <div className="p-7 rounded-2xl border border-[#E8D5B0]/60 bg-white">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={20} className="text-[#C9A96E]" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-4 flex-1">
                  <p className="text-xs tracking-widest text-[#B0A898] uppercase">Телефони</p>
                  <div>
                    <p className="text-[#8A8278] text-xs mb-1">Запис (Тетяна):</p>
                    <a
                      href={`tel:${PHONE_MANAGER}`}
                      className="text-[#1A1A1A] font-medium hover:text-[#C9A96E] transition-colors text-lg"
                    >
                      (98) 950 63 32
                    </a>
                  </div>
                  <div>
                    <p className="text-[#8A8278] text-xs mb-1">Адміністратор:</p>
                    <a
                      href={`tel:${PHONE_ADMIN}`}
                      className="text-[#1A1A1A] font-medium hover:text-[#C9A96E] transition-colors text-lg"
                    >
                      (97) 986 14 37
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Working hours */}
            <div className="p-7 rounded-2xl border border-[#E8D5B0]/60 bg-white">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={20} className="text-[#C9A96E]" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-xs tracking-widest text-[#B0A898] uppercase mb-4">Графік роботи</p>
                  <div className="flex flex-col gap-2.5">
                    {hours.map((h) => (
                      <div key={h.days} className="flex items-center justify-between gap-4">
                        <span className="text-[#8A8278] text-sm">{h.days}</span>
                        <span className="text-[#1A1A1A] text-sm font-medium whitespace-nowrap">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA call button */}
            <motion.a
              href={`tel:${PHONE_MANAGER}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-3 py-4 bg-[#C9A96E] text-white text-sm tracking-widest rounded-2xl hover:bg-[#A88542] transition-colors shadow-lg shadow-[#C9A96E]/20"
            >
              <Phone size={16} />
              Зателефонувати для запису
            </motion.a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="rounded-2xl overflow-hidden border border-[#E8D5B0]/60 shadow-xl h-[460px] lg:h-full min-h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.5!2d28.648!3d50.957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z0LLRg9C7LiDQnNC40YXQsNC50LvQsCDQk9GA0YPRiNC10LLRgdGM0LrQvtCz0L4sIDMzLCDQmtC-0YDQvtGB0YLQtdC90Yw!5e0!3m2!1suk!2sua!4v1693000000000!5m2!1suk!2sua"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(20%) sepia(5%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="In.Style Salon Krasy на карті"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
