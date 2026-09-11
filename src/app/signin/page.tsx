import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Primeweaves account.",
};

export default function SignInPage() {
  return (
    <div className="grid min-h-[80vh] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-forest lg:block">
        <Image
          src="/images/moringa-leaves-2.jpg"
          alt=""
          fill
          className="object-cover opacity-60"
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest/40 to-transparent" />
        <div className="absolute bottom-0 p-12">
          <p className="font-display text-5xl text-cream">Welcome back.</p>
          <p className="mt-3 max-w-sm text-cream/70">
            Manage orders, save favorites, and continue your Primeweaves
            journey.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-16 md:px-10">
        <div className="w-full max-w-md">
          <p className="text-[11px] uppercase tracking-[0.24em] text-sage">
            Account
          </p>
          <h1 className="mt-3 font-display text-5xl text-forest">Sign in</h1>
          <p className="mt-3 text-sm text-muted">
            Demo: demo@primeweaves.com / primeweaves123
          </p>
          <div className="mt-8">
            <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
              <SignInForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
