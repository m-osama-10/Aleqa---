/* ================================================================== */
/*  useSettings — public app settings with cache                       */
/* ================================================================== */

import { useCallback, useEffect, useState } from "react";
import { fetchPublicSettings } from "../api/settings";
import { cacheSettings, loadCachedSettings } from "../services/storage";
import { useNetworkStatus } from "./useNetworkStatus";
import type { SettingsMap } from "../types/db";

export function useSettings() {
  const [settings, setSettings] = useState<SettingsMap>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { online } = useNetworkStatus();

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const cached = await loadCachedSettings();
    if (cached) setSettings(cached);
    try {
      const map = await fetchPublicSettings();
      setSettings(map);
      await cacheSettings(map);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "settings fetch failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (online) void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online]);

  return { settings, loading, error, refresh };
}
