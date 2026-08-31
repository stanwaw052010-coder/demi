import type { I18nText, LiquorKey } from "./types";

export type GuideBlock =
  /** The six classical types with their real liquor colour. */
  | { type: "liquorScale" }
  | { type: "p"; text: I18nText }
  | { type: "h"; text: I18nText }
  | { type: "note"; text: I18nText }
  | { type: "steps"; items: { title: I18nText; text: I18nText }[] }
  | { type: "table"; head: I18nText[]; rows: I18nText[][] };

export interface GuideChapter {
  slug: string;
  hanzi?: string;
  liquor: LiquorKey;
  title: I18nText;
  lede: I18nText;
  minutes: number;
  blocks: GuideBlock[];
}

const t = (nl: string, en: string): I18nText => ({ nl, en });

/**
 * The brewing guide. This section has to actually help, so it is written as
 * procedure and numbers rather than as atmosphere.
 */
export const guideChapters: GuideChapter[] = [
  {
    slug: "zes-soorten-zes-kleuren",
    hanzi: "六大茶类",
    liquor: "oolong",
    minutes: 5,
    title: t("Zes soorten, zes kleuren, en één vertaalfout", "Six types, six colours, and one translation error"),
    lede: t(
      "In China wordt thee ingedeeld naar bewerking, en de namen van die zes families zijn kleuren. Twee ervan worden in Europa stelselmatig verkeerd vertaald, en dat is de reden dat u in de ene winkel iets heel anders krijgt dan in de andere.",
      "In China tea is classified by processing, and the names of those six families are colours. Two of them are systematically mistranslated in Europe, which is why the same word gets you two different things in two different shops.",
    ),
    blocks: [
      {
        type: "p",
        text: t(
          "Alles komt van dezelfde plant, Camellia sinensis. Wat de zes families onderscheidt is niet waar het blad groeide maar wat er ná de pluk mee gebeurde: hoe hard het gedood is, hoever het mocht oxideren, of het geperst en met microben nagefermenteerd is. De kleuren in de namen slaan op het blad of op het aftreksel, en daar begint de verwarring.",
          "It all comes from one plant, Camellia sinensis. What separates the six families is not where the leaf grew but what happened to it after picking: how hard it was killed, how far it was allowed to oxidise, whether it was pressed and post-fermented with microbes. The colours in the names refer either to the leaf or to the liquor, and that is where the confusion starts.",
        ),
      },
      { type: "liquorScale" },
      { type: "h", text: t("De twee die altijd omgedraaid worden", "The two that always get swapped") },
      {
        type: "table",
        head: [t("Chinees", "Chinese"), t("Letterlijk", "Literally"), t("Bij ons", "Our shelf"), t("Wat het is", "What it is")],
        rows: [
          [
            t("红茶 hóngchá", "红茶 hóngchá"),
            t("rode thee", "red tea"),
            t("Zwarte thee", "Black tea"),
            t("Volledig geoxideerd. Wat Europa zwarte thee noemt: Dian Hong, Jin Jun Mei, Keemun.", "Fully oxidised. What Europe calls black tea: Dian Hong, Jin Jun Mei, Keemun."),
          ],
          [
            t("黑茶 hēichá", "黑茶 hēichá"),
            t("zwarte thee", "black tea"),
            t("Donkere thee", "Dark tea"),
            t("Nagefermenteerd met microben: Liu Bao, Fu Zhuan, en strikt genomen ook pu-erh.", "Post-fermented with microbes: Liu Bao, Fu Zhuan, and strictly speaking pu-erh too."),
          ],
        ],
      },
      {
        type: "p",
        text: t(
          "De Chinese naam kijkt naar het aftreksel, de Europese naar het droge blad. Een volledig geoxideerde Dian Hong heeft bijna zwart blad en een helder roodbruin kopje: China noemt hem rood, Europa zwart. Beide zijn te verdedigen — tot iemand 黑茶 letterlijk vertaalt en er zwarte thee van maakt, want dan staan er twee volstrekt verschillende families onder dezelfde naam.",
          "The Chinese name looks at the liquor, the European one at the dry leaf. A fully oxidised Dian Hong has nearly black leaf and a clear red-brown cup: China calls it red, Europe calls it black. Both are defensible — until someone translates 黑茶 literally and gets black tea, because then two entirely different families end up under one name.",
        ),
      },
      {
        type: "note",
        text: t(
          "Praktisch: zoekt u wat u in Europa zwarte thee noemt, ga dan naar Zwarte thee. Zoekt u Liu Bao of Fu Zhuan, ga dan naar Donkere thee. Wij zetten de Chinese naam er overal bij, zodat u nooit hoeft te raden welke van de twee bedoeld wordt.",
          "In practice: if you want what Europe calls black tea, go to Black tea. If you want Liu Bao or Fu Zhuan, go to Dark tea. We print the Chinese name everywhere, so you never have to guess which of the two is meant.",
        ),
      },
      { type: "h", text: t("En de vier die wel kloppen", "And the four that do line up") },
      {
        type: "steps",
        items: [
          {
            title: t("绿茶 lǜchá, groene thee", "绿茶 lǜchá, green tea"),
            text: t("Snel gedood in een pan, dus vrijwel niet geoxideerd. Kastanje en doperwt, geen zeewier — dat laatste is Japans en komt van stomen in plaats van pannen.", "Killed quickly in a pan, so barely oxidised at all. Chestnut and sweet pea, not seaweed — that last one is Japanese and comes from steaming rather than pan firing."),
          },
          {
            title: t("黄茶 huángchá, gele thee", "黄茶 huángchá, yellow tea"),
            text: t("Groene thee met één extra stap: het warme blad wordt ingepakt en blijft uren tot dagen liggen. De grasachtigheid verdwijnt, honing komt ervoor terug. Bijna uitgestorven.", "Green tea with one extra step: the warm leaf is wrapped and left for hours or days. The grassiness goes and honey arrives in its place. Nearly extinct."),
          },
          {
            title: t("白茶 báichá, witte thee", "白茶 báichá, white tea"),
            text: t("Verwelken en drogen, verder niets. Geen pan, geen rollen. Vijf tot vijftien procent oxidatie treedt vanzelf op tijdens het verwelken.", "Wither and dry, nothing else. No pan, no rolling. Five to fifteen percent oxidation happens by itself during the withering."),
          },
          {
            title: t("青茶 qīngchá, oolong", "青茶 qīngchá, oolong"),
            text: t("Letterlijk blauwgroene thee. Gedeeltelijk geoxideerd, van twintig tot zeventig procent, met gekneusde bladranden om die oxidatie te sturen. De breedste familie van de zes.", "Literally blue-green tea. Partially oxidised, from twenty to seventy percent, with bruised leaf edges to steer that oxidation. The broadest family of the six."),
          },
        ],
      },
      {
        type: "note",
        text: t(
          "Pu-erh valt strikt genomen onder hēichá. Wij geven shu en sheng toch een eigen ingang, omdat het verschil tussen die twee groter is dan het verschil tussen groene en witte thee, en omdat niemand die een cake zoekt hem onder Donkere thee gaat zoeken.",
          "Strictly speaking pu-erh falls under hēichá. We still give shu and sheng their own entrances, because the difference between those two is greater than the one between green and white tea, and because nobody looking for a cake is going to look under Dark tea.",
        ),
      },
    ],
  },
  {
    slug: "gongfu",
    hanzi: "功夫茶",
    liquor: "sheng",
    minutes: 7,
    title: t("Gongfu, van begin tot eind", "Gongfu, start to finish"),
    lede: t(
      "Veel blad, weinig water, korte infusies, veel keren achter elkaar. Dat is de hele methode. Wat volgt is hoe u dat concreet doet met één gaiwan en een weegschaal.",
      "A lot of leaf, a little water, short infusions, many times in a row. That is the whole method. What follows is how you actually do it with one gaiwan and a scale.",
    ),
    blocks: [
      {
        type: "p",
        text: t(
          "De westerse manier gebruikt ongeveer 1 gram blad op 100 ml water en trekt drie minuten. Gongfu gebruikt 6 tot 8 gram op 100 ml en trekt tien seconden. U zet dus dezelfde hoeveelheid blad, maar u verdeelt hem over tien tot vijftien kopjes in plaats van één. Dat is niet duurder; het is dezelfde thee, anders uitgesmeerd.",
          "The western way uses about 1 gram of leaf per 100 ml of water and steeps for three minutes. Gongfu uses 6 to 8 grams per 100 ml and steeps for ten seconds. So you use the same amount of leaf, but you spread it across ten to fifteen cups instead of one. It is not more expensive; it is the same tea, spread differently.",
        ),
      },
      {
        type: "p",
        text: t(
          "Waarom dat de moeite is: bij drie minuten komt alles er tegelijk uit en krijgt u het gemiddelde van de thee. Bij tien seconden komt er per infusie iets anders naar boven, en ziet u een thee zich over een middag ontvouwen. Bij een goede thee verschilt de vijfde infusie hoorbaar van de tweede. Bij een slechte thee niet, en dat is meteen de scherpste manier om kwaliteit te beoordelen.",
          "Why that is worth doing: at three minutes everything comes out at once and you get the average of the tea. At ten seconds a different thing surfaces in each infusion, and you watch a tea unfold across an afternoon. In a good tea the fifth infusion audibly differs from the second. In a bad tea it does not, which is the sharpest way there is to judge quality.",
        ),
      },
      { type: "h", text: t("De handeling", "The procedure") },
      {
        type: "steps",
        items: [
          {
            title: t("Alles opwarmen", "Warm everything"),
            text: t(
              "Giet kokend water in de gaiwan, van daar in de chahai, van daar in de kopjes, en gooi het weg. Koud porselein trekt vijf tot tien graden uit uw eerste infusie, en dat is precies de infusie waar het bij een dure thee om gaat.",
              "Pour boiling water into the gaiwan, from there into the pitcher, from there into the cups, and throw it away. Cold porcelain pulls five to ten degrees out of your first infusion, and that is precisely the infusion that matters in an expensive tea.",
            ),
          },
          {
            title: t("Wegen, niet schatten", "Weigh, do not estimate"),
            text: t(
              "Zes tot acht gram in een gaiwan van 110 ml. Op de productpagina staat per thee hoeveel. Ruik aan het droge blad in de warme, lege gaiwan; dat is de eerste informatie die u krijgt en het kost niets.",
              "Six to eight grams in a 110 ml gaiwan. The product page gives the figure per tea. Smell the dry leaf in the warm, empty gaiwan; that is the first information you get and it costs nothing.",
            ),
          },
          {
            title: t("Spoelen wanneer het nodig is", "Rinse when it is needed"),
            text: t(
              "Geperste thee en shou spoelt u vijf tot tien seconden: dat maakt het blad los en spoelt stof weg. Groene, gele en witte thee spoelt u niet — daar giet u simpelweg uw eerste infusie weg, en dat is zonde. Op elke productpagina staat het.",
              "Rinse pressed tea and shou for five to ten seconds: that loosens the leaf and washes off dust. Do not rinse green, yellow or white tea — there you would simply be pouring away your first infusion, which is a waste. Every product page says which.",
            ),
          },
          {
            title: t("Inschenken en meteen uitgieten", "Pour in and pour straight out"),
            text: t(
              "Giet langs de wand, niet recht op het blad. Doe het deksel erop, tel, en giet in één beweging volledig leeg in de chahai. Volledig, want blad dat in restwater blijft staan, trekt door en maakt uw volgende infusie bitter.",
              "Pour down the side, not straight onto the leaf. Put the lid on, count, and empty it completely into the pitcher in one movement. Completely, because leaf sitting in leftover water keeps steeping and will make your next infusion bitter.",
            ),
          },
          {
            title: t("De reeks opbouwen", "Build the series"),
            text: t(
              "Eerste infusie tien seconden, en daarna elke keer vijf seconden langer. Dat is een startpunt, geen wet: als infusie vier dunner wordt, verlengt u eerder; als hij te sterk is, verlengt u niet. De timer op elke productpagina rekent de reeks voor u uit en houdt bij waar u bent.",
              "First infusion ten seconds, then five seconds longer each time. That is a starting point, not a law: if the fourth infusion thins out, lengthen sooner; if it is too strong, do not lengthen. The timer on every product page works out the series for you and keeps track of where you are.",
            ),
          },
          {
            title: t("Het natte blad lezen", "Read the wet leaf"),
            text: t(
              "Als u klaar bent, kiep het blad op het deksel en kijk ernaar. Heel blad met soepele, veerkrachtige stelen betekent zorgvuldige pluk en verwerking. Bruine randen betekenen dat er te heet is gedood of dat het blad beschadigd is aangevoerd. Dit is de enige controle die u achteraf nog kunt doen.",
              "When you are done, tip the leaf onto the lid and look at it. Whole leaves with supple, springy stems mean careful picking and processing. Brown edges mean it was killed too hot or arrived damaged. This is the one check you can still run afterwards.",
            ),
          },
        ],
      },
      {
        type: "note",
        text: t(
          "Als u één ding overneemt uit dit hoofdstuk: giet de gaiwan volledig leeg. Meer dan de helft van de klachten over bitterheid komt daarvandaan, en niet van de thee.",
          "If you take one thing from this chapter: empty the gaiwan completely. More than half of all complaints about bitterness come from that, and not from the tea.",
        ),
      },
    ],
  },
  {
    slug: "gaiwan",
    hanzi: "盖碗",
    liquor: "white",
    minutes: 4,
    title: t("De gaiwan vasthouden zonder u te branden", "Holding a gaiwan without burning yourself"),
    lede: t(
      "Het enige echte obstakel bij gongfu is dat het ding heet is. Er is een greep die werkt, en die leert u in ongeveer vijf pogingen.",
      "The one real obstacle in gongfu is that the thing is hot. There is a grip that works, and you learn it in about five tries.",
    ),
    blocks: [
      {
        type: "p",
        text: t(
          "Een gaiwan is een kom, een deksel en een schotel. Geen filter, geen tuit, geen bewegende delen. Daardoor kunt u er elke theesoort in zetten en ziet u bij elke infusie het blad liggen. Voor leren is dat beter dan welk kannetje ook.",
          "A gaiwan is a bowl, a lid and a saucer. No filter, no spout, no moving parts. Which means you can brew any kind of tea in it and see the leaf at every infusion. For learning, that beats any little pot.",
        ),
      },
      { type: "h", text: t("De greep", "The grip") },
      {
        type: "steps",
        items: [
          {
            title: t("Duim en middelvinger op de rand", "Thumb and middle finger on the rim"),
            text: t(
              "Niet op de wand. De uitstaande rand is het enige deel dat koel genoeg blijft, omdat er geen water tegenaan staat. Duim vooraan, middelvinger achteraan, tegenover elkaar.",
              "Not on the wall. The flared rim is the only part that stays cool enough, because no water sits against it. Thumb at the front, middle finger at the back, opposite each other.",
            ),
          },
          {
            title: t("Wijsvinger op de deksel knop", "Index finger on the lid knob"),
            text: t(
              "De wijsvinger drukt de knop naar beneden en houdt zo het deksel vast. Uw hand doet dus drie dingen tegelijk: dragen, sluiten en straks kantelen.",
              "The index finger presses down on the knob and so holds the lid in place. Your hand is doing three things at once: carrying, closing and, in a moment, tilting.",
            ),
          },
          {
            title: t("Het deksel een spleet openschuiven", "Slide the lid open a crack"),
            text: t(
              "Schuif het deksel met de wijsvinger een paar millimeter opzij, zodat er een spleet ontstaat die smaller is dan het blad. Dat is uw filter.",
              "Slide the lid a few millimetres aside with the index finger, so a gap opens that is narrower than the leaf. That is your filter.",
            ),
          },
          {
            title: t("In één beweging kantelen", "Tilt in one movement"),
            text: t(
              "Draai de pols en giet uit, snel en volledig. Aarzelen is wat mensen brandt: hoe langer u kantelt, hoe langer de stoom langs uw hand trekt. Vier seconden en klaar.",
              "Turn the wrist and pour, fast and complete. Hesitating is what burns people: the longer you tilt, the longer the steam runs along your hand. Four seconds and done.",
            ),
          },
        ],
      },
      {
        type: "note",
        text: t(
          "Oefen drie keer met alleen water voor u er dure thee in doet. Vul de gaiwan tot een halve centimeter onder de rand, niet tot aan de rand: die halve centimeter is het verschil tussen een greep en een brandwond.",
          "Practise three times with just water before you put expensive tea in it. Fill the gaiwan to half a centimetre below the rim, not up to the rim: that half centimetre is the difference between a grip and a burn.",
        ),
      },
    ],
  },
  {
    slug: "yixing",
    hanzi: "宜兴",
    liquor: "shou",
    minutes: 5,
    title: t("Yixing: één kan, één thee", "Yixing: one pot, one tea"),
    lede: t(
      "Ongeglazuurde klei neemt smaak op. Dat is tegelijk de reden om er een te kopen en de reden om er niet alles in te zetten.",
      "Unglazed clay takes on flavour. That is at once the reason to buy one and the reason not to brew everything in it.",
    ),
    blocks: [
      {
        type: "p",
        text: t(
          "Yixing-klei is poreus. Bij elke sessie slaat er een dun laagje thee-olie in de wand, en na een jaar of twee proeft u dat terug: de kan rondt scherpe kanten af en geeft body. Daarom hoort er één theesoort in. Zet u er vandaag shou in en morgen jasmijn, dan smaakt alles binnen een maand naar allebei.",
          "Yixing clay is porous. With every session a thin layer of tea oil settles into the wall, and after a year or two you taste it back: the pot rounds off sharp edges and adds body. That is why one kind of tea belongs in it. Brew shou today and jasmine tomorrow, and within a month everything tastes of both.",
        ),
      },
      {
        type: "table",
        head: [t("Klei", "Clay"), t("Past bij", "Suits"), t("Waarom", "Why")],
        rows: [
          [t("Zhuni", "Zhuni"), t("Yancha, dan cong", "Yancha, dan cong"), t("Dicht en glad, houdt de geur hoog", "Dense and smooth, keeps the aroma high")],
          [t("Zi ni", "Zi ni"), t("Sheng pu-erh", "Sheng pu-erh"), t("Neutraler, laat de thee met rust", "More neutral, leaves the tea alone")],
          [t("Duan ni", "Duan ni"), t("Witte thee, lichte oolong", "White tea, light oolong"), t("Poreuzer, verzacht", "More porous, softens")],
          [t("Zhuni of zi ni", "Zhuni or zi ni"), t("Shou pu-erh", "Shou pu-erh"), t("Absorbeert de aardse kant en maakt hem ronder", "Absorbs the earthy side and rounds it off")],
        ],
      },
      { type: "h", text: t("Onderhoud", "Care") },
      {
        type: "steps",
        items: [
          {
            title: t("Nooit zeep", "Never soap"),
            text: t("Spoelen met heet water, en laten drogen met het deksel ernaast. Zeep trekt in de klei en komt er nooit meer uit.", "Rinse with hot water and let it dry with the lid off. Soap soaks into the clay and never comes out again."),
          },
          {
            title: t("Niet insmeren met thee", "Do not paint it with tea"),
            text: t("Het glimmen dat u op foto's ziet komt van gebruik, niet van eroverheen gieten. Thee die aan de buitenkant opdroogt gaat schimmelen.", "The shine you see in photographs comes from use, not from pouring over it. Tea drying on the outside will go mouldy."),
          },
          {
            title: t("Volledig laten drogen", "Let it dry completely"),
            text: t("Een vochtige kan in een gesloten kast is binnen twee weken muf. Laat hem open op de tafel staan.", "A damp pot in a closed cupboard is musty within two weeks. Leave it open on the table."),
          },
        ],
      },
      {
        type: "note",
        text: t(
          "Koop geen Yixing als eerste voorwerp. Koop hem als u weet welke thee u het vaakst drinkt, want die beslissing legt u met de kan vast.",
          "Do not buy a Yixing as your first object. Buy one once you know which tea you drink most often, because that is the decision the pot locks in.",
        ),
      },
    ],
  },
  {
    slug: "matcha",
    hanzi: "抹茶",
    liquor: "matcha",
    minutes: 4,
    title: t("Matcha kloppen", "Whisking matcha"),
    lede: t(
      "Japanse thee, en dus een andere handeling dan de rest van deze gids. Twee gram, zeventig milliliter, tachtig graden, twintig seconden werk.",
      "Japanese tea, and therefore a different procedure from the rest of this guide. Two grams, seventy millilitres, eighty degrees, twenty seconds of work.",
    ),
    blocks: [
      {
        type: "p",
        text: t(
          "Bij matcha drinkt u het blad op in plaats van het af te gieten, en dat verandert alles: de temperatuur mag niet te hoog, want er is geen blad om achter te blijven, en klontjes lossen niet vanzelf op. Zeef daarom altijd.",
          "With matcha you drink the leaf instead of pouring it off, and that changes everything: the temperature must not be too high, because there is no leaf left behind, and lumps do not dissolve on their own. So always sift.",
        ),
      },
      {
        type: "steps",
        items: [
          {
            title: t("Chasen weken", "Soak the chasen"),
            text: t("Dertig seconden in warm water. De tanden worden soepel en breken dan niet af in uw kom.", "Thirty seconds in warm water. The prongs become supple and then do not snap off in your bowl."),
          },
          {
            title: t("Twee gram zeven", "Sift two grams"),
            text: t("Door een fijne zeef, rechtstreeks in de kom. Dit is de stap die iedereen overslaat en die het verschil maakt tussen glad en klonterig.", "Through a fine sieve, straight into the bowl. This is the step everyone skips and the one that decides between smooth and lumpy."),
          },
          {
            title: t("Zeventig milliliter op tachtig graden", "Seventy millilitres at eighty degrees"),
            text: t("Kokend water maakt matcha bitter en vlak. Als u geen thermometer hebt: koken, dan twee minuten wachten.", "Boiling water makes matcha bitter and flat. With no thermometer: boil, then wait two minutes."),
          },
          {
            title: t("W-beweging, niet roeren", "A W motion, not stirring"),
            text: t("Klop met de pols in een W of M van voor naar achter, vijftien tot twintig seconden, tot er een fijn schuim op staat. Rondroeren geeft grote bellen die meteen inzakken.", "Whisk from the wrist in a W or M, front to back, for fifteen to twenty seconds, until a fine foam stands on top. Stirring in circles gives large bubbles that collapse at once."),
          },
          {
            title: t("Meteen drinken", "Drink it now"),
            text: t("Matcha scheidt binnen een minuut. Dat is geen fout in de thee; het is poeder in water.", "Matcha separates within a minute. That is not a fault in the tea; it is powder in water."),
          },
        ],
      },
      {
        type: "note",
        text: t(
          "Voor een latte: 2 g matcha, 40 ml water, kloppen, en dan pas de melk. Andersom krijgt u klonters die er niet meer uit gaan. Gebruik daar de Nishio voor, niet de Uji.",
          "For a latte: 2 g matcha, 40 ml water, whisk, and only then the milk. The other way round you get lumps that will not come out. Use the Nishio for that, not the Uji.",
        ),
      },
    ],
  },
  {
    slug: "water-en-temperatuur",
    hanzi: "水",
    liquor: "green",
    minutes: 6,
    title: t("Water is de helft van uw thee", "Water is half of your tea"),
    lede: t(
      "Een kop thee is 99 procent water. In Vlaanderen is dat hard water, en dat is de meest onderschatte reden waarom dure thee thuis tegenvalt.",
      "A cup of tea is 99 percent water. In Flanders that water is hard, and it is the most underrated reason expensive tea disappoints at home.",
    ),
    blocks: [
      {
        type: "p",
        text: t(
          "Leidingwater in Vlaanderen ligt grofweg tussen 25 en 45 Franse hardheidsgraden, afhankelijk van waar u woont. Calcium en magnesium binden zich aan de stoffen die een thee zoet en geurig maken, waardoor het aftreksel vlak wordt en er een grijs vlies op het kopje komt te staan. Dat vlies is geen vuil; het is kalk plus thee-olie.",
          "Tap water in Flanders sits roughly between 25 and 45 French degrees of hardness, depending on where you live. Calcium and magnesium bind to the compounds that make a tea sweet and fragrant, which flattens the liquor and puts a grey film on the cup. That film is not dirt; it is limescale plus tea oil.",
        ),
      },
      {
        type: "table",
        head: [t("Water", "Water"), t("Droogrest", "Dry residue"), t("Oordeel", "Verdict")],
        rows: [
          [t("Leidingwater Vlaanderen", "Flemish tap water"), t("300 tot 500 mg/l", "300 to 500 mg/l"), t("Te hard voor groene en witte thee", "Too hard for green and white tea")],
          [t("Gefilterd met een kan", "Jug-filtered"), t("150 tot 250 mg/l", "150 to 250 mg/l"), t("Merkbaar beter, en goedkoop", "Noticeably better, and cheap")],
          [t("Spa Reine", "Spa Reine"), t("33 mg/l", "33 mg/l"), t("Bijna te zacht; thee wordt dun maar zuiver", "Almost too soft; tea goes thin but clean")],
          [t("Volvic", "Volvic"), t("109 mg/l", "109 mg/l"), t("Het beste compromis in de supermarkt", "The best compromise in the supermarket")],
          [t("Gedestilleerd", "Distilled"), t("0 mg/l", "0 mg/l"), t("Niet doen: zonder mineralen komt er niets los", "Do not: without minerals nothing extracts")],
        ],
      },
      { type: "h", text: t("Temperatuur per soort", "Temperature by type") },
      {
        type: "table",
        head: [t("Soort", "Type"), t("Temperatuur", "Temperature"), t("Waarom", "Why")],
        rows: [
          [t("Groen, geel", "Green, yellow"), t("78 tot 85 °C", "78 to 85 °C"), t("Boven 85 °C komen de looistoffen los en wordt het wrang", "Above 85 °C the tannins release and it turns astringent")],
          [t("Wit, vers", "White, fresh"), t("88 tot 92 °C", "88 to 92 °C"), t("Knoppen geven traag af en hebben warmte nodig", "Buds give up slowly and need the heat")],
          [t("Oolong, licht", "Oolong, light"), t("92 tot 95 °C", "92 to 95 °C"), t("Genoeg om de bal te openen, niet genoeg om te verbranden", "Enough to open the ball, not enough to scorch")],
          [t("Oolong, geroosterd", "Oolong, roasted"), t("100 °C", "100 °C"), t("De rooster vraagt om kokend water", "The roast asks for boiling water")],
          [t("Rood", "Red"), t("88 tot 95 °C", "88 to 95 °C"), t("Knopgraden lager, bladgraden hoger", "Bud grades lower, leaf grades higher")],
          [t("Sheng pu-erh", "Sheng pu-erh"), t("92 tot 95 °C", "92 to 95 °C"), t("Kokend water tilt de bitterheid onnodig op", "Boiling water lifts the bitterness needlessly")],
          [t("Shou pu-erh, oude witte", "Shou pu-erh, aged white"), t("100 °C", "100 °C"), t("Verdraagt alles en heeft het nodig", "Takes anything and needs it")],
        ],
      },
      {
        type: "note",
        text: t(
          "Geen thermometer? Kokend water, deksel eraf, en per twee minuten wachten zakt het ongeveer tien graden in een gewone waterkoker. Twee minuten voor oolong, vier voor groen.",
          "No thermometer? Boil, take the lid off, and in an ordinary kettle it drops about ten degrees for every two minutes of waiting. Two minutes for oolong, four for green.",
        ),
      },
    ],
  },
  {
    slug: "puerh-bewaren",
    hanzi: "存茶",
    liquor: "sheng",
    minutes: 6,
    title: t("Pu-erh bewaren", "Storing pu-erh"),
    lede: t(
      "Pu-erh is de enige thee die u koopt met de bedoeling hem niet meteen te drinken. Dat betekent dat de bewaring een deel van het product is.",
      "Pu-erh is the only tea you buy intending not to drink it yet. Which means the storage is part of the product.",
    ),
    blocks: [
      {
        type: "p",
        text: t(
          "Rijping is microbieel en enzymatisch werk, en dat werk heeft drie dingen nodig: vocht, lucht en tijd. Te droog en er gebeurt niets; te vochtig en u kweekt schimmel. Het bereik waarin het goed gaat is smaller dan mensen denken.",
          "Ageing is microbial and enzymatic work, and that work needs three things: moisture, air and time. Too dry and nothing happens; too damp and you are growing mould. The range in which it goes well is narrower than people think.",
        ),
      },
      {
        type: "table",
        head: [t("Grootheid", "Quantity"), t("Doel", "Target"), t("Opmerking", "Note")],
        rows: [
          [t("Relatieve vochtigheid", "Relative humidity"), t("60 tot 70 %", "60 to 70 %"), t("Onder 50 % staat de rijping stil, boven 80 % krijgt u schimmel", "Below 50 % ageing stalls, above 80 % you get mould")],
          [t("Temperatuur", "Temperature"), t("20 tot 28 °C", "20 to 28 °C"), t("Stabiel is belangrijker dan precies", "Stable matters more than exact")],
          [t("Licht", "Light"), t("Donker", "Dark"), t("Uv breekt af wat u juist wilt opbouwen", "UV breaks down what you are trying to build")],
          [t("Lucht", "Air"), t("Traag ververst", "Slowly exchanged"), t("Niet luchtdicht: pu-erh moet ademen", "Not airtight: pu-erh needs to breathe")],
          [t("Geur", "Odour"), t("Geen", "None"), t("Niet bij koffie, kruiden of schoonmaakmiddel", "Not near coffee, spices or cleaning products")],
        ],
      },
      { type: "h", text: t("Praktisch, in een Belgisch huis", "In practice, in a Belgian house") },
      {
        type: "steps",
        items: [
          {
            title: t("Laat het papier zitten", "Leave the paper on"),
            text: t("Het originele wikkelpapier ademt en beschermt tegen licht. Haal het er alleen af om af te breken.", "The original wrapper breathes and keeps out light. Only take it off to break pieces away."),
          },
          {
            title: t("Karton, geen plastic", "Card, not plastic"),
            text: t("Een kartonnen doos of een onbehandelde houten kist werkt. Een plastic zak sluit lucht af en houdt vocht vast op de verkeerde plek.", "A cardboard box or an untreated wooden crate works. A plastic bag shuts out air and traps damp in the wrong place."),
          },
          {
            title: t("Niet in de keuken, niet in de kelder", "Not in the kitchen, not in the cellar"),
            text: t("De keuken ruikt en schommelt in temperatuur. De Belgische kelder zit vaak boven 80 % vochtigheid. Een binnenkast op de eerste verdieping is meestal het beste plekje in huis.", "The kitchen smells and swings in temperature. The Belgian cellar often sits above 80 % humidity. An interior cupboard on the first floor is usually the best spot in the house."),
          },
          {
            title: t("Meet, raad niet", "Measure, do not guess"),
            text: t("Een hygrometer van vijftien euro vertelt u binnen een week of uw kast geschikt is. Zonder meting is bewaren gokken met geld dat u al hebt uitgegeven.", "A fifteen euro hygrometer tells you within a week whether your cupboard is suitable. Without a reading, storing is gambling with money you have already spent."),
          },
          {
            title: t("Scheid sheng en shou", "Separate sheng and shou"),
            text: t("Shou geeft jarenlang zijn aardse geur af en sheng neemt die op. In dezelfde doos verliest u de sheng.", "Shou gives off its earthy scent for years and sheng absorbs it. In the same box you lose the sheng."),
          },
        ],
      },
      {
        type: "note",
        text: t(
          "Als dit u te veel gedoe is: daar bestaat de Puerh Vault voor. Wij doen precies dit, in een gelogde kast in Kortrijk, en u krijgt onderweg proefstukken.",
          "If this is more trouble than you want: that is what the Puerh Vault is for. We do exactly this, in a logged cabinet in Kortrijk, and you get samples along the way.",
        ),
      },
    ],
  },
];

export const guideBySlug = new Map(guideChapters.map((c) => [c.slug, c]));
