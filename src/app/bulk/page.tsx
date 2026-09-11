import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Export & Bulk",
  description:
    "Request bulk and export pricing for Primeweaves moringa powder and cultured ghee.",
};

export default function BulkPage() {
  return (
    <div className="bg-cream">
      <section className="bg-forest text-cream">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <p className="text-xs uppercase tracking-[0.28em] text-sage-soft">
            Export & Bulk
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-6xl">
            Partnership-ready supply for distributors and buyers.
          </h1>
          <p className="mt-5 max-w-2xl text-cream/75 leading-relaxed">
            Primeweaves supports wholesale and export orders for moringa powder
            and cultured ghee — with packaging options sized for your market.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl text-forest">
              What we can supply
            </h2>
            <ul className="mt-6 space-y-4 text-sm text-muted">
              <li className="border-l border-sage pl-4">
                Moringa powder in retail and bulk pack sizes
              </li>
              <li className="border-l border-sage pl-4">
                Cultured ghee for regional and international distribution
              </li>
              <li className="border-l border-sage pl-4">
                Consistent manufacturing standards across order volumes
              </li>
              <li className="border-l border-sage pl-4">
                Support for documentation and shipment coordination
              </li>
            </ul>
            <p className="mt-8 text-sm text-muted">
              Prefer a quick conversation?{" "}
              <Link href="/contact" className="text-forest underline underline-offset-4">
                Contact our team
              </Link>
              .
            </p>
          </div>

          <form className="border border-forest/10 bg-white/50 p-6 md:p-8">
            <h3 className="font-display text-3xl text-forest">
              Request a quote
            </h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Company" name="company" required />
              <Field label="Contact name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Country" name="country" required />
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block text-xs uppercase tracking-[0.16em] text-muted">
                Product interest
                <select
                  name="product"
                  className="mt-2 w-full border border-forest/15 bg-cream px-4 py-3 text-sm text-forest outline-none"
                  defaultValue="both"
                >
                  <option value="moringa">Moringa Powder</option>
                  <option value="ghee">Cultured Ghee</option>
                  <option value="both">Both</option>
                </select>
              </label>
              <Field label="Estimated volume" name="volume" />
            </div>
            <div className="mt-5">
              <label className="block text-xs uppercase tracking-[0.16em] text-muted">
                Notes
                <textarea
                  name="notes"
                  rows={5}
                  className="mt-2 w-full border border-forest/15 bg-cream px-4 py-3 text-sm text-forest outline-none"
                  placeholder="Target market, pack sizes, timelines…"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 bg-forest px-7 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-cream transition hover:bg-forest-deep"
            >
              Submit inquiry
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
    <label className="block text-xs uppercase tracking-[0.16em] text-muted">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border border-forest/15 bg-cream px-4 py-3 text-sm text-forest outline-none transition focus:border-forest"
      />
    </label>
  );
}
