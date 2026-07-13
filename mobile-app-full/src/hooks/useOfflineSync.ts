/* ================================================================== */
/*  useOfflineSync — connects network status to syncStore              */
/* ================================================================== */

import { useEffect } from "react";
import { useNetworkStatus } from "./useNetworkStatus";
import { useSyncStore } from "../store/syncStore";
import { useAppStore } from "../store/appStore";

/**
 * Wires together the network status and the sync engine. When the device
 * comes back online, this hook triggers a sync and refreshes pending count.
 * Mount this once near the root of the app.
 */
export function useOfflineSync(): {
  online: boolean;
  pending: number;
  syncing: boolean;
  lastError: string | null;
  sync: () => Promise<void>;
} {
  const { online, check } = useNetworkStatus();
  const setOnline = useAppStore((s) => s.setOnline);
  const sync = useSyncStore((s) => s.sync);
  const refresh = useSyncStore((s) => s.refresh);
  const pending = useSyncStore((s) => s.pending);
  const syncing = useSyncStore((s) => s.syncing);
  const lastError = useSyncStore((s) => s.lastError);

  // Mirror to appStore for global reads.
  useEffect(() => {
    setOnline(online);
  }, [online, setOnline]);

  // On reconnect: trigger a sync.
  useEffect(() => {
    if (online) {
      void refresh();
      void sync().then(() => void refresh());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online]);

  // Initial pending refresh.
  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    online,
    pending,
    syncing,
    lastError,
    sync: async () => {
      await check();
      await sync();
      await refresh();
    },
  };
}
