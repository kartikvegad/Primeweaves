import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatInr, products } from "@/lib/products";
import { Reveal } from "@/components/home/Reveal";

export const metadata: Metadata = {
  title: "Buying Guide",
  description:
    "A practical guide to choosing Prime Weaves moringa powder or cultured ghee, picking pack sizes, and placing your order.",
};

const steps = [
  {
    title: "Pick the product that fits your kitchen",
    text: "Moringa powder is for everyday drinks, smoothies, and cooking. Cultured ghee is for sautéing, roasting, tadka, and finishing dishes. Many households keep both.",
  },
  {
    title: "Choose a pack size you will finish",
    text: "Start smaller if you are trying something new. Move up when you know how often you use it — so freshness stays high and nothing sits unused.",
  },
  {
    title: "Decide how you want to order",
    text: "Home and small retail needs use the order form. Larger kitchen, shop, or export volumes use the bulk enquiry so we can quote the right quantity.",
  },
  {
    title: "Share delivery details and wait for confirmation",
    text: "There is no online payment yet. You send a request; our team confirms availability, pricing, and delivery by email and WhatsApp.",
  },
];

const faqs = [
  {
    q: "Which product should I buy first?",
    a: "If you cook with fat daily, start with cultured ghee. If you want a green powder for drinks and dals, start with moringa. Both are everyday essentials — not specialty one-offs.",
  },
  {
    q: "How much should I order?",
    a: "For first-time home use, the smallest pack is enough to learn the taste and routine. Regular users usually prefer mid-size packs listed on each product page.",
  },
  {
    q: "Can I order both products together?",
    a: "Yes. Note both items in your order request (or place two lines of detail in the notes). We confirm the combined request by email and WhatsApp.",
  },
  {
    q: "What if I need wholesale or export?",
    a: "Use Bulk & Export instead of the home order form. Share estimated volume, destination, and preferred pack sizes so we can respond properly.",
  },
];

export default function BuyingGuidePage() {
  return (
    <div className="bg-cream">
      <section className="relative min-h-[48vh] overflow-hidden bg-forest-deep">
        <Image
          src="/products/hero-pair.png"
          alt=""
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-forest-deep/50" />
        <div className="relative mx-auto flex min-h-[48vh] max-w-7xl items-end px-5 pb-14 md:px-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-gold">
              For shoppers
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-3xl text-cream sm:text-5xl md:text-6xl">
              How to buy with confidence
            </h1>
            <p className="mt-4 max-w-xl text-cream/80">
              A short guide to choosing the right product, pack size, and order
              path — written for your kitchen, not our company story.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <div className="section-rule">
            <h2 className="font-display text-3xl text-forest md:text-4xl">
              Four simple steps
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <Reveal key={step.title} delayMs={index * 50}>
              <article className="h-full border border-forest/10 bg-white/55 p-7 transition-colors duration-200 hover:border-leaf/40 hover:bg-mist/40">
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold">
                  Step 0{index + 1}
                </p>
                <h3 className="mt-3 font-display text-2xl text-forest md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <div className="section-rule">
            <h2 className="font-display text-3xl text-forest md:text-4xl">
              Compare what’s in the range
            </h2>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted">
            Use this side-by-side to decide what belongs in your pantry.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {products.map((product, index) => (
            <Reveal key={product.slug} delayMs={index * 80}>
              <article className="overflow-hidden border border-forest/10 bg-white/50">
                <div className="relative aspect-[16/10] bg-mist">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-7">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-leaf">
                    {product.category}
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-forest">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{product.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {product.description}
                  </p>

                  <div className="mt-6">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-gold">
                      Best for
                    </p>
                    <ul className="mt-3 space-y-3">
                      {product.benefits.slice(0, 3).map((benefit) => (
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

                  <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-forest/10 pt-5">
                    <div>
                      <p className="text-sm text-muted">Packs</p>
                      <p className="mt-1 text-sm font-medium text-forest">
                        {product.packs.map((p) => p.label).join(" · ")}
                      </p>
                      <p className="mt-1 text-sm text-forest">
                        From {formatInr(product.price)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="btn-outline !px-4 !py-2.5"
                      >
                        Details
                      </Link>
                      <Link
                        href={`/order?product=${product.slug}`}
                        className="btn-primary !px-4 !py-2.5"
                      >
                        Order
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <div className="section-rule">
            <h2 className="font-display text-3xl text-forest md:text-4xl">
              Quick answers
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="border border-forest/10 bg-mist/35 px-6 py-5"
              >
                <h3 className="font-display text-xl text-forest">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 border border-forest/10 bg-forest px-8 py-10 text-cream md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl">Ready to choose?</h2>
            <p className="mt-2 max-w-lg text-sm text-cream/75">
              Browse the range, pick a pack, and send your order request — or
              ask for wholesale pricing if you need more volume.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop" className="btn-accent">
              Shop
            </Link>
            <Link
              href="/order"
              className="inline-flex border border-cream/35 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors duration-200 hover:border-cream hover:bg-cream/10"
            >
              Place order
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
