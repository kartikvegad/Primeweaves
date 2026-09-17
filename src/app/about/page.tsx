import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Prime Weaves has manufactured, retailed, and exported moringa powder and ghee since 2018.",
};

export default function AboutPage() {
  return (
    <div className="bg-cream">
      <section className="relative min-h-[55vh] overflow-hidden bg-forest-deep">
        <Image
          src="/products/ghee-jar-lifestyle.jpg"
          alt="Prime Weaves cultured ghee"
          fill
          className="object-cover opacity-55"
          priority
        />
        <div className="relative mx-auto flex min-h-[55vh] max-w-7xl items-end px-5 pb-16 md:px-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-gold">
              Our story · Since 2018
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-5xl text-cream md:text-6xl">
              From a home remedy to a gift for the world.
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl text-forest">
              It started at home. Then it travelled.
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              Prime Weaves began as a home remedy — simple, careful food made for
              family tables. The goodness was never meant to stay in one kitchen.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              Since 2018 we have manufactured, retailed, and supported export
              conversations so that same care can reach homes and partners
              worldwide. What we make still has to earn its place the way a home
              remedy does: with honesty, process, and consistency.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              The catalog grows carefully. New products join only when they can
              carry the same standard that began under one roof.
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
                <p className="text-[11px] uppercase tracking-[0.18em] text-leaf">
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
              text: "Bulk supply conversations and packaging support for distributors and international buyers.",
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

        <div className="mt-16 flex flex-wrap gap-3">
          <Link href="/order" className="btn-primary">
            Request a quotation
          </Link>
          <Link
            href="/bulk"
            className="inline-flex border border-forest/25 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-forest"
          >
            Bulk / export
          </Link>
        </div>
      </section>
    </div>
  );
}
