"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { PhotoSlot } from "@/components/shared/PhotoSlot";
import { SPECIALISTS } from "@/data/specialists";

export function Specialists() {
  return (
    <section className="section-y section-x bg-secondary/50" id="specialists">
      <div className="container-lux flex flex-col gap-14">
        <SectionHeading
          kicker="Команда"
          title="Наші спеціалісти"
          description="Досвідчені майстри, які постійно вдосконалюють свою майстерність для найвибагливіших запитів."
        />

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={24}
          slidesPerView={1.15}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            480: { slidesPerView: 1.4 },
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 4 },
          }}
          className="specialists-swiper w-full min-w-0 !pb-12"
        >
          {SPECIALISTS.map((specialist) => (
            <SwiperSlide key={specialist.name}>
              <div className="flex h-full flex-col border border-border bg-white">
                <PhotoSlot
                  category={specialist.photoCategory}
                  index={specialist.photoIndex}
                  alt={`${specialist.name} — ${specialist.role}`}
                  label={`${specialist.role} — фото`}
                  className="aspect-[3/4]"
                />
                <div className="flex flex-col gap-1.5 p-6">
                  <h3 className="font-serif text-lg text-navy-950">{specialist.name}</h3>
                  <span className="text-xs uppercase tracking-wider text-gold-600">
                    {specialist.role}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {specialist.bio}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
