"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn, site } from "@/lib/utils";
import Button from "@/components/ui/Button";

const links = [
  { label: "Головна", href: "/#top" },
  { label: "Послуги", href: "/#services" },
  { label: "Галерея", href: "/#gallery" },
  { label: "Барбери", href: "/#barbers" },
  { label: "Відгуки", href: "/#reviews" },
  { label: "Контакти", href: "/#contacts" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    if (y > prev && y > 260 && !open) setHidden(true);
    else setHidden(false);
  });

  return (
    <>
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background,border] duration-500",
          scrolled
            ? "glass border-b border-white/5"
            : "border-b border-transparent"
        )}
      >
        <nav className="container-lux flex h-[84px] items-center justify-between">
          <Link
            href="/#top"
            data-cursor="hover"
            className="group flex items-baseline gap-2"
            onClick={() => setOpen(false)}
          >
            <span className="font-display text-2xl font-extrabold tracking-tightest">
              GIN
            </span>
            <span className="hidden text-[0.6rem] tracking-[0.4em] text-muted transition-colors group-hover:text-gold sm:inline">
              BARBERSHOP
            </span>
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  data-cursor="hover"
                  className="link-underline text-sm text-muted-2 transition-colors hover:text-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button href={site.bookingUrl} external arrow className="px-6 py-3">
                Записатися
              </Button>
            </div>
            <button
              aria-label="Меню"
              data-cursor="hover"
              onClick={() => setOpen((o) => !o)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-fg transition-colors hover:border-gold/50 lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex flex-col bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mt-[84px] flex flex-1 flex-col justify-center gap-1 px-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/5 py-4 font-display text-4xl font-bold tracking-tight text-fg/90 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-10"
              >
                <Button
                  href={site.bookingUrl}
                  external
                  magnetic={false}
                  className="w-full justify-center py-4"
                  onClick={() => setOpen(false)}
                >
                  Онлайн-запис
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
