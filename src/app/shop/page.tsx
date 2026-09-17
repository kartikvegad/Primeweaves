import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop Prime Weaves natural foods. Current range available now — more products coming soon.",
};

export default function ShopPage() {
  return (
    <div className="bg-cream">
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-leaf">
              Shop
            </p>
            <h1 className="mt-3 font-display text-5xl text-forest md:text-6xl">
              The range
            </h1>
            <p className="mt-4 max-w-2xl text-muted">
              Products available today, with space for more. Every addition will
              meet the same sourcing, process, and packing standards.
            </p>
          </div>
          <Link
            href="/order"
            className="inline-flex w-fit bg-forest px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream transition hover:bg-forest-deep"
          >
            Request Quote
          </Link>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
          <article className="flex min-h-[420px] flex-col border border-dashed border-forest/20 bg-mist/50 p-8">
            <div className="flex flex-1 flex-col items-start justify-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-leaf">
                Coming soon
              </p>
              <h2 className="mt-3 font-display text-3xl text-forest">
                More products on the way
              </h2>
              <p className="mt-3 max-w-sm text-sm text-muted">
                We’re expanding the catalog carefully. Ask us what’s next or
                share what you’d like to see.
              </p>
              <Link
                href="/contact"
                className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-forest underline underline-offset-4"
              >
                Get in touch
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
