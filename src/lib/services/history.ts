"use client";

import { supabase, IS_SUPABASE_CONFIGURED } from "@/lib/supabase/client";
import { addPendingOp } from "@/lib/offline/cache";
import { withRetry } from "@/lib/offline/network";
import type { HistoryEntry } from "@/types/db";

export async function fetchHistory(userId: string, limit = 50): Promise<HistoryEntry[]> {
  if (!IS_SUPABASE_CONFIGURED || !userId) return [];
  try {
    const { data, error } = await withRetry(() =>
      supabase
        .from("history")
        .select("*")
        .eq("user_id", userId)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(limit)
    );
    if (error) throw error;
    return (data ?? []) as HistoryEntry[];
  } catch {
    return [];
  }
}

export async function addHistory(
  userId: string,
  input: {
    calculator_id?: string | null;
    animal_key?: string | null;
    name?: string | null;
    payload: Record<string, unknown>;
    duration_ms?: number | null;
  }
): Promise<void> {
  if (!IS_SUPABASE_CONFIGURED || !userId) {
    addPendingOp({
      table: "history",
      op: "insert",
      payload: { user_id: userId, ...input },
    });
    return;
  }
  try {
    await supabase.from("history").insert({ user_id: userId, ...input });
  } catch {
    addPendingOp({
      table: "history",
      op: "insert",
      payload: { user_id: userId, ...input },
    });
  }
}

export async function clearHistory(userId: string): Promise<boolean> {
  if (!IS_SUPABASE_CONFIGURED || !userId) return false;
  try {
    const { error } = await supabase
      .from("history")
      .update({ deleted_at: new Date().toISOString() })
      .eq("user_id", userId);
    if (error) throw error;
    return true;
  } catch {
    return false;
  }
}
