import type { Collection, OolongStyle, I18nText, LiquorKey } from "./types";

/**
 * Eleven tea sections, plus teaware and gifts. Each page carries its own
 * introduction; without one a collection is only a filter with a title.
 */
export const collections: Collection[] = [
  {
    slug: "shu-puerh",
    category: "shou",
    liquor: "shou",
    hanzi: "熟普洱",
    title: { nl: "Shu pu-erh", en: "Shu pu-erh" },
    intro: {
      nl: "Rijpe pu-erh bestaat pas sinds 1973, toen men in Menghai een manier zocht om dertig jaar rijping in zes weken na te bootsen. Dat lukt niet helemaal, en dat is prima: shou is een eigen thee geworden. Donker, zacht, zonder bitterheid, en het enige type in dit rek dat u niet kunt verpesten door te lang te wachten. Als pu-erh voor u tot nu toe naar kelder smaakte, hebt u jonge, slecht gemaakte shou gedronken — hier begint alles bij zes jaar.",
      en: "Ripe pu-erh has only existed since 1973, when Menghai went looking for a way to imitate thirty years of ageing in six weeks. It does not fully work, and that is fine: shou has become a tea of its own. Dark, soft, without bitterness, and the only type on this shelf you cannot ruin by waiting too long. If pu-erh has tasted of cellars to you so far, you have been drinking young, badly made shou — here nothing starts under six years.",
    },
  },
  {
    slug: "sheng-puerh",
    category: "sheng",
    liquor: "sheng",
    hanzi: "生普洱",
    title: { nl: "Sheng pu-erh", en: "Sheng pu-erh" },
    intro: {
      nl: "Rauwe pu-erh is geperst groen blad dat men bewust niet afmaakt. Jong is hij scherp, bitter en fris; na tien jaar is daar hout, kamfer en een dikte voor in de plaats gekomen die je niet kunt fabriceren. Alles hier heeft een jaartal, want bij sheng is dat geen detail maar de helft van de prijs. Begin bij Tao Zi Zhai als u nooit eerder sheng dronk; begin bij Banzhang als u wilt weten waarom mensen erover praten.",
      en: "Raw pu-erh is pressed green leaf that is deliberately left unfinished. Young it is sharp, bitter and fresh; after ten years there is wood, camphor and a thickness in its place that cannot be manufactured. Everything here carries a year, because with sheng that is not a detail but half the price. Start with Tao Zi Zhai if you have never had sheng; start with Banzhang if you want to know why people talk about it.",
    },
  },
  {
    slug: "donkere-thee",
    category: "heicha",
    liquor: "shou",
    hanzi: "黑茶",
    title: { nl: "Donkere thee / Hei Cha", en: "Dark tea / Hei Cha" },
    intro: {
      nl: "Hier gaat het bijna altijd mis in de vertaling. 黑茶 hēichá betekent letterlijk zwarte thee, maar het is de nagefermenteerde familie: Liu Bao uit Guangxi, Fu Zhuan uit Hunan. Wat Europa zwarte thee noemt, heet in China 红茶 hóngchá, rode thee, en staat bij ons onder Zwarte thee. Pu-erh hoort strikt genomen ook in deze familie, maar krijgt bij ons een eigen ingang omdat het verschil tussen shu en sheng groter is dan het verschil tussen groen en wit.",
      en: "This is where the translation almost always goes wrong. 黑茶 hēichá literally means black tea, but it is the post-fermented family: Liu Bao from Guangxi, Fu Zhuan from Hunan. What Europe calls black tea is 红茶 hóngchá in China, red tea, and sits under Black tea here. Strictly speaking pu-erh belongs to this family too, but it gets its own entrance because the gap between shu and sheng is wider than the one between green and white.",
    },
  },
  {
    slug: "oolong",
    category: "oolong",
    liquor: "oolong",
    hanzi: "乌龙茶",
    title: { nl: "Oolong", en: "Oolong" },
    intro: {
      nl: "Oolong is geen soort maar een bereik: van twintig procent oxidatie, waar het bijna groene thee is, tot zeventig procent, waar het bijna rode thee is. Daartussen zit meer verschil dan tussen witte en groene thee, en juist daarom delen wij oolong in vieren waar de meeste Europese winkels er één schap van maken. Rotsthee voor het mineraal, Anxi voor het bloemige, dan cong voor de geur, Taiwan voor de dikte.",
      en: "Oolong is not a type but a range: from twenty percent oxidation, where it is nearly green tea, to seventy, where it is nearly red tea. There is more difference inside that range than between white and green tea, which is exactly why we split oolong in four where most European shops make it one shelf. Rock tea for the mineral, Anxi for the floral, dan cong for the scent, Taiwan for the body.",
    },
  },
  {
    slug: "gaba",
    category: "gaba",
    liquor: "oolong",
    hanzi: "佳葉龍茶",
    title: { nl: "GABA", en: "GABA" },
    intro: {
      nl: "GABA is geen theesoort maar een verwerkingsmethode. Na de pluk gaat het blad in een afgesloten vat waar de zuurstof door stikstof is vervangen; in die omstandigheden zet de plant glutaminezuur om in gamma-aminoboterzuur, een stof die van nature ook in het menselijk lichaam voorkomt. Wat dat in het lichaam doet, laten wij aan onderzoekers over — wij beschrijven wat het met de thee doet, en dat is duidelijk: veel ronder, met gedroogde kaki en karamel waar dezelfde tuin zonder die stap bloemig was.",
      en: "GABA is not a type of tea but a processing method. After picking, the leaf goes into a sealed vessel where the oxygen has been replaced with nitrogen; under those conditions the plant converts glutamic acid into gamma-aminobutyric acid, a compound that also occurs naturally in the human body. What that does inside a body we leave to researchers — we describe what it does to the tea, and that much is plain: far rounder, with dried persimmon and caramel where the same garden was floral without the step.",
    },
  },
  {
    slug: "zwarte-thee",
    category: "black",
    liquor: "red",
    hanzi: "红茶",
    title: { nl: "Zwarte thee / Hong Cha", en: "Black tea / Hong Cha" },
    intro: {
      nl: "Wat in Europa zwarte thee heet, heet in China rode thee: 红茶 hóngchá, naar de kleur van het aftreksel, niet naar die van het blad. Wij gebruiken hier de Europese naam omdat u die zoekt, en zetten de Chinese ernaast omdat ze de nauwkeurigere is. Chinese rode thee is zachter en zoeter dan Assam of Ceylon, met mout, longan en soms rozen, en ze verdraagt gongfu net zo goed als een gewone kan.",
      en: "What Europe calls black tea is red tea in China: 红茶 hóngchá, named for the colour of the liquor rather than the leaf. We use the European name here because that is what you search for, and put the Chinese one beside it because it is the more accurate. Chinese red tea is softer and sweeter than Assam or Ceylon, with malt, longan and sometimes rose, and it takes gongfu as well as it takes an ordinary pot.",
    },
  },
  {
    slug: "witte-thee",
    category: "white",
    liquor: "white",
    hanzi: "白茶",
    title: { nl: "Witte thee", en: "White tea" },
    intro: {
      nl: "Witte thee is de minst bewerkte van de zes: verwelken en drogen, verder niets. Geen pan, geen rollen, geen fermentatie. Daardoor is er ook niets om achter te schuilen — een slechte pluk blijft een slechte pluk. Verse witte thee is licht en bloemig; witte thee van vijf jaar en ouder is bruin, zoet en heeft een kamfertoon die niemand ziet aankomen. Beide staan hier, en het prijsverschil ertussen is groter dan het smaakverschil.",
      en: "White tea is the least processed of the six: wither and dry, nothing more. No pan, no rolling, no fermentation. Which also means there is nothing to hide behind — a bad picking stays a bad picking. Fresh white tea is light and floral; white tea of five years and older is brown, sweet, and carries a camphor note nobody sees coming. Both are here, and the price gap between them is wider than the difference in the cup.",
    },
  },
  {
    slug: "groene-thee",
    category: "green",
    liquor: "green",
    hanzi: "绿茶",
    title: { nl: "Groene thee", en: "Green tea" },
    intro: {
      nl: "Chinese groene thee wordt in een pan gedood, niet gestoomd zoals de Japanse, en dat is het verschil tussen kastanje en zeewier. Ze is bederfelijk: wat u hier koopt is geplukt in maart of april van dit jaar en moet dit jaar op. Bewaar hem in de koelkast, luchtdicht, in kleine porties, en zet hem op tachtig graden. Kokend water is de enige manier om goede groene thee onherstelbaar te verpesten.",
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
      nl: "De zeldzaamste van de zes soorten, en de enige die bijna verdween. Gele thee is groene thee met één extra stap: men huang, waarbij het warme blad wordt ingepakt en uren tot dagen blijft liggen. Het wordt daardoor licht geel en verliest de grasachtigheid. Het kost tijd en levert weinig op, dus bijna niemand doet het nog. Wij hebben één partij per jaar, en als die op is, is ze op.",
      en: "The rarest of the six types, and the only one that nearly disappeared. Yellow tea is green tea with one extra step: men huang, in which the warm leaf is wrapped and left for hours or days. It turns faintly yellow and loses the grassiness. It costs time and yields little, so almost nobody still does it. We have one batch a year, and when it is gone, it is gone.",
    },
  },
  {
    slug: "matcha",
    category: "matcha",
    liquor: "matcha",
    hanzi: "抹茶",
    title: { nl: "Matcha", en: "Matcha" },
    intro: {
      nl: "Dit is een Japanse gastcollectie. Wij verkopen Chinese thee en matcha is dat niet: ze wordt in Japan gemaakt, van in de schaduw gegroeide tencha, op steen gemalen. Wij zetten het er nadrukkelijk bij, omdat een aantal winkels matcha onder een Chinees assortiment schuift alsof het hetzelfde verhaal is. Dat is het niet. Wat wij wel doen, is twee eerlijke matcha’s aanbieden: één om te kloppen en één om in melk te gebruiken.",
      en: "This is a Japanese guest collection. We sell Chinese tea and matcha is not that: it is made in Japan, from shade-grown tencha, ground on stone. We spell it out because a number of shops file matcha under a Chinese range as though it were the same story. It is not. What we do offer is two honest matchas: one to whisk and one to use in milk.",
    },
  },
  {
    slug: "bloementhee",
    category: "flavoured",
    liquor: "green",
    hanzi: "花茶",
    title: { nl: "Gearomatiseerd / bloementhee", en: "Scented / flower tea" },
    intro: {
      nl: "Twee jasmijnthees, en geen enkele met toegevoegd aroma. Bij echte jasmijnthee zit er geen bloem in het zakje: de bloemen gaan ’s nachts open, worden op het blad gelegd en er de volgende ochtend weer uit gehaald, en dat herhaalt men vier tot negen keer met steeds verse bloemen. Wat u ruikt is dus opgenomen geur. Gedroogde bloemblaadjes in de verpakking zijn decoratie, geen bewijs van kwaliteit — eerder het tegendeel.",
      en: "Two jasmine teas, and neither with added flavouring. In real jasmine tea there is no flower in the packet: the flowers open at night, are laid on the leaf and taken out again next morning, repeated four to nine times with fresh flowers each round. So what you smell is absorbed scent. Dried petals in the packaging are decoration, not proof of quality — rather the opposite.",
    },
  },
  {
    slug: "theeservies",
    category: "teaware",
    liquor: "neutral",
    hanzi: "茶具",
    title: { nl: "Theeservies", en: "Teaware" },
    intro: {
      nl: "Er is precies één voorwerp dat u nodig hebt om te beginnen: een gaiwan van honderdtien milliliter. Al het andere hier is nuttig, niets ervan is verplicht, en wij verkopen liever één goede gaiwan dan een set van twaalf stukken waarvan u er drie gebruikt. Alles op deze pagina is gekozen omdat wij het zelf aan tafel hebben staan, en de beschrijvingen zeggen erbij wat het voorwerp doet en wat het niet doet.",
      en: "There is exactly one object you need to start: a hundred and ten millilitre gaiwan. Everything else here is useful, none of it required, and we would rather sell one good gaiwan than a twelve-piece set of which you use three. Everything on this page was chosen because we have it on the table ourselves, and the descriptions say what the object does and what it does not.",
    },
  },
  {
    slug: "sets-en-cadeaus",
    category: "sets",
    liquor: "neutral",
    hanzi: "茶礼",
    title: { nl: "Sets & cadeaus", en: "Sets & gifts" },
    intro: {
      nl: "Vier sets en een bon, en geen daarvan is een doos met lint erom. Elke set is bedoeld om iets te laten zien: zes families naast elkaar, shu tegenover sheng, of vier oolongs die alle vier oolong heten en niets gemeen hebben. Bij elk zakje zit een kaartje met gram, graden en seconden. En als u niet weet wat iemand drinkt, is een bon eerlijker dan raden.",
      en: "Four sets and a voucher, and none of them is a box with a ribbon on it. Every set is meant to show you something: six families side by side, shu against sheng, or four oolongs that are all called oolong and have nothing in common. Every packet comes with a card giving grams, degrees and seconds. And if you do not know what someone drinks, a voucher is more honest than guessing.",
    },
  },
];

