import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { OrderForm } from "@/components/OrderForm";
import { whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Place Order",
  description:
    "Request Prime Weaves moringa powder or cultured ghee. We confirm every order by email and WhatsApp.",
};

const steps = [
  { num: "01", label: "Choose product" },
  { num: "02", label: "Select quantity" },
  { num: "03", label: "Share details" },
  { num: "04", label: "Get confirmation" },
];

export default function OrderPage() {
  return (
    <div className="bg-cream">
      <section className="relative overflow-hidden bg-forest-deep text-cream">
        <Image
          src="/products/hero-pair.png"
          alt=""
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/85 to-forest-deep/55" />
        <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">
            Order by request
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl sm:text-5xl md:text-6xl">
            Tell us what you need.
          </h1>
          <p className="mt-4 max-w-xl text-cream/80">
            Choose a product and pack, share your details, and we’ll confirm
            availability, pricing, and delivery by email and WhatsApp — no
            online payment yet.
          </p>

          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className="border border-cream/15 bg-cream/5 px-3 py-3 sm:px-4"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
                  {step.num}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-cream/85 sm:text-[11px] sm:tracking-[0.12em]">
                  {step.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#order-form" className="btn-accent">
              Start order
            </a>
            <Link
              href="/bulk"
              className="inline-flex border border-cream/30 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors duration-200 hover:border-cream hover:bg-cream/10"
            >
              Bulk / Export
            </Link>
            <Link
              href={whatsappHref("Hi Prime Weaves — I have an order question.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex border border-cream/30 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors duration-200 hover:border-[#25D366] hover:bg-[#25D366]/15 hover:text-white"
            >
              WhatsApp us
            </Link>
          </div>
        </div>
      </section>

      <section
        id="order-form"
        className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16"
      >
        <Suspense
          fallback={
            <p className="py-20 text-center text-muted">Loading order form…</p>
          }
        >
          <OrderForm />
        </Suspense>
      </section>
    </div>
  );
}
