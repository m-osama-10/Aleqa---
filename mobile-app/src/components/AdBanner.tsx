import React from "react";
import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import { WebView } from "react-native-webview";
import { COLORS, AD_NETWORKS } from "../utils/constants";

function buildBannerHtml(key: string, w: number, h: number): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;padding:0;background:transparent;display:flex;justify-content:center;align-items:center;overflow:hidden;}</style>
</head><body>
<script>atOptions={key:'${key}',format:'iframe',height:${h},width:${w},params:{}};</script>
<script src="https://www.highperformanceformat.com/${key}/invoke.js"></script>
</body></html>`;
}

function buildNativeBannerHtml(): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;padding:0;background:transparent;}</style>
</head><body>
<script async data-cfasync="false" src="${AD_NETWORKS.nativeBanner.src}"></script>
<div id="${AD_NETWORKS.nativeBanner.container}"></div>
</body></html>`;
}

export function AdBanner({ size, style }: { size: "320x50" | "468x60" | "728x90" | "160x300"; style?: any }) {
  const cfg = AD_NETWORKS.banners[size];
  const html = buildBannerHtml(cfg.key, cfg.w, cfg.h);
  return (
    <View style={[styles.adWrap, { height: cfg.h }, style]}>
      <Text style={styles.adLabel}>إعلان</Text>
      <WebView
        source={{ html }}
        style={{ flex: 1, backgroundColor: "transparent" }}
        scrollEnabled={false}
        javaScriptEnabled
        originWhitelist={["*"]}
      />
    </View>
  );
}

export function AdNative({ style }: { style?: any }) {
  const html = buildNativeBannerHtml();
  return (
    <View style={[styles.adWrap, { height: 200 }, style]}>
      <Text style={styles.adLabel}>إعلان</Text>
      <WebView
        source={{ html }}
        style={{ flex: 1, backgroundColor: "transparent" }}
        scrollEnabled={false}
        javaScriptEnabled
        originWhitelist={["*"]}
      />
    </View>
  );
}

export function AdSmartlink({ style }: { style?: any }) {
  return (
    <Pressable style={[styles.smartlink, style]} onPress={() => Linking.openURL(AD_NETWORKS.smartlink)}>
      <Text style={styles.smartlinkStar}>★</Text>
      <Text style={styles.smartlinkText}>اعرض أفضل العروض</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  adWrap: {
    backgroundColor: COLORS.muted,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  adLabel: {
    position: "absolute",
    top: 2,
    right: 6,
    zIndex: 2,
    fontSize: 8,
    color: COLORS.textMuted,
    opacity: 0.6,
  },
  smartlink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primary + "40",
  },
  smartlinkStar: { fontSize: 16, color: COLORS.primary },
  smartlinkText: { fontSize: 14, fontWeight: "700", color: COLORS.text },
});
