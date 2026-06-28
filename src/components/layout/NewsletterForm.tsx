"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
  };

  if (sent) {
    return (
      <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
        <div>
          <div className="text-white text-xs font-semibold">Дякуємо!</div>
          <p className="text-xs text-gray-500">Ви підписані на новини та акції</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 rounded-xl p-4">
      <div className="text-white text-xs font-semibold mb-1">Новини та акції</div>
      <p className="text-xs text-gray-500 mb-3">Підпишіться на знижки</p>
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="flex-1 min-w-0 px-3 py-2 bg-white/8 border border-white/10 rounded-lg text-xs text-gray-300 placeholder-gray-600 outline-none focus:border-orange-500/50"
        />
        <button type="submit" className="p-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors">
          <Send className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
    </form>
  );
}
