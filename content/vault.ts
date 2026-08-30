import type { I18nText } from "./types";

/** Storage tiers for the Puerh Vault. Prices in euro cents per cake per year. */
export interface VaultTier {
  id: string;
  years: number;
  pricePerCakePerYear: number;
  title: I18nText;
  detail: I18nText;
}

export const vaultTiers: VaultTier[] = [
  {
    id: "vault-3",
    years: 3,
    pricePerCakePerYear: 900,
    title: { nl: "Drie jaar", en: "Three years" },
    detail: {
      nl: "De korte termijn. Genoeg om de scherpte uit een jonge sheng te halen, te weinig om hem echt te veranderen.",
      en: "The short term. Enough to take the edge off a young sheng, too little to really change it.",
    },
  },
  {
    id: "vault-5",
    years: 5,
    pricePerCakePerYear: 800,
    title: { nl: "Vijf jaar", en: "Five years" },
    detail: {
      nl: "Het punt waarop de meeste mensen het verschil blind kunnen aanwijzen. Wij sturen op jaar drie een proefstuk van 10 g op.",
      en: "The point at which most people can pick the difference blind. We send a 10 g sample in year three.",
    },
  },
  {
    id: "vault-10",
    years: 10,
    pricePerCakePerYear: 700,
    title: { nl: "Tien jaar", en: "Ten years" },
    detail: {
      nl: "De volle termijn. Proefstukken in jaar drie, vijf en acht, zodat u de curve zelf hebt geproefd voor u de cake terugkrijgt.",
      en: "The full term. Samples in years three, five and eight, so you have tasted the curve yourself before the cake comes back.",
    },
  },
];

export interface VaultStep {
  n: number;
  title: I18nText;
  text: I18nText;
}

export const vaultSteps: VaultStep[] = [
  {
    n: 1,
    title: { nl: "U koopt een cake", en: "You buy a cake" },
    text: {
      nl: "Elke cake en elke geperste schijf in dit rek kan de Vault in. U vinkt dat aan bij het bestellen en kiest een termijn.",
      en: "Every cake and every pressed disc on this shelf can go into the Vault. You tick that when ordering and choose a term.",
    },
  },
  {
    n: 2,
    title: { nl: "Wij wikkelen en registreren", en: "We wrap and register" },
    text: {
      nl: "De cake blijft in zijn originele papier, gaat in een ademende kartonnen huls en krijgt een nummer. U ontvangt een herkomstcertificaat met partij, jaar, tuin, gewicht bij inbrengen en de datum.",
      en: "The cake stays in its original paper, goes into a breathing card sleeve and gets a number. You receive a certificate of origin with batch, year, garden, weight on entry and the date.",
    },
  },
  {
    n: 3,
    title: { nl: "Klimaatkast in Kortrijk", en: "Climate cabinet in Kortrijk" },
    text: {
      nl: "22 tot 26 °C, 62 tot 68 % relatieve vochtigheid, donker, met luchtverversing en zonder geurbronnen in de ruimte. Elke maand gelogd; de metingen zijn opvraagbaar.",
      en: "22 to 26 °C, 62 to 68 % relative humidity, dark, with air exchange and no sources of odour in the room. Logged monthly; the readings are available on request.",
    },
  },
  {
    n: 4,
    title: { nl: "U proeft onderweg", en: "You taste along the way" },
    text: {
      nl: "Op vaste momenten breken wij 10 g af en sturen dat op. Zo weet u wat er gebeurt in plaats van erop te moeten vertrouwen.",
      en: "At set moments we break off 10 g and send it to you. That way you know what is happening instead of having to trust that it is.",
    },
  },
  {
    n: 5,
    title: { nl: "Ophalen, laten sturen of verkopen", en: "Collect, have it sent, or sell" },
    text: {
      nl: "Op elk moment, ook voor het einde van de termijn. Wij sturen de cake op, u haalt hem op in Gent, of u zet hem te koop en wij brengen u in contact met kopers uit onze eigen kring. Bij verkoop rekenen wij tien procent.",
      en: "At any moment, including before the term ends. We ship the cake, you collect it in Ghent, or you put it up for sale and we connect you with buyers from our own circle. On a sale we charge ten percent.",
    },
  },
];
