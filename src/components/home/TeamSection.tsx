"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { team } from "@/data/team";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TeamSection() {
  return (
    <section className="bg-navy-50 py-20 sm:py-28">
      <div className="container-spa">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading eyebrow="Команда" title="Спеціалісти Спабель" />
          <div className="hidden gap-2 sm:flex">
            <button className="team-prev flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/15 text-navy-900 transition-colors hover:border-gold-500 hover:text-gold-600">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="team-next flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/15 text-navy-900 transition-colors hover:border-gold-500 hover:text-gold-600">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: ".team-prev", nextEl: ".team-next" }}
          spaceBetween={24}
          slidesPerView={1.15}
          breakpoints={{
            480: { slidesPerView: 1.4 },
            640: { slidesPerView: 2.1 },
            1024: { slidesPerView: 3.2 },
            1440: { slidesPerView: 4 },
          }}
          className="mt-14 !overflow-visible"
        >
          {team.map((member) => (
            <SwiperSlide key={member.slug}>
              <div className="group overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="relative h-80 overflow-hidden">
                  <Photo
                    src={member.photo}
                    alt={member.name}
                    label={member.role}
                    fill
                    sizes="(min-width: 1024px) 25vw, 60vw"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg text-navy-900">{member.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-widest text-gold-600">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-900/60">{member.bio}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
