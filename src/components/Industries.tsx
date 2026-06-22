"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const industries = [
  {
    title: "Beauty & Wellness",
    blurb: "Spas and salons focused on retention",
    img: "/images/ind-beauty.jpg",
    alt: "Premium beauty salon interior",
  },
  {
    title: "Nail Salons",
    blurb: "Every chair-hour matters",
    img: "/images/ind-nail.jpg",
    alt: "Busy modern nail salon",
  },
  {
    title: "Tradies",
    blurb: "Fast quotes win local jobs",
    img: "/images/ind-tradies.jpg",
    alt: "Tradesperson at work",
  },
  {
    title: "Food & Beverage",
    blurb: "Built for local discovery",
    img: "/images/ind-food.jpg",
    alt: "Modern Australian café and restaurant",
  },
  {
    title: "Home Cleaning",
    blurb: "Recurring jobs, reliable teams",
    img: "/images/ind-cleaning.jpg",
    alt: "Home cleaning service team",
  },
  {
    title: "Pet Care",
    blurb: "Trust earns the next visit",
    img: "/images/ind-petcare.jpg",
    alt: "Pet care service",
  },
];

const COUNT = industries.length;
// clone the last item at the front and the first item at the end for an
// infinite (cyclic) loop.
const slides = [industries[COUNT - 1], ...industries, industries[0]];

function Card({ item }: { item: (typeof industries)[number] }) {
  return (
    <article
      className="relative rounded-[28px] p-px"
      style={{
        background:
          "linear-gradient(135deg, rgba(91,231,255,0.65), rgba(91,231,255,0.06) 32%, rgba(255,255,255,0.05) 68%, rgba(91,231,255,0.3))",
      }}
    >
      <div className="rounded-[27px] bg-[#0a1430] p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 flex-1 font-sans text-[clamp(1.5rem,7.4vw,1.83rem)] font-bold capitalize leading-tight text-[#5BE7FF]">
            {item.title}
          </h3>
          <p className="w-2/5 shrink-0 wrap-break-word pt-1 text-right text-base leading-snug tracking-[0.04em] text-white/90">
            {item.blurb}
          </p>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl">
          <Image
            src={item.img}
            alt={item.alt}
            width={530}
            height={396}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </article>
  );
}

export function Industries() {
  // `pos` indexes into `slides` (which has the two clones); real items live at
  // pos 1..COUNT. Start on the first real item.
  const [pos, setPos] = useState(1);
  const [instant, setInstant] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef<number | null>(null);
  const widthRef = useRef(1);

  const real = (((pos - 1) % COUNT) + COUNT) % COUNT;

  // after sliding onto a clone, jump (without animation) to the real slide
  const settle = () => {
    if (pos === 0) {
      setInstant(true);
      setPos(COUNT);
    } else if (pos === COUNT + 1) {
      setInstant(true);
      setPos(1);
    }
  };
  useEffect(() => {
    if (!instant) return;
    const id = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(id);
  }, [instant]);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    widthRef.current = e.currentTarget.clientWidth || 1;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    setDragX(e.clientX - startX.current);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const delta = e.clientX - startX.current;
    const threshold = Math.min(widthRef.current * 0.2, 80);
    if (delta < -threshold) setPos((p) => p + 1); // swipe left → next
    else if (delta > threshold) setPos((p) => p - 1); // swipe right → prev
    startX.current = null;
    setDragging(false);
    setDragX(0);
  };

  const frac = COUNT > 1 ? real / (COUNT - 1) : 0;

  return (
    <section
      id="industries"
      className="relative bg-bg px-5 py-20"
      aria-labelledby="industries-heading"
    >
      <div className="mx-auto max-w-2xl">
        <h2 id="industries-heading" className="type-h2 text-[#5BE7FF]">
          Built for the shops we know
        </h2>
        <p className="type-lead mt-3 max-w-md text-white/90">
          We specialise in service businesses where bookings and repeat
          customers drive growth.
        </p>

        {/* swipeable, infinitely-looping carousel */}
        <div
          className="mt-8 cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className="flex"
            onTransitionEnd={settle}
            style={{
              transform: `translateX(calc(${-pos * 100}% + ${dragX}px))`,
              transition:
                dragging || instant ? "none" : "transform 420ms ease-out",
            }}
          >
            {slides.map((item, i) => (
              <div
                key={i}
                className="w-full shrink-0 select-none px-1"
                aria-hidden={i !== pos}
              >
                <Card item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* progress bar — round thumb + filled line + track + end dot (Figma) */}
        <div className="relative mx-auto mt-10 h-4 w-full max-w-sm">
          {/* track */}
          <div className="absolute inset-x-1.75 top-1/2 h-px -translate-y-1/2 rounded-full bg-white/20" />
          {/* filled portion */}
          <div
            className="absolute left-1.75 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-white transition-[width] duration-300 ease-out"
            style={{ width: `calc(${frac} * (100% - 14px))` }}
          />
          {/* end dot */}
          <span className="absolute right-0 top-1/2 size-3.5 -translate-y-1/2 rounded-full bg-white/35" />
          {/* moving thumb */}
          <button
            type="button"
            aria-label={`Industry ${real + 1} of ${COUNT}`}
            className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)] transition-[left] duration-300 ease-out"
            style={{ left: `calc(7px + ${frac} * (100% - 14px))` }}
          />
        </div>

        {/* swipe to explore */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="text-sm uppercase tracking-[0.25em] text-faint">
            Swipe to explore
          </span>
          <button
            type="button"
            onClick={() => setPos((p) => p + 1)}
            aria-label="Next industry"
            className="grid size-9 place-items-center rounded-full bg-linear-to-r from-brand-cyan to-brand-blue text-bg-deep transition-transform hover:scale-105"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
