import type { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.1" cy="6.9" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TiktokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M14.5 3.5c.4 2.2 1.8 3.7 4.3 3.9v2.9c-1.6.1-3-.4-4.3-1.3v6.1c0 3.1-2.5 5.4-5.5 5.2-2.7-.2-4.8-2.4-4.8-5.1 0-2.9 2.4-5.2 5.3-5.1.3 0 .6.1.9.1v3c-.3-.1-.6-.2-.9-.2-1.3 0-2.4 1.1-2.3 2.4.1 1.2 1.1 2.1 2.3 2.1 1.3 0 2.4-1 2.4-2.4V3.5h2.6Z"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6.4 17.7 4.5 20l2.3-.6a8 8 0 1 0-3.1-6.3 7.9 7.9 0 0 0 1 3.9Z" />
      <path d="M9.2 9.4c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .6.4.2.5.6 1.6.7 1.7.1.1.1.3 0 .5-.1.2-.2.3-.4.5-.2.2-.4.3-.2.6.2.4.9 1.3 1.9 2.1 1.3 1 2 1.2 2.3 1.1.2-.1.5-.5.7-.8.2-.2.4-.3.6-.2l1.6.8c.2.1.4.2.4.4 0 .5-.5 1.3-1 1.6-.7.4-1.4.6-2.5.2-1.5-.5-3.1-1.5-4.4-2.9-1.1-1.1-1.8-2.2-2.2-3.2-.3-.8-.2-1.6.1-2.3Z" />
    </svg>
  );
}

export function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="m7.5 12.1 3 1.9 5.2-5.5-6.1 5.1-.1 2.7-1.5-2.2Z" />
    </svg>
  );
}
