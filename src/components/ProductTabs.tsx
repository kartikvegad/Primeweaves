"use client";

import { useState } from "react";
import type { ProductBenefit } from "@/lib/products";

type TabKey = "how" | "benefit" | "ingredients" | "returns";

type ProductTabsProps = {
  howToUse: string[];
  benefits: ProductBenefit[];
  ingredients: string[];
};

const labels: { key: TabKey; label: string }[] = [
  { key: "how", label: "How to use" },
  { key: "benefit", label: "Benefits" },
  { key: "ingredients", label: "Ingredients" },
  { key: "returns", label: "Return Policy" },
];

export function ProductTabs({
  howToUse,
  benefits,
  ingredients,
}: ProductTabsProps) {
  const [active, setActive] = useState<TabKey>("benefit");

  return (
    <div className="mt-10 border-t border-forest/10 pt-8">
      <div className="-mx-1 flex gap-2 overflow-x-auto border-b border-forest/10 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {labels.map((tab) => {
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={`shrink-0 px-3 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 ${
                isActive
                  ? "bg-forest text-cream"
                  : "bg-transparent text-muted hover:bg-mist hover:text-forest"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="mt-6 text-sm leading-relaxed text-muted">
        {active === "how" ? (
          <ul className="space-y-3">
            {howToUse.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {active === "benefit" ? (
          <ul className="space-y-5">
            {benefits.map((item) => (
              <li key={item.title}>
                <p className="font-medium text-forest">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
        {active === "ingredients" ? (
          <ul className="space-y-3">
            {ingredients.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>{item}</span>
              </li>
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
