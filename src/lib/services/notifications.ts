"use client";

import { supabase, IS_SUPABASE_CONFIGURED } from "@/lib/supabase/client";
import { withRetry } from "@/lib/offline/network";
import type { AppNotification } from "@/types/db";

export async function fetchNotifications(userId: string): Promise<AppNotification[]> {
  if (!IS_SUPABASE_CONFIGURED || !userId) return [];
  try {
    const { data, error } = await withRetry(() =>
      supabase
        .from("notifications")
        .select("*")
        .or(`user_id.eq.${userId},is_broadcast.eq.true`)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(50)
    );
    if (error) throw error;
    return (data ?? []) as AppNotification[];
  } catch {
    return [];
  }
}

export async function markNotificationRead(id: string): Promise<void> {
  if (!IS_SUPABASE_CONFIGURED) return;
  try {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
  } catch {
    /* ignore */
  }
}

export async function markAllNotificationsRead(userId: string): Promise<void> {
  if (!IS_SUPABASE_CONFIGURED || !userId) return;
  try {
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .or(`user_id.eq.${userId},is_broadcast.eq.true`)
      .eq("is_read", false);
  } catch {
    /* ignore */
  }
}

export async function getUnreadCount(userId: string): Promise<number> {
  if (!IS_SUPABASE_CONFIGURED || !userId) return 0;
  try {
    const { data, error } = await supabase.rpc("get_unread_count");
    if (error) throw error;
    return (data as number) ?? 0;
  } catch {
    return 0;
  }
}
