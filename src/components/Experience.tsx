"use client";

import { useState } from "react";
import SmoothScroll from "@/lib/SmoothScroll";
import Preloader from "@/components/fx/Preloader";
import Cursor from "@/components/fx/Cursor";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Story from "@/components/sections/Story";
import Grounds from "@/components/sections/Grounds";
import Instrument from "@/components/sections/Instrument";
import Coaches from "@/components/sections/Coaches";
import Academy from "@/components/sections/Academy";
import Stats from "@/components/sections/Stats";
import Gallery from "@/components/sections/Gallery";
import Membership from "@/components/sections/Membership";
import Booking from "@/components/sections/Booking";
import Footer from "@/components/sections/Footer";

export default function Experience() {
  const [ready, setReady] = useState(false);

  return (
    <SmoothScroll>
      <div className="grain">
        <Preloader onDone={() => setReady(true)} />
        <Cursor />
        <Nav ready={ready} />
        <main>
          <Hero ready={ready} />
          <Manifesto />
          <Story />
          <Grounds />
          <Instrument />
          <Coaches />
          <Academy />
          <Stats />
          <Gallery />
          <Membership />
          <Booking />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
