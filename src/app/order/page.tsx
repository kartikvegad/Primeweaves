import type { Metadata } from "next";
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
          <p className="text-xs uppercase tracking-[0.28em] text-sage-soft">
            Order request
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl">
            Tell us what you need. We’ll confirm by email.
          </h1>
          <p className="mt-4 max-w-xl text-cream/75">
            No checkout cart — select your product, share delivery details, and
            send a request. Our team replies with confirmation and next steps.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        <Suspense fallback={<p className="text-muted">Loading form…</p>}>
          <OrderForm />
        </Suspense>
      </section>
    </div>
  );
}
