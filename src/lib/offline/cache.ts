"use client";

/**
 * Offline cache layer — localStorage-backed with TTL + network-first
 * read-through strategy. All Supabase reads funnel through here so the
 * app keeps working offline and syncs when back online.
 */

const PREFIX = "alieqa.cache.";
const DEFAULT_TTL = 1000 * 60 * 60 * 24; // 24h

interface CacheEntry<T> {
  data: T;
  at: number;
  ttl: number;
}

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function cacheGet<T>(key: string, fallback: T | null = null): T | null {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return fallback;
    const entry = JSON.parse(raw) as CacheEntry<T>;
    if (Date.now() - entry.at > entry.ttl) {
      // expired — still return stale data as fallback for offline, but mark stale
      return entry.data;
    }
    return entry.data;
  } catch {
    return fallback;
  }
}

export function cacheSet<T>(key: string, data: T, ttl = DEFAULT_TTL) {
  if (!isBrowser()) return;
  try {
    const entry: CacheEntry<T> = { data, at: Date.now(), ttl };
    localStorage.setItem(PREFIX + key, JSON.stringify(entry));
  } catch {
    /* quota — ignore */
  }
}

export function cacheClear(key?: string) {
  if (!isBrowser()) return;
  if (key) {
    localStorage.removeItem(PREFIX + key);
    return;
  }
  Object.keys(localStorage)
    .filter((k) => k.startsWith(PREFIX))
    .forEach((k) => localStorage.removeItem(k));
}

/* ---------- Pending writes queue (for offline sync) ---------- */

const PENDING_KEY = "alieqa.pending";

export interface PendingOp {
  id: string;
  table: string;
  op: "insert" | "update" | "delete";
  payload: Record<string, unknown>;
  createdAt: number;
  retries: number;
}

export function getPendingOps(): PendingOp[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    return raw ? (JSON.parse(raw) as PendingOp[]) : [];
  } catch {
    return [];
  }
}

export function addPendingOp(op: Omit<PendingOp, "id" | "createdAt" | "retries">) {
  if (!isBrowser()) return;
  const ops = getPendingOps();
  ops.push({
    ...op,
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    createdAt: Date.now(),
    retries: 0,
  });
  localStorage.setItem(PENDING_KEY, JSON.stringify(ops));
}

export function removePendingOp(id: string) {
  if (!isBrowser()) return;
  const ops = getPendingOps().filter((o) => o.id !== id);
  localStorage.setItem(PENDING_KEY, JSON.stringify(ops));
}

export function clearPendingOps() {
  if (!isBrowser()) return;
  localStorage.removeItem(PENDING_KEY);
}
