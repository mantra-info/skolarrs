"use client";

import { useEffect, useState } from "react";

/** Cross-fading background photos for a hero (Figma 4-frame hero variant). */
export default function HeroSlides({ images, interval = 5000 }: { images: string[]; interval?: number }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setActive((a) => (a + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);
  return (
    <>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 size-full max-w-none object-cover transition-opacity duration-1000 ${i === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </>
  );
}
