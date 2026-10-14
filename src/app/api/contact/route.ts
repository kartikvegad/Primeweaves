import { NextResponse } from "next/server";
import { escapeHtml, line, sendFormEmail } from "@/lib/mail";
import { mailFailureResponse } from "@/lib/mail-response";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

function clean(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = clean(body.name, 120);
    const email = clean(body.email, 200);
    const phone = clean(body.phone, 40);
    const subject = clean(body.subject, 160);
    const message = clean(body.message, 4000);

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }

    const html = `
      <div style="font-family: Arial, sans-serif; color: #1a241c; line-height: 1.5;">
        <h2 style="margin-bottom: 8px;">New contact message — Prime Weaves</h2>
        <p>${line("Name", name)}${line("Email", email)}${line("Phone", phone)}${line("Subject", subject)}</p>
        <h3>Message</h3>
        <p>${escapeHtml(message).replaceAll("\n", "<br/>")}</p>
      </div>
    `;

    const result = await sendFormEmail({
      replyTo: email,
      subject: `Contact: ${subject}`,
      html,
    });

    if (!result.ok) return mailFailureResponse(result.code);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong while sending your message." },
      { status: 500 },
    );
  }
}
