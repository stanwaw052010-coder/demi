# DESIGN.md — Well's of Yunnan

Ontwerpdocument, etappe 0. Vastgelegd vóór de eerste regel code, daarna zelf tegen het
licht gehouden (zie § 8).

---

## 1. Het idee in één zin

**Het register.** Een Belgische theewinkel verkoopt een stemming; wij verkopen een
vastlegging. De site ziet er daarom uit als een veldregister — geliniëerd, geannoteerd,
precies — maar getekend in zacht groen en wit, zodat het leeft in plaats van klinisch is.

Waar dat vandaan komt: het enige wat Well's of Yunnan heeft en de markt niet heeft, is
*data over de partij*. Jaar, maand, hoogte, tuin, oxidatie, aantal infusies. Een winkel
die dat als zijn kern heeft, moet er niet uitzien als een winkel die sfeerfoto's heeft.
De pagina wordt gevuld door wat we weten, niet door wat we fotograferen.

En het tweede: thee heeft een eigen kleur. De kleur van het aftreksel is geen decoratie —
het is de meest directe beschrijving van wat er in het kopje komt. Die kleur wordt de
enige verzadigde kleur op de hele site en draagt informatie.

---

## 2. Palet

Vastgelegd door de klant: zachtgroen en wit. Binnen die gang, warm gehouden — geen
apotheek. De sage is met een gele ondertoon gemengd zodat het naar blad neigt en niet naar
mint; de paper heeft een groene ondertoon in plaats van een gele, zodat we nooit in het
verboden crème-gebied belanden.

| Token | Hex | Rol |
|---|---|---|
| `--paper` | `#FCFDFA` | hoofdachtergrond, wit met groene ondertoon |
| `--mist` | `#E7EFE3` | sectievullingen, rustvlakken |
| `--sage` | `#9FBE96` | de handtekeningkleur: haarlijnen, het merk, accenten. **Nooit tekst.** |
| `--pine` | `#2E4A3A` | knoppen, links, actieve toestanden |
| `--ink` | `#16211B` | hoofdtekst |
| `--stone` | `#78857B` | secundaire tekst, meta, labels |
| `--amber` | `#C08A3E` | precies één accent: kleur van het aftreksel. Alleen afgeprijsde prijzen en de infusie-indicator. Nooit decoratief. |
| `--cinnabar` | `#9E3B2E` | uitsluitend het zegel 云南井, precies één plek op de site (Over ons) |

**Contrastcontrole.** `--sage` op `--paper` haalt ongeveer 2,0:1 — ruim onder AA. Sage is
dus een *lijnkleur en vlakkleur*, nooit een tekstkleur, ook niet voor kleine labels. Tekst
is altijd `--ink` (≈ 15:1 op paper) of `--stone` (≈ 4,7:1, alleen ≥ 14 px). `--pine` op
`--paper` ≈ 8,9:1 en `--paper` op `--pine` idem, dus knoppen zijn veilig in beide
richtingen. `--amber` op paper haalt ≈ 3,2:1: bruikbaar als vlak en als grote cijfers,
niet als lopende tekst — de afgeprijsde prijs krijgt daarom een donkerder variant voor het
cijfer zelf en amber alleen als drager.

### De aftrekselschaal — `--liquor-*`

Geen sierkleuren. Dit is een informatieschaal: de werkelijke kleur van het aftreksel per
theesoort. Hij verschijnt in de druppel-swatch in de catalogus, in de gongfu-timer, en in
de gegenereerde productbeelden.

| Token | Hex | Soort |
|---|---|---|
| `--liquor-green` | `#D8DCA6` | groene thee |
| `--liquor-white` | `#EBE4C0` | witte thee |
| `--liquor-oolong` | `#D9A85C` | oolong |
| `--liquor-red` | `#A44A2A` | rode thee (hongcha) |
| `--liquor-shou` | `#4A2318` | shou pu-erh |
| `--liquor-sheng` | `#C9942F` | sheng pu-erh |
| `--liquor-matcha` | `#7FA23F` | matcha |
| `--liquor-yellow` | `#DFCE87` | gele thee |

