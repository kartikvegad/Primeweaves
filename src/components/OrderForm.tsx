"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { products } from "@/lib/products";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { whatsappHref } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";
type OrderType = "retail" | "bulk" | "export";

const orderTypes: { value: OrderType; label: string; hint: string }[] = [
  { value: "retail", label: "Retail", hint: "Home & small orders" },
  { value: "bulk", label: "Bulk", hint: "Wholesale supply" },
  { value: "export", label: "Export", hint: "International" },
];

export function OrderForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSlug =
    searchParams.get("product") || products[0]?.slug || "moringa-powder";
  const initialQty = Math.max(1, Number(searchParams.get("qty") || 1));
  const initialPack = searchParams.get("pack") || "";

  const [productSlug, setProductSlug] = useState(initialSlug);
  const product = useMemo(
    () => products.find((item) => item.slug === productSlug) ?? products[0],
    [productSlug],
  );
  const [packId, setPackId] = useState(
    initialPack && product.packs.some((p) => p.id === initialPack)
      ? initialPack
      : product.packs[0]?.id || "",
  );
  const [quantity, setQuantity] = useState(initialQty);
  const [orderType, setOrderType] = useState<OrderType>("retail");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const pack =
    product.packs.find((item) => item.id === packId) || product.packs[0];

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      productSlug,
      packId: pack?.id || "",
      quantity,
      orderType,
      addressLine1: String(form.get("addressLine1") || ""),
      addressLine2: String(form.get("addressLine2") || ""),
      city: String(form.get("city") || ""),
      state: String(form.get("state") || ""),
      pincode: String(form.get("pincode") || ""),
      country: String(form.get("country") || "India"),
      notes: String(form.get("notes") || ""),
    };

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        error?: string;
        message?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Could not submit quotation request.");
        return;
      }

      setStatus("success");
      setMessage(
        data.message ||
          "Quotation request sent. Our team will reply by email and WhatsApp shortly.",
      );
      event.currentTarget.reset();
      window.setTimeout(() => router.push("/shop"), 2800);
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid items-start gap-6 md:gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_380px]"
    >
      <div className="order-2 space-y-6 md:space-y-8 lg:order-1">
        <section className="border border-forest/10 bg-white/60 p-5 sm:p-6 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold">
                Step 01
              </p>
              <h2 className="mt-1 font-display text-2xl text-forest sm:text-3xl">
                Choose product
              </h2>
            </div>
            <Link
              href="/buying-guide"
              className="text-[11px] uppercase tracking-[0.16em] text-muted transition-colors duration-200 hover:text-forest"
            >
              Need help choosing? →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {products.map((item) => {
              const active = item.slug === productSlug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => {
                    setProductSlug(item.slug);
                    setPackId(item.packs[0]?.id || "");
                  }}
                  className={`overflow-hidden border text-left transition-colors duration-200 ${
                    active
                      ? "border-forest bg-mist/70"
                      : "border-forest/10 bg-cream/40 hover:border-forest/40 hover:bg-mist/40"
                  }`}
                >
                  <div className="relative aspect-[16/10] bg-mist">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 280px"
                    />
                    {active ? (
                      <span className="absolute left-3 top-3 bg-forest px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-cream">
                        Selected
                      </span>
                    ) : null}
                  </div>
                  <div className="p-4">
                    <p className="font-display text-xl text-forest sm:text-2xl">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-muted">{item.tagline}</p>
                    <p className="mt-3 text-sm text-forest">
                      Packs: {item.packs.map((p) => p.label).join(" · ")}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="border border-forest/10 bg-white/60 p-5 sm:p-6 md:p-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold">
            Step 02
          </p>
          <h2 className="mt-1 font-display text-2xl text-forest sm:text-3xl">
            Pack, quantity & order type
          </h2>

          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
              Pack size
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
              {product.packs.map((item) => {
                const active = item.id === pack?.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPackId(item.id)}
                    className={`border px-3 py-3.5 text-left transition-colors duration-200 ${
                      active
                        ? "border-forest bg-forest text-cream"
                        : "border-forest/15 bg-white text-forest hover:border-forest hover:bg-mist"
                    }`}
                  >
                    <span className="block text-sm font-medium">
                      {item.label}
                    </span>
                    <span
                      className={`mt-1 block text-xs ${
                        active ? "text-cream/75" : "text-muted"
                      }`}
                    >
                      Quote on request
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <QuantityStepper value={quantity} onChange={setQuantity} />

            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                Order type
              </p>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {orderTypes.map((type) => {
                  const active = orderType === type.value;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setOrderType(type.value)}
                      className={`flex items-center justify-between gap-3 border px-3 py-3 text-left transition-colors duration-200 sm:flex-col sm:items-center sm:justify-center sm:px-2 sm:text-center ${
                        active
                          ? "border-forest bg-mist"
                          : "border-forest/15 bg-white hover:border-forest/40 hover:bg-mist/50"
                      }`}
                    >
                      <span className="block text-xs font-medium text-forest">
                        {type.label}
                      </span>
                      <span className="block text-[10px] text-muted sm:mt-1">
                        {type.hint}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="border border-forest/10 bg-white/60 p-5 sm:p-6 md:p-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold">
            Step 03
          </p>
          <h2 className="mt-1 font-display text-2xl text-forest sm:text-3xl">
            Your details
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <div className="sm:col-span-2">
              <Field
                label="Phone / WhatsApp number"
                name="phone"
                type="tel"
                required
              />
            </div>
          </div>
        </section>

        <section className="border border-forest/10 bg-white/60 p-5 sm:p-6 md:p-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold">
            Step 04
          </p>
          <h2 className="mt-1 font-display text-2xl text-forest sm:text-3xl">
            Delivery address
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Address line 1" name="addressLine1" required />
            </div>
            <div className="sm:col-span-2">
              <Field label="Address line 2 (optional)" name="addressLine2" />
            </div>
            <Field label="City" name="city" required />
            <Field label="State" name="state" required />
            <Field label="Pincode / ZIP" name="pincode" required />
            <Field
              label="Country"
              name="country"
              defaultValue="India"
              required
            />
            <div className="sm:col-span-2">
              <label className="block text-[11px] uppercase tracking-[0.16em] text-muted">
                Notes (optional)
                <textarea
                  name="notes"
                  rows={4}
                  placeholder="Preferred delivery window, packaging needs, etc."
                  className="field mt-2 resize-y"
                />
              </label>
            </div>
          </div>
        </section>

        {status === "success" ? (
          <p className="border border-sage bg-mist px-5 py-4 text-sm text-forest">
            {message}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-800">
            {message}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "loading" ? "Sending request…" : "Request a quotation"}
          </button>
          <p className="text-sm text-muted">
            We’ll reply with pricing by email and WhatsApp.
          </p>
        </div>
      </div>

      <aside className="order-1 space-y-4 lg:order-2 lg:sticky lg:top-36">
        <div className="overflow-hidden border border-forest/10 bg-white/70">
          <div className="relative aspect-[16/10] bg-mist lg:aspect-[4/5]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 380px"
            />
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-leaf">
              Quotation summary
            </p>
            <h3 className="mt-2 font-display text-2xl text-forest sm:text-3xl">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-muted">{product.tagline}</p>

            <dl className="mt-5 space-y-3 border-t border-forest/10 pt-4 text-sm sm:mt-6 sm:pt-5">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Pack</dt>
                <dd className="font-medium text-forest">{pack?.label}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Quantity</dt>
                <dd className="font-medium text-forest">{quantity}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Type</dt>
                <dd className="font-medium capitalize text-forest">
                  {orderType}
                </dd>
              </div>
              <div className="border-t border-forest/10 pt-3">
                <p className="text-sm font-medium text-forest">
                  Pricing on quotation
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  No prices are listed online. Choose a pack size and we’ll
                  share a quotation for your request.
                </p>
              </div>
            </dl>
          </div>
        </div>

        <div className="border border-forest/10 bg-mist/50 p-5">
          <p className="text-[11px] uppercase tracking-[0.16em] text-gold">
            Prefer to chat?
          </p>
          <p className="mt-2 text-sm text-muted">
            Message us on WhatsApp if you have a quick question before sending
            the form.
          </p>
          <Link
            href={whatsappHref(
              `Hi Prime Weaves — I’d like a quotation for ${product.name} (${pack?.label || ""}) × ${quantity}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex bg-[#25D366] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-[#1ebe57]"
          >
            WhatsApp quotation help
          </Link>
        </div>
      </aside>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="block text-[11px] uppercase tracking-[0.16em] text-muted">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="field mt-2"
      />
    </label>
  );
}
