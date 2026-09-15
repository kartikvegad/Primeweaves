import type { Metadata } from "next";
import Link from "next/link";
import { siteContact, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Prime Weaves by phone, email, or address for retail orders, partnerships, and support.",
};

export default function ContactPage() {
  return (
    <div className="bg-cream">
      <section className="border-b border-forest/10 bg-forest text-cream">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">
            Contact
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl sm:text-5xl md:text-6xl">
            Let’s talk products, packs, and partnerships.
          </h1>
          <p className="mt-4 max-w-xl text-cream/75">
            Reach us by phone, email, or visit details below — or send a message
            and we’ll reply during business hours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article className="border border-forest/10 bg-white/60 p-6 transition-colors duration-200 hover:border-leaf/40 hover:bg-mist/40">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gold">
              Phone / WhatsApp
            </p>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block font-display text-2xl text-forest transition-colors duration-200 hover:text-leaf md:text-3xl"
            >
              {siteContact.phoneDisplay}
            </a>
            <p className="mt-3 text-sm text-muted">
              Message or call during {siteContact.hours}.
            </p>
          </article>

          <article className="border border-forest/10 bg-white/60 p-6 transition-colors duration-200 hover:border-leaf/40 hover:bg-mist/40">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gold">
              Email
            </p>
            <a
              href={`mailto:${siteContact.email}`}
              className="mt-4 block break-all font-display text-xl text-forest transition-colors duration-200 hover:text-leaf md:text-2xl lg:text-3xl"
            >
              {siteContact.email}
            </a>
            <p className="mt-3 text-sm text-muted">
              For orders, partnerships, and general support.
            </p>
          </article>

          <article className="border border-forest/10 bg-white/60 p-6 transition-colors duration-200 hover:border-leaf/40 hover:bg-mist/40 sm:col-span-2 lg:col-span-1">
            <p className="text-[11px] uppercase tracking-[0.18em] text-gold">
              Address
            </p>
            <address className="mt-4 not-italic">
              {siteContact.addressLines.map((line) => (
                <p
                  key={line}
                  className="font-display text-xl text-forest md:text-2xl lg:text-3xl"
                >
                  {line}
                </p>
              ))}
            </address>
            <p className="mt-3 text-sm text-muted">
              Hours: {siteContact.hours}
            </p>
          </article>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-display text-4xl text-forest">
              Prefer a written message?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              Share your question below. For larger export volumes, use our
              dedicated bulk form instead.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={whatsappHref("Hi Prime Weaves — I’d like to get in touch.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Message on WhatsApp
              </Link>
              <Link href="/bulk" className="btn-outline">
                Bulk / Export
              </Link>
            </div>
          </div>

          <form className="border border-forest/10 bg-white/60 p-6 md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
            </div>
            <div className="mt-5">
              <Field label="Phone number" name="phone" type="tel" />
            </div>
            <div className="mt-5">
              <Field label="Subject" name="subject" required />
            </div>
            <div className="mt-5">
              <label className="block text-[11px] uppercase tracking-[0.16em] text-muted">
                Message
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="field mt-2 resize-y"
                />
              </label>
            </div>
            <button type="submit" className="btn-primary mt-6">
              Send message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-[11px] uppercase tracking-[0.16em] text-muted">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="field mt-2"
      />
    </label>
  );
}
