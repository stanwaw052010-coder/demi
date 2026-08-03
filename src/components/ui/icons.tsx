import * as React from "react";

/** Brand glyphs are not part of the icon set, so the mark is drawn inline. */
export function InstagramIcon({
  className,
  strokeWidth = 1.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Viber is the messenger patients here actually use. */
export function ViberIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2c-2.5 0-5.2.35-6.6 1.63C4.06 4.79 3.5 6.9 3.5 9.72c0 2.83.56 4.94 1.94 6.1.5.42 1.16.73 1.9.95v3.02c0 .5.6.75.95.4l2.1-2.13c.55.03 1.1.05 1.65.05 2.5 0 5.2-.35 6.6-1.63 1.38-1.16 1.94-3.27 1.94-6.09 0-2.83-.56-4.94-1.94-6.1C17.24 2.35 14.54 2 12.04 2Zm0 1.6c2.3 0 4.72.33 5.7 1.2.9.76 1.37 2.4 1.37 4.92s-.47 4.16-1.37 4.92c-.98.87-3.4 1.2-5.7 1.2-.6 0-1.2-.02-1.78-.07a.8.8 0 0 0-.64.24l-1.36 1.38v-1.85a.8.8 0 0 0-.6-.78c-.75-.19-1.3-.44-1.68-.76-.9-.76-1.37-2.4-1.37-4.92s.47-4.16 1.37-4.92c.98-.87 3.4-1.2 5.7-1.2Zm-2.3 2.6a.9.9 0 0 0-.62.23l-.75.7c-.6.57-.5 1.5-.06 2.3.6 1.1 1.4 2.1 2.36 2.94.86.75 1.83 1.35 2.87 1.7.8.27 1.6.15 2.05-.44l.5-.66c.3-.4.23-.96-.17-1.25l-1.35-.98a.9.9 0 0 0-1.2.13l-.36.42a5.9 5.9 0 0 1-1.4-1.03 5.9 5.9 0 0 1-1.06-1.4l.42-.35a.9.9 0 0 0 .16-1.18l-.9-1.35a.9.9 0 0 0-.5-.37.9.9 0 0 0-.2-.02Zm2.6.35a.6.6 0 0 0 .05 1.2 2.6 2.6 0 0 1 2.44 2.5.6.6 0 1 0 1.2-.06 3.8 3.8 0 0 0-3.6-3.64h-.09Zm.08 1.9a.6.6 0 0 0-.05 1.2c.4.03.66.3.7.7a.6.6 0 0 0 1.2-.1 1.9 1.9 0 0 0-1.8-1.8h-.05Z" />
    </svg>
  );
}
