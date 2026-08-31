# Well's of Yunnan

De webshop van een Belgisch theehuis dat Chinese thee per partij inkoopt en bij
elke thee vertelt uit welk jaar, van welke berg en van welke tuin ze komt.

Nederlands (nl-BE) en Engels, met gelokaliseerde paden: `/nl/thee/da-hong-pao`
en `/en/tea/da-hong-pao`.

## Aan de praat

```bash
npm install
npm run dev
```

Meer is er niet. Er zijn **geen sleutels nodig**: de betaling wordt gesimuleerd,
de bevestigingsmail gaat naar de console, en de bestelling wordt op schijf gezet
in `.data/orders.json`. De hele koopweg tot en met de bevestigingspagina werkt
op een laptop zonder één account.

```bash
npm run build      # productiebuild, 172 pagina's
npm start          # productieserver
npm run lint       # eslint, schoon
npm run typecheck  # tsc --noEmit, schoon
```

## Waar wat staat

```
content/            de inhoud, getypeerd, zonder CMS
  types.ts          Product, Passport, Gongfu — de vorm van alles
  products.ts       42 artikelen: 30 thees, 9 stuks gerei, 3 sets
  taxonomy.ts       gebieden en de smaakwoordenschat achter het smaakwiel
  collections.ts    tien collecties, elk met een eigen inleiding
  guide.ts          zes hoofdstukken zetgids, als blokken
  journal/          zes stukken in MDX, per taal, plus de metadata
  quiz.ts           vijf vragen met hun weging
  vault.ts          termijnen en tarieven van de Puerh Vault
  tastings.ts       de sessies in Gent, Kortrijk en Brussel

messages/           nl.json en en.json: alle interfaceteksten
                    (sleutelpariteit tussen beide is een harde eis)

src/
  i18n/routing.ts   de gelokaliseerde padkaart; hier komt fr ooit bij
  proxy.ts          taalonderhandeling en de rewrite naar de interne route
  lib/
    catalog.ts      de enige toegang tot de inhoud — zie hieronder
    pricing.ts      herrekent elke bestelling op de server
    vat.ts          6 % op thee, 21 % op gerei en bonnen
    shipping.ts     bpost, Mondial Relay, afhalen
    payments.ts     Mollie, Stripe, en de mock ertussenuit
    liquor.ts       de aftrekselschaal en de kleurcurve van de infusies
    alternates.ts   canonical en hreflang uit de padkaart
  components/
    brand/          het logo in drie varianten en het zegel
    visuals/        de getekende beeldlaag
    product/        paspoort, smaakwiel, gongfu-timer
    catalog/        het register en het raster
  app/[locale]/     de pagina's
```

## Een thee toevoegen

Eén bestand. Zet een object in de array in `content/products.ts`:

```ts
{
  slug: "shui-xian-lao-cong",          // ook de URL, in beide talen
  name: "Shui Xian Lao Cong",
  hanzi: "老丛水仙",                    // alleen als het teken iets betekent
  pinyin: "Lǎocóng Shuǐxiān",
  category: "oolong",
  form: "loose",                        // loose | cake | tuocha | powder | object
  liquor: "oolong",                     // stuurt de druppel, de timer, de tekening
  caffeine: "medium",
  notes: ["oldWood", "orchid"],         // sleutels uit content/taxonomy.ts
  vat: 6,                               // 6 voor thee, 21 voor gerei en bonnen
  passport: { /* … */ },
  gongfu:   { /* … */ },                // null voor gerei en matcha
  western:  { /* … */ },
  variants: [{ sku: "WY-OO-SX-25", grams: 25, price: 2000, stock: 30 }],
  copy: { tagline: { nl: "…", en: "…" }, description: { nl: "…", en: "…" } },
}
```

Wat vanzelf meekomt: de detailpagina in beide talen, de facetten in de
catalogus, de sitemap, de JSON-LD, de gongfu-timer met de eigen infusiereeks,
het smaakwiel, en een getekend beeld dat uit de slug volgt.

