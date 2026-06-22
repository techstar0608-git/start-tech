const items = [
  "WEBSITES",
  "SCRIPTS",
  "AUTOMATION",
  "BRANDING",
  "ADS",
  "GROW",
];

// repeat the words enough times that a single track is wider than any
// viewport, so the −50% loop never shows a gap (even on wide desktops).
const trackItems = [...items, ...items, ...items, ...items];

function Track() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {trackItems.map((item, i) => (
        <span key={i} className="flex items-center gap-8">
          <span className="font-display text-2xl font-bold tracking-wide text-ink/90 sm:text-3xl">
            {item}
          </span>
          <span className="text-brand-purple">✦</span>
        </span>
      ))}
    </div>
  );
}

function Row({ reverse }: { reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden">
      <div
        className="flex w-max animate-marquee"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        <Track />
        <Track />
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <div className="select-none space-y-3 py-6" aria-hidden="true">
      {/* two lines scrolling in opposite directions (Figma) */}
      <Row />
      <Row reverse />
    </div>
  );
}
