/* ================================================================== */
/*  AdminDashboardScreen                                              */
/* ================================================================== */
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { supabase } from "../../api/supabase";
import { useLang } from "../../utils/i18n";
import { COLORS } from "../../utils/constants";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import type { AdminStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AdminStackParamList, "AdminDashboard">;

interface Stats {
  totalUsers: number;
  totalCalculators: number;
  totalAds: number;
  activeAds: number;
  totalFeedback: number;
  openFeedback: number;
}

export function AdminDashboardScreen({ navigation }: Props) {
  const { t, lang } = useLang();
  const isRtl = lang === "ar";
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [u, a, f, c] = await Promise.all([
          supabase.from("profiles").select("*", { count: "exact", head: true }),
          supabase.from("ads").select("*").is("deleted_at", null),
          supabase.from("feedback").select("*").is("deleted_at", null),
          supabase.from("calculators").select("*", { count: "exact", head: true }).is("deleted_at", null),
        ]);
        setStats({
          totalUsers: u.count ?? 0,
          totalCalculators: c.count ?? 0,
          totalAds: a.data?.length ?? 0,
          activeAds: a.data?.filter((x: any) => x.enabled).length ?? 0,
          totalFeedback: f.data?.length ?? 0,
          openFeedback: f.data?.filter((x: any) => x.status === "open").length ?? 0,
        });
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!stats) return <Text style={s.empty}>{isRtl ? "لا توجد بيانات" : "No data"}</Text>;

  const cards = [
    { label: isRtl ? "المستخدمون" : "Users", value: stats.totalUsers, color: COLORS.primary, nav: "AdminUsers" as const },
    { label: isRtl ? "الآلات الحاسبة" : "Calculators", value: stats.totalCalculators, color: "#3b82f6", nav: "AdminCategories" as const },
    { label: isRtl ? "الإعلانات النشطة" : "Active Ads", value: `${stats.activeAds}/${stats.totalAds}`, color: "#f59e0b", nav: "AdminAds" as const },
    { label: isRtl ? "ملاحظات مفتوحة" : "Open Feedback", value: `${stats.openFeedback}/${stats.totalFeedback}`, color: "#ef4444", nav: "AdminAnalytics" as const },
  ];

  const links = [
    { label: isRtl ? "إدارة المستخدمين" : "Manage Users", nav: "AdminUsers" as const },
    { label: isRtl ? "إدارة الإعلانات" : "Manage Ads", nav: "AdminAds" as const },
    { label: isRtl ? "الإعدادات" : "Settings", nav: "AdminSettings" as const },
    { label: isRtl ? "إرسال إشعار" : "Send Notification", nav: "AdminNotifications" as const },
    { label: isRtl ? "التصنيفات" : "Categories", nav: "AdminCategories" as const },
    { label: isRtl ? "التحليلات" : "Analytics", nav: "AdminAnalytics" as const },
  ];

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <Text style={s.title}>{isRtl ? "نظرة عامة" : "Overview"}</Text>
      <View style={s.grid}>
        {cards.map((c) => (
          <View key={c.label} style={s.card}>
            <Text style={[s.cardValue, { color: c.color }]}>{c.value}</Text>
            <Text style={s.cardLabel}>{c.label}</Text>
          </View>
        ))}
      </View>
      <View style={s.links}>
        {links.map((l) => (
          <View key={l.nav} style={s.linkRow}>
            <Text
              style={s.linkText}
              onPress={() => navigation.navigate(l.nav)}
            >
              {l.label} →
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", color: COLORS.text, marginBottom: 16 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: { flex: 1, minWidth: 140, backgroundColor: COLORS.surface, padding: 16, borderRadius: 12 },
  cardValue: { fontSize: 28, fontWeight: "bold" },
  cardLabel: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
  links: { marginTop: 24, gap: 8 },
  linkRow: { backgroundColor: COLORS.surface, padding: 14, borderRadius: 10 },
  linkText: { fontSize: 15, fontWeight: "600", color: COLORS.primary },
  empty: { textAlign: "center", marginTop: 40, color: COLORS.textMuted },
});
