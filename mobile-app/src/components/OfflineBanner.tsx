/* ================================================================== */
/*  OfflineBanner — shown when device goes offline                     */
/* ================================================================== */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../utils/constants";

export function OfflineBanner({
  visible,
  pending = 0,
}: {
  visible: boolean;
  pending?: number;
}) {
  if (!visible) return null;
  return (
    <View style={styles.wrap}>
      <Text style={styles.emoji}>📡</Text>
      <Text style={styles.text}>
        {pending > 0
          ? `أنت غير متصل — ${pending} تغيير بانتظار المزامنة`
          : "أنت غير متصل — التغييرات ستُزامن عند عودة الاتصال"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  emoji: { fontSize: 14 },
  text: { color: "#3a2c08", fontSize: 12, fontWeight: "600", textAlign: "center" },
});
