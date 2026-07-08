"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Глобальний провайдер анімацій:
 *  – Lenis smooth scrolling, синхронізований із GSAP ScrollTrigger
 *  – reveal-анімації для елементів із [data-reveal]
 *  – parallax для елементів із [data-parallax]
 *  – плавний скрол до якорів
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Плавний перехід до якорів
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -84, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      // Reveal-анімації
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const type = el.dataset.reveal || "up";
        const delay = parseFloat(el.dataset.revealDelay || "0");
        const vars: gsap.TweenVars = {
          opacity: 0,
          duration: 1.15,
          ease: "power3.out",
          delay,
        };
        if (type === "up") vars.y = 56;
        if (type === "left") vars.x = -56;
        if (type === "right") vars.x = 56;
        if (type === "scale") {
          vars.scale = 0.92;
          vars.y = 30;
        }
        if (type === "blur") {
          vars.filter = "blur(14px)";
          vars.y = 26;
        }
        gsap.from(el, {
          ...vars,
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });

      // Parallax: data-parallax="-10" → yPercent від -10 до 10
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || "-8");
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      });
    });

    return () => {
      document.removeEventListener("click", onClick);
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
