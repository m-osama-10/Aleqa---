/* ================================================================== */
/*  useFavorites — favorites list + CRUD with offline queue            */
/* ================================================================== */

import { useCallback, useEffect, useState } from "react";
import { fetchFavorites, createFavorite, deleteFavorite } from "../api/favorites";
import { cacheFavorites, loadCachedFavorites } from "../services/storage";
import { useSyncStore } from "../store/syncStore";
import { useNetworkStatus } from "./useNetworkStatus";
import type { Favorite } from "../types/db";
import type { AnimalKey, FormulationResult, PriceMap } from "../api/feedData";

export interface SaveRationInput {
  animalKey: AnimalKey;
  animalName: string;
  weight: number;
  production: number;
  flockSize: number;
  mode: "balanced" | "economy";
  prices: PriceMap;
  result: FormulationResult;
  name?: string;
}

export function useFavorites(userId: string | null | undefined) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const sync = useSyncStore();
  const { online } = useNetworkStatus();

  const refresh = useCallback(async () => {
    if (!userId) {
      setFavorites([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    // 1) Show cached immediately.
    const cached = await loadCachedFavorites();
    if (cached) setFavorites(cached);
    // 2) Try to fetch fresh.
    try {
      const rows = await fetchFavorites(userId);
      setFavorites(rows);
      await cacheFavorites(rows);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "favorites fetch failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // Sync on reconnect.
  useEffect(() => {
    if (online) void sync.sync().then(() => void refresh());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online]);

  const save = useCallback(
    async (ration: SaveRationInput): Promise<Favorite | null> => {
      if (!userId) return null;
      const payload = {
        user_id: userId,
        calculator_id: null,
        animal_key: ration.animalKey,
        name: ration.name ?? `${ration.animalName} · ${ration.mode}`,
        payload: {
          weight: ration.weight,
          production: ration.production,
          flockSize: ration.flockSize,
          mode: ration.mode,
          prices: ration.prices,
          result: ration.result,
          animalName: ration.animalName,
          createdAt: new Date().toISOString(),
        },
      };
      // Optimistic local add.
      const tempFav: Favorite = {
        id: `local_${Date.now()}`,
        user_id: userId,
        calculator_id: null,
        animal_key: ration.animalKey,
        name: payload.name,
        payload: payload.payload as Record<string, unknown>,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      };
      setFavorites((prev) => [tempFav, ...prev]);
      await cacheFavorites([tempFav, ...favorites]);

      if (online) {
        try {
          const created = await createFavorite(payload);
          setFavorites((prev) =>
            prev.map((f) => (f.id === tempFav.id ? created : f))
          );
          await cacheFavorites([created, ...favorites.filter((f) => f.id !== tempFav.id)]);
          return created;
        } catch {
          await sync.enqueue({ kind: "favorite.create", payload: payload as unknown as Record<string, unknown> });
          return tempFav;
        }
      } else {
        await sync.enqueue({ kind: "favorite.create", payload: payload as unknown as Record<string, unknown> });
        return tempFav;
      }
    },
    [userId, online, favorites, sync]
  );

  const remove = useCallback(
    async (id: string): Promise<void> => {
      const prev = favorites;
      const next = prev.filter((f) => f.id !== id);
      setFavorites(next);
      await cacheFavorites(next);
      if (online && !id.startsWith("local_")) {
        try {
          await deleteFavorite(id);
        } catch {
          await sync.enqueue({ kind: "favorite.delete", payload: { id } });
        }
      }
    },
    [favorites, online, sync]
  );

  return { favorites, loading, error, refresh, save, remove };
}
