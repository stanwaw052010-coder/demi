import type { SVGProps } from "react";

export default function BotanicalLine(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 340"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M100 330 C 96 260 104 190 100 120 C 98 80 92 40 100 10" />
      <path d="M100 260 C 76 244 58 220 48 190 C 66 198 84 212 100 236" />
      <path d="M100 220 C 126 206 146 184 158 156 C 138 162 118 178 100 200" />
      <path d="M100 170 C 78 158 62 138 54 114 C 72 118 88 132 100 152" />
      <path d="M100 120 C 122 108 138 90 146 68 C 128 72 112 84 100 102" />
      <path d="M100 70 C 88 58 80 44 78 28 C 90 32 98 44 100 58" />
      <circle cx="100" cy="10" r="4" />
    </svg>
  );
}
