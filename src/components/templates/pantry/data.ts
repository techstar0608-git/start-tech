/**
 * Demo content for the "Pantry" website style — a fictional artisan
 * preserves brand used to showcase the template to S.T.A.R clients.
 */

export type LabelPattern = "dots" | "leaves" | "waves" | "slices";

export type Product = {
  slug: string;
  /** label lines printed on the jar */
  label: [string, string?];
  /** small italic line under the name on the jar */
  sub: string;
  /** full product name used in copy */
  name: string;
  kind: "Sweet" | "Savoury";
  price: number;
  /** colour of what's inside the glass */
  fill: string;
  /** main label colour */
  labelBg: string;
  /** pattern shapes on the label */
  accent: string;
  /** lower band behind the product name */
  band: string;
  /** product name colour */
  ink: string;
  pattern: LabelPattern;
  /** soft card background in the shop grid */
  tint: string;
};

export const brand = {
  name: "Saltbush",
  suffix: "Pantry",
  tagline: "Small-batch preserves from the Northern Rivers, NSW",
  ring: "WE GROW · WE PICK · WE PRESERVE · ",
} as const;

export const products: Product[] = [
  {
    slug: "blood-orange",
    label: ["Blood", "Orange"],
    sub: "Thick-cut marmalade",
    name: "Blood Orange Marmalade",
    kind: "Sweet",
    price: 14,
    fill: "#d9541e",
    labelBg: "#f08a3c",
    accent: "#c9471a",
    band: "#c9471a",
    ink: "#fff4e6",
    pattern: "slices",
    tint: "#fde3cf",
  },
  {
    slug: "davidson-plum",
    label: ["Davidson", "Plum"],
    sub: "Extra jam",
    name: "Davidson Plum Jam",
    kind: "Sweet",
    price: 15,
    fill: "#4b1430",
    labelBg: "#e7a9c8",
    accent: "#c7799f",
    band: "#5a1f4a",
    ink: "#fbe7f0",
    pattern: "dots",
    tint: "#f6dde8",
  },
  {
    slug: "pistachio",
    label: ["Smeraldo"],
    sub: "Pistachio pesto",
    name: "Smeraldo Pistachio Pesto",
    kind: "Savoury",
    price: 18,
    fill: "#7c8d33",
    labelBg: "#a9cf7a",
    accent: "#2f5a2a",
    band: "#24452a",
    ink: "#eaf5d8",
    pattern: "leaves",
    tint: "#e4efd2",
  },
  {
    slug: "finger-lime",
    label: ["Finger", "Lime"],
    sub: "Silky curd",
    name: "Finger Lime Curd",
    kind: "Sweet",
    price: 13,
    fill: "#e8cf4a",
    labelBg: "#f6efc9",
    accent: "#9cc04a",
    band: "#3f6b2b",
    ink: "#fbf6dc",
    pattern: "waves",
    tint: "#f5f0d6",
  },
  {
    slug: "tomato-relish",
    label: ["Pesto", "Rosso"],
    sub: "Sun-dried tomato",
    name: "Pesto Rosso",
    kind: "Savoury",
    price: 16,
    fill: "#b5291f",
    labelBg: "#f3dcc8",
    accent: "#e3a588",
    band: "#d13a26",
    ink: "#fff1e6",
    pattern: "dots",
    tint: "#fbe1d6",
  },
  {
    slug: "quandong",
    label: ["Quandong"],
    sub: "Bush peach chutney",
    name: "Quandong Chutney",
    kind: "Savoury",
    price: 15,
    fill: "#c4471f",
    labelBg: "#f2b8a0",
    accent: "#e07c55",
    band: "#7a2a1d",
    ink: "#ffe9de",
    pattern: "slices",
    tint: "#fbe0d4",
  },
  {
    slug: "macadamia",
    label: ["Macadamia"],
    sub: "Toasted nut spread",
    name: "Macadamia Spread",
    kind: "Sweet",
    price: 19,
    fill: "#c99a62",
    labelBg: "#efe2cf",
    accent: "#d6b68e",
    band: "#8a5a34",
    ink: "#fbf1e3",
    pattern: "waves",
    tint: "#f3e8d8",
  },
  {
    slug: "mulberry",
    label: ["Black", "Mulberry"],
    sub: "Extra jam",
    name: "Black Mulberry Jam",
    kind: "Sweet",
    price: 15,
    fill: "#2a1630",
    labelBg: "#5a6fb8",
    accent: "#33447f",
    band: "#1f2a55",
    ink: "#e6ebff",
    pattern: "leaves",
    tint: "#e0e4f4",
  },
];

export const steps = [
  {
    n: "01",
    title: "Grow",
    body: "Blood oranges, finger limes and pistachios from our own rows and two neighbouring family farms — picked only when they’re ready.",
  },
  {
    n: "02",
    title: "Process",
    body: "Hand-peeled, hand-cut and cooked in small copper pans, no more than forty jars at a time.",
  },
  {
    n: "03",
    title: "Preserve",
    body: "Sealed the same afternoon with nothing added but cane sugar, sea salt and patience.",
  },
] as const;

export const menuLinks = [
  { label: "Home", href: "#top" },
  { label: "Pantry", href: "#shop" },
  { label: "Production", href: "#process" },
  { label: "Visit us", href: "#visit" },
] as const;
