import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site to `out/` for hosting on Cloudflare Pages.
  output: "export",
  // The static export has no image optimization server, so serve images as-is.
  images: { unoptimized: true },
  // Pin the workspace root to this project (a stray lockfile lives in $HOME).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
