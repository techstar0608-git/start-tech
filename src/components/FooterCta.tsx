import Image from "next/image";
import { StarMark } from "./StarMark";
import { site } from "@/lib/site";

const usefulLinks = [
  { label: "Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "About us", href: "#" },
  { label: "Case study", href: "#case-study" },
  { label: "Website Template", href: "#templates" },
];

export function FooterCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 pt-24"
      aria-labelledby="contact-heading"
    >
      {/* galaxy backdrop */}
      <Image
        src="/images/cosmic.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-10 object-cover object-bottom opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-bg via-bg/60 to-bg-deep"
      />

      <div className="mx-auto max-w-3xl text-center">
        <h2 id="contact-heading" className="type-h1">
          <span className="text-ink">Start</span>{" "}
          <span className="italic text-muted">with</span>
          <br />
          <span className="text-gradient">S.T.A.R</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-lg text-muted">
          Tell us about your shop. We&apos;ll recommend the right phase and a
          price range.
        </p>

        <a
          href={`mailto:${site.email}`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-cyan to-brand-purple px-8 py-4 text-base font-semibold text-bg-deep shadow-[0_8px_30px_rgba(53,198,244,0.35)] transition-transform hover:scale-105"
        >
          Contact now <span>→</span>
        </a>
      </div>

      <footer className="mx-auto mt-24 max-w-5xl border-t border-white/10 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <StarMark className="h-8 w-8" />
              <span className="font-display text-lg font-bold tracking-[0.18em]">
                S.T.A.R
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted">
              Your marketing team, without the hiring. Branding, websites, ads
              and automation for Australian shops.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-faint">
              Contact now
            </h3>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 flex items-center gap-2 text-muted transition-colors hover:text-ink"
            >
              ✉ {site.email}
            </a>
            <div className="mt-4 flex gap-3" aria-label="Social media">
              <a
                href="#"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-muted hover:text-ink"
              >
                f
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-muted hover:text-ink"
              >
                ◎
              </a>
            </div>
          </div>

          <nav aria-label="Useful links">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-faint">
              Useful links
            </h3>
            <ul className="mt-4 space-y-2">
              {usefulLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 text-center text-xs text-faint">
          © 2026 {site.legalName}. All rights reserved.
        </p>
      </footer>
    </section>
  );
}
