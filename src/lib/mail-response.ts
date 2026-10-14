import { NextResponse } from "next/server";

export function mailFailureResponse(code: "unconfigured" | "failed") {
  const error =
    code === "unconfigured"
      ? "Email is not set up yet. Please WhatsApp us or write to info@primeweaves.com."
      : "Could not send your message. Please try again or WhatsApp us.";
  return NextResponse.json({ error }, { status: code === "unconfigured" ? 503 : 502 });
}
