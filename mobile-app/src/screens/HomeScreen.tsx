import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet, View, Text, Pressable, ScrollView, TextInput, Alert, FlatList,
} from "react-native";
import { useAuthStore } from "../store/auth";
import { COLORS } from "../utils/constants";
import {
  ANIMALS, ANIMAL_ORDER, INGREDIENTS, INGREDIENT_ORDER,
  type AnimalKey, type FormulationMode, type FormulationResult, type PriceMap, type SavedRation,
} from "../api/feedData";
import { formulateRation } from "../services/rationOptimizer";
import { loadPrices, savePrices, loadRations, saveRation, deleteRation, defaultPrices } from "../services/storage";
import { AdBanner, AdSmartlink, AdNative } from "../components/AdBanner";

type Tab = "calculator" | "prices" | "rations" | "profile";

export function HomeScreen() {
  const [tab, setTab] = useState<Tab>("calculator");
  const { user, signOut } = useAuthStore();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌾 عليقة</Text>
        <Text style={styles.headerSub}>{user?.fullName || user?.email || "ضيف"}</Text>
      </View>

      <View style={styles.content}>
        {tab === "calculator" && <CalculatorTab />}
        {tab === "prices" && <PricesTab />}
        {tab === "rations" && <RationsTab />}
        {tab === "profile" && <ProfileTab onLogout={signOut} />}
      </View>

      <View style={styles.bottomNav}>
        <NavBtn label="الحاسبة" emoji="🧮" active={tab === "calculator"} onPress={() => setTab("calculator")} />
        <NavBtn label="الأسعار" emoji="💰" active={tab === "prices"} onPress={() => setTab("prices")} />
        <NavBtn label="علائقي" emoji="📋" active={tab === "rations"} onPress={() => setTab("rations")} />
        <NavBtn label="حسابي" emoji="👤" active={tab === "profile"} onPress={() => setTab("profile")} />
      </View>
    </View>
  );
}

function NavBtn({ label, emoji, active, onPress }: { label: string; emoji: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable style={[styles.navBtn, active && styles.navBtnActive]} onPress={onPress}>
      <Text style={[styles.navEmoji, active && styles.navEmojiActive]}>{emoji}</Text>
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
    </Pressable>
  );
}

