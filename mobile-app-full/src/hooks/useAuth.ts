/* ================================================================== */
/*  useAuth — convenience hook wrapping authStore                      */
/* ================================================================== */

import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { registerForPushNotifications } from "../services/pushNotifications";

export function useAuth() {
  const store = useAuthStore();

  // Bootstrap on first mount.
  useEffect(() => {
    if (!store.initialized) {
      void store.init();
    }
  }, [store]);

  // Register for push notifications whenever a non-guest user signs in.
  useEffect(() => {
    if (store.user && !store.user.is_guest) {
      void registerForPushNotifications(store.user.id).catch(() => {
        /* best-effort */
      });
    }
  }, [store.user?.id, store.user?.is_guest]);

  return {
    user: store.user,
    profile: store.profile,
    loading: store.loading,
    initialized: store.initialized,
    error: store.error,
    isGuest: store.user?.is_guest ?? false,
    isAdmin: store.user?.role === "admin",
    signIn: store.signIn,
    signUp: store.signUp,
    signInAsGuest: store.signInAsGuest,
    sendReset: store.sendReset,
    signOut: store.signOut,
    patchProfile: store.patchProfile,
    clearError: store.clearError,
  };
}
