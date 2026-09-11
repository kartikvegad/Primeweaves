"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export function AuthNav({ compact = false }: { compact?: boolean }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <span className="text-[11px] uppercase tracking-[0.16em] text-cream/50">
        …
      </span>
    );
  }

  if (session?.user) {
    return (
      <div className={`flex items-center gap-3 ${compact ? "flex-col items-start" : ""}`}>
        <Link
          href="/account"
          className="text-[12px] uppercase tracking-[0.16em] text-cream/85 transition hover:text-white"
        >
          {session.user.name?.split(" ")[0] || "Account"}
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-[12px] uppercase tracking-[0.16em] text-cream/70 transition hover:text-white"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/signin"
      className="text-[12px] uppercase tracking-[0.16em] text-cream/85 transition hover:text-white"
    >
      Sign in
    </Link>
  );
}