export const collectionBySlug = new Map(collections.map((c) => [c.slug, c]));

/**
 * The four oolong styles. These are catalogue facets rather than pages: the
 * URL /thee?type=oolong&style=rock is shareable and needs no second route.
 */
export const oolongStyles: {
  id: OolongStyle;
  hanzi: string;
  liquor: LiquorKey;
  title: I18nText;
  blurb: I18nText;
}[] = [
  {
    id: "rock",
    hanzi: "岩茶",
    liquor: "oolong",
    title: { nl: "Rotsthee (Wuyi)", en: "Rock tea (Wuyi)" },
    blurb: {
      nl: "Struiken tussen de zandsteenwanden van noordelijk Fujian, boven houtskool geroosterd. De minerale nasmaak heet yan yun, rotsklank.",
      en: "Bushes between the sandstone walls of northern Fujian, roasted over charcoal. The mineral aftertaste is called yan yun, rock rhyme.",
    },
  },
  {
    id: "light",
    hanzi: "清香型",
    liquor: "green",
    title: { nl: "Lichte oolong (Anxi)", en: "Light oolong (Anxi)" },
    blurb: {
      nl: "Zuidelijk Fujian, licht geoxideerd en nauwelijks geroosterd. Bloemig, bijna groen van aftreksel, en het snelst bederfelijk van de vier.",
      en: "Southern Fujian, lightly oxidised and barely roasted. Floral, almost green in the cup, and the quickest of the four to fade.",
    },
  },
  {
    id: "dancong",
    hanzi: "单丛",
    liquor: "oolong",
    title: { nl: "Dan Cong (Guangdong)", en: "Dan Cong (Guangdong)" },
    blurb: {
      nl: "Enkele struik: het blad van één boom apart geplukt en verwerkt. Uitgesproken geuren met eigen namen, en snel wrang als u te lang zet.",
      en: "Single bush: the leaf of one tree picked and processed on its own. Pronounced aromas with names of their own, and quick to turn astringent.",
    },
  },
  {
    id: "taiwan",
    hanzi: "台湾乌龙",
    liquor: "oolong",
    title: { nl: "Taiwanese oolong", en: "Taiwanese oolong" },
    blurb: {
      nl: "Van ongeroosterde hoogbergthee tot de zwaar geoxideerde Dong Fang Mei Ren. Dikker in de mond dan het vasteland, met meer room.",
      en: "From unroasted high mountain tea to the heavily oxidised Dong Fang Mei Ren. Thicker in the mouth than the mainland, with more cream.",
    },
  },
];
