import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUAH(value: number) {
  return new Intl.NumberFormat("uk-UA").format(value) + " ₴";
}
