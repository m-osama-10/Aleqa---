"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { SettingsMap, AppLocale, AppTheme } from "@/types/db";
import { DEFAULT_SETTINGS } from "@/lib/services/settings";

interface AppState {
  settings: SettingsMap;
  locale: AppLocale;
  theme: AppTheme;
  settingsLoaded: boolean;
  setSettings: (s: SettingsMap) => void;
  setLocale: (l: AppLocale) => void;
  setTheme: (t: AppTheme) => void;
  setSettingsLoaded: (b: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      locale: "ar",
      theme: "system",
      settingsLoaded: false,
      setSettings: (settings) => set({ settings, settingsLoaded: true }),
      setLocale: (locale) => set({ locale }),
      setTheme: (theme) => set({ theme }),
      setSettingsLoaded: (settingsLoaded) => set({ settingsLoaded }),
    }),
    {
      name: "alieqa.app",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ locale: s.locale, theme: s.theme }),
    }
  )
);
