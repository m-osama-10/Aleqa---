/* ================================================================== */
/*  AdminAdsScreen                                                    */
/* ================================================================== */
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../../api/supabase";
import { useLang } from "../../utils/i18n";
import { COLORS } from "../../utils/constants";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import type { Ad } from "../../types/db";

export function AdminAdsScreen() {
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", image_url: "", link_url: "", button_text: "", placement: "home", priority: "0" });

  const load = useCallback(async () => {
    const { data } = await supabase.from("ads").select("*").is("deleted_at", null).order("created_at", { ascending: false });
    setAds((data ?? []) as Ad[]);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggle = async (a: Ad) => {
    await supabase.from("ads").update({ enabled: !a.enabled }).eq("id", a.id);
    load();
  };

  const remove = async (a: Ad) => {
    await supabase.from("ads").update({ deleted_at: new Date().toISOString() }).eq("id", a.id);
    load();
  };

  const submit = async () => {
    if (!form.title) return;
    await supabase.from("ads").insert({
      ...form,
      priority: Number(form.priority) || 0,
      enabled: true,
      start_date: new Date().toISOString(),
      end_date: new Date(Date.now() + 90 * 86400000).toISOString(),
    });
    setShowForm(false);
    setForm({ title: "", description: "", image_url: "", link_url: "", button_text: "", placement: "home", priority: "0" });
    load();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <View style={s.container}>
      <Pressable style={s.fab} onPress={() => setShowForm(true)}>
        <Text style={s.fabText}>+ {isRtl ? "إعلان" : "New Ad"}</Text>
      </Pressable>

      <FlatList
        data={ads}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} />}
        ListEmptyComponent={<Text style={s.empty}>{isRtl ? "لا توجد إعلانات" : "No ads"}</Text>}
        renderItem={({ item }) => (
          <View style={[s.card, !item.enabled && s.disabled]}>
            <View style={s.cardTop}>
              <View style={{ flex: 1 }}>
                <Text style={s.adTitle}>{item.title}</Text>
                <Text style={s.adDesc}>{item.description}</Text>
              </View>
              <Switch value={item.enabled} onValueChange={() => toggle(item)} />
            </View>
            <View style={s.tags}>
              <Text style={s.tag}>{item.placement}</Text>
              <Text style={s.tag}>P:{item.priority}</Text>
              <Text style={s.tag}>👁 {item.impressions}</Text>
              <Text style={s.tag}>👆 {item.clicks}</Text>
            </View>
            <Pressable style={s.delBtn} onPress={() => remove(item)}>
              <Text style={s.delText}>{isRtl ? "حذف" : "Delete"}</Text>
            </Pressable>
          </View>
        )}
      />

      <Modal visible={showForm} animationType="slide" transparent>
        <View style={s.modalBg}>
          <View style={s.modalCard}>
            <Text style={s.modalTitle}>{isRtl ? "إعلان جديد" : "New Ad"}</Text>
            <TextInput style={s.input} placeholder={isRtl ? "العنوان" : "Title"} placeholderTextColor={COLORS.textMuted} value={form.title} onChangeText={(v) => setForm({ ...form, title: v })} />
            <TextInput style={s.input} placeholder={isRtl ? "الوصف" : "Description"} placeholderTextColor={COLORS.textMuted} value={form.description} onChangeText={(v) => setForm({ ...form, description: v })} multiline />
            <TextInput style={s.input} placeholder="Image URL" placeholderTextColor={COLORS.textMuted} value={form.image_url} onChangeText={(v) => setForm({ ...form, image_url: v })} />
            <TextInput style={s.input} placeholder="Link URL" placeholderTextColor={COLORS.textMuted} value={form.link_url} onChangeText={(v) => setForm({ ...form, link_url: v })} />
            <TextInput style={s.input} placeholder={isRtl ? "نص الزر" : "Button text"} placeholderTextColor={COLORS.textMuted} value={form.button_text} onChangeText={(v) => setForm({ ...form, button_text: v })} />
            <View style={s.row2}>
              <TextInput style={[s.input, { flex: 1 }]} placeholder="placement" placeholderTextColor={COLORS.textMuted} value={form.placement} onChangeText={(v) => setForm({ ...form, placement: v })} />
              <TextInput style={[s.input, { flex: 1 }]} placeholder="priority" placeholderTextColor={COLORS.textMuted} value={form.priority} onChangeText={(v) => setForm({ ...form, priority: v })} keyboardType="numeric" />
            </View>
            <View style={s.modalActions}>
              <Pressable style={[s.modalBtn, { backgroundColor: COLORS.muted }]} onPress={() => setShowForm(false)}>
                <Text style={s.modalBtnText}>{isRtl ? "إلغاء" : "Cancel"}</Text>
              </Pressable>
              <Pressable style={[s.modalBtn, { backgroundColor: COLORS.primary }]} onPress={submit}>
                <Text style={s.modalBtnText}>{isRtl ? "حفظ" : "Save"}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  fab: { position: "absolute", bottom: 16, right: 16, backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingVertical: 14, borderRadius: 30, zIndex: 10, elevation: 4 },
  fabText: { color: "#fff", fontWeight: "bold" },
  card: { backgroundColor: COLORS.surface, padding: 12, borderRadius: 12, marginBottom: 10 },
  disabled: { opacity: 0.5 },
  cardTop: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  adTitle: { fontSize: 14, fontWeight: "bold", color: COLORS.text },
  adDesc: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 },
  tag: { fontSize: 10, backgroundColor: COLORS.muted, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, color: COLORS.text },
  delBtn: { marginTop: 8, alignSelf: "flex-end", paddingHorizontal: 12, paddingVertical: 6, backgroundColor: "#ef4444", borderRadius: 6 },
  delText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  empty: { textAlign: "center", marginTop: 40, color: COLORS.textMuted },
  modalBg: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "rgba(0,0,0,0.5)" },
  modalCard: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, maxHeight: "85%" },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.text, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 10, marginBottom: 10, color: COLORS.text, fontSize: 14, textAlignVertical: "top" },
  row2: { flexDirection: "row", gap: 8 },
  modalActions: { flexDirection: "row", gap: 8, marginTop: 8 },
  modalBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  modalBtnText: { color: "#fff", fontWeight: "bold" },
});
