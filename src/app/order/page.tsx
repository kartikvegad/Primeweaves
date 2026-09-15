import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { OrderForm } from "@/components/OrderForm";

export const metadata: Metadata = {
  title: "Place Order",
  description:
    "Request Primeweaves moringa powder or cultured ghee. We confirm every order by email.",
};

export default function OrderPage() {
  return (
    <div className="bg-cream">
      <section className="border-b border-forest/10 bg-forest text-cream">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">
            Order by request
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl">
            Tell us what you need.
          </h1>
          <p className="mt-4 max-w-xl text-cream/75">
            Whether you are ordering for your home, business, or looking for
            bulk/export supply — choose a product, share quantity and address
            details, and our team confirms by email.
          </p>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-4">
            {[
              "01 Choose product",
              "02 Select quantity",
              "03 Share details",
              "04 Get confirmation",
            ].map((step) => (
              <p
                key={step}
                className="border border-cream/15 px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-cream/80"
              >
                {step}
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#order-form" className="btn-accent">
              Order for Home
            </Link>
            <Link
              href="/bulk"
              className="inline-flex border border-cream/30 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors duration-200 hover:border-cream hover:bg-cream/10 hover:text-white"
            >
              Bulk / Export Enquiry
            </Link>
          </div>
        </div>
      </section>

      <section
        id="order-form"
        className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16"
      >
        <Suspense fallback={<p className="text-muted">Loading form…</p>}>
          <OrderForm />
        </Suspense>
      </section>
    </div>
  );
}
