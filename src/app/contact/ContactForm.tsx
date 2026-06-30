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
      <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-10 text-center">
        <div className="mb-4 text-5xl">✅</div>
        <h3 className="mb-2 text-xl font-bold text-gray-900">Повідомлення надіслано!</h3>
        <p className="text-sm text-gray-500">Ми зв&apos;яжемось з вами найближчим часом.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-gray-200 bg-white p-8"
    >
      <h2 className="mb-2 text-xl font-bold text-gray-900">Напишіть нам</h2>
      <input
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Ваше ім'я"
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition-colors outline-none focus:border-orange-400"
      />
      <input
        required
        type="tel"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        placeholder="Телефон або Email"
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition-colors outline-none focus:border-orange-400"
      />
      <textarea
        required
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="Опишіть ваше запитання або вкажіть модель авто та потрібну деталь"
        rows={5}
        className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm transition-colors outline-none focus:border-orange-400"
      />
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 font-bold text-white transition-colors hover:bg-orange-600"
      >
        <Send className="h-4 w-4" />
        Надіслати
      </button>
    </form>
  );
}
