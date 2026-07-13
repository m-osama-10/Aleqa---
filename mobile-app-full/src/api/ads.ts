/* ================================================================== */
/*  Ads API                                                            */
/* ================================================================== */

import { supabase } from "./supabase";
import type { Ad, AdPlacement } from "../types/db";

/** Fetch active ads for a given placement, ordered by priority then date. */
export async function fetchAdsByPlacement(
  placement: AdPlacement
): Promise<Ad[]> {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("ads")
    .select("*")
    .eq("enabled", true)
    .eq("placement", placement)
    .is("deleted_at", null)
    .or(`start_date.is.null,start_date.lte.${now}`)
    .or(`end_date.is.null,end_date.gte.${now}`)
    .order("priority", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Ad[];
}

/** Fetch all active ads (any placement) for the home screen. */
export async function fetchActiveAds(): Promise<Ad[]> {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("ads")
    .select("*")
    .eq("enabled", true)
    .is("deleted_at", null)
    .or(`start_date.is.null,start_date.lte.${now}`)
    .or(`end_date.is.null,end_date.gte.${now}`)
    .order("priority", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) throw error;
  return (data ?? []) as Ad[];
}

/** Record an impression for analytics. Best-effort — no throw. */
export async function trackAdImpression(adId: string): Promise<void> {
  try {
    await supabase.rpc("increment_ad_impressions", { ad_id: adId });
  } catch {
    /* swallow — impression tracking must not break UX */
  }
}

/** Record a click for analytics. Best-effort. */
export async function trackAdClick(adId: string): Promise<void> {
  try {
    await supabase.rpc("increment_ad_clicks", { ad_id: adId });
  } catch {
    /* swallow */
  }
}

/** Admin: list all ads. */
export async function adminFetchAds(): Promise<Ad[]> {
  const { data, error } = await supabase
    .from("ads")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Ad[];
}

/** Admin: create an ad. */
export async function adminCreateAd(
  payload: Omit<Ad, "id" | "created_at" | "updated_at" | "deleted_at" | "impressions" | "clicks">
): Promise<Ad> {
  const { data, error } = await supabase
    .from("ads")
    .insert({ ...payload, impressions: 0, clicks: 0 })
    .select()
    .single();
  if (error) throw error;
  return data as Ad;
}

/** Admin: update an ad. */
export async function adminUpdateAd(
  id: string,
  patch: Partial<Ad>
): Promise<Ad> {
  const { data, error } = await supabase
    .from("ads")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Ad;
}

/** Admin: soft-delete an ad. */
export async function adminDeleteAd(id: string): Promise<void> {
  const { error } = await supabase
    .from("ads")
    .update({
      deleted_at: new Date().toISOString(),
      enabled: false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw error;
}
