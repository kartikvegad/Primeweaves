export type PackOption = {
  id: string;
  label: string;
  price: number;
};

export type ProductBenefit = {
  title: string;
  text: string;
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
  benefits: ProductBenefit[];
  ingredients: string[];
  image: string;
  gallery: string[];
  accent: string;
};

export const products: Product[] = [
  {
    slug: "moringa-powder",
    name: "Moringa Powder",
    tagline: "Finely ground · Naturally nutritious",
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
      "Prime Weaves moringa leaf powder is milled from carefully selected leaves into a fine, versatile powder for everyday use — packed for retail kitchens and bulk or export requirements.",
    howToUse: [
      "Mix 1–2 teaspoons into warm water, juice, or a smoothie each morning.",
      "Stir into soups, dal, or salad dressings for an earthy green lift.",
      "Start with 1 teaspoon if you are new to moringa, then increase gradually.",
      "Use daily for 4–6 weeks for the most consistent results.",
    ],
    benefits: [
      {
        title: "Pure leaf powder",
        text: "Made from selected moringa leaves only — no fillers, stems, or artificial additives — so you know exactly what you are adding to food and drinks.",
      },
      {
        title: "Fine, easy-to-mix texture",
        text: "Milled to a fine powder that stirs smoothly into smoothies, warm water, soups, and dals without a gritty feel.",
      },
      {
        title: "Everyday plant nutrition",
        text: "A simple green addition for daily routines — plant-based and suitable for vegan kitchens that want a thoughtful leaf powder on hand.",
      },
      {
        title: "Flexible pack sizes",
        text: "From small home packs to larger formats for kitchens and trade partners, so you can match quantity to how often you use it.",
      },
      {
        title: "Consistent processing",
        text: "Cleaned, processed, and packed with attention to batch consistency — the same standard whether you order retail or enquire for bulk.",
      },
    ],
    ingredients: [
      "100% Moringa oleifera leaf powder",
      "No fillers, stems, or artificial additives",
      "Packed for retail and bulk formats",
    ],
    image: "/products/moringa-pouch.jpg",
    gallery: [
      "/products/moringa-pouch.jpg",
      "/products/moringa-jar-branded.png",
      "/products/moringa-jar-linen.png",
      "/products/moringa-pour.png",
    ],
    accent: "moringa",
  },
  {
    slug: "cultured-ghee",
    name: "Cultured Ghee",
    tagline: "Traditionally prepared · Rich in taste",
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
      "Prime Weaves cultured ghee is prepared with a traditional cultured approach and slow clarification for aroma and richness — packed for modern kitchens, retail shelves, and export buyers.",
    howToUse: [
      "Use as a cooking fat for sautéing, roasting, and traditional recipes.",
      "Stir a spoonful into warm milk, coffee, or porridge.",
      "Store in a cool, dry place with a clean, dry spoon.",
      "No refrigeration required when kept sealed and moisture-free.",
    ],
    benefits: [
      {
        title: "Cultured, then clarified",
        text: "Prepared with a traditional cultured approach before slow clarification, giving depth of flavour that plain cooking fats often lack.",
      },
      {
        title: "Rich aroma for cooking",
        text: "A warm, distinctive aroma that suits tadka, roasting, finishing dishes, and everyday Indian kitchen recipes.",
      },
      {
        title: "High smoke point",
        text: "Stands up well to sautéing and roasting — a reliable fat when you need steady heat without compromising taste.",
      },
      {
        title: "Kitchen-friendly keeping",
        text: "Store sealed in a cool, dry place with a clean dry spoon. No refrigeration needed when kept moisture-free.",
      },
      {
        title: "Home to wholesale formats",
        text: "Available in retail packs with bulk and export enquiry options for restaurants, distributors, and partners.",
      },
    ],
    ingredients: [
      "Cultured dairy base, carefully clarified",
      "No preservatives or artificial flavors",
      "Slow-prepared for depth of flavour",
    ],
    image: "/products/ghee-jar-lifestyle.jpg",
    gallery: [
      "/products/ghee-jar-lifestyle.jpg",
      "/products/ghee-jar-branded.png",
      "/products/ghee-jar-green-gold.png",
      "/products/ghee-scoop.png",
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
