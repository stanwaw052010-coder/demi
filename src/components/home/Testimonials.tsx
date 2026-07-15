"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  return (
    <section className="bg-navy-900 py-20 sm:py-28">
      <div className="container-spa">
        <SectionHeading eyebrow="Відгуки" title="Що кажуть наші гості" light align="center" />

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true, el: ".testimonials-pagination" }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          className="mt-14 !pb-14"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.name} className="h-auto">
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-8">
                <Quote className="h-6 w-6 text-gold-500" strokeWidth={1.5} />
                <p className="mt-5 flex-1 text-sm leading-relaxed text-white/75">{t.text}</p>
                <div className="mt-6 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <div className="mt-3">
                  <p className="font-serif text-base text-white">{t.name}</p>
                  <p className="text-xs uppercase tracking-widest text-white/40">{t.service}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="testimonials-pagination mt-2 flex justify-center gap-2" />
      </div>
    </section>
  );
}
