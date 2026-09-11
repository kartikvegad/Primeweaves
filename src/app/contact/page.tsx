import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Primeweaves for retail orders, partnerships, and support.",
};

export default function ContactPage() {
  return (
    <div className="bg-cream">
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-sage">
              Contact
            </p>
            <h1 className="mt-3 font-display text-5xl text-forest md:text-6xl">
              Let’s talk products, packs, and partnerships.
            </h1>
            <p className="mt-5 max-w-md text-muted leading-relaxed">
              Reach out for retail questions, wholesale rates, or general
              support. For larger export volumes, use our dedicated bulk form.
            </p>
            <div className="mt-10 space-y-4 text-sm text-muted">
              <p>
                <span className="block text-xs uppercase tracking-[0.18em] text-sage">
                  Email
                </span>
                hello@primeweaves.com
              </p>
              <p>
                <span className="block text-xs uppercase tracking-[0.18em] text-sage">
                  Phone
                </span>
                +91 00000 00000
              </p>
              <p>
                <span className="block text-xs uppercase tracking-[0.18em] text-sage">
                  Hours
                </span>
                10:00 AM – 7:00 PM
              </p>
            </div>
          </div>

          <form className="bg-white/60 p-6 md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
            </div>
            <div className="mt-5">
              <Field label="Subject" name="subject" required />
            </div>
            <div className="mt-5">
              <label className="block text-xs uppercase tracking-[0.16em] text-muted">
                Message
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="mt-2 w-full border border-forest/15 bg-cream px-4 py-3 text-sm text-forest outline-none transition focus:border-forest"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 bg-forest px-7 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-cream transition hover:bg-forest-deep"
            >
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
