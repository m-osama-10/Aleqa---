/* ================================================================== */
/*  Favorites API                                                      */
/* ================================================================== */

import { supabase } from "./supabase";
import type { Favorite } from "../types/db";

/** List the current user's favorites, newest first. */
export async function fetchFavorites(userId: string): Promise<Favorite[]> {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Favorite[];
}

/** Create a new favorite. */
export async function createFavorite(
  payload: Omit<Favorite, "id" | "created_at" | "updated_at" | "deleted_at">
): Promise<Favorite> {
  const { data, error } = await supabase
    .from("favorites")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data as Favorite;
}

/** Soft-delete a favorite by id (RLS-scoped). */
export async function deleteFavorite(id: string): Promise<void> {
  const { error } = await supabase
    .from("favorites")
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw error;
}

/** Hard-clear all favorites for a user (used by "clear all"). */
export async function clearFavorites(userId: string): Promise<void> {
  const { error } = await supabase
    .from("favorites")
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .is("deleted_at", null);
  if (error) throw error;
}

/** Update a favorite's name or payload. */
export async function updateFavorite(
  id: string,
  patch: Partial<Pick<Favorite, "name" | "payload">>
): Promise<Favorite> {
  const { data, error } = await supabase
    .from("favorites")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Favorite;
}
