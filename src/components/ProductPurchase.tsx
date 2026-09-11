"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { formatInr } from "@/lib/products";

type ProductPurchaseProps = {
  product: Product;
};

export function ProductPurchase({ product }: ProductPurchaseProps) {
  const [packId, setPackId] = useState(product.packs[0]?.id || "");
  const [qty, setQty] = useState(1);
  const pack = product.packs.find((item) => item.id === packId) || product.packs[0];

  const orderHref = `/order?product=${product.slug}&pack=${pack?.id || ""}&qty=${qty}`;

  return (
    <div className="mt-8 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-muted">
          Choose pack
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {product.packs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPackId(item.id)}
              className={`border px-3 py-3 text-left transition ${
                packId === item.id
                  ? "border-forest bg-mist"
                  : "border-forest/15 hover:border-forest/40"
              }`}
            >
              <span className="block text-sm font-medium text-forest">
                {item.label}
              </span>
              <span className="mt-1 block text-xs text-muted">
                {formatInr(item.price)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="inline-flex items-center border border-forest/20">
          <button
            type="button"
            className="px-4 py-3 text-forest transition hover:bg-mist"
            onClick={() => setQty((value) => Math.max(1, value - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="min-w-10 text-center text-sm font-medium">{qty}</span>
          <button
            type="button"
            className="px-4 py-3 text-forest transition hover:bg-mist"
            onClick={() => setQty((value) => value + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <p className="text-sm text-muted">
          Est. {formatInr((pack?.price || 0) * qty)}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href={orderHref}
          className="flex-1 bg-forest px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-cream transition hover:bg-forest-deep"
        >
          Place order request
        </Link>
        <Link
          href="/bulk"
          className="inline-flex items-center justify-center border border-forest px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] text-forest transition hover:bg-mist"
        >
          Export inquiry
        </Link>
      </div>
      <p className="text-xs text-muted">
        You’ll share address and contact details on the next step. We confirm
        every request by email — no online payment yet.
      </p>
    </div>
  );
}
