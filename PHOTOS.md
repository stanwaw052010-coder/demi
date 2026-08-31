# PHOTOS.md — de opnamelijst

Er zijn nog geen foto's. De beeldlaag wordt getekend: elk product krijgt een
SVG-compositie die uit zijn eigen gegevens volgt (vorm, aftrekselkleur, en een
seed uit de slug, zodat elke thee een eigen blad krijgt in plaats van hetzelfde
plaatje in een andere kleur).

Dat is bedoeld als tussenstand, niet als eindpunt. Vervangen is één bestand
neerzetten.

## Hoe u een foto in gebruik neemt

`<ProductImage>` kijkt eerst of het bestand bestaat en valt anders terug op de
tekening. Er is niets te configureren en niets te importeren.

```
public/products/<slug>.jpg          droog blad     ← het hoofdbeeld
public/products/<slug>-liquor.jpg   het aftreksel
public/products/<slug>-wet.jpg      nat blad
public/products/<slug>-pack.jpg     de verpakking
```

Zodra `public/products/bingdao-gushu-2021.jpg` bestaat, gebruikt de site die en
verdwijnt de tekening voor dat ene beeld. De andere drie blijven getekend tot
ook die er staan; de vier views mogen dus door elkaar lopen.

## Specificatie

- **Vierkant, 1:1.** Alle beeldvlakken hebben een vaste aspect-ratio, zodat er
  geen layoutverschuiving optreedt. Een foto die niet vierkant is, wordt
  bijgesneden vanuit het midden.
- **Minimaal 1600 × 1600 px**, JPEG, kwaliteit 82. Next levert zelf AVIF en
  WebP en schaalt naar de gevraagde maten.
- **Achtergrond:** papierwit tot lichtgrijs, niet crème. Het zetwerk staat op
  `#FCFDFA`; een warme achtergrond vloekt daarmee.
- **Licht:** diffuus daglicht van links, geen harde slagschaduw, geen glans op
  het porselein. Wij fotograferen droge thee altijd van boven.
- **Kleurbeheer:** sRGB, en het aftreksel moet kloppen. De kleur van het kopje
  is op deze site informatie; een te warm afgeregelde witbalans maakt van een
  sheng een oolong.

## Wat er nodig is

### Per thee, vier opnames (30 thees, 120 opnames)

Voor elke slug in `content/products.ts` met categorie sheng, shou, oolong, wit,
rood, groen, geel of matcha:

| View | Wat erop staat | Opmerking |
|---|---|---|
| `<slug>.jpg` | droog blad van boven, losjes uitgespreid | bij cakes: de hele cake, met het papier ernaast |
| `<slug>-liquor.jpg` | het aftreksel in een witte piala, van boven | derde infusie, want die is representatief |
| `<slug>-wet.jpg` | het natte blad op het deksel van de gaiwan | ontvouwd, niet uitgeknepen |
| `<slug>-pack.jpg` | de verpakking met het partijlabel leesbaar | dit is het bewijsstuk bij het paspoort |

De slugs, in volgorde van het rek:

```
bingdao-gushu-2021        yiwu-zhengshan-2018       lao-mane-bitter-2020
jingmai-autumn-2022       menghai-gong-ting-2016    golden-bud-ripe-2019
lao-cha-tou-2015          xiaguan-tuocha            da-hong-pao-zhengyan
rou-gui-cinnamon-rock     shui-xian-lao-cong        tie-guan-yin-anxi
mi-lan-xiang-dan-cong     dong-ding                 ali-shan-high-mountain
bai-hao-yin-zhen-fuding   bai-mu-dan                shou-mei-2017
yue-guang-bai             dian-hong-golden-needle   jin-jun-mei
zheng-shan-xiao-zhong     qimen-hao-ya              xi-hu-long-jing
bi-luo-chun               huangshan-mao-feng        anji-bai-cha
meng-ding-huang-ya        ceremonial-uji-matcha     daily-nishio-matcha
```

### Per stuk gerei, één opname (9 opnames)

Alleen `<slug>.jpg`. Op wit, driekwart van voren, met een tweede object erbij
voor de schaal — bij de gaiwan een hand, bij de weegschaal een cake.

```
gaiwan-porselein-110   yixing-zhuni-100   chahai-glas
pialas-set-vier        chaban-bamboe      chasen-bamboe
chawan-steengoed       weegschaal-01g     ijzeren-ketel-12l
```

### Sets (2 opnames)

`set-kennismaking` en `set-puerh-verticaal`, allebei uitgepakt met de kaartjes
zichtbaar. De cadeaubon heeft geen foto nodig; die blijft getekend.

### Buiten de catalogus

Deze staan nog niet in de code en vragen dus ook een plek in de opmaak. Alleen
maken als er echt iemand mee gaat werken.

1. **Over ons.** Twee portretten aan de theetafel in Gent, en één opname van de
   Vault-kast in Kortrijk met de datalogger in beeld. Die laatste doet werk: de
   pagina beweert dat de kast gelogd wordt.
2. **Proeverijen.** Eén opname van een sessie van bovenaf, met tien gaiwans op
   tafel. Geen gezichten nodig.
3. **Herkomst.** Wat wij op de bergen zelf fotograferen. De kaart op de
   hoofdpagina blijft getekend — een schematische kaart is eerlijker dan een
   foto die suggereert dat we overal geweest zijn.

## Wat expres getekend blijft

De kaart, het smaakwiel, de gongfu-timer en het Open Graph-beeld. Dat zijn
tekeningen omdat ze gegevens weergeven, niet omdat er nog geen foto is. Vervang
ze niet.
