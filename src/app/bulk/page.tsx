import type { Metadata } from "next";
import Link from "next/link";
import { BulkQuoteForm } from "@/components/BulkQuoteForm";

export const metadata: Metadata = {
  title: "Export & Bulk",
  description:
    "Request bulk and export pricing for Prime Weaves moringa powder and cultured ghee.",
};

export default function BulkPage() {
  return (
    <div className="bg-cream">
      <section className="bg-forest text-cream">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <p className="text-xs uppercase tracking-[0.28em] text-sage-soft">
            Export & Bulk
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-6xl">
            Partnership-ready supply for distributors and buyers.
          </h1>
          <p className="mt-5 max-w-2xl text-cream/75 leading-relaxed">
            Prime Weaves supports wholesale and export orders for moringa powder
            and cultured ghee — with packaging options sized for your market.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl text-forest">
              What we can supply
            </h2>
            <ul className="mt-6 space-y-4 text-sm text-muted">
              <li className="border-l border-sage pl-4">
                Moringa powder in retail and bulk pack sizes
              </li>
              <li className="border-l border-sage pl-4">
                Cultured ghee for regional and international distribution
              </li>
              <li className="border-l border-sage pl-4">
                Consistent manufacturing standards across order volumes
              </li>
              <li className="border-l border-sage pl-4">
                Support for documentation and shipment coordination
              </li>
            </ul>
            <p className="mt-8 text-sm text-muted">
              Prefer a quick conversation?{" "}
              <Link
                href="/contact"
                className="text-forest underline underline-offset-4 transition-colors duration-200 hover:text-leaf"
              >
                Contact our team
              </Link>
              .
            </p>
          </div>

          <BulkQuoteForm />
        </div>
      </section>
    </div>
  );
}
