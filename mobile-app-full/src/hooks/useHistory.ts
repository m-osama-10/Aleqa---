/* ================================================================== */
/*  useHistory — calculation history with offline cache                */
/* ================================================================== */

import { useCallback, useEffect, useState } from "react";
import { fetchHistory, createHistory, deleteHistory, clearHistory } from "../api/history";
import { cacheHistory, loadCachedHistory } from "../services/storage";
import { useSyncStore } from "../store/syncStore";
import { useNetworkStatus } from "./useNetworkStatus";
import type { HistoryEntry } from "../types/db";
import type { AnimalKey, FormulationResult } from "../api/feedData";

export interface AddHistoryInput {
  animalKey: AnimalKey;
  animalName: string;
  weight: number;
  production: number;
  flockSize: number;
  mode: "balanced" | "economy";
  prices: Record<string, number>;
  result: FormulationResult;
  durationMs?: number;
}

export function useHistory(userId: string | null | undefined) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const sync = useSyncStore();
  const { online } = useNetworkStatus();

  const refresh = useCallback(async () => {
    if (!userId) {
      setHistory([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const cached = await loadCachedHistory();
    if (cached) setHistory(cached);
    try {
      const rows = await fetchHistory(userId, 50);
      setHistory(rows);
      await cacheHistory(rows);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "history fetch failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (online) void sync.sync().then(() => void refresh());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online]);

  const add = useCallback(
    async (entry: AddHistoryInput): Promise<HistoryEntry | null> => {
      if (!userId) return null;
      const payload = {
        user_id: userId,
        calculator_id: null,
        animal_key: entry.animalKey,
        name: `${entry.animalName} · ${entry.mode}`,
        payload: {
          animalName: entry.animalName,
          weight: entry.weight,
          production: entry.production,
          flockSize: entry.flockSize,
          mode: entry.mode,
          prices: entry.prices,
          result: entry.result,
        } as Record<string, unknown>,
        duration_ms: entry.durationMs ?? null,
      };
      if (online) {
        try {
          const created = await createHistory(payload);
          const next = [created, ...history].slice(0, 200);
          setHistory(next);
          await cacheHistory(next);
          return created;
        } catch {
          await sync.enqueue({ kind: "history.create", payload: payload as unknown as Record<string, unknown> });
          return null;
        }
      } else {
        await sync.enqueue({ kind: "history.create", payload: payload as unknown as Record<string, unknown> });
        return null;
      }
    },
    [userId, online, history, sync]
  );

  const remove = useCallback(
    async (id: string): Promise<void> => {
      const next = history.filter((h) => h.id !== id);
      setHistory(next);
      await cacheHistory(next);
      if (online && !id.startsWith("local_")) {
        try {
          await deleteHistory(id);
        } catch {
          await sync.enqueue({ kind: "history.delete", payload: { id } });
        }
      }
    },
    [history, online, sync]
  );

  const clearAll = useCallback(async (): Promise<void> => {
    if (!userId) return;
    const next: HistoryEntry[] = [];
    setHistory(next);
    await cacheHistory(next);
    if (online) {
      try {
        await clearHistory(userId);
      } catch {
        /* swallow */
      }
    }
  }, [userId, online]);

  return { history, loading, error, refresh, add, remove, clearAll };
}
