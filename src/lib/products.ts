export type PackOption = {
  id: string;
  label: string;
  price: number;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  size: string;
  price: number;
  compareAt?: number;
  packs: PackOption[];
  badge?: string;
  description: string;
  howToUse: string[];
  benefits: string[];
  ingredients: string[];
  image: string;
  gallery: string[];
  accent: "moringa" | "ghee";
};

export const products: Product[] = [
  {
    slug: "moringa-powder",
    name: "Moringa Powder",
    tagline: "Pure leaf powder for daily vitality",
    category: "Superfood powder",
    size: "100g – 1kg",
    price: 399,
    compareAt: 499,
    packs: [
      { id: "100g", label: "100g", price: 399 },
      { id: "250g", label: "250g", price: 899 },
      { id: "500g", label: "500g", price: 1599 },
      { id: "1kg", label: "1kg", price: 2899 },
    ],
    badge: "Bestseller",
    description:
      "Primeweaves moringa powder is milled from carefully selected Moringa oleifera leaves, steam-sterilized for purity, and packed for retail and export. A fine green powder for smoothies, teas, and everyday cooking.",
    howToUse: [
      "Mix 1–2 teaspoons into warm water, juice, or a smoothie each morning.",
      "Stir into soups, dal, or salad dressings for an earthy green lift.",
      "Start with 1 teaspoon if you are new to moringa, then increase gradually.",
      "Use daily for 4–6 weeks for the most consistent results.",
    ],
    benefits: [
      "Naturally rich in vitamins A, C, and iron",
      "Supports everyday energy and nutritional balance",
      "Plant-based and suitable for vegan diets",
      "Processed in hygienic manufacturing facilities",
    ],
    ingredients: [
      "100% Moringa oleifera leaf powder",
      "No fillers, stems, or artificial additives",
      "Steam sterilized for microbial control",
    ],
    image: "/images/moringa-powder-pack.jpg",
    gallery: [
      "/images/moringa-powder-pack.jpg",
      "/images/green-powder-bowl-real.jpg",
      "/images/moringa-leaves-pexels.jpg",
      "/images/moringa-plant.jpg",
    ],
    accent: "moringa",
  },
  {
    slug: "cultured-ghee",
    name: "Cultured Ghee",
    tagline: "Traditionally clarified, export-ready purity",
    category: "Clarified butter",
    size: "250ml – 1L",
    price: 649,
    compareAt: 799,
    packs: [
      { id: "250ml", label: "250ml", price: 649 },
      { id: "500ml", label: "500ml", price: 1199 },
      { id: "1L", label: "1 Litre", price: 2199 },
    ],
    badge: "Signature",
    description:
      "Primeweaves cultured ghee is prepared using traditional clarification methods that remove milk solids while preserving aroma and richness. Packed for kitchens, retail shelves, and export buyers.",
    howToUse: [
      "Use as a cooking fat for sautéing, roasting, and traditional recipes.",
      "Stir a spoonful into warm milk, coffee, or porridge.",
      "Store in a cool, dry place with a clean, dry spoon.",
      "No refrigeration required when kept sealed and moisture-free.",
    ],
    benefits: [
      "Traditionally cultured and clarified",
      "Lactose-free when milk solids are fully removed",
      "High smoke point for everyday cooking",
      "Manufactured and packed for retail and export",
    ],
    ingredients: [
      "Cultured butter from carefully sourced milk",
      "No preservatives or artificial flavors",
      "Slow-simmered for depth of flavor",
    ],
    image: "/images/ghee-jar-spoon.jpg",
    gallery: [
      "/images/ghee-jar-spoon.jpg",
      "/images/ghee-clarified.jpg",
      "/images/ghee-alt.jpg",
      "/images/ghee-cooking.jpg",
    ],
    accent: "ghee",
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
