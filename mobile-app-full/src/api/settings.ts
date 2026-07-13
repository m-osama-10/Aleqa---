/* ================================================================== */
/*  Settings API                                                       */
/* ================================================================== */

import { supabase } from "./supabase";
import type { Setting, SettingsMap } from "../types/db";

/** Fetch all public settings (no auth required). */
export async function fetchPublicSettings(): Promise<SettingsMap> {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("is_public", true)
    .is("deleted_at", null);
  if (error) throw error;
  return toSettingsMap((data ?? []) as Setting[]);
}

/** Fetch ALL settings (admin only). */
export async function adminFetchSettings(): Promise<Setting[]> {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .is("deleted_at", null)
    .order("category", { ascending: true })
    .order("key", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Setting[];
}

/** Coerce setting rows → typed map (with value_type parsing). */
function toSettingsMap(rows: Setting[]): SettingsMap {
  const out: SettingsMap = {};
  for (const r of rows) {
    switch (r.value_type) {
      case "number":
        out[r.key] = Number(r.value);
        break;
      case "boolean":
        out[r.key] = r.value === "true" || r.value === "1";
        break;
      case "json":
        try {
          out[r.key] = JSON.parse(r.value);
        } catch {
          out[r.key] = r.value;
        }
        break;
      default:
        out[r.key] = r.value;
    }
  }
  return out;
}

/** Get a single setting value by key. */
export async function fetchSetting(key: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", key)
    .eq("is_public", true)
    .is("deleted_at", null)
    .maybeSingle();
  if (error) throw error;
  return (data?.value as string) ?? null;
}

/** Admin: upsert a setting. */
export async function adminUpsertSetting(
  payload: Omit<Setting, "id" | "created_at" | "updated_at" | "deleted_at">
): Promise<Setting> {
  const { data, error } = await supabase
    .from("settings")
    .upsert(payload, { onConflict: "key" })
    .select()
    .single();
  if (error) throw error;
  return data as Setting;
}

/** Admin: soft-delete a setting. */
export async function adminDeleteSetting(id: string): Promise<void> {
  const { error } = await supabase
    .from("settings")
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw error;
}
