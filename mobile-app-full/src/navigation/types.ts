/* ================================================================== */
/*  Navigation types — route param contracts                            */
/* ================================================================== */

import type { AnimalKey, FormulationResult, PriceMap } from "../api/feedData";

/* Auth stack */
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

/* Main stack — within the bottom-tab navigator */
export type MainStackParamList = {
  Home: undefined;
  Calculator: { animalKey?: AnimalKey } | undefined;
  Results: {
    animalKey: AnimalKey;
    weight: number;
    production: number;
    flockSize: number;
    mode: "balanced" | "economy";
    prices: PriceMap;
    result?: FormulationResult;
  };
  Favorites: undefined;
  History: undefined;
  Prices: undefined;
  Notifications: undefined;
  Settings: undefined;
  Profile: undefined;
  About: undefined;
  Feedback: undefined;
};

/* Admin stack */
export type AdminStackParamList = {
  AdminDashboard: undefined;
  AdminUsers: undefined;
  AdminAds: undefined;
  AdminSettings: undefined;
  AdminNotifications: undefined;
  AdminCategories: undefined;
  AdminAnalytics: undefined;
};

/* Root stack — switches between auth, main, admin */
export type RootStackParamList = AuthStackParamList &
  MainStackParamList &
  AdminStackParamList & {
    // The bottom-tab navigator mount
    MainTabs: undefined;
  };

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
