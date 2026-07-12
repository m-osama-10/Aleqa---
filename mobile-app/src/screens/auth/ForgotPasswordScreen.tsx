/* ================================================================== */
/*  ForgotPasswordScreen                                               */
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
import { validateEmail } from "../../utils/validation";
import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "ForgotPassword">;

export function ForgotPasswordScreen({ navigation }: Props) {
  const { t } = useLang();
  const { sendReset, loading, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const onSubmit = async () => {
    clearError();
    setLocalError(null);
    const ev = validateEmail(email);
    if (!ev.ok) {
      setLocalError(t(ev.error!));
      return;
    }
    try {
      await sendReset(email);
      setSent(true);
    } catch {
      /* surfaced via store */
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.brandBlock}>
          <Text style={styles.brandEmoji}>🔑</Text>
          <Text style={styles.title}>{t("auth.forgot")}</Text>
        </View>

        {sent ? (
          <View style={styles.card}>
            <Text style={styles.successEmoji}>✅</Text>
            <Text style={styles.successText}>{t("auth.reset_sent")}</Text>
            <Pressable
              style={[styles.btn, styles.btnPrimary]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.btnPrimaryText}>{t("common.back")}</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.card}>
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

            {localError && <Text style={styles.errorText}>{localError}</Text>}

            <Pressable
              style={[styles.btn, styles.btnPrimary, loading && styles.btnDisabled]}
              onPress={onSubmit}
              disabled={loading}
            >
              <Text style={styles.btnPrimaryText}>
                {loading ? t("common.loading") : t("auth.reset_btn")}
              </Text>
            </Pressable>

            <Pressable onPress={() => navigation.goBack()} style={styles.linkRow}>
              <Text style={styles.link}>{t("common.back")}</Text>
            </Pressable>
          </View>
        )}
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
  brandEmoji: { fontSize: 56 },
  title: { fontSize: 22, fontWeight: "800", color: COLORS.textPrimary, marginTop: 8 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
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
  btn: { paddingVertical: 14, borderRadius: 12, alignItems: "center", marginTop: 6 },
  btnPrimary: { backgroundColor: COLORS.brand },
  btnPrimaryText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  btnDisabled: { opacity: 0.6 },
  linkRow: { alignItems: "center", marginTop: 14 },
  link: { color: COLORS.brand, fontSize: 13, fontWeight: "600" },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
  },
  successEmoji: { fontSize: 48, textAlign: "center", marginBottom: 8 },
  successText: {
    color: COLORS.brand,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 14,
    lineHeight: 20,
  },
});
