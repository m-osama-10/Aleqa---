/* ================================================================== */
/*  AdminNotificationsScreen                                          */
/* ================================================================== */
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { supabase } from "../../api/supabase";
import { useLang } from "../../utils/i18n";
import { COLORS } from "../../utils/constants";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import type { AppNotification } from "../../types/db";

export function AdminNotificationsScreen() {
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const [items, setItems] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [broadcast, setBroadcast] = useState(true);
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from("notifications").select("*").is("deleted_at", null).order("created_at", { ascending: false }).limit(50);
    setItems((data ?? []) as AppNotification[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const send = async () => {
    if (!title || !body) return;
    setSending(true);
    await supabase.from("notifications").insert({ title, body, is_broadcast: broadcast, type: "system", is_read: false });
    setTitle(""); setBody(""); setSending(false);
    load();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <FlatList
      style={s.container}
      data={items}
      keyExtractor={(i) => i.id}
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={
        <View style={s.form}>
          <Text style={s.formTitle}>{isRtl ? "إرسال إشعار" : "Send Notification"}</Text>
          <TextInput style={s.input} placeholder={isRtl ? "العنوان" : "Title"} placeholderTextColor={COLORS.textMuted} value={title} onChangeText={setTitle} />
          <TextInput style={[s.input, { minHeight: 60 }]} placeholder={isRtl ? "المحتوى" : "Body"} placeholderTextColor={COLORS.textMuted} value={body} onChangeText={setBody} multiline />
          <View style={s.row}>
            <Text style={s.label}>{isRtl ? "للجميع" : "Broadcast"}</Text>
            <Switch value={broadcast} onValueChange={setBroadcast} />
          </View>
          <Pressable style={[s.btn, sending && { opacity: 0.6 }]} onPress={send} disabled={sending}>
            <Text style={s.btnText}>{isRtl ? "إرسال" : "Send"}</Text>
          </Pressable>
        </View>
      }
      ListEmptyComponent={<Text style={s.empty}>{isRtl ? "لا توجد إشعارات" : "No notifications"}</Text>}
      renderItem={({ item }) => (
        <View style={s.card}>
          <View style={s.cardHead}>
            <Text style={s.cardTitle}>{item.title}</Text>
            {item.is_broadcast && <View style={s.badge}><Text style={s.badgeText}>broadcast</Text></View>}
          </View>
          <Text style={s.cardBody}>{item.body}</Text>
          <Text style={s.cardDate}>{new Date(item.created_at).toLocaleString()}</Text>
        </View>
      )}
    />
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  form: { backgroundColor: COLORS.surface, padding: 14, borderRadius: 12, marginBottom: 16 },
  formTitle: { fontSize: 16, fontWeight: "bold", color: COLORS.text, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 10, marginBottom: 10, color: COLORS.text, fontSize: 14, textAlignVertical: "top" },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  label: { fontSize: 14, color: COLORS.text },
  btn: { backgroundColor: COLORS.primary, paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "bold" },
  card: { backgroundColor: COLORS.surface, padding: 12, borderRadius: 10, marginBottom: 8 },
  cardHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardTitle: { fontSize: 14, fontWeight: "bold", color: COLORS.text, flex: 1 },
  badge: { backgroundColor: COLORS.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  badgeText: { fontSize: 9, color: "#fff", fontWeight: "bold" },
  cardBody: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
  cardDate: { fontSize: 10, color: COLORS.textMuted, marginTop: 4, opacity: 0.7 },
  empty: { textAlign: "center", marginTop: 40, color: COLORS.textMuted },
});
