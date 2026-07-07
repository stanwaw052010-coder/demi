"use client";

import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { TESTIMONIALS } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="section-y section-x bg-navy-950" id="testimonials">
      <div className="container-lux flex flex-col gap-14">
        <SectionHeading
          kicker="Відгуки"
          title="Що кажуть наші гості"
          light
          description="Довіра гостей — головна цінність, яку ми плекаємо в кожній деталі сервісу."
        />

        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={24}
          slidesPerView={1.05}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: true }}
          breakpoints={{
            640: { slidesPerView: 1.6 },
            1024: { slidesPerView: 2.4 },
            1280: { slidesPerView: 3 },
          }}
          className="testimonials-swiper w-full min-w-0 !pb-12"
        >
          {TESTIMONIALS.map((testimonial) => (
            <SwiperSlide key={testimonial.name}>
              <div className="flex h-full flex-col gap-5 border border-white/10 bg-white/[0.03] p-8">
                <Quote className="h-6 w-6 text-gold-500" strokeWidth={1.5} />
                <p className="flex-1 text-sm leading-relaxed text-white/75">
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-base text-white">{testimonial.name}</span>
                  <span className="text-xs uppercase tracking-wider text-white/40">
                    {testimonial.service}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
