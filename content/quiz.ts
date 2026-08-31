import type { Category, I18nText } from "./types";

export interface QuizOption {
  id: string;
  label: I18nText;
  hint: I18nText;
  /** Added to a category's score when this option is chosen. */
  weights: Partial<Record<Category, number>>;
  /** Optional extra constraints applied after scoring. */
  maxCaffeine?: "low" | "medium" | "high";
  preferForm?: "loose" | "cake";
}

export interface QuizQuestion {
  id: string;
  question: I18nText;
  options: QuizOption[];
}

/**
 * Five questions. The weights are a simple additive score per category; the
 * ranking then picks the best-matching tea per category so the three results
 * are never three versions of the same thing.
 */
export const quizQuestions: QuizQuestion[] = [
  {
    id: "strength",
    question: { nl: "Hoe stevig mag het zijn?", en: "How strong should it be?" },
    options: [
      {
        id: "light",
        label: { nl: "Licht en doorzichtig", en: "Light and transparent" },
        hint: { nl: "U wilt kunnen blijven doordrinken zonder dat het zwaar wordt.", en: "You want to keep drinking without it getting heavy." },
        weights: { white: 3, green: 3, yellow: 2, oolong: 1, flavoured: 1 },
        maxCaffeine: "medium",
      },
      {
        id: "medium",
        label: { nl: "Ergens in het midden", en: "Somewhere in the middle" },
        hint: { nl: "Met body, maar niet zwaar op de maag.", en: "With body, but not heavy on the stomach." },
        weights: { oolong: 3, black: 2, sheng: 2, yellow: 1, gaba: 2 },
      },
      {
        id: "strong",
        label: { nl: "Vol en donker", en: "Full and dark" },
        hint: { nl: "Iets waar u in kunt zakken; koffie-achtige dikte.", en: "Something to sink into; a coffee-like thickness." },
        weights: { shou: 4, black: 3, sheng: 1, heicha: 3 },
      },
    ],
  },
  {
    id: "profile",
    question: { nl: "Waar gaat uw smaak naartoe?", en: "Which way does your taste go?" },
    options: [
      {
        id: "floral",
        label: { nl: "Bloemig en geurig", en: "Floral and fragrant" },
        hint: { nl: "Orchidee, seringen, kamperfoelie.", en: "Orchid, lilac, honeysuckle." },
        weights: { oolong: 4, white: 2, green: 1 },
      },
      {
        id: "sweet",
        label: { nl: "Zoet en fruitig", en: "Sweet and fruity" },
        hint: { nl: "Honing, gedroogd fruit, karamel.", en: "Honey, dried fruit, caramel." },
        weights: { black: 4, white: 2, oolong: 1, sheng: 1, gaba: 2 },
      },
      {
        id: "earthy",
        label: { nl: "Aards en houtig", en: "Earthy and woody" },
        hint: { nl: "Bosgrond, gedroogde dadel, oud hout.", en: "Forest floor, dried date, old wood." },
        weights: { shou: 4, sheng: 2, heicha: 3 },
      },
      {
        id: "fresh",
        label: { nl: "Groen en fris", en: "Green and fresh" },
        hint: { nl: "Kastanje, doperwt, verse bladeren.", en: "Chestnut, sweet pea, fresh leaves." },
        weights: { green: 4, yellow: 3, matcha: 2, flavoured: 2 },
      },
    ],
  },
  {
    id: "moment",
    question: { nl: "Wanneer drinkt u het?", en: "When do you drink it?" },
    options: [
      {
        id: "morning",
        label: { nl: "'s Ochtends, om wakker te worden", en: "In the morning, to wake up" },
        hint: { nl: "Cafeïne is welkom.", en: "Caffeine is welcome." },
        weights: { black: 3, shou: 2, matcha: 2, sheng: 1 },
      },
      {
        id: "afternoon",
        label: { nl: "In de namiddag, aan tafel", en: "In the afternoon, at the table" },
        hint: { nl: "Tijd voor meerdere infusies.", en: "Time for several infusions." },
        weights: { oolong: 3, sheng: 3, green: 2, yellow: 2 },
      },
      {
        id: "evening",
        label: { nl: "'s Avonds, laat", en: "Late in the evening" },
        hint: { nl: "Liever weinig cafeïne.", en: "Preferably little caffeine." },
        weights: { white: 4, shou: 2, heicha: 1 },
        maxCaffeine: "low",
      },
    ],
  },
  {
    id: "experience",
    question: { nl: "Hoeveel losse thee dronk u tot nu toe?", en: "How much loose leaf tea have you drunk so far?" },
    options: [
      {
        id: "new",
        label: { nl: "Dit is nieuw voor mij", en: "This is new to me" },
        hint: { nl: "Wij houden het bij thee die vergevingsgezind is.", en: "We will keep to teas that are forgiving." },
        weights: { black: 3, oolong: 2, shou: 2, white: 1 },
        preferForm: "loose",
      },
      {
        id: "some",
        label: { nl: "Af en toe, uit nieuwsgierigheid", en: "Now and then, out of curiosity" },
        hint: { nl: "U weet ongeveer wat u lekker vindt.", en: "You roughly know what you like." },
        weights: { oolong: 2, sheng: 2, green: 2, white: 1 },
      },
      {
        id: "deep",
        label: { nl: "Dagelijks, met gaiwan", en: "Daily, with a gaiwan" },
        hint: { nl: "Wij mogen naar de moeilijkere hoek.", en: "We can head for the harder end." },
        weights: { sheng: 4, oolong: 3, yellow: 2 },
      },
    ],
  },
  {
    id: "occasion",
    question: { nl: "Waarvoor is het?", en: "What is it for?" },
    options: [
      {
        id: "daily",
        label: { nl: "Elke dag, uit de kan", en: "Every day, from the pot" },
        hint: { nl: "Prijs per gram telt mee.", en: "Price per gram counts." },
        weights: { black: 3, shou: 2, green: 2, white: 2 },
        preferForm: "loose",
      },
      {
        id: "ritual",
        label: { nl: "Een trage zaterdagmiddag", en: "A slow Saturday afternoon" },
        hint: { nl: "Iets wat tien infusies meegaat.", en: "Something that goes ten infusions." },
        weights: { sheng: 3, oolong: 3, shou: 1 },
      },
      {
        id: "gift",
        label: { nl: "Een cadeau", en: "A gift" },
        hint: { nl: "Iets dat uitlegbaar en bijzonder is.", en: "Something explainable and out of the ordinary." },
        weights: { sets: 3, oolong: 2, yellow: 2, white: 1 },
      },
      {
        id: "collect",
        label: { nl: "Om weg te leggen", en: "To put away" },
        hint: { nl: "Geperste thee die beter wordt.", en: "Pressed tea that improves." },
        weights: { sheng: 5, white: 1 },
        preferForm: "cake",
      },
    ],
  },
];
