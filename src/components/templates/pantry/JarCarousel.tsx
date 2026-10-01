"use client";

import { useEffect, useRef, useState } from "react";
import { brand, products } from "./data";
import { Jar } from "./Jar";

const N = products.length;
const IDLE_DRIFT = 0.0018; // jars per frame
const IDLE_AFTER = 1500; // ms of no input before the idle drift resumes
const EASE = 0.08;

// wrap i - offset into (-N/2, N/2] so the carousel loops forever
function relative(i: number, offset: number) {
  let rel = (((i - offset) % N) + N) % N;
  if (rel > N / 2) rel -= N;
  return rel;
}

/**
 * Hero: an endless arc of tilted jars over a wine-coloured plinth, with a
 * ring of type turning behind. Horizontal scroll (trackpad swipe or
 * shift + wheel) and drag/swipe turn the jars; vertical scroll is left to the
 * page. A slow idle drift keeps it alive between interactions.
 */
export function JarCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const jarRefs = useRef<(HTMLDivElement | null)[]>([]);
  // sharp copy of each jar; fading it out reveals a pre-blurred copy beneath
  const sharpRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!section || !stage || !ring) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let current = 0;
    let target = 0;
    let lastInput = 0;
    let lastActive = 0;
    let pointer: { id: number; x: number } | null = null;
    let frame = 0;
    // springy lean that follows how fast the carousel is moving
    let lean = 0;
    let leanVel = 0;

    // phones show one hero jar with neighbours peeking in; desktop shows ~5
    const spacing = () =>
      window.innerWidth < 640
        ? window.innerWidth * 0.6
        : Math.min(window.innerWidth * 0.31, 430);

    // last values written per jar, so unchanged styles are never re-set
    const lastZ: number[] = [];
    const lastOpacity: number[] = [];
    const lastSharp: number[] = [];

    const render = () => {
      const idle = !pointer && performance.now() - lastInput > IDLE_AFTER;
      if (idle && !reduceMotion) target += IDLE_DRIFT;
      const prev = current;
      current += (target - current) * EASE;

      // jars lean into the motion and wobble back like they're on a spring
      const leanTarget = Math.max(-16, Math.min(16, (current - prev) * -320));
      leanVel = (leanVel + (leanTarget - lean) * 0.09) * 0.84;
      lean += leanVel;
      const t = reduceMotion ? 0 : performance.now() / 1000;

      const gap = spacing();
      const vh = window.innerHeight;
      jarRefs.current.forEach((el, i) => {
        if (!el) return;
        const rel = relative(i, current);
        const dist = Math.abs(rel);
        const x = rel * gap;
        // idle sway: each jar rocks and bobs on its own phase
        const sway = Math.sin(t * 1.4 + i * 1.3) * 3;
        const bob = Math.sin(t * 1.1 + i * 0.9) * 6;
        const y =
          dist * dist * vh * 0.022 -
          (dist < 1 ? (1 - dist) * vh * 0.02 : 0) +
          bob;
        const rot = rel * 13 + Math.sin(i * 1.7) * 5 + sway + lean;
        const scale = 1 - Math.min(dist, 3) * 0.14;
        const opacity =
          Math.round(
            (dist > 2.6 ? Math.max(0, 1 - (dist - 2.6) * 1.6) : 1) * 100,
          ) / 100;
        // transform + opacity only: both stay on the compositor, no repaint
        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${scale})`;
        if (opacity !== lastOpacity[i]) {
          el.style.opacity = String(opacity);
          lastOpacity[i] = opacity;
        }
        const z = 100 - Math.round(dist * 10);
        if (z !== lastZ[i]) {
          el.style.zIndex = String(z);
          lastZ[i] = z;
        }
        // depth of field: crossfade the sharp copy away from the centre
        const sharp =
          Math.round(Math.max(0, Math.min(1, 1.3 - dist * 0.55)) * 100) / 100;
        const sharpEl = sharpRefs.current[i];
        if (sharpEl && sharp !== lastSharp[i]) {
          sharpEl.style.opacity = String(sharp);
          lastSharp[i] = sharp;
        }
      });
      ring.style.transform = `rotate(${current * -16}deg)`;

      const nextActive = ((Math.round(current) % N) + N) % N;
      if (nextActive !== lastActive) {
        lastActive = nextActive;
        setActive(nextActive);
      }
      frame = requestAnimationFrame(render);
    };

    // only animate while the hero is on screen
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !frame) {
        frame = requestAnimationFrame(render);
      } else if (!entry.isIntersecting && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    io.observe(section);

    const onWheel = (e: WheelEvent) => {
      // mostly-vertical gestures scroll the page as usual
      if (!e.shiftKey && Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      // shift + mouse wheel reports as vertical on some platforms
      const dx = e.deltaX !== 0 ? e.deltaX : e.deltaY;
      // keep the browser from treating a sideways swipe as back/forward
      e.preventDefault();
      const px = e.deltaMode === 1 ? dx * 16 : dx;
      target += px / spacing();
      lastInput = performance.now();
    };

    const onDown = (e: PointerEvent) => {
      pointer = { id: e.pointerId, x: e.clientX };
      lastInput = performance.now();
      stage.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!pointer || e.pointerId !== pointer.id) return;
      target -= (e.clientX - pointer.x) / spacing();
      pointer.x = e.clientX;
      lastInput = performance.now();
    };
    const onUp = (e: PointerEvent) => {
      if (pointer && e.pointerId === pointer.id) pointer = null;
    };
    section.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      section.removeEventListener("wheel", onWheel);
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const current = products[active];

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Featured preserves"
      className="relative h-svh min-h-[560px]"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* plinth + turning ring of type */}
        <svg
          viewBox="0 0 1000 1000"
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[52%] w-[max(118vw,640px)] max-w-[1180px] -translate-x-1/2"
        >
          <path
            d="M500 70 L840 230 L960 520 L960 1000 L40 1000 L40 520 L160 230 Z"
            fill="var(--color-pantry-wine)"
            stroke="var(--color-pantry-wine)"
            strokeWidth="140"
            strokeLinejoin="round"
          />
        </svg>
        {/* the ring lives in its own layer so turning it is a GPU rotate,
            not a repaint of the whole plinth. The rotation sits on an HTML
            wrapper: transforming the <svg> itself re-lays out its text. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[52%] w-[max(118vw,640px)] max-w-[1180px] -translate-x-1/2"
        >
          <div ref={ringRef} className="will-change-transform">
            <svg viewBox="0 0 1000 1000" className="block h-auto w-full">
              <defs>
                <path
                  id="pantry-ring"
                  d="M500 500 m-330 0 a330 330 0 1 1 660 0 a330 330 0 1 1 -660 0"
                />
              </defs>
              <text
                className="font-pantry-serif"
                fontSize="96"
                fill="var(--color-pantry-orange)"
              >
                <textPath
                  href="#pantry-ring"
                  textLength="2070"
                  lengthAdjust="spacing"
                >
                  {brand.ring}
                </textPath>
              </text>
            </svg>
          </div>
        </div>

        {/* jars */}
        <div
          ref={stageRef}
          className="absolute inset-0 cursor-grab touch-pan-y select-none active:cursor-grabbing"
        >
          {products.map((p, i) => (
            <div
              key={p.slug}
              ref={(el) => {
                jarRefs.current[i] = el;
              }}
              className="absolute left-1/2 top-[48%] w-[clamp(200px,56vw,340px)] will-change-transform sm:top-[50%] sm:w-[clamp(190px,27vw,380px)]"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              {/* static blur: rasterised once, never animated */}
              <Jar
                product={p}
                flat
                className="h-auto w-full blur-[1.6px] saturate-[0.9]"
              />
              <div
                ref={(el) => {
                  sharpRefs.current[i] = el;
                }}
                className="absolute inset-0 will-change-[opacity]"
              >
                <Jar
                  product={p}
                  className="h-auto w-full drop-shadow-[0_30px_30px_rgba(74,20,30,0.25)]"
                />
              </div>
            </div>
          ))}
        </div>

        {/* active product pill */}
        <a
          href={`#shop-${current.slug}`}
          className="absolute left-1/2 top-[74%] z-[200] inline-flex -translate-x-1/2 -translate-y-1/2 sm:top-[52%] sm:ml-[clamp(80px,12vw,175px)] sm:translate-x-0 items-center gap-2 whitespace-nowrap rounded-full bg-pantry-cream px-4 py-2 text-xs font-semibold uppercase tracking-wider text-pantry-orange shadow-sm transition-colors hover:bg-white"
        >
          <span aria-hidden="true">&#9670;</span>
          <span className="sr-only">Discover </span>
          {current.name}
        </a>

        {/* bottom bar */}
        <div className="absolute inset-x-0 bottom-0 z-[200] flex items-end justify-between gap-4 px-5 pb-20 sm:px-8 sm:pb-6">
          <p className="hidden max-w-[16rem] text-sm text-pantry-cream/80 sm:block">
            {brand.tagline}
          </p>
          <p className="font-pantry-serif mx-auto text-xs uppercase tracking-[0.25em] text-pantry-cream sm:mx-0">
            Swipe sideways or drag to discover
          </p>
          <a
            href="#shop"
            className="hidden rounded-full bg-pantry-orange px-5 py-2.5 text-sm font-semibold text-pantry-cream transition-transform hover:scale-105 sm:inline-flex"
          >
            Shop the pantry
          </a>
        </div>
      </div>
    </section>
  );
}
