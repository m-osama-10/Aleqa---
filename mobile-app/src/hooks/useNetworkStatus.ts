/* ================================================================== */
/*  useNetworkStatus — online/offline state via NetInfo-less approach  */
/* ================================================================== */

import { useEffect, useState } from "react";
import { AppState, Platform, NativeModules } from "react-native";

/**
 * Lightweight online/offline detector. Avoids an extra native dependency
 * by polling fetch() with a HEAD request when the app becomes active.
 * Re-checks on AppState change.
 */
export function useNetworkStatus(): { online: boolean; check: () => Promise<void> } {
  const [online, setOnline] = useState<boolean>(true);

  const check = async () => {
    try {
      // Use a small timeout — if it can't reach the URL, we're offline.
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 4000);
      const res = await fetch("https://lepdythxcdurjwncxnnt.supabase.co/rest/v1/", {
        method: "HEAD",
        signal: controller.signal,
        headers: { apikey: "sb_publishable_nWluULZyJ-hU3f42jd0mbg_8iNXWxkp" },
      });
      clearTimeout(t);
      setOnline(res.ok || res.status === 401 || res.status === 404);
    } catch {
      setOnline(false);
    }
  };

  useEffect(() => {
    void check();
    const sub = AppState.addEventListener("change", (state) => {
      if (state === "active") void check();
    });
    const interval = setInterval(() => void check(), 30_000);
    return () => {
      sub.remove();
      clearInterval(interval);
    };
  }, []);

  return { online, check };
}

/**
 * iOS-only reachability via the native RCTReachability module (if present).
 * Falls back to the fetch probe on Android / when the module is missing.
 */
export function nativeReachabilityAvailable(): boolean {
  return (
    Platform.OS === "ios" &&
    !!NativeModules.Reachability &&
    typeof NativeModules.Reachability.getCurrentReachability === "function"
  );
}
