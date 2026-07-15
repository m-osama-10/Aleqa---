/* ================================================================== */
/*  IngredientSlider — single-ingredient percentage editor             */
/*  Uses TextInput + stepper buttons (no extra native slider dep).     */
/* ================================================================== */

import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { COLORS } from "../utils/constants";
import type { Ingredient } from "../api/feedData";
import { fmt, clamp } from "../utils/helpers";

interface Props {
  ingredient: Ingredient;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
}

export function IngredientSlider({
  ingredient,
  value,
  onChange,
  unit = "%",
  min = 0,
  max = 100,
  step = 0.5,
}: Props) {
  const dec = () => onChange(clamp(+(value - step).toFixed(2), min, max));
  const inc = () => onChange(clamp(+(value + step).toFixed(2), min, max));

  return (
    <View style={styles.wrap}>
      <View style={[styles.color, { backgroundColor: ingredient.color }]} />
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.emoji}>{ingredient.emoji}</Text>
          <Text style={styles.name}>{ingredient.name}</Text>
        </View>
        <View style={styles.controls}>
          <Pressable style={styles.stepper} onPress={dec}>
            <Text style={styles.stepperText}>−</Text>
          </Pressable>
          <View style={styles.valueWrap}>
            <TextInput
              style={styles.valueInput}
              value={String(value.toFixed(1))}
              keyboardType="decimal-pad"
              selectTextOnFocus
              onChangeText={(txt) => {
                const n = parseFloat(txt.replace(/[^\d.]/g, ""));
                if (isFinite(n)) onChange(clamp(n, min, max));
              }}
            />
            <Text style={styles.valueUnit}>{unit}</Text>
          </View>
          <Pressable style={styles.stepper} onPress={inc}>
            <Text style={styles.stepperText}>+</Text>
          </Pressable>
        </View>
        <View style={styles.stats}>
          <Text style={styles.stat}>بروتين {fmt(ingredient.protein, 1)}%</Text>
          <Text style={styles.stat}>طاقة {fmt(ingredient.tdn, 0)}%</Text>
          <Text style={styles.stat}>ألياف {fmt(ingredient.fiber, 0)}%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  color: {
    width: 4,
    borderRadius: 2,
    marginEnd: 12,
  },
  body: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  emoji: { fontSize: 20 },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 6,
  },
  stepper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.brandSoft,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.brandBorder,
  },
  stepperText: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.brand,
    lineHeight: 24,
  },
  valueWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    minWidth: 70,
    justifyContent: "center",
  },
  valueInput: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.brand,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    minWidth: 48,
    textAlign: "center",
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  valueUnit: { fontSize: 12, color: COLORS.textSecondary },
  stats: { flexDirection: "row", gap: 12, marginTop: 4 },
  stat: { fontSize: 11, color: COLORS.textMuted },
});
