"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer, useReducedMotion } from "@/lib/studio/hooks";

/**
 * Physics-based pointer. A dot tracks the raw position, the ring trails it
 * with a lerp. Elements opt into a state with `data-cursor`:
 *
 *   data-cursor="hover"            → ring grows
 *   data-cursor="label:VIEW"       → ring grows and captions itself
 *
 * Never mounted for coarse pointers, and skipped entirely under
 * `prefers-reduced-motion`.
 */
export default function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && reduced === false;

  const root = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!enabled) return;
    const el = root.current;
    const ringEl = ring.current;
    const dotEl = dot.current;
    if (!el || !ringEl || !dotEl) return;

    document.documentElement.classList.add("studio-has-cursor");

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { ...pointer };
    let visible = false;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
        eased.x = pointer.x;
        eased.y = pointer.y;
      }
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.(
        "[data-cursor],a,button,input,textarea,select,[role='button']"
      ) as HTMLElement | null;

      if (!target) {
        el.dataset.state = "";
        setLabel("");
        return;
      }

      const raw = target.dataset.cursor;
      if (raw?.startsWith("label:")) {
        el.dataset.state = "label";
        setLabel(raw.slice(6));
        return;
      }
      el.dataset.state = "hover";
      setLabel("");
    };

    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    const tick = () => {
      eased.x += (pointer.x - eased.x) * 0.16;
      eased.y += (pointer.y - eased.y) * 0.16;
      ringEl.style.transform = `translate3d(${eased.x}px, ${eased.y}px, 0)`;
      dotEl.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("studio-has-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={root} className="studio-cursor" aria-hidden style={{ opacity: 0 }}>
      <div ref={ring} style={{ position: "fixed", top: 0, left: 0 }}>
        <div className="studio-cursor__ring">
          <span className="studio-cursor__label">{label}</span>
        </div>
      </div>
      <div ref={dot} style={{ position: "fixed", top: 0, left: 0 }}>
        <div className="studio-cursor__dot" />
      </div>
    </div>
  );
}
