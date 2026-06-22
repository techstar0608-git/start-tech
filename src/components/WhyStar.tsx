import Image from "next/image";
import { StarMark } from "./StarMark";

const features = [
  {
    title: "One team",
    desc: "Everything under one roof",
    icon: "/images/why-one-team.png",
  },
  {
    title: "Built for shops",
    desc: "Not enterprise complexity",
    icon: "/images/why-built-shops.png",
  },
  {
    title: "Grow with you",
    desc: "Phase by phase",
    icon: "/images/why-grow.png",
  },
  {
    title: "Automation first",
    desc: "Do more with less",
    icon: "/images/why-automation.png",
  },
];

export function WhyStar() {
  return (
    <section
      id="why"
      className="relative overflow-hidden px-5 py-24"
      aria-labelledby="why-heading"
    >
      {/* Figma background glow (node 15:16) */}
      <Image
        src="/images/glow-mid.png"
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

      <div className="mx-auto max-w-5xl text-center">
        <h2 id="why-heading" className="type-h1 flex flex-col items-center">
          <span className="inline-flex items-center gap-2">
            Why
            <StarMark
              className="h-[1.15em] w-[1.15em] translate-y-[0.03em]"
              fill="url(#starFill)"
            />
          </span>
          <span>S.T.A.R?</span>
        </h2>
        <p className="mt-4 text-lg text-muted">Built for real-world shops</p>

        <div className="mx-auto mt-12 grid max-w-md grid-cols-2 gap-x-6 gap-y-10">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center">
              <Image
                src={f.icon}
                alt=""
                width={220}
                height={220}
                className="h-24 w-24 object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.35)] sm:h-28 sm:w-28"
              />
              <h3 className="mt-3 font-display text-xl font-bold text-white">
                {f.title}
              </h3>
              <p className="mt-1 text-sm leading-snug text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
