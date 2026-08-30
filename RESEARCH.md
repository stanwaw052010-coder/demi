# RESEARCH.md — De Belgische theemarkt online

Onderzoek uitgevoerd voorafgaand aan het ontwerp (etappe 0). Doel: vaststellen wat
Belgische en Vlaamse theewebshops *gemeenschappelijk* hebben, zodat Well's of Yunnan
bewust anders gebouwd kan worden.

> Methodologische opmerking. De ontwikkelomgeving van dit project staat achter een
> egress-proxy die directe HTTP-requests naar externe winkels blokkeert. De observaties
> hieronder zijn samengesteld uit zoekresultaten, winkelbeschrijvingen, categorie-URL's
> en publieke reviewpagina's (Trustpilot), niet uit een handmatige klikdoorloop van elke
> kassa. Waar een bewering onzeker is, staat dat er expliciet bij. De structurele
> conclusies zijn robuust; individuele prijspunten zijn indicatief.

---

## 1. Onderzochte winkels

| # | Winkel | Domein | Type | Positionering |
|---|--------|--------|------|---------------|
| 1 | Thee.be | thee.be | Pure player, groot | "Dé online theewinkel van België". Breed: losse thee, theezakjes, accessoires. NL/EN. |
| 2 | Mingtea | mingtea.be | Pure player, specialist | Losse thee, met een echte Chinese sectie (wit, groen, oolong, pu-erh, zwart). |
| 3 | Theelicieus | theelicieus.be | Pure player, klein | "Verse thee & infusies, puur of unieke blends." Sterk op eigen melanges. |
| 4 | The Tea Collection | teacollection.be | Curator | "Exclusieve theesoorten uit China, India, Nepal, Japan, Sri Lanka, Zuid-Afrika." |
| 5 | Melange Thee | melangethee.be | Winkel + webshop | Familiezaak in Mortsel, 200+ theesoorten en infusies, fysieke winkel. |
| 6 | Cantata Coffee, Tea & Gifts | cantata.be | Koffie + thee + cadeau | 260+ koffies en thees uit 70+ landen, met een zware cadeau-afdeling. |
| 7 | Teaplanet | teaplanet.be | Pure player | Klassieke soortenindeling, inclusief pu-erh. |
| 8 | Simon Lévelt België | simonlevelt.be | Keten (NL-origine) | Koffie en thee sinds 1826, bio-nadruk, filiaalnetwerk. |

Aanvullend als referentie voor het *marktplaats*-gedrag: bol.com/be voert "Chinese thee"
en "Pu-Erh thee" als platte productcategorieën, wat de prijsverwachting van de gemiddelde
Belgische koper mede vormt.

---

## 2. Wat ze gemeenschappelijk hebben

### 2.1 Structuur — de soortenboom, en niets daaronder

Vrijwel elke winkel gebruikt exact dezelfde navigatie-as: **soort thee** als eerste en
vaak enige indeling. Groene thee / zwarte thee / witte thee / oolong / pu-erh / rooibos /
kruidenthee / vruchtenthee. Daaronder zit meestal geen tweede as. Er is geen filter op
oogstjaar, geen filter op regio, geen filter op oxidatiegraad, geen filter op vorm
(los versus cake versus tuocha). Melange Thee en Cantata voegen een cadeau-as toe
(geschenkdozen, pakketten); Simon Lévelt voegt een bio-as toe.

Het gevolg: "Chinese thee" is bij de meeste van deze winkels één landingspagina met een
gemengde lijst, niet een gebied met een eigen logica.

### 2.2 Productpresentatie — de blend wint van de partij

Het dominante aanbod is **gearomatiseerde melange**, niet enkele oorsprong. Beschrijvingen
zijn geschreven in smaak- en sfeertaal ("verse thee & infusies, puur of unieke blends",
"van klassieke smaken tot verrassende blends"). De datavelden die een productpagina
doorgaans toont zijn:

- naam van de melange
- korte sfeeromschrijving
- ingrediëntenlijst (bij melanges wettelijk nodig)
- zetadvies
- gewicht en prijs

