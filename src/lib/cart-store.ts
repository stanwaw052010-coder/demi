"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { VatRate } from "./vat";

export interface CartLine {
  /** Stable identity of a line: sku plus any vault term. */
  id: string;
  slug: string;
  sku: string;
  name: string;
  grams: number;
  /** Unit price in cents, VAT included. */
  price: number;
  vat: VatRate;
  liquor: string;
  quantity: number;
  /** Years of Puerh Vault storage bought with this line, if any. */
  vaultYears?: number;
  /** Storage fee in cents for the whole term, per unit. */
  vaultFee?: number;
}

export interface Promo {
  code: string;
  /** Percentage off the goods subtotal. */
  percent: number;
}

/** Codes accepted in this installation. A real shop would look these up. */
const PROMOS: Record<string, Promo> = {
  GAIWAN10: { code: "GAIWAN10", percent: 10 },
  EERSTEKOP: { code: "EERSTEKOP", percent: 5 },
};

interface CartState {
  lines: CartLine[];
  promo: Promo | null;
  isOpen: boolean;
  /** Bumped on every add, so the cart button can spring exactly once. */
  pulse: number;
  hydrated: boolean;
  add: (line: Omit<CartLine, "id" | "quantity">, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
  open: () => void;
  close: () => void;
}

const lineId = (sku: string, vaultYears?: number) =>
  vaultYears ? `${sku}--vault${vaultYears}` : sku;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      promo: null,
      isOpen: false,
      pulse: 0,
      hydrated: false,

      add: (line, quantity = 1) => {
        const id = lineId(line.sku, line.vaultYears);
        const lines = [...get().lines];
        const existing = lines.findIndex((l) => l.id === id);
        if (existing >= 0) {
          const current = lines[existing];
          lines[existing] = { ...current, quantity: current.quantity + quantity };
        } else {
          lines.push({ ...line, id, quantity });
        }
        set({ lines, pulse: get().pulse + 1 });
      },

      setQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set({ lines: get().lines.filter((l) => l.id !== id) });
          return;
        }
        set({
          lines: get().lines.map((l) => (l.id === id ? { ...l, quantity } : l)),
        });
      },

      remove: (id) => set({ lines: get().lines.filter((l) => l.id !== id) }),

      clear: () => set({ lines: [], promo: null }),

      applyPromo: (code) => {
        const found = PROMOS[code.trim().toUpperCase()];
        if (!found) return false;
        set({ promo: found });
        return true;
      },

      clearPromo: () => set({ promo: null }),

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: "wy-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lines: state.lines, promo: state.promo }),
    },
  ),
);

/**
 * Components must not render cart contents until the persisted state has been
 * read back, or the server HTML and the first client paint disagree and the
 * counter flashes. `hydrated` gates that.
 */
if (typeof window !== "undefined") {
  const finish = () => useCart.setState({ hydrated: true });
  if (useCart.persist.hasHydrated()) finish();
  useCart.persist.onFinishHydration(finish);
}

// ─── Derived values ──────────────────────────────────────────────────────────

export function lineTotal(line: CartLine): number {
  return (line.price + (line.vaultFee ?? 0)) * line.quantity;
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((a, l) => a + l.quantity, 0);
}

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((a, l) => a + lineTotal(l), 0);
}

export function cartDiscount(lines: CartLine[], promo: Promo | null): number {
  if (!promo) return 0;
  return Math.round((cartSubtotal(lines) * promo.percent) / 100);
}
