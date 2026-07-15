/* ================================================================== */
/*  useAds — fetch active ads with offline cache                       */
/* ================================================================== */

import { useCallback, useEffect, useState } from "react";
import { fetchActiveAds, fetchAdsByPlacement } from "../api/ads";
import { cacheAds, loadCachedAds } from "../services/storage";
import { useNetworkStatus } from "./useNetworkStatus";
import type { Ad, AdPlacement } from "../types/db";

export function useAds(placement?: AdPlacement) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { online } = useNetworkStatus();

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const cached = await loadCachedAds();
    if (cached) setAds(placement ? cached.filter((a) => a.placement === placement) : cached);
    try {
      const rows = placement ? await fetchAdsByPlacement(placement) : await fetchActiveAds();
      setAds(rows);
      await cacheAds(rows);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "ads fetch failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [placement]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (online) void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online]);

  return { ads, loading, error, refresh };
}
