"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setLoading(false);
      setError(data.error || "Unable to create account.");
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Account created, but sign-in failed. Please sign in manually.");
      router.push("/signin");
      return;
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block text-xs uppercase tracking-[0.16em] text-muted">
        Full name
        <input
          name="name"
          type="text"
          required
          className="mt-2 w-full border border-forest/15 bg-cream px-4 py-3.5 text-sm text-forest outline-none transition focus:border-forest"
        />
      </label>
      <label className="block text-xs uppercase tracking-[0.16em] text-muted">
        Email
        <input
          name="email"
          type="email"
          required
          className="mt-2 w-full border border-forest/15 bg-cream px-4 py-3.5 text-sm text-forest outline-none transition focus:border-forest"
        />
      </label>
      <label className="block text-xs uppercase tracking-[0.16em] text-muted">
        Password
        <input
          name="password"
          type="password"
          required
          minLength={6}
          placeholder="At least 6 characters"
          className="mt-2 w-full border border-forest/15 bg-cream px-4 py-3.5 text-sm text-forest outline-none transition focus:border-forest"
        />
      </label>

      {error ? (
        <p className="bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-forest py-4 text-xs font-medium uppercase tracking-[0.18em] text-cream transition hover:bg-forest-deep disabled:opacity-60"
      >
        {loading ? "Creating account…" : "Create account"}
      </button>

      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/signin" className="text-forest underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </form>
  );
}
