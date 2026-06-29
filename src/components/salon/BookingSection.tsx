'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';

const SERVICES = [
  'Волосся — стрижка',
  'Волосся — фарбування',
  'Волосся — укладка / кератин',
  'Манікюр — класичний / гель-лак',
  'Манікюр — nail-art / нарощування',
  'Брови — корекція / хна / ламінування',
  'Макіяж — денний / вечірній',
  'Весільний образ',
  'Інша послуга',
];

export default function BookingSection() {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const isValid = name.trim().length >= 2 && service && phone.trim().length >= 9;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, service, phone }),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
    } catch {
      setError('Помилка відправки. Спробуйте зателефонувати: (98) 950 63 32');
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setSuccess(false);
    setName('');
    setService('');
    setPhone('');
  };

  return (
    <section id="booking" className="py-28 bg-[#FBF8F5]">
      <div className="max-w-xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase">Онлайн запис</span>
            <div className="w-8 h-px bg-[#C9A96E]" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl text-[#1A1A1A] mb-4">
            Записатися онлайн
          </h2>
          <p className="text-[#8A8278] text-lg leading-relaxed">
            Залиште заявку — адміністратор Тетяна передзвонить і підтвердить зручний час
          </p>
        </div>

        {success ? (
          /* ── Success screen ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="text-center py-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-[#C9A96E] flex items-center justify-center mx-auto mb-7"
            >
              <Check size={34} className="text-white" strokeWidth={2.5} />
            </motion.div>

            <h3 className="font-display text-4xl text-[#1A1A1A] mb-3">
              Заявку прийнято!
            </h3>
            <p className="text-[#8A8278] leading-relaxed mb-2">
              Дякуємо, <strong className="text-[#1A1A1A]">{name}</strong>!<br />
              Тетяна зв'яжеться з вами за номером{' '}
              <strong className="text-[#C9A96E]">{phone}</strong>.
            </p>
            <p className="text-[#B0A898] text-sm mb-10">
              Зазвичай ми передзвонюємо протягом 30 хвилин у робочий час.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={reset}
                className="px-8 py-3.5 bg-[#C9A96E] text-white text-sm tracking-wider rounded-full hover:bg-[#A88542] transition-colors"
              >
                Ще один запис
              </button>
              <a
                href="https://www.instagram.com/in.style_salonkrasy"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 border border-[#E8D5B0] text-[#8A8278] text-sm tracking-wider rounded-full hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
              >
                Наш Instagram
              </a>
            </div>
          </motion.div>
        ) : (
          /* ── Form ── */
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-[#E8D5B0]/60 p-8 sm:p-10 shadow-[0_8px_48px_rgba(201,169,110,0.08)]"
          >
            <div className="flex flex-col gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm text-[#8A8278] tracking-wider mb-2">
                  Ваше ім'я *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Наприклад: Ольга"
                  required
                  className="w-full px-4 py-4 rounded-xl border border-[#E8D5B0] bg-[#FDFAF7] text-[#1A1A1A] placeholder-[#C4BDB5] focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-all text-sm"
                />
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm text-[#8A8278] tracking-wider mb-2">
                  Послуга *
                </label>
                <div className="relative">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                    className="w-full px-4 py-4 pr-10 rounded-xl border border-[#E8D5B0] bg-[#FDFAF7] text-[#1A1A1A] focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-all text-sm appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Оберіть послугу...</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C9A96E] pointer-events-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-[#8A8278] tracking-wider mb-2">
                  Номер телефону *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+380 __ ___ __ __"
                  required
                  className="w-full px-4 py-4 rounded-xl border border-[#E8D5B0] bg-[#FDFAF7] text-[#1A1A1A] placeholder-[#C4BDB5] focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]/30 transition-all text-sm"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={!isValid || submitting}
                whileHover={isValid && !submitting ? { scale: 1.02 } : {}}
                whileTap={isValid && !submitting ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-xl text-white text-sm tracking-widest transition-all duration-300 ${
                  isValid && !submitting
                    ? 'bg-[#C9A96E] hover:bg-[#A88542] shadow-lg shadow-[#C9A96E]/25 cursor-pointer'
                    : 'bg-[#E8D5B0] cursor-not-allowed'
                }`}
              >
                {submitting ? 'Відправляємо...' : 'Залишити заявку'}
              </motion.button>

              <p className="text-center text-[#B0A898] text-xs">
                Або зателефонуйте прямо зараз:{' '}
                <a href="tel:+380989506332" className="text-[#C9A96E] hover:underline">
                  (98) 950 63 32
                </a>{' '}
                — Тетяна
              </p>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
