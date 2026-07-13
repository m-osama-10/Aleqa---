"use client";

import { supabase, IS_SUPABASE_CONFIGURED } from "@/lib/supabase/client";
import { cacheGet, cacheSet } from "@/lib/offline/cache";
import { withRetry } from "@/lib/offline/network";
import type { SettingsMap } from "@/types/db";

const CACHE_KEY = "settings:public";

/** Fetch public app settings, cache locally for offline use. */
export async function fetchPublicSettings(): Promise<SettingsMap> {
  // Offline / not configured: return cached or defaults
  if (!IS_SUPABASE_CONFIGURED) {
    return cacheGet<SettingsMap>(CACHE_KEY, DEFAULT_SETTINGS) ?? DEFAULT_SETTINGS;
  }

  try {
    const { data, error } = await withRetry(() =>
      supabase.rpc("get_public_settings")
    );
    if (error) throw error;
    const settings = (data ?? {}) as SettingsMap;
    cacheSet(CACHE_KEY, settings);
    return { ...DEFAULT_SETTINGS, ...settings };
  } catch {
    return cacheGet<SettingsMap>(CACHE_KEY, DEFAULT_SETTINGS) ?? DEFAULT_SETTINGS;
  }
}

export const DEFAULT_SETTINGS: SettingsMap = {
  maintenance_mode: false,
  minimum_version: "1.0.0",
  privacy_policy: "https://alieqa.app/privacy",
  terms: "https://alieqa.app/terms",
  contact_email: "support@alieqa.app",
  support_url: "https://alieqa.app/support",
  facebook: "https://facebook.com/alieqa",
  whatsapp: "https://wa.me/201000000000",
  telegram: "https://t.me/alieqa",
  app_name: "Alieqa",
  primary_color: "#16a34a",
  ads_enabled: true,
};
