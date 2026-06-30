"use client";

import { motion } from "framer-motion";

const PETAL_ANGLES = [0, 72, 144, 216, 288];
const PETAL_D = "M100,100 C76,80 68,52 100,34 C132,52 124,80 100,100Z";

export default function VioletFlower({ size = 300 }: { size?: number }) {
  return (
    <motion.div
      className="select-none pointer-events-none"
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        viewBox="0 0 200 215"
        width={size}
        height={Math.round(size * 1.075)}
        style={{
          filter:
            "drop-shadow(0 8px 32px rgba(109,40,217,0.32)) drop-shadow(0 0 60px rgba(167,139,250,0.18))",
        }}
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="fialka-petal" cx="50%" cy="18%" r="82%">
            <stop offset="0%" stopColor="#F5F3FF" />
            <stop offset="25%" stopColor="#DDD6FE" />
            <stop offset="65%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#4C1D95" />
          </radialGradient>

          <radialGradient id="fialka-center" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="50%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#B45309" />
          </radialGradient>

          <radialGradient id="fialka-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="fialka-leaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
        </defs>

        {/* Ambient glow */}
        <motion.circle
          cx="100"
          cy="100"
          r="68"
          fill="url(#fialka-glow)"
          animate={{ r: [68, 78, 68] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Stem */}
        <path
          d="M100,118 Q97,142 94,162"
          stroke="url(#fialka-leaf)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Left leaf */}
        <motion.ellipse
          cx="82"
          cy="150"
          rx="19"
          ry="8"
          fill="url(#fialka-leaf)"
          opacity="0.9"
          style={{ transformOrigin: "96px 146px" }}
          animate={{ rotate: [-35, -31, -38, -35] }}
          initial={{ rotate: -35 }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Right leaf */}
        <motion.ellipse
          cx="118"
          cy="146"
          rx="19"
          ry="8"
          fill="url(#fialka-leaf)"
          opacity="0.9"
          style={{ transformOrigin: "104px 142px" }}
          animate={{ rotate: [30, 26, 33, 30] }}
          initial={{ rotate: 30 }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Shadow petals for depth */}
        {PETAL_ANGLES.map((angle, i) => (
          <path
            key={`pb${i}`}
            d={PETAL_D}
            fill="#4C1D95"
            opacity="0.12"
            transform={`rotate(${angle + 36}, 100, 100) scale(1.1)`}
            style={{ transformOrigin: "100px 100px" }}
          />
        ))}

        {/* Main petals */}
        {PETAL_ANGLES.map((angle, i) => (
          <motion.path
            key={`p${i}`}
            d={PETAL_D}
            fill="url(#fialka-petal)"
            transform={`rotate(${angle}, 100, 100)`}
            animate={{ opacity: [0.82, 1, 0.88, 0.82] }}
            transition={{
              duration: 2.8,
              delay: i * 0.18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Petal veins */}
        {PETAL_ANGLES.map((angle, i) => (
          <motion.line
            key={`v${i}`}
            x1="100"
            y1="97"
            x2="100"
            y2="46"
            stroke="#4C1D95"
            strokeWidth="0.7"
            strokeOpacity="0.28"
            transform={`rotate(${angle}, 100, 100)`}
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            transition={{
              duration: 2.8,
              delay: i * 0.18,
              repeat: Infinity,
            }}
          />
        ))}

        {/* Center */}
        <motion.circle
          cx="100"
          cy="100"
          r="17"
          fill="url(#fialka-center)"
          style={{ transformOrigin: "100px 100px" }}
          animate={{ scale: [1, 1.09, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Stamen dots */}
        {[
          { cx: 95.5, cy: 97 },
          { cx: 104.5, cy: 97 },
          { cx: 100, cy: 105 },
        ].map((p, i) => (
          <motion.circle
            key={`s${i}`}
            cx={p.cx}
            cy={p.cy}
            r="2.8"
            fill="#6D28D9"
            style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
            animate={{ opacity: [0.5, 0.85, 0.5], scale: [0.9, 1.2, 0.9] }}
            transition={{ duration: 2, delay: i * 0.35, repeat: Infinity }}
          />
        ))}

        {/* Sparkles */}
        {[
          { cx: 42, cy: 48, d: 0.1 },
          { cx: 160, cy: 54, d: 0.55 },
          { cx: 168, cy: 128, d: 1.1 },
          { cx: 36, cy: 122, d: 1.65 },
          { cx: 108, cy: 26, d: 0.85 },
          { cx: 55, cy: 158, d: 2.1 },
        ].map(({ cx, cy, d }, i) => (
          <motion.g key={`sp${i}`}>
            <motion.circle
              cx={cx}
              cy={cy}
              r="3"
              fill="#C4B5FD"
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              animate={{ opacity: [0, 0.95, 0], scale: [0, 1.3, 0] }}
              transition={{ duration: 2.2, delay: d, repeat: Infinity }}
            />
            <motion.line
              x1={cx - 6}
              y1={cy}
              x2={cx + 6}
              y2={cy}
              stroke="#A78BFA"
              strokeWidth="1"
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 2.2, delay: d + 0.1, repeat: Infinity }}
            />
            <motion.line
              x1={cx}
              y1={cy - 6}
              x2={cx}
              y2={cy + 6}
              stroke="#A78BFA"
              strokeWidth="1"
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 2.2, delay: d + 0.1, repeat: Infinity }}
            />
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}
