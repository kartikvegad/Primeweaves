"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block text-xs uppercase tracking-[0.16em] text-muted">
        Email
        <input
          name="email"
          type="email"
          required
          defaultValue="demo@primeweaves.com"
          className="mt-2 w-full border border-forest/15 bg-cream px-4 py-3.5 text-sm text-forest outline-none transition focus:border-forest"
        />
      </label>
      <label className="block text-xs uppercase tracking-[0.16em] text-muted">
        Password
        <input
          name="password"
          type="password"
          required
          defaultValue="primeweaves123"
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
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-center text-sm text-muted">
        New here?{" "}
        <Link href="/signup" className="text-forest underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </form>
  );
}
