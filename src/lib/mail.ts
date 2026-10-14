import nodemailer from "nodemailer";
import { formInboxes } from "@/lib/site";

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function line(label: string, value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return `<strong>${escapeHtml(label)}:</strong> ${escapeHtml(trimmed)}<br/>`;
}

function transport() {
  const user = process.env.GOOGLE_SMTP_USER?.trim();
  const pass = process.env.GOOGLE_SMTP_APP_PASSWORD?.replace(/\s+/g, "");
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

export async function sendFormEmail(options: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const user = process.env.GOOGLE_SMTP_USER?.trim();
  const mailer = transport();
  if (!mailer || !user) {
    console.error(
      "[mail] Google Workspace SMTP is not configured. Set GOOGLE_SMTP_USER and GOOGLE_SMTP_APP_PASSWORD.",
    );
    return { ok: false as const, code: "unconfigured" as const };
  }

  try {
    await mailer.sendMail({
      from: `Prime Weaves <${user}>`,
      to: [...formInboxes],
      replyTo: options.replyTo,
      subject: options.subject,
      html: options.html,
    });
    return { ok: true as const };
  } catch (error) {
    console.error("[mail] Google Workspace send failed", error);
    return { ok: false as const, code: "failed" as const };
  }
}
