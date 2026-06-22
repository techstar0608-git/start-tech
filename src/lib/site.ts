/**
 * Central site configuration — single source of truth for SEO + content.
 */
export const site = {
  name: "S.T.A.R",
  legalName: "S.T.A.R Marketing & Technology",
  url: "https://starmartech.com",
  title: "S.T.A.R — Full-stack marketing for small & mid-sized shops",
  description:
    "S.T.A.R helps small and mid-sized shops in Australia grow with branding, websites, ads, scripts and automation — all in one team. Your marketing team, without the hiring.",
  email: "contact@starmartech.com",
  locale: "en_AU",
  keywords: [
    "marketing agency Australia",
    "small business marketing",
    "branding for shops",
    "website design for small business",
    "marketing automation",
    "Google ads management",
    "local business marketing",
    "spa and salon marketing",
    "restaurant marketing",
    "S.T.A.R marketing",
  ],
} as const;

// Primary navigation. HOME is this landing page; the other routes are
// dedicated pages built in a later phase.
export const nav = [
  { label: "Home", href: "/" },
  { label: "Services & Pricing", href: "/services-pricing" },
  { label: "About us", href: "/about" },
  { label: "Case studies", href: "/case-studies" },
] as const;
