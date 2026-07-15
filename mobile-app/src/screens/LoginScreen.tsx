import React, { useState } from "react";
import {
  StyleSheet, View, Text, TextInput, Pressable, Alert, ScrollView, KeyboardAvoidingView, Platform,
} from "react-native";
import { useAuthStore } from "../store/auth";
import { COLORS } from "../utils/constants";

export function LoginScreen() {
  const { signIn, signUp, resetPassword, enterGuest } = useAuthStore();
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (mode === "forgot") {
      if (!email) return Alert.alert("خطأ", "أدخل البريد الإلكتروني");
      setLoading(true);
      try {
        await resetPassword(email);
        Alert.alert("تم", "تحقق من بريدك لإعادة تعيين كلمة المرور");
        setMode("login");
      } catch (e: any) {
        Alert.alert("خطأ", e.message);
      } finally { setLoading(false); }
      return;
    }

    if (!email || !password) return Alert.alert("خطأ", "املأ كل الحقول");
    setLoading(true);
    try {
      if (mode === "login") {
        await signIn(email, password);
      } else {
        await signUp(email, password, fullName);
        Alert.alert("تم", "تحقق من بريدك لتأكيد الحساب، ثم سجل الدخول");
        setMode("login");
      }
    } catch (e: any) {
      Alert.alert("خطأ", e.message);
    } finally { setLoading(false); }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.logo}>
          <Text style={styles.logoEmoji}>🌾</Text>
          <Text style={styles.logoTitle}>عليقة</Text>
          <Text style={styles.logoSub}>حاسبة العليقة الذكية</Text>
        </View>

        <View style={styles.tabs}>
          <Pressable style={[styles.tab, mode === "login" && styles.tabActive]} onPress={() => setMode("login")}>
            <Text style={[styles.tabText, mode === "login" && styles.tabTextActive]}>دخول</Text>
          </Pressable>
          <Pressable style={[styles.tab, mode === "register" && styles.tabActive]} onPress={() => setMode("register")}>
            <Text style={[styles.tabText, mode === "register" && styles.tabTextActive]}>حساب جديد</Text>
          </Pressable>
        </View>

        {mode === "register" && (
          <View style={styles.field}>
            <Text style={styles.label}>الاسم الكامل</Text>
            <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="أحمد محمد" placeholderTextColor={COLORS.textMuted} />
          </View>
        )}

        <View style={styles.field}>
          <Text style={styles.label}>البريد الإلكتروني</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="you@example.com" placeholderTextColor={COLORS.textMuted} keyboardType="email-address" autoCapitalize="none" />
        </View>

        {mode !== "forgot" && (
          <View style={styles.field}>
            <Text style={styles.label}>كلمة المرور</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="••••••••" placeholderTextColor={COLORS.textMuted} secureTextEntry />
          </View>
        )}

        {mode === "login" && (
          <Pressable onPress={() => setMode("forgot")}>
            <Text style={styles.forgotLink}>نسيت كلمة المرور؟</Text>
          </Pressable>
        )}

        <Pressable style={[styles.btn, loading && styles.btnDisabled]} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.btnText}>
            {loading ? "جارٍ..." : mode === "login" ? "تسجيل الدخول" : mode === "register" ? "إنشاء حساب" : "إرسال الرابط"}
          </Text>
        </Pressable>

        {mode === "forgot" && (
          <Pressable onPress={() => setMode("login")}>
            <Text style={styles.forgotLink}>العودة لتسجيل الدخول</Text>
          </Pressable>
        )}

        <View style={styles.divider} />
        <Pressable style={styles.guestBtn} onPress={enterGuest}>
          <Text style={styles.guestBtnText}>الدخول كضيف</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 24, justifyContent: "center", flexGrow: 1 },
  logo: { alignItems: "center", marginBottom: 32 },
  logoEmoji: { fontSize: 56 },
  logoTitle: { fontSize: 32, fontWeight: "900", color: COLORS.primary, marginTop: 8 },
  logoSub: { fontSize: 14, color: COLORS.textMuted, marginTop: 4 },
  tabs: { flexDirection: "row", backgroundColor: COLORS.muted, borderRadius: 10, padding: 4, marginBottom: 24 },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: "center" },
  tabActive: { backgroundColor: COLORS.surface },
  tabText: { fontSize: 14, fontWeight: "700", color: COLORS.textMuted },
  tabTextActive: { color: COLORS.primary },
  field: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "600", color: COLORS.text, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 12, fontSize: 15, color: COLORS.text, backgroundColor: COLORS.surface },
  forgotLink: { color: COLORS.primary, fontSize: 13, fontWeight: "600", textAlign: "left", marginBottom: 16 },
  btn: { backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 10, alignItems: "center" },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: COLORS.white, fontSize: 16, fontWeight: "700" },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 20 },
  guestBtn: { borderWidth: 1, borderColor: COLORS.border, paddingVertical: 14, borderRadius: 10, alignItems: "center" },
  guestBtnText: { color: COLORS.text, fontSize: 14, fontWeight: "600" },
});
