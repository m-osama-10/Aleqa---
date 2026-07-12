/* ================================================================== */
/*  AdminSettingsScreen                                               */
/* ================================================================== */
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { supabase } from "../../api/supabase";
import { useLang } from "../../utils/i18n";
import { COLORS } from "../../utils/constants";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import type { Setting } from "../../types/db";

export function AdminSettingsScreen() {
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const [items, setItems] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    const { data } = await supabase.from("settings").select("*").is("deleted_at", null).order("category").order("key");
    setItems((data ?? []) as Setting[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async (s: Setting) => {
    const val = drafts[s.key] ?? s.value;
    await supabase.from("settings").update({ value: val }).eq("id", s.id);
    setDrafts((p) => { const n = { ...p }; delete n[s.key]; return n; });
    load();
  };

  if (loading) return <LoadingSpinner />;

  const renderItem = ({ item }: { item: Setting }) => (
    <View style={s.row}>
      <View style={s.info}>
        <Text style={s.key}>{item.key}</Text>
        <Text style={s.desc}>{item.description}</Text>
      </View>
      <View style={s.control}>
        {item.value_type === "boolean" ? (
          <Switch
            value={(drafts[item.key] ?? item.value) === "true"}
            onValueChange={(v) => setDrafts({ ...drafts, [item.key]: v ? "true" : "false" })}
          />
        ) : (
          <TextInput
            style={s.input}
            value={drafts[item.key] ?? item.value}
            onChangeText={(v) => setDrafts({ ...drafts, [item.key]: v })}
          />
        )}
        <Pressable style={s.saveBtn} onPress={() => save(item)}>
          <Text style={s.saveText}>✓</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <FlatList
      style={s.container}
      data={items}
      keyExtractor={(i) => i.id}
      renderItem={renderItem}
      ListEmptyComponent={<Text style={s.empty}>{isRtl ? "لا توجد إعدادات" : "No settings"}</Text>}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  row: { flexDirection: "row", backgroundColor: COLORS.surface, padding: 12, borderRadius: 10, marginBottom: 8, alignItems: "center", gap: 8 },
  info: { flex: 1 },
  key: { fontSize: 13, fontWeight: "bold", color: COLORS.text },
  desc: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  control: { flexDirection: "row", alignItems: "center", gap: 6 },
  input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 6, padding: 6, width: 120, color: COLORS.text, fontSize: 12 },
  saveBtn: { width: 32, height: 32, borderRadius: 6, backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center" },
  saveText: { color: "#fff", fontWeight: "bold" },
  empty: { textAlign: "center", marginTop: 40, color: COLORS.textMuted },
});
