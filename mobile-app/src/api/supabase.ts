/* ================================================================== */
/*  Supabase client init — React Native                                */
/* ================================================================== */

import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import "react-native-url-polyfill/auto";
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, IS_SUPABASE_CONFIGURED } from "../utils/constants";

/**
 * Custom storage adapter using expo-secure-store on native, localStorage on web.
 * Supabase auth uses this to persist the user session securely.
 */
const ExpoSecureStoreAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === "web") {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    }
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === "web") {
      try {
        localStorage.setItem(key, value);
      } catch {
        /* ignore */
      }
      return;
    }
    try {
      // SecureStore has a 2KB value limit — auth refresh tokens are well under.
      await SecureStore.setItemAsync(key, value);
    } catch {
      /* ignore quota errors */
    }
  },
  removeItem: async (key: string): Promise<void> => {
    if (Platform.OS === "web") {
      try {
        localStorage.removeItem(key);
      } catch {
        /* ignore */
      }
      return;
    }
    try {
      await SecureStore.deleteItemAsync(key);
    } catch {
      /* ignore */
    }
  },
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  realtime: {
    params: { eventsPerSecond: 2 },
  },
  global: {
    headers: {
      "X-Client-Info": `alieqa-mobile/1.0.0/${Platform.OS}`,
    },
  },
});

export { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, IS_SUPABASE_CONFIGURED };
