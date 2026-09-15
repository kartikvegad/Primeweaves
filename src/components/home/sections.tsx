import Link from "next/link";
import Image from "next/image";
import { formatInr, products } from "@/lib/products";
import { siteImages } from "@/lib/images";
import { heroTrust, qualities } from "@/lib/qualities";
import { Reveal } from "@/components/home/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";

export function Hero() {
  return (
    <section className="relative min-h-[min(78vh,720px)] overflow-hidden bg-forest-deep md:min-h-[min(88vh,860px)]">
      <Image
        src={siteImages.hero}
        alt="Natural ingredients and everyday foods from Prime Weaves"
        fill
        priority
        className="object-cover object-center sm:object-[70%_center]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/80 via-forest-deep/45 to-forest-deep/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/55 via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-[min(78vh,720px)] max-w-7xl items-end px-5 pb-12 pt-24 md:min-h-[min(88vh,860px)] md:items-center md:px-8 md:pb-20 md:pt-28">
        <div className="max-w-xl animate-rise text-cream">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">
            Conscious choices · Better everyday food
          </p>
          <h1 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl md:text-6xl">
            Choose better. Live lighter.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-cream/80 md:text-lg">
            Thoughtfully made natural foods for homes, retailers, and export
            partners — starting with our first essentials, built to grow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex bg-cream px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors duration-200 hover:bg-white"
            >
              Shop the range
            </Link>
            <Link
              href="/#qualities"
              className="inline-flex border border-cream/35 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors duration-200 hover:border-cream hover:bg-cream/10"
            >
              Our qualities
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {heroTrust.map((item) => (
              <div key={item.label} className="border-t border-cream/25 pt-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em]">
                  {item.label}
                </p>
                <p className="mt-1 text-[11px] text-cream/65">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function QualitiesBar() {
  return (
    <section id="qualities" className="border-y border-forest/10 bg-mist/60 py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-leaf">
            Shop by values
          </p>
          <h2 className="mt-2 font-display text-3xl text-forest md:text-4xl">
            Qualities we build around
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
            Honest standards for every product we make today — and every product
            we add next. Not buzzwords; operating principles.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8">
          {qualities.map((quality) => (
            <div key={quality.id} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-forest/15 bg-cream text-forest transition hover:border-leaf hover:text-leaf">
                <QualityIcon id={quality.id} />
              </div>
              <p className="mt-3 text-[11px] font-semibold leading-snug text-forest sm:text-xs">
                {quality.label}
              </p>
              <p className="mt-1 hidden text-[11px] text-muted sm:block">
                {quality.short}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QualityIcon({ id }: { id: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
  } as const;

  switch (id) {
    case "sourced":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3c4 3 7 7 7 11a7 7 0 1 1-14 0c0-4 3-8 7-11Z" />
          <path d="M12 21V10" strokeLinecap="round" />
        </svg>
      );
    case "processed":
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="7" />
          <path d="M12 8v4l2.5 2.5" strokeLinecap="round" />
        </svg>
      );
    case "consistent":
      return (
        <svg {...common} aria-hidden>
          <path d="M5 12h14M8 7h8M8 17h8" strokeLinecap="round" />
        </svg>
      );
    case "traditional":
      return (
        <svg {...common} aria-hidden>
          <path d="M7 20V10l5-6 5 6v10" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case "retail":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 9h16l-1.5 11H5.5L4 9Z" />
          <path d="M9 9V7a3 3 0 0 1 6 0v2" />
        </svg>
      );
    case "bulk":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 8h16v12H4zM8 8V6h8v2M4 13h16" />
        </svg>
      );
    case "export":
      return (
        <svg {...common} aria-hidden>
          <circle cx="12" cy="12" r="8" />
          <path d="M4 12h16M12 4c2.5 2.8 2.5 13.2 0 16M12 4c-2.5 2.8-2.5 13.2 0 16" />
        </svg>
      );
    default:
      return (
        <svg {...common} aria-hidden>
          <path d="M5 12h14M12 5v14" strokeLinecap="round" />
        </svg>
      );
  }
}

export function BrandIntro() {
  return (
    <section className="bg-cream py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[0.9fr_1.1fr] md:items-center md:px-8">
        <Reveal>
          <div className="bg-forest px-8 py-12 text-cream md:px-10 md:py-14">
            <p className="text-[11px] uppercase tracking-[0.24em] text-gold">
              The brand
            </p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">
              Foods made with real difference in mind.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/75">
              Prime Weaves is a natural foods manufacturer for retail and export.
              We start with a focused range and grow carefully — so quality stays
              ahead of catalog size.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex text-[11px] uppercase tracking-[0.18em] text-gold transition hover:text-cream"
            >
              Explore our story →
            </Link>
          </div>
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { title: "Manufacture", text: "In-house process discipline" },
              { title: "Retail", text: "Packs for everyday kitchens" },
              { title: "Wholesale", text: "Bulk volumes on enquiry" },
              { title: "Export", text: "Partner-ready conversations" },
              { title: "Since 2018", text: "Steady craft, clear focus" },
              { title: "Next up", text: "More products, same care" },
            ].map((tile) => (
              <div
                key={tile.title}
                className="border border-forest/10 bg-white/70 p-5"
              >
                <p className="font-display text-xl text-forest">{tile.title}</p>
                <p className="mt-2 text-xs text-muted">{tile.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FeaturedPicks() {
  return (
    <section id="featured" className="bg-white/50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-leaf">
              Featured picks
            </p>
            <h2 className="mt-2 font-display text-3xl text-forest md:text-4xl">
              In the range now
            </h2>
            <p className="mt-2 max-w-lg text-sm text-muted">
              Our current essentials. The shop is built to welcome more products
              as the catalog expands.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-[11px] font-semibold uppercase tracking-[0.16em] text-forest underline underline-offset-4"
          >
            View all products
          </Link>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
          <article className="flex h-full flex-col border border-dashed border-forest/20 bg-mist/40 p-6">
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-leaf">
                Coming soon
              </p>
              <h3 className="mt-3 font-display text-2xl text-forest">
                More products ahead
              </h3>
              <p className="mt-3 max-w-xs text-sm text-muted">
                New foods will join the range with the same sourcing, process,
                and packing standards.
              </p>
              <Link
                href="/contact"
                className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-forest underline underline-offset-4"
              >
                Ask what’s next
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function ProductShowcase() {
  const current = products;

  return (
    <section id="products" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="section-rule">
            <h2 className="font-display text-3xl text-forest md:text-4xl">
              Know what you’re buying
            </h2>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted">
            Deep product stories for what’s available today. As new items launch,
            they’ll get the same level of clarity.
          </p>
        </Reveal>

        <div className="mt-16 space-y-24">
          {current.map((product, index) => (
            <ProductDeepDive
              key={product.slug}
              product={product}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductDeepDive({
  product,
  reverse,
}: {
  product: (typeof products)[number];
  reverse?: boolean;
}) {
  const isMoringa = product.slug.includes("moringa");
  const process = isMoringa
    ? ["Sourced", "Selected", "Cleaned", "Processed", "Packed"]
    : ["Prepared", "Cultured", "Clarified", "Filtered", "Packed"];
  const uses = isMoringa
    ? ["Smoothies", "Warm water", "Soups", "Dals", "Seasoning", "Routines"]
    : ["Cooking", "Sautéing", "Roasting", "Finishing", "Tadka", "Baking"];

  return (
    <Reveal>
      <article
        className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-16 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <ProductGallery
          name={product.name}
          images={product.gallery}
          accent={product.accent}
        />

        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-leaf">
            {product.category} · {product.badge || "In range"}
          </p>
          <h3 className="mt-3 font-display text-3xl text-forest sm:text-4xl md:text-5xl">
            {product.name}
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-forest/80">
            {product.tagline}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gold">
              Benefits
            </p>
            <ul className="mt-4 space-y-4">
              {product.benefits.slice(0, 4).map((benefit) => (
                <li key={benefit.title}>
                  <p className="text-sm font-medium text-forest">
                    {benefit.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {benefit.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gold">
              Process snapshot
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {process.map((step, index) => (
                <span
                  key={step}
                  className="inline-flex items-center gap-2 text-xs text-forest"
                >
                  <span className="border border-forest/15 bg-white/60 px-3 py-1.5 transition-colors duration-200 hover:border-leaf hover:bg-mist">
                    {step}
                  </span>
                  {index < process.length - 1 ? (
                    <span className="text-muted" aria-hidden>
                      →
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gold">
              Best used in
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {uses.map((use) => (
                <li
                  key={use}
                  className="border border-forest/10 bg-white/50 px-3 py-2 text-sm text-forest transition-colors duration-200 hover:border-leaf/50 hover:bg-mist"
                >
                  {use}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-forest/10 pt-6">
            <div>
              <p className="text-sm text-muted">Available packs</p>
              <p className="mt-1 text-sm font-medium text-forest">
                {product.packs.map((p) => p.label).join(" · ")}
              </p>
              <p className="mt-2 text-sm text-forest">
                From {formatInr(product.price)} · Retail &amp; bulk
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/products/${product.slug}`}
                className="btn-outline"
              >
                View details
              </Link>
              <Link
                href={`/order?product=${product.slug}`}
                className="btn-primary"
              >
                Order
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function DualBanners() {
  return (
    <section className="bg-cream py-6 md:py-10">
      <div className="mx-auto grid max-w-7xl gap-4 px-5 md:grid-cols-2 md:px-8">
        <Link
          href="/shop"
          className="group relative min-h-[240px] overflow-hidden bg-forest sm:min-h-[280px]"
        >
          <Image
            src="/products/moringa-pouch.jpg"
            alt=""
            fill
            className="object-cover opacity-35 transition-opacity duration-500 group-hover:opacity-45"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="relative flex h-full min-h-[240px] flex-col justify-end p-5 text-cream transition-colors duration-300 group-hover:bg-forest-deep/25 sm:min-h-[280px] sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold">
              Everyday essentials
            </p>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl">
              Shop the current range
            </h3>
            <p className="mt-3 max-w-sm text-sm text-cream/75">
              Start with what’s available now — more foods will join under the
              same standards.
            </p>
            <span className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors duration-200 group-hover:text-gold">
              Shop products →
            </span>
          </div>
        </Link>
        <Link
          href="/buying-guide"
          className="group relative min-h-[240px] overflow-hidden bg-cream-deep sm:min-h-[280px]"
        >
          <Image
            src={siteImages.leafAccent}
            alt=""
            fill
            className="object-cover opacity-30 transition-opacity duration-500 group-hover:opacity-40"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="relative flex h-full min-h-[240px] flex-col justify-end p-5 text-forest transition-colors duration-300 group-hover:bg-mist/50 sm:min-h-[280px] sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-leaf">
              Buying guide
            </p>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl">
              How to choose what to buy
            </h3>
            <p className="mt-3 max-w-sm text-sm text-muted">
              Compare products, pick a pack size, and see which order path fits
              your kitchen.
            </p>
            <span className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 group-hover:text-leaf">
              Learn more →
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

export function ImpactStrip() {
  const stats = [
    { value: "2018", label: "Year founded" },
    { value: "5+", label: "Years of craft" },
    { value: "Growing", label: "Product range" },
    { value: "3", label: "Channels: retail · bulk · export" },
  ];

  return (
    <section className="relative overflow-hidden bg-forest py-16 text-cream md:py-20">
      <Image
        src={siteImages.leafAccent}
        alt=""
        fill
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-forest/70" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <p className="text-center text-[11px] uppercase tracking-[0.28em] text-gold">
          Built to last
        </p>
        <h2 className="mt-3 text-center font-display text-3xl md:text-4xl">
          Steady standards. Expanding range.
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl md:text-4xl lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-cream/70 sm:text-[11px] sm:tracking-[0.18em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustBar() {
  const items = [
    { title: "Order by request", text: "Email confirmation — no cart needed" },
    { title: "Retail packs", text: "Ready for home kitchens" },
    { title: "Bulk & export", text: "Business enquiries welcome" },
    { title: "Growing catalog", text: "New products, same care" },
  ];

  return (
    <section className="border-y border-forest/10 bg-cream">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:grid-cols-2 md:grid-cols-4 md:px-8">
        {items.map((item) => (
          <div key={item.title} className="text-center md:text-left">
            <p className="text-sm font-semibold text-forest">{item.title}</p>
            <p className="mt-1 text-xs text-muted">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SourceToPack() {
  const stages = [
    { title: "Source", text: "Ingredient quality sets the ceiling." },
    { title: "Process", text: "Cleaning, crafting, clarifying, milling." },
    { title: "Quality", text: "Consistency from batch to batch." },
    { title: "Pack", text: "Retail formats; bulk on enquiry." },
    { title: "Home & trade", text: "Kitchens, shelves, and partners." },
  ];

  return (
    <section className="bg-mist/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-leaf">
            From source to pack
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-forest md:text-5xl">
            Every product has a process.
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted">
            Whether it’s in the range today or joining later, quality is built
            before the shelf — sourcing, preparation, packing, and supply.
          </p>
        </Reveal>
        <Reveal className="mt-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {stages.map((stage, index) => (
              <div
                key={stage.title}
                className="border border-forest/10 bg-cream p-5"
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl text-forest">
                  {stage.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{stage.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function WhyPrimeweaves() {
  const points = [
    {
      num: "01",
      title: "Focused, then expanded",
      text: "We start with a deliberate range and add products only when standards can keep up — not the other way around.",
    },
    {
      num: "02",
      title: "Thoughtful sourcing",
      text: "Every product begins with attention to ingredient quality and how that choice shows up in aroma, texture, and use.",
    },
    {
      num: "03",
      title: "Careful processing",
      text: "From raw ingredient to final pack, stages are handled for cleanliness, repeatability, and a finished product you can trust.",
    },
    {
      num: "04",
      title: "Traditional + modern",
      text: "Where tradition matters, we keep it. Where modern packing and supply matter, we meet that bar too.",
    },
    {
      num: "05",
      title: "Retail + export",
      text: "Built for individual customers and for bulk or export conversations — one quality approach across channels.",
    },
    {
      num: "06",
      title: "Since 2018",
      text: "Years refining sourcing, production, and fulfillment while preparing the brand to grow carefully.",
    },
  ];

  return (
    <section id="why" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-leaf">
            Why Prime Weaves
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-forest md:text-5xl">
            A brand built to grow without getting careless.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {points.map((point) => (
            <Reveal key={point.num}>
              <div className="h-full border border-forest/10 bg-white/50 p-7 transition hover:border-leaf/40">
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold">
                  {point.num}
                </p>
                <h3 className="mt-3 font-display text-2xl text-forest">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {point.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QualitySection() {
  const items = [
    {
      title: "Ingredient selection",
      text: "Quality starts with what enters the process for every product in the range.",
    },
    {
      title: "Hygienic processing",
      text: "Standards designed around cleanliness, controlled handling, and repeatable steps.",
    },
    {
      title: "Batch consistency",
      text: "Familiar colour, aroma, and handling from one pack to the next.",
    },
    {
      title: "Packaging",
      text: "Retail-ready formats now; bulk packaging discussed as the catalog and volumes grow.",
    },
    {
      title: "Storage guidance",
      text: "Clear everyday advice so products stay in good condition after they leave us.",
    },
    {
      title: "Export readiness",
      text: "Supply conversations that support shelves at home and partners abroad.",
    },
  ];

  return (
    <section id="quality" className="bg-forest py-20 text-cream md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">
            Quality &amp; standards
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl md:text-5xl">
            Quality you can trace through every stage.
          </h2>
          <p className="mt-4 max-w-2xl text-cream/75">
            We describe how we work — without inventing certificates or lab
            numbers that are not published here.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="border border-cream/15 bg-forest-deep/40 p-6"
            >
              <h3 className="font-display text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WaysToUse() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="section-rule">
            <h2 className="font-display text-3xl text-forest md:text-4xl">
              In the kitchen
            </h2>
          </div>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted">
            Practical ideas for products in the range today. New items will
            arrive with their own everyday uses.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Morning rituals",
              text: "Powders and pantry staples that fit drinks and light starts.",
              image: "/products/moringa-pour.png",
            },
            {
              title: "Everyday cooking",
              text: "Fats and ingredients for sautéing, roasting, and finishing.",
              image: "/products/ghee-scoop.png",
            },
            {
              title: "Shared tables",
              text: "Foods suited to family recipes, hospitality, and retail kitchens.",
              image: "/products/hero-pair.png",
            },
          ].map((card) => (
            <Reveal key={card.title}>
              <div className="overflow-hidden border border-forest/10 bg-white/50">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-forest">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{card.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OurStory() {
  return (
    <section id="our-story" className="border-y border-forest/10 bg-white/40 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden bg-mist">
            <Image
              src={siteImages.whyUs}
              alt="Natural ingredients representing Prime Weaves"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </Reveal>
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-leaf">
            Our story · Since 2018
          </p>
          <h2 className="mt-3 font-display text-3xl text-forest md:text-5xl">
            From a home remedy to a gift for the world.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            Prime Weaves began the way many good food stories do — in the home.
            Simple remedies and everyday staples, made carefully for family
            tables long before they were meant for shelves.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            What started as goodness shared under one roof grew into a craft we
            could stand behind. Since 2018 we have manufactured, retailed, and
            supported export conversations so that same care can travel further —
            from kitchens nearby to partners across the world.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            The range is still intentional. We grow it only when the next product
            can carry the same honesty that began at home.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-muted">
            <span>Born at home</span>
            <span>Made since 2018</span>
            <span>Shared worldwide</span>
            <span>Still careful</span>
          </div>
          <Link
            href="/about"
            className="mt-8 inline-flex text-[11px] font-semibold uppercase tracking-[0.16em] text-forest underline underline-offset-4"
          >
            Read more about us →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function RetailExport() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-leaf">
            Retail + bulk / export
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-forest md:text-5xl">
            From your kitchen to global shelves.
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted">
            Whether you need a home pack or a business conversation about volume,
            the path is clear.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full border border-forest/10 bg-white/60 p-8 md:p-10">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold">
                For home
              </p>
              <h3 className="mt-3 font-display text-3xl text-forest">
                Shop for your kitchen
              </h3>
              <p className="mt-4 text-sm text-muted">
                Browse the current range, choose a pack, and send an order
                request. We confirm by email and WhatsApp.
              </p>
              <Link href="/order" className="btn-primary mt-8">
                Shop for Home
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="h-full bg-forest p-8 text-cream md:p-10">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold">
                For business
              </p>
              <h3 className="mt-3 font-display text-3xl">
                Discuss bulk / export
              </h3>
              <p className="mt-4 text-sm text-cream/75">
                Retailers, distributors, and export buyers — share volume and
                packaging needs and we’ll follow up.
              </p>
              <Link
                href="/bulk"
                className="mt-8 inline-flex bg-gold px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-gold-deep"
              >
                Discuss Bulk / Export
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function OrderBanner() {
  const steps = [
    { num: "01", title: "Choose product", text: "From the current range." },
    { num: "02", title: "Select quantity", text: "Pack size and units." },
    { num: "03", title: "Share details", text: "Contact and address." },
    { num: "04", title: "Confirmation", text: "We reply by email and WhatsApp." },
  ];

  return (
    <section id="order" className="bg-gold">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
          <div className="text-ink">
            <p className="text-[11px] uppercase tracking-[0.28em]">
              Order by request
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl">
              Tell us what you need.
            </h2>
            <p className="mt-4 max-w-xl text-ink/75">
              Home orders, retail restocks, or bulk/export enquiries — send your
              requirements and our team will respond.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="border border-ink/10 bg-white/30 p-4"
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] text-forest">
                    {step.num}
                  </p>
                  <p className="mt-2 font-medium text-ink">{step.title}</p>
                  <p className="mt-1 text-sm text-ink/70">{step.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/order"
                className="inline-flex bg-forest px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream transition hover:bg-forest-deep"
              >
                Order for Home
              </Link>
              <Link
                href="/bulk"
                className="inline-flex border border-ink/30 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-ink/5"
              >
                Bulk / Export Enquiry
              </Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden bg-gold-deep/20">
            <Image
              src="/products/hero-pair.png"
              alt="Prime Weaves products"
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