---

## 3. Typografie

Twee duidelijk verschillende gezichten, plus één voor de karakters.

- **Display — Newsreader** (variabel, optical sizing, met cursief). Koppen, theenamen,
  citaten. Cursief uitsluitend voor Latijnse en getranscribeerde namen: *Camellia sinensis
  var. assamica*, *Bīngdǎo Gǔshù*. Nooit om een woord te benadrukken.
- **Interface — Inter Tight.** Navigatie, knoppen, alle cijfers en paspoortvelden,
  kassa. Tabulaire cijfers aan voor alles wat in kolommen staat.
- **Karakters — Noto Serif SC.** Alleen waar het teken betekenis draagt: de theenaam
  (老班章), het merkteken 井, het zegel 云南井. Nergens als sfeer.

Schaal, na *The Elements of Typographic Style*: één modulaire reeks op 1,25 met de
lopende tekst op 17 px / 1,7 en de displayregels optisch gecorrigeerd. Regellengte
maximaal 68 tekens (`max-width: 34em` bij serif-lopende tekst). Serif-tekst krijgt de
grotere interlinie; interface-tekst de strakkere.

```
12 / 13 / 14      interface, meta, paspoortlabels        Inter Tight
15 / 17           lopende tekst                          Newsreader 17, Inter Tight 15
21 / 26           tussenkop, theenaam in het register    Newsreader
34 / 44 / 58      sectiekop                              Newsreader
72 … 132 (clamp)  wordmark in de hero                    Newsreader
```

---

## 4. Raster en compositie

12 kolommen, marge `clamp(20px, 5vw, 96px)`, goot 24 px. **Asymmetrisch.** De inhoud staat
links; kolommen 1–3 zijn de *kantlijn* en dragen annotatie: jaar, regio, hoogte, aantal
infusies. Dat is precies de rijmslag met het register-idee, en het is de plek waar
concurrenten niets te zetten hebben.

Centreren gebeurt alleen op de twee "poort"-pagina's: het heroscherm en de
bedankpagina. Nergens anders.

Verticaal ritme: `clamp(120px, 14vh, 200px)` tussen secties op desktop. Ruim.

**Geen kaarten.** De structuurdrager is de **haarlijn** van 1 px in `--sage`. Secties
worden gescheiden door volle-breedte haarlijnen; productlijsten zijn rijen in een register
met haarlijnen ertussen. Radius overal 0, behalve waar iets werkelijk rond is (de druppel,
de timer, het merkteken).

**Metaregels zonder middenpunt.** Meta wordt gezet als label-waardeparen onder elkaar, of
naast elkaar gescheiden door een dunne verticale regel (`border-left`). Nooit met `·`.

---

