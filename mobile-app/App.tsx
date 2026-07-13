/**
 * Alieqa Mobile App — WebView wrapper around the web app.
 * The web app (Next.js) handles ALL features: calculator, Supabase,
 * auth, ads, admin dashboard. This native shell just renders it
 * inside a WebView and provides native status bar + offline fallback.
 */

import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  Platform,
  Linking,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Constants from "expo-constants";

const APP_URL =
  (Constants.expoConfig?.extra as { appUrl?: string })?.appUrl ||
  "https://alieqa.vercel.app";

// Brand color (agricultural green)
const BRAND_COLOR = "#2E7D4F";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleNavigationStateChange = useCallback((navState: any) => {
    // Allow only the app URL + Supabase auth URLs
    const url = navState.url as string;
    if (
      !url.startsWith(APP_URL) &&
      !url.startsWith("https://lepdythxcdurjwncxnnt.supabase.co") &&
      !url.startsWith("https://alieqa") &&
      !url.startsWith("about:blank")
    ) {
      // External link — open in system browser, block in WebView
      if (!navState.loading) {
        Linking.openURL(url).catch(() => {});
      }
      return false;
    }
    return true;
  }, []);

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={BRAND_COLOR} />
      <Text style={styles.loadingText}>جارٍ تحميل عليقة...</Text>
      <Text style={styles.loadingSub}>حاسبة العليقة الذكية</Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorEmoji}>📡</Text>
      <Text style={styles.errorTitle}>لا يوجد اتصال بالإنترنت</Text>
      <Text style={styles.errorDesc}>
        التطبيق يحتاج اتصال بالإنترنت لتحميل المحتوى. تأكد من اتصالك ثم أعد المحاولة.
      </Text>
      <Text
        style={styles.retryBtn}
        onPress={() => {
          setError(false);
          setLoading(true);
        }}
      >
        إعادة المحاولة
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ExpoStatusBar style="light" backgroundColor={BRAND_COLOR} />
      <StatusBar
        barStyle="light-content"
        backgroundColor={BRAND_COLOR}
        translucent={false}
      />
      <WebView
        source={{ uri: APP_URL }}
        style={styles.webview}
        onMessage={(e) => {
          // Handle messages from the web app if needed in the future
          console.log("WebView message:", e.nativeEvent.data);
        }}
        onNavigationStateChange={handleNavigationStateChange}
        onShouldStartLoadWithRequest={handleNavigationStateChange}
        renderLoading={renderLoading}
        renderError={() => renderError()}
        startInLoadingState
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        allowsBackForwardNavigationGestures
        pullToRefreshEnabled
        onHttpError={(e) => {
          console.log("HTTP error:", e.nativeEvent.statusCode);
          if (e.nativeEvent.statusCode >= 500) setError(true);
        }}
        onError={(e) => {
          console.log("WebView error:", e.nativeEvent.description);
          setError(true);
        }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        userAgent="AlieqaMobileApp/1.0.0 (Android)"
        cacheEnabled
        incognito={false}
      />
      {loading && !error && renderLoading()}
      {error && renderError()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND_COLOR,
    paddingTop: Platform.OS === "android" ? 0 : 0,
  },
  webview: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    zIndex: 10,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  loadingSub: {
    marginTop: 4,
    fontSize: 13,
    color: "#6b7280",
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 32,
    zIndex: 20,
  },
  errorEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
    textAlign: "center",
  },
  errorDesc: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  retryBtn: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: BRAND_COLOR,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 10,
    overflow: "hidden",
  },
});
