// Site configuration
export const config = {
  site: {
    name: import.meta.env.VITE_SITE_NAME || "Otter Cleaning",
    url: import.meta.env.VITE_SITE_URL || "https://ottercleaning.com",
    description: "Professional house cleaning services in NYC, Long Island & New Jersey",
  },
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || "hello@ottercleaning.com",
    phone: import.meta.env.VITE_CONTACT_PHONE || "(929) 274-1177",
    commercialEmail: import.meta.env.VITE_COMMERCIAL_EMAIL || "hello@ottercleaning.com",
  },
  social: {
    twitter: import.meta.env.VITE_TWITTER_HANDLE || "@OtterCleaning",
    facebook: import.meta.env.VITE_FACEBOOK_URL || "https://facebook.com/OtterCleaning",
    instagram: import.meta.env.VITE_INSTAGRAM_URL || "https://instagram.com/OtterCleaning",
  },
  api: {
    url: import.meta.env.VITE_API_URL || "",
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  },
  features: {
    booking: import.meta.env.VITE_ENABLE_BOOKING !== "false",
    commercial: import.meta.env.VITE_ENABLE_COMMERCIAL !== "false",
    promoCodes: import.meta.env.VITE_ENABLE_PROMO_CODES !== "false",
  },
  isDev: import.meta.env.DEV || import.meta.env.VITE_DEV_MODE === "true",
  isProd: import.meta.env.PROD,
} as const;

// Service tiers configuration
export const serviceTiers = {
  standard: {
    id: "standard",
    name: "Standard",
    price: 92,
    duration: "~2 hours",
    description: "Core maintenance cleaning for regular upkeep",
  },
  standardPlus: {
    id: "standard-plus",
    name: "Standard Plus",
    price: 140,
    duration: "~3 hours",
    description: "Enhanced cleaning with attention to detail",
  },
  deep: {
    id: "deep",
    name: "Deep Clean",
    price: 318,
    duration: "~5 hours",
    description: "Comprehensive cleaning for a full reset",
  },
  move: {
    id: "move",
    name: "Move In/Out",
    price: 318,
    duration: "~5+ hours",
    description: "Complete turnover cleaning, inspection-ready",
  },
} as const;

// Frequency discounts
export const frequencyDiscounts = {
  "one-time": 0,
  weekly: 10,
  "bi-weekly": 7,
  monthly: 5,
} as const;

// Promo codes
export const promoCodes: Record<string, { type: "percentage" | "fixed"; value: number }> = {
  OTTER10: { type: "percentage", value: 10 },
  FIRST20: { type: "fixed", value: 20 },
};

// Service areas
export const serviceAreas = [
  "New York City (All 5 Boroughs)",
  "Long Island",
  "New Jersey",
] as const;
