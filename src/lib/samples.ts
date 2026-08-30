/**
 * Ten gram samples offered as a cart upsell. Kept as a small hand-written list
 * rather than derived from the catalogue so the cart drawer does not have to
 * pull the whole content layer into the client bundle.
 */
export interface SampleOffer {
  slug: string;
  sku: string;
  name: string;
  liquor: string;
  /** Cents, VAT included. */
  price: number;
}

export const SAMPLE_PRICE = 600;

export const sampleOffers: SampleOffer[] = [
  { slug: "yiwu-zhengshan-2018", sku: "WY-SMP-YW18-10", name: "Yiwu Zhengshan", liquor: "sheng", price: SAMPLE_PRICE },
  { slug: "menghai-gong-ting-2016", sku: "WY-SMP-GT16-10", name: "Menghai Gong Ting", liquor: "shou", price: SAMPLE_PRICE },
  { slug: "rou-gui-cinnamon-rock", sku: "WY-SMP-RG-10", name: "Rou Gui", liquor: "oolong", price: SAMPLE_PRICE },
  { slug: "bai-mu-dan", sku: "WY-SMP-BMD-10", name: "Bai Mu Dan", liquor: "white", price: SAMPLE_PRICE },
  { slug: "dian-hong-golden-needle", sku: "WY-SMP-DH-10", name: "Dian Hong Golden Needle", liquor: "red", price: SAMPLE_PRICE },
  { slug: "huangshan-mao-feng", sku: "WY-SMP-HMF-10", name: "Huangshan Mao Feng", liquor: "green", price: SAMPLE_PRICE },
];
