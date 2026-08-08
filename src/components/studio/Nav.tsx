"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/studio/gsap";
import {
  useFinePointer,
  useIsoLayoutEffect,
  useReducedMotion,
} from "@/lib/studio/hooks";
import { lockScroll, scrollToSection, unlockScroll } from "@/lib/studio/scroll";
import { useIntro } from "@/lib/studio/intro";
import { NAV_ITEMS, STUDIO } from "@/lib/studio/content";

/**
 * Minimal bar, fullscreen menu. The bar carries the wordmark, the studio
 * status and a single control; everything else lives behind it.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const bar = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const { revealed } = useIntro();
  const reduced = useReducedMotion();
  const fine = useFinePointer();

  /* --- bar entrance, on the intro's cue --------------------------------- */
  useIsoLayoutEffect(() => {
    if (reduced === null) return;
    const el = bar.current;
    if (!el) return;
    if (reduced) {
      gsap.set(el.querySelectorAll(".nav-item"), { autoAlpha: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set(".nav-item", { autoAlpha: 0, y: -14 });
    }, bar);
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (!revealed || reduced === null) return;
    const el = bar.current;
    if (!el) return;
    gsap.to(el.querySelectorAll(".nav-item"), {
      autoAlpha: 1,
      y: 0,
      duration: reduced ? 0.01 : 1.1,
      stagger: reduced ? 0 : 0.09,
      delay: reduced ? 0 : 0.75,
      ease: "expo.out",
    });
  }, [revealed, reduced]);

  /* --- scroll read-out --------------------------------------------------- */
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progress.current) {
        progress.current.style.transform = `scaleX(${pct.toFixed(4)})`;
      }
      bar.current?.toggleAttribute("data-scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --- overlay ----------------------------------------------------------- */
  const close = useCallback(() => setOpen(false), []);

  useIsoLayoutEffect(() => {
    const el = overlay.current;
    if (!el || reduced === null) return;

    const items = el.querySelectorAll<HTMLElement>(".menu-line");
    const chrome = el.querySelectorAll<HTMLElement>(".menu-chrome");

    if (reduced) {
      gsap.set(el, { autoAlpha: open ? 1 : 0, clipPath: "none" });
      gsap.set([items, chrome], { autoAlpha: open ? 1 : 0, yPercent: 0 });
      return;
    }

    const tl = gsap.timeline();

    if (open) {
      tl.set(el, { pointerEvents: "auto", autoAlpha: 1 })
        .fromTo(
          el,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.05, ease: "expo.inOut" }
        )
        .fromTo(
          items,
          { yPercent: 110 },
          { yPercent: 0, duration: 1.05, stagger: 0.06, ease: "expo.out" },
          0.28
        )
        .fromTo(
          chrome,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06 },
          0.6
        );
    } else {
      tl.to(items, {
        yPercent: -110,
        duration: 0.62,
        stagger: 0.035,
        ease: "expo.in",
      })
        .to(chrome, { autoAlpha: 0, duration: 0.3 }, 0)
        .to(
          el,
          { clipPath: "inset(100% 0% 0% 0%)", duration: 0.85, ease: "expo.inOut" },
          0.2
        )
        .set(el, { pointerEvents: "none", autoAlpha: 0 });
    }

    return () => {
      tl.kill();
    };
  }, [open, reduced]);

  useEffect(() => {
    if (!open) return;
    const opener = trigger.current;
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const first = overlay.current?.querySelector<HTMLElement>("a, button");
    first?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
      opener?.focus({ preventScroll: true });
    };
  }, [open, close]);

  /* --- preview follows the pointer --------------------------------------- */
  useEffect(() => {
    if (!open || !fine || reduced !== false) return;
    const el = preview.current;
    if (!el) return;

    const target = { x: window.innerWidth * 0.72, y: window.innerHeight * 0.5 };
    const eased = { ...target };
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const tick = () => {
      eased.x += (target.x - eased.x) * 0.075;
      eased.y += (target.y - eased.y) * 0.075;
      el.style.transform = `translate3d(${eased.x}px, ${eased.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [open, fine, reduced]);

  const go = (id: string) => {
    close();
    window.setTimeout(() => scrollToSection(id), reduced ? 0 : 620);
  };

  return (
    <>
      <div className="nav-progress" aria-hidden>
        <span ref={progress} />
      </div>

      <header ref={bar} className="nav" aria-label="Studio">
        <a className="nav-item nav__mark" href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}>
          <span className="nav__mark-text">{STUDIO.mark}</span>
          <span className="nav__mark-text nav__mark-text--ghost" aria-hidden>
            {STUDIO.mark}
          </span>
        </a>

        <p className="nav-item nav__status meta meta--muted">{STUDIO.tagline}</p>

        <button
          ref={trigger}
          type="button"
          className="nav-item nav__toggle meta"
          aria-expanded={open}
          aria-controls="studio-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__toggle-label">{open ? "Close" : "Menu"}</span>
          <span className="nav__toggle-rules" aria-hidden data-open={open || undefined}>
            <i />
            <i />
          </span>
        </button>
      </header>

      <div
        ref={overlay}
        id="studio-menu"
        className="menu"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        style={{ opacity: 0, pointerEvents: "none" }}
      >
        <nav className="menu__list" aria-label="Sections">
          {NAV_ITEMS.map((item, i) => (
            <div className="menu__row" key={item.id}>
              <span className="menu__mask">
                <button
                  type="button"
                  className="menu-line menu__link"
                  data-cursor="hover"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => go(item.id)}
                >
                  <span className="menu__index meta num">{item.index}</span>
                  <span className="menu__label display">{item.label}</span>
                </button>
              </span>
            </div>
          ))}
        </nav>

        {fine ? (
          <div ref={preview} className="menu__preview" aria-hidden>
            {NAV_ITEMS.map((item, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={item.id}
                src={item.media.src}
                alt=""
                width={item.media.width}
                height={item.media.height}
                data-active={i === active || undefined}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        ) : null}

        <div className="menu__foot">
          <div className="menu-chrome">
            <p className="meta menu__foot-key">Studio</p>
            {STUDIO.address.map((line) => (
              <p key={line} className="menu__foot-value">
                {line}
              </p>
            ))}
          </div>
          <div className="menu-chrome">
            <p className="meta menu__foot-key">Contact</p>
            <a className="menu__foot-value u-line" href={`mailto:${STUDIO.email}`}>
              {STUDIO.email}
            </a>
            <a
              className="menu__foot-value u-line"
              href={STUDIO.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              {STUDIO.instagram}
            </a>
          </div>
          <div className="menu-chrome menu__foot-cta">
            <p className="meta menu__foot-key">Booking</p>
            <button type="button" className="menu__foot-value u-line" onClick={() => go("contact")}>
              Book an appointment ↗
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
