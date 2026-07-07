import { Bird } from "lucide-react";

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={
        "inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#ff8a65] via-[#ff6f91] to-[#a855f7] p-[2px] " +
        (className ?? "h-10 w-10")
      }
    >
      <span className="flex h-full w-full items-center justify-center rounded-full bg-white">
        <Bird className="h-[55%] w-[55%] text-[#0d3b3e]" strokeWidth={2} />
      </span>
    </span>
  );
}
