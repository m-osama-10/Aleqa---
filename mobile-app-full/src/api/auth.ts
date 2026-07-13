/* ================================================================== */
/*  Auth API — Supabase auth + profile fetch + guest mode              */
/* ================================================================== */

import { supabase } from "./supabase";
import type { AuthUser, Profile, UserRole } from "../types/db";
import { genId } from "../utils/helpers";

export interface AuthResult {
  user: AuthUser;
  profile: Profile;
}

/** Map a Supabase auth user + profile row into our AuthUser composite. */
function toAuthUser(
  su: { id: string; email?: string },
  profile: Profile
): AuthUser {
  return {
    id: su.id,
    email: su.email ?? profile.email,
    full_name: profile.full_name,
    avatar_url: profile.avatar_url,
    role: profile.role,
    is_guest: profile.is_guest,
  };
}

/** Fetch the profile row matching the current auth user. */
export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return (data as Profile) ?? null;
}

/** Upsert a profile (used after sign-up to seed defaults). */
export async function upsertProfile(
  profile: Partial<Profile> & { id: string }
): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .upsert(profile, { onConflict: "id" })
    .select()
    .single();
  if (error) throw error;
  return data as Profile;
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });
  if (error) throw error;
  if (!data.user) throw new Error("No user returned");

  let profile = await fetchProfile(data.user.id);
  if (!profile) {
    // First-time login after admin-created account — seed a profile row.
    profile = await upsertProfile({
      id: data.user.id,
      email: data.user.email ?? email,
      full_name: null,
      avatar_url: null,
      phone: null,
      role: "user",
      locale: "ar",
      theme: "system",
      is_guest: false,
      guest_expires_at: null,
      last_seen_at: new Date().toISOString(),
    });
  }

  // Touch last_seen_at (best-effort).
  void supabase
    .from("profiles")
    .update({ last_seen_at: new Date().toISOString() })
    .eq("id", profile.id);

  return { user: toAuthUser(data.user, profile), profile };
}

export async function signUpWithEmail(
  email: string,
  password: string,
  fullName: string,
  phone?: string
): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      data: { full_name: fullName, phone: phone ?? null },
    },
  });
  if (error) throw error;
  if (!data.user) throw new Error("No user returned");

  // Create the profile row.
  const profile = await upsertProfile({
    id: data.user.id,
    email: data.user.email ?? email,
    full_name: fullName,
    avatar_url: null,
    phone: phone ?? null,
    role: "user" as UserRole,
    locale: "ar",
    theme: "system",
    is_guest: false,
    guest_expires_at: null,
    last_seen_at: new Date().toISOString(),
  });

  return { user: toAuthUser(data.user, profile), profile };
}

export async function resetPassword(email: string): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(
    email.trim().toLowerCase()
  );
  if (error) throw error;
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentSession(): Promise<AuthResult | null> {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error || !session?.user) return null;

  const profile = await fetchProfile(session.user.id);
  if (!profile) return null;
  if (profile.deleted_at) return null;

  return { user: toAuthUser(session.user, profile), profile };
}

export async function updateProfile(
  userId: string,
  patch: Partial<Profile>
): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;
  return data as Profile;
}

/**
 * Guest mode — create a local-only AuthUser without backend credentials.
 * Used for offline-first exploration; cannot sync favorites/history.
 */
export function makeGuestUser(): AuthUser {
  return {
    id: `guest_${genId()}`,
    email: "",
    full_name: "زائر",
    avatar_url: null,
    role: "user",
    is_guest: true,
  };
}

/** Auth state change subscription. */
export function onAuthChange(
  cb: (user: AuthUser | null) => void
): () => void {
  const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
    if (!session?.user) {
      cb(null);
      return;
    }
    try {
      const profile = await fetchProfile(session.user.id);
      if (!profile) {
        cb(null);
        return;
      }
      cb(toAuthUser(session.user, profile));
    } catch {
      cb(null);
    }
  });
  return () => sub.subscription.unsubscribe();
}
