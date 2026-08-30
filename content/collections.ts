import type { Collection } from "./types";

/**
 * One page per collection, each with its own introduction. The introduction is
 * the reason the collection exists; without it a collection is just a filter.
 */
export const collections: Collection[] = [
  {
    slug: "sheng-puerh",
    category: "sheng",
    liquor: "sheng",
    hanzi: "生普洱",
    title: { nl: "Sheng pu-erh", en: "Sheng pu-erh" },
    intro: {
      nl: "Rauwe pu-erh is geperst groen blad dat men bewust niet afmaakt. Jong is hij scherp, bitter en rokerig-fris; na tien jaar is daar hout, kamfer en een dikte voor in de plaats gekomen die je niet kunt fabriceren. Alles wat hier staat is enkelvoudige herkomst met een jaartal, want bij sheng is het jaartal geen detail maar de helft van de prijs. Begin bij Yiwu als u nooit eerder sheng dronk; begin bij Lao Man'e als u wilt weten waarom mensen erover praten.",
      en: "Raw pu-erh is pressed green leaf that is deliberately left unfinished. Young it is sharp, bitter and smoky-fresh; after ten years there is wood, camphor and a thickness in its place that cannot be manufactured. Everything here is single origin with a year on it, because with sheng the year is not a detail but half the price. Start with Yiwu if you have never had sheng; start with Lao Man'e if you want to know why people talk about it.",
    },
  },
  {
    slug: "shou-puerh",
    category: "shou",
    liquor: "shou",
    hanzi: "熟普洱",
    title: { nl: "Shou pu-erh", en: "Shou pu-erh" },
    intro: {
      nl: "Rijpe pu-erh bestaat pas sinds 1973, toen men in Menghai een manier zocht om de dertig jaar rijping van sheng in zes weken na te bootsen. Dat lukt niet helemaal, en dat is prima: shou is een eigen thee geworden. Donker, zacht, zonder bitterheid, en het enige type in dit rek dat u niet kunt verpesten door te lang te wachten. Als pu-erh voor u tot nu toe naar kelder smaakte, hebt u jonge, slecht gemaakte shou gedronken.",
      en: "Ripe pu-erh has only existed since 1973, when Menghai went looking for a way to imitate thirty years of sheng ageing in six weeks. It does not fully work, and that is fine: shou has become a tea of its own. Dark, soft, without bitterness, and the only type on this shelf you cannot ruin by waiting too long. If pu-erh has tasted of cellars to you so far, you have been drinking young, badly made shou.",
    },
  },
  {
    slug: "oolong",
    category: "oolong",
    liquor: "oolong",
    hanzi: "乌龙茶",
    title: { nl: "Oolong", en: "Oolong" },
    intro: {
      nl: "Oolong is geen soort maar een bereik: van twintig procent oxidatie, waar het bijna groene thee is, tot vijfenvijftig procent en een zware houtskoolrooster, waar het bijna rode thee is. Daartussen zit meer verschil dan tussen witte en groene thee. Onze oolongs komen uit drie gebieden die elk hun eigen kant kiezen: Wuyi voor het mineraal, Anxi en Taiwan voor het bloemige, Fenghuang voor de geur.",
      en: "Oolong is not a type but a range: from twenty percent oxidation, where it is nearly green tea, to fifty-five percent with a heavy charcoal roast, where it is nearly red tea. There is more difference inside that range than between white and green tea. Our oolongs come from three areas that each pick their own side: Wuyi for the mineral, Anxi and Taiwan for the floral, Fenghuang for the scent.",
    },
  },
  {
    slug: "witte-thee",
    category: "white",
    liquor: "white",
    hanzi: "白茶",
    title: { nl: "Witte thee", en: "White tea" },
    intro: {
      nl: "Witte thee is de minst bewerkte van de zes: verwelken en drogen, verder niets. Geen pan, geen rollen, geen fermentatie. Daardoor is er ook niets om achter te schuilen — een slechte pluk blijft een slechte pluk. Verse witte thee is licht en bloemig; geperste witte thee van zeven jaar en ouder is donker, zoet en heeft een kamfertoon die niemand ziet aankomen. Beide staan hier.",
      en: "White tea is the least processed of the six: wither and dry, nothing more. No pan, no rolling, no fermentation. Which also means there is nothing to hide behind — a bad picking stays a bad picking. Fresh white tea is light and floral; pressed white tea of seven years and older is dark, sweet and carries a camphor note nobody sees coming. Both are here.",
    },
  },
  {
    slug: "rode-thee",
    category: "red",
    liquor: "red",
    hanzi: "红茶",
    title: { nl: "Rode thee", en: "Red tea" },
    intro: {
      nl: "Wat Europa zwarte thee noemt, heet in China rode thee, en dat is de nauwkeurigere naam: het aftreksel is roodbruin, niet zwart. Zwart is in China gereserveerd voor de nagefermenteerde thee. Chinese rode thee is zachter en zoeter dan Assam of Ceylon, met mout, longan en soms rozen, en ze verdraagt gongfu net zo goed als een gewone kan. Deze vier zijn de klassiekers, uit de twee gebieden waar het is uitgevonden.",
      en: "What Europe calls black tea is called red tea in China, and that is the more accurate name: the liquor is red-brown, not black. Black in China is reserved for post-fermented tea. Chinese red tea is softer and sweeter than Assam or Ceylon, with malt, longan and sometimes rose, and it takes gongfu as well as it takes an ordinary pot. These four are the classics, from the two areas where it was invented.",
    },
  },
  {
    slug: "groene-thee",
    category: "green",
    liquor: "green",
    hanzi: "绿茶",
    title: { nl: "Groene thee", en: "Green tea" },
    intro: {
      nl: "Chinese groene thee wordt in een pan gedood, niet gestoomd zoals de Japanse, en dat maakt het verschil tussen kastanje en zeewier. Ze is bederfelijk: wat u hier koopt is geplukt in maart of april van dit jaar en moet dit jaar op. Bewaar hem in de koelkast, luchtdicht, in kleine porties, en zet hem op tachtig graden. Kokend water is de enige manier om goede groene thee onherstelbaar te verpesten.",
      en: "Chinese green tea is killed in a pan, not steamed like the Japanese, and that is the difference between chestnut and seaweed. It is perishable: what you buy here was picked in March or April of this year and should be finished this year. Keep it in the fridge, airtight, in small portions, and brew it at eighty degrees. Boiling water is the one way to ruin good green tea beyond repair.",
    },
  },
  {
    slug: "gele-thee",
    category: "yellow",
    liquor: "yellow",
    hanzi: "黄茶",
    title: { nl: "Gele thee", en: "Yellow tea" },
    intro: {
      nl: "De zeldzaamste van de zes soorten, en de enige die bijna verdween. Gele thee is groene thee met één extra stap: het warme blad wordt ingepakt en blijft uren tot dagen liggen, waardoor het licht geel wordt en de grasachtigheid uit de smaak trekt. Het kost tijd en levert weinig op, dus bijna niemand doet het nog. Wij hebben één partij per jaar, en als die op is, is ze op.",
      en: "The rarest of the six types, and the only one that nearly disappeared. Yellow tea is green tea with one extra step: the warm leaf is wrapped and left for hours or days, which turns it faintly yellow and draws the grassiness out of the taste. It costs time and yields little, so almost nobody still does it. We have one batch a year, and when it is gone, it is gone.",
    },
  },
  {
    slug: "matcha",
    category: "matcha",
    liquor: "matcha",
    hanzi: "抹茶",
    title: { nl: "Matcha", en: "Matcha" },
    intro: {
      nl: "Dit is een Japanse gastcollectie. Wij verkopen Chinese thee en matcha is dat niet: ze wordt in Japan gemaakt, van in de schaduw gegroeide tencha, op steen gemalen. Wij zetten het er nadrukkelijk bij, omdat een aantal winkels matcha onder een Chinees assortiment schuift alsof het hetzelfde verhaal is. Dat is het niet. Wat wij wel doen, is twee eerlijke matcha's aanbieden: één om te kloppen en één om in melk te gebruiken.",
      en: "This is a Japanese guest collection. We sell Chinese tea and matcha is not that: it is made in Japan, from shade-grown tencha, ground on stone. We spell it out because a number of shops file matcha under a Chinese range as though it were the same story. It is not. What we do offer is two honest matchas: one to whisk and one to use in milk.",
    },
  },
  {
    slug: "gerei",
    category: "teaware",
    liquor: "neutral",
    hanzi: "茶具",
    title: { nl: "Gerei", en: "Teaware" },
    intro: {
      nl: "Er is precies één voorwerp dat u nodig hebt om te beginnen: een gaiwan van honderdtien milliliter. Al het andere hier is nuttig, niets ervan is verplicht, en wij verkopen liever één goede gaiwan dan een set van twaalf stukken waarvan u er drie gebruikt. Alles op deze pagina is gekozen omdat wij het zelf aan de tafel hebben staan, en de beschrijvingen zeggen erbij wat het voorwerp doet en wat het niet doet.",
      en: "There is exactly one object you need to start: a hundred and ten millilitre gaiwan. Everything else here is useful, none of it is required, and we would rather sell one good gaiwan than a twelve-piece set of which you use three. Everything on this page was chosen because we have it on the table ourselves, and the descriptions say what the object does and what it does not.",
    },
  },
  {
    slug: "sets-en-cadeau",
    category: "sets",
    liquor: "neutral",
    hanzi: "茶礼",
    title: { nl: "Sets en cadeau", en: "Sets and gifts" },
    intro: {
      nl: "Twee sets en een bon, en geen daarvan is een doos met lint erom. De kennismakingsset is bedoeld om iets te leren: zes families, tien gram elk, met de parameters op een kaartje. De verticale set is één tuin over vier jaargangen, wat de enige manier is om ouderdom te proeven zonder dat er andere variabelen door de vergelijking lopen. En als u niet weet wat iemand drinkt, is een bon eerlijker dan raden.",
      en: "Two sets and a voucher, and none of them is a box with a ribbon on it. The introduction set is meant to teach you something: six families, ten grams each, with the parameters on a card. The vertical set is one garden across four vintages, which is the only way to taste age without other variables running through the comparison. And if you do not know what someone drinks, a voucher is more honest than guessing.",
    },
  },
];

export const collectionBySlug = new Map(collections.map((c) => [c.slug, c]));
