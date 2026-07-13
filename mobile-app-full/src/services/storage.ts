/* ================================================================== */
/*  Storage service — AsyncStorage wrapper for offline cache           */
/*  Mirrors the web app's localStorage-backed storage module.          */
/* ================================================================== */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS, DEFAULT_PRICES, MAX_PRICE_PROFILES } from "../utils/constants";
import { INGREDIENT_ORDER, INGREDIENTS } from "../api/feedData";
import type { IngredientKey, PriceMap, FormulationResult, FormulationMode, AnimalKey } from "../api/feedData";
import type {
  Calculator,
  CalculatorCategory,
  Favorite,
  HistoryEntry,
  Ad,
  AppNotification,
  SettingsMap,
} from "../types/db";
import { genId } from "../utils/helpers";

/* ----------------------------------------------------------------- */
/*  Low-level helpers                                                 */
/* ----------------------------------------------------------------- */

export async function readJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJSON(key: string, value: unknown): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export async function removeKey(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export async function clearAll(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch {
    /* ignore */
  }
}

/** Compute total bytes used by our namespace keys (best-effort). */
export async function getCacheSize(): Promise<number> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const ours = keys.filter((k) => String(k).startsWith("@alieqa/"));
    const vals = await AsyncStorage.multiGet(ours);
    return vals.reduce((sum, [_, v]) => sum + (v ? v.length : 0), 0);
  } catch {
    return 0;
  }
}

/* ----------------------------------------------------------------- */
/*  Price profiles (multi-set)                                        */
/* ----------------------------------------------------------------- */

export interface PriceProfile {
  id: string;
  name: string;
  nameEn: string;
  prices: PriceMap;
}

export function defaultPrices(): PriceMap {
  return { ...DEFAULT_PRICES };
}

function normalizeProfiles(raw: PriceProfile[]): PriceProfile[] {
  return raw.map((p) => ({
    id: p.id || genId(),
    name: p.name || "افتراضي",
    nameEn: p.nameEn || "Default",
    prices: { ...defaultPrices(), ...(p.prices || {}) },
  }));
}

export async function getPriceProfiles(): Promise<PriceProfile[]> {
  const raw = await readJSON<PriceProfile[]>(STORAGE_KEYS.priceProfiles, []);
  if (!raw || raw.length === 0) {
    const seeded: PriceProfile[] = [
      {
        id: "default",
        name: "افتراضي",
        nameEn: "Default",
        prices: defaultPrices(),
      },
    ];
    await writeJSON(STORAGE_KEYS.priceProfiles, seeded);
    await writeJSON(STORAGE_KEYS.activeProfile, "default");
    return seeded;
  }
  return normalizeProfiles(raw);
}

export async function getActiveProfileId(): Promise<string> {
  const profiles = await getPriceProfiles();
  const stored = await AsyncStorage.getItem(STORAGE_KEYS.activeProfile);
  if (stored && profiles.some((p) => p.id === stored)) return stored;
  return profiles[0]?.id ?? "default";
}

export async function getActiveProfile(): Promise<PriceProfile> {
  const profiles = await getPriceProfiles();
  const id = await getActiveProfileId();
  return profiles.find((p) => p.id === id) ?? profiles[0];
}

export async function getActivePrices(): Promise<PriceMap> {
  return (await getActiveProfile()).prices;
}

export async function setActiveProfile(id: string): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.activeProfile, id);
}

export async function updatePrice(
  ingredient: IngredientKey,
  value: number
): Promise<PriceMap> {
  const id = await getActiveProfileId();
  const profiles = await getPriceProfiles();
  const next = profiles.map((p) =>
    p.id === id ? { ...p, prices: { ...p.prices, [ingredient]: value } } : p
  );
  await writeJSON(STORAGE_KEYS.priceProfiles, next);
  await stampPricesUpdatedAt();
  const active = next.find((p) => p.id === id) ?? next[0];
  return active.prices;
}

export async function resetActivePrices(): Promise<PriceMap> {
  const id = await getActiveProfileId();
  const profiles = await getPriceProfiles();
  const def = defaultPrices();
  const next = profiles.map((p) =>
    p.id === id ? { ...p, prices: def } : p
  );
  await writeJSON(STORAGE_KEYS.priceProfiles, next);
  await AsyncStorage.removeItem(STORAGE_KEYS.pricesUpdatedAt);
  return def;
}

export async function addPriceProfile(
  name: string,
  nameEn: string
): Promise<PriceProfile | null> {
  const current = await getPriceProfiles();
  if (current.length >= MAX_PRICE_PROFILES) return null;
  const newProfile: PriceProfile = {
    id: genId(),
    name: name.trim() || "ملف",
    nameEn: nameEn.trim() || "Profile",
    prices: defaultPrices(),
  };
  const next = [...current, newProfile];
  await writeJSON(STORAGE_KEYS.priceProfiles, next);
  await setActiveProfile(newProfile.id);
  await AsyncStorage.removeItem(STORAGE_KEYS.pricesUpdatedAt);
  return newProfile;
}

export async function deletePriceProfile(id: string): Promise<boolean> {
  const current = await getPriceProfiles();
  if (current.length <= 1) return false;
  const next = current.filter((p) => p.id !== id);
  await writeJSON(STORAGE_KEYS.priceProfiles, next);
  if (id === (await getActiveProfileId())) {
    await setActiveProfile(next[0].id);
  }
  return true;
}

