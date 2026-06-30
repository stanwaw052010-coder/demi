"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Shield, Phone } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mb-6 text-6xl">✅</div>
        <h2 className="mb-3 text-2xl font-extrabold text-gray-900">Замовлення прийнято!</h2>
        <p className="mb-8 text-gray-500">
          Наш менеджер зв&apos;яжеться з вами найближчим часом для підтвердження замовлення.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition-colors hover:bg-orange-600"
        >
          Продовжити покупки <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "Кошик" }]} />
        <div className="py-24 text-center">
          <ShoppingBag className="mx-auto mb-5 h-16 w-16 text-gray-200" />
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Кошик порожній</h2>
          <p className="mb-8 text-gray-500">Додайте запчастини з каталогу</p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition-colors hover:bg-orange-600"
          >
            До каталогу <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "Кошик" }]} />
      <h1 className="mt-6 mb-8 text-3xl font-extrabold text-gray-900">
        Кошик · {state.count} {state.count === 1 ? "товар" : "товари"}
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart items */}
        <div className="space-y-4 lg:col-span-2">
          {state.items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-3xl">
                    🔧
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 text-xs text-gray-400">
                  {item.brand} · {item.sku}
                </div>
                <div className="mb-3 text-sm leading-snug font-semibold text-gray-900">
                  {item.name}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-gray-50"
                    >
                      <Minus className="h-3.5 w-3.5 text-gray-600" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-gray-50"
                    >
                      <Plus className="h-3.5 w-3.5 text-gray-600" />
                    </button>
                  </div>
                  <span className="text-lg font-black text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="ml-auto text-gray-300 transition-colors hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-sm text-gray-400 transition-colors hover:text-red-400">
                Очистити кошик
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Очистити кошик?</DialogTitle>
                <DialogDescription>
                  Всі {state.count}{" "}
                  {state.count === 1 ? "товар буде видалено" : "товари будуть видалені"} з кошика.
                  Цю дію не можна скасувати.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <button className="px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900">
                    Скасувати
                  </button>
                </DialogClose>
                <DialogClose asChild>
                  <button
                    onClick={clearCart}
                    className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-600"
                  >
                    Очистити
                  </button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary + Form */}
        <div className="space-y-5">
          {/* Summary */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="mb-2 flex justify-between">
              <span className="text-sm text-gray-500">Товари ({state.count})</span>
              <span className="text-sm font-semibold">{formatPrice(state.total)}</span>
            </div>
            <div className="mb-4 flex justify-between">
              <span className="text-sm text-gray-500">Доставка</span>
              <span className="text-sm font-semibold text-green-600">Безкоштовно</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-4">
              <span className="font-bold text-gray-900">Разом</span>
              <span className="text-2xl font-black text-gray-900">{formatPrice(state.total)}</span>
            </div>
          </div>

          {/* Order form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6"
          >
            <h3 className="mb-1 font-bold text-gray-900">Оформлення замовлення</h3>
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
              placeholder="Телефон"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition-colors outline-none focus:border-orange-400"
            />
            <input
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="Місто (Нова Пошта)"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition-colors outline-none focus:border-orange-400"
            />
            <textarea
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              placeholder="Коментар до замовлення"
              rows={2}
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm transition-colors outline-none focus:border-orange-400"
            />
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 font-bold text-white transition-colors hover:bg-orange-600"
            >
              Оформити замовлення <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Trust */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2.5 text-sm text-gray-500">
              <Truck className="h-4 w-4 shrink-0 text-orange-500" />
              Доставка Новою Поштою 1–2 дні
            </div>
            <div className="flex items-center gap-2.5 text-sm text-gray-500">
              <Shield className="h-4 w-4 shrink-0 text-orange-500" />
              Гарантія на всі запчастини
            </div>
            <div className="flex items-center gap-2.5 text-sm text-gray-500">
              <Phone className="h-4 w-4 shrink-0 text-orange-500" />
              <a href="tel:+380672546266" className="transition-colors hover:text-orange-500">
                +38 (067) 254-62-66
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
