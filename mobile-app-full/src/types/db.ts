/* =====================================================================
 *  Alieqa Mobile — Database types
 *  Mirror of /home/z/my-project/src/types/db.ts (web version)
 * ===================================================================== */

export type UserRole = "user" | "admin";
export type AppLocale = "ar" | "en";
export type AppTheme = "light" | "dark" | "system";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  role: UserRole;
  locale: AppLocale;
  theme: AppTheme;
  is_guest: boolean;
  guest_expires_at: string | null;
  last_seen_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type SubscriptionPlan = "free" | "pro" | "premium";
export type SubscriptionStatus = "active" | "cancelled" | "expired" | "pending";

export interface Subscription {
  id: string;
  user_id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  started_at: string;
  expires_at: string | null;
  provider: string | null;
  provider_sub_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type NotificationType =
  | "info"
  | "warning"
  | "success"
  | "error"
  | "ad"
  | "system";

export interface AppNotification {
  id: string;
  user_id: string | null;
  title: string;
  body: string;
  type: NotificationType;
  data: Record<string, unknown>;
  is_read: boolean;
  is_broadcast: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type AdPlacement =
  | "home"
  | "calculator"
  | "results"
  | "sidebar"
  | "banner"
  | "interstitial";

export interface Ad {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  button_text: string | null;
  link_url: string | null;
  placement: AdPlacement;
  priority: number;
  enabled: boolean;
  start_date: string | null;
  end_date: string | null;
  impressions: number;
  clicks: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type SettingType = "string" | "boolean" | "number" | "json";

export interface Setting {
  id: string;
  key: string;
  value: string;
  value_type: SettingType;
  category: string;
  description: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type SettingsMap = Record<string, string | boolean | number | object>;

export interface CalculatorCategory {
  id: string;
  slug: string;
  name: string;
  name_en: string | null;
  description: string | null;
  icon: string | null;
  sort_order: number;
  enabled: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Calculator {
  id: string;
  category_id: string | null;
  slug: string;
  name: string;
  name_en: string | null;
  description: string | null;
  icon: string | null;
  animal_key: string | null;
  config: Record<string, unknown>;
  sort_order: number;
  enabled: boolean;
  is_premium: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Favorite {
  id: string;
  user_id: string;
  calculator_id: string | null;
  animal_key: string | null;
  name: string | null;
  payload: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface HistoryEntry {
  id: string;
  user_id: string;
  calculator_id: string | null;
  animal_key: string | null;
  name: string | null;
  payload: Record<string, unknown>;
  duration_ms: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type FeedbackStatus = "open" | "in_progress" | "resolved" | "closed";

export interface Feedback {
  id: string;
  user_id: string | null;
  subject: string;
  message: string;
  rating: number | null;
  contact: string | null;
  status: FeedbackStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AppVersion {
  id: string;
  version: string;
  platform: "android" | "ios" | "web";
  build_number: number;
  download_url: string | null;
  release_notes: string | null;
  is_force_update: boolean;
  is_active: boolean;
  min_os_version: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface DeviceToken {
  id: string;
  user_id: string | null;
  token: string;
  platform: "android" | "ios" | "web";
  app_version: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/* ---------- Composite types used by the UI ---------- */

export interface AuthUser {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  is_guest: boolean;
}

export interface CalcCategoryWithCalculators extends CalculatorCategory {
  calculators: Calculator[];
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalCalculators: number;
  totalAds: number;
  activeAds: number;
  totalFeedback: number;
  openFeedback: number;
  unreadNotifications: number;
}
