"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";

type CursorMode = "default" | "text" | "hide";

/**
 * Custom cursor: an ink dot in blend-difference, a champagne aura
 * that trails behind, and a disc that blooms open with a verb
 * ("View", "Drag"…) over elements marked with data-cursor-text.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const { onScroll } = useApp();
  const dotRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const mode = useRef<CursorMode>("default");

  useEffect(() => {
    if (!fine || reduced) return;
    // note: a different attribute than data-cursor — [data-cursor] is the
    // hover-target selector and must never match <html> itself
    document.documentElement.dataset.customCursor = "on";

    const dot = dotRef.current!;
    const aura = auraRef.current!;
    const disc = discRef.current!;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.18, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.18, ease: "power3.out" });
    const auraX = gsap.quickTo(aura, "x", { duration: 0.85, ease: "power3.out" });
    const auraY = gsap.quickTo(aura, "y", { duration: 0.85, ease: "power3.out" });
    const discX = gsap.quickTo(disc, "x", { duration: 0.32, ease: "power3.out" });
    const discY = gsap.quickTo(disc, "y", { duration: 0.32, ease: "power3.out" });

    const setMode = (next: CursorMode, text = "") => {
      if (mode.current === next && !text) return;
      mode.current = next;
      setLabel(text);
      gsap.to(dot, {
        scale: next === "default" ? 1 : 0,
        opacity: next === "hide" ? 0 : 1,
        duration: 0.35,
      });
      gsap.to(disc, {
        scale: next === "text" ? 1 : 0,
        duration: 0.5,
        ease: next === "text" ? "back.out(1.6)" : "power3.out",
      });
    };

    const last = { x: -100, y: -100 };
    const onMove = (e: MouseEvent) => {
      last.x = e.clientX;
      last.y = e.clientY;
      dotX(e.clientX);
      dotY(e.clientY);
      auraX(e.clientX);
      auraY(e.clientY);
      discX(e.clientX);
      discY(e.clientY);
    };

    const applyTarget = (el: Element | null) => {
      const target = el?.closest<HTMLElement>("[data-cursor]");
      if (!target) return setMode("default");
      const kind = target.dataset.cursor;
      if (kind === "hide") return setMode("hide");
      setMode("text", target.dataset.cursorText ?? "View");
    };

    const onOver = (e: MouseEvent) => applyTarget(e.target as HTMLElement);

    // the page moves under a still pointer — keep the verb honest
    const offScroll = onScroll(() => {
      if (last.x < 0) return;
      applyTarget(document.elementFromPoint(last.x, last.y));
    });

    const onDown = () => {
      if (mode.current === "default") gsap.to(dot, { scale: 0.55, duration: 0.25 });
      if (mode.current === "text") gsap.to(disc, { scale: 0.85, duration: 0.25 });
    };
    const onUp = () => {
      if (mode.current === "default") gsap.to(dot, { scale: 1, duration: 0.4 });
      if (mode.current === "text") gsap.to(disc, { scale: 1, duration: 0.4, ease: "back.out(2)" });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      delete document.documentElement.dataset.customCursor;
      offScroll();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [fine, reduced, onScroll]);

  if (!fine || reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      {/* trailing champagne glow */}
      <div
        ref={auraRef}
        className="absolute -top-[110px] -left-[110px] h-[220px] w-[220px] rounded-full opacity-70 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(216,191,154,0.16) 0%, rgba(216,191,154,0.05) 40%, transparent 68%)",
        }}
      />
      {/* ink dot */}
      <div
        ref={dotRef}
        className="absolute -top-[5px] -left-[5px] h-[10px] w-[10px] rounded-full bg-ivory mix-blend-difference"
      />
      {/* blooming verb disc */}
      <div
        ref={discRef}
        className="absolute -top-[44px] -left-[44px] flex h-[88px] w-[88px] scale-0 items-center justify-center rounded-full bg-ivory/95 backdrop-blur-sm"
      >
        <span className="font-mono text-[10px] tracking-[0.28em] text-ink uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}
