"use client";

import { useEffect, useRef, useState } from "react";

// Group-circle.svg: ticks sit at ~0.94 of its box radius. With a dial box
// radius of 64 the outer ticks land at ~60, and the wrap line at 74 leaves a
// clean, even gap all the way around (the line bows a larger circle).
const RDIAL = 64; // dial display radius
const RW = 74; // line wrap radius (≈ tick radius + gap)
const CX = 150; // every dial sits on the same vertical axis
// Vertical spacing = 2·RW, so the bottom turn-point of one wrap is exactly the
// top start-point of the next — the semicircles chain into one continuous,
// kink-free serpentine. Wrap sides alternate to weave the wave.
const GAP = 2 * RW;
const CY0 = 90;
const C: { x: number; y: number; side: "left" | "right" }[] = [
  { x: CX, y: CY0 + 0 * GAP, side: "left" },
  { x: CX, y: CY0 + 1 * GAP, side: "right" },
  { x: CX, y: CY0 + 2 * GAP, side: "left" },
  { x: CX, y: CY0 + 3 * GAP, side: "right" },
];
const VB = { w: 300, h: C[3].y + RW + 26 };

const PHASES = [
  { name: "Foundation", desc: "Brand, website and systems" },
  { name: "Acquisition", desc: "Turn traffic into bookings" },
  { name: "Maintain", desc: "Keep operations running smoothly" },
  { name: "Optimisation", desc: "Automate and scale efficiently" },
];

// One continuous serpentine: a chain of 180° semicircles that alternate sides.
// Because spacing = 2·RW, each arc ends exactly where the next begins, and the
// alternating sweep makes the tangents match — a single, perfectly smooth line.
function buildPath(rw: number) {
  // start exactly at item 1's top entry, end exactly at the last item's bottom
  let d = `M ${CX} ${C[0].y - rw}`;
  C.forEach((c) => {
    const sweep = c.side === "left" ? 0 : 1;
    d += ` A ${rw} ${rw} 0 0 ${sweep} ${CX} ${c.y + rw}`;
  });
  return d;
}
const PATH = buildPath(RW);
// a thin secondary line running parallel to the main one. Offsets give: top 2
// dials → thin line on the LEFT of the main line, bottom 2 → on the RIGHT.
const THIN_OFFSETS = [10, -10, -10, 10];
const THIN_ARCS = C.map((c, i) => {
  const rw = RW + THIN_OFFSETS[i];
  const sweep = c.side === "left" ? 0 : 1;
  return `M ${CX} ${c.y - rw} A ${rw} ${rw} 0 0 ${sweep} ${CX} ${c.y + rw}`;
});

// faint "speed streak" arcs on the outer side of each dial (Figma decoration)
function streaks() {
  const out: { d: string; o: number }[] = [];
  C.forEach((c) => {
    const base = c.side === "left" ? Math.PI : 0; // facing the wrap side
    [
      { r: RW + 9, span: 1.5, o: 0.42 },
      { r: RW + 19, span: 1.15, o: 0.28 },
      { r: RW + 30, span: 0.8, o: 0.18 },
    ].forEach(({ r, span, o }) => {
      const a0 = base - span / 2;
      const a1 = base + span / 2;
      const p0 = [c.x + r * Math.cos(a0), c.y + r * Math.sin(a0)];
      const p1 = [c.x + r * Math.cos(a1), c.y + r * Math.sin(a1)];
      out.push({
        d: `M ${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A ${r} ${r} 0 0 1 ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}`,
        o,
      });
    });
  });
  return out;
}
const STREAKS = streaks();

// conic colour ramp: white → cyan → blue → navy, wrapping so the brightest and
// darkest ticks sit right next to each other at the "seam" (the join point).
const RAMP: [number, [number, number, number]][] = [
  [0, [255, 255, 255]],
  [0.3, [143, 230, 255]],
  [0.62, [47, 95, 224]],
  [1, [11, 26, 68]],
];
function rampColor(t: number) {
  for (let i = 1; i < RAMP.length; i++) {
    if (t <= RAMP[i][0]) {
      const [t0, c0] = RAMP[i - 1];
      const [t1, c1] = RAMP[i];
      const f = (t - t0) / (t1 - t0);
      const m = (j: number) => Math.round(c0[j] + (c1[j] - c0[j]) * f);
      return `rgb(${m(0)},${m(1)},${m(2)})`;
    }
  }
  return "rgb(11,26,68)";
}

