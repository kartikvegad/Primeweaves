export type Quality = {
  id: string;
  label: string;
  short: string;
};

/** Honest brand qualities — not invented certifications. */
export const qualities: Quality[] = [
  {
    id: "sourced",
    label: "Carefully sourced",
    short: "Ingredient-first choices",
  },
  {
    id: "processed",
    label: "Cleanly processed",
    short: "Hygienic production steps",
  },
  {
    id: "consistent",
    label: "Batch consistent",
    short: "Repeatable quality",
  },
  {
    id: "traditional",
    label: "Traditional craft",
    short: "Where method matters",
  },
  {
    id: "retail",
    label: "Retail ready",
    short: "Home-friendly packs",
  },
  {
    id: "bulk",
    label: "Bulk available",
    short: "Wholesale volumes",
  },
  {
    id: "export",
    label: "Export ready",
    short: "Partner-friendly supply",
  },
  {
    id: "growing",
    label: "Growing range",
    short: "More products ahead",
  },
];

export const heroTrust = [
  { label: "Quality-focused", sub: "Process-led production" },
  { label: "Retail & export", sub: "Home to wholesale" },
  { label: "Since 2018", sub: "Steady craft" },
  { label: "Expanding catalog", sub: "Built to grow" },
];
