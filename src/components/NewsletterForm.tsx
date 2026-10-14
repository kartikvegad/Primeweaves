"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Could not save your email.");
        return;
      }
      setStatus("sent");
      setMessage("You’re on the list.");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-5">
      <div className="flex overflow-hidden border border-cream/20 bg-forest">
        <input
          name="email"
          type="email"
          required
          placeholder="Email address"
          className="w-full bg-transparent px-4 py-3 text-sm text-cream outline-none placeholder:text-cream/40"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-gold px-4 text-sm font-semibold text-ink transition hover:bg-gold-deep disabled:opacity-70"
        >
          {status === "loading" ? "…" : "Join"}
        </button>
      </div>
      {message ? (
        <p
          className={`mt-3 text-sm ${status === "error" ? "text-gold" : "text-cream/80"}`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
