/* ================================================================== */
/*  Helpers                                                            */
/* ================================================================== */

import { I18nManager, Platform } from "react-native";

/** Format a number with up to `digits` decimals and locale-aware separators. */
export function fmt(n: number, digits = 2, locale = "ar-EG"): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

/** Format currency (EGP). */
export function fmtEGP(n: number, locale = "ar-EG"): string {
  return `${fmt(n, 2, locale)} ${locale === "ar-EG" ? "ج.م" : "EGP"}`;
}

/** Format an ISO date as a human-readable date string. */
export function fmtDate(iso: string, locale = "ar-EG"): string {
  try {
    return new Date(iso).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

/** Format an ISO date with date + time. */
export function fmtDateTime(iso: string, locale = "ar-EG"): string {
  try {
    return new Date(iso).toLocaleString(locale, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

/** Relative-time formatter (e.g. "منذ ٥ دقائق"). */
export function fmtRelative(iso: string, locale = "ar-EG"): string {
  try {
    const diff = Date.now() - new Date(iso).getTime();
    const sec = Math.floor(diff / 1000);
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);
    const day = Math.floor(hr / 24);
    if (locale === "ar-EG") {
      if (sec < 60) return "الآن";
      if (min < 60) return `منذ ${min} دقيقة`;
      if (hr < 24) return `منذ ${hr} ساعة`;
      if (day < 30) return `منذ ${day} يوم`;
      return fmtDate(iso, locale);
    }
    if (sec < 60) return "now";
    if (min < 60) return `${min} min ago`;
    if (hr < 24) return `${hr} h ago`;
    if (day < 30) return `${day} d ago`;
    return fmtDate(iso, locale);
  } catch {
    return iso;
  }
}

/** Clamp a number to a range. */
export function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

/** Round to N decimals. */
export function round(n: number, digits = 2): number {
  const f = Math.pow(10, digits);
  return Math.round(n * f) / f;
}

/** Stable id generator (UUID if available, fallback to timestamp). */
export function genId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Sleep helper. */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Promise timeout wrapper. */
export async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  const t = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("timeout")), ms)
  );
  return Promise.race([p, t]) as Promise<T>;
}

/** RTL-aware padding/margin helper (flips horizontal values when RTL). */
export function rtlFlip(dir: "rtl" | "ltr", ltr: { start?: number; end?: number }) {
  if (dir === "ltr") {
    return { left: ltr.start ?? 0, right: ltr.end ?? 0 };
  }
  return { left: ltr.end ?? 0, right: ltr.start ?? 0 };
}

/** Current locale-aware text alignment. */
export function textAlign(dir: "rtl" | "ltr"): "right" | "left" {
  return dir === "rtl" ? "right" : "left";
}

/** Returns true when running on Android. */
export function isAndroid(): boolean {
  return Platform.OS === "android";
}

/** Returns true when running on iOS. */
export function isIOS(): boolean {
  return Platform.OS === "ios";
}

/** Check RTL via I18nManager (RN runtime). */
export function isRtl(): boolean {
  return I18nManager.isRTL;
}

/** Truncate a long string with an ellipsis. */
export function truncate(s: string, len: number): string {
  if (s.length <= len) return s;
  return s.slice(0, Math.max(0, len - 1)) + "…";
}

/** Pick the localized field from a bilingual object (e.g. { name, name_en }). */
export function pickLocalized<T extends Record<string, unknown>>(
  obj: T,
  field: string,
  lang: "ar" | "en"
): string {
  if (lang === "en") {
    return (obj[`${field}_en`] as string) || (obj[field] as string) || "";
  }
  return (obj[field] as string) || (obj[`${field}_en`] as string) || "";
}

/** Debounce a function (returns a cancelable wrapper). */
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  ms: number
): (...args: Args) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

/** Format ingredient color hex from the data table (already hex here). */
export function ingredientColor(key: string): string {
  const map: Record<string, string> = {
    corn: "#d9b54a",
    soybean: "#5a9a52",
    bran: "#c79a4a",
    hay: "#4d9a4a",
    straw: "#d2b96a",
    premix: "#4a73b5",
  };
  return map[key] ?? "#888";
}
