import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getProduct } from "@/lib/products";

export type OrderPayload = {
  name: string;
  email: string;
  phone: string;
  productSlug: string;
  packId: string;
  quantity: number;
  orderType: "retail" | "bulk" | "export";
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  notes?: string;
};

function validate(body: Partial<OrderPayload>) {
  const required: (keyof OrderPayload)[] = [
    "name",
    "email",
    "phone",
    "productSlug",
    "packId",
    "quantity",
    "orderType",
    "addressLine1",
    "city",
    "state",
    "pincode",
    "country",
  ];

  for (const key of required) {
    if (body[key] === undefined || body[key] === null || body[key] === "") {
      return `${key} is required`;
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email))) {
    return "Enter a valid email";
  }

  if (Number(body.quantity) < 1) {
    return "Quantity must be at least 1";
  }

  const product = getProduct(String(body.productSlug));
  if (!product) return "Invalid product";

  const pack = product.packs.find((item) => item.id === body.packId);
  if (!pack) return "Invalid pack size";

  return null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<OrderPayload>;
    const error = validate(body);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const data = body as OrderPayload;
    const product = getProduct(data.productSlug)!;
    const pack = product.packs.find((item) => item.id === data.packId)!;

    const toEmail = process.env.ORDER_TO_EMAIL;
    const fromEmail =
      process.env.ORDER_FROM_EMAIL || "Prime Weaves Orders <onboarding@resend.dev>";
    const apiKey = process.env.RESEND_API_KEY;

    const html = `
      <div style="font-family: Arial, sans-serif; color: #1a241c; line-height: 1.5;">
        <h2 style="margin-bottom: 8px;">New quotation request — Prime Weaves</h2>
        <p style="margin-top: 0; color: #5c6b5f;">A customer requested a quotation from the website.</p>
        <hr style="border: none; border-top: 1px solid #d7ddd0; margin: 20px 0;" />
        <h3>Customer</h3>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}<br/>
        <strong>Email:</strong> ${escapeHtml(data.email)}<br/>
        <strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
        <h3>Request</h3>
        <p><strong>Type:</strong> ${escapeHtml(data.orderType)}<br/>
        <strong>Product:</strong> ${escapeHtml(product.name)}<br/>
        <strong>Pack:</strong> ${escapeHtml(pack.label)}<br/>
        <strong>Quantity:</strong> ${Number(data.quantity)}<br/>
        <strong>Pricing:</strong> To be quoted</p>
        <h3>Delivery address</h3>
        <p>${escapeHtml(data.addressLine1)}<br/>
        ${data.addressLine2 ? `${escapeHtml(data.addressLine2)}<br/>` : ""}
        ${escapeHtml(data.city)}, ${escapeHtml(data.state)} ${escapeHtml(data.pincode)}<br/>
        ${escapeHtml(data.country)}</p>
        ${
          data.notes
            ? `<h3>Notes</h3><p>${escapeHtml(data.notes)}</p>`
            : ""
        }
      </div>
    `;

    if (!apiKey || !toEmail) {
      console.info("[quotation-request]", {
        ...data,
        product: product.name,
        pack: pack.label,
      });
      return NextResponse.json({
        ok: true,
        mode: "logged",
        message:
          "Quotation request received. Email is not configured yet — request was logged on the server.",
      });
    }

    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: data.email,
      subject: `Quotation request: ${product.name} (${pack.label} × ${data.quantity})`,
      html,
    });

    if (result.error) {
      console.error(result.error);
      return NextResponse.json(
        { error: "Could not send email. Please try again or contact us." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, mode: "email" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong while submitting your quotation request." },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
