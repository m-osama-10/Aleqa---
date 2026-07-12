import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase browser client (singleton).
 * Uses ONLY the publishable/anon key — never the service role key.
 * RLS enforces all access on the server side.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
   
  console.warn("[supabase] Missing env vars — running in offline/demo mode.");
}

export const supabase = createBrowserClient(
  url ?? "https://placeholder.supabase.co",
  key ?? "sb_publishable_placeholder"
);

export const SUPABASE_URL = url ?? "";
export const IS_SUPABASE_CONFIGURED = Boolean(url && key);
