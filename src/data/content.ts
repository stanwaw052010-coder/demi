/**
 * All editorial copy and imagery for the LUMÉA concept site.
 * Photography — Unsplash (free to use). Every image has a graceful
 * fallback in <Pic /> in case a source ever disappears.
 */

const u = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/${id}?q=${q}&w=${w}&auto=format&fit=crop`;

export const IMAGES = {
  hero: u("photo-1487412947147-5cebf100ffc2", 2200, 82),
  manifesto: [
    u("photo-1522337660859-02fbefca4702", 1200),
    u("photo-1516975080664-ed2fc6a32937", 1200),
    u("photo-1600948836101-f9ffda59d250", 1200),
  ],
  services: {
    hair: u("photo-1562322140-8baeececf3df", 1000),
    skin: u("photo-1570172619644-dfd03ed5d881", 1000),
    colour: u("photo-1519699047748-de8e457a634e", 1000),
    nails: u("photo-1604654894610-df63bc536371", 1000),
    makeup: u("photo-1487412720507-e7ab37603c6f", 1000),
    brows: u("photo-1508214751196-bcfd4ca60f91", 1000),
  },
  gallery: [
    { src: u("photo-1531746020798-e6953c6e8e04", 1200), caption: "Portrait nº1 — bare light" },
    { src: u("photo-1529626455594-4ff0802cfb7e", 1200), caption: "Skin, unretouched" },
    { src: u("photo-1560066984-138dadb4c035", 1200), caption: "The atelier floor" },
    { src: u("photo-1596462502278-27bfdc403348", 1200), caption: "Instruments of colour" },
    { src: u("photo-1522337660859-02fbefca4702", 1200), caption: "The washing ritual" },
    { src: u("photo-1610992015732-2449b76344bc", 1200), caption: "Architecture, in miniature" },
    { src: u("photo-1534528741775-53994a69daeb", 1200), caption: "Portrait nº2 — dusk" },
  ],
  beforeAfter: {
    before: u("photo-1594744803329-e58b31de8bf5", 1600),
    after: u("photo-1512496015851-a90fb38ba796", 1600),
  },
  testimonials: [
    u("photo-1494790108377-be9c29b29330", 400),
    u("photo-1438761681033-6461ffad8d80", 400),
    u("photo-1517841905240-472988babdf9", 400),
    u("photo-1524504388940-b1c1722653e1", 400),
  ],
  booking: u("photo-1540555700478-4be289fbecef", 1600),
} as const;

export const SERVICES = [
  {
    id: "hair",
    index: "01",
    title: "Hair Couture",
    poetic: "cut as a silhouette",
    description:
      "A cut composed for your bone structure, your habits, the way you move. Sculpted dry, refined wet, finished by hand — never by formula.",
    price: "from €90",
    duration: "90 min",
    image: IMAGES.services.hair,
  },
  {
    id: "skin",
    index: "02",
    title: "Skin Rituals",
    poetic: "light, restored",
    description:
      "Slow facial choreography — lymphatic sculpting, botanical peels and cold marble. Skin that looks rested, not treated.",
    price: "from €120",
    duration: "75 min",
    image: IMAGES.services.skin,
  },
  {
    id: "colour",
    index: "03",
    title: "Colour Alchemy",
    poetic: "pigment as perfume",
    description:
      "Hand-painted dimension, glosses mixed to the millilitre. Colour that behaves like it grew there — and fades like a memory, gracefully.",
    price: "from €140",
    duration: "150 min",
    image: IMAGES.services.colour,
  },
  {
    id: "nails",
    index: "04",
    title: "Manicure Architecture",
    poetic: "ten small sculptures",
    description:
      "Structural manicure with couture finishes — glass gels, velvet mattes, hairline French. Precision measured in tenths of a millimetre.",
    price: "from €60",
    duration: "60 min",
    image: IMAGES.services.nails,
  },
  {
    id: "makeup",
    index: "05",
    title: "Makeup Atelier",
    poetic: "your face, italicised",
    description:
      "Editorial skin, invisible complexion work, one deliberate gesture. Makeup designed for real light — daylight, candlelight, camera flash.",
    price: "from €80",
    duration: "60 min",
    image: IMAGES.services.makeup,
  },
  {
    id: "brows",
    index: "06",
    title: "Brow & Lash Studio",
    poetic: "the frame of a gaze",
    description:
      "Cartography before tweezers. Lamination, tinting and thread-work mapped to the golden ratio of your own face — never a template.",
    price: "from €45",
    duration: "45 min",
    image: IMAGES.services.brows,
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "I walked out and a stranger on Khreshchatyk asked who does my hair. That has never happened to me in thirty years.",
    name: "Olena V.",
    role: "Gallery director",
    photo: IMAGES.testimonials[0],
  },
  {
    quote:
      "They spent twenty minutes just looking at my face before touching a single brush. It felt less like an appointment, more like being read.",
    name: "Marta K.",
    role: "Architect",
    photo: IMAGES.testimonials[1],
  },
  {
    quote:
      "The quietest luxury I know in this city. No music you didn't ask for, no small talk you didn't start. Just craft.",
    name: "Iryna S.",
    role: "Violinist",
    photo: IMAGES.testimonials[2],
  },
  {
    quote:
      "My colourist mixed three glosses, discarded two, and apologised for the delay. The result made me cry in the car. Twice.",
    name: "Daria M.",
    role: "Film producer",
    photo: IMAGES.testimonials[3],
  },
] as const;

export const STATS = [
  { value: 12, suffix: "", label: "years of quiet practice" },
  { value: 9, suffix: "", label: "resident master artisans" },
  { value: 26, suffix: "k", label: "rituals performed" },
  { value: 98, suffix: "%", label: "guests who return" },
] as const;

export const NAV_LINKS = [
  { label: "Manifesto", href: "#manifesto", preview: IMAGES.manifesto[0] },
  { label: "Services", href: "#services", preview: IMAGES.services.skin },
  { label: "Gallery", href: "#gallery", preview: IMAGES.gallery[0].src },
  { label: "Transformations", href: "#transformations", preview: IMAGES.beforeAfter.after },
  { label: "Reserve", href: "#reserve", preview: IMAGES.booking },
] as const;

export const MARQUEE_ITEMS = [
  "Hair Couture",
  "Skin Rituals",
  "Colour Alchemy",
  "Manicure Architecture",
  "Makeup Atelier",
  "Brow & Lash",
] as const;