Drie regels om te onthouden:

- **Prijzen zijn centen**, inclusief btw, zoals op het schap. `2000` is € 20,00.
- **Een degustatienoot moet in `content/taxonomy.ts` staan.** Dat is geen
  bureaucratie: die lijst is precies wat het smaakwiel op zes assen uitzet, en
  de vertalingen staan onder `flavour` in beide `messages`-bestanden.
- **Een leeg paspoortveld is een antwoord.** `producer: null` drukt af als "niet
  opgegeven". Vul geen "Yunnan" in waar u "wij weten het niet" bedoelt; het veld
  `unknown` is er om dat uit te leggen.

Voor gerei: `category: "teaware"`, `vat: 21`, `passport`, `gongfu` en `western`
op `null`, en een lijntekening in `src/components/visuals/ObjectSilhouette.tsx`.

## Mollie aansluiten

Zet één regel in `.env`:

```bash
MOLLIE_API_KEY=<uw-mollie-testsleutel>
```

Meer niet. `src/lib/payments.ts` schakelt over zodra de sleutel er is, en de
kassa stuurt de klant naar de gehoste betaalpagina van Mollie in plaats van de
betaling te simuleren. Mollie is de eerste keus omdat Bancontact, iDEAL en
Payconiq er standaard in zitten; zonder die drie is een Belgische kassa geen
Belgische kassa.

Stripe werkt ook (`STRIPE_SECRET_KEY`) en wordt alleen gebruikt als er geen
Mollie-sleutel staat. Beide praten rechtstreeks met de REST-API, dus er is geen
SDK geïnstalleerd en er valt niets te updaten.

Valt de provider uit, dan gaat de bestelling **niet** verloren: ze staat op
schijf voordat de betaling begint, en de kassa valt terug op een gesimuleerde
betaling zodat de klant op de bevestigingspagina landt.

Voor de webhook: `POST /api/orders` maakt de betaling aan; een
`webhookUrl` is voorzien in `PaymentRequest` maar wordt nog niet doorgegeven,
omdat er in deze installatie geen statusverwerking achter zit.

## Resend aansluiten

```bash
RESEND_API_KEY=<uw-resend-sleutel>
MAIL_FROM=Well's of Yunnan <hallo@wellsofyunnan.be>
RESEND_AUDIENCE_ID=<uw-audience-id>   # alleen voor de brief
```

Zonder sleutel logt `src/lib/mail/send.ts` wat het verstuurd zou hebben en gaat
de bestelling gewoon door. De mail zelf staat in `src/lib/mail/templates.ts`,
in de taal van de bestelling en in de eigen vormgeving, met het merkteken als
inline SVG zodat er geen beeld geladen hoeft te worden.

## Bestellingen

`POST /api/orders` valideert met zod en **herrekent daarna elke prijs uit de
catalogus op basis van de SKU**. Wat de browser over geld meestuurt wordt
genegeerd; een onbekende SKU wordt geweigerd. Btw wordt per tarief gesplitst,
de korting naar rato over de tarieven verdeeld en de verzendkosten pro rata
toegewezen.

Opslag zit achter vier functies in `src/lib/orders/store.ts`
(`nextOrderNumber`, `saveOrder`, `getOrder`, `listOrders`). Nu is dat een
JSON-bestand; Drizzle met SQLite erachter zetten is die vier functies opnieuw
schrijven en verder niets. Nummers lopen als `WY-2026-0001`, per jaar.

## Op Vercel zetten

Importeren en bouwen, verder niets: er zijn geen verplichte omgevingsvariabelen.
Zet wel `NEXT_PUBLIC_SITE_URL` op het echte domein, anders wijzen de canonieke
URL's, de sitemap en de Open Graph-beelden naar `wellsofyunnan.be` in plaats van
naar uw deploy.

Twee dingen die u moet weten voor u er echt op verkoopt.

