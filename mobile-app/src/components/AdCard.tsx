/* ================================================================== */
/*  AdCard — featured ad block                                         */
/* ================================================================== */

import React, { useEffect } from "react";
import { Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { trackAdClick, trackAdImpression } from "../api/ads";
import { COLORS } from "../utils/constants";
import type { Ad } from "../types/db";

export function AdCard({ ad, lang = "ar" }: { ad: Ad; lang?: "ar" | "en" }) {
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
    <Pressable style={styles.card} onPress={open}>
      {ad.image_url ? (
        <Image source={{ uri: ad.image_url }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={[styles.image, styles.imageFallback]}>
          <Text style={styles.imageEmoji}>📢</Text>
        </View>
      )}
      <View style={styles.body}>
        <Text style={styles.title}>{ad.title}</Text>
        {ad.description ? (
          <Text style={styles.desc} numberOfLines={2}>
            {ad.description}
          </Text>
        ) : null}
        {ad.button_text ? (
          <View style={styles.btn}>
            <Text style={styles.btnText}>{ad.button_text}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.badge}>{lang === "ar" ? "إعلان" : "Sponsored"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    overflow: "hidden",
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  image: {
    width: "100%",
    height: 140,
    backgroundColor: COLORS.brandSoft,
  },
  imageFallback: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageEmoji: { fontSize: 48 },
  body: { padding: 14 },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  desc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 10,
  },
  btn: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.brand,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.55)",
    color: "#fff",
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    overflow: "hidden",
  },
});
