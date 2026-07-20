"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { messengers } from "./MessengerButtons";

export function FloatingMessengers() {
  const [open, setOpen] = useState(false);

  const items = [
    ...messengers,
    {
      key: "phone",
      label: "Подзвонити",
      href: site.links.tel,
      Icon: Phone,
      bg: "#b76e79",
      ring: "rgba(183,110,121,0.4)",
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {open && (
          <motion.ul
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } },
            }}
            className="flex flex-col items-end gap-3"
          >
            {items.map((m) => (
              <motion.li
                key={m.key}
                variants={{
                  hidden: { opacity: 0, y: 12, scale: 0.7 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ type: "spring", stiffness: 380, damping: 24 }}
                className="flex items-center gap-3"
              >
                <span className="rounded-full bg-ink/85 px-3 py-1.5 text-xs font-medium text-cream shadow-lg backdrop-blur">
                  {m.label}
                </span>
                <a
                  href={m.href}
                  target={m.key === "phone" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={m.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl transition-transform duration-200 hover:scale-110"
                  style={{ backgroundColor: m.bg, boxShadow: `0 10px 26px -8px ${m.ring}` }}
                >
                  <m.Icon className="h-6 w-6" />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Закрити" : "Написати нам"}
        aria-expanded={open}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-white shadow-2xl transition-transform duration-300 hover:scale-105"
        style={{ boxShadow: "0 18px 40px -12px rgba(140,74,90,0.6)" }}
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-rose/40" />
        )}
        <AnimatePresence mode="wait">
          <motion.span
            key={open ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            {open ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