/* ============ CALCULATOR TAB ============ */
function CalculatorTab() {
  const [animalKey, setAnimalKey] = useState<AnimalKey>("dairy_cow");
  const [weight, setWeight] = useState(ANIMALS.dairy_cow.defaultWeight);
  const [production, setProduction] = useState(ANIMALS.dairy_cow.productionDefault);
  const [flockSize, setFlockSize] = useState(ANIMALS.dairy_cow.defaultFlock);
  const [mode, setMode] = useState<FormulationMode>("balanced");
  const [prices, setPrices] = useState<PriceMap>(defaultPrices());
  const [result, setResult] = useState<FormulationResult | null>(null);
  const [rationName, setRationName] = useState("");

  useEffect(() => {
    loadPrices().then(setPrices);
  }, []);

  const compute = useCallback(() => {
    const r = formulateRation(animalKey, weight, production, flockSize, mode, prices);
    setResult(r);
  }, [animalKey, weight, production, flockSize, mode, prices]);

  const animal = ANIMALS[animalKey];

  const handleSave = async () => {
    if (!result) return;
    const name = rationName || `${animal.name} - ${weight}كجم`;
    const ration: SavedRation = {
      id: Date.now().toString(),
      name,
      animalKey,
      weight,
      production,
      flockSize,
      mode,
      result,
      createdAt: new Date().toISOString(),
    };
    await saveRation(ration);
    Alert.alert("تم", "تم حفظ العليقة في علائقي");
    setRationName("");
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
      {/* Top banner ad */}
      <AdBanner size="320x50" style={{ marginBottom: 12 }} />

      {/* Animal selection */}
      <Text style={styles.sectionTitle}>١. اختر الحيوان</Text>
      <View style={styles.animalGrid}>
        {ANIMAL_ORDER.map((k) => {
          const a = ANIMALS[k];
          const active = animalKey === k;
          return (
            <Pressable key={k} style={[styles.animalCard, active && styles.animalCardActive]} onPress={() => {
              setAnimalKey(k);
              setWeight(a.defaultWeight);
              setProduction(a.productionDefault);
              setFlockSize(a.defaultFlock);
            }}>
              <Text style={styles.animalEmoji}>{a.emoji}</Text>
              <Text style={[styles.animalName, active && styles.animalNameActive]}>{a.name}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* Inputs */}
      <Text style={styles.sectionTitle}>٢. بيانات الحيوان</Text>
      <View style={styles.card}>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>الوزن (كجم)</Text>
          <TextInput style={styles.numInput} value={String(weight)} onChangeText={(v) => setWeight(Math.max(0, Number(v) || 0))} keyboardType="numeric" />
        </View>
        {animal.hasProduction && (
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>{animal.productionLabel}</Text>
            <TextInput style={styles.numInput} value={String(production)} onChangeText={(v) => setProduction(Math.max(0, Number(v) || 0))} keyboardType="numeric" />
          </View>
        )}
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>عدد {animal.flockUnit}</Text>
          <TextInput style={styles.numInput} value={String(flockSize)} onChangeText={(v) => setFlockSize(Math.max(1, Number(v) || 1))} keyboardType="numeric" />
        </View>
        <View style={styles.modeRow}>
          <Pressable style={[styles.modeBtn, mode === "balanced" && styles.modeBtnActive]} onPress={() => setMode("balanced")}>
            <Text style={[styles.modeBtnText, mode === "balanced" && styles.modeBtnTextActive]}>متوازن</Text>
          </Pressable>
          <Pressable style={[styles.modeBtn, mode === "economy" && styles.modeBtnActive]} onPress={() => setMode("economy")}>
            <Text style={[styles.modeBtnText, mode === "economy" && styles.modeBtnTextActive]}>اقتصادي</Text>
          </Pressable>
        </View>
      </View>

      <Pressable style={styles.computeBtn} onPress={compute}>
        <Text style={styles.computeBtnText}>🧮 احسب العليقة</Text>
      </Pressable>

      {/* Result */}
      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>التركيبة المقترحة</Text>
          {!result.feasible && (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>⚠️ {result.violations.join("، ")}</Text>
            </View>
          )}
          {INGREDIENT_ORDER.map((k) => {
            const ing = INGREDIENTS[k];
            const share = result.shares[k];
            const kgPerDay = (share / 100) * result.dmi * flockSize;
            return (
              <View key={k} style={styles.resultRow}>
                <Text style={styles.resultIngEmoji}>{ing.emoji}</Text>
                <Text style={styles.resultIngName}>{ing.name}</Text>
                <Text style={styles.resultShare}>{share.toFixed(1)}%</Text>
                <Text style={styles.resultKg}>{kgPerDay.toFixed(1)} كجم</Text>
              </View>
            );
          })}

          <View style={styles.nutritionBox}>
            <Text style={styles.nutritionTitle}>القيمة الغذائية</Text>
            <Text style={styles.nutritionLine}>البروتين: {result.nutrition.cp}% (مطلوب {result.targets.cpMin}%+)</Text>
            <Text style={styles.nutritionLine}>الطاقة (TDN): {result.nutrition.tdn}% (مطلوب {result.targets.tdnMin}%+)</Text>
            <Text style={styles.nutritionLine}>الألياف: {result.nutrition.fiber}% (حد أقصى {result.targets.fiberMax}%)</Text>
            {animal.forageMin > 0 && (
              <Text style={styles.nutritionLine}>الألياف الخشنة: {result.nutrition.forage}% (مطلوب {result.targets.forageMin}%+)</Text>
            )}
          </View>

          <View style={styles.costBox}>
            <Text style={styles.costLine}>التكلفة/كجم: {result.costPerKg} جنيه</Text>
            <Text style={styles.costLine}>التكلفة/يوم للقطيع: {result.costPerDay} جنيه</Text>
            <Text style={styles.costLineBig}>التكلفة/شهر: {result.costPerMonth} جنيه</Text>
          </View>

          {/* In-feed ad */}
          <AdNative style={{ marginVertical: 12 }} />

          <View style={styles.saveRow}>
            <TextInput style={styles.saveInput} value={rationName} onChangeText={setRationName} placeholder="اسم العليقة (اختياري)" placeholderTextColor={COLORS.textMuted} />
            <Pressable style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>💾 حفظ</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Smartlink + bottom banner */}
      <AdSmartlink style={{ marginTop: 12 }} />
      <AdBanner size="320x50" style={{ marginTop: 12, marginBottom: 20 }} />
    </ScrollView>
  );
}

/* ============ PRICES TAB ============ */
function PricesTab() {
  const [prices, setPrices] = useState<PriceMap>(defaultPrices());

  useEffect(() => {
    loadPrices().then(setPrices);
  }, []);

  const updatePrice = (k: keyof PriceMap, val: number) => {
    const next = { ...prices, [k]: val };
    setPrices(next);
    savePrices(next);
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.sectionTitle}>أسعار المكوّنات (جنيه/كجم)</Text>
      <View style={styles.card}>
        {INGREDIENT_ORDER.map((k) => {
          const ing = INGREDIENTS[k];
          return (
            <View key={k} style={styles.priceRow}>
              <Text style={styles.priceEmoji}>{ing.emoji}</Text>
              <View style={styles.priceInfo}>
                <Text style={styles.priceName}>{ing.name}</Text>
                <Text style={styles.priceCat}>{ing.categoryLabel}</Text>
              </View>
              <TextInput
                style={styles.priceInput}
                value={String(prices[k])}
                onChangeText={(v) => updatePrice(k, Number(v) || 0)}
                keyboardType="numeric"
              />
            </View>
          );
        })}
      </View>
      <Text style={styles.pricesNote}>💡 الأسعار تُحفظ على جهازك. عدّلها بأسعار سوقك.</Text>
      <AdBanner size="320x50" style={{ marginTop: 16, marginBottom: 20 }} />
    </ScrollView>
  );
}

/* ============ RATIONS TAB ============ */
function RationsTab() {
  const [rations, setRations] = useState<SavedRation[]>([]);

  const load = async () => {
    setRations(await loadRations());
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    Alert.alert("حذف", "هل تريد حذف هذه العليقة؟", [
      { text: "إلغاء" },
      { text: "حذف", style: "destructive", onPress: async () => { await deleteRation(id); await load(); } },
    ]);
  };

  if (rations.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyEmoji}>📋</Text>
        <Text style={styles.emptyText}>لا توجد علائق محفوظة</Text>
        <Text style={styles.emptySub}>احسب عليقة واحفظها من تبويب الحاسبة</Text>
        <AdBanner size="320x50" style={{ marginTop: 24 }} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.scroll}
      contentContainerStyle={{ padding: 16 }}
      data={rations}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const animal = ANIMALS[item.animalKey];
        return (
          <View style={styles.rationCard}>
            <View style={styles.rationHead}>
              <Text style={styles.rationEmoji}>{animal.emoji}</Text>
              <View style={styles.rationInfo}>
                <Text style={styles.rationName}>{item.name}</Text>
                <Text style={styles.rationMeta}>{animal.name} · {item.weight}كجم · {item.flockSize} {animal.flockUnit}</Text>
              </View>
              <Pressable onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteBtn}>🗑️</Text>
              </Pressable>
            </View>
            <View style={styles.rationStats}>
              <Text style={styles.rationStat}>💰 {item.result.costPerKg} ج/كجم</Text>
              <Text style={styles.rationStat}>📅 {item.result.costPerMonth} ج/شهر</Text>
            </View>
          </View>
        );
      }}
      ListFooterComponent={<AdSmartlink style={{ marginTop: 12 }} />}
    />
  );
}

