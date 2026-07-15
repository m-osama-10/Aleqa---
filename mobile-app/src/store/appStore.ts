/* ================================================================== */
/*  appStore — locale, theme, settings, online status                  */
/* ================================================================== */

import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";
import { STORAGE_KEYS } from "../utils/constants";
import type { Lang } from "../utils/i18n";
import type { AppTheme, SettingsMap } from "../types/db";

interface AppState {
  lang: Lang;
  theme: AppTheme;
  settings: SettingsMap;
  isOnline: boolean;
  /** Has the app finished its initial bootstrap? */
  ready: boolean;

  setLang: (l: Lang) => Promise<void>;
  setTheme: (t: AppTheme) => Promise<void>;
  setSettings: (s: SettingsMap) => void;
  setOnline: (v: boolean) => void;
  setReady: (v: boolean) => void;
  init: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  lang: "ar",
  theme: "system",
  settings: {},
  isOnline: true,
  ready: false,

  setLang: async (l) => {
    set({ lang: l });
    await AsyncStorage.setItem(STORAGE_KEYS.lang, l);
    // Apply RTL — note: native RTL changes require reload on some platforms.
    const isRtl = l === "ar";
    if (I18nManager.isRTL !== isRtl) {
      I18nManager.forceRTL(isRtl);
    }
  },

  setTheme: async (t) => {
    set({ theme: t });
    const all = { ...get().settings, theme: t };
    await AsyncStorage.setItem(
      STORAGE_KEYS.settings,
      JSON.stringify({ lang: get().lang, theme: t })
    );
    set({ settings: all });
  },

  setSettings: (s) => set({ settings: s }),
  setOnline: (v) => set({ isOnline: v }),
  setReady: (v) => set({ ready: v }),

  init: async () => {
    try {
      const lang = (await AsyncStorage.getItem(STORAGE_KEYS.lang)) as Lang | null;
      const settingsRaw = await AsyncStorage.getItem(STORAGE_KEYS.settings);
      const parsed = settingsRaw ? JSON.parse(settingsRaw) : {};
      const theme = (parsed.theme as AppTheme) ?? "system";
      set({
        lang: lang === "en" || lang === "ar" ? lang : "ar",
        theme,
        ready: true,
      });
      // Apply RTL on startup.
      const isRtl = get().lang === "ar";
      if (I18nManager.isRTL !== isRtl) {
        I18nManager.forceRTL(isRtl);
      }
    } catch {
      set({ ready: true });
    }
  },
}));
