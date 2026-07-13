import { create } from "zustand";
import { supabase } from "../api/supabase";

interface AuthUser {
  id: string;
  email: string;
  fullName: string | null;
  role: "user" | "admin";
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  isGuest: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  enterGuest: () => void;
  loadSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  isGuest: false,

  loadSession: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.session.user.id)
        .single();
      set({
        user: {
          id: data.session.user.id,
          email: data.session.user.email || "",
          fullName: profile?.full_name || null,
          role: profile?.role || "user",
        },
        loading: false,
      });
    } else {
      set({ loading: false });
    }
  },

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.session.user.id)
        .single();
      set({
        user: {
          id: data.session.user.id,
          email: data.session.user.email || "",
          fullName: profile?.full_name || null,
          role: profile?.role || "user",
        },
      });
    }
  },

  signUp: async (email, password, fullName) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) throw error;
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, isGuest: false });
  },

  resetPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },

  enterGuest: () => {
    set({
      isGuest: true,
      user: { id: "guest", email: "", fullName: "ضيف", role: "user" },
      loading: false,
    });
  },
}));