## 5. Wireframe — Home

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [井] Well's of Yunnan        Thee  Collecties  Zetgids  Vault  Journaal      │  header, haarlijn onder
│                                              NL/EN   Zoek   Winkelmand (0)   │  46px hoog, sticky, geen schaduw
╞═════════════════════════════════════════════════════════════════════════════╡
│                                                                             │
│                    ·  het enige gecentreerde scherm  ·                      │
│                                                                             │
│                          [井]                                               │
│                     Well's of Yunnan                                        │  Newsreader, clamp(72,132)
│                                                                             │
│              Thee met een adres. Berg, jaar, tuin.                          │  één regel, geen slogan
│                                                                             │
│                  ╭── de infusievlek loopt hier ──╮                          │  SVG feTurbulence, 2,2 s
│                  ╰──────  vanuit rechts  ───────╯                           │  1× per sessie
│                                                                             │
│   Kortrijk, België        │  28 partijen        │  oogst 2015 – 2024        │  kantlijnband, verticale regels
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌ kantlijn ┐ ┌──────────── inhoud, kolom 4–11 ────────────────────────────┐ │
│  │ 八大茶类  │ │  Acht soorten thee                                        │ │
│  │ acht     │ │                                                           │ │
│  │ soorten  │ │  ◖ HORIZONTAAL — scroll-jacking over ~2 schermen ◗         │ │  desktop: pin + translateX
│  │          │ │  ┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐         │ │  mobiel: swipe-carrousel
│  │          │ │  │sheng││shou││oolo││wit ││rood││groe││geel││matc│         │ │  elk paneel: druppel in
│  │          │ │  └────┘└────┘└────┘└────┘└────┘└────┘└────┘└────┘         │ │  echte aftrekselkleur +
│  │          │ │  ───────────────●───────────────────────  voortgang        │ │  oxidatiegraad + karakter
│  └──────────┘ └───────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│  Nu in de kan                                          alle 28 partijen     │
│                                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │  register, geen kaarten
│  ● Bīngdǎo Gǔshù            冰岛古树   Lincang, 1750 m    2021   € 39 / 25 g │  ● = druppel in aftrekselkleur
│  ─────────────────────────────────────────────────────────────────────────  │  hover: druppel vult zich,
│  ● Dà Hóng Páo Zhèngyán     大红袍     Wuyi, rots         —      € 34 / 25 g │  naam krijgt onderstreping.
│  ─────────────────────────────────────────────────────────────────────────  │  geen scale, geen schaduw
│  ● … 6 rijen                                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌ kantlijn ┐ ┌── kaart van Yunnan en de bergen, SVG ──────────────────────┐ │
│  │ Waar het │ │      ╱╲    ·Lincang    ·Menghai                            │ │  topografie in haarlijnen,
│  │ vandaan  │ │    ╱   ╲__      ·Yiwu                                      │ │  6 punten aanklikbaar →
│  │ komt     │ │   ╱  Yunnan ╲       ·Fuding  ·Wuyi  ·Anxi                  │ │  filtert de catalogus
│  │          │ │                                                            │ │
│  │ Wat we   │ │  "Van drie partijen kennen we de tuin niet. Dat staat er   │ │  ← eerlijkheid, punt 6,
│  │ niet     │ │   dan ook bij."                                            │ │    als tekst, niet als icoon
│  │ weten    │ │                                                            │ │
│  └──────────┘ └────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│  Zo zetten wij thee                                            (échte reeks) │
│                                                                             │
│   1 ─────────── 2 ─────────── 3 ─────────── 4                               │  genummerd, want het ís
│   spoelen       eerste        de reeks      het natte blad                  │  een volgorde
│   5 s           10 s          +5 s per      lezen                           │
│                               infusie                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌ Uit het journaal ─────────────┐ ┌ Puerh Vault ──────────────────────────┐ │  asymmetrisch: 5 / 7
│  │ Waarom pu-erh ouder wordt en │ │ Wij bewaren je cake 3 tot 10 jaar in  │ │
│  │ beter                        │ │ klimaatcontrole. Jij krijgt een       │ │
│  │ [uitsnede, 3 regels]         │ │ certificaat en haalt hem op wanneer   │ │
│  └──────────────────────────────┘ │ je wil.        [ Hoe het werkt ]      │ │
│                                   └───────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│  Proeverijen  Gent · Kortrijk · Brussel → inschrijfregel                    │  (geen ·, zie § 4 — hier
├─────────────────────────────────────────────────────────────────────────────┤   in het wireframe alleen
│  Brief: acht keer per jaar, als er iets binnenkomt dat het waard is.        │   als schets)
├─────────────────────────────────────────────────────────────────────────────┤
│ [井]  Well's of Yunnan     Thee | Zetgids | Vault | Over ons | Voorwaarden   │
│ gestapeld logo            BE 0785.xxx.xxx   wellsofyunnan.be                │
└─────────────────────────────────────────────────────────────────────────────┘
```

De zes breekpunten zijn hierin verwerkt zonder voordelenblok: het paspoort zit in het
register (regio, hoogte, jaar per rij), gongfu zit in "Zo zetten wij thee", de Vault heeft
een eigen vlak, de verticale proeverij zit in de sets, de live proeverijen hebben een
strook, en de eerlijkheid staat als zin in het herkomstblok.

## 5b. Wireframe — Productpagina

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ header                                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ Thee / Sheng pu-erh / Bīngdǎo Gǔshù 2021                                    │  kruimelpad
├───────────────────────────────┬─────────────────────────────────────────────┤
│                               │  Bīngdǎo Gǔshù                              │  Newsreader 44
│   ┌───────────────────────┐   │  冰岛古树                                    │  Noto Serif SC, betekenisdragend
│   │                       │   │                                             │
│   │  gegenereerd beeld    │   │  Lincang, Yunnan. Oogst april 2021,         │  lopende tekst,
│   │  (of /products/x.jpg) │   │  1750 m, bomen van 200 jaar en ouder.       │  rustig, geen marketing
│   │  view-transition:     │   │                                             │
│   │  gedeeld element      │   │  ── PASPOORT ──────────────────────────     │
│   │                       │   │  Regio          Bingdao, Mengku, Lincang    │  label/waarde, geen ·
│   └───────────────────────┘   │  Hoogte         1 750 m                     │
│   ▫ droog  ▫ aftreksel        │  Oogst          april 2021                  │
│   ▫ nat blad  ▫ verpakking    │  Tuin           coöperatie Bingdao Laozhai  │
│                               │  Oxidatie       < 8 %, niet-gefermenteerd   │
│                               │  Cafeïne        hoog                        │
│                               │  Bewaring       droog, 60–70 % RV           │
│                               │                                             │
│                               │  ○ 25 g  € 39,00                            │  radiogroep, geen select
│                               │  ○ cake 357 g  € 420,00                     │
│                               │  [ In de mand ]                             │  vulling stijgt van onder
│                               │  Ook op te slaan in de Puerh Vault          │
├───────────────────────────────┴─────────────────────────────────────────────┤
│  ┌ GONGFU-TIMER ────────────────┐  ┌ Smaakwiel ──────────────────────────┐  │
│  │        ╭─────────╮           │  │        honing                        │  │
│  │      ╱   infusie   ╲         │  │     ╱      │      ╲                  │  │  radiaal, 5 assen,
│  │     │      3        │        │  │  ijsbloem ─┼─ suikerriet             │  │  gevuld in aftrekselkleur
│  │     │    0:20       │        │  │     ╲      │      ╱                  │  │
│  │      ╲  ●●●○○○○○  ╱          │  │       bergkruid                      │  │
│  │        ╰─────────╯           │  └──────────────────────────────────────┘  │
│  │  gaiwan 110 ml, 7 g, 95 °C   │                                            │
│  │  cirkel = gaiwan van boven;  │  ┌ Europees ───────────────────────────┐  │
│  │  vult zich in de kleur van   │  │ 3 g op 300 ml, 90 °C, 3 min,        │  │  het alternatief,
│  │  déze infusie                │  │ twee keer te gebruiken              │  │  bewust ondergeschikt
│  └──────────────────────────────┘  └──────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Verwante partijen — register van 3 rijen                                    │
│  Wat anderen zeiden — 2–3 beoordelingen, sober gezet                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

Mobiel is geen samengedrukte desktop: de galerij wordt een swipe, de koopknop wordt sticky
onderaan, en de timer gaat schermvullend.

---

## 6. Animatie

Eén sterke georkestreerde scène, en verder alleen precieze microreacties. Geen
fade-and-slide-up op elke sectie.

**De handtekening — het aftreksel (infusion).** Bij de eerste keer laden loopt vanuit een
punt rechts in de hero een diffuse vlek uit in de kleur van het aftreksel: SVG
`feTurbulence` + `feDisplacementMap` over een radiale vorm, ~2,2 s, daarna lichter wordend
en bezinkend, met een zachtgroene waas en het opgekomen wordmark als residu. Eén keer per
sessie (`sessionStorage`), harde limiet 2,5 s, elke klik of scroll slaat over.

**Tweede handtekening — de gongfu-timer.** De cirkel is de gaiwan van boven. Elke infusie
vult de cirkel in de kleur van *die* infusie: infusie 1 licht, 3–5 verzadigd, richting 8
weer bleek — de curve komt uit de data van de thee, niet uit een animatiepreset. Geluid
optioneel, trilling op mobiel. Werkt met `prefers-reduced-motion` gewoon door; alleen de
overgangen worden dan hard.

Verder, terughoudend:

- Lenis voor de scroll. Parallax hooguit 2 lagen, hooguit 12 % verplaatsing.
- "Acht soorten thee": scroll-jacking over ~2 schermen met voortgangslijn; mobiel een
  gewone swipe-carrousel.
- Registerrij bij hover: **alleen** de druppel vult zich met de aftrekselkleur, en de naam
  krijgt een onderstreping. Geen scale, geen schaduw.
- Paginaovergangen: View Transitions API, gedeeld element is het productbeeld.
- In de mand: een blad vliegt van de rij naar het mandje (≤ 600 ms), de teller veert één
  keer.
- Knoppen: de vulling stijgt van onderaf op (`scaleY`, `transform-origin: bottom`), zoals
  thee in een kop.
- Binnenkomen van inhoud: alleen `opacity` en 8 px verschuiving, één keer, en op **hoogstens
  vier plekken per pagina** — daar waar het ritme zet.

Technisch: alleen `transform` en `opacity`, `will-change` puntsgewijs en weer weg,
`prefers-reduced-motion: reduce` schakelt al het decoratieve uit terwijl de timer blijft
werken, en geen enkele layoutverschuiving (alle beeldvlakken hebben een vaste
aspect-ratio).

---

## 7. Beeld zonder foto's

Er zijn geen foto's. In plaats van grijze plaatshouders wordt de beeldlaag gegenereerd:
gelaagde SVG (macro-bladnerven, aftrekselcirkels, silhouet van gaiwan en cake, topografie
van Yunnanese terrassen), CSS-verlopen in de `--liquor-*`-schaal, en korrel via een
SVG-ruisfilter. `<ProductImage>` kijkt eerst naar `/public/products/{slug}.jpg` en valt
terug op de gegenereerde compositie, zodat vervanging door echte fotografie één bestand
kopiëren is. De benodigde opnames staan in `PHOTOS.md`.

---

## 8. Zelfkritiek

Hieronder het plan hierboven langs de verbodenlijst en langs de vraag: *zou ik hetzelfde
gemaakt hebben voor eender welke andere winkel?* Wat niet slaagde, is herschreven.

### 8.1 Langs de verbodenlijst

| Verbod | Uitkomst |
|---|---|
| crème `#F4F1EA` + terracotta `#D97757` | **Slaagt.** Paper heeft een groene ondertoon, het enige warme accent is amber `#C08A3E` en is aan één betekenis gebonden. |
| identieke kaarten, radius 12, zachte grijze schaduw | **Slaagde niet in de eerste versie.** Ik had "Nu in de kan" als raster van zes productkaarten getekend — precies het marktpatroon. **Herschreven:** het is nu een register van rijen met haarlijnen, radius 0, zonder schaduw. Op de catalogus blijft een driekoloms raster, maar de cel is een *veld* met haarlijnen, geen zwevende kaart. |
| gespatieerde CAPS-eyebrows boven elke kop | **Slaagde niet.** Mijn eerste kantlijn was "HERKOMST", "IN DE KAN" in kleine caps — dat is dezelfde tic met een ander adres. **Herschreven:** de kantlijn draagt nu *gegevens* (八大茶类 / acht soorten, aantallen, jaarbereik) in normale schrijfwijze, of hij is leeg. |
| metaregels met `·`, `WOORD — fragment`, `→` in knoptekst | **Aangescherpt.** Meta is label/waarde onder elkaar, of gescheiden door een dunne verticale regel. Knoppen krijgen werkwoorden: "In de mand", "Hoe het werkt", "Schrijf je in". Geen pijlen in knoplabels. |
| één woord in de kop gekleurd of cursief | **Slaagt.** Cursief is voorbehouden aan transcripties en botanische namen; die regel staat hard in de typografie. |
| verlopen als decoratie | **Randgeval, expliciet begrensd.** Verlopen bestaan alleen als *aftreksel*: in de druppel, in de timer, in de gegenereerde beelden. Nergens als achtergrondsfeer. |
| 01 / 02 / 03 waar het geen echte volgorde is | **Slaagt.** Nummers staan alleen in "Zo zetten wij thee" en in de zetgids, waar het stappen zijn. De acht soorten en de collecties zijn ongenummerd. |

