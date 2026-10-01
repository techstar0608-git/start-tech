"use client";

import createGlobe, { type Marker } from "cobe";
import { useEffect, useRef, useState } from "react";

// cities where S.T.A.R works — highlighted as glowing markers
const MARKERS: Marker[] = [
  { location: [-33.8688, 151.2093], size: 0.04 }, // Sydney
  { location: [-37.8136, 144.9631], size: 0.035 }, // Melbourne
  { location: [-27.4698, 153.0251], size: 0.03 }, // Brisbane
  { location: [-31.9505, 115.8605], size: 0.03 }, // Perth
  { location: [-34.9285, 138.6007], size: 0.025 }, // Adelaide
];

// cobe's phi/theta that put a [lat, lng] at the front of the globe
function anglesFor([lat, lng]: [number, number]): [number, number] {
  return [
    Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
    (lat * Math.PI) / 180,
  ];
}

const [START_PHI] = anglesFor([-26, 134]); // centred on Australia
const START_THETA = 0.15; // slight tilt from above, like the Figma globe
const AUTO_SPIN = 0.0025; // rad per frame when idle
const DRAG_SPEED = 0.006; // rad per pixel dragged
const FRICTION = 0.92; // how quickly a flick slows down
const MAX_THETA = 0.9;

export function Globe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let size = canvas.offsetWidth;
    let phi = START_PHI;
    let theta = START_THETA;
    let velPhi = 0;
    let velTheta = 0;
    let pointer: { id: number; x: number; y: number } | null = null;
    let visible = true;
    let frame = 0;
    let shown = false;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: size * dpr,
      height: size * dpr,
      phi,
      theta,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 20000,
      mapBrightness: 7,
      mapBaseBrightness: 0.02,
      baseColor: [0.22, 0.5, 1],
      markerColor: [0.36, 0.9, 1],
      glowColor: [0.12, 0.35, 0.95],
      markers: MARKERS,
      opacity: 0.95,
    });

    const render = () => {
      if (!pointer) {
        // coast with inertia after a flick, then fall back to the idle spin
        phi += velPhi + (reduceMotion ? 0 : AUTO_SPIN);
        theta += velTheta;
        velPhi *= FRICTION;
        velTheta *= FRICTION;
      }
      theta = Math.max(-MAX_THETA, Math.min(MAX_THETA, theta));
      globe.update({ phi, theta, width: size * dpr, height: size * dpr });
      if (!shown) {
        shown = true;
        setReady(true); // fade in once the first frame is drawn
      }
      frame = visible ? requestAnimationFrame(render) : 0;
    };
    frame = requestAnimationFrame(render);

    const onDown = (e: PointerEvent) => {
      pointer = { id: e.pointerId, x: e.clientX, y: e.clientY };
      velPhi = 0;
      velTheta = 0;
      canvas.setPointerCapture(e.pointerId);
      setDragging(true);
    };
    const onMove = (e: PointerEvent) => {
      if (!pointer || e.pointerId !== pointer.id) return;
      const dx = e.clientX - pointer.x;
      const dy = e.clientY - pointer.y;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      velPhi = dx * DRAG_SPEED;
      velTheta = dy * DRAG_SPEED;
      phi += velPhi;
      theta += velTheta;
    };
    const onUp = (e: PointerEvent) => {
      if (!pointer || e.pointerId !== pointer.id) return;
      pointer = null;
      setDragging(false);
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    const resize = new ResizeObserver(() => {
      size = canvas.offsetWidth;
    });
    resize.observe(canvas);

    // stop rendering while scrolled out of view
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(render);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      resize.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      globe.destroy();
    };
  }, []);

  return (
    <div className={`relative aspect-square ${className}`}>
      {/* soft halo behind the sphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[8%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(53,198,244,0.28), rgba(30,64,255,0.12) 55%, transparent 72%)",
        }}
      />
      <canvas
        ref={canvasRef}
        aria-label="Interactive 3D globe — drag to rotate"
        role="img"
        // pan-y keeps vertical page scroll working on touch; horizontal swipes spin the globe
        className={`relative h-full w-full touch-pan-y transition-opacity duration-1000 ${
          ready ? "opacity-100" : "opacity-0"
        } ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      />
    </div>
  );
}
