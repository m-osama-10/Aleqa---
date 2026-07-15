/* ================================================================== */
/*  useNotifications — fetch + mark read                               */
/* ================================================================== */

import { useCallback, useEffect, useState } from "react";
import {
  fetchNotifications,
  countUnread,
  markNotificationRead,
  markAllNotificationsRead,
} from "../api/notifications";
import { cacheNotifications, loadCachedNotifications } from "../services/storage";
import { useNetworkStatus } from "./useNetworkStatus";
import type { AppNotification } from "../types/db";

export function useNotifications(userId: string | null | undefined) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unread, setUnread] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { online } = useNetworkStatus();

  const refresh = useCallback(async () => {
    if (!userId) {
      setNotifications([]);
      setUnread(0);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const cached = await loadCachedNotifications();
    if (cached) {
      setNotifications(cached);
      setUnread(cached.filter((n) => !n.is_read).length);
    }
    try {
      const rows = await fetchNotifications(userId, 50);
      setNotifications(rows);
      setUnread(rows.filter((n) => !n.is_read).length);
      await cacheNotifications(rows);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "notifications fetch failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (online) void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online]);

  const markRead = useCallback(
    async (id: string): Promise<void> => {
      // Optimistic.
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
      setUnread((u) => Math.max(0, u - 1));
      if (online) {
        try {
          await markNotificationRead(id);
        } catch {
          /* best-effort */
        }
      }
    },
    [online]
  );

  const markAllRead = useCallback(async (): Promise<void> => {
    if (!userId) return;
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    setUnread(0);
    if (online) {
      try {
        await markAllNotificationsRead(userId);
        await refresh();
      } catch {
        /* best-effort */
      }
    }
  }, [userId, online, refresh]);

  const refreshUnread = useCallback(async () => {
    if (!userId || !online) return;
    try {
      const n = await countUnread(userId);
      setUnread(n);
    } catch {
      /* ignore */
    }
  }, [userId, online]);

  return {
    notifications,
    unread,
    loading,
    error,
    refresh,
    refreshUnread,
    markRead,
    markAllRead,
  };
}
