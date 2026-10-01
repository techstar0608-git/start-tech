import { useId } from "react";
import { brand, type LabelPattern, type Product } from "./data";

// label shapes, drawn in label space (x 22–178, y 104–222) and clipped to it
function Pattern({ type, color }: { type: LabelPattern; color: string }) {
  switch (type) {
    case "dots":
      return (
        <g fill={color}>
          <circle cx="44" cy="120" r="22" />
          <circle cx="150" cy="112" r="30" />
          <circle cx="104" cy="150" r="16" />
          <circle cx="172" cy="168" r="18" />
          <circle cx="30" cy="172" r="14" />
        </g>
      );
    case "leaves":
      return (
        <g fill={color}>
          <path d="M30 170 C30 130 60 110 70 104 C74 140 60 160 30 170Z" />
          <path d="M96 176 C86 140 104 118 118 104 C130 136 120 160 96 176Z" />
          <path d="M150 168 C146 132 166 112 184 106 C190 140 176 160 150 168Z" />
          <path
            d="M60 110 C80 126 84 146 78 170"
            stroke={color}
            strokeWidth="3"
            fill="none"
          />
        </g>
      );
    case "waves":
      return (
        <g fill="none" stroke={color} strokeWidth="7" strokeLinecap="round">
          <path d="M14 118 Q40 104 66 118 T118 118 T170 118 T222 118" />
          <path d="M14 140 Q40 126 66 140 T118 140 T170 140 T222 140" />
          <path d="M14 162 Q40 148 66 162 T118 162 T170 162 T222 162" />
        </g>
      );
    case "slices":
      return (
        <g fill={color}>
          <circle cx="56" cy="138" r="34" />
          <circle cx="152" cy="126" r="26" />
          <g stroke="rgba(255,255,255,0.45)" strokeWidth="2.5">
            <path d="M56 104 V172 M22 138 H90 M32 114 L80 162 M80 114 L32 162" />
            <path d="M152 100 V152 M126 126 H178 M134 108 L170 144 M170 108 L134 144" />
          </g>
        </g>
      );
  }
}

// outer glass silhouette (viewBox 0 0 200 270)
const JAR_OUTLINE =
  "M32 50 H168 V64 Q168 70 174 74 Q178 77 178 88 V238 Q178 258 158 258 H42 Q22 258 22 238 V88 Q22 77 26 74 Q32 70 32 64 Z";
// what's inside, one glass-wall thickness in from the outline
const CONTENTS =
  "M27 92 Q27 87 33 87 Q100 91 167 87 Q173 87 173 92 V236 Q173 253 156 253 H44 Q27 253 27 236 Z";

// label band on the jar (viewBox units)
const LABEL_TOP = 104;
const LABEL_H = 118;
// the jar body is a cylinder of radius R; its label wraps the full circumference
const R = 78;
const STRIP = 2 * Math.PI * R;
// vertical slices, evenly spaced in angle so the edges get the finest slices.
// Each maps strip coordinate u to jar x ≈ x + tx + c·u, a local linearisation
// of x = 100 + R·sin(u / R).
const SLICE_COUNT = 14;
const SLICES = Array.from({ length: SLICE_COUNT }, (_, k) => {
  const t0 = -Math.PI / 2 + (k * Math.PI) / SLICE_COUNT;
  const t1 = t0 + Math.PI / SLICE_COUNT;
  const tm = (t0 + t1) / 2;
  const x0 = 100 + R * Math.sin(t0);
  const x1 = 100 + R * Math.sin(t1);
  const c = Math.cos(tm);
  return {
    x: x0,
    w: x1 - x0 + 0.9, // overlap hides anti-aliased seams between slices
    c,
    tx: 100 + R * Math.sin(tm) - c * R * tm - x0,
  };
});
const FLAT_SLICE = [{ x: 22, w: 156, c: 1, tx: 78 }];

// The label is HTML, sized in container units: the jar is 200 viewBox units
// wide, so 1 unit = 0.5cqw. Unlike SVG <text>, HTML text is not re-laid out
// when an ancestor's transform scale changes — which the carousel does every
// frame — so this keeps animation on the compositor.
// Rounded so server and browser serialise identical style strings (the
// browser trims long decimals inside transforms, which breaks hydration).
const u = (n: number) => `${+(n / 2).toFixed(3)}cqw`;

