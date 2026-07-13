import React from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { useAuthStore } from "../store/auth";
import { COLORS } from "../utils/constants";
import { LoginScreen } from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen";

export function AppNavigator() {
  const { user, isGuest } = useAuthStore();

  if (!user && !isGuest) {
    return <LoginScreen />;
  }

  return <HomeScreen />;
}
