"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { BookButton } from "@/components/booking/BookButton";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy-950">
      <Photo
        src="/images/hero/hero-1.jpg"
        alt="Спабель — SPA-салон краси у Запоріжжі"
        label="Спабель SPA"
        fill
        priority
        sizes="100vw"
        className="opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/20 to-transparent" />

      <div className="container-spa relative z-10 pt-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-gold-400"
        >
          SPA для тіла. Belle для душі.
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-2xl font-serif text-5xl leading-[1.1] text-white sm:text-6xl xl:text-7xl"
        >
          Краса починається там, де про вас&nbsp;дійсно піклуються
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg"
        >
          Салон повного циклу в Запоріжжі: косметологія, лазерна епіляція,
          перукарня, нігтьовий сервіс та SPA-капсула Neoqi Medic — в одному
          спокійному просторі.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <BookButton variant="gold" size="lg">
            Записатися на процедуру
          </BookButton>
          <Button asChild variant="outlineLight" size="lg">
            <Link href="/services">Всі послуги</Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/50"
      >
        <ChevronDown className="h-6 w-6 animate-float" />
      </motion.div>
    </section>
  );
}
