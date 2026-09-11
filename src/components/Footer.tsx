import Link from "next/link";

const shopLinks = [
  { href: "/products/moringa-powder", label: "Moringa Powder" },
  { href: "/products/cultured-ghee", label: "Cultured Ghee" },
  { href: "/shop", label: "All Products" },
  { href: "/order", label: "Place Order" },
];

const helpLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/bulk", label: "Export Inquiry" },
  { href: "/about", label: "Our Story" },
  { href: "/order", label: "Order Request" },
];

export function Footer() {
  return (
    <footer className="bg-forest-deep text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div>
          <p className="font-display text-3xl tracking-[0.04em]">PRIMEWEAVES</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            Manufacturing, retail, and export of pure moringa powder and
            traditionally cultured ghee since 2018.
          </p>
          <Link
            href="/order"
            className="mt-6 inline-flex rounded-full bg-cream px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] text-forest transition hover:bg-white"
          >
            Place Order
          </Link>
        </div>

        <div>
          <h3 className="text-[11px] uppercase tracking-[0.22em] text-sage-soft">
            Shop
          </h3>
          <ul className="mt-4 space-y-3">
            {shopLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-cream/80 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] uppercase tracking-[0.22em] text-sage-soft">
            Help
          </h3>
          <ul className="mt-4 space-y-3">
            {helpLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-cream/80 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] uppercase tracking-[0.22em] text-sage-soft">
            How ordering works
          </h3>
          <p className="mt-4 text-sm text-cream/70">
            Submit product, quantity, and address. We receive your request by
            email and confirm next steps — no cart checkout required.
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-cream/50 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Primeweaves. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/contact" className="hover:text-cream">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-cream">
              Terms
            </Link>
            <Link href="/bulk" className="hover:text-cream">
              Export
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
