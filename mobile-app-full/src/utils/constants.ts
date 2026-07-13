/* ================================================================== */
/*  Constants                                                          */
/* ================================================================== */

import { INGREDIENT_ORDER, INGREDIENTS } from "../api/feedData";
import type { IngredientKey } from "../api/feedData";

/** Supabase config — sourced from .env (EXPO_PUBLIC_*) or app.json extra. */
export const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL ??
  "https://lepdythxcdurjwncxnnt.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_nWluULZyJ-hU3f42jd0mbg_8iNXWxkp";

export const IS_SUPABASE_CONFIGURED = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);

/** App-wide colors (mirrors the web palette — oklch → hex fallback). */
export const COLORS = {
  brand: "#2E7D4F",
  brandDark: "#256e44",
  brandLight: "#4ea870",
  brandSoft: "#f0f7f2",
  brandBorder: "#b5d9c1",

  accent: "#D9A521",
  accentSoft: "#fdf6e3",
  accentBorder: "#e6c77a",

  danger: "#c0492f",
  dangerSoft: "#fdf3f0",
  dangerBorder: "#e6b8a8",

  bg: "#faf7ef",
  card: "#ffffff",
  border: "#e0e0e0",
  textPrimary: "#1a2b22",
  textSecondary: "#55666c",
  textMuted: "#888",

  // Ingredient accent colors (hex equivalents of the web oklch values).
  corn: "#d9b54a",
  soybean: "#5a9a52",
  bran: "#c79a4a",
  hay: "#4d9a4a",
  straw: "#d2b96a",
  premix: "#4a73b5",
} as const;

/** Storage keys — namespaced & versioned. */
export const STORAGE_KEYS = {
  lang: "@alieqa/lang.v1",
  authSession: "@alieqa/auth.session.v1",
  authGuest: "@alieqa/auth.guest.v1",
  prices: "@alieqa/prices.v1",
  priceProfiles: "@alieqa/priceProfiles.v1",
  activeProfile: "@alieqa/activeProfile.v1",
  pricesUpdatedAt: "@alieqa/prices.updated.v1",
  rations: "@alieqa/rations.v1", // legacy favorites cache
  cacheCalculators: "@alieqa/cache/calculators.v1",
  cacheCategories: "@alieqa/cache/categories.v1",
  cacheFavorites: "@alieqa/cache/favorites.v1",
  cacheHistory: "@alieqa/cache/history.v1",
  cacheAds: "@alieqa/cache/ads.v1",
  cacheSettings: "@alieqa/cache/settings.v1",
  cacheNotifications: "@alieqa/cache/notifications.v1",
  syncQueue: "@alieqa/sync/queue.v1",
  settings: "@alieqa/settings.v1",
  pushToken: "@alieqa/push/token.v1",
} as const;

export const MAX_PRICE_PROFILES = 3;
export const MAX_SAVED_RATIONS = 50;
export const MAX_HISTORY_ENTRIES = 200;

/** Default ingredient prices (EGP / kg as-fed). */
export const DEFAULT_PRICES: Record<IngredientKey, number> = INGREDIENT_ORDER.reduce(
  (acc, k) => {
    acc[k] = INGREDIENTS[k].defaultPrice;
    return acc;
  },
  {} as Record<IngredientKey, number>
);

export const APP_VERSION = "1.0.0";
export const APP_BUNDLE_ID = "app.alieqa";

/** Sync retry delays (ms) — exponential backoff. */
export const SYNC_RETRY_DELAYS = [5_000, 15_000, 60_000, 300_000];

/** HTTP timeout for Supabase requests (ms). */
export const REQUEST_TIMEOUT_MS = 15_000;

/** Notification channel id (Android). */
export const NOTIFICATION_CHANNEL_ID = "default";
