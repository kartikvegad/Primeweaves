"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/shop", label: "Shop All" },
  { href: "/#featured", label: "Featured" },
  { href: "/#qualities", label: "Qualities" },
  { href: "/about", label: "Our Story" },
  { href: "/bulk", label: "Bulk & Export" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 text-forest backdrop-blur-md">
      <div className="border-b border-forest/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/brand/primeweaves-logo.png"
              alt="Primeweaves"
              width={56}
              height={56}
              className="h-12 w-12 rounded-full object-contain md:h-14 md:w-14"
              priority
            />
            <span className="font-display text-xl tracking-[0.04em] text-forest md:text-2xl">
              Primeweaves
            </span>
          </Link>

          <p className="hidden text-center text-[11px] uppercase tracking-[0.22em] text-muted lg:block">
            Conscious choices. Better everyday food.
          </p>

          <div className="flex items-center gap-3">
            <Link
              href="/order"
              className="hidden bg-forest px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream transition hover:bg-forest-deep sm:inline-flex"
            >
              Place Order
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-forest/20 lg:hidden"
              aria-label="Toggle menu"
              onClick={() => setOpen((value) => !value)}
            >
              <div className="flex w-4 flex-col gap-1">
                <span className="block h-px w-full bg-forest" />
                <span className="block h-px w-full bg-forest" />
                <span className="block h-px w-full bg-forest" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="hidden border-b border-forest/10 bg-mist/50 lg:block">
        <nav className="mx-auto flex max-w-7xl items-center justify-center gap-8 px-8 py-3">
          {links.map((link) => {
            const active =
              link.href.startsWith("/#")
                ? false
                : pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] uppercase tracking-[0.18em] transition ${
                  active
                    ? "text-forest underline decoration-leaf underline-offset-8"
                    : "text-muted hover:text-forest"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {open ? (
        <div className="border-b border-forest/10 bg-cream px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.18em] text-forest"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/order"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit bg-forest px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream"
            >
              Place Order
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
