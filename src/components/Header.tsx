"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/#featured", label: "Featured" },
  { href: "/#qualities", label: "Qualities" },
  { href: "/about", label: "Our Story" },
  { href: "/buying-guide", label: "Buying Guide" },
  { href: "/bulk", label: "Bulk & Export" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 text-forest backdrop-blur-md">
      <div className="border-b border-forest/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1.5 md:gap-4 md:px-8 md:py-2">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 md:gap-3">
            <Image
              src="/brand/primeweaves-logo.png"
              alt="Prime Weaves"
              width={72}
              height={72}
              className="h-14 w-14 rounded-full object-contain md:h-16 md:w-16"
              priority
            />
            <span className="hidden font-display text-xl tracking-[0.04em] text-forest sm:inline md:text-2xl">
              Prime Weaves
            </span>
          </Link>

          <nav className="hidden items-center justify-center gap-5 xl:gap-7 lg:flex">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : link.href.startsWith("/#")
                    ? false
                    : pathname === link.href || pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap text-[10px] uppercase tracking-[0.16em] transition-colors duration-200 xl:text-[11px] xl:tracking-[0.18em] ${
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

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/order"
              className="btn-primary hidden !px-4 !py-2.5 !text-[10px] sm:inline-flex md:!px-5 md:!text-[11px]"
            >
              Place Order
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-forest/20 transition-colors duration-200 hover:border-forest hover:bg-mist lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <div className="flex w-4 flex-col gap-1">
                <span
                  className={`block h-px w-full bg-forest transition-transform duration-200 ${
                    open ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-full bg-forest transition-opacity duration-200 ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-px w-full bg-forest transition-transform duration-200 ${
                    open ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-forest/10 bg-mist/40">
        <p className="mx-auto max-w-7xl px-4 py-2 text-center text-[10px] uppercase tracking-[0.14em] text-muted sm:tracking-[0.2em] md:px-8 md:py-2.5 md:text-[11px] md:tracking-[0.22em]">
          Conscious choices. Better everyday food.
        </p>
      </div>

      {open ? (
        <div className="max-h-[min(70vh,520px)] overflow-y-auto border-b border-forest/10 bg-cream px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-forest/5 py-3 text-sm uppercase tracking-[0.16em] text-forest transition-colors duration-200 hover:text-leaf"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/order"
              onClick={() => setOpen(false)}
              className="btn-primary mt-4 w-full text-center"
            >
              Place Order
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
