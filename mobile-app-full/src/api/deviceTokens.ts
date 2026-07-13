/* ================================================================== */
/*  Device tokens API — Expo Push registration                         */
/* ================================================================== */

import { Platform } from "react-native";
import { supabase } from "./supabase";
import type { DeviceToken } from "../types/db";

/**
 * Register (or refresh) the Expo push token in the `device_tokens` table.
 * Called once on app launch after sign-in. Idempotent on `token`.
 */
export async function registerDeviceToken(
  userId: string,
  token: string,
  appVersion: string
): Promise<DeviceToken | null> {
  // First, see if this token already exists for this user.
  const { data: existing, error: lookupErr } = await supabase
    .from("device_tokens")
    .select("*")
    .eq("user_id", userId)
    .eq("token", token)
    .is("deleted_at", null)
    .maybeSingle();

  if (lookupErr) throw lookupErr;

  if (existing) {
    // Touch is_active + app_version.
    const { data, error } = await supabase
      .from("device_tokens")
      .update({
        is_active: true,
        app_version: appVersion,
        updated_at: new Date().toISOString(),
      })
      .eq("id", (existing as DeviceToken).id)
      .select()
      .single();
    if (error) throw error;
    return data as DeviceToken;
  }

  const platform: "android" | "ios" | "web" =
    Platform.OS === "ios" ? "ios" : Platform.OS === "web" ? "web" : "android";

  const { data, error } = await supabase
    .from("device_tokens")
    .insert({
      user_id: userId,
      token,
      platform,
      app_version: appVersion,
      is_active: true,
    })
    .select()
    .single();
  if (error) throw error;
  return data as DeviceToken;
}

/** Deactivate the device token (used on sign-out). */
export async function deactivateDeviceToken(token: string): Promise<void> {
  const { error } = await supabase
    .from("device_tokens")
    .update({
      is_active: false,
      updated_at: new Date().toISOString(),
    })
    .eq("token", token);
  if (error) throw error;
}

/** Admin: list all device tokens. */
export async function adminFetchDeviceTokens(): Promise<DeviceToken[]> {
  const { data, error } = await supabase
    .from("device_tokens")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as DeviceToken[];
}
