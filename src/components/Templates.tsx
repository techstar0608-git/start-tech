import Image from "next/image";
import { PhotoCarousel } from "./PhotoCarousel";

const templates = [
  { src: "/images/tpl-1.png", alt: "Nail salon website template" },
  { src: "/images/tpl-2.png", alt: "Headspa website template" },
  { src: "/images/tpl-3.png", alt: "Food & drink website template" },
];

export function Templates() {
  return (
    <section
      id="templates"
      className="relative overflow-hidden px-5 py-20"
      aria-labelledby="templates-heading"
    >
      {/* Figma background glow (node 169:92) */}
      <Image
        src="/images/glow-low.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="pointer-events-none -z-10 object-cover opacity-90"
      />
      {/* fade top & bottom into the neighbouring dark sections (no hard seam) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-44 bg-linear-to-b from-bg to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-44 bg-linear-to-t from-bg to-transparent"
      />
      {/* globe / tech band — full-bleed image (breaks out of the section padding) */}
      <div className="-mx-5 mb-12">
        <Image
          src="/images/globe-woman.png"
          alt="Marketer interacting with a digital globe interface"
          width={390}
          height={444}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted">
          Website template
        </p>
        <h2 id="templates-heading" className="type-h1 mt-3">
          <span className="text-ink">Ready</span>{" "}
          <span className="italic text-muted">to</span>
          <br />
          <span className="text-gradient">customize</span>
        </h2>

        {/* auto-rotating circular carousel of website templates */}
        <div className="mt-12">
          <PhotoCarousel
            photos={templates}
            containerClass="h-[30rem]"
            cardClass="aspect-[71/100] w-[72%] max-w-[18rem]"
            imageSizes="(max-width: 768px) 72vw, 288px"
            fit="contain"
            chrome={false}
          />
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-brand-purple/50 bg-brand-purple/10 px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-brand-purple/20"
          >
            Explore website styles <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