/* ============ PROFILE TAB ============ */
function ProfileTab({ onLogout }: { onLogout: () => void }) {
  const { user, isGuest } = useAuthStore();
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>{(user?.fullName || user?.email || "ض").charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.profileName}>{user?.fullName || "ضيف"}</Text>
        <Text style={styles.profileEmail}>{user?.email || "وضع الضيف"}</Text>
        {user?.role === "admin" && <Text style={styles.adminBadge}>👑 أدمن</Text>}
      </View>

      <Pressable style={styles.logoutBtn} onPress={onLogout}>
        <Text style={styles.logoutText}>🚪 تسجيل الخروج</Text>
      </Pressable>

      <AdNative style={{ marginTop: 16 }} />
      <AdSmartlink style={{ marginTop: 12, marginBottom: 20 }} />
    </ScrollView>
  );
}

/* ============ STYLES ============ */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { backgroundColor: COLORS.primary, paddingTop: 50, paddingBottom: 16, paddingHorizontal: 20, alignItems: "center" },
  headerTitle: { fontSize: 22, fontWeight: "900", color: COLORS.white },
  headerSub: { fontSize: 12, color: COLORS.white, opacity: 0.8, marginTop: 2 },
  content: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 30 },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: COLORS.text, marginBottom: 12, marginTop: 8 },
  animalGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  animalCard: { width: "31.5%", backgroundColor: COLORS.surface, borderRadius: 12, padding: 12, alignItems: "center", borderWidth: 2, borderColor: "transparent" },
  animalCardActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primary + "10" },
  animalEmoji: { fontSize: 28 },
  animalName: { fontSize: 11, fontWeight: "700", color: COLORS.text, marginTop: 4, textAlign: "center" },
  animalNameActive: { color: COLORS.primary },
  card: { backgroundColor: COLORS.surface, borderRadius: 12, padding: 16, marginBottom: 16 },
  inputRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  inputLabel: { fontSize: 14, fontWeight: "600", color: COLORS.text, flex: 1 },
  numInput: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 8, width: 100, textAlign: "center", fontSize: 15, fontWeight: "700", color: COLORS.primary },
  modeRow: { flexDirection: "row", gap: 8, marginTop: 12 },
  modeBtn: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: COLORS.muted, alignItems: "center" },
  modeBtnActive: { backgroundColor: COLORS.primary },
  modeBtnText: { fontSize: 13, fontWeight: "700", color: COLORS.textMuted },
  modeBtnTextActive: { color: COLORS.white },
  computeBtn: { backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 12, alignItems: "center", marginBottom: 16 },
  computeBtnText: { color: COLORS.white, fontSize: 17, fontWeight: "800" },
  resultCard: { backgroundColor: COLORS.surface, borderRadius: 12, padding: 16, marginBottom: 16 },
  resultTitle: { fontSize: 17, fontWeight: "800", color: COLORS.text, marginBottom: 12 },
  warningBox: { backgroundColor: COLORS.danger + "15", borderRadius: 8, padding: 10, marginBottom: 12 },
  warningText: { color: COLORS.danger, fontSize: 12, fontWeight: "600" },
  resultRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  resultIngEmoji: { fontSize: 20, marginRight: 8 },
  resultIngName: { flex: 1, fontSize: 13, fontWeight: "600", color: COLORS.text },
  resultShare: { fontSize: 13, fontWeight: "700", color: COLORS.primary, width: 60, textAlign: "center" },
  resultKg: { fontSize: 13, fontWeight: "600", color: COLORS.textMuted, width: 80, textAlign: "left" },
  nutritionBox: { backgroundColor: COLORS.primary + "08", borderRadius: 8, padding: 12, marginTop: 12 },
  nutritionTitle: { fontSize: 13, fontWeight: "700", color: COLORS.primary, marginBottom: 6 },
  nutritionLine: { fontSize: 12, color: COLORS.text, paddingVertical: 2 },
  costBox: { backgroundColor: COLORS.accent + "15", borderRadius: 8, padding: 12, marginTop: 8 },
  costLine: { fontSize: 13, color: COLORS.text, paddingVertical: 2 },
  costLineBig: { fontSize: 16, fontWeight: "800", color: COLORS.primary, marginTop: 4 },
  saveRow: { flexDirection: "row", gap: 8, marginTop: 12 },
  saveInput: { flex: 1, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 10, fontSize: 13, color: COLORS.text },
  saveBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 16, borderRadius: 8, justifyContent: "center" },
  saveBtnText: { color: COLORS.white, fontWeight: "700" },
  priceRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  priceEmoji: { fontSize: 24, marginRight: 12 },
  priceInfo: { flex: 1 },
  priceName: { fontSize: 14, fontWeight: "600", color: COLORS.text },
  priceCat: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  priceInput: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 8, width: 80, textAlign: "center", fontSize: 15, fontWeight: "700", color: COLORS.primary },
  pricesNote: { fontSize: 12, color: COLORS.textMuted, textAlign: "center", marginTop: 12 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center", padding: 40 },
  emptyEmoji: { fontSize: 48 },
  emptyText: { fontSize: 16, fontWeight: "700", color: COLORS.text, marginTop: 12 },
  emptySub: { fontSize: 13, color: COLORS.textMuted, marginTop: 4, textAlign: "center" },
  rationCard: { backgroundColor: COLORS.surface, borderRadius: 12, padding: 14, marginBottom: 10 },
  rationHead: { flexDirection: "row", alignItems: "center" },
  rationEmoji: { fontSize: 32, marginRight: 12 },
  rationInfo: { flex: 1 },
  rationName: { fontSize: 15, fontWeight: "700", color: COLORS.text },
  rationMeta: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  deleteBtn: { fontSize: 20 },
  rationStats: { flexDirection: "row", gap: 16, marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: COLORS.border },
  rationStat: { fontSize: 12, fontWeight: "600", color: COLORS.primary },
  profileCard: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 24, alignItems: "center", marginBottom: 16 },
  profileAvatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: COLORS.primary, justifyContent: "center", alignItems: "center" },
  profileAvatarText: { fontSize: 32, fontWeight: "900", color: COLORS.white },
  profileName: { fontSize: 18, fontWeight: "800", color: COLORS.text, marginTop: 12 },
  profileEmail: { fontSize: 13, color: COLORS.textMuted, marginTop: 2 },
  adminBadge: { marginTop: 8, backgroundColor: COLORS.accent, color: COLORS.white, fontSize: 11, fontWeight: "700", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, overflow: "hidden" },
  logoutBtn: { backgroundColor: COLORS.danger, paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  logoutText: { color: COLORS.white, fontSize: 15, fontWeight: "700" },
  bottomNav: { flexDirection: "row", backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: COLORS.border, paddingBottom: 20, paddingTop: 8 },
  navBtn: { flex: 1, alignItems: "center", paddingVertical: 6 },
  navBtnActive: { backgroundColor: COLORS.primary + "10", borderRadius: 8 },
  navEmoji: { fontSize: 22 },
  navEmojiActive: { transform: [{ scale: 1.1 }] },
  navLabel: { fontSize: 10, color: COLORS.textMuted, marginTop: 2, fontWeight: "600" },
  navLabelActive: { color: COLORS.primary, fontWeight: "800" },
});
