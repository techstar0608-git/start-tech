import Image from "next/image";
import { StarMark } from "./StarMark";

function OrbitBadge() {
  return (
    <div className="relative mx-auto mt-10 h-56 w-56 sm:h-64 sm:w-64">
      <div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(53,198,244,0.35), transparent 65%)",
        }}
      />
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full animate-spin-slow"
        aria-hidden="true"
      >
        <defs>
          <path
            id="orbit"
            d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
          />
        </defs>
        <text
          className="fill-white font-display"
          fontSize="13"
          letterSpacing="3"
        >
          <textPath href="#orbit" startOffset="0">
            AUTOMATE • GROW • SCALE • AUTOMATE • GROW • SCALE •&nbsp;
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <StarMark className="h-24 w-24 animate-float drop-shadow-[0_0_18px_rgba(53,198,244,0.6)]" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-20 pt-28"
      aria-labelledby="hero-heading"
    >
      {/* hero background — the exact blue-glow gradient image from Figma (node 15:14) */}
      <Image
        src="/images/hero-bg.png"
        alt=""
        aria-hidden="true"
        width={780}
        height={3547}
        priority
        className="pointer-events-none absolute left-0 top-0 -z-10 w-full select-none"
      />
      {/* darken the lower hero (behind the globe) so it reads dark like Figma
          instead of being washed by the bright blue glow, and fade the seam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[58%] bg-linear-to-b from-transparent via-[#040a1f] to-bg"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        {/* 1 — Headline */}
        <h1 id="hero-heading" className="type-hero">
          <span className="text-gradient">Full-stack</span>
          <br />
          <span className="text-gradient">marketing</span>
          <br />
          <span className="type-h2 mt-2 block font-medium text-ink">
            for small &amp; mid-sized shops
          </span>
        </h1>

        {/* 2 — Star badge */}
        <OrbitBadge />

        {/* 3 — Dotted globe, built exactly like Figma (node 25:14):
              base dotted globe + a color-dodge glow arc, over a dark backing
              so the blue background doesn't wash it out. */}
        <div className="relative -mt-4 w-full">
          <div className="relative mx-auto w-full max-w-md scale-120">
            <Image
              src="/images/globe-base-v2.png"
              alt=""
              aria-hidden="true"
              width={2000}
              height={1111}
              priority
              className="h-auto w-full"
            />
            {/* glowing rim arc (Figma color-dodge glow, baked into a clean sprite) */}
            <Image
              src="/images/globe-glow-v3.png"
              alt=""
              aria-hidden="true"
              width={2000}
              height={1111}
              priority
              className="absolute left-1/2 top-[9%] w-[77.5%] -translate-x-1/2 opacity-40"
            />
          </div>
        </div>

        {/* 4 — Description block, below the globe (no overlap) */}
        <p className="mx-auto mt-10 max-w-md font-display text-2xl font-semibold text-[#5BE7FF] sm:text-3xl">
          Your marketing team, without the hiring
        </p>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/95">
          S.T.A.R helps small and mid-sized shops in Australia grow with
          branding, websites, ads, scripts and automation — all in one team.
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-cyan to-brand-purple px-7 py-3.5 text-sm font-semibold text-bg-deep shadow-[0_8px_30px_rgba(53,198,244,0.35)] transition-transform hover:scale-105"
          >
            Contact now
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
