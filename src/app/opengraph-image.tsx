import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(120% 80% at 50% 0%, #14266b 0%, #060b1c 60%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            letterSpacing: 8,
            fontSize: 30,
            fontWeight: 700,
            color: "#35c6f4",
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              background: "linear-gradient(135deg, #5ad6ff, #2f6bff)",
            }}
          />
          S.T.A.R
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 82,
            fontWeight: 800,
            lineHeight: 1.05,
            backgroundImage: "linear-gradient(90deg, #35c6f4, #9b6bff)",
            backgroundClip: "text",
            color: "transparent",
            maxWidth: 900,
          }}
        >
          Full-stack marketing for small &amp; mid-sized shops
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            color: "#aab4d4",
            maxWidth: 820,
          }}
        >
          Your marketing team, without the hiring.
        </div>
      </div>
    ),
    size,
  );
}
