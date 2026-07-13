/* ================================================================== */
/*  RationResultCard — full ration result display                      */
/* ================================================================== */

import React from "react";
import { Pressable, Share, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../utils/constants";
import type { FormulationResult, AnimalKey } from "../api/feedData";
import { ANIMALS } from "../api/feedData";
import { fmt, fmtEGP } from "../utils/helpers";

interface Props {
  result: FormulationResult;
  animalKey: AnimalKey;
  weight: number;
  production: number;
  mode: "balanced" | "economy";
  lang?: "ar" | "en";
  savings?: { amount: number; pct: number } | null;
  onSave?: () => void;
  onShare?: () => void;
  onPrint?: () => void;
}

export function RationResultCard({
  result,
  animalKey,
  weight,
  production,
  mode,
  lang = "ar",
  savings,
  onSave,
  onShare,
  onPrint,
}: Props) {
  const animal = ANIMALS[animalKey];
  const isFlock = animal.hasFlockInput && result.flockSize > 1;
  const isBird = animal.flockUnit === "طائر";

  if (!result.feasible) {
    return (
      <View style={styles.infeasibleCard}>
        <Text style={styles.infeasibleEmoji}>🚫</Text>
        <Text style={styles.infeasibleTitle}>
          {lang === "ar" ? "تعذّر تركيب عليقة" : "Could not formulate a ration"}
        </Text>
        <Text style={styles.infeasibleDesc}>
          {lang === "ar"
            ? "جرّب توسيع الحدود المتاحة أو راجع الأسعار."
            : "Try widening the bounds or check your prices."}
        </Text>
      </View>
    );
  }

  const share = async () => {
    if (onShare) {
      onShare();
      return;
    }
    try {
      const lines = result.components.map(
        (c) => `• ${c.ingredient.name}: ${fmt(c.percent, 1)}% (${fmt(c.kg, 2)} كجم) — ${fmt(c.cost, 2)} ج.م`
      );
      await Share.share({
        message: `🌾 عليقة — ${animal.name}\n` +
          `الوزن: ${fmt(weight, 0)} كجم · ${mode === "economy" ? "اقتصادية" : "متوازنة"}\n\n` +
          lines.join("\n") +
          `\n\n💵 التكلفة اليومية: ${fmtEGP(result.totalCost)}\n` +
          `📅 الشهرية: ${fmtEGP(result.costPerMonth)}\n` +
          (isFlock
            ? `${isBird ? "🐤" : "🐂"} ${isBird ? "تكلفة الطائر" : "تكلفة الرأس"}: ${fmtEGP(result.costPerAnimal)}\n`
            : `⚖️ تكلفة الكجم: ${fmtEGP(result.costPerKg)}\n`) +
          `\n— تطبيق عليقة`,
      });
    } catch {
      /* ignore */
    }
  };

  return (
    <View style={styles.card}>
      {/* Cost hero */}
      <View style={styles.costHero}>
        <View style={{ flex: 1 }}>
          <Text style={styles.costLabel}>
            {lang === "ar" ? "التكلفة اليومية" : "Daily cost"}
            {isFlock ? ` · ${lang === "ar" ? "للقطيع" : "for the flock"}` : ""}
          </Text>
          <Text style={styles.costValue}>{fmtEGP(result.totalCost)}</Text>
          <Text style={styles.costSub}>
            {lang === "ar" ? "الشهرية" : "Monthly"}: {fmtEGP(result.costPerMonth)} ·{" "}
            {isFlock
              ? `${isBird ? "للطائر" : "للرأس"}: ${fmtEGP(result.costPerAnimal)}`
              : `${lang === "ar" ? "الكجم" : "Per kg"}: ${fmtEGP(result.costPerKg)}`}
          </Text>
        </View>
        <Text style={styles.costEmoji}>💰</Text>
      </View>

      {savings && savings.amount > 0 ? (
        <View style={styles.savings}>
          <Text style={styles.savingsLabel}>
            {lang === "ar" ? "التوفير اليومي" : "Daily savings"}
          </Text>
          <Text style={styles.savingsValue}>
            {fmtEGP(savings.amount)} ({fmt(savings.pct, 0)}%)
          </Text>
        </View>
      ) : null}

      {/* Nutrition stats */}
      <View style={styles.statsRow}>
        <NutritionStat
          label={lang === "ar" ? "البروتين الخام" : "Crude protein"}
          value={result.achieved.cp}
          target={`≥ ${fmt(result.targets.cpMin, 0)}%`}
          ok={result.achieved.cp >= result.targets.cpMin - 0.3}
        />
        <NutritionStat
          label={lang === "ar" ? "الطاقة (TDN)" : "Energy (TDN)"}
          value={result.achieved.tdn}
          target={`≥ ${fmt(result.targets.tdnMin, 0)}%`}
          ok={result.achieved.tdn >= result.targets.tdnMin - 0.5}
        />
        <NutritionStat
          label={lang === "ar" ? "الألياف الخام" : "Crude fiber"}
          value={result.achieved.fiber}
          target={`≤ ${fmt(result.targets.fiberMax, 0)}%`}
          ok={result.achieved.fiber <= result.targets.fiberMax + 0.5}
        />
      </View>

      <View style={styles.dmiRow}>
        <Text style={styles.dmiLabel}>
          {lang === "ar" ? "المادة الجافة/اليوم" : "Dry matter/day"}
        </Text>
        <Text style={styles.dmiValue}>{fmt(result.dmi, 2)} كجم</Text>
      </View>

      {/* Components */}
      <Text style={styles.sectionTitle}>
        {lang === "ar" ? "تفصيل المكوّنات" : "Component breakdown"}
      </Text>
      <View style={styles.table}>
        {result.components.map((c, i) => (
          <View
            key={c.ingredient.key}
            style={[styles.tableRow, i % 2 === 1 && styles.tableRowAlt]}
          >
            <View style={[styles.dot, { backgroundColor: c.ingredient.color }]} />
            <Text style={styles.cellName} numberOfLines={2}>
              {c.ingredient.emoji} {c.ingredient.name}
            </Text>
            <Text style={styles.cellNum}>{fmt(c.percent, 1)}%</Text>
            <Text style={styles.cellNum}>{fmt(c.kg, 2)} كجم</Text>
            <Text style={styles.cellCost}>{fmt(c.cost, 2)} ج.م</Text>
          </View>
        ))}
        <View style={[styles.tableRow, styles.tableFooter]}>
          <Text style={styles.cellName}>{lang === "ar" ? "الإجمالي" : "Total"}</Text>
          <Text style={styles.cellNum} />
          <Text style={styles.cellNum}>{fmt(result.dmi, 2)} كجم</Text>
          <Text style={styles.cellCost}>{fmt(result.totalCost, 2)} ج.م</Text>
        </View>
      </View>

      {result.warnings.length > 0 ? (
        <View style={styles.warnings}>
          <Text style={styles.warningsTitle}>
            {lang === "ar" ? "ملاحظات" : "Notes"}
          </Text>
          {result.warnings.map((w, i) => (
            <Text key={i} style={styles.warningItem}>• {w}</Text>
          ))}
        </View>
      ) : null}

      {/* Actions */}
      <View style={styles.actions}>
        {onSave ? (
          <Pressable style={[styles.btn, styles.btnPrimary]} onPress={onSave}>
            <Text style={styles.btnPrimaryText}>
              {lang === "ar" ? "حفظ" : "Save"}
            </Text>
          </Pressable>
        ) : null}
        <Pressable style={[styles.btn, styles.btnSecondary]} onPress={share}>
          <Text style={styles.btnSecondaryText}>
            {lang === "ar" ? "مشاركة" : "Share"}
          </Text>
        </Pressable>
        {onPrint ? (
          <Pressable style={[styles.btn, styles.btnSecondary]} onPress={onPrint}>
            <Text style={styles.btnSecondaryText}>
              {lang === "ar" ? "PDF" : "PDF"}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

function NutritionStat({
  label,
  value,
  target,
  ok,
}: {
  label: string;
  value: number;
  target: string;
  ok: boolean;
}) {
  return (
    <View style={[styles.stat, ok ? styles.statOk : styles.statWarn]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{fmt(value, 1)}%</Text>
      <Text style={styles.statTarget}>{target}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 14,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infeasibleCard: {
    backgroundColor: COLORS.dangerSoft,
    borderRadius: 16,
    padding: 24,
    marginVertical: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.dangerBorder,
  },
  infeasibleEmoji: { fontSize: 48, marginBottom: 8 },
  infeasibleTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.danger,
    marginBottom: 4,
  },
  infeasibleDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },

  costHero: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.brand,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  costLabel: { color: "#fff", fontSize: 12, opacity: 0.9 },
  costValue: { color: "#fff", fontSize: 28, fontWeight: "900" },
  costSub: { color: "#fff", fontSize: 11, opacity: 0.85, marginTop: 4 },
  costEmoji: { fontSize: 36, opacity: 0.4, marginStart: 8 },

  savings: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.accentSoft,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
  },
  savingsLabel: { fontSize: 12, color: "#7a5a1a" },
  savingsValue: { fontSize: 16, fontWeight: "800", color: "#8a6a1a" },

  statsRow: { flexDirection: "row", gap: 6, marginBottom: 8 },
  stat: {
    flex: 1,
    borderRadius: 10,
    padding: 8,
    alignItems: "center",
    borderWidth: 1,
  },
  statOk: {
    backgroundColor: COLORS.brandSoft,
    borderColor: COLORS.brandBorder,
  },
  statWarn: {
    backgroundColor: COLORS.accentSoft,
    borderColor: COLORS.accentBorder,
  },
  statLabel: { fontSize: 10, color: COLORS.textSecondary, textAlign: "center" },
  statValue: { fontSize: 16, fontWeight: "800", color: COLORS.textPrimary, marginTop: 2 },
  statTarget: { fontSize: 9, color: COLORS.textMuted, marginTop: 2 },

  dmiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginBottom: 4,
  },
  dmiLabel: { fontSize: 13, color: COLORS.textSecondary },
  dmiValue: { fontSize: 14, fontWeight: "700", color: COLORS.textPrimary },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.brand,
    marginVertical: 8,
  },
  table: {
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: COLORS.card,
    gap: 6,
  },
  tableRowAlt: { backgroundColor: COLORS.bg },
  tableFooter: {
    backgroundColor: COLORS.brandSoft,
    borderTopWidth: 1,
    borderTopColor: COLORS.brandBorder,
  },
  dot: { width: 10, height: 10, borderRadius: 3 },
  cellName: { flex: 1, fontSize: 12, color: COLORS.textPrimary },
  cellNum: {
    width: 64,
    fontSize: 12,
    color: COLORS.textPrimary,
    textAlign: "center",
  },
  cellCost: {
    width: 70,
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.brand,
    textAlign: "center",
  },

  warnings: {
    backgroundColor: COLORS.dangerSoft,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.dangerBorder,
  },
  warningsTitle: { fontSize: 12, fontWeight: "700", color: COLORS.danger, marginBottom: 4 },
  warningItem: { fontSize: 11, color: "#8a3a1a", marginBottom: 2 },

  actions: { flexDirection: "row", gap: 8, marginTop: 12 },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnPrimary: { backgroundColor: COLORS.brand },
  btnPrimaryText: { color: "#fff", fontWeight: "700" },
  btnSecondary: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.brand,
  },
  btnSecondaryText: { color: COLORS.brand, fontWeight: "700" },
});
