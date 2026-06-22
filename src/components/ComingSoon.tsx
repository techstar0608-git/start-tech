import Link from "next/link";
import { Navbar } from "./Navbar";
import { StarMark } from "./StarMark";

export function ComingSoon({ title }: { title: string }) {
  return (
    <>
      <Navbar />
      <main className="relative flex flex-1 flex-col items-center justify-center px-5 py-32 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(90% 60% at 50% 30%, rgba(31,91,255,0.25), transparent 70%)",
          }}
        />
        <StarMark className="h-16 w-16 animate-float" />
        <h1 className="mt-8 font-display text-4xl font-bold sm:text-5xl">
          <span className="text-gradient">{title}</span>
        </h1>
        <p className="mt-4 max-w-md text-muted">
          This page is coming soon. We&apos;re putting it together.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-cyan to-brand-purple px-7 py-3.5 text-sm font-semibold text-bg-deep transition-transform hover:scale-105"
        >
          ← Back home
        </Link>
      </main>
    </>
  );
}
