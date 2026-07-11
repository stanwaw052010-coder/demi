import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const site = {
  name: "GIN Barbershop",
  city: "Хмельницький",
  country: "Україна",
  phone: "+380687124247",
  phoneHref: "tel:+380687124247",
  phonePretty: "+38 (068) 712 42 47",
  bookingUrl: "https://n1425488.alteg.io/",
  instagram: "https://www.instagram.com/ginbarbershop_khm/",
  instagramHandle: "@ginbarbershop_khm",
  hours: "Щодня 10:00 – 20:00",
  address: "Хмельницький, Україна",
  mapsUrl:
    "https://www.google.com/maps/place/GIN+%7C%7C+Barbershop/@49.4373105,26.9803975,713m/data=!3m2!1e3!4b1!4m6!3m5!1s0x4732070057ca07f5:0xe04cac5c2ea3c6c6!8m2!3d49.437307!4d26.9829724!16s%2Fg%2F11z848zgfv",
  mapsEmbed:
    "https://www.google.com/maps?q=GIN+Barbershop+Khmelnytskyi&output=embed",
  url: "https://ginbarbershop.com.ua",
  lat: 49.437307,
  lng: 26.9829724,
};
