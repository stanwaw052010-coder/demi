"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200 p-10 flex flex-col items-center justify-center text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Повідомлення надіслано!</h3>
        <p className="text-gray-500 text-sm">Ми зв'яжемось з вами найближчим часом.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-200 p-8 space-y-4">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Напишіть нам</h2>
      <input
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Ваше ім'я"
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 transition-colors"
      />
      <input
        required
        type="tel"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        placeholder="Телефон або Email"
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 transition-colors"
      />
      <textarea
        required
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="Опишіть ваше запитання або вкажіть модель авто та потрібну деталь"
        rows={5}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 transition-colors resize-none"
      />
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors"
      >
        <Send className="w-4 h-4" />
        Надіслати
      </button>
    </form>
  );
}
