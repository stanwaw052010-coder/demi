"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PhotoSlot } from "@/components/shared/PhotoSlot";

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-navy-950 sm:min-h-[100svh]">
      <PhotoSlot
        category="spa"
        index={1}
        alt="SPA-капсула Neoqi Medic у салоні Спабель"
        label="Спа-капсула — фото 1"
        className="absolute inset-0"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/20 to-transparent" />

      <div className="container-lux section-x relative z-10 flex w-full flex-col gap-8 pb-20 pt-40 sm:pb-28">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs sm:text-sm tracking-[0.4em] uppercase text-gold-400"
        >
          Салон краси та SPA · Запоріжжя
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl text-4xl font-medium leading-[1.1] text-white sm:text-5xl lg:text-6xl"
        >
          Краса починається там, де про вас дійсно піклуються
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl text-balance text-base leading-relaxed text-white/75 sm:text-lg"
        >
          Спабель — салон повного циклу: SPA-капсула Neoqi Medic, косметологія,
          перукарня та нігтьовий сервіс в атмосфері спокою й преміального сервісу.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-4 pt-2"
        >
          <Button variant="gold" size="lg" asChild>
            <Link href="#booking">Записатися онлайн</Link>
          </Button>
          <Button variant="outline-light" size="lg" asChild>
            <Link href="/services">Переглянути послуги</Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Гортайте</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
