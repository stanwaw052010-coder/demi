"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: "15",
    suffix: "+",
    label: "Років досвіду",
    description: "Стабільна робота на ринку з 2009 року",
  },
  {
    value: "100",
    suffix: "к+",
    label: "Позицій у наявності",
    description: "Оригінальні та аналогові запчастини",
  },
  {
    value: "50",
    suffix: "к+",
    label: "Задоволених клієнтів",
    description: "Тисячі постійних покупців по Україні",
  },
  {
    value: "50",
    suffix: "+",
    label: "Брендів у каталозі",
    description: "Провідні виробники автозапчастин",
  },
];

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="py-16 lg:py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-gray-100">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center px-4 lg:px-8 animate-on-scroll`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-2">
                <span className="text-gradient">
                  <CountUp
                    end={parseInt(stat.value)}
                    suffix={stat.suffix}
                  />
                </span>
              </div>
              <div className="text-base sm:text-lg font-bold text-gray-800 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-500 leading-snug hidden sm:block">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
