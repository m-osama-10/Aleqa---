/* ================================================================== */
/*  AdminCategoriesScreen                                             */
/* ================================================================== */
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { supabase } from "../../api/supabase";
import { useLang } from "../../utils/i18n";
import { COLORS } from "../../utils/constants";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import type { CalculatorCategory } from "../../types/db";

export function AdminCategoriesScreen() {
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const [cats, setCats] = useState<CalculatorCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data } = await supabase.from("calculator_categories").select("*").is("deleted_at", null).order("sort_order");
    setCats((data ?? []) as CalculatorCategory[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggle = async (c: CalculatorCategory) => {
    await supabase.from("calculator_categories").update({ enabled: !c.enabled }).eq("id", c.id);
    load();
  };

  const remove = async (c: CalculatorCategory) => {
    await supabase.from("calculator_categories").update({ deleted_at: new Date().toISOString() }).eq("id", c.id);
    load();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <FlatList
      style={s.container}
      data={cats}
      keyExtractor={(i) => i.id}
      contentContainerStyle={{ padding: 16 }}
      ListEmptyComponent={<Text style={s.empty}>{isRtl ? "لا توجد تصنيفات" : "No categories"}</Text>}
      renderItem={({ item }) => (
        <View style={s.row}>
          <Text style={s.icon}>{item.icon}</Text>
          <View style={s.info}>
            <Text style={s.name}>{item.name}</Text>
            <Text style={s.slug}>{item.slug}</Text>
          </View>
          <Switch value={item.enabled} onValueChange={() => toggle(item)} />
          <Pressable style={s.delBtn} onPress={() => remove(item)}>
            <Text style={s.delText}>✕</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  row: { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.surface, padding: 12, borderRadius: 10, marginBottom: 8, gap: 10 },
  icon: { fontSize: 28 },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: "bold", color: COLORS.text },
  slug: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  delBtn: { width: 32, height: 32, borderRadius: 6, backgroundColor: "#ef4444", alignItems: "center", justifyContent: "center" },
  delText: { color: "#fff", fontWeight: "bold" },
  empty: { textAlign: "center", marginTop: 40, color: COLORS.textMuted },
});
