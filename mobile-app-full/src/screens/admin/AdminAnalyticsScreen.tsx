/* ================================================================== */
/*  AdminAnalyticsScreen                                              */
/* ================================================================== */
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { supabase } from "../../api/supabase";
import { useLang } from "../../utils/i18n";
import { COLORS } from "../../utils/constants";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export function AdminAnalyticsScreen() {
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const [data, setData] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [ads, fb, users, fav, hist] = await Promise.all([
          supabase.from("ads").select("impressions,clicks").is("deleted_at", null),
          supabase.from("feedback").select("*").is("deleted_at", null).order("created_at", { ascending: false }).limit(10),
          supabase.from("profiles").select("*", { count: "exact", head: true }).is("deleted_at", null),
          supabase.from("favorites").select("*", { count: "exact", head: true }),
          supabase.from("history").select("*", { count: "exact", head: true }),
        ]);
        const impressions = ads.data?.reduce((s: number, a: any) => s + (a.impressions || 0), 0) ?? 0;
        const clicks = ads.data?.reduce((s: number, a: any) => s + (a.clicks || 0), 0) ?? 0;
        setData({
          totalUsers: users.count ?? 0,
          totalFavorites: fav.count ?? 0,
          totalHistory: hist.count ?? 0,
          adImpressions: impressions,
          adClicks: clicks,
          ctr: impressions > 0 ? Math.round((clicks / impressions) * 1000) / 10 : 0,
        });
        setFeedback(fb.data ?? []);
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!data) return <Text style={s.empty}>{isRtl ? "لا توجد بيانات" : "No data"}</Text>;

  const stats = [
    { label: isRtl ? "المستخدمون" : "Total Users", value: data.totalUsers },
    { label: isRtl ? "المفضلات" : "Favorites", value: data.totalFavorites },
    { label: isRtl ? "السجلات" : "History Items", value: data.totalHistory },
    { label: isRtl ? "مشاهدات الإعلانات" : "Ad Impressions", value: data.adImpressions },
    { label: isRtl ? "نقرات الإعلانات" : "Ad Clicks", value: data.adClicks },
    { label: isRtl ? "معدل النقر %" : "CTR %", value: data.ctr },
  ];

  return (
    <ScrollView style={s.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={s.title}>{isRtl ? "التحليلات" : "Analytics"}</Text>
      <View style={s.grid}>
        {stats.map((s) => (
          <View key={s.label} style={s.card}>
            <Text style={s.cardValue}>{s.value}</Text>
            <Text style={s.cardLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <Text style={s.sectionTitle}>{isRtl ? "أحدث الملاحظات" : "Recent Feedback"}</Text>
      {feedback.length === 0 ? (
        <Text style={s.empty}>{isRtl ? "لا توجد ملاحظات" : "No feedback"}</Text>
      ) : (
        feedback.map((f) => (
          <View key={f.id} style={s.fbCard}>
            <Text style={s.fbSubject}>{f.subject}</Text>
            <Text style={s.fbMessage}>{f.message}</Text>
            {f.rating && <Text style={s.fbRating}>{"⭐".repeat(f.rating)}</Text>}
            <Text style={s.fbStatus}>status: {f.status}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  title: { fontSize: 24, fontWeight: "bold", color: COLORS.text, marginBottom: 16 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: { flex: 1, minWidth: 140, backgroundColor: COLORS.surface, padding: 16, borderRadius: 12 },
  cardValue: { fontSize: 28, fontWeight: "bold", color: COLORS.primary },
  cardLabel: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.text, marginTop: 24, marginBottom: 12 },
  fbCard: { backgroundColor: COLORS.surface, padding: 12, borderRadius: 10, marginBottom: 8 },
  fbSubject: { fontSize: 14, fontWeight: "bold", color: COLORS.text },
  fbMessage: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
  fbRating: { fontSize: 12, marginTop: 4 },
  fbStatus: { fontSize: 10, color: COLORS.textMuted, marginTop: 4 },
  empty: { textAlign: "center", marginTop: 40, color: COLORS.textMuted },
});
