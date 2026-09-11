"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/bulk", label: "Export" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-display text-[1.65rem] tracking-[0.06em] text-forest md:text-[1.85rem]">
            PRIMEWEAVES
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted">
            Since 2018
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] uppercase tracking-[0.2em] transition ${
                  active
                    ? "text-forest underline decoration-sage decoration-1 underline-offset-8"
                    : "text-muted hover:text-forest"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/order"
            className="hidden rounded-full bg-forest px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-cream transition hover:bg-forest-deep sm:inline-flex"
          >
            Place Order
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-forest/20 text-forest lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-4 flex-col gap-1">
              <span className="block h-px w-full bg-forest" />
              <span className="block h-px w-full bg-forest" />
              <span className="block h-px w-full bg-forest" />
            </div>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-forest/10 bg-cream px-5 py-5 lg:hidden">
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
              className="mt-2 inline-flex w-fit rounded-full bg-forest px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] text-cream"
            >
              Place Order
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