export async function getPricesUpdatedAt(): Promise<string | null> {
  return AsyncStorage.getItem(STORAGE_KEYS.pricesUpdatedAt);
}

async function stampPricesUpdatedAt(): Promise<void> {
  const now = new Date().toLocaleString("ar-EG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  await AsyncStorage.setItem(STORAGE_KEYS.pricesUpdatedAt, now);
}

/* ----------------------------------------------------------------- */
/*  Saved rations (legacy offline cache; mirrored to favorites)       */
/* ----------------------------------------------------------------- */

export interface SavedRation {
  id: string;
  name: string;
  createdAt: string;
  animalKey: AnimalKey;
  animalName: string;
  weight: number;
  production: number;
  flockSize: number;
  mode: FormulationMode;
  prices: PriceMap;
  result: FormulationResult;
}

const RATIONS_KEY = STORAGE_KEYS.rations;

export async function getSavedRations(): Promise<SavedRation[]> {
  return readJSON<SavedRation[]>(RATIONS_KEY, []);
}

export async function saveRation(
  ration: Omit<SavedRation, "id" | "createdAt">
): Promise<SavedRation | null> {
  const current = await getSavedRations();
  const full: SavedRation = {
    ...ration,
    id: genId(),
    createdAt: new Date().toISOString(),
  };
  const next = [full, ...current].slice(0, 50);
  const ok = await writeJSON(RATIONS_KEY, next);
  if (!ok) return null;
  return full;
}

export async function deleteSavedRation(id: string): Promise<void> {
  const next = (await getSavedRations()).filter((r) => r.id !== id);
  await writeJSON(RATIONS_KEY, next);
}

/* ----------------------------------------------------------------- */
/*  Generic cache helpers (calculators, categories, ads, etc.)        */
/* ----------------------------------------------------------------- */

export async function cacheCalculators(rows: Calculator[]): Promise<void> {
  await writeJSON(STORAGE_KEYS.cacheCalculators, { rows, at: Date.now() });
}

export async function loadCachedCalculators(): Promise<Calculator[] | null> {
  const v = await readJSON<{ rows: Calculator[]; at: number } | null>(
    STORAGE_KEYS.cacheCalculators,
    null
  );
  return v?.rows ?? null;
}

export async function cacheCategories(rows: CalculatorCategory[]): Promise<void> {
  await writeJSON(STORAGE_KEYS.cacheCategories, { rows, at: Date.now() });
}

export async function loadCachedCategories(): Promise<CalculatorCategory[] | null> {
  const v = await readJSON<{ rows: CalculatorCategory[]; at: number } | null>(
    STORAGE_KEYS.cacheCategories,
    null
  );
  return v?.rows ?? null;
}

export async function cacheFavorites(rows: Favorite[]): Promise<void> {
  await writeJSON(STORAGE_KEYS.cacheFavorites, { rows, at: Date.now() });
}

export async function loadCachedFavorites(): Promise<Favorite[] | null> {
  const v = await readJSON<{ rows: Favorite[]; at: number } | null>(
    STORAGE_KEYS.cacheFavorites,
    null
  );
  return v?.rows ?? null;
}

export async function cacheHistory(rows: HistoryEntry[]): Promise<void> {
  await writeJSON(STORAGE_KEYS.cacheHistory, { rows, at: Date.now() });
}

export async function loadCachedHistory(): Promise<HistoryEntry[] | null> {
  const v = await readJSON<{ rows: HistoryEntry[]; at: number } | null>(
    STORAGE_KEYS.cacheHistory,
    null
  );
  return v?.rows ?? null;
}

export async function cacheAds(rows: Ad[]): Promise<void> {
  await writeJSON(STORAGE_KEYS.cacheAds, { rows, at: Date.now() });
}

export async function loadCachedAds(): Promise<Ad[] | null> {
  const v = await readJSON<{ rows: Ad[]; at: number } | null>(
    STORAGE_KEYS.cacheAds,
    null
  );
  return v?.rows ?? null;
}

export async function cacheSettings(map: SettingsMap): Promise<void> {
  await writeJSON(STORAGE_KEYS.cacheSettings, { map, at: Date.now() });
}

export async function loadCachedSettings(): Promise<SettingsMap | null> {
  const v = await readJSON<{ map: SettingsMap; at: number } | null>(
    STORAGE_KEYS.cacheSettings,
    null
  );
  return v?.map ?? null;
}

export async function cacheNotifications(rows: AppNotification[]): Promise<void> {
  await writeJSON(STORAGE_KEYS.cacheNotifications, { rows, at: Date.now() });
}

export async function loadCachedNotifications(): Promise<AppNotification[] | null> {
  const v = await readJSON<{ rows: AppNotification[]; at: number } | null>(
    STORAGE_KEYS.cacheNotifications,
    null
  );
  return v?.rows ?? null;
}

/** Wipe only the cache keys (keeps auth + prices + rations). */
export async function clearCache(): Promise<void> {
  const keys = [
    STORAGE_KEYS.cacheCalculators,
    STORAGE_KEYS.cacheCategories,
    STORAGE_KEYS.cacheFavorites,
    STORAGE_KEYS.cacheHistory,
    STORAGE_KEYS.cacheAds,
    STORAGE_KEYS.cacheSettings,
    STORAGE_KEYS.cacheNotifications,
  ];
  await Promise.all(keys.map(removeKey));
}

/** Re-export INGREDIENT_ORDER for convenience. */
export { INGREDIENT_ORDER, INGREDIENTS };
