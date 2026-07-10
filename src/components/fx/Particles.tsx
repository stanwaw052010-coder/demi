"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks";

interface Mote {
  x: number;
  y: number;
  r: number;
  vy: number;
  sway: number;
  phase: number;
  alpha: number;
  pulse: number;
}

/** Slow golden dust drifting upward — canvas, GPU-friendly, pauses off-screen. */
export function Particles({ count = 60, className }: { count?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let visible = true;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let motes: Mote[] = [];

    const seed = (): Mote => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.7,
      vy: 0.00012 + Math.random() * 0.00035,
      sway: 6 + Math.random() * 22,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.12 + Math.random() * 0.4,
      pulse: 0.4 + Math.random() * 1.2,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    motes = Array.from({ length: count }, seed);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    let t = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      t += 1;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const m of motes) {
        m.y -= m.vy;
        if (m.y < -0.05) {
          m.y = 1.05;
          m.x = Math.random();
        }
        const x = m.x * w + Math.sin(t * 0.008 * m.pulse + m.phase) * m.sway;
        const y = m.y * h;
        const a = m.alpha * (0.55 + 0.45 * Math.sin(t * 0.015 * m.pulse + m.phase));
        ctx.beginPath();
        ctx.fillStyle = `rgba(224, 199, 158, ${a.toFixed(3)})`;
        ctx.arc(x, y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [count, reduced]);

  if (reduced) return null;
  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
