/**
 * Content types for the Well's of Yunnan catalogue.
 *
 * Everything a product knows about itself lives here. UI copy lives in
 * `messages/*.json`; product copy is bilingual and lives with the product so a
 * later migration to Sanity or Shopify only has to satisfy this shape.
 */

export type Locale = "nl" | "en";

/** Bilingual string. Written in Dutch first, then English. */
export type I18nText = Record<Locale, string>;

/**
 * The Chinese classification, kept as-is, because translating it away is what
 * every other shop gets wrong.
 *
 * 红茶 hongcha is literally "red tea" and is what Europe calls black tea, so it
 * is labelled `black` here and shown as "Zwarte thee". 黑茶 heicha is literally
 * "black tea" and is the post-fermented family — Liu Bao, Fu Zhuan — shown as
 * "Donkere thee". Getting these two the wrong way round is the single most
 * common mistake in European tea retail; see the brewing guide chapter.
 */
export type TeaCategory =
  | "sheng"
  | "shou"
  | "heicha"
  | "oolong"
  | "gaba"
  | "black"
  | "white"
  | "green"
  | "yellow"
  | "matcha"
  | "flavoured";

export type Category = TeaCategory | "teaware" | "sets";

/**
 * Oolong is the one family broad enough to need a second level. Russian
 * specialists split it this way and European shops almost never do, which is
 * exactly why it reads as a shop that knows the subject.
 */
export type OolongStyle = "rock" | "light" | "dancong" | "taiwan";

/** Shown on the card. `sampler` is derived, never authored. */
export type Badge = "new" | "limited" | "sampler";

/**
 * The liquor scale is an information carrier, not decoration: each key is the
 * real colour of the brewed cup. See `--liquor-*` in globals.css.
 */
export type LiquorKey =
  | "green"
  | "white"
  | "oolong"
  | "red"
  | "shou"
  | "sheng"
  | "matcha"
  | "yellow"
  | "neutral";

export type Caffeine = "none" | "low" | "medium" | "high";

/** Physical form. Drives the "vorm" facet in the catalogue. */
export type Form = "loose" | "cake" | "tuocha" | "brick" | "powder" | "object" | "voucher";

export type Roast = "none" | "light" | "medium" | "heavy";

export type Vessel = "gaiwan" | "yixing" | "chawan" | "teapot";

/**
 * Prices are derived, not typed out. One base price per 25 g and the ladder
 * below produce every format, so a price change is one number and the
 * relationships between formats can never drift apart.
 *
 *   10 g × 0.45   25 g × 1   50 g × 1.8   100 g × 3.3   250 g × 7.5
 *
 * Every result is rounded to the nearest price ending in ,50 or ,90.
 */
export interface Pricing {
  /** Price of 25 g in euro cents, VAT included. */
  base: number;
  /** Loose formats on offer. 10 g is always added: the sampler is mandatory. */
  formats?: number[];
  /** A pressed form sold whole, priced on its own rather than by the ladder. */
  pressed?: { grams: number; price: number; kind: "cake" | "brick" | "tuocha"; stock: number };
  /** Units on hand for the loose formats. */
  stock?: number;
}

export interface Variant {
  /** Stock keeping unit, stable across price changes. */
  sku: string;
  /** Net weight in grams. For vouchers this is the face value in euro. */
  grams: number;
  /** Retail price in euro cents, VAT included. */
  price: number;
  /** Former price in cents, when the variant is discounted. */
  compareAt?: number;
  /** Units on hand. 0 renders as sold out and blocks the add-to-cart. */
  stock: number;
  /** Overrides the default gram label, e.g. "cake 357 g" or "€ 50". */
  label?: I18nText;
}

/** Gongfu parameters. These drive the timer, they are not prose. */
export interface Gongfu {
  vessel: Vessel;
  vesselMl: number;
  grams: number;
  celsius: number;
  /** Seconds for the wake-up rinse, or null when the tea should not be rinsed. */
  rinseSeconds: number | null;
  /** Length of the first real infusion, in seconds. */
  firstSeconds: number;
  /** Added to every following infusion, in seconds. */
  incrementSeconds: number;
  /** How many infusions the leaf carries before it flattens out. */
  infusions: number;
}

/** The western alternative. Deliberately secondary on the page. */
export interface Western {
  grams: number;
  ml: number;
  celsius: number;
  minutes: number;
  /** How often the same leaf can go again. */
  resteeps: number;
}

/** The batch passport. This is the differentiator; every field is real or null. */
export interface Passport {
  regionId: string;
  /** Metres above sea level, null when the garden does not report it. */
  altitudeM: number | null;
  harvestYear: number | null;
  /** 1-12, null when only the season is known. */
  harvestMonth: number | null;
  /** Garden, cooperative or factory. Null when we buy through a broker. */
  producer: I18nText | null;
  cultivar: string | null;
  /** Percent oxidation, as measured by the producer. Null when the tea is not
   * oxidised but post-fermented, in which case `fermentation` explains it. */
  oxidation: number | null;
  /** For shou pu-erh and other post-fermented tea: how it was fermented. */
  fermentation?: I18nText;
  roast: Roast;
  storage: I18nText;
  /**
   * Set when part of the passport is genuinely unknown. Printed on the page
   * instead of being quietly omitted.
   */
  unknown?: I18nText;
}

export interface ProductCopy {
  /** One line under the name. A fact, not a promise. */
  tagline: I18nText;
  /** Two to four sentences. Written the way someone who drank it would write. */
  description: I18nText;
}

export interface Review {
  author: string;
  city: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  body: I18nText;
}

export interface Product {
  slug: string;
  name: string;
  /** Only for oolong, where the second level is what makes the shop credible. */
  style?: OolongStyle;
  /** Authored badges. The sampler badge is added by the data layer. */
  badges?: Badge[];
  /** The price ladder. Teaware and vouchers use `variants` directly instead. */
  pricing?: Pricing;
  /** Chinese characters, only where they carry meaning. */
  hanzi?: string;
  /** Pinyin with tone marks, set in display italic. */
  pinyin?: string;
  category: Category;
  form: Form;
  liquor: LiquorKey;
  caffeine: Caffeine;
  /** Keys into the shared flavour vocabulary, three to five per tea. */
  notes: string[];
  passport: Passport | null;
  gongfu: Gongfu | null;
  western: Western | null;
  /** Set only where the ladder does not apply: teaware, sets, vouchers. */
  variants?: Variant[];
  copy: ProductCopy;
  /** VAT band. Tea is 6 % in Belgium, objects and vouchers are 21 %. */
  vat: 6 | 21;
  /** Cakes can be placed in the Puerh Vault. */
  vaultEligible?: boolean;
  /** Shown in "Nu in de kan" on the home page. */
  featured?: boolean;
  reviews?: Review[];
  /** Slugs of teas that sit next to this one. */
  related?: string[];
}

export interface Region {
  id: string;
  name: string;
  hanzi: string;
  province: I18nText;
  /** Position on the schematic map, in the 0-100 viewBox of OriginMap. */
  x: number;
  y: number;
  /** Rendered as a dot on the home page map. */
  onMap: boolean;
  blurb: I18nText;
}

export type FlavourAxis = "floral" | "fruit" | "sweet" | "green" | "mineral" | "wood";

export interface Flavour {
  key: string;
  axis: FlavourAxis;
}

export interface Collection {
  slug: string;
  category: Category;
  title: I18nText;
  /** The introduction that makes the collection worth existing. */
  intro: I18nText;
  hanzi?: string;
  liquor: LiquorKey;
}
