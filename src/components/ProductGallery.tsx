"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  name: string;
  images: string[];
  accent: "moringa" | "ghee";
};

export function ProductGallery({ name, images, accent }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const bg = accent === "moringa" ? "bg-mist" : "bg-cream-deep";

  return (
    <div>
      <div className={`relative aspect-square overflow-hidden ${bg}`}>
        <Image
          src={images[active]}
          alt={`${name} image ${active + 1}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActive(index)}
            className={`relative aspect-square overflow-hidden ${bg} ring-offset-2 transition ${
              active === index ? "ring-2 ring-forest" : "opacity-80 hover:opacity-100"
            }`}
            aria-label={`View image ${index + 1}`}
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
    </div>
  );
}
