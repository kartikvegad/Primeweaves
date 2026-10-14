"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      subject: String(form.get("subject") || ""),
      message: String(form.get("message") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Could not send your message.");
        return;
      }
      setStatus("success");
      setMessage("Message sent. We’ll reply by email shortly.");
      formEl.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-forest/10 bg-white/60 p-6 md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="mt-5">
        <Field label="Phone number" name="phone" type="tel" />
      </div>
      <div className="mt-5">
        <Field label="Subject" name="subject" required />
      </div>
      <div className="mt-5">
        <label className="block text-[11px] uppercase tracking-[0.16em] text-muted">
          Message
          <textarea
            name="message"
            required
            rows={6}
            className="field mt-2 resize-y"
          />
        </label>
      </div>
      {message ? (
        <p
          className={`mt-5 border px-4 py-3 text-sm ${
            status === "error"
              ? "border-red-200 bg-red-50 text-red-900"
              : "border-sage bg-mist text-forest"
          }`}
        >
          {message}
        </p>
      ) : null}
      <button
        type="submit"
        className="btn-primary mt-6"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-[11px] uppercase tracking-[0.16em] text-muted">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="field mt-2"
      />
    </label>
  );
}
