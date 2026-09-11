"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatInr, products } from "@/lib/products";

type Status = "idle" | "loading" | "success" | "error";

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
  const [orderType, setOrderType] = useState<"retail" | "bulk" | "export">(
    "retail",
  );
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const pack =
    product.packs.find((item) => item.id === packId) || product.packs[0];
  const estimated = (pack?.price || 0) * quantity;

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
      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Could not submit order.");
        return;
      }

      setStatus("success");
      setMessage(
        data.message ||
          "Order request sent. Our team will contact you shortly.",
      );
      event.currentTarget.reset();
      window.setTimeout(() => router.push("/shop"), 2800);
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <section className="space-y-4">
        <h2 className="font-display text-2xl text-forest">Product</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-xs uppercase tracking-[0.16em] text-muted">
            Product
            <select
              value={productSlug}
              onChange={(e) => {
                const next = products.find((p) => p.slug === e.target.value);
                setProductSlug(e.target.value);
                setPackId(next?.packs[0]?.id || "");
              }}
              className="field mt-2"
            >
              {products.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs uppercase tracking-[0.16em] text-muted">
            Pack size
            <select
              value={pack?.id}
              onChange={(e) => setPackId(e.target.value)}
              className="field mt-2"
            >
              {product.packs.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label} — {formatInr(item.price)}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-xs uppercase tracking-[0.16em] text-muted">
            Quantity
            <div className="mt-2 flex items-center border border-forest/15 bg-white">
              <button
                type="button"
                className="px-4 py-3 text-forest hover:bg-mist"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value) || 1))
                }
                className="w-full border-0 bg-transparent py-3 text-center text-sm outline-none"
              />
              <button
                type="button"
                className="px-4 py-3 text-forest hover:bg-mist"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </label>

          <label className="block text-xs uppercase tracking-[0.16em] text-muted">
            Order type
            <select
              value={orderType}
              onChange={(e) =>
                setOrderType(e.target.value as "retail" | "bulk" | "export")
              }
              className="field mt-2"
            >
              <option value="retail">Retail</option>
              <option value="bulk">Bulk / Wholesale</option>
              <option value="export">Export</option>
            </select>
          </label>
        </div>
        <p className="rounded-sm bg-mist/70 px-4 py-3 text-sm text-forest">
          Estimated total: <strong>{formatInr(estimated)}</strong>
          <span className="text-muted"> · Final quote confirmed by our team</span>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl text-forest">Your details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Phone number" name="phone" type="tel" required />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl text-forest">Delivery address</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Address line 1" name="addressLine1" required />
          </div>
          <div className="sm:col-span-2">
            <Field label="Address line 2 (optional)" name="addressLine2" />
          </div>
          <Field label="City" name="city" required />
          <Field label="State" name="state" required />
          <Field label="Pincode / ZIP" name="pincode" required />
          <Field label="Country" name="country" defaultValue="India" required />
        </div>
        <label className="block text-xs uppercase tracking-[0.16em] text-muted">
          Notes (optional)
          <textarea
            name="notes"
            rows={4}
            placeholder="Preferred delivery window, packaging needs, etc."
            className="field mt-2 resize-y"
          />
        </label>
      </section>

      {status === "success" ? (
        <p className="border border-sage bg-mist px-4 py-3 text-sm text-forest">
          {message}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="w-full bg-forest px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] text-cream transition hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending request…" : "Send order request"}
      </button>
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
    <label className="block text-xs uppercase tracking-[0.16em] text-muted">
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
