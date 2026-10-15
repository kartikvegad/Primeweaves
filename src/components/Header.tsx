"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { razorpayPaymentUrl } from "@/lib/site";
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
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const solid = !isHome || scrolled || open;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-300 ${
          solid
            ? "bg-cream/95 text-forest shadow-[0_1px_0_rgba(31,58,40,0.08)] backdrop-blur-md"
            : "bg-transparent text-cream shadow-none"
        }`}
      >
        <div className={solid ? "border-b border-forest/10" : "border-b border-transparent"}>
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-1 md:gap-4 md:px-8 md:py-1.5">
            <Link href="/" className="flex shrink-0 items-center gap-2 md:gap-2.5">
              <Image
                src="/brand/primeweaves-logo.png"
                alt="Prime Weaves"
                width={88}
                height={88}
                className={`h-16 w-16 rounded-full object-contain transition-[filter] duration-300 md:h-[4.5rem] md:w-[4.5rem] ${
                  solid ? "" : "brightness-0 invert"
                }`}
                priority
              />
              <span
                className={`hidden font-display text-xl tracking-[0.04em] sm:inline md:text-2xl ${
                  solid ? "text-forest" : "text-cream"
                }`}
              >
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
                      : pathname === link.href ||
                        pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`whitespace-nowrap text-[10px] uppercase tracking-[0.16em] transition-colors duration-200 xl:text-[11px] xl:tracking-[0.18em] ${
                      solid
                        ? active
                          ? "text-forest underline decoration-leaf underline-offset-8"
                          : "text-muted hover:text-forest"
                        : active
                          ? "text-gold underline decoration-gold underline-offset-8"
                          : "text-cream/85 hover:text-cream"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <Link
                href={razorpayPaymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden !px-4 !py-2.5 !text-[10px] sm:inline-flex md:!px-5 md:!text-[11px] ${
                  solid
                    ? "btn-outline"
                    : "inline-flex border border-cream/50 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors duration-200 hover:bg-cream/10 md:px-5 md:text-[11px]"
                }`}
              >
                Pay
              </Link>
              <Link
                href="/order"
                className={`hidden !px-4 !py-2.5 !text-[10px] sm:inline-flex md:!px-5 md:!text-[11px] ${
                  solid
                    ? "btn-primary"
                    : "inline-flex border border-cream/50 bg-cream/95 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors duration-200 hover:bg-white md:px-5 md:text-[11px]"
                }`}
              >
                Request Quote
              </Link>
              <button
                type="button"
                className={`inline-flex h-10 w-10 items-center justify-center border transition-colors duration-200 lg:hidden ${
                  solid
                    ? "border-forest/20 hover:border-forest hover:bg-mist"
                    : "border-cream/40 hover:border-cream hover:bg-cream/10"
                }`}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
              >
                <div className="flex w-4 flex-col gap-1">
                  <span
                    className={`block h-px w-full transition-transform duration-200 ${
                      solid ? "bg-forest" : "bg-cream"
                    } ${open ? "translate-y-[5px] rotate-45" : ""}`}
                  />
                  <span
                    className={`block h-px w-full transition-opacity duration-200 ${
                      solid ? "bg-forest" : "bg-cream"
                    } ${open ? "opacity-0" : ""}`}
                  />
                  <span
                    className={`block h-px w-full transition-transform duration-200 ${
                      solid ? "bg-forest" : "bg-cream"
                    } ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {solid ? (
          <div className="border-b border-forest/10 bg-mist/40">
            <p className="mx-auto max-w-7xl px-4 py-2 text-center text-[10px] uppercase tracking-[0.14em] text-muted sm:tracking-[0.2em] md:px-8 md:py-2.5 md:text-[11px] md:tracking-[0.22em]">
              Conscious choices. Better everyday food.
            </p>
          </div>
        ) : null}

        {open ? (
          <div className="max-h-[min(70vh,520px)] overflow-y-auto border-b border-forest/10 bg-cream px-5 py-5 text-forest lg:hidden">
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
                href={razorpayPaymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-outline mt-4 w-full text-center"
              >
                Pay
              </Link>
              <Link
                href="/order"
                onClick={() => setOpen(false)}
                className="btn-primary mt-3 w-full text-center"
              >
                Request Quote
              </Link>
            </nav>
          </div>
        ) : null}
      </header>
      {/* Reserve max header height so layout never jumps when tagline appears */}
      <div className="h-[7.5rem] md:h-[8rem]" aria-hidden />
    </>
  );
}
