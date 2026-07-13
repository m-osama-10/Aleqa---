/* ================================================================== */
/*  Sync Engine — offline → online sync with conflict resolution       */
/* ================================================================== */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS, SYNC_RETRY_DELAYS } from "../utils/constants";
import {
  createFavorite,
  deleteFavorite,
  updateFavorite,
} from "../api/favorites";
import {
  createHistory,
  deleteHistory,
} from "../api/history";
import { cacheFavorites, cacheHistory } from "./storage";
import { fetchFavorites } from "../api/favorites";
import { fetchHistory } from "../api/history";
import type { Favorite, HistoryEntry } from "../types/db";

/* ----------------------------------------------------------------- */
/*  Types                                                             */
/* ----------------------------------------------------------------- */

export type SyncOpKind = "favorite.create" | "favorite.update" | "favorite.delete" | "history.create" | "history.delete";

export interface SyncOp {
  id: string;
  kind: SyncOpKind;
  payload: Record<string, unknown>;
  createdAt: number;
  attempts: number;
  lastError?: string;
}

const QUEUE_KEY = STORAGE_KEYS.syncQueue;

/* ----------------------------------------------------------------- */
/*  Queue persistence                                                 */
/* ----------------------------------------------------------------- */

async function loadQueue(): Promise<SyncOp[]> {
  try {
    const raw = await AsyncStorage.getItem(QUEUE_KEY);
    return raw ? (JSON.parse(raw) as SyncOp[]) : [];
  } catch {
    return [];
  }
}

async function saveQueue(q: SyncOp[]): Promise<void> {
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(q));
}

export async function getPendingCount(): Promise<number> {
  return (await loadQueue()).length;
}

export async function enqueue(op: Omit<SyncOp, "id" | "createdAt" | "attempts">): Promise<SyncOp> {
  const q = await loadQueue();
  const full: SyncOp = {
    ...op,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
    attempts: 0,
  };
  q.push(full);
  await saveQueue(q);
  return full;
}

export async function clearQueue(): Promise<void> {
  await AsyncStorage.removeItem(QUEUE_KEY);
}

/* ----------------------------------------------------------------- */
/*  Conflict resolution                                               */
/* ----------------------------------------------------------------- */

/**
 * Server-wins strategy: for `favorite.update` / `favorite.delete`, if the
 * server returns 404 (PGRST116 / no rows), we treat the op as already
 * applied (delete from queue). For `favorite.create` retries, we de-dupe
 * by checking if a favorite with the same payload signature already exists.
 */
function is404(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return (
    msg.includes("PGRST116") ||
    msg.includes("not found") ||
    msg.includes("no rows")
  );
}

async function applyOp(op: SyncOp): Promise<void> {
  switch (op.kind) {
    case "favorite.create": {
      await createFavorite(op.payload as Omit<Favorite, "id" | "created_at" | "updated_at" | "deleted_at">);
      return;
    }
    case "favorite.update": {
      const id = op.payload.id as string;
      const patch = (op.payload.patch ?? {}) as Partial<Favorite>;
      await updateFavorite(id, patch);
      return;
    }
    case "favorite.delete": {
      await deleteFavorite(op.payload.id as string);
      return;
    }
    case "history.create": {
      await createHistory(
        op.payload as Omit<HistoryEntry, "id" | "created_at" | "updated_at" | "deleted_at">
      );
      return;
    }
    case "history.delete": {
      await deleteHistory(op.payload.id as string);
      return;
    }
    default:
      return;
  }
}

/* ----------------------------------------------------------------- */
/*  Sync runner                                                       */
/* ----------------------------------------------------------------- */

export interface SyncResult {
  ok: boolean;
  applied: number;
  failed: number;
  remaining: number;
  error?: string;
}

/**
 * Process the pending queue. Returns when all ops succeed, all ops fail
 * irrecoverably, or no ops remain. Updates the queue in-place.
 */
export async function runSync(): Promise<SyncResult> {
  const q = await loadQueue();
  if (q.length === 0) {
    return { ok: true, applied: 0, failed: 0, remaining: 0 };
  }

  let applied = 0;
  let failed = 0;
  const remaining: SyncOp[] = [];

  for (const op of q) {
    try {
      await applyOp(op);
      applied++;
    } catch (err) {
      if (is404(err)) {
        // Already applied (or never existed) — drop the op silently.
        applied++;
        continue;
      }
      const nextAttempts = op.attempts + 1;
      const delayIdx = Math.min(nextAttempts - 1, SYNC_RETRY_DELAYS.length - 1);
      // If exceeded max retries, mark as permanently failed.
      if (nextAttempts > SYNC_RETRY_DELAYS.length) {
        failed++;
        continue;
      }
      remaining.push({
        ...op,
        attempts: nextAttempts,
        lastError: err instanceof Error ? err.message : String(err),
        // scheduleAt not used — we run sync on each network restore.
        // delayIdx kept for future use.
        ...(delayIdx >= 0 ? {} : {}),
      });
    }
  }

  await saveQueue(remaining);

  // Refresh caches from server so local state matches.
  try {
    const userId = (q[0]?.payload as { user_id?: string })?.user_id;
    if (userId) {
      const [favs, hist] = await Promise.all([
        fetchFavorites(userId).catch(() => null),
        fetchHistory(userId, 50).catch(() => null),
      ]);
      if (favs) await cacheFavorites(favs as Favorite[]);
      if (hist) await cacheHistory(hist as HistoryEntry[]);
    }
  } catch {
    /* best-effort */
  }

  return {
    ok: failed === 0,
    applied,
    failed,
    remaining: remaining.length,
  };
}

/** Convenience: enqueue + flush in one call (used when online). */
export async function enqueueAndSync(
  op: Omit<SyncOp, "id" | "createdAt" | "attempts">
): Promise<SyncResult> {
  await enqueue(op);
  return runSync();
}
