"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatInr, products } from "@/lib/products";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { QuantityStepper } from "@/components/ui/QuantityStepper";

type Status = "idle" | "loading" | "success" | "error";

const orderTypeOptions = [
  { value: "retail", label: "Retail", hint: "Home & small orders" },
  { value: "bulk", label: "Bulk / Wholesale", hint: "Larger supply needs" },
  { value: "export", label: "Export", hint: "International enquiry" },
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
  const [orderType, setOrderType] = useState<"retail" | "bulk" | "export">(
    "retail",
  );
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const pack =
    product.packs.find((item) => item.id === packId) || product.packs[0];
  const estimated = (pack?.price || 0) * quantity;

  const productOptions = products.map((item) => ({
    value: item.slug,
    label: item.name,
    hint: item.tagline,
  }));

  const packOptions = product.packs.map((item) => ({
    value: item.id,
    label: item.label,
    hint: formatInr(item.price),
  }));

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
    <form onSubmit={onSubmit} className="space-y-10">
      <section className="space-y-5">
        <h2 className="font-display text-3xl text-forest">Product</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <CustomSelect
            label="Product"
            value={productSlug}
            options={productOptions}
            onChange={(nextSlug) => {
              const next = products.find((p) => p.slug === nextSlug);
              setProductSlug(nextSlug);
              setPackId(next?.packs[0]?.id || "");
            }}
          />

          <CustomSelect
            label="Pack size"
            value={pack?.id || ""}
            options={packOptions}
            onChange={setPackId}
          />

          <QuantityStepper
            value={quantity}
            onChange={setQuantity}
          />

          <CustomSelect
            label="Order type"
            value={orderType}
            options={orderTypeOptions}
            onChange={(value) =>
              setOrderType(value as "retail" | "bulk" | "export")
            }
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border border-forest/10 bg-mist/60 px-5 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
              Estimated total
            </p>
            <p className="mt-1 font-display text-3xl text-forest">
              {formatInr(estimated)}
            </p>
          </div>
          <p className="max-w-xs text-sm text-muted">
            Final quote confirmed by our team — no online payment yet.
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-display text-3xl text-forest">Your details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Phone number" name="phone" type="tel" required />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-display text-3xl text-forest">Delivery address</h2>
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
        <label className="block text-[11px] uppercase tracking-[0.16em] text-muted">
          Notes (optional)
          <textarea
            name="notes"
            rows={4}
            placeholder="Preferred delivery window, packaging needs, etc."
            className="field mt-2 resize-y transition-colors duration-200 focus:border-forest focus:bg-mist/30"
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
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
    <label className="block text-[11px] uppercase tracking-[0.16em] text-muted">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="field mt-2 transition-colors duration-200 focus:border-forest focus:bg-mist/30"
      />
    </label>
  );
}
