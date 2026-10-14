import { NextResponse } from "next/server";
import { line, sendFormEmail } from "@/lib/mail";
import { mailFailureResponse } from "@/lib/mail-response";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = String(body.email ?? "").trim().slice(0, 200);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }

    const result = await sendFormEmail({
      replyTo: email,
      subject: "Newsletter signup",
      html: `
        <div style="font-family: Arial, sans-serif; color: #1a241c; line-height: 1.5;">
          <h2 style="margin-bottom: 8px;">New newsletter signup — Prime Weaves</h2>
          <p>${line("Email", email)}</p>
        </div>
      `,
    });

    if (!result.ok) return mailFailureResponse(result.code);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong while saving your email." },
      { status: 500 },
    );
  }
}