Wat vrijwel nooit getoond wordt: **oogstjaar, oogstmaand, hoogte, tuin of producent,
oxidatiegraad, roastniveau, aantal mogelijke infusies, bewaaradvies voor verouderende
thee.** Een pu-erh wordt verkocht als "pu-erh, extra gefermenteerd na oxidatie, aards en
warm" — een soortbeschrijving, geen partijbeschrijving. Voor pu-erh, waar het jaar
letterlijk de helft van de waarde is, is dat een gapend gat.

### 2.3 Zetadvies — de theelepel-en-minuten-standaard

Dit is het meest uniforme punt van de hele markt. Het zetadvies is overal westers
kannetjes-brouwen, en het is overal ongeveer hetzelfde:

- 1 theelepel per kop, of "2 gram op 200 ml"
- groene thee 60–80 °C, 2–3 minuten
- zwarte thee 3–5 minuten
- rooibos: kokend water, 3–5 minuten

Dat advies staat op de verpakking en herhaald op de site, vaak op een aparte
`/zetadvies`-pagina die voor het hele assortiment geldt. Eén stel parameters, één
infusie, klaar. Gongfu — kleine kan, veel blad, korte opeenvolgende infusies — komt in
dit marktsegment praktisch niet voor als *werkinstructie*. Waar het genoemd wordt, is het
een woord in een blogpost, geen gereedschap.

### 2.4 Design — de vriendelijke webshop-standaard

Terugkerend patroon over de hele set:

- warm-neutrale achtergrond (crème, zand, lichtbeige), één warme accentkleur
  (terracotta, oker, roestbruin, of bordeaux)
- productraster van identieke kaarten: vierkante packshot van een zak of blik,
  afgeronde hoeken, zachte grijze schaduw, titel, prijs
- sans-serif interface, vaak één enkele gehumaniseerde grotesk voor alles
- veel iconenrijen ("gratis verzending", "vers gebrand", "familiebedrijf")
- USP-balk onder de header, cadeaubox-banner, nieuwsbriefstrook onderaan
- fotografie: bovenaanzicht van droog blad op hout of linnen, stoom, een houten lepel

Het is niet lelijk. Het is *onderling niet te onderscheiden*. Leg vier van deze homepages
naast elkaar met het logo weggehaald en de meeste kopers kunnen ze niet uit elkaar houden.
Dit is precies de "nog een Shopify-winkel"-uitkomst die vermeden moet worden.

### 2.5 Prijzen — het referentiekader van de Belgische koper

Prijzen konden niet per SKU geverifieerd worden (zie methodologische opmerking). Het
marktbeeld dat uit assortimentsopbouw en categoriepagina's naar voren komt:

- losse melange en instap-enkelvoudige thee: circa **€ 5–12 per 100 g**
- betere enkelvoudige oorsprong bij de curatoren: circa **€ 8–20 per 100 g**
- cadeaudozen en pakketten: **€ 20–45**
- accessoires (theepot, filter, blik): **€ 10–40**

De Belgische koper is dus gewend om thee in stappen van 100 g te kopen, met 100 g als
de mentale eenheid, en om onder de € 20 te blijven. Een gushu-sheng van € 39 per 25 g
bestaat in dit referentiekader niet. Dat is geen probleem — het is een positioneringstaak:
de prijs moet uitgelegd worden door het paspoort, niet door de verpakking.

### 2.6 Diensten — dun

Workshops en proeverijen bestaan in België (een theesommelier in Gent geeft workshops en
theeceremonies, een theesalon in Antwerpen aan het Hendrik Conscienceplein), maar ze zijn
**losgekoppeld van de webshops**. De winkel verkoopt; de workshop wordt elders geboekt,
vaak per e-mail. Geen van de onderzochte webshops verkoopt bewaring, veroudering,
verticale proeverijen of een herkomstcertificaat als product.

---

## 3. Waar het gat zit

Samengevat: de Belgische online theemarkt verkoopt **smaak zonder herkomst** en
**instructie zonder gereedschap**. Er is geen enkele winkel in de onderzochte set die
zich gedraagt als een theehuis in plaats van als een kruidenier.

De zes breekpunten voor Well's of Yunnan, en hoe ze in de site verankerd worden — als
structuur en copy, niet als een "onze voordelen"-blok met iconen:

