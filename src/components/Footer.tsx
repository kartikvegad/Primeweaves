import Image from "next/image";
import Link from "next/link";
import { siteContact, whatsappHref } from "@/lib/site";

const shopLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/products/moringa-powder", label: "Moringa Powder" },
  { href: "/products/cultured-ghee", label: "Cultured Ghee" },
  { href: "/#featured", label: "Featured Picks" },
];

const helpLinks = [
  { href: "/#faq", label: "FAQ" },
  { href: "/order", label: "Request Quote" },
  { href: "/contact", label: "Contact" },
  { href: "/bulk", label: "Bulk Support" },
];

const aboutLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/buying-guide", label: "Buying Guide" },
  { href: "/#why", label: "Why Prime Weaves" },
  { href: "/#qualities", label: "Qualities" },
];

export function Footer() {
  return (
    <footer className="bg-forest-deep text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 md:px-8 lg:grid-cols-[1.2fr_1fr_0.8fr_0.8fr_0.8fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Image
            src="/brand/primeweaves-logo.png"
            alt="Prime Weaves"
            width={88}
            height={88}
            className="h-20 w-20 object-contain"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            Natural foods for everyday kitchens and trade partners — manufactured
            since 2018 with a range built to grow carefully.
          </p>
          <div className="mt-6 space-y-2 text-sm text-cream/75">
            <p>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-gold"
              >
                {siteContact.phoneDisplay}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${siteContact.email}`}
                className="transition-colors duration-200 hover:text-gold"
              >
                {siteContact.email}
              </a>
            </p>
            <p className="leading-relaxed">
              {siteContact.addressLines.join(", ")}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-[11px] uppercase tracking-[0.22em] text-gold">
            Stay in the loop
          </h3>
          <p className="mt-4 text-sm text-cream/70">
            Product launches and availability updates.
          </p>
          <form className="mt-5 flex overflow-hidden border border-cream/20 bg-forest">
            <input
              type="email"
              required
              placeholder="Email address"
              className="w-full bg-transparent px-4 py-3 text-sm text-cream outline-none placeholder:text-cream/40"
            />
            <button
              type="submit"
              className="bg-gold px-4 text-sm font-semibold text-ink transition hover:bg-gold-deep"
            >
              Join
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-[11px] uppercase tracking-[0.22em] text-gold">
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
          <h3 className="text-[11px] uppercase tracking-[0.22em] text-gold">
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
          <h3 className="text-[11px] uppercase tracking-[0.22em] text-gold">
            About
          </h3>
          <ul className="mt-4 space-y-3">
            {aboutLinks.map((link) => (
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
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl space-y-3 px-5 py-5 text-xs text-cream/50 md:px-8">
          <p>
            Product appearance and packaging may vary from images shown on this
            website.
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Prime Weaves. All rights reserved.</p>
            <div className="flex gap-5">
              <Link href="/contact" className="hover:text-cream">
                Privacy Policy
              </Link>
              <Link href="/contact" className="hover:text-cream">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
