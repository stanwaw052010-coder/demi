"use client";

import { motion } from "framer-motion";

const EMBED_SRC =
  "https://maps.google.com/maps?q=%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%9F%D0%BE%D0%BA%D1%80%D0%BE%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+57%D0%B1+%D0%96%D0%B8%D1%82%D0%BE%D0%BC%D0%B8%D1%80&output=embed";

const NAVIGATE_LINK =
  "https://maps.google.com/maps?daddr=%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%9F%D0%BE%D0%BA%D1%80%D0%BE%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+57%D0%B1+%D0%96%D0%B8%D1%82%D0%BE%D0%BC%D0%B8%D1%80";

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <div
        className="flex-shrink-0 w-10 h-10 rounded-xl bg-violet-100 flex items-center
                   justify-center text-violet-600"
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-0.5">
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}

export default function FialkaContacts() {
  return (
    <section id="contacts" className="py-24 bg-violet-50/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 mb-3">
            Контакти
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-violet-950">
            Як нас знайти
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-7 p-8 rounded-3xl
                       bg-white border border-violet-100 shadow-sm"
          >
            <div className="flex flex-col gap-6">
              {/* Address */}
              <ContactRow
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                }
                label="Адреса"
              >
                <p className="text-gray-800 font-medium leading-snug">
                  вулиця Покровська, 57б
                  <br />
                  Житомир, Житомирська область
                </p>
              </ContactRow>

              {/* Phone */}
              <ContactRow
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.63 19.79 19.79 0 01.06 1.08 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                }
                label="Телефон"
              >
                <a
                  href="tel:+380976757227"
                  className="text-violet-700 font-bold text-lg hover:text-violet-900 transition-colors"
                >
                  +380 97 675 72 27
                </a>
              </ContactRow>

              {/* Instagram */}
              <ContactRow
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                  </svg>
                }
                label="Instagram"
              >
                <a
                  href="https://www.instagram.com/fialka_beauty_bar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-700 font-semibold hover:text-violet-900 transition-colors"
                >
                  @fialka_beauty_bar
                </a>
              </ContactRow>
            </div>

            {/* Navigate button */}
            <motion.a
              href={NAVIGATE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl
                         bg-violet-600 text-white font-semibold text-sm
                         shadow-md shadow-violet-200 hover:bg-violet-700 transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <polygon
                  points="3 11 22 2 13 21 11 13 3 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
              Побудувати маршрут
            </motion.a>

            {/* Call button */}
            <motion.a
              href="tel:+380976757227"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl
                         border-2 border-violet-200 text-violet-700 font-semibold text-sm
                         hover:border-violet-400 hover:bg-violet-50 transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.63 19.79 19.79 0 01.06 1.08 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              Зателефонувати
            </motion.a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 rounded-3xl overflow-hidden border border-violet-100 shadow-sm"
            style={{ height: 420 }}
          >
            <iframe
              src={EMBED_SRC}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Карта — Fialka Beauty Bar"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
