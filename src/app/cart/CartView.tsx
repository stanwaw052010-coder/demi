"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Shield, Phone } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function CartView() {
  const { cart: state, removeFromCart, updateQuantity, clearCart } = useCart();
  const [orderSent, setOrderSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", city: "", comment: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSent(true);
  };

  if (orderSent) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">✅</div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Замовлення прийнято!</h2>
        <p className="text-gray-500 mb-8">
          Наш менеджер зв'яжеться з вами найближчим часом для підтвердження замовлення.
        </p>
        <Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors">
          Продовжити покупки <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb items={[{ label: "Кошик" }]} />
        <div className="text-center py-24">
          <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-5" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Кошик порожній</h2>
          <p className="text-gray-500 mb-8">Додайте запчастини з каталогу</p>
          <Link href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors">
            До каталогу <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={[{ label: "Кошик" }]} />
      <h1 className="text-3xl font-extrabold text-gray-900 mt-6 mb-8">
        Кошик · {state.count} {state.count === 1 ? "товар" : "товари"}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <div key={item.productId} className="bg-white rounded-2xl border border-gray-200 p-5 flex gap-4">
              <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden relative shrink-0">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-3xl">🔧</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-400 mb-0.5">{item.brand} · {item.sku}</div>
                <div className="font-semibold text-gray-900 text-sm mb-3 leading-snug">{item.name}</div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                  </div>
                  <span className="text-lg font-black text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="ml-auto text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="text-sm text-gray-400 hover:text-red-400 transition-colors"
          >
            Очистити кошик
          </button>
        </div>

        {/* Summary + Form */}
        <div className="space-y-5">
          {/* Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Товари ({state.count})</span>
              <span className="text-sm font-semibold">{formatPrice(state.total)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-sm text-gray-500">Доставка</span>
              <span className="text-sm text-green-600 font-semibold">Безкоштовно</span>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between">
              <span className="font-bold text-gray-900">Разом</span>
              <span className="text-2xl font-black text-gray-900">{formatPrice(state.total)}</span>
            </div>
          </div>

          {/* Order form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <h3 className="font-bold text-gray-900 mb-1">Оформлення замовлення</h3>
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
              placeholder="Телефон"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 transition-colors"
            />
            <input
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="Місто (Нова Пошта)"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 transition-colors"
            />
            <textarea
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              placeholder="Коментар до замовлення"
              rows={2}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors"
            >
              Оформити замовлення <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Trust */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5 text-sm text-gray-500">
              <Truck className="w-4 h-4 text-orange-500 shrink-0" />
              Доставка Новою Поштою 1–2 дні
            </div>
            <div className="flex items-center gap-2.5 text-sm text-gray-500">
              <Shield className="w-4 h-4 text-orange-500 shrink-0" />
              Гарантія на всі запчастини
            </div>
            <div className="flex items-center gap-2.5 text-sm text-gray-500">
              <Phone className="w-4 h-4 text-orange-500 shrink-0" />
              <a href="tel:+380672546266" className="hover:text-orange-500 transition-colors">
                +38 (067) 254-62-66
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
