"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuthStore } from "@/lib/store/auth-store";
import { onAuthChange, signOut as supabaseSignOut } from "@/lib/services/auth";
import type { AuthUser } from "@/types/db";

interface AuthContextValue {
  user: AuthUser | null;
  isGuest: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isGuest, isLoading, setUser, setGuest, logout: storeLogout } = useAuthStore();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const unsub = onAuthChange((u) => {
      if (u) setUser(u);
      else if (!isGuest) useAuthStore.getState().setLoading(false);
    });
    return unsub;
     
  }, [refreshKey]);

  const logout = async () => {
    await supabaseSignOut();
    storeLogout();
  };

  const refreshUser = () => setRefreshKey((k) => k + 1);

  return (
    <AuthContext.Provider value={{ user, isGuest, isLoading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
