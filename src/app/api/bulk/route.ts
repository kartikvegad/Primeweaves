import { NextResponse } from "next/server";
import { escapeHtml, line, sendFormEmail } from "@/lib/mail";
import { mailFailureResponse } from "@/lib/mail-response";

type BulkPayload = {
  company?: string;
  name?: string;
  email?: string;
  country?: string;
  product?: string;
  volume?: string;
  notes?: string;
};

const products: Record<string, string> = {
  moringa: "Moringa Powder",
  ghee: "Cultured Ghee",
  both: "Both products",
};

function clean(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BulkPayload;
    const company = clean(body.company, 160);
    const name = clean(body.name, 120);
    const email = clean(body.email, 200);
    const country = clean(body.country, 80);
    const product = products[clean(body.product, 40)] || "Not specified";
    const volume = clean(body.volume, 160);
    const notes = clean(body.notes, 4000);

    if (!company || !name || !email || !country) {
      return NextResponse.json(
        { error: "Company, contact name, email, and country are required." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }

    const html = `
      <div style="font-family: Arial, sans-serif; color: #1a241c; line-height: 1.5;">
        <h2 style="margin-bottom: 8px;">New bulk / export enquiry — Prime Weaves</h2>
        <p>
          ${line("Company", company)}
          ${line("Contact", name)}
          ${line("Email", email)}
          ${line("Country", country)}
          ${line("Product", product)}
          ${line("Estimated volume", volume)}
        </p>
        ${
          notes
            ? `<h3>Notes</h3><p>${escapeHtml(notes).replaceAll("\n", "<br/>")}</p>`
            : ""
        }
      </div>
    `;

    const result = await sendFormEmail({
      replyTo: email,
      subject: `Bulk enquiry: ${company} (${product})`,
      html,
    });

    if (!result.ok) return mailFailureResponse(result.code);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong while sending your enquiry." },
      { status: 500 },
    );
  }
}
