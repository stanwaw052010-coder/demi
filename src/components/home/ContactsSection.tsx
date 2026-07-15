"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { siteConfig, mapsEmbedSrc } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ContactsSection() {
  return (
    <section className="bg-navy-50 py-20 sm:py-28">
      <div className="container-spa">
        <SectionHeading eyebrow="Контакти" title="Як нас знайти" />

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="h-full rounded-2xl bg-white p-8 shadow-sm">
              <ul className="space-y-6 text-sm">
                <li className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                  <div>
                    <p className="font-medium text-navy-900">Адреса</p>
                    <p className="mt-1 text-navy-900/60">{siteConfig.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                  <div>
                    <p className="font-medium text-navy-900">Телефон</p>
                    <a href={siteConfig.phoneHref} className="mt-1 block text-navy-900/60 hover:text-gold-600">
                      {siteConfig.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                  <div>
                    <p className="font-medium text-navy-900">Email</p>
                    <a href={`mailto:${siteConfig.email}`} className="mt-1 block text-navy-900/60 hover:text-gold-600">
                      {siteConfig.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                  <div>
                    <p className="font-medium text-navy-900">Графік роботи</p>
                    {siteConfig.hours.map((h) => (
                      <p key={h.days} className="mt-1 text-navy-900/60">
                        {h.days}: {h.time}
                      </p>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-hidden rounded-2xl lg:col-span-3"
          >
            <iframe
              src={mapsEmbedSrc}
              title="Спабель на карті"
              className="h-80 w-full border-0 lg:h-full lg:min-h-[24rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
