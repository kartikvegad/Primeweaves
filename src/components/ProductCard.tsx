import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-mist ring-1 ring-transparent transition-[ring-color,background-color] duration-300 group-hover:ring-leaf/40">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          {product.badge ? (
            <span className="absolute left-4 top-4 bg-forest px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-cream transition-colors duration-200 group-hover:bg-forest-deep">
              {product.badge}
            </span>
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-forest/0 transition-colors duration-300 group-hover:bg-forest/10" />
        </div>
      </Link>
      <div className="mt-5 flex flex-1 flex-col">
        <Link href={`/products/${product.slug}`} className="group/title">
          <h3 className="font-display text-2xl text-forest transition-colors duration-200 group-hover/title:text-leaf md:text-3xl">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted">{product.tagline}</p>
        </Link>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-forest">
              {product.packs.map((p) => p.label).join(" · ")}
            </p>
            <p className="mt-1 text-xs text-muted">Request a quotation</p>
          </div>
          <Link
            href={`/order?product=${product.slug}`}
            className="btn-primary !px-4 !py-2.5 !text-[10px]"
          >
            Quote
          </Link>
        </div>
      </div>
    </article>
  );
}
