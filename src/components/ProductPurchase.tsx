"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { formatInr } from "@/lib/products";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

type ProductPurchaseProps = {
  product: Product;
};

export function ProductPurchase({ product }: ProductPurchaseProps) {
  const [packId, setPackId] = useState(product.packs[0]?.id || "");
  const [qty, setQty] = useState(1);
  const pack =
    product.packs.find((item) => item.id === packId) || product.packs[0];

  const orderHref = `/order?product=${product.slug}&pack=${pack?.id || ""}&qty=${qty}`;

  return (
    <div className="mt-8 space-y-6">
      <div>
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
          Choose pack
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
          {product.packs.map((item) => {
            const active = packId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPackId(item.id)}
                className={`border px-3 py-3.5 text-left transition-colors duration-200 ${
                  active
                    ? "border-forest bg-forest text-cream"
                    : "border-forest/15 bg-white text-forest hover:border-forest hover:bg-mist"
                }`}
              >
                <span className="block text-sm font-medium">{item.label}</span>
                <span
                  className={`mt-1 block text-xs ${
                    active ? "text-cream/75" : "text-muted"
                  }`}
                >
                  {formatInr(item.price)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-5">
        <div className="min-w-[160px]">
          <QuantityStepper value={qty} onChange={setQty} />
        </div>
        <p className="pb-3 text-sm text-muted">
          Est.{" "}
          <span className="font-medium text-forest">
            {formatInr((pack?.price || 0) * qty)}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href={orderHref} className="btn-primary flex-1 !py-4 text-center">
          Place order request
        </Link>
        <Link
          href="/bulk"
          className="inline-flex items-center justify-center border border-gold bg-gold/10 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-forest transition-colors duration-200 hover:border-gold-deep hover:bg-gold/25 hover:text-forest-deep"
        >
          Export inquiry
        </Link>
      </div>
      <p className="text-xs text-muted">
        You’ll share address and contact details on the next step. We confirm
        every request by email and WhatsApp — no online payment yet.
      </p>
    </div>
  );
}
