import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { formatInr } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const bg =
    product.accent === "moringa" ? "bg-mist" : "bg-[color:var(--cream-deep)]";

  return (
    <article className="group flex h-full flex-col">
      <Link href={`/products/${product.slug}`} className="block">
        <div
          className={`relative aspect-[5/6] overflow-hidden ${bg} transition duration-500 group-hover:shadow-[0_24px_60px_rgba(31,51,38,0.14)]`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          {product.badge ? (
            <span className="absolute left-4 top-4 bg-forest px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-cream">
              {product.badge}
            </span>
          ) : null}
        </div>
      </Link>
      <div className="mt-5 flex flex-1 flex-col">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display text-3xl text-forest">{product.name}</h3>
          <p className="mt-1 text-sm text-muted">{product.tagline}</p>
        </Link>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-forest">
              From {formatInr(product.price)}
            </p>
            <p className="mt-1 text-xs text-muted">{product.size}</p>
          </div>
          <Link
            href={`/order?product=${product.slug}`}
            className="inline-flex rounded-full bg-forest px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-cream transition hover:bg-forest-deep"
          >
            Order
          </Link>
        </div>
      </div>
    </article>
  );
}
