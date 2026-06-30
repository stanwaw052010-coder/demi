"use client";

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import { toast } from "sonner";
import type { CartItem, CartState } from "./types";

type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; productId: string }
  | { type: "UPDATE_QTY"; productId: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "LOAD"; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  let items: CartItem[];
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.productId === action.item.productId);
      if (existing) {
        items = state.items.map((i) =>
          i.productId === action.item.productId
            ? { ...i, quantity: i.quantity + action.item.quantity }
            : i
        );
      } else {
        items = [...state.items, action.item];
      }
      break;
    }
    case "REMOVE":
      items = state.items.filter((i) => i.productId !== action.productId);
      break;
    case "UPDATE_QTY":
      items = state.items
        .map((i) => (i.productId === action.productId ? { ...i, quantity: action.quantity } : i))
        .filter((i) => i.quantity > 0);
      break;
    case "CLEAR":
      items = [];
      break;
    case "LOAD":
      items = action.items;
      break;
    default:
      return state;
  }
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);
  return { items, total, count };
}

const initial: CartState = { items: [], total: 0, count: 0 };

interface CartContextValue {
  cart: CartState;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initial);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) dispatch({ type: "LOAD", items: JSON.parse(stored) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart.items));
  }, [cart.items]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart: (item) => {
          dispatch({ type: "ADD", item });
          toast.success(`${item.name} додано в кошик`);
        },
        removeFromCart: (id) => {
          const item = cart.items.find((i) => i.productId === id);
          dispatch({ type: "REMOVE", productId: id });
          if (item) toast(`${item.name} видалено з кошика`);
        },
        updateQuantity: (id, qty) => dispatch({ type: "UPDATE_QTY", productId: id, quantity: qty }),
        clearCart: () => {
          dispatch({ type: "CLEAR" });
          toast("Кошик очищено");
        },
        isInCart: (id) => cart.items.some((i) => i.productId === id),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
