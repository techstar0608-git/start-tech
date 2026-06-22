"use client";

import { useState } from "react";
import Link from "next/link";
import { StarMark } from "./StarMark";
import { nav } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="S.T.A.R home"
        >
          <StarMark className="h-8 w-8" />
          <span className="font-display text-lg font-bold tracking-[0.18em]">
            S.T.A.R
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full bg-linear-to-r from-brand-cyan to-brand-purple px-5 py-2 text-sm font-semibold text-bg-deep transition-transform hover:scale-105 md:inline-flex"
        >
          Contact now
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg text-2xl md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="mx-4 rounded-2xl border border-white/10 bg-surface/95 p-4 backdrop-blur-lg md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-widest text-muted hover:bg-white/5 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-linear-to-r from-brand-cyan to-brand-purple px-5 py-3 text-center text-sm font-semibold uppercase tracking-widest text-bg-deep"
            >
              Contact now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
