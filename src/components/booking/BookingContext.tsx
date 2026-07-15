"use client";

import * as React from "react";

interface BookingContextValue {
  isOpen: boolean;
  presetService: string | null;
  open: (serviceName?: string) => void;
  close: () => void;
}

const BookingContext = React.createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [presetService, setPresetService] = React.useState<string | null>(null);

  const open = React.useCallback((serviceName?: string) => {
    setPresetService(serviceName ?? null);
    setIsOpen(true);
  }, []);
  const close = React.useCallback(() => setIsOpen(false), []);

  return (
    <BookingContext.Provider value={{ isOpen, presetService, open, close }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = React.useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
