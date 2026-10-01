import { DM_Sans, Fraunces } from "next/font/google";

const serif = Fraunces({
  variable: "--font-pantry-serif-face",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  display: "swap",
});

const sans = DM_Sans({
  variable: "--font-pantry-sans-face",
  subsets: ["latin"],
  display: "swap",
});

/** class names that define the Pantry font variables on a wrapper */
export const pantryFonts = `${serif.variable} ${sans.variable}`;
