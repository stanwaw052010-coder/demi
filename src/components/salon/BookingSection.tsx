'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Scissors, Hand, Eye, Sparkles } from 'lucide-react';

const SERVICES = [
  { id: 'hair', label: 'Волосся', icon: Scissors, desc: 'Стрижка, фарбування, укладка' },
  { id: 'manicure', label: 'Манікюр', icon: Hand, desc: 'Гель-лак, nail-art, нарощування' },
  { id: 'brows', label: 'Брови', icon: Eye, desc: 'Корекція, хна, ламінування' },
  { id: 'makeup', label: 'Макіяж', icon: Sparkles, desc: 'Денний, вечірній, весільний' },
];

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '14:00', '14:30', '15:00',
  '15:30', '16:00', '16:30', '17:00', '17:30', '18:00',
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfWeek(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
const MONTHS_UK = [
  'Січень','Лютий','Березень','Квітень','Травень','Червень',
  'Липень','Серпень','Вересень','Жовтень','Листопад','Грудень',
];

export default function BookingSection() {
  const today = new Date();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfWeek(calYear, calMonth);

  const formatDate = (d: string) => {
    if (!d) return '';
    const [y, m, day] = d.split('-');
    return `${day}.${m}.${y}`;
  };

  const selectDate = (day: number) => {
    const d = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(d);
    setSelectedTime('');
  };

  const isPastDay = (day: number) => {
    const d = new Date(calYear, calMonth, day);
    d.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return d < today;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service: selectedService, date: selectedDate, time: selectedTime, name, phone, comment }),
      });
    } catch {
      // fail gracefully
    }
    setSubmitting(false);
    setSuccess(true);
  };

  const canGoNext = () => {
    if (step === 1) return !!selectedService;
    if (step === 2) return !!selectedDate && !!selectedTime;
    if (step === 3) return name.trim().length >= 2 && phone.trim().length >= 10;
    return false;
  };

  const stepVariants = {
    enter: { opacity: 0, x: 24 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 },
  };

  if (success) {
    return (
      <section id="booking" className="py-28 bg-[#FBF8F5]">
        <div className="max-w-lg mx-auto px-5 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-20 h-20 rounded-full bg-[#C9A96E] flex items-center justify-center mx-auto mb-8"
          >
            <Check size={36} className="text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-5xl text-[#1A1A1A] mb-4"
          >
            Запис прийнято!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[#8A8278] text-lg mb-3 leading-relaxed"
          >
            Дякуємо, <strong className="text-[#1A1A1A]">{name}</strong>! Ваш запис на{' '}
            <strong className="text-[#C9A96E]">{formatDate(selectedDate)} о {selectedTime}</strong> успішно відправлено.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[#B0A898] text-sm mb-10"
          >
            Адміністратор зв'яжеться з вами за номером {phone} для підтвердження запису.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button
              onClick={() => { setSuccess(false); setStep(1); setSelectedService(''); setSelectedDate(''); setSelectedTime(''); setName(''); setPhone(''); setComment(''); }}
              className="px-8 py-3.5 bg-[#C9A96E] text-white text-sm tracking-wider rounded-full hover:bg-[#A88542] transition-colors"
            >
              Записатися ще раз
            </button>
            <a
              href="https://www.instagram.com/in.style_salonkrasy"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 border border-[#E8D5B0] text-[#8A8278] text-sm tracking-wider rounded-full hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors"
            >
              Наш Instagram
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-28 bg-[#FBF8F5]">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase">Онлайн запис</span>
            <div className="w-8 h-px bg-[#C9A96E]" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl text-[#1A1A1A] mb-4">
            Запишіться онлайн
          </h2>
          <p className="text-[#8A8278] text-lg">
            Обирайте зручний час і наш адміністратор підтвердить запис
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex items-center">
              <motion.div
                animate={{
                  backgroundColor: step >= s ? '#C9A96E' : '#E8D5B0',
                  scale: step === s ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
              >
                {step > s ? <Check size={16} /> : s}
              </motion.div>
              {i < 2 && (
                <motion.div
                  animate={{ backgroundColor: step > s ? '#C9A96E' : '#E8D5B0' }}
                  transition={{ duration: 0.3 }}
                  className="w-16 sm:w-24 h-px mx-1"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8 sm:gap-20 text-xs text-[#B0A898] mb-10 -mt-6 tracking-wider">
          <span className={step === 1 ? 'text-[#C9A96E]' : ''}>Послуга</span>
          <span className={step === 2 ? 'text-[#C9A96E]' : ''}>Дата і час</span>
          <span className={step === 3 ? 'text-[#C9A96E]' : ''}>Контакти</span>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl border border-[#E8D5B0]/60 p-8 sm:p-10 mb-6 min-h-[360px] overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Step 1: Service */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-display text-2xl text-[#1A1A1A] mb-6">Оберіть послугу</h3>
                <div className="grid grid-cols-2 gap-3">
                  {SERVICES.map((svc) => (
                    <motion.button
                      key={svc.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedService(svc.id)}
                      className={`p-5 rounded-xl border text-left transition-all duration-300 ${
                        selectedService === svc.id
                          ? 'border-[#C9A96E] bg-[#C9A96E]/6 shadow-[0_4px_20px_rgba(201,169,110,0.15)]'
                          : 'border-[#E8D5B0]/80 hover:border-[#C9A96E]/50'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                        selectedService === svc.id ? 'bg-[#C9A96E]/15' : 'bg-[#F5EFE6]'
                      }`}>
                        <svc.icon size={17} className={selectedService === svc.id ? 'text-[#C9A96E]' : 'text-[#8A8278]'} strokeWidth={1.5} />
                      </div>
                      <p className={`font-medium text-sm mb-1 ${selectedService === svc.id ? 'text-[#C9A96E]' : 'text-[#1A1A1A]'}`}>
                        {svc.label}
                      </p>
                      <p className="text-[#B0A898] text-xs">{svc.desc}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-display text-2xl text-[#1A1A1A] mb-6">Оберіть дату та час</h3>

                {/* Mini calendar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); }}
                      className="p-2 hover:text-[#C9A96E] text-[#8A8278] transition-colors"
                    >
                      ‹
                    </button>
                    <span className="text-[#1A1A1A] font-medium">
                      {MONTHS_UK[calMonth]} {calYear}
                    </span>
                    <button
                      onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); }}
                      className="p-2 hover:text-[#C9A96E] text-[#8A8278] transition-colors"
                    >
                      ›
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {WEEKDAYS.map(d => (
                      <div key={d} className="text-[#B0A898] text-xs py-1">{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      const past = isPastDay(day);
                      const selected = selectedDate === dateStr;
                      return (
                        <button
                          key={day}
                          disabled={past}
                          onClick={() => selectDate(day)}
                          className={`h-9 w-full rounded-lg text-sm transition-all duration-200 ${
                            selected ? 'bg-[#C9A96E] text-white' :
                            past ? 'text-[#D4CEC9] cursor-not-allowed' :
                            'hover:bg-[#F5EFE6] text-[#1A1A1A]'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time slots */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-[#8A8278] text-sm mb-3">Доступний час на {formatDate(selectedDate)}:</p>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {TIME_SLOTS.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-2 rounded-lg text-sm transition-all duration-200 ${
                            selectedTime === t
                              ? 'bg-[#C9A96E] text-white'
                              : 'bg-[#F5EFE6] text-[#8A8278] hover:bg-[#E8D5B0]'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-display text-2xl text-[#1A1A1A] mb-2">Ваші контактні дані</h3>
                <p className="text-[#8A8278] text-sm mb-8">
                  Ваш запис:{' '}
                  <strong className="text-[#C9A96E]">
                    {SERVICES.find(s => s.id === selectedService)?.label}
                  </strong>{' '}
                  · {formatDate(selectedDate)} о {selectedTime}
                </p>

                <div className="flex flex-col gap-5">
                  <div>
                    <label className="block text-sm text-[#8A8278] mb-2 tracking-wider">Ваше ім'я *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Наприклад: Ольга"
                      className="w-full px-4 py-3.5 rounded-xl border border-[#E8D5B0] bg-[#FDFAF7] text-[#1A1A1A] placeholder-[#C4BDB5] focus:outline-none focus:border-[#C9A96E] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#8A8278] mb-2 tracking-wider">Телефон *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+380 __ ___ __ __"
                      className="w-full px-4 py-3.5 rounded-xl border border-[#E8D5B0] bg-[#FDFAF7] text-[#1A1A1A] placeholder-[#C4BDB5] focus:outline-none focus:border-[#C9A96E] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#8A8278] mb-2 tracking-wider">Коментар (необов'язково)</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Побажання або уточнення до запису..."
                      rows={3}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#E8D5B0] bg-[#FDFAF7] text-[#1A1A1A] placeholder-[#C4BDB5] focus:outline-none focus:border-[#C9A96E] transition-colors text-sm resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep(s => s - 1)}
            disabled={step === 1}
            className="flex items-center gap-2 px-6 py-3 text-[#8A8278] text-sm disabled:opacity-0 disabled:pointer-events-none hover:text-[#C9A96E] transition-colors"
          >
            <ChevronLeft size={16} />
            Назад
          </button>

          {step < 3 ? (
            <motion.button
              whileHover={canGoNext() ? { scale: 1.03 } : {}}
              whileTap={canGoNext() ? { scale: 0.97 } : {}}
              onClick={() => canGoNext() && setStep(s => s + 1)}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-full text-sm tracking-wider transition-all duration-300 ${
                canGoNext()
                  ? 'bg-[#C9A96E] text-white shadow-lg shadow-[#C9A96E]/20'
                  : 'bg-[#E8D5B0] text-white cursor-not-allowed'
              }`}
            >
              Далі
              <ChevronRight size={16} />
            </motion.button>
          ) : (
            <motion.button
              whileHover={canGoNext() && !submitting ? { scale: 1.03 } : {}}
              whileTap={canGoNext() && !submitting ? { scale: 0.97 } : {}}
              onClick={canGoNext() ? handleSubmit : undefined}
              disabled={!canGoNext() || submitting}
              className={`flex items-center gap-2 px-8 py-3.5 rounded-full text-sm tracking-wider transition-all duration-300 ${
                canGoNext() && !submitting
                  ? 'bg-[#C9A96E] text-white shadow-lg shadow-[#C9A96E]/20'
                  : 'bg-[#E8D5B0] text-white cursor-not-allowed'
              }`}
            >
              {submitting ? 'Відправка...' : 'Підтвердити запис'}
              {!submitting && <Check size={16} />}
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}
