import Image from "next/image";
import { StarMark } from "./StarMark";
import { PhotoCarousel } from "./PhotoCarousel";

const milestones = [
  { t: "0M", label: "Opening" },
  { t: "3M", label: "Break-even" },
  { t: "6M", label: "80% capacity" },
];

const photos = [
  { src: "/images/lotus-1.jpg", alt: "Lotus Spa storefront" },
  { src: "/images/lotus-2.jpg", alt: "Lotus Spa interior" },
  { src: "/images/lotus-3.jpg", alt: "Lotus Spa styling area" },
];

export function CaseStudy() {
  return (
    <section
      id="case-study"
      className="relative overflow-hidden bg-bg px-5 py-20"
      aria-labelledby="case-heading"
    >
      <div className="mx-auto max-w-md text-center">
        <h2
          id="case-heading"
          className="font-display text-[clamp(2.4rem,12vw,3rem)] font-bold leading-none text-gradient"
        >
          Case Study
        </h2>
        <p className="mt-2 font-display text-2xl font-semibold text-ink">
          Lotus Spa
        </p>

        {/* 80% over the Figma swirl-glow image */}
        <div className="relative -mx-5 mt-4">
          <Image
            src="/images/case-swirl.png"
            alt=""
            aria-hidden="true"
            width={390}
            height={302}
            priority
            className="h-auto w-full"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="pl-8 text-left">
              <div className="font-display text-[clamp(3rem,17vw,4.5rem)] font-bold leading-none text-ink">
                80%
              </div>
              <div className="mt-1 font-display text-lg font-semibold leading-snug text-ink">
                booked
                <br />
                in 6 months
              </div>
            </div>
          </div>
          <StarMark
            className="absolute right-[24%] top-[24%] h-9 w-9 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            fill="#ffffff"
          />
        </div>

        {/* auto-rotating circular photo carousel (3 Lotus photos) */}
        <div className="mt-6">
          <PhotoCarousel photos={photos} />
        </div>

        {/* milestone timeline */}
        <ol className="relative mx-auto mt-8 max-w-[16rem] space-y-6 text-left">
          <span
            aria-hidden="true"
            className="absolute left-1.25 top-2 bottom-2 w-px bg-brand-cyan/40"
          />
          {milestones.map((m) => (
            <li key={m.t} className="relative flex items-center gap-4 pl-6">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-brand-cyan shadow-[0_0_8px_rgba(53,198,244,0.8)]"
              />
              <span className="w-10 font-display text-xl font-bold text-brand-cyan">
                {m.t}
              </span>
              <span className="text-ink">{m.label}</span>
            </li>
          ))}
        </ol>

        <div className="mt-9 flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-cyan to-brand-purple px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-bg-deep transition-transform hover:scale-105"
          >
            View case study <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
