"use client";

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import { toast } from "sonner";

interface WishlistContextValue {
  wishlist: string[];
  ids: string[];
  toggle: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  count: number;
}

type WishlistAction = { type: "LOAD"; ids: string[] } | { type: "TOGGLE"; id: string };

function wishlistReducer(state: string[], action: WishlistAction): string[] {
  switch (action.type) {
    case "LOAD":
      return action.ids;
    case "TOGGLE":
      return state.includes(action.id)
        ? state.filter((x) => x !== action.id)
        : [...state, action.id];
    default:
      return state;
  }
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("wishlist");
      if (stored) dispatch({ type: "LOAD", ids: JSON.parse(stored) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggle = (id: string) => {
    const isAdding = !wishlist.includes(id);
    dispatch({ type: "TOGGLE", id });
    toast(isAdding ? "Додано в обране" : "Видалено з обраного");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        ids: wishlist,
        toggle,
        isWishlisted: (id) => wishlist.includes(id),
        count: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be inside WishlistProvider");
  return ctx;
}
