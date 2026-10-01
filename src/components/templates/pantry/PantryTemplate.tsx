import Link from "next/link";
import { brand, products, steps } from "./data";
import { pantryFonts } from "./fonts";
import { Jar } from "./Jar";
import { JarCarousel } from "./JarCarousel";
import { PantryHeader } from "./PantryHeader";

const featured = products[1];

function Diamond({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-block text-xs ${className}`}>
      &#9670;
    </span>
  );
}

/**
 * "Pantry" website style — an editorial, product-led template for food &
 * artisan brands. Rendered as a live demo for S.T.A.R clients.
 */
export function PantryTemplate() {
  return (
    <div
      className={`${pantryFonts} font-pantry-sans min-h-svh bg-pantry-cream text-pantry-wine`}
    >
      <PantryHeader />

      <main>
        <JarCarousel />

        {/* intro statement */}
        <section className="px-5 py-28 text-center sm:py-40">
          <Diamond className="text-pantry-orange" />
          <p className="font-pantry-serif mx-auto mt-8 max-w-4xl text-[clamp(1.75rem,4.4vw,3.5rem)] leading-[1.15]">
            Our days smell of{" "}
            <em className="text-pantry-orange">blood oranges</em>, freshly
            cracked macadamias and{" "}
            <em className="text-pantry-orange">bright green pistachios</em>. We
            grow, cook and seal every jar by hand —{" "}
            <span className="whitespace-nowrap">season after season.</span>
          </p>
          <a
            href="#process"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-pantry-orange underline-offset-4 hover:underline"
          >
            Our story <span aria-hidden="true">&rarr;</span>
          </a>
        </section>

        {/* shop grid */}
        <section
          id="shop"
          aria-labelledby="shop-heading"
          className="scroll-mt-28 px-4 pb-28 sm:px-8"
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2
              id="shop-heading"
              className="font-pantry-serif text-[clamp(3.5rem,13vw,11rem)] uppercase leading-[0.85] text-pantry-orange"
            >
              The pantry
            </h2>
            <ul className="flex gap-2 text-xs font-semibold uppercase tracking-wider">
              {["All", "Sweet", "Savoury"].map((f, i) => (
                <li
                  key={f}
                  className={`rounded-full border border-pantry-wine/40 px-4 py-2 ${i === 0 ? "bg-pantry-wine text-pantry-cream" : ""}`}
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {products.map((p) => (
              <li
                key={p.slug}
                id={`shop-${p.slug}`}
                className="group flex scroll-mt-28 flex-col rounded-2xl p-4 sm:p-6"
                style={{ backgroundColor: p.tint }}
              >
                <Jar
                  product={p}
                  className="mx-auto h-auto w-[72%] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105"
                />
                <div className="mt-6 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-pantry-serif text-lg leading-tight sm:text-xl">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-wider opacity-70">
                      {p.kind} &middot; 190g
                    </p>
                  </div>
                  <p className="font-pantry-serif text-lg">${p.price}</p>
                </div>
                <button
                  type="button"
                  className="mt-4 rounded-full border border-pantry-wine/50 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-pantry-wine hover:text-pantry-cream"
                >
                  Add to cart
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* featured product */}
        <section
          aria-labelledby="featured-heading"
          className="border-t border-pantry-wine/15 px-5 py-24 sm:px-8 sm:py-32"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-pantry-orange">
            Jar of the month
          </p>
          <h2
            id="featured-heading"
            className="font-pantry-serif mx-auto mt-4 max-w-5xl text-center text-[clamp(3rem,10vw,8.5rem)] uppercase leading-[0.9] text-pantry-orange"
          >
            {featured.name}
          </h2>
          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-[1fr_auto_1fr] items-center gap-4">
            <p className="font-pantry-serif text-lg sm:text-2xl">
              {featured.kind}
            </p>
            <Jar
              product={featured}
              className="h-auto w-[clamp(140px,26vw,280px)] -rotate-3"
            />
            <p className="font-pantry-serif text-right text-lg sm:text-2xl">
              Made in NSW
              <br />
              Australia
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-10 border-t border-pantry-wine/20 pt-8 text-sm sm:grid-cols-[2fr_1fr_1fr]">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-pantry-orange">
                Useful tips
              </h3>
              <p className="mt-3 max-w-md leading-relaxed">
                Tart, deep and jewel-dark. Spoon it over thick yoghurt, swirl it
                through a cheesecake or serve it beside a sharp cheddar. Once
                opened, keep in the fridge and enjoy within three weeks.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-pantry-orange">
                Available sizes
              </h3>
              <ul className="mt-3 flex gap-2">
                {["190g", "1kg", "3kg"].map((w) => (
                  <li
                    key={w}
                    className="rounded-full border border-pantry-wine/40 px-3 py-1.5 text-xs"
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-pantry-orange">
                Shelf life
              </h3>
              <p className="mt-3">24 months, unopened</p>
            </div>
          </div>
        </section>

        {/* process */}
        <section
          id="process"
          aria-labelledby="process-heading"
          className="scroll-mt-0 bg-pantry-wine px-5 py-24 text-pantry-cream sm:px-8 sm:py-32"
        >
          <h2
            id="process-heading"
            className="font-pantry-serif text-[clamp(3.5rem,14vw,12rem)] uppercase leading-[0.85] text-pantry-orange"
          >
            Grown
            <br />
            <span className="pl-[12%] italic">slow</span>
          </h2>
          <ol className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {steps.map((s) => (
              <li key={s.n} className="border-t border-pantry-cream/25 pt-6">
                <p className="font-pantry-serif text-sm text-pantry-orange">
                  {s.n}
                </p>
                <h3 className="font-pantry-serif mt-2 text-3xl sm:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-sm leading-relaxed text-pantry-cream/80">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* marquee band */}
        <div
          aria-hidden="true"
          className="overflow-hidden bg-pantry-orange py-5 text-pantry-cream"
        >
          <div className="animate-marquee flex w-max">
            {[0, 1].map((k) => (
              <p
                key={k}
                className="font-pantry-serif flex shrink-0 items-center gap-8 pr-8 text-3xl uppercase sm:text-5xl"
              >
                {[
                  "Blood orange",
                  "Finger lime",
                  "Davidson plum",
                  "Macadamia",
                  "Quandong",
                  "Pistachio",
                ].map((w) => (
                  <span key={w} className="flex items-center gap-8">
                    {w} <Diamond />
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>

        {/* visit + footer */}
        <footer
          id="visit"
          className="overflow-hidden bg-pantry-wine px-5 pt-24 text-pantry-cream sm:px-8"
        >
          <div className="grid gap-12 sm:grid-cols-3">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-pantry-orange">
                Visit the farm shop
              </h2>
              <p className="font-pantry-serif mt-3 text-2xl leading-snug">
                128 Orchard Road
                <br />
                Bangalow NSW 2479
              </p>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-pantry-orange">
                Open
              </h2>
              <p className="font-pantry-serif mt-3 text-2xl leading-snug">
                Thu – Sun
                <br />
                9am – 3pm
              </p>
            </div>
            <form aria-label="Newsletter">
              <label
                htmlFor="pantry-email"
                className="text-xs font-semibold uppercase tracking-wider text-pantry-orange"
              >
                Seasonal letters
              </label>
              <div className="mt-3 flex rounded-full border border-pantry-cream/40 p-1">
                <input
                  id="pantry-email"
                  type="email"
                  placeholder="you@email.com"
                  className="min-w-0 flex-1 bg-transparent px-4 text-sm text-pantry-cream placeholder:text-pantry-cream/50 focus:outline-none"
                />
                <button
                  type="button"
                  className="rounded-full bg-pantry-orange px-5 py-2.5 text-sm font-semibold text-pantry-cream"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
          <p
            aria-hidden="true"
            className="font-pantry-serif mt-20 select-none whitespace-nowrap text-center text-[19vw] uppercase leading-[0.75] text-pantry-orange"
          >
            {brand.name}
          </p>
        </footer>
      </main>

      {/* S.T.A.R showcase badge — not part of the template itself */}
      <div className="fixed bottom-4 right-4 z-[350] flex items-center gap-1 rounded-full bg-[#06102f] p-1 pl-4 font-sans text-xs text-white shadow-lg shadow-black/30">
        <Link href="/templates" className="pr-2 text-white/70 hover:text-white">
          &larr; Styles
        </Link>
        <Link
          href="/#contact"
          className="rounded-full bg-linear-to-r from-brand-cyan to-brand-purple px-4 py-2 font-semibold text-[#03060f]"
        >
          Use this style
        </Link>
      </div>
    </div>
  );
}
