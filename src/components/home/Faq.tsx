"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What products does Primeweaves offer?",
    a: "We currently offer a focused range of natural food products, starting with moringa leaf powder and traditionally cultured ghee. More products will be added carefully over time.",
  },
  {
    q: "What is cultured ghee?",
    a: "Cultured ghee begins with a cultured dairy base before clarification. Milk solids are carefully removed through slow clarification, leaving a rich, aromatic fat suited to everyday cooking.",
  },
  {
    q: "How is the moringa powder processed?",
    a: "Selected moringa leaves are cleaned and processed into a fine powder, then packed for retail and bulk use. Processing is designed around cleanliness, consistency, and a versatile everyday texture.",
  },
  {
    q: "What pack sizes are available?",
    a: "Moringa powder is offered from 100g to 1kg packs. Cultured ghee is offered from 250ml to 1 litre. Larger or custom pack needs can be discussed through bulk and export enquiry.",
  },
  {
    q: "Do you offer bulk quantities?",
    a: "Yes. Share your product, estimated volume, pack preference, and destination details on the order or bulk enquiry form and our team will follow up.",
  },
  {
    q: "Do you handle export orders?",
    a: "Yes. Primeweaves supports export enquiries alongside retail and wholesale. Tell us your market, volume, and packaging needs when you send a request.",
  },
  {
    q: "How can I place an order?",
    a: "Use the Place Order page to choose a product, pack size, quantity, and delivery details. There is no online cart checkout — you send a request and we confirm by email.",
  },
  {
    q: "How long does order confirmation take?",
    a: "Most requests are reviewed and answered by email during business hours. Timing can vary with order size and export documentation needs.",
  },
  {
    q: "How should products be stored?",
    a: "Keep moringa powder sealed in a cool, dry place away from moisture and direct sunlight. Store ghee with a clean, dry spoon; refrigeration is not required when kept sealed and dry.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <p className="text-center text-[11px] uppercase tracking-[0.28em] text-leaf">
          FAQ
        </p>
        <h2 className="mt-3 text-center font-display text-3xl text-forest md:text-4xl">
          Common questions
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted">
          Short answers about products, ordering, packs, and how we work with
          retail and bulk buyers.
        </p>

        <div className="mt-12 divide-y divide-forest/10 border-y border-forest/10">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 py-5 text-left"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-forest">{item.q}</span>
                  <span className="mt-0.5 text-leaf" aria-hidden>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen ? (
                  <p className="pb-5 text-sm leading-relaxed text-muted">
                    {item.a}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
