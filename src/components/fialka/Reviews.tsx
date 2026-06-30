"use client";

import { motion } from "framer-motion";

const MAPS_LINK =
  "https://www.google.com/maps/search/Fialka+Beauty+Bar+%D0%96%D0%B8%D1%82%D0%BE%D0%BC%D0%B8%D1%80+%D0%9F%D0%BE%D0%BA%D1%80%D0%BE%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+57%D0%B1";

const EMBED_SRC =
  "https://maps.google.com/maps?q=Fialka+Beauty+Bar+%D0%96%D0%B8%D1%82%D0%BE%D0%BC%D0%B8%D1%80+%D0%9F%D0%BE%D0%BA%D1%80%D0%BE%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+57%D0%B1&output=embed";

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "#F59E0B" : "none"}
      stroke={filled ? "#F59E0B" : "#D1D5DB"}
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export default function FialkaReviews() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 90% 80% at 50% 50%, #F5F3FF 0%, #FAFAFA 100%)",
      }}
    >
      {/* Decorative */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #DDD6FE, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 mb-3">
            Відгуки
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-violet-950 mb-4">
            Нам довіряють
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Реальні відгуки наших клієнток у Google Maps
          </p>
        </motion.div>

        {/* Rating showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4 mb-14"
        >
          <div
            className="flex flex-col items-center gap-3 px-10 py-8 rounded-3xl
                       bg-white border border-violet-100 shadow-lg shadow-violet-50"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled />
              ))}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-7xl font-bold text-violet-900 leading-none">
                5.0
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-label="Google" role="img">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-medium text-gray-600">Google</span>
            </div>
          </div>

          <motion.a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
                       border-2 border-violet-300 text-violet-700 font-semibold text-sm
                       hover:border-violet-500 hover:bg-violet-50 transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
            </svg>
            Дивитись всі відгуки в Google Maps
          </motion.a>
        </motion.div>

        {/* Google Maps embed */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl overflow-hidden border border-violet-100 shadow-lg"
          style={{ height: 360 }}
        >
          <iframe
            src={EMBED_SRC}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Fialka Beauty Bar на карті"
          />
        </motion.div>
      </div>
    </section>
  );
}
