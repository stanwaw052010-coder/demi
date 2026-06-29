'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Scissors, SprayCan, Eye, Star, Heart, Gem } from 'lucide-react';

const services = [
  {
    icon: Scissors,
    title: 'Волосся',
    description: 'Стрижки, фарбування, кератинове випрямлення, ламінування та професійна укладка',
    tags: ['Стрижка', 'Фарбування', 'Кератин', 'Укладка'],
    from: '300',
    accent: '#C9A96E',
    bg: 'from-[#C9A96E]/12 to-[#E8D5B0]/6',
  },
  {
    icon: SprayCan,
    title: 'Манікюр',
    description: 'Класичний та апаратний манікюр, гель-лак, nail-art, нарощування та зміцнення',
    tags: ['Класичний', 'Гель-лак', 'Nail-art', 'Нарощування'],
    from: '200',
    accent: '#D4A5A5',
    bg: 'from-[#D4A5A5]/12 to-[#F0E4E4]/6',
  },
  {
    icon: Eye,
    title: 'Брови',
    description: 'Корекція форми воском, фарбування хною, ламінування та пудрове напилення',
    tags: ['Корекція', 'Хна', 'Ламінування', 'Пудровий ефект'],
    from: '150',
    accent: '#B5C5D8',
    bg: 'from-[#B5C5D8]/12 to-[#D4E0EC]/6',
  },
  {
    icon: Star,
    title: 'Макіяж',
    description: 'Денний, вечірній та весільний макіяж. Індивідуальне навчання техніці нанесення',
    tags: ['Денний', 'Вечірній', 'Весільний', 'Навчання'],
    from: '400',
    accent: '#C9A96E',
    bg: 'from-[#C9A96E]/12 to-[#F0D896]/6',
  },
  {
    icon: Heart,
    title: 'Догляд за шкірою',
    description: 'Ліфтинг-масаж, глибоке очищення, живильні маски та процедури омолодження',
    tags: ['Масаж обличчя', 'Чищення', 'Маски', 'Пілінг'],
    from: '350',
    accent: '#D4A5A5',
    bg: 'from-[#D4A5A5]/12 to-[#F0E4E4]/6',
  },
  {
    icon: Gem,
    title: 'Весільний образ',
    description: 'Повний образ нареченої: зачіска, макіяж, манікюр, пробний день включено',
    tags: ['Зачіска', 'Макіяж', 'Манікюр', 'Пробний день'],
    from: '1800',
    accent: '#C9A96E',
    bg: 'from-[#C9A96E]/18 to-[#F0D896]/10',
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const scrollToBooking = () =>
    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="services" className="py-28 bg-[#FBF8F5]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <div className="w-8 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase">Наші послуги</span>
            <div className="w-8 h-px bg-[#C9A96E]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl text-[#1A1A1A] mb-4"
          >
            Усе для вашої краси
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#8A8278] text-lg max-w-xl mx-auto leading-relaxed"
          >
            Повний спектр б'юті-послуг від досвідчених майстрів з індивідуальним підходом до кожного клієнта
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.09 }}
            >
              <motion.div
                whileHover={{ y: -6, boxShadow: `0 24px 64px rgba(201,169,110,0.11)` }}
                transition={{ duration: 0.3 }}
                onClick={scrollToBooking}
                className="relative h-full p-8 rounded-2xl border border-[#E8D5B0]/60 bg-white group cursor-pointer overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${svc.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${svc.accent}18` }}
                  >
                    <svc.icon size={20} style={{ color: svc.accent }} strokeWidth={1.5} />
                  </div>

                  <h3 className="font-display text-2xl text-[#1A1A1A] mb-3">{svc.title}</h3>
                  <p className="text-[#8A8278] text-sm leading-relaxed mb-5">{svc.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {svc.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs rounded-full bg-[#F5EFE6] text-[#8A8278]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#B0A898]">від</span>
                      <span className="ml-1 font-display text-2xl" style={{ color: svc.accent }}>
                        {svc.from} грн
                      </span>
                    </div>
                    <span className="text-sm transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: svc.accent }}>
                      Записатися →
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
