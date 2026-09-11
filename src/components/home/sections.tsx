import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import { siteImages } from "@/lib/images";
import { ProductCard } from "@/components/ProductCard";

export function Hero() {
  return (
    <section className="relative min-h-[min(90vh,880px)] overflow-hidden bg-forest-deep">
      <Image
        src={siteImages.hero}
        alt="Fresh Moringa oleifera leaves in sunlight"
        fill
        priority
        className="object-cover animate-fade"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/90 via-forest-deep/65 to-forest-deep/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-transparent to-forest-deep/20" />

      <div className="relative mx-auto flex min-h-[min(90vh,880px)] max-w-7xl items-end px-5 pb-16 pt-28 md:items-center md:px-8 md:pb-24">
        <div className="max-w-2xl text-cream">
          <p className="animate-rise font-display text-4xl tracking-[0.05em] md:text-5xl">
            PRIMEWEAVES
          </p>
          <h1 className="animate-rise-delay mt-5 font-display text-4xl leading-[1.08] md:text-6xl">
            Moringa powder & cultured ghee.
          </h1>
          <p className="animate-rise-delay-2 mt-5 max-w-lg text-base leading-relaxed text-cream/80 md:text-lg">
            Two products. Manufactured since 2018 for retail and export. Place an
            order request — we confirm by email.
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
            <Link
              href="/order"
              className="rounded-full bg-cream px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-forest transition hover:bg-white"
            >
              Place Order
            </Link>
            <Link
              href="#products"
              className="rounded-full border border-cream/35 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-cream transition hover:border-cream hover:bg-cream/10"
            >
              See Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsBar() {
  const stats = [
    { value: "2018", label: "Founded" },
    { value: "5+", label: "Years experience" },
    { value: "Moringa", label: "Leaf powder" },
    { value: "Ghee", label: "Cultured & clarified" },
  ];

  return (
    <section className="border-b border-forest/10 bg-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:grid-cols-2 md:grid-cols-4 md:px-8">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-3xl text-forest md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProductShowcase() {
  return (
    <section id="products" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-sage">
            Our products
          </p>
          <h2 className="mt-3 font-display text-4xl text-forest md:text-5xl">
            Just two essentials — for now.
          </h2>
          <p className="mt-4 text-muted">
            Pure moringa leaf powder and traditionally cultured ghee. More SKUs
            will follow; these are our focus today.
          </p>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-12">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  const points = [
    {
      title: "Moringa, done properly",
      text: "Leaf powder processed for purity — steam sterilized and packed for retail and bulk export.",
    },
    {
      title: "Ghee, traditionally made",
      text: "Cultured and clarified for aroma, shelf stability, and everyday cooking.",
    },
    {
      title: "Manufacturing + export",
      text: "One quality standard for home packs and international buyers.",
    },
    {
      title: "Since 2018",
      text: "Five years refining sourcing, production, and fulfillment.",
    },
  ];

  return (
    <section className="texture-grain border-y border-forest/10 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-sage">
              Why Primeweaves
            </p>
            <h2 className="mt-3 max-w-xl font-display text-4xl text-forest md:text-5xl">
              Built around moringa powder and ghee — nothing else.
            </h2>
            <p className="mt-5 max-w-lg text-muted leading-relaxed">
              We manufacture, retail, and export these two products. Send an
              order request with quantity and address; our team confirms by
              email.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {points.map((point) => (
                <div key={point.title} className="border-t border-sage/35 pt-4">
                  <h3 className="font-display text-2xl text-forest">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-forest">
            <Image
              src={siteImages.whyUs}
              alt="Fresh moringa leaves harvested for powder"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/95 to-transparent p-8">
              <p className="font-display text-3xl text-cream">
                From leaf to powder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OrderBanner() {
  return (
    <section className="bg-forest text-cream">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8 md:py-20">
        <div className="max-w-xl">
          <p className="text-[11px] uppercase tracking-[0.28em] text-sage-soft">
            Order by request
          </p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            Choose moringa or ghee. We’ll email you back.
          </h2>
          <p className="mt-4 text-cream/75">
            No cart. Share product, pack, quantity, phone, and address — we
            confirm the order by email.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/order?product=moringa-powder"
            className="inline-flex justify-center rounded-full bg-cream px-7 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-forest transition hover:bg-white"
          >
            Order Moringa
          </Link>
          <Link
            href="/order?product=cultured-ghee"
            className="inline-flex justify-center rounded-full border border-cream/40 px-7 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-cream transition hover:border-cream hover:bg-cream/10"
          >
            Order Ghee
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ValueBar() {
  const items = [
    "Moringa powder",
    "Cultured ghee",
    "Export & retail",
    "Since 2018",
  ];

  return (
    <section className="border-y border-sage/20 bg-cream">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:grid-cols-2 md:grid-cols-4 md:px-8">
        {items.map((item) => (
          <div key={item} className="text-center">
            <p className="text-[11px] uppercase tracking-[0.22em] text-forest">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
