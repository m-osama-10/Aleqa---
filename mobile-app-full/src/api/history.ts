/* ================================================================== */
/*  History API                                                        */
/* ================================================================== */

import { supabase } from "./supabase";
import type { HistoryEntry } from "../types/db";

/** List the user's history entries, newest first. */
export async function fetchHistory(
  userId: string,
  limit = 50
): Promise<HistoryEntry[]> {
  const { data, error } = await supabase
    .from("history")
    .select("*")
    .eq("user_id", userId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as HistoryEntry[];
}

/** Record a calculation in the user's history. */
export async function createHistory(
  payload: Omit<HistoryEntry, "id" | "created_at" | "updated_at" | "deleted_at">
): Promise<HistoryEntry> {
  const { data, error } = await supabase
    .from("history")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data as HistoryEntry;
}

/** Soft-delete a single history entry. */
export async function deleteHistory(id: string): Promise<void> {
  const { error } = await supabase
    .from("history")
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw error;
}

/** Clear all history for a user. */
export async function clearHistory(userId: string): Promise<void> {
  const { error } = await supabase
    .from("history")
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .is("deleted_at", null);
  if (error) throw error;
}