| # | Breekpunt | Waar het in de site zit |
|---|-----------|-------------------------|
| 1 | **Partijpaspoort** — jaar, maand, hoogte, tuin, producent, oxidatie, roast, bewaring bij elke thee | Vast datablok op elke productpagina; jaar en regio staan al in het catalogusraster; oogstjaar en regio zijn *filters* |
| 2 | **Gongfu-eerst** — parameters per infusie en een werkende timer, in plaats van "1 theelepel, 3 minuten" | Gongfu-timer op de productpagina, met de echte infusiereeks van die thee; westers zetadvies staat eronder als het alternatief, niet als de norm |
| 3 | **Puerh Vault** — bewaring in klimaatcontrole 3–10 jaar, met certificaat, ophalen of doorverkopen wanneer je wil | Eigen pagina met mechaniek en tarieven; als optie zichtbaar bij elke cake |
| 4 | **Verticale proeverijen** — één tuin, meerdere jaren, in één set | Set "Puerh Verticaal", en de jaar-as in de catalogus die dat mogelijk maakt |
| 5 | **Live proeverijen in België** — Gent, Kortrijk, Brussel, met inschrijving op de site | Eigen pagina met echt inschrijfformulier, niet een e-mailadres |
| 6 | **Eerlijkheid** — geen berg op het etiket die er niet is; matcha staat als Japanse gastcollectie | Matcha-collectie draagt haar eigen inleiding; de herkomstsectie op de home benoemt wat we *niet* weten |

Deze zes moeten binnen 30 seconden van de homepage af te lezen zijn, zonder dat er een
voordelenblok met iconen op staat.

---

## 4. Ontwerpconsequenties

Wat het onderzoek direct oplegt aan het ontwerp:

1. **Geen kaartenraster met schaduw.** Het gedeelde visuele handschrift van de markt zit
   in de identieke afgeronde kaart. De catalogus wordt daarom een *register* met haarlijnen.
2. **Data is de decoratie.** De winkels vullen hun pagina's met sfeerfoto's omdat ze geen
   data hebben. Wij hebben data; die vult de pagina.
3. **De kleur van het aftreksel is het merkteken.** Geen enkele concurrent gebruikt de
   werkelijke aftrekselkleur als informatiedrager. Het is meteen herkenbaar en het is
   inhoudelijk waar.
4. **Tweede as in de navigatie.** Naast soort ook regio en jaar, want dat is precies de
   as die niemand heeft.
5. **De prijs moet zichzelf verdedigen.** Elke prijs boven het marktreferentiekader staat
   naast het paspoort dat hem verklaart, nooit alleen.

---

## Bronnen

- [Thee.be](https://thee.be/) · [losse thee](https://thee.be/en/loose-leaf-tea/) · [groene thee](https://thee.be/en/loose-leaf-tea/green-tea/)
- [Mingtea](https://www.mingtea.be/nl/) · [Pu Erh thee](https://www.mingtea.be/nl/thee-naturel/pu-erh-thee/)
- [Theelicieus](https://www.theelicieus.be/)
- [The Tea Collection](https://teacollection.be/)
- [Melange Thee — Oolong & Pu'Er](https://melangethee.be/collections/oolong-pu-erh-1) · [reviews](https://www.trustpilot.com/review/melangethee.be)
- [Cantata Coffee, Tea & Gifts](https://cantata.be/collections/groene-thee) · [reviews](https://www.trustpilot.com/review/cantata.be)
- [Teaplanet — pu-erh](https://www.teaplanet.be/pu-erh)
- [Simon Lévelt België — Oolong & Puerh](https://www.simonlevelt.be/thee/soorten-thee/oolong-puerh)
- [bol.com/be — Chinese thee](https://www.bol.com/be/nl/l/chinese-thee/20616/4278093601/) · [Pu-Erh thee](https://www.bol.com/be/nl/l/pu-erh-thee/60240/)
- [Thee startpagina België — theesalons, speciaalzaken, workshops](https://thee.startpagina.be)
- Zetadvies-referentie: [Simon Lévelt](https://www.simonlevelt.nl/nl/smaakvraag-perfecte-kop-thee.html), [De Theebaron](https://www.detheebaron.nl/weetjes/zetadvies/), [Huis van Thee](https://www.huisvanthee.nl/service/zetadvies/)
