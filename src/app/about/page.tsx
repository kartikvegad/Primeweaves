import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Primeweaves has manufactured, retailed, and exported moringa powder and ghee since 2018.",
};

export default function AboutPage() {
  return (
    <div className="bg-cream">
      <section className="relative min-h-[55vh] overflow-hidden bg-forest-deep">
        <Image
          src="/images/moringa-brisbane.jpg"
          alt="Moringa oleifera leaves and flowers"
          fill
          className="object-cover opacity-55"
          priority
        />
        <div className="relative mx-auto flex min-h-[55vh] max-w-7xl items-end px-5 pb-16 md:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-sage-soft">
              Our Story
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl text-cream md:text-6xl">
              Five years of weaving purity into every pack.
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl text-forest">
              Started in 2018. Focused on what matters.
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              Primeweaves began with a clear brief: manufacture clean, consistent
              moringa powder and cultured ghee that can travel — from our
              facilities to retail shelves and export partners worldwide.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              We stay focused on these two products while preparing the
              foundation to expand the catalog thoughtfully later.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Founded", value: "2018" },
              { label: "Experience", value: "5+ Years" },
              { label: "Focus", value: "Moringa & Ghee" },
              { label: "Model", value: "Mfg · Retail · Export" },
            ].map((item) => (
              <div key={item.label} className="bg-mist/70 p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-sage">
                  {item.label}
                </p>
                <p className="mt-3 font-display text-3xl text-forest">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Manufacture",
              text: "Controlled processing, careful packing, and batch consistency for every order size.",
            },
            {
              title: "Retail",
              text: "Consumer-ready packs with the same purity standards our export partners rely on.",
            },
            {
              title: "Export",
              text: "Bulk supply and documentation support for distributors and international buyers.",
            },
          ].map((item) => (
            <div key={item.title} className="border-t border-sage/40 pt-6">
              <h3 className="font-display text-3xl text-forest">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-forest px-7 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-cream transition hover:bg-forest-deep"
          >
            Talk to us
          </Link>
        </div>
      </section>
    </div>
  );
}