### 8.2 "Zou dit voor eender welke winkel werken?"

Eerste eerlijke antwoord: **deels, en dat was het probleem.** Haarlijnen, veel wit, een
serif display en een asymmetrisch raster — daarmee kun je net zo goed een keramiekwinkel
of een architectenbureau maken. Dat is smaak, geen identiteit.

Wat het *wel* aan deze winkel bindt, en wat ik daarom zwaarder heb aangezet:

1. **De aftrekselkleur als enige verzadigde kleur, en als informatie.** Een sieradenwinkel
   heeft geen `--liquor-*`-schaal. Deze schaal bepaalt nu de druppel in het register, de
   vulling van de timer, de acht panelen van de horizontale sectie en de gegenereerde
   beelden. Haal hem weg en de site valt uit elkaar — dat is de toets voor een echt
   merkelement.
2. **De kantlijn draagt paspoortdata.** Kolommen 1–3 bestaan omdat er jaar, hoogte en tuin
   in moeten. Bij een winkel zonder herkomstdata staat die kolom leeg en klopt het raster
   niet meer. De lay-out is dus een gevolg van het assortiment.
3. **De timer is geen versiering maar de kern van het aanbod.** Het is het enige element op
   de site dat de bezoeker *gebruikt* terwijl hij thee drinkt. Daarmee is het geen
   webshop-feature maar het product zelf.
