"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type ProductGalleryProps = {
  name: string;
  images: string[];
  accent?: string;
  className?: string;
};

export function ProductGallery({
  name,
  images,
  accent = "moringa",
  className = "",
}: ProductGalleryProps) {
  const slides = images.slice(0, 4);
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const bg = accent === "moringa" ? "bg-mist" : "bg-cream-deep";

  const goTo = useCallback(
    (next: number) => {
      if (slides.length < 2) return;
      const index = (next + slides.length) % slides.length;
      if (index === active) return;
      setFading(true);
      window.setTimeout(() => {
        setActive(index);
        setFading(false);
      }, 160);
    },
    [active, slides.length],
  );

  const prev = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  if (slides.length === 0) return null;

  return (
    <div className={className}>
      <div
        className={`relative aspect-[4/5] overflow-hidden ${bg}`}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${name} images`}
      >
        <Image
          key={slides[active]}
          src={slides[active]}
          alt={`${name} — view ${active + 1} of ${slides.length}`}
          fill
          priority
          className={`object-cover transition-opacity duration-300 ${
            fading ? "opacity-40" : "opacity-100"
          }`}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-cream/40 bg-forest/75 text-cream transition-colors duration-200 hover:bg-forest hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              aria-label="Previous image"
            >
              <span aria-hidden className="text-lg leading-none">
                ‹
              </span>
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-cream/40 bg-forest/75 text-cream transition-colors duration-200 hover:bg-forest hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              aria-label="Next image"
            >
              <span aria-hidden className="text-lg leading-none">
                ›
              </span>
            </button>

            <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={slides[index]}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                    active === index
                      ? "bg-gold"
                      : "bg-cream/55 hover:bg-cream"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                  aria-current={active === index}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      {slides.length > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {slides.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => goTo(index)}
              className={`relative aspect-square overflow-hidden ${bg} transition-opacity duration-200 ${
                active === index
                  ? "opacity-100 ring-2 ring-forest ring-offset-2 ring-offset-cream"
                  : "opacity-65 hover:opacity-100"
              }`}
              aria-label={`View image ${index + 1}`}
              aria-current={active === index}
            >
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
