"use client";

import { useState } from "react";
import {
  RotateCcw,
  Search,
  ChevronDown,
  ChevronUp,
  Beaker,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { usePrices, useIngredients } from "@/lib/storage";
import { CATEGORY_LABELS, CATEGORY_ORDER, type IngredientCategory } from "@/lib/ingredient-db";
import { useLang } from "@/lib/i18n";
import { AdSection, AdSmartlink } from "@/components/ads";

export function PricesScreen() {
  const { t, lang } = useLang();
  const { prices, updatePrice } = usePrices();
  const { ingredients, updateIngredient, resetAllIngredients } = useIngredients();
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const isRtl = lang === "ar";
  const filtered = ingredients.filter(
    (ing) =>
      ing.name.includes(search) ||
      ing.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      ing.key.includes(search)
  );

  const handleReset = () => {
    if (confirm(isRtl ? "هل تريد إعادة كل القيم الغذائية للقيم الافتراضية؟" : "Reset all nutrition values to defaults?")) {
      resetAllIngredients();
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Beaker className="h-5 w-5 text-primary" />
              <h2 className="text-base font-extrabold text-foreground">
                {isRtl ? "القيم الغذائية للمواد الخام" : "Ingredient Nutrition Values"}
              </h2>
            </div>
            <Button size="sm" variant="outline" className="gap-1.5 shrink-0" onClick={handleReset}>
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{isRtl ? "إعادة ضبط" : "Reset"}</span>
            </Button>
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            {isRtl
              ? "كل القيم قابلة للتعديل. اضغط على أي مادة لتعديل قيمها الغذائية والسعر."
              : "All values are editable. Tap any ingredient to edit its nutrition values and price."}
          </p>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={isRtl ? "بحث عن مادة خام..." : "Search ingredient..."}
          className="pl-9"
        />
      </div>

      {/* Ingredients grouped by category */}
      {CATEGORY_ORDER.map((cat) => {
        const catItems = filtered.filter((ing) => ing.category === cat);
        if (catItems.length === 0) return null;
        return (
          <div key={cat}>
            {/* Category header */}
            <div className="mb-2 flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
              <span className="text-sm font-extrabold text-primary">
                {CATEGORY_LABELS[cat]}
              </span>
              <Badge variant="secondary" className="text-[10px]">
                {catItems.length}
              </Badge>
            </div>

            {/* Ingredient cards */}
            <div className="space-y-2">
              {catItems.map((ing) => {
                const isExpanded = expandedKey === ing.key;
                const currentPrice = prices[ing.key] ?? ing.price;
                return (
                  <Card key={ing.key} className={cn("border-border/60 transition-colors", isExpanded && "border-primary/40")}>
                    <CardContent className="p-3">
                      {/* Row 1: emoji + name + price + expand button */}
                      <button
                        onClick={() => setExpandedKey(isExpanded ? null : ing.key)}
                        className="flex w-full items-center gap-2 text-right"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-lg">
                          {ing.emoji}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-foreground leading-tight">
                            {isRtl ? ing.name : ing.nameEn}
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            CP: {ing.protein}% · TDN: {ing.tdn}% · CF: {ing.fiber}%
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1.5">
                          <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-extrabold text-primary">
                            {currentPrice} {isRtl ? "ج" : "EGP"}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                          )}
                        </div>
                      </button>

                      {/* Expanded editor */}
                      {isExpanded && (
                        <div className="mt-3 space-y-3 border-t border-border/40 pt-3">
                          {/* Price */}
                          <FieldRow
                            label={isRtl ? "السعر (جنيه/كجم)" : "Price (EGP/kg)"}
                            value={currentPrice}
                            onChange={(v) => updatePrice(ing.key as never, v)}
                            step={0.5}
                          />

                          {/* Nutrition grid */}
                          <div className="grid grid-cols-2 gap-2">
                            <FieldRow
                              label={isRtl ? "بروتين (CP%)" : "Protein (CP%)"}
                              value={ing.protein}
                              onChange={(v) => updateIngredient(ing.key, "protein", v)}
                              step={0.1}
                            />
                            <FieldRow
                              label={isRtl ? "طاقة (TDN%)" : "Energy (TDN%)"}
                              value={ing.tdn}
                              onChange={(v) => updateIngredient(ing.key, "tdn", v)}
                              step={0.1}
                            />
                            <FieldRow
                              label={isRtl ? "ألياف (CF%)" : "Fiber (CF%)"}
                              value={ing.fiber}
                              onChange={(v) => updateIngredient(ing.key, "fiber", v)}
                              step={0.1}
                            />
                            <FieldRow
                              label={isRtl ? "دهون (EE%)" : "Fat (EE%)"}
                              value={ing.fat}
                              onChange={(v) => updateIngredient(ing.key, "fat", v)}
                              step={0.1}
                            />
                            <FieldRow
                              label={isRtl ? "كالسيوم (Ca%)" : "Calcium (Ca%)"}
                              value={ing.calcium}
                              onChange={(v) => updateIngredient(ing.key, "calcium", v)}
                              step={0.01}
                            />
                            <FieldRow
                              label={isRtl ? "فوسفور (P%)" : "Phosphorus (P%)"}
                              value={ing.phosphorus}
                              onChange={(v) => updateIngredient(ing.key, "phosphorus", v)}
                              step={0.01}
                            />
                            <FieldRow
                              label={isRtl ? "مادة جافة (DM%)" : "Dry Matter (DM%)"}
                              value={ing.dryMatter}
                              onChange={(v) => updateIngredient(ing.key, "dryMatter", v)}
                              step={0.1}
                            />
                            <FieldRow
                              label={isRtl ? "الاسم" : "Name"}
                              value={ing.name}
                              onChange={(v) => updateIngredient(ing.key, "name", v)}
                              isText
                            />
                            <FieldRow
                              label={isRtl ? "أدنى استخدام (%)" : "Min Usage (%)"}
                              value={ing.minUsage}
                              onChange={(v) => updateIngredient(ing.key, "minUsage", v)}
                              step={0.5}
                            />
                            <FieldRow
                              label={isRtl ? "أقصى استخدام (%)" : "Max Usage (%)"}
                              value={ing.maxUsage}
                              onChange={(v) => updateIngredient(ing.key, "maxUsage", v)}
                              step={0.5}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}

      <p className="rounded-lg bg-primary/5 p-3 text-center text-[11px] leading-relaxed text-muted-foreground">
        {isRtl
          ? "💡 كل القيم محفوظة على جهازك. عدّلها حسب تحليلك المعملي."
          : "💡 All values stored locally. Adjust to your lab analysis."}
      </p>

      <AdSection placement="in-feed" label="إعلان" />
      <div className="flex justify-center">
        <AdSmartlink variant="banner" />
      </div>
    </div>
  );
}

function FieldRow({
  label,
  value,
  onChange,
  step = 0.1,
  isText = false,
}: {
  label: string;
  value: number | string;
  onChange: (v: number) => void;
  step?: number;
  isText?: boolean;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-[10px] font-bold text-muted-foreground">{label}</Label>
      <Input
        type={isText ? "text" : "number"}
        step={step}
        value={value}
        onChange={(e) => {
          if (isText) {
            onChange(e.target.value as unknown as number);
          } else {
            onChange(Number(e.target.value) || 0);
          }
        }}
        className="h-8 text-xs"
      />
    </div>
  );
}
