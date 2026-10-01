"use client";

import { useEffect, useRef, useState } from "react";
import { brand, menuLinks } from "./data";

// `onOrange` swaps the accent so the wordmark stays legible on the menu
function Wordmark({ onOrange = false }: { onOrange?: boolean }) {
  return (
    <span className="font-pantry-serif flex flex-col items-center leading-none">
      <span className="text-[1.45rem] font-semibold tracking-[0.06em] text-pantry-wine sm:text-[2rem]">
        {brand.name.toUpperCase()}
      </span>
      <span
        className={`-mt-0.5 text-base italic sm:text-xl ${onOrange ? "text-pantry-cream" : "text-pantry-orange"}`}
      >
        {brand.suffix}
      </span>
    </span>
  );
}

// staircase indent for the menu items — gentler on phones so long words fit
const MENU_INDENT = [
  "pl-0",
  "pl-[6%] sm:pl-[12%]",
  "pl-[12%] sm:pl-[24%]",
  "pl-[18%] sm:pl-[36%]",
];

/**
 * Fixed header (cart pill · wordmark · menu pill) and the full-screen
 * staggered menu overlay.
 */
export function PantryHeader() {
  const [open, setOpen] = useState(false);
  const [tucked, setTucked] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // slide the header away while scrolling down, bring it back on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 6) return;
      setTucked(y > lastY && y > 160);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-[300] flex items-start justify-between px-4 pt-5 transition-transform duration-500 sm:px-8 sm:pt-7 ${tucked ? "-translate-y-[140%]" : ""}`}
      >
        <a
          href="#shop"
          className="pointer-events-auto inline-flex h-10 items-center gap-2 rounded-full border border-pantry-wine/60 bg-pantry-cream/70 px-2.5 text-xs sm:px-4 font-semibold uppercase tracking-wider text-pantry-wine backdrop-blur-sm transition-colors hover:bg-pantry-wine hover:text-pantry-cream"
        >
          <span className="sr-only sm:not-sr-only">Cart</span>
          <span className="grid h-5 w-5 place-items-center rounded-full bg-pantry-orange text-[10px] text-pantry-cream">
            0
          </span>
        </a>
        <a
          href="#top"
          aria-label={`${brand.name} ${brand.suffix} — home`}
          className="pointer-events-auto"
        >
          <Wordmark />
        </a>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="pantry-menu"
          className="pointer-events-auto group inline-flex h-10 items-center"
        >
          <span className="inline-flex h-10 items-center rounded-full border border-pantry-wine/60 bg-pantry-cream/70 px-4 text-xs font-semibold uppercase tracking-wider text-pantry-wine backdrop-blur-sm transition-colors group-hover:bg-pantry-wine group-hover:text-pantry-cream">
            Menu
          </span>
          <span
            aria-hidden="true"
            className="grid h-10 w-10 place-items-center rounded-full bg-pantry-orange text-xs text-pantry-cream transition-transform group-hover:rotate-90"
          >
            &#9670;
          </span>
        </button>
      </header>

      <div
        id="pantry-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-0 z-[400] flex flex-col bg-pantry-orange px-4 pb-6 pt-5 sm:px-8 sm:pt-7"
      >
        <div className="flex items-start justify-between">
          <span className="w-24" />
          <Wordmark onOrange />
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            className="group inline-flex h-10 items-center"
          >
            <span className="inline-flex h-10 items-center rounded-full border border-pantry-wine/60 px-4 text-xs font-semibold uppercase tracking-wider text-pantry-wine">
              Close
            </span>
            <span
              aria-hidden="true"
              className="grid h-10 w-10 place-items-center rounded-full bg-pantry-wine text-pantry-orange transition-transform group-hover:rotate-90"
            >
              &#10005;
            </span>
          </button>
        </div>

        <nav aria-label="Primary" className="mt-auto">
          <ul>
            {menuLinks.map((l, i) => (
              <li
                key={l.href}
                className="border-b border-pantry-wine/25 last:border-0"
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`font-pantry-serif group flex items-center gap-4 py-2 text-[clamp(2.5rem,10vw,8rem)] ${MENU_INDENT[i]} uppercase leading-[1.05] text-pantry-wine transition-colors hover:text-pantry-cream`}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className="text-[0.3em] opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    &#9670;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 flex gap-6 text-sm font-semibold text-pantry-wine">
          <a
            href="#visit"
            onClick={() => setOpen(false)}
            className="hover:underline"
          >
            About
          </a>
          <a
            href="#visit"
            onClick={() => setOpen(false)}
            className="hover:underline"
          >
            Contact
          </a>
          <a
            href="#shop"
            onClick={() => setOpen(false)}
            className="hover:underline"
          >
            Shop &#8599;
          </a>
        </div>
      </div>
    </>
  );
}
