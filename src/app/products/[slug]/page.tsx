import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatInr, getProduct, products } from "@/lib/products";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductPurchase } from "@/components/ProductPurchase";
import { ProductTabs } from "@/components/ProductTabs";
import { ProductCard } from "@/components/ProductCard";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((item) => item.slug !== product.slug);

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <nav className="text-[11px] uppercase tracking-[0.16em] text-muted">
          <Link href="/" className="hover:text-forest">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-forest">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-forest">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery
            name={product.name}
            images={product.gallery}
            accent={product.accent}
          />

          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-display text-5xl text-forest md:text-6xl">
                  {product.name}
                </h1>
                <p className="mt-3 text-sm text-muted">
                  {product.category} · {product.size}
                </p>
              </div>
              {product.badge ? (
                <span className="shrink-0 bg-mist px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-forest">
                  {product.badge}
                </span>
              ) : null}
            </div>

            <div className="mt-6 flex items-end gap-3">
              <p className="font-display text-5xl text-forest">
                {formatInr(product.price)}
              </p>
              {product.compareAt ? (
                <p className="pb-2 text-muted line-through">
                  {formatInr(product.compareAt)}
                </p>
              ) : null}
            </div>
            <p className="mt-1 text-sm text-muted">Starting pack price</p>
            <p className="mt-2 text-sm text-muted">{product.tagline}</p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
              {product.description}
            </p>

            <ProductPurchase product={product} />
            <ProductTabs
              howToUse={product.howToUse}
              benefits={product.benefits}
              ingredients={product.ingredients}
            />
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-24 border-t border-forest/10 pt-16">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-4xl text-forest">
                You might also like
              </h2>
              <Link
                href="/order"
                className="text-[11px] uppercase tracking-[0.18em] text-muted hover:text-forest"
              >
                Place an order →
              </Link>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:max-w-3xl">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
