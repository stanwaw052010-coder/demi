import type { I18nText, LiquorKey, Locale } from "../types";

export interface Article {
  slug: string;
  date: string;
  minutes: number;
  liquor: LiquorKey;
  title: I18nText;
  lede: I18nText;
  /** Slugs of products the piece talks about. */
  related: string[];
}

export const articles: Article[] = [
  {
    slug: "waarom-puerh-ouder-wordt",
    date: "2026-07-14",
    minutes: 8,
    liquor: "sheng",
    title: {
      nl: "Waarom pu-erh ouder wordt en beter",
      en: "Why pu-erh gets older, and better",
    },
    lede: {
      nl: "Rijping is trage chemie, geen romantiek. Wat er echt gebeurt in een cake, waarom het meestal misgaat, en waarom er een dal in de curve zit dat niemand noemt.",
      en: "Ageing is slow chemistry, not romance. What actually happens inside a cake, why it usually goes wrong, and why there is a trough in the curve nobody mentions.",
    },
    related: ["yiwu-zhengshan-2018", "bingdao-gushu-2021", "set-puerh-verticaal"],
  },
  {
    slug: "da-hong-pao-rotsthee",
    date: "2026-06-02",
    minutes: 7,
    liquor: "oolong",
    title: {
      nl: "Da Hong Pao: wat rotsthee echt betekent",
      en: "Da Hong Pao: what rock tea actually means",
    },
    lede: {
      nl: "Drie zones op één kaart, een prijsverschil van factor vijftig, en één term die zelden vertaald wordt. Waarom uw Da Hong Pao van acht euro geen slechte thee is, maar ook geen adres heeft.",
      en: "Three zones on one map, a fiftyfold price difference, and one term that is rarely translated. Why your eight-euro Da Hong Pao is not bad tea, but has no address either.",
    },
    related: ["da-hong-pao-zhengyan", "rou-gui-cinnamon-rock", "shui-xian-lao-cong"],
  },
  {
    slug: "water-maakt-de-helft",
    date: "2026-05-08",
    minutes: 6,
    liquor: "green",
    title: {
      nl: "Water maakt de helft van je thee",
      en: "Water is half your tea",
    },
    lede: {
      nl: "Dezelfde Huangshan Mao Feng op vier soorten water, in onze eigen winkel gezet en opgeschreven. Vlaams leidingwater komt er slecht uit, en de oplossing kost vijfentwintig euro.",
      en: "The same Huangshan Mao Feng on four kinds of water, brewed in our own shop and written down. Flemish tap water comes off badly, and the fix costs twenty-five euro.",
    },
    related: ["huangshan-mao-feng", "xi-hu-long-jing", "ijzeren-ketel-12l"],
  },
  {
    slug: "wat-er-op-het-etiket-staat",
    date: "2026-04-11",
    minutes: 7,
    liquor: "white",
    title: {
      nl: "Wat er op een theeblik staat, en wat niet",
      en: "What a tea tin says, and what it does not",
    },
    lede: {
      nl: "Een bergnaam is geen herkomstbescherming. Welke termen wel iets betekenen, welke het meest misbruikt worden, en drie vragen die u overal kunt stellen.",
      en: "A mountain name is not a protected origin. Which terms do mean something, which are abused most, and three questions you can ask anywhere.",
    },
    related: ["xi-hu-long-jing", "bingdao-gushu-2021", "da-hong-pao-zhengyan"],
  },
  {
    slug: "de-zes-soorten",
    date: "2026-03-05",
    minutes: 6,
    liquor: "yellow",
    title: {
      nl: "De zes soorten, en waarom het er geen vier zijn",
      en: "The six types, and why there are not four",
    },
    lede: {
      nl: "Zwart, groen, wit en een restcategorie is een fossiel van de Europese handel. De Chinese indeling gaat over bewerking, en daar past pu-erh nog steeds slecht in.",
      en: "Black, green, white and a remainder is a fossil of the European trade. The Chinese scheme is about processing, and pu-erh still fits it badly.",
    },
    related: ["meng-ding-huang-ya", "bai-hao-yin-zhen-fuding", "menghai-gong-ting-2016"],
  },
  {
    slug: "wij-kochten-de-verkeerde-cake",
    date: "2026-02-01",
    minutes: 6,
    liquor: "shou",
    title: {
      nl: "Wij kochten de verkeerde cake",
      en: "We bought the wrong cake",
    },
    lede: {
      nl: "Twaalf cakes uit Menghai die niet waren wat de verkoper zei. Wat er misging, wie zijn geld terugkreeg, en welke inkoopregel wij er sindsdien op nahouden.",
      en: "Twelve cakes from Menghai that were not what the seller said. What went wrong, who got their money back, and the purchasing rule we have kept ever since.",
    },
    related: ["yiwu-zhengshan-2018", "jingmai-autumn-2022"],
  },
];

export const articleBySlug = new Map(articles.map((a) => [a.slug, a]));

/**
 * Static import map so the MDX is compiled at build time by @next/mdx. Keeping
 * it explicit means the bundler can see every article; a dynamic path could not
 * be analysed.
 */
type MdxModule = { default: React.ComponentType };

export const articleBody: Record<string, Record<Locale, () => Promise<MdxModule>>> = {
  "waarom-puerh-ouder-wordt": {
    nl: () => import("./waarom-puerh-ouder-wordt.nl.mdx"),
    en: () => import("./waarom-puerh-ouder-wordt.en.mdx"),
  },
  "da-hong-pao-rotsthee": {
    nl: () => import("./da-hong-pao-rotsthee.nl.mdx"),
    en: () => import("./da-hong-pao-rotsthee.en.mdx"),
  },
  "water-maakt-de-helft": {
    nl: () => import("./water-maakt-de-helft.nl.mdx"),
    en: () => import("./water-maakt-de-helft.en.mdx"),
  },
  "wat-er-op-het-etiket-staat": {
    nl: () => import("./wat-er-op-het-etiket-staat.nl.mdx"),
    en: () => import("./wat-er-op-het-etiket-staat.en.mdx"),
  },
  "de-zes-soorten": {
    nl: () => import("./de-zes-soorten.nl.mdx"),
    en: () => import("./de-zes-soorten.en.mdx"),
  },
  "wij-kochten-de-verkeerde-cake": {
    nl: () => import("./wij-kochten-de-verkeerde-cake.nl.mdx"),
    en: () => import("./wij-kochten-de-verkeerde-cake.en.mdx"),
  },
};
