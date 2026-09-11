"use client";

import { useState } from "react";

type TabKey = "how" | "benefit" | "ingredients" | "returns";

type ProductTabsProps = {
  howToUse: string[];
  benefits: string[];
  ingredients: string[];
};

const labels: { key: TabKey; label: string }[] = [
  { key: "how", label: "How to use" },
  { key: "benefit", label: "Benefit" },
  { key: "ingredients", label: "Ingredients" },
  { key: "returns", label: "Return Policy" },
];

export function ProductTabs({
  howToUse,
  benefits,
  ingredients,
}: ProductTabsProps) {
  const [active, setActive] = useState<TabKey>("how");

  return (
    <div className="mt-10 border-t border-forest/10 pt-8">
      <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-forest/10 pb-3">
        {labels.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`text-xs uppercase tracking-[0.16em] transition ${
              active === tab.key
                ? "text-forest underline decoration-sage underline-offset-8"
                : "text-muted hover:text-forest"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-6 text-sm leading-relaxed text-muted">
        {active === "how" ? (
          <ul className="space-y-3">
            {howToUse.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {active === "benefit" ? (
          <ul className="space-y-3">
            {benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {active === "ingredients" ? (
          <ul className="space-y-3">
            {ingredients.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {active === "returns" ? (
          <p>
            Unopened retail packs may be returned within 7 days of delivery.
            Bulk and export orders follow the terms agreed in your purchase
            order. Contact us for RMA support.
          </p>
        ) : null}
      </div>
    </div>
  );
}