// dial ring of ticks. The seam (white right next to navy) sits at 6 o'clock —
// the join point — and the ramp direction mirrors every other dial so the
// dials read symmetrically down the chain.
function Dial({ mirror }: { mirror: boolean }) {
  const N = 48;
  const seamDeg = 180; // 6 o'clock
  const dir = mirror ? -1 : 1;
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
      {Array.from({ length: N }).map((_, i) => {
        const deg = (i / N) * 360;
        let t = (((deg - seamDeg) * dir) % 360) / 360;
        t = ((t % 1) + 1) % 1;
        const a = (deg - 90) * (Math.PI / 180);
        const r1 = 36;
        const r2 = 46;
        return (
          <line
            key={i}
            x1={(50 + r1 * Math.cos(a)).toFixed(2)}
            y1={(50 + r1 * Math.sin(a)).toFixed(2)}
            x2={(50 + r2 * Math.cos(a)).toFixed(2)}
            y2={(50 + r2 * Math.sin(a)).toFixed(2)}
            stroke={rampColor(t)}
            strokeWidth="1.9"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

function Sparkle() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7 drop-shadow-[0_0_10px_rgba(91,231,255,0.95)]"
      aria-hidden="true"
    >
      <path
        d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z"
        fill="#cdf4ff"
      />
    </svg>
  );
}

export function Framework() {
  const graphicRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const fracsRef = useRef<number[]>([0.18, 0.43, 0.68, 0.93]);
  const [len, setLen] = useState(0);
  const [progress, setProgress] = useState(0);
  const [star, setStar] = useState({ x: CX, y: C[0].y - RW });
  const [revealed, setRevealed] = useState([false, false, false, false]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const steps = 700;
    const fr = C.map((c) => {
      const ex = c.side === "left" ? c.x - RW : c.x + RW; // outer extreme (mid-wrap)
      let best = 0;
      let bd = Infinity;
      for (let s = 0; s <= steps; s++) {
        const l = (s / steps) * total;
        const pt = path.getPointAtLength(l);
        const d = (pt.x - ex) ** 2 + (pt.y - c.y) ** 2;
        if (d < bd) {
          bd = d;
          best = l;
        }
      }
      return best / total;
    });
    fracsRef.current = fr;
    setLen(total);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      const raf = requestAnimationFrame(() => {
        setProgress(1);
        setRevealed([true, true, true, true]);
        const path = pathRef.current;
        if (path) {
          const pt = path.getPointAtLength(path.getTotalLength());
          setStar({ x: pt.x, y: pt.y });
        }
      });
      return () => cancelAnimationFrame(raf);
    }
    const onScroll = () => {
      const el = graphicRef.current;
      const path = pathRef.current;
      if (!el || !path) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const startY = vh * 0.6;
      const dist = r.height * 0.8;
      const p = Math.max(0, Math.min(1, (startY - r.top) / dist));
      setProgress(p);
      const pt = path.getPointAtLength(p * path.getTotalLength());
      setStar({ x: pt.x, y: pt.y });
      // reversible: items reveal as the star arrives and hide again if the
      // user scrolls back up (the whole animation plays backward)
      setRevealed((prev) => {
        const next = fracsRef.current.map((f) => p >= f - 0.02);
        return next.some((v, i) => v !== prev[i]) ? next : prev;
      });
    };
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const dialPct = ((RDIAL * 2) / VB.w) * 100;

  return (
    <section
      id="framework"
      className="px-5 py-20"
      aria-labelledby="framework-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2 id="framework-heading" className="type-h1">
          <span className="block text-gradient-blue">A framework</span>
          <span className="block text-[0.72em] leading-tight text-ink">
            not a
          </span>
          <span className="block text-[0.72em] leading-tight text-ink">
            guessing game
          </span>
        </h2>
        <p className="type-lead mt-9 text-white/90">
          Four clear phases.
          <br />
          Always know what&apos;s
          <br />
          happening next.
        </p>

        <div
          ref={graphicRef}
          className="relative mx-auto mt-12 w-full max-w-sm"
          style={{ aspectRatio: `${VB.w} / ${VB.h}` }}
        >
          <svg
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            className="absolute inset-0 h-full w-full overflow-visible"
            fill="none"
          >
            <defs>
              <linearGradient id="fwLine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5BE7FF" stopOpacity="1" />
                <stop offset="44%" stopColor="#46a0ff" stopOpacity="1" />
                {/* item 2↔3 join (~50%) fades out toward both sides */}
                <stop offset="50%" stopColor="#3a59ff" stopOpacity="0" />
                <stop offset="56%" stopColor="#3a59ff" stopOpacity="1" />
                <stop offset="100%" stopColor="#9b6bff" stopOpacity="1" />
              </linearGradient>
            </defs>

            {STREAKS.map((s, i) => (
              <path
                key={i}
                d={s.d}
                stroke="#5f7bbf"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity={s.o * 0.7}
              />
            ))}

            {/* thin parallel line (left for top 2 dials, right for bottom 2) */}
            {THIN_ARCS.map((d, i) => (
              <path
                key={i}
                d={d}
                stroke="#3a6aa8"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.45"
              />
            ))}
            <path d={PATH} stroke="#152340" strokeWidth="2" />
            <path
              ref={pathRef}
              d={PATH}
              stroke="url(#fwLine)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                strokeDasharray: len || undefined,
                strokeDashoffset: len ? len * (1 - progress) : undefined,
                opacity: len ? 1 : 0,
                filter: "drop-shadow(0 0 3px rgba(91,231,255,0.55))",
              }}
            />
          </svg>

          {PHASES.map((p, i) => {
            const c = C[i];
            const cx = (c.x / VB.w) * 100;
            const cy = (c.y / VB.h) * 100;
            const show = revealed[i];
            const descSide = c.side === "left" ? "right" : "left";
            const edge = ((c.x + (descSide === "right" ? RW : -RW)) / VB.w) * 100;
            return (
              <div key={p.name}>
                <div
                  className="absolute aspect-square transition-all duration-500 ease-out"
                  style={{
                    width: `${dialPct}%`,
                    left: `${cx}%`,
                    top: `${cy}%`,
                    transform: `translate(-50%, -50%) scale(${show ? 1 : 0.6})`,
                    opacity: show ? 1 : 0,
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-[16%] rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(53,198,244,0.22), transparent 70%)",
                    }}
                  />
                  <Dial mirror={i % 2 === 1} />
                  <span className="absolute inset-0 grid place-items-center font-display text-[15px] font-extrabold tracking-[0.02em] text-[#5BE7FF]">
                    {p.name}
                  </span>
                </div>

                <div
                  className="absolute w-[26%] transition-all duration-500 ease-out"
                  style={{
                    top: `${cy}%`,
                    ...(descSide === "right"
                      ? { left: `calc(${edge}% + 3%)`, textAlign: "left" }
                      : { right: `calc(${100 - edge}% + 3%)`, textAlign: "right" }),
                    transform: `translateY(-50%) translateX(${
                      show ? "0" : descSide === "right" ? "12px" : "-12px"
                    })`,
                    opacity: show ? 1 : 0,
                  }}
                >
                  <p className="text-[13px] font-medium leading-snug tracking-[0.04em] text-white">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}

          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(star.x / VB.w) * 100}%`,
              top: `${(star.y / VB.h) * 100}%`,
            }}
          >
            <Sparkle />
          </div>
        </div>

        <ul className="sr-only">
          {PHASES.map((p) => (
            <li key={p.name}>
              {p.name}: {p.desc}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
