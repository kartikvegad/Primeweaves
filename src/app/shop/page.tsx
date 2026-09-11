import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop Primeweaves moringa powder and cultured ghee. Place an order request — we confirm by email.",
};

export default function ShopPage() {
  return (
    <div className="bg-cream">
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-sage">
              Shop
            </p>
            <h1 className="mt-3 font-display text-5xl text-forest md:text-6xl">
              Our products
            </h1>
            <p className="mt-4 max-w-2xl text-muted">
              Two carefully manufactured essentials. Choose a product and send
              an order request — no cart needed.
            </p>
          </div>
          <Link
            href="/order"
            className="inline-flex w-fit rounded-full bg-forest px-6 py-3 text-[11px] uppercase tracking-[0.16em] text-cream transition hover:bg-forest-deep"
          >
            Place Order
          </Link>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:gap-10">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
