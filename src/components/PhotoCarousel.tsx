"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Photo = { src: string; alt: string };

// 3 slots on a circle: the front one is large, the others recede in depth.
const SLOTS = [
  { transform: "translateX(0) translateZ(0) rotateY(0deg) scale(1)", opacity: 1, z: 30 },
  { transform: "translateX(48%) translateZ(-140px) rotateY(-24deg) scale(0.8)", opacity: 0.45, z: 10 },
  { transform: "translateX(-48%) translateZ(-140px) rotateY(24deg) scale(0.8)", opacity: 0.45, z: 10 },
];

export function PhotoCarousel({
  photos,
  containerClass = "h-56",
  cardClass = "h-48 w-[74%]",
  imageSizes = "(max-width: 768px) 74vw, 320px",
  fit = "cover",
  chrome = true,
}: {
  photos: Photo[];
  containerClass?: string;
  cardClass?: string;
  imageSizes?: string;
  fit?: "cover" | "contain";
  chrome?: boolean;
}) {
  const [rot, setRot] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setRot((r) => r + 1), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={`relative mx-auto w-full perspective-[1100px] ${containerClass}`}>
      {photos.map((p, i) => {
        const slot = SLOTS[(((i - rot) % photos.length) + photos.length) % photos.length] ?? SLOTS[0];
        return (
          <div
            key={p.src}
            className={`absolute inset-0 m-auto overflow-hidden transition-all duration-700 ease-out ${
              chrome ? "rounded-2xl border border-white/10 shadow-2xl" : ""
            } ${cardClass}`}
            style={{
              transform: slot.transform,
              opacity: slot.opacity,
              zIndex: slot.z,
            }}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes={imageSizes}
              className={fit === "contain" ? "object-contain" : "object-cover"}
            />
          </div>
        );
      })}
    </div>
  );
}