**Bestellingen overleven een serverless host niet.** Het bestandssysteem van een
functie is alleen-lezen, dus `src/lib/orders/store.ts` wijkt daar uit naar de
tijdelijke map. De kassa blijft werken en de bevestigingsmail gaat gewoon uit,
maar wat er geschreven wordt leeft alleen binnen één warme instantie en is na
een nieuwe deploy weg. Concreet: iemand die net betaald heeft en de
bevestigingspagina opent, kan door een andere instantie bediend worden. Daarom
toont die pagina in dat geval geen "deze bestelling kennen wij niet" maar
"uw bestelling is genoteerd", met het nummer erbij en de verwijzing naar de mail.

Voor een echte winkel vervangt u die vier functies door een database. Alles wat
de rest van de app ervan gebruikt staat in dat ene bestand:
`nextOrderNumber`, `saveOrder`, `getOrder`, `listOrders`. Met een echte database
verdwijnt ook het achtervoegsel achter het bestelnummer: dat staat er alleen om
te voorkomen dat twee instanties hetzelfde nummer uitdelen.

**Foto's moeten meegebundeld worden.** `<ProductImage>` leest
`public/products` om te kiezen tussen een foto en de tekening. Een functie heeft
geen `/public`, dus `outputFileTracingIncludes` in `next.config.ts` neemt die map
mee. Zonder die regel zouden de statisch gebouwde productpagina's foto's tonen en
de dynamisch gerenderde catalogus tekeningen. Zet u er straks 120 echte foto's
in, verhuis ze dan naar een CDN of een `<Image loader>` in plaats van ze in elke
functie mee te sturen.

## De inhoudslaag vervangen

Geen enkele pagina importeert `content/products` rechtstreeks; alles loopt via
`src/lib/catalog.ts`. Wie later naar Sanity of Shopify wil, herschrijft dat ene
bestand en houdt de vorm uit `content/types.ts` aan.

## Wat u moet weten voor u iets verandert

- **De aftrekselschaal draagt informatie.** `--liquor-*` is de werkelijke kleur
  van het kopje en stuurt de druppel, de timer en de tekeningen. Het is geen
  sierpalet.
- **`--sage` is nooit tekst** (2,0:1) en `--amber` ook niet (3,0:1). De gemeten
  tabel staat in `DESIGN.md` § 2.
- **De gongfu-timer blijft draaien bij `prefers-reduced-motion`.** Al het
  decoratieve gaat daar uit; een timer die stilstaat is stuk.
- **De vlek in de hero heeft een masker** dat haar uit de middenkolom houdt.
  Zonder dat masker zakt de hero-tekst tijdens de scène naar 3,0:1. Zie
  `DESIGN.md` § 8.4.
- **`.wy-reveal` doet alleen een verschuiving, geen fade.** Ook dat is een
  contrastbeslissing, met de meting erbij in `DESIGN.md`.

## Gemeten

Lighthouse op de productiebuild, desktop, over zes pagina's in beide talen:

| | prestaties | toegankelijkheid | best practices | SEO |
|---|---|---|---|---|
| hoofdpagina | 98 | 100 | 100 | 100 |
| catalogus | 98 | 100 | 100 | 100 |
| productpagina | 98 | 100 | 100 | 100 |
| Vault, quiz, proeverijen, faq | 98 | 100 | 100 | 100 |

LCP 1,1 tot 1,2 s, CLS 0, TBT 0 ms. axe-core geeft nul overtredingen op acht
pagina's. Geen horizontale overloop vanaf 320 px op veertien pagina's.

## Verder lezen

- `DESIGN.md` — het palet, de typografie, de wireframes, en de zelfkritiek
  inclusief wat het meten alsnog omgooide
- `RESEARCH.md` — wat acht Belgische en Vlaamse theewebshops gemeen hebben, en
  waar het gat zit
- `PHOTOS.md` — de opnamelijst, en hoe u een foto in gebruik neemt
- `.env.example` — alle variabelen, allemaal optioneel
