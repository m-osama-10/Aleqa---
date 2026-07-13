/* ================================================================== */
/*  AppNavigator — AuthStack + MainTabs + AdminStack                   */
/* ================================================================== */

import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useAuth } from "../hooks/useAuth";
import { useAppStore } from "../store/appStore";
import { useOfflineSync } from "../hooks/useOfflineSync";
import { useLang } from "../utils/i18n";
import { OfflineBanner } from "../components/OfflineBanner";
import { COLORS } from "../utils/constants";
import type { RootStackParamList } from "./types";

/* Auth screens */
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { ForgotPasswordScreen } from "../screens/auth/ForgotPasswordScreen";

/* Main screens */
import { HomeScreen } from "../screens/main/HomeScreen";
import { CalculatorScreen } from "../screens/main/CalculatorScreen";
import { ResultsScreen } from "../screens/main/ResultsScreen";
import { FavoritesScreen } from "../screens/main/FavoritesScreen";
import { HistoryScreen } from "../screens/main/HistoryScreen";
import { PricesScreen } from "../screens/main/PricesScreen";
import { NotificationsScreen } from "../screens/main/NotificationsScreen";
import { SettingsScreen } from "../screens/main/SettingsScreen";
import { ProfileScreen } from "../screens/main/ProfileScreen";
import { AboutScreen } from "../screens/main/AboutScreen";
import { FeedbackScreen } from "../screens/main/FeedbackScreen";

/* Admin screens */
import { AdminDashboardScreen } from "../screens/admin/AdminDashboardScreen";
import { AdminUsersScreen } from "../screens/admin/AdminUsersScreen";
import { AdminAdsScreen } from "../screens/admin/AdminAdsScreen";
import { AdminSettingsScreen } from "../screens/admin/AdminSettingsScreen";
import { AdminNotificationsScreen } from "../screens/admin/AdminNotificationsScreen";
import { AdminCategoriesScreen } from "../screens/admin/AdminCategoriesScreen";
import { AdminAnalyticsScreen } from "../screens/admin/AdminAnalyticsScreen";

/* ----------------------------------------------------------------- */
/*  Stacks                                                            */
/* ----------------------------------------------------------------- */

const AuthStack = createNativeStackNavigator<RootStackParamList>();
const MainStack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<RootStackParamList>();
const AdminStack = createNativeStackNavigator<RootStackParamList>();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  );
}

function MainTabsScreen() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.brand,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: { backgroundColor: COLORS.card, borderTopColor: COLORS.border },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "الرئيسية",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Calculator"
        component={CalculatorStack}
        options={{
          tabBarLabel: "الحاسبة",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calculator" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: "المفضلة",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: "السجل",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "حسابي",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

function CalculatorStack() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Calculator"
        component={CalculatorScreen}
        options={{ title: "الحاسبة", headerShown: false }}
      />
      <MainStack.Screen
        name="Results"
        component={ResultsScreen}
        options={{ title: "النتيجة" }}
      />
    </MainStack.Navigator>
  );
}

function AdminStackScreen() {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{ title: "لوحة المشرف" }}
      />
      <AdminStack.Screen
        name="AdminUsers"
        component={AdminUsersScreen}
        options={{ title: "المستخدمون" }}
      />
      <AdminStack.Screen
        name="AdminAds"
        component={AdminAdsScreen}
        options={{ title: "الإعلانات" }}
      />
      <AdminStack.Screen
        name="AdminSettings"
        component={AdminSettingsScreen}
        options={{ title: "الإعدادات" }}
      />
      <AdminStack.Screen
        name="AdminNotifications"
        component={AdminNotificationsScreen}
        options={{ title: "الإشعارات" }}
      />
      <AdminStack.Screen
        name="AdminCategories"
        component={AdminCategoriesScreen}
        options={{ title: "التصنيفات" }}
      />
      <AdminStack.Screen
        name="AdminAnalytics"
        component={AdminAnalyticsScreen}
        options={{ title: "التحليلات" }}
      />
    </AdminStack.Navigator>
  );
}

/* ----------------------------------------------------------------- */
/*  Root                                                              */
/* ----------------------------------------------------------------- */

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { user, initialized, isAdmin } = useAuth();
  const { online, pending } = useOfflineSync();

  if (!initialized) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.bg }}>
        <ActivityIndicator size="large" color={COLORS.brand} />
      </View>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <RootStack.Screen name="Login" component={AuthStackScreen} />
      ) : isAdmin ? (
        <RootStack.Screen name="AdminDashboard" component={AdminStackScreen} />
      ) : (
        <RootStack.Screen
          name="MainTabs"
          component={MainTabsScreen}
          options={{
            headerShown: false,
            // Render the offline banner as a non-interactive header overlay.
            header: () => <OfflineBanner visible={!online} pending={pending} />,
          }}
        />
      )}
    </RootStack.Navigator>
  );
}

export function AppNavigator() {
  const lang = useAppStore((s) => s.lang);
  const theme = useAppStore((s) => s.theme);
  const init = useAppStore((s) => s.init);
  const { dir } = useLang(lang);

  useEffect(() => {
    void init();
  }, [init]);

  const isDark =
    theme === "dark" ||
    (theme === "system" && false); // RN doesn't easily detect system theme here; defaults to light

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: COLORS.brand,
      background: COLORS.bg,
      card: COLORS.card,
      text: COLORS.textPrimary,
      border: COLORS.border,
      notification: COLORS.danger,
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
