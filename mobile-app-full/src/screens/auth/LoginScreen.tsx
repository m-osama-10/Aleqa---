/* ================================================================== */
/*  LoginScreen                                                        */
/* ================================================================== */

import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuth } from "../../hooks/useAuth";
import { useLang } from "../../utils/i18n";
import { COLORS } from "../../utils/constants";
import { validateEmail, validatePassword } from "../../utils/validation";
import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const { t, lang } = useLang();
  const { signIn, signInAsGuest, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const onSubmit = async () => {
    clearError();
    setLocalError(null);
    const ev = validateEmail(email);
    if (!ev.ok) {
      setLocalError(t(ev.error!));
      return;
    }
    const pv = validatePassword(password);
    if (!pv.ok) {
      setLocalError(t(pv.error!));
      return;
    }
    try {
      await signIn(email, password);
      // The root navigator will auto-redirect on auth change.
    } catch {
      /* error surfaced via store */
    }
  };

  const onGuest = async () => {
    await signInAsGuest();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.brandBlock}>
          <Text style={styles.brandEmoji}>🌾</Text>
          <Text style={styles.brandName}>{t("common.app_name")}</Text>
          <Text style={styles.brandSub}>{t("common.app_sub")}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>{t("auth.login")}</Text>

          <Field label={t("auth.email")}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
            />
          </Field>

          <Field label={t("auth.password")}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••"
              placeholderTextColor={COLORS.textMuted}
              secureTextEntry
              textContentType="password"
            />
          </Field>

          {(localError || error) && (
            <Text style={styles.errorText}>{localError ?? error}</Text>
          )}

          <Pressable
            style={[styles.btn, styles.btnPrimary, loading && styles.btnDisabled]}
            onPress={onSubmit}
            disabled={loading}
          >
            <Text style={styles.btnPrimaryText}>
              {loading ? t("common.loading") : t("auth.sign_in_btn")}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("ForgotPassword")}
            style={styles.linkRow}
          >
            <Text style={styles.link}>{t("auth.forgot")}</Text>
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={[styles.btn, styles.btnGhost]}
            onPress={onGuest}
            disabled={loading}
          >
            <Text style={styles.btnGhostText}>{t("auth.guest_btn")}</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={styles.linkRow}
          >
            <Text style={styles.mutedLink}>
              {t("auth.no_account")}{" "}
              <Text style={styles.linkInline}>{t("auth.sign_up_link")}</Text>
            </Text>
          </Pressable>
        </View>

        <Text style={styles.footerNote}>
          {lang === "ar"
            ? "تطبيق مجاني · يعمل أوفلاين · بياناتك على جهازك"
            : "Free · Offline · Your data stays on your device"}
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { padding: 24, paddingTop: 60 },
  brandBlock: { alignItems: "center", marginBottom: 24 },
  brandEmoji: { fontSize: 64 },
  brandName: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.brand,
    marginTop: 8,
  },
  brandSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 16,
    textAlign: "center",
  },
  field: { marginBottom: 14 },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.bg,
  },
  btn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
  },
  btnPrimary: { backgroundColor: COLORS.brand },
  btnPrimaryText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  btnGhost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.brand,
  },
  btnGhostText: { color: COLORS.brand, fontWeight: "700" },
  btnDisabled: { opacity: 0.6 },
  linkRow: { alignItems: "center", marginTop: 12 },
  link: { color: COLORS.brand, fontSize: 13, fontWeight: "600" },
  mutedLink: { color: COLORS.textSecondary, fontSize: 13 },
  linkInline: { color: COLORS.brand, fontWeight: "700" },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },
  footerNote: {
    color: COLORS.textMuted,
    fontSize: 11,
    textAlign: "center",
    marginTop: 24,
  },
});
