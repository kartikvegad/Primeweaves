"use client";

import { useState } from "react";
import { CustomSelect } from "@/components/ui/CustomSelect";

const productOptions = [
  {
    value: "moringa",
    label: "Moringa Powder",
    hint: "Retail & bulk packs",
  },
  {
    value: "ghee",
    label: "Cultured Ghee",
    hint: "Retail & export sizes",
  },
  {
    value: "both",
    label: "Both products",
    hint: "Mixed enquiry",
  },
];

export function BulkQuoteForm() {
  const [product, setProduct] = useState("both");
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sent");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-forest/10 bg-white/50 p-6 md:p-8"
    >
      <h3 className="font-display text-3xl text-forest">Request a quote</h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Company" name="company" required />
        <Field label="Contact name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Country" name="country" required />
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <CustomSelect
          label="Product interest"
          name="product"
          value={product}
          options={productOptions}
          onChange={setProduct}
        />
        <Field label="Estimated volume" name="volume" />
      </div>
      <div className="mt-5">
        <label className="block text-[11px] uppercase tracking-[0.16em] text-muted">
          Notes
          <textarea
            name="notes"
            rows={5}
            className="field mt-2 resize-y transition-colors duration-200 focus:border-forest focus:bg-mist/30"
            placeholder="Target market, pack sizes, timelines…"
          />
        </label>
      </div>
      {status === "sent" ? (
        <p className="mt-5 border border-sage bg-mist px-4 py-3 text-sm text-forest">
          Thanks — our team will follow up on your enquiry shortly.
        </p>
      ) : null}
      <button type="submit" className="btn-primary mt-6">
        Submit inquiry
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-[11px] uppercase tracking-[0.16em] text-muted">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="field mt-2 transition-colors duration-200 focus:border-forest focus:bg-mist/30"
      />
    </label>
  );
}
