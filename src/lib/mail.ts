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

function smtpConfig() {
  const user = (
    process.env.SMTP_USER || process.env.GOOGLE_SMTP_USER
  )?.trim();
  const pass = (process.env.SMTP_PASSWORD || process.env.GOOGLE_SMTP_APP_PASSWORD)
    ?.replace(/\s+/g, "");
  const host = process.env.SMTP_HOST?.trim() || "smtp.hostinger.com";
  const port = Number(process.env.SMTP_PORT || 465);
  return { user, pass, host, port };
}

function transport() {
  const { user, pass, host, port } = smtpConfig();
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendFormEmail(options: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const { user } = smtpConfig();
  const mailer = transport();
  if (!mailer || !user) {
    console.error(
      "[mail] Hostinger SMTP is not configured. Set SMTP_USER and SMTP_PASSWORD.",
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
    console.error("[mail] Hostinger send failed", error);
    return { ok: false as const, code: "failed" as const };
  }
}
