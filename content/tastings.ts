import type { I18nText } from "./types";

export interface TastingSession {
  id: string;
  city: "gent" | "kortrijk" | "brussel";
  venue: string;
  address: string;
  date: string;
  startTime: string;
  durationMinutes: number;
  seats: number;
  seatsLeft: number;
  /** Price per seat in euro cents, VAT included. */
  price: number;
  title: I18nText;
  description: I18nText;
}

/**
 * Live tastings in Belgium. Nobody else in this market sells a seat on their
 * own site, which is the whole point of the page.
 */
export const tastings: TastingSession[] = [
  {
    id: "gent-2026-09-19",
    city: "gent",
    venue: "Atelier Wells, Baudelostraat 24",
    address: "Baudelostraat 24, 9000 Gent",
    date: "2026-09-19",
    startTime: "19:30",
    durationMinutes: 120,
    seats: 10,
    seatsLeft: 4,
    price: 3500,
    title: { nl: "Gongfu voor wie nooit gongfu deed", en: "Gongfu for people who have never done gongfu" },
    description: {
      nl: "Twee uur, tien plaatsen, één gaiwan per persoon. Wij beginnen bij water en temperatuur, en eindigen bij een sheng van 2018 die u zelf zet. U hoeft niets mee te brengen en u hoeft niets te weten.",
      en: "Two hours, ten seats, one gaiwan each. We start at water and temperature and end at a 2018 sheng you brew yourself. You need bring nothing and know nothing.",
    },
  },
  {
    id: "kortrijk-2026-10-03",
    city: "kortrijk",
    venue: "De Kreun, Conservatoriumplein 1",
    address: "Conservatoriumplein 1, 8500 Kortrijk",
    date: "2026-10-03",
    startTime: "14:00",
    durationMinutes: 150,
    seats: 12,
    seatsLeft: 9,
    price: 4500,
    title: { nl: "Verticale proeverij: Yiwu 2018 tot 2023", en: "Vertical tasting: Yiwu 2018 to 2023" },
    description: {
      nl: "Vier jaargangen van dezelfde tuin in Mahei, naast elkaar, in dezelfde gaiwan gezet. Dit is de duidelijkste manier om te begrijpen wat ouderdom met sheng doet, en waarom de Vault bestaat.",
      en: "Four vintages from the same garden in Mahei, side by side, brewed in the same gaiwan. This is the clearest way to understand what age does to sheng, and why the Vault exists.",
    },
  },
  {
    id: "brussel-2026-10-17",
    city: "brussel",
    venue: "Maison Grand-Place, Rue du Marché aux Herbes 78",
    address: "Grasmarkt 78, 1000 Brussel",
    date: "2026-10-17",
    startTime: "19:00",
    durationMinutes: 120,
    seats: 14,
    seatsLeft: 14,
    price: 3500,
    title: { nl: "Yancha: waarom rotsthee naar rots smaakt", en: "Yancha: why rock tea tastes of rock" },
    description: {
      nl: "Drie Wuyi-oolongs uit dezelfde kloof, met verschillende roosters. Wij leggen uit wat yan yun is, en waarna u zelf mag beslissen of u het proeft of dat wij het verzinnen.",
      en: "Three Wuyi oolongs from the same gorge, with different roasts. We explain what yan yun is, after which you decide for yourself whether you taste it or we are making it up.",
    },
  },
  {
    id: "gent-2026-11-07",
    city: "gent",
    venue: "Atelier Wells, Baudelostraat 24",
    address: "Baudelostraat 24, 9000 Gent",
    date: "2026-11-07",
    startTime: "10:30",
    durationMinutes: 90,
    seats: 8,
    seatsLeft: 8,
    price: 3000,
    title: { nl: "Water, temperatuur en de rest van de helft", en: "Water, temperature and the other half" },
    description: {
      nl: "Dezelfde thee, vier soorten water, drie temperaturen. Een korte, nogal technische ochtend voor wie al thuis zet en wil weten waarom het thuis anders smaakt dan hier.",
      en: "The same tea, four kinds of water, three temperatures. A short and fairly technical morning for people who already brew at home and want to know why it tastes different there.",
    },
  },
];
