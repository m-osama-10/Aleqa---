/* ================================================================== */
/*  AdminUsersScreen                                                  */
/* ================================================================== */
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../../api/supabase";
import { useLang } from "../../utils/i18n";
import { COLORS } from "../../utils/constants";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import type { Profile } from "../../types/db";

export function AdminUsersScreen() {
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(100);
    setUsers((data ?? []) as Profile[]);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleRole = async (u: Profile) => {
    const newRole = u.role === "admin" ? "user" : "admin";
    await supabase.from("profiles").update({ role: newRole }).eq("id", u.id);
    load();
  };

  const softDelete = async (u: Profile) => {
    await supabase.from("profiles").update({ deleted_at: new Date().toISOString() }).eq("id", u.id);
    load();
  };

  if (loading) return <LoadingSpinner />;

  const renderItem = ({ item }: { item: Profile }) => (
    <View style={s.row}>
      <View style={s.info}>
        <Text style={s.email}>{item.email}</Text>
        <Text style={s.name}>{item.full_name ?? "—"}</Text>
        <View style={s.badges}>
          <View style={[s.badge, item.role === "admin" && s.badgeAdmin]}>
            <Text style={s.badgeText}>{item.role}</Text>
          </View>
          {item.is_guest && <Text style={s.guestTag}>guest</Text>}
        </View>
      </View>
      <View style={s.actions}>
        <Pressable style={s.btn} onPress={() => toggleRole(item)}>
          <Text style={s.btnText}>{item.role === "admin" ? "↓" : "↑"}</Text>
        </Pressable>
        <Pressable style={[s.btn, s.btnDanger]} onPress={() => softDelete(item)}>
          <Text style={s.btnText}>✕</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <FlatList
      style={s.container}
      data={users}
      keyExtractor={(i) => i.id}
      renderItem={renderItem}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} />}
      ListEmptyComponent={<Text style={s.empty}>{isRtl ? "لا يوجد مستخدمون" : "No users"}</Text>}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  row: { flexDirection: "row", backgroundColor: COLORS.surface, padding: 12, borderRadius: 10, marginBottom: 8 },
  info: { flex: 1 },
  email: { fontSize: 13, fontWeight: "600", color: COLORS.text },
  name: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  badges: { flexDirection: "row", gap: 6, marginTop: 6 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, backgroundColor: COLORS.muted },
  badgeAdmin: { backgroundColor: "#f59e0b" },
  badgeText: { fontSize: 10, fontWeight: "bold", color: "#fff" },
  guestTag: { fontSize: 10, color: COLORS.textMuted },
  actions: { flexDirection: "row", gap: 6 },
  btn: { width: 36, height: 36, borderRadius: 8, backgroundColor: COLORS.muted, alignItems: "center", justifyContent: "center" },
  btnDanger: { backgroundColor: "#ef4444" },
  btnText: { color: "#fff", fontWeight: "bold" },
  empty: { textAlign: "center", marginTop: 40, color: COLORS.textMuted },
});
