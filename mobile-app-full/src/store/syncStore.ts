/* ================================================================== */
/*  syncStore — pending changes queue + sync status                    */
/* ================================================================== */

import { create } from "zustand";
import {
  runSync,
  enqueue as enqueueOp,
  getPendingCount,
  clearQueue,
  type SyncOp,
  type SyncResult,
} from "../services/syncEngine";

interface SyncState {
  pending: number;
  syncing: boolean;
  lastResult: SyncResult | null;
  lastError: string | null;

  refresh: () => Promise<void>;
  enqueue: (op: Omit<SyncOp, "id" | "createdAt" | "attempts">) => Promise<void>;
  sync: () => Promise<SyncResult>;
  clear: () => Promise<void>;
}

export const useSyncStore = create<SyncState>((set, get) => ({
  pending: 0,
  syncing: false,
  lastResult: null,
  lastError: null,

  refresh: async () => {
    const pending = await getPendingCount();
    set({ pending });
  },

  enqueue: async (op) => {
    await enqueueOp(op);
    await get().refresh();
  },

  sync: async () => {
    set({ syncing: true, lastError: null });
    try {
      const res = await runSync();
      set({
        syncing: false,
        lastResult: res,
        pending: res.remaining,
        lastError: res.ok ? null : "sync failed",
      });
      return res;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "sync failed";
      set({ syncing: false, lastError: msg });
      return {
        ok: false,
        applied: 0,
        failed: 0,
        remaining: get().pending,
        error: msg,
      };
    }
  },

  clear: async () => {
    await clearQueue();
    set({ pending: 0, lastResult: null });
  },
}));
