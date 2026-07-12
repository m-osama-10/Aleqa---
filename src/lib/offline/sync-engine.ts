"use client";

import { supabase, IS_SUPABASE_CONFIGURED } from "@/lib/supabase/client";
import { getPendingOps, removePendingOp } from "@/lib/offline/cache";
import { onBackOnline } from "@/lib/offline/network";

let syncing = false;

/** Flush pending offline writes to Supabase (insert/update/delete). */
export async function syncPendingOps(): Promise<{ synced: number; failed: number }> {
  if (!IS_SUPABASE_CONFIGURED || syncing) return { synced: 0, failed: 0 };
  syncing = true;
  const ops = getPendingOps();
  let synced = 0;
  let failed = 0;

  for (const op of ops) {
    try {
      if (op.op === "insert") {
        const { error } = await supabase.from(op.table).insert(op.payload);
        if (error) throw error;
      } else if (op.op === "update") {
        const { id, ...rest } = op.payload;
        const { error } = await supabase
          .from(op.table)
          .update(rest)
          .eq("id", id);
        if (error) throw error;
      } else if (op.op === "delete") {
        const { error } = await supabase
          .from(op.table)
          .update({ deleted_at: new Date().toISOString() })
          .eq("id", op.payload.id);
        if (error) throw error;
      }
      removePendingOp(op.id);
      synced++;
    } catch {
      failed++;
      // keep in queue for next attempt
    }
  }

  syncing = false;
  return { synced, failed };
}

/** Register the sync-on-back-online listener. Call once in the app root. */
export function initSyncEngine() {
  if (typeof window === "undefined") return;
  // Try immediately if already online
  if (navigator.onLine) syncPendingOps();
  // Then on every "back online" event
  onBackOnline(() => syncPendingOps());
  // And periodically (every 60s) while online
  setInterval(() => {
    if (navigator.onLine) syncPendingOps();
  }, 60000);
}
