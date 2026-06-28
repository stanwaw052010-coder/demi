import type { Vehicle } from "./types";

export const vehicles: Vehicle[] = [
  {
    slug: "mercedes-sprinter",
    name: "Mercedes Sprinter",
    brand: "Mercedes-Benz",
    years: "1995 – 2024",
    engines: ["2.2 CDI", "2.7 CDI", "3.0 CDI", "2.0 CDI", "2.1 CDI"],
    image: "/vehicles/sprinter.png",
    color: "#1a1a2e",
    badge: "Топ продажів",
  },
  {
    slug: "mercedes-vito",
    name: "Mercedes Vito",
    brand: "Mercedes-Benz",
    years: "1996 – 2024",
    engines: ["2.2 CDI", "1.6 CDI", "2.0 CDI", "1.9 CDI"],
    image: "/vehicles/vito.png",
    color: "#16213e",
    badge: "Популярне",
  },
  {
    slug: "vw-crafter",
    name: "Volkswagen Crafter",
    brand: "Volkswagen",
    years: "2006 – 2024",
    engines: ["2.0 TDI", "2.5 TDI", "2.0 BiTDI"],
    image: "/vehicles/crafter.png",
    color: "#0f3460",
  },
  {
    slug: "mercedes-lt",
    name: "Mercedes LT",
    brand: "Mercedes-Benz",
    years: "1975 – 1996",
    engines: ["2.0", "2.3", "2.4 D", "2.9 D"],
    image: "/vehicles/lt.png",
    color: "#1a1a2e",
  },
];

export function getVehicle(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}
