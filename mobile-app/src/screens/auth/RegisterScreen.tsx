/* ================================================================== */
/*  RegisterScreen                                                     */
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
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from "../../utils/validation";
import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export function RegisterScreen({ navigation }: Props) {
  const { t } = useLang();
  const { signUp, loading, error, clearError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const onSubmit = async () => {
    clearError();
    setLocalError(null);
    if (!name.trim()) {
      setLocalError(t("auth.full_name"));
      return;
    }
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
    const mv = validatePasswordMatch(password, confirm);
    if (!mv.ok) {
      setLocalError(t(mv.error!));
      return;
    }
    try {
      await signUp(email, password, name.trim(), phone.trim() || undefined);
    } catch {
      /* surfaced via store */
    }
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
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>{t("auth.register")}</Text>

          <Field label={t("auth.full_name")}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="محمد أحمد"
              placeholderTextColor={COLORS.textMuted}
            />
          </Field>

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

          <Field label={t("auth.phone")}>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="01xxxxxxxxx"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="phone-pad"
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
              textContentType="newPassword"
            />
          </Field>

          <Field label={t("auth.confirm_password")}>
            <TextInput
              style={styles.input}
              value={confirm}
              onChangeText={setConfirm}
              placeholder="••••••"
              placeholderTextColor={COLORS.textMuted}
              secureTextEntry
              textContentType="newPassword"
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
              {loading ? t("common.loading") : t("auth.sign_up_btn")}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.linkRow}
          >
            <Text style={styles.mutedLink}>
              {t("auth.have_account")}{" "}
              <Text style={styles.linkInline}>{t("auth.sign_in_link")}</Text>
            </Text>
          </Pressable>
        </View>
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
  scroll: { padding: 24, paddingTop: 40 },
  brandBlock: { alignItems: "center", marginBottom: 16 },
  brandEmoji: { fontSize: 48 },
  brandName: { fontSize: 22, fontWeight: "900", color: COLORS.brand, marginTop: 4 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 14,
    textAlign: "center",
  },
  field: { marginBottom: 12 },
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
    marginTop: 8,
  },
  btnPrimary: { backgroundColor: COLORS.brand },
  btnPrimaryText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  btnDisabled: { opacity: 0.6 },
  linkRow: { alignItems: "center", marginTop: 14 },
  mutedLink: { color: COLORS.textSecondary, fontSize: 13 },
  linkInline: { color: COLORS.brand, fontWeight: "700" },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
  },
});
