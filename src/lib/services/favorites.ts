"use client";

import { supabase, IS_SUPABASE_CONFIGURED } from "@/lib/supabase/client";
import { addPendingOp } from "@/lib/offline/cache";
import { withRetry } from "@/lib/offline/network";
import type { Favorite } from "@/types/db";

/** Fetch user favorites. Returns empty for guest / offline. */
export async function fetchFavorites(userId: string): Promise<Favorite[]> {
  if (!IS_SUPABASE_CONFIGURED || !userId) return [];
  try {
    const { data, error } = await withRetry(() =>
      supabase
        .from("favorites")
        .select("*")
        .eq("user_id", userId)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
    );
    if (error) throw error;
    return (data ?? []) as Favorite[];
  } catch {
    return [];
  }
}

export async function addFavorite(
  userId: string,
  input: {
    calculator_id?: string | null;
    animal_key?: string | null;
    name?: string | null;
    payload: Record<string, unknown>;
  }
): Promise<Favorite | null> {
  if (!IS_SUPABASE_CONFIGURED || !userId) {
    addPendingOp({
      table: "favorites",
      op: "insert",
      payload: { user_id: userId, ...input },
    });
    return null;
  }
  try {
    const { data, error } = await supabase
      .from("favorites")
      .insert({ user_id: userId, ...input })
      .select()
      .single();
    if (error) throw error;
    return data as Favorite;
  } catch {
    addPendingOp({
      table: "favorites",
      op: "insert",
      payload: { user_id: userId, ...input },
    });
    return null;
  }
}

export async function removeFavorite(id: string): Promise<boolean> {
  if (!IS_SUPABASE_CONFIGURED) {
    addPendingOp({ table: "favorites", op: "delete", payload: { id } });
    return true;
  }
  try {
    const { error } = await supabase
      .from("favorites")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw error;
    return true;
  } catch {
    addPendingOp({ table: "favorites", op: "delete", payload: { id } });
    return false;
  }
}