/** text placed like SVG <text>: centred on x, with y as the baseline */
function T({
  x = 0,
  y,
  size,
  spacing = 0,
  className = "",
  children,
}: {
  x?: number;
  y: number;
  size: number;
  spacing?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`absolute -translate-x-1/2 whitespace-nowrap leading-none ${className}`}
      style={{
        left: u(x),
        top: u(y - LABEL_TOP - size * 0.8),
        fontSize: u(size),
        letterSpacing: u(spacing),
      }}
    >
      {children}
    </span>
  );
}

/** one full turn of label artwork: front design, sides, and a back panel,
 *  positioned around u = 0 (the front centre) */
function LabelTile({ product }: { product: Product }) {
  const [line1, line2] = product.label;
  const longest = Math.max(line1.length, line2?.length ?? 0);
  const nameSize = longest > 8 ? 25 : 30;
  const back = STRIP / 2;
  return (
    <div className="font-pantry-serif" style={{ color: product.ink }}>
      {/* front artwork, clipped above the band */}
      <svg
        viewBox="22 104 156 64"
        className="absolute top-0"
        style={{ left: u(-78), width: u(156), height: u(64) }}
      >
        <Pattern type={product.pattern} color={product.accent} />
      </svg>
      <T y={128} size={13} spacing={2} className="opacity-90">
        {brand.name.toUpperCase()}
      </T>
      <T y={line2 ? 164 : 196} size={nameSize} className="font-medium">
        {line1}
      </T>
      {line2 && (
        <T y={194} size={nameSize} className="font-medium">
          {line2}
        </T>
      )}
      <T y={213} size={11} className="italic opacity-85">
        {product.sub}
      </T>

      {/* side marks */}
      <T x={-STRIP / 4} y={150} size={10}>
        &#9670;
      </T>
      <T x={STRIP / 4} y={150} size={10}>
        &#9670;
      </T>

      {/* back panel */}
      <T x={back} y={124} size={9} spacing={1.5}>
        {brand.name.toUpperCase()} {brand.suffix.toUpperCase()}
      </T>
      <T x={back} y={138} size={6.5} className="font-pantry-sans opacity-85">
        Ingredients: {product.name.toLowerCase()},
      </T>
      <T x={back} y={147} size={6.5} className="font-pantry-sans opacity-85">
        cane sugar, lemon juice. Made by hand
      </T>
      <T x={back} y={156} size={6.5} className="font-pantry-sans opacity-85">
        in small batches. Refrigerate once open.
      </T>
      {BARCODE.map(([x, w]) => (
        <span
          key={x}
          className="absolute"
          style={{
            left: u(back + x - 28),
            top: u(176 - LABEL_TOP),
            width: u(w),
            height: u(22),
            backgroundColor: product.ink,
          }}
        />
      ))}
      <T x={back} y={212} size={8} className="font-pantry-sans">
        190g &middot; Bangalow NSW &middot; Australia
      </T>
    </div>
  );
}

/** the unrolled label: paper and band once, artwork tiled twice so the spin
 *  can loop seamlessly. Its left edge sits at u = -STRIP/2. */
function LabelStrip({ product }: { product: Product }) {
  return (
    <div
      className="absolute inset-y-0"
      style={{
        left: u(-STRIP / 2),
        width: u(STRIP * 2),
        backgroundColor: product.labelBg,
      }}
    >
      <div
        className="absolute inset-x-0"
        style={{
          top: u(168 - LABEL_TOP),
          height: u(54),
          backgroundColor: product.band,
        }}
      />
      {[0, STRIP].map((off) => (
        <div
          key={off}
          className="absolute inset-y-0 w-0"
          style={{ left: u(STRIP / 2 + off) }}
        >
          <LabelTile product={product} />
        </div>
      ))}
    </div>
  );
}

// [x, width] bars of a decorative barcode, 56 units wide
const BARCODE: [number, number][] = [
  [0, 2],
  [4, 1],
  [7, 3],
  [12, 1],
  [15, 2],
  [19, 1],
  [22, 4],
  [28, 1],
  [31, 2],
  [35, 1],
  [38, 3],
  [43, 1],
  [46, 2],
  [50, 1],
  [53, 3],
];

