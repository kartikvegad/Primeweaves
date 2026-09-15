"use client";

import { useState } from "react";
import { Reveal } from "@/components/home/Reveal";

const moringaSteps = [
  {
    title: "Harvest",
    text: "Leaves are gathered with attention to freshness and leaf quality before processing begins.",
  },
  {
    title: "Selection",
    text: "Only suitable leaf material moves forward — stems and unwanted matter are kept out of the final powder.",
  },
  {
    title: "Cleaning",
    text: "Leaves are cleaned to support hygienic handling before drying and milling stages.",
  },
  {
    title: "Processing",
    text: "Careful processing turns selected leaves into a fine powder suited to everyday kitchen use.",
  },
  {
    title: "Fine powder",
    text: "The result is a versatile green powder with a soft texture for drinks, cooking, and routines.",
  },
  {
    title: "Quality check",
    text: "Batches are reviewed for consistency in appearance, handling, and pack readiness.",
  },
  {
    title: "Packaging",
    text: "Finished powder is packed for retail shelves and bulk or export requirements.",
  },
];

const gheeSteps = [
  {
    title: "Milk / cream base",
    text: "Production begins with a carefully handled dairy base prepared for culturing.",
  },
  {
    title: "Culturing",
    text: "A cultured approach develops depth of aroma before clarification begins.",
  },
  {
    title: "Preparation",
    text: "The cultured base is prepared for slow clarification — patience shapes flavour and texture.",
  },
  {
    title: "Clarification",
    text: "Gentle clarification separates milk solids, leaving a clear, aromatic cooking fat.",
  },
  {
    title: "Filtration",
    text: "The clarified ghee is filtered for a clean finish before packing.",
  },
  {
    title: "Packaging",
    text: "Packed for home kitchens, retail, and bulk or export enquiry volumes.",
  },
];

export function HowItsMade() {
  const [mode, setMode] = useState<"moringa" | "ghee">("moringa");
  const steps = mode === "moringa" ? moringaSteps : gheeSteps;

  return (
    <section id="how-its-made" className="bg-forest text-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">
            How it’s made
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl md:text-5xl">
            A clear process behind every pack.
          </h2>
          <p className="mt-4 max-w-2xl text-cream/75">
            Starting with products in the range today. New foods will follow the
            same care — educational detail without turning the page into a
            technical manual.
          </p>
        </Reveal>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => setMode("moringa")}
            className={`px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
              mode === "moringa"
                ? "bg-gold text-ink"
                : "border border-cream/25 text-cream hover:border-cream/50"
            }`}
          >
            Moringa
          </button>
          <button
            type="button"
            onClick={() => setMode("ghee")}
            className={`px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
              mode === "ghee"
                ? "bg-gold text-ink"
                : "border border-cream/25 text-cream hover:border-cream/50"
            }`}
          >
            Ghee
          </button>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={`${mode}-${step.title}`}
              className="border border-cream/15 bg-forest-deep/50 p-6 transition hover:border-gold/40"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
