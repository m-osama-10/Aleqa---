/* ================================================================== */
/*  AdBanner — compact horizontal ad banner                            */
/* ================================================================== */

import React, { useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Linking } from "react-native";
import { trackAdClick, trackAdImpression } from "../api/ads";
import { COLORS } from "../utils/constants";
import type { Ad } from "../types/db";

export function AdBanner({ ad }: { ad: Ad }) {
  useEffect(() => {
    void trackAdImpression(ad.id);
  }, [ad.id]);

  const open = async () => {
    void trackAdClick(ad.id);
    if (ad.link_url) {
      try {
        await Linking.openURL(ad.link_url);
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <Pressable style={styles.wrap} onPress={open}>
      {ad.image_url ? (
        <Image source={{ uri: ad.image_url }} style={styles.image} resizeMode="cover" />
      ) : null}
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>{ad.title}</Text>
        {ad.description ? (
          <Text style={styles.desc} numberOfLines={1}>{ad.description}</Text>
        ) : null}
      </View>
      {ad.button_text ? (
        <View style={styles.btn}>
          <Text style={styles.btnText}>{ad.button_text}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
  },
  image: { width: 48, height: 48, borderRadius: 8 },
  body: { flex: 1 },
  title: { fontSize: 14, fontWeight: "700", color: COLORS.textPrimary },
  desc: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  btn: {
    backgroundColor: COLORS.brand,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 12 },
});