/**
 * A stylised glass jar with a printed label — SVG glass and cap around an HTML
 * label, so the template ships without product photography. Swap for real packshots when a client has them.
 */
export function Jar({
  product,
  className = "",
  flat = false,
}: {
  product: Product;
  className?: string;
  /** cheap static label (no cylinder slices, no spin) — for blurred copies */
  flat?: boolean;
}) {
  const uid = useId();
  const lidSide = `${uid}-lid-side`;
  const lidTop = `${uid}-lid-top`;
  const glass = `${uid}-glass`;
  const cylinder = `${uid}-cylinder`;

  return (
    <div
      className={`pantry-jar relative aspect-[200/270] [container-type:inline-size] ${className}`}
      role="img"
      aria-label={`${product.name} jar`}
    >
      {/* back layer: glass and contents */}
      <svg
        viewBox="0 0 200 270"
        aria-hidden="true"
        className="absolute inset-0 size-full overflow-visible"
      >
        <defs>
          {/* brushed-metal skirt: sharp highlight bands like a twist-off cap */}
          <linearGradient id={lidSide} x1="0" x2="1">
            <stop offset="0" stopColor="#5d6168" />
            <stop offset="0.07" stopColor="#a9aeb5" />
            <stop offset="0.2" stopColor="#eef0f2" />
            <stop offset="0.28" stopColor="#ffffff" />
            <stop offset="0.4" stopColor="#c6cad0" />
            <stop offset="0.58" stopColor="#8e939a" />
            <stop offset="0.74" stopColor="#dfe2e6" />
            <stop offset="0.86" stopColor="#b3b8be" />
            <stop offset="1" stopColor="#575b62" />
          </linearGradient>
          <linearGradient id={lidTop} x1="0" x2="0.35" y1="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#dde0e4" />
            <stop offset="1" stopColor="#a7acb3" />
          </linearGradient>
          <linearGradient id={glass} x1="0" x2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0.3" />
            <stop offset="0.2" stopColor="#fff" stopOpacity="0.12" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.85" stopColor="#000" stopOpacity="0.12" />
            <stop offset="1" stopColor="#000" stopOpacity="0.32" />
          </linearGradient>
          <linearGradient id={cylinder} x1="0" x2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0.38" />
            <stop offset="0.16" stopColor="#000" stopOpacity="0.08" />
            <stop offset="0.3" stopColor="#fff" stopOpacity="0.14" />
            <stop offset="0.42" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.8" stopColor="#000" stopOpacity="0.06" />
            <stop offset="1" stopColor="#000" stopOpacity="0.42" />
          </linearGradient>
        </defs>

        {/* clear glass jar: neck, shoulders, straight body, rounded heel */}
        <path d={JAR_OUTLINE} fill="#eef6f7" fillOpacity="0.35" />
        {/* contents, inset by the glass wall, with headspace and a meniscus */}
        <path d={CONTENTS} fill={product.fill} />
        <path d={CONTENTS} fill={`url(#${glass})`} />
        <path
          d="M29 91 Q30 87.5 34 87.5 Q100 91.5 166 87.5 Q170 87.5 171 91 Q100 96 29 91 Z"
          fill="#fff"
          opacity="0.22"
        />
        {/* fruit pieces pressed against the glass */}
        <g fill="#000" opacity="0.16">
          <ellipse cx="46" cy="96" rx="7" ry="4" />
          <ellipse cx="112" cy="99" rx="9" ry="4" />
          <ellipse cx="150" cy="95" rx="5" ry="3" />
          <ellipse cx="58" cy="236" rx="8" ry="5" />
          <ellipse cx="128" cy="242" rx="10" ry="5" />
          <ellipse cx="160" cy="230" rx="5" ry="4" />
        </g>
        <g fill="#fff" opacity="0.2">
          <circle cx="76" cy="97" r="3" />
          <circle cx="136" cy="100" r="2.5" />
          <circle cx="92" cy="232" r="3.5" />
          <circle cx="40" cy="244" r="2.5" />
        </g>
        {/* thick glass base */}
        <path
          d="M30 244 Q100 252 170 244 Q170 254 158 255 H42 Q30 254 30 244 Z"
          fill="#fff"
          opacity="0.28"
        />
      </svg>

      {/* label: a full wrap-around strip, projected onto the cylinder in
          vertical slices; hovering the jar spins it around the glass */}
      <div
        aria-hidden="true"
        className="absolute overflow-hidden"
        style={{
          left: u(22),
          top: u(LABEL_TOP),
          width: u(156),
          height: u(LABEL_H),
        }}
      >
        {(flat ? FLAT_SLICE : SLICES).map((sl) => (
          <div
            key={sl.x}
            className="absolute inset-y-0 overflow-hidden"
            style={{ left: u(sl.x - 22), width: u(sl.w) }}
          >
            <div
              className="absolute inset-y-0 left-0 origin-left"
              style={{
                transform: `translateX(${u(sl.tx)}) scaleX(${+sl.c.toFixed(4)})`,
              }}
            >
              <div
                className={`absolute inset-y-0 left-0 ${flat ? "" : "pantry-label-strip"}`}
              >
                <LabelStrip product={product} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* front layer: shading, glass wall, highlights, cap */}
      <svg
        viewBox="0 0 200 270"
        aria-hidden="true"
        className="absolute inset-0 size-full overflow-visible"
      >
        {/* cylinder shading so the label reads as wrapped, not flat */}
        <rect
          x="22"
          y={LABEL_TOP}
          width="156"
          height={LABEL_H}
          fill={`url(#${cylinder})`}
        />

        {/* glass wall: bright rim, dark refraction line, reflections */}
        <path
          d={JAR_OUTLINE}
          fill="none"
          stroke="#fff"
          strokeOpacity="0.7"
          strokeWidth="3"
        />
        <path
          d={JAR_OUTLINE}
          fill="none"
          stroke="#1d2a2e"
          strokeOpacity="0.28"
          strokeWidth="0.8"
        />
        <rect
          x="30"
          y="90"
          width="7"
          height="150"
          rx="3.5"
          fill="#fff"
          opacity="0.5"
        />
        <rect
          x="40"
          y="96"
          width="2"
          height="136"
          rx="1"
          fill="#fff"
          opacity="0.35"
        />
        <rect
          x="161"
          y="94"
          width="4"
          height="140"
          rx="2"
          fill="#fff"
          opacity="0.28"
        />
        <path
          d="M30 80 Q36 73 56 72"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.7"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M170 80 Q164 73 144 72"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* metal twist-off cap, sized to the neck and seated on the shoulder */}
        {/* soft contact shadow the cap casts on the glass */}
        <path
          d="M30 63 Q100 76 170 63 V70 Q100 83 30 70 Z"
          fill="#000"
          opacity="0.2"
        />
        {/* skirt, its lower edge curving with the perspective */}
        <path d="M28 30 V62 Q100 75 172 62 V30 Z" fill={`url(#${lidSide})`} />
        {/* pressed bead around the skirt */}
        <path
          d="M28 40 Q100 51 172 40"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.55"
          strokeWidth="1.2"
        />
        <path
          d="M28 42.5 Q100 53.5 172 42.5"
          fill="none"
          stroke="#3f434a"
          strokeOpacity="0.25"
          strokeWidth="1.2"
        />
        {/* lugs pressed into the bottom of the skirt */}
        <g fill="#2f3238" opacity="0.18">
          <rect x="44" y="59" width="10" height="4" rx="2" />
          <rect x="95" y="64" width="10" height="4" rx="2" />
          <rect x="146" y="59" width="10" height="4" rx="2" />
        </g>
        {/* rolled bottom edge */}
        <path
          d="M28 62 Q100 75 172 62"
          fill="none"
          stroke="#6f747b"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M32 61 Q100 73 168 61"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.6"
          strokeWidth="1"
        />
        {/* top face with embossed ring and safety button */}
        <ellipse
          cx="100"
          cy="30"
          rx="72"
          ry="10"
          fill={`url(#${lidTop})`}
          stroke="#8a8f96"
          strokeWidth="1"
        />
        <ellipse
          cx="100"
          cy="30.8"
          rx="59"
          ry="7.4"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.8"
          strokeWidth="1.2"
        />
        <ellipse
          cx="100"
          cy="30"
          rx="59"
          ry="7.4"
          fill="none"
          stroke="#6f747b"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        <ellipse cx="100" cy="30" rx="18" ry="2.6" fill="#000" opacity="0.07" />
        <ellipse
          cx="100"
          cy="29.4"
          rx="18"
          ry="2.6"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.7"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}
