/* ================================================================== */
/*  authStore — Zustand store for auth state                           */
/* ================================================================== */

import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getCurrentSession,
  signInWithEmail,
  signUpWithEmail,
  resetPassword,
  signOut as apiSignOut,
  updateProfile as apiUpdateProfile,
  onAuthChange,
  makeGuestUser,
} from "../api/auth";
import { STORAGE_KEYS } from "../utils/constants";
import type { AuthUser, Profile } from "../types/db";

interface AuthState {
  user: AuthUser | null;
  profile: Profile | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;

  init: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  signInAsGuest: () => Promise<void>;
  sendReset: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  patchProfile: (patch: Partial<Profile>) => Promise<void>;
  clearError: () => void;
  _setAuth: (user: AuthUser | null, profile: Profile | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: false,
  initialized: false,
  error: null,

  init: async () => {
    set({ loading: true });
    try {
      // Restore guest flag.
      const guestFlag = await AsyncStorage.getItem(STORAGE_KEYS.authGuest);
      if (guestFlag === "1") {
        set({
          user: makeGuestUser(),
          profile: null,
          loading: false,
          initialized: true,
        });
        return;
      }

      const session = await getCurrentSession();
      if (session) {
        set({
          user: session.user,
          profile: session.profile,
          loading: false,
          initialized: true,
        });
      } else {
        set({
          user: null,
          profile: null,
          loading: false,
          initialized: true,
        });
      }

      // Subscribe to auth changes (refresh token rotation etc.).
      onAuthChange((u) => {
        if (u) {
          set({ user: u, profile: get().profile });
        } else if (!get().user?.is_guest) {
          set({ user: null, profile: null });
        }
      });
    } catch (err) {
      set({
        loading: false,
        initialized: true,
        error: err instanceof Error ? err.message : "auth init failed",
      });
    }
  },

  signIn: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { user, profile } = await signInWithEmail(email, password);
      await AsyncStorage.removeItem(STORAGE_KEYS.authGuest);
      set({ user, profile, loading: false });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "auth.login_error";
      set({ loading: false, error: msg });
      throw err;
    }
  },

  signUp: async (email, password, name, phone) => {
    set({ loading: true, error: null });
    try {
      const { user, profile } = await signUpWithEmail(email, password, name, phone);
      await AsyncStorage.removeItem(STORAGE_KEYS.authGuest);
      set({ user, profile, loading: false });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "auth.register_error";
      set({ loading: false, error: msg });
      throw err;
    }
  },

  signInAsGuest: async () => {
    set({ loading: true, error: null });
    await AsyncStorage.setItem(STORAGE_KEYS.authGuest, "1");
    set({
      user: makeGuestUser(),
      profile: null,
      loading: false,
      initialized: true,
    });
  },

  sendReset: async (email) => {
    set({ loading: true, error: null });
    try {
      await resetPassword(email);
      set({ loading: false });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "auth.reset_error";
      set({ loading: false, error: msg });
      throw err;
    }
  },

  signOut: async () => {
    set({ loading: true });
    try {
      const u = get().user;
      if (u && !u.is_guest) {
        await apiSignOut();
      }
    } catch {
      /* ignore — clear local state regardless */
    }
    await AsyncStorage.removeItem(STORAGE_KEYS.authGuest);
    set({ user: null, profile: null, loading: false });
  },

  patchProfile: async (patch) => {
    const u = get().user;
    if (!u) return;
    set({ loading: true, error: null });
    try {
      const next = await apiUpdateProfile(u.id, patch);
      set({ profile: next, loading: false });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "profile save failed";
      set({ loading: false, error: msg });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
  _setAuth: (user, profile) => set({ user, profile }),
}));
