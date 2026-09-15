"use client";

import { useEffect, useState } from "react";

const MIN_MS = 1600;
const CURTAIN_MS = 1100;

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [lifting, setLifting] = useState(false);

  useEffect(() => {
    const started = Date.now();
    let liftTimer: number | undefined;
    let hideTimer: number | undefined;

    const beginExit = () => {
      const remaining = Math.max(0, MIN_MS - (Date.now() - started));
      liftTimer = window.setTimeout(() => {
        setLifting(true);
        hideTimer = window.setTimeout(() => setVisible(false), CURTAIN_MS);
      }, remaining);
    };

    if (document.readyState === "complete") {
      beginExit();
    } else {
      window.addEventListener("load", beginExit, { once: true });
    }

    document.documentElement.classList.add("splash-active");

    return () => {
      window.removeEventListener("load", beginExit);
      window.clearTimeout(liftTimer);
      window.clearTimeout(hideTimer);
      document.documentElement.classList.remove("splash-active");
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      document.documentElement.classList.remove("splash-active");
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`splash-curtain fixed inset-0 z-[9999] flex items-center justify-center bg-cream ${
        lifting ? "splash-curtain-up" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading Prime Weaves"
    >
      <img
        src="/brand/primeweaves-logo.png"
        alt="Prime Weaves"
        width={120}
        height={120}
        className="logo-spin h-[7.5rem] w-[7.5rem] rounded-full object-contain md:h-36 md:w-36"
        draggable={false}
      />
    </div>
  );
}
