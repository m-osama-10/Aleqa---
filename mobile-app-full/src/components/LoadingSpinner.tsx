/* ================================================================== */
/*  LoadingSpinner — centered circular indicator                       */
/* ================================================================== */

import React from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import { COLORS } from "../utils/constants";

export function LoadingSpinner({
  size = "large",
  label,
  fullScreen = false,
}: {
  size?: "small" | "large";
  label?: string;
  fullScreen?: boolean;
}) {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size={size} color={COLORS.brand} />
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  fullScreen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  label: {
    marginTop: 12,
    color: COLORS.textSecondary,
    fontSize: 14,
  },
});
