'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Clock, Users, Leaf, HeartHandshake, ShieldCheck } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Досвідчені майстри',
    desc: 'Наші спеціалісти регулярно проходять міжнародне навчання та підвищують кваліфікацію',
  },
  {
    icon: Leaf,
    title: 'Преміальна косметика',
    desc: 'Використовуємо тільки сертифіковану косметику провідних світових брендів',
  },
  {
    icon: Clock,
    title: 'Зручний запис',
    desc: 'Онлайн-запис 24/7, нагадування про запис, гнучкий графік роботи',
  },
  {
    icon: Users,
    title: 'Індивідуальний підхід',
    desc: 'Кожен клієнт — унікальний. Ми створюємо образ, який підкреслює саме вашу красу',
  },
  {
    icon: HeartHandshake,
    title: 'Атмосфера комфорту',
    desc: "Затишний інтер'єр, приємна музика, чай та кава — відпочивайте поки ми творимо",
  },
  {
    icon: ShieldCheck,
    title: 'Гарантія результату',
    desc: 'Якщо щось не сподобалось — ми безкоштовно виправимо. Ваше задоволення — наша мета',
  },
];

const testimonials = [
  {
    name: 'Олена К.',
    service: 'Фарбування волосся',
    text: 'Давно шукала салон у Коростені, де справді вміють фарбувати. In.Style — знахідка! Майстер підібрала ідеальний відтінок, результат тримається чудово.',
    rating: 5,
  },
  {
    name: 'Марина Т.',
    service: 'Весільний образ',
    text: 'Довірила майстрам свій весільний образ і не пошкодувала. Зачіска та макіяж протримались весь день! Окремий плюс — пробний день, щоб все ідеально підібрати.',
    rating: 5,
  },
  {
    name: 'Ірина В.',
    service: 'Манікюр + педикюр',
    text: 'Ходжу вже майже рік. Якість завжди стабільна, майстри уважні до деталей. Гель-лак тримається 4+ тижні. Рекомендую всім подругам!',
    rating: 5,
  },
];

export default function WhyUsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="about" className="py-28 bg-[#FBF8F5]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <div className="w-8 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase">Чому ми</span>
            <div className="w-8 h-px bg-[#C9A96E]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl text-[#1A1A1A] mb-4"
          >
            Чому обирають нас
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#8A8278] text-lg max-w-xl mx-auto leading-relaxed"
          >
            Ми не просто б'юті-салон — це місце, де кожна клієнтка відчуває себе особливою
          </motion.p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.09 }}
              className="p-7 rounded-2xl border border-[#E8D5B0]/60 bg-white group hover:shadow-[0_16px_48px_rgba(201,169,110,0.09)] transition-shadow duration-400"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C9A96E]/10 flex items-center justify-center mb-5 group-hover:bg-[#C9A96E]/18 transition-colors duration-300">
                <reason.icon size={22} className="text-[#C9A96E]" strokeWidth={1.5} />
              </div>
              <h3 className="text-[#1A1A1A] font-semibold text-base mb-2">{reason.title}</h3>
              <p className="text-[#8A8278] text-sm leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center gap-3 mb-5"
            >
              <div className="w-8 h-px bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase">Відгуки</span>
              <div className="w-8 h-px bg-[#C9A96E]" />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="font-display text-4xl text-[#1A1A1A]"
            >
              Що кажуть наші клієнтки
            </motion.h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                className="relative p-8 rounded-2xl border border-[#E8D5B0]/60 bg-white"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill="#C9A96E">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Quote mark */}
                <div className="absolute top-6 right-8 font-display text-6xl text-[#E8D5B0] leading-none select-none">
                  "
                </div>

                <p className="text-[#4A4442] text-sm leading-relaxed mb-6 relative z-10">
                  {t.text}
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A96E]/30 to-[#E8D5B0]/30 flex items-center justify-center text-[#C9A96E] font-display text-lg">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-[#1A1A1A] text-sm font-medium">{t.name}</p>
                    <p className="text-[#C9A96E] text-xs">{t.service}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