4. **井 als raster.** Het logo is vier lijnen die in het midden een vierkant maken; dat
   vierkant is dezelfde figuur als de kruising van de haarlijnen in de lay-out. Het merk en
   het raster zijn hetzelfde ding — dat is niet overdraagbaar naar een ander merk.

Wat ik daarop heb aangepast: de hero was in de eerste versie een stille typografische
pagina met de vlek erachter. Dat was mooi en inwisselbaar. Nu staat onder de wordmark een
kantlijnband met drie harde gegevens (plaats, aantal partijen, oogstbereik) — de eerste
zin die de bezoeker leest is dus een feit, niet een belofte.

### 8.3 Wat ik bewust laat staan als risico

- **Scroll-jacking** is een gok. Het is verdedigbaar omdat de acht soorten een echte
  volgorde van oxidatie zijn en horizontaal lezen dat spiegelt. Het krijgt een
  voortgangslijn, het is met toetsenbord door te lopen, het valt weg bij
  `prefers-reduced-motion`, en op mobiel is het gewoon een swipe.
- **Geen foto's** betekent dat de site staat of valt met de kwaliteit van de gegenereerde
  beeldlaag. Als die zwak is, ziet het eruit als een onaf project. Daarom krijgt de
  compositie per theesoort een eigen structuur en niet één sjabloon met een andere kleur.
- **Register in plaats van kaarten** kan koud aanvoelen. De tegenmaatregel is
  typografisch: de theenaam staat in Newsreader op 26 px met ruime interlinie, zodat de rij
  leest als een regel uit een boek en niet als een regel uit een spreadsheet.

---

## 9. De regel van Chanel

Aan het eind van etappe 6 gaat er één decoratief element uit. Kandidaat op voorhand: de
korrellaag over de hero. Definitief besluit na de schermafbeeldingen.
