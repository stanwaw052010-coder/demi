"use client";

import { Minus, Phone, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { INSTAGRAM_URL, PHONE_HREF } from "@/lib/menu";
import { InstagramIcon } from "./icons";

export default function CartDrawer() {
  const { lines, isOpen, closeCart, setQty, removeItem, totalPrice } = useCart();

  const orderText =
    lines.length > 0
      ? `Замовлення ${lines
          .map((l) => `${l.item.title} x${l.qty}`)
          .join(", ")}. Разом: ${totalPrice} грн`
      : "";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60"
          onClick={closeCart}
          aria-hidden
        />
      )}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-charcoal-2 shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="flex items-center gap-2 font-display text-lg uppercase tracking-wide text-cream">
            <ShoppingCart className="h-5 w-5" />
            Ваше замовлення
          </h2>
          <button
            onClick={closeCart}
            aria-label="Закрити кошик"
            className="flex h-9 w-9 items-center justify-center rounded-full text-cream-soft hover:text-cream"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <p className="mt-10 text-center text-sm text-cream-soft">
              Кошик порожній. Додайте страви з меню.
            </p>
          ) : (
            <ul className="space-y-5">
              {lines.map(({ item, qty }) => (
                <li key={item.id} className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-cream">{item.title}</p>
                    <p className="text-sm text-cream-soft">{item.price} грн</p>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        onClick={() => setQty(item.id, qty - 1)}
                        aria-label="Зменшити кількість"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-charcoal text-cream hover:bg-red"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-5 text-center text-sm">{qty}</span>
                      <button
                        onClick={() => setQty(item.id, qty + 1)}
                        aria-label="Збільшити кількість"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-charcoal text-cream hover:bg-red"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-semibold text-cream">{item.price * qty} грн</p>
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label="Видалити"
                      className="text-cream-soft hover:text-red"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-cream-soft">Разом</span>
              <span className="font-display text-2xl text-cream">{totalPrice} грн</span>
            </div>
            <div className="space-y-3">
              <a
                href={`${PHONE_HREF}`}
                className="flex items-center justify-center gap-2 rounded-full bg-red px-6 py-3.5 text-sm font-semibold text-cream hover:bg-red-dark"
              >
                <Phone className="h-4 w-4" />
                Замовити по телефону
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-cream hover:border-red hover:text-red"
              >
                <InstagramIcon className="h-4 w-4" />
                Написати в Instagram
              </a>
            </div>
            {orderText && (
              <p className="mt-4 text-xs leading-relaxed text-cream-soft">
                Повідомте цей склад замовлення менеджеру: «{orderText}»
              </p>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
