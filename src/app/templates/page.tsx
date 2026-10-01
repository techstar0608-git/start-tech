import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Jar } from "@/components/templates/pantry/Jar";
import { products } from "@/components/templates/pantry/data";
import { pantryFonts } from "@/components/templates/pantry/fonts";

export const metadata: Metadata = {
  title: "Website styles",
  description:
    "Explore live website styles from S.T.A.R — ready to customise for your shop.",
  alternates: { canonical: "/templates" },
};

const upcoming = [
  { src: "/images/tpl-1.png", name: "Nail salon" },
  { src: "/images/tpl-2.png", name: "Headspa" },
  { src: "/images/tpl-3.png", name: "Food & drink" },
];

export default function TemplatesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-5 pb-24 pt-32">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">
            Website templates
          </p>
          <h1 className="type-h1 mt-3">
            <span className="text-ink">Explore</span>{" "}
            <span className="text-gradient">styles</span>
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Live demos you can click through. Pick a style you like and we’ll
            make it yours — your products, your colours, your story.
          </p>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            <li>
              <Link
                href="/templates/pantry"
                className="group block overflow-hidden rounded-3xl border border-white/10 bg-surface transition-colors hover:border-brand-cyan/50"
              >
                {/* live preview: three jars on the plinth */}
                <div
                  className={`${pantryFonts} relative aspect-4/3 overflow-hidden bg-pantry-cream`}
                >
                  <div className="absolute -bottom-1/4 left-1/2 aspect-square w-[95%] -translate-x-1/2 rounded-[3rem] bg-pantry-wine [clip-path:polygon(50%_0,90%_20%,100%_55%,100%_100%,0_100%,0_55%,10%_20%)]" />
                  <div className="absolute inset-x-0 top-[18%] flex items-center justify-center">
                    {[products[0], products[1], products[2]].map((p, i) => (
                      <Jar
                        key={p.slug}
                        product={p}
                        className={`h-auto w-[30%] transition-transform duration-500 ${
                          i === 0
                            ? "-mr-[4%] translate-y-[10%] -rotate-12 scale-85 group-hover:-rotate-20"
                            : i === 1
                              ? "relative z-10 group-hover:-translate-y-2"
                              : "-ml-[4%] translate-y-[10%] rotate-12 scale-85 group-hover:rotate-20"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between p-6">
                  <div>
                    <h2 className="type-h3">Pantry</h2>
                    <p className="mt-1 text-sm text-muted">
                      Editorial & product-led — food, artisan, retail
                    </p>
                  </div>
                  <span className="rounded-full bg-linear-to-r from-brand-cyan to-brand-purple px-4 py-2 text-xs font-semibold text-bg-deep">
                    Live demo &rarr;
                  </span>
                </div>
              </Link>
            </li>
            {upcoming.map((t) => (
              <li
                key={t.name}
                className="overflow-hidden rounded-3xl border border-white/10 bg-surface"
              >
                <div className="relative aspect-4/3 bg-surface-2">
                  <Image
                    src={t.src}
                    alt={`${t.name} website template preview`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-contain p-6 opacity-70"
                  />
                </div>
                <div className="flex items-center justify-between p-6">
                  <h2 className="type-h3">{t.name}</h2>
                  <span className="rounded-full border border-white/15 px-4 py-2 text-xs text-muted">
                    Coming soon
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
