/* ================================================================== */
/*  Notifications API                                                  */
/* ================================================================== */

import { supabase } from "./supabase";
import type { AppNotification } from "../types/db";

/** Fetch notifications addressed to the user OR broadcast, newest first. */
export async function fetchNotifications(
  userId: string,
  limit = 50
): Promise<AppNotification[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .or(`user_id.eq.${userId},is_broadcast.eq.true`)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as AppNotification[];
}

/** Count unread notifications for the current user. */
export async function countUnread(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .or(`user_id.eq.${userId},is_broadcast.eq.true`)
    .eq("is_read", false)
    .is("deleted_at", null);
  if (error) throw error;
  return count ?? 0;
}

/** Mark a notification as read. */
export async function markNotificationRead(id: string): Promise<void> {
  const { error } = await supabase
    .from("notifications")
    .update({
      is_read: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw error;
}

/** Mark all of the user's notifications as read. */
export async function markAllNotificationsRead(userId: string): Promise<void> {
  const { error } = await supabase
    .from("notifications")
    .update({
      is_read: true,
      updated_at: new Date().toISOString(),
    })
    .or(`user_id.eq.${userId},is_broadcast.eq.true`)
    .eq("is_read", false)
    .is("deleted_at", null);
  if (error) throw error;
}

/** Admin: send a broadcast notification to all users. */
export async function adminBroadcastNotification(
  payload: Pick<AppNotification, "title" | "body" | "type">
): Promise<AppNotification> {
  const { data, error } = await supabase
    .from("notifications")
    .insert({
      ...payload,
      user_id: null,
      is_read: false,
      is_broadcast: true,
      data: {},
    })
    .select()
    .single();
  if (error) throw error;
  return data as AppNotification;
}

/** Admin: list all notifications. */
export async function adminFetchNotifications(
  limit = 100
): Promise<AppNotification[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as AppNotification[];
}

/** Admin: delete a notification. */
export async function adminDeleteNotification(id: string): Promise<void> {
  const { error } = await supabase
    .from("notifications")
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw error;
}
