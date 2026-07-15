/* ================================================================== */
/*  Push Notifications — Expo + device_tokens registration            */
/* ================================================================== */

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { APP_VERSION, NOTIFICATION_CHANNEL_ID } from "../utils/constants";
import { registerDeviceToken } from "../api/deviceTokens";

/**
 * Default notification handler — while the app is in the foreground, show
 * the notification as a banner (iOS) or heads-up (Android).
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/** Configure the Android channel (required for heads-up notifications). */
export async function setupAndroidChannel(): Promise<void> {
  if (Platform.OS !== "android") return;
  await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNEL_ID, {
    name: "Alieqa",
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#2E7D4F",
    sound: "default",
  });
}

/** Request notification permissions (no-op on simulator). */
export async function requestNotificationPermissions(): Promise<boolean> {
  if (!Device.isDevice) return false;
  const cur = await Notifications.getPermissionsAsync();
  let granted = cur.granted || cur.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
  if (!granted && cur.canAskAgain) {
    const req = await Notifications.requestPermissionsAsync({
      ios: { allowAlert: true, allowBadge: true, allowSound: true },
    });
    granted = req.granted;
  }
  return granted;
}

/** Get the Expo push token (or null on simulator / denied). */
export async function getExpoPushToken(): Promise<string | null> {
  if (!Device.isDevice) return null;
  const granted = await requestNotificationPermissions();
  if (!granted) return null;
  try {
    const tokenResp = await Notifications.getExpoPushTokenAsync({
      projectId: "alieqa-mobile",
    });
    return tokenResp.data;
  } catch {
    return null;
  }
}

/**
 * Register the device token with the backend for the given user.
 * Safe to call on every app launch — it is idempotent on (user_id, token).
 */
export async function registerForPushNotifications(
  userId: string
): Promise<string | null> {
  await setupAndroidChannel();
  const token = await getExpoPushToken();
  if (!token) return null;
  try {
    await registerDeviceToken(userId, token, APP_VERSION);
    return token;
  } catch {
    return null;
  }
}

/** Subscribe to incoming notifications while the app is running. */
export function addNotificationListener(
  onReceive: (n: Notifications.Notification) => void,
  onTap?: (response: Notifications.NotificationResponse) => void
): () => void {
  const sub1 = Notifications.addNotificationReceivedListener(onReceive);
  const sub2 = onTap ? Notifications.addNotificationResponseReceivedListener(onTap) : null;
  return () => {
    sub1.remove();
    sub2?.remove();
  };
}

/** Display a local notification (used for in-app banners + scheduled tips). */
export async function sendLocalNotification(
  title: string,
  body: string,
  data?: Record<string, unknown>
): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: { title, body, data: data ?? {}, sound: "default" },
    trigger: null, // immediate
  });
}
