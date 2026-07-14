"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Scale,
  ArrowLeftRight,
  Check,
  X,
  Trophy,
} from "lucide-react";
import { ContentPageLayout } from "./content-page-layout";
import { useLang } from "@/lib/i18n";
import {
  CATEGORY_LABELS,
  CATEGORY_LABELS_EN,
  DEFAULT_INGREDIENTS,
  type IngredientNutrition,
} from "@/lib/ingredient-db";
import { getIngredientDetail } from "@/lib/ingredient-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ---------------- Helpers ---------------- */

interface CompareRow {
  key: keyof IngredientNutrition;
  labelAr: string;
  labelEn: string;
  suffix: string;
  higherIsBetter: boolean | null; // null = neutral (fiber, calcium, phosphorus, fat)
}

const ROWS: CompareRow[] = [
  { key: "protein", labelAr: "البروتين الخام", labelEn: "Crude Protein", suffix: "%", higherIsBetter: true },
  { key: "tdn", labelAr: "الطاقة (TDN)", labelEn: "Energy (TDN)", suffix: "%", higherIsBetter: true },
  { key: "fiber", labelAr: "الألياف الخام", labelEn: "Crude Fiber", suffix: "%", higherIsBetter: null },
  { key: "fat", labelAr: "الدهون", labelEn: "Fat (EE)", suffix: "%", higherIsBetter: null },
  { key: "calcium", labelAr: "الكالسيوم", labelEn: "Calcium", suffix: "%", higherIsBetter: null },
  { key: "phosphorus", labelAr: "الفوسفور", labelEn: "Phosphorus", suffix: "%", higherIsBetter: null },
  { key: "dryMatter", labelAr: "المادة الجافة", labelEn: "Dry Matter", suffix: "%", higherIsBetter: true },
  { key: "price", labelAr: "السعر", labelEn: "Price", suffix: "", higherIsBetter: false },
  { key: "minUsage", labelAr: "الحد الأدنى للاستخدام", labelEn: "Min usage", suffix: "%", higherIsBetter: null },
  { key: "maxUsage", labelAr: "الحد الأقصى للاستخدام", labelEn: "Max usage", suffix: "%", higherIsBetter: null },
];

/** All valid ingredient keys — module-level so it has a stable reference. */
const VALID_KEYS = DEFAULT_INGREDIENTS.map((i) => i.key);

/* ---------------- Component ---------------- */

/**
 * Compare page — /compare
 * Side-by-side comparison of two ingredients with nutritional recommendation.
 * Pre-selection via ?a=KEY and/or ?b=KEY query params.
 */
export function CompareContent() {
  return (
    <Suspense
      fallback={
        <ContentPageLayout title="Compare">
          <div className="rounded-lg border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
            Loading…
          </div>
        </ContentPageLayout>
      }
    >
      <CompareContentInner />
    </Suspense>
  );
}

function CompareContentInner() {
  const { t, lang } = useLang();
  const isRtl = lang === "ar";
  const searchParams = useSearchParams();

  // Initial values from query params (validated against ingredient keys).
  const initialA = searchParams.get("a") ?? "";
  const initialB = searchParams.get("b") ?? "";
  const firstValidA = VALID_KEYS.includes(initialA) ? initialA : "corn";
  const firstValidB = VALID_KEYS.includes(initialB)
    ? initialB
    : VALID_KEYS.find((k) => k !== firstValidA) ?? "soybean44";

  const [keyA, setKeyA] = useState<string>(firstValidA);
  const [keyB, setKeyB] = useState<string>(firstValidB);

  // Keep in sync if user changes the URL (e.g. from ingredient detail page link).
  useEffect(() => {
    const a = searchParams.get("a");
    const b = searchParams.get("b");
    if (a && VALID_KEYS.includes(a)) setKeyA(a);
    if (b && VALID_KEYS.includes(b)) setKeyB(b);
  }, [searchParams]);

  const ingA = DEFAULT_INGREDIENTS.find((i) => i.key === keyA);
  const ingB = DEFAULT_INGREDIENTS.find((i) => i.key === keyB);

  const title = isRtl ? "مقارنة المكوّنات" : "Compare Ingredients";

  const recommendation = useMemo(() => {
    if (!ingA || !ingB) return null;
    return computeRecommendation(ingA, ingB, isRtl);
  }, [ingA, ingB, isRtl]);

  return (
    <ContentPageLayout title={title}>
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {isRtl
            ? "اختر مكوّنين لعرض القيم الغذائية جنباً إلى جنب مع توصية بأفضل خيار."
            : "Pick two ingredients to see nutrition values side-by-side with a best-choice recommendation."}
        </p>

        {/* Sub-section navigation */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Link href="/ingredients" className="group rounded-xl border border-border/60 bg-card p-3 text-center transition-all hover:border-primary/40 hover:shadow-sm">
            <div className="mb-1 text-xl">🌾</div>
            <p className="text-xs font-bold text-foreground">{isRtl ? "قائمة المواد" : "Ingredient List"}</p>
            <p className="text-[10px] text-muted-foreground">{isRtl ? "٢٢ مكوّن" : "22 ingredients"}</p>
          </Link>
          <div className="rounded-xl border border-primary/40 bg-primary/5 p-3 text-center">
            <div className="mb-1 text-xl">⚖️</div>
            <p className="text-xs font-bold text-primary">{isRtl ? "مقارنة المواد" : "Compare"}</p>
            <p className="text-[10px] text-muted-foreground">{isRtl ? "جنباً إلى جنب" : "Side by side"}</p>
          </div>
          <Link href="/knowledge?category=ingredients" className="group rounded-xl border border-border/60 bg-card p-3 text-center transition-all hover:border-primary/40 hover:shadow-sm">
            <div className="mb-1 text-xl">📖</div>
            <p className="text-xs font-bold text-foreground">{isRtl ? "مقالات المواد" : "Ingredient Articles"}</p>
            <p className="text-[10px] text-muted-foreground">{isRtl ? "١٠ مقالات" : "10 articles"}</p>
          </Link>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <IngredientSelect
            label={isRtl ? "المكوّن الأول" : "Ingredient A"}
            value={keyA}
            onChange={setKeyA}
            isRtl={isRtl}
            otherKey={keyB}
          />
          <IngredientSelect
            label={isRtl ? "المكوّن الثاني" : "Ingredient B"}
            value={keyB}
            onChange={setKeyB}
            isRtl={isRtl}
            otherKey={keyA}
          />
        </div>

        {/* Swap button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setKeyA(keyB);
              setKeyB(keyA);
            }}
          >
            <ArrowLeftRight className="h-4 w-4" />
            {isRtl ? "تبديل" : "Swap"}
          </Button>
        </div>

        {ingA && ingB ? (
          <>
            {/* Comparison table */}
            <ComparisonTable a={ingA} b={ingB} isRtl={isRtl} t={t} />

            {/* Pros/Cons side-by-side */}
            <div className="grid gap-3 sm:grid-cols-2">
              <ProsConsCard ingredient={ingA} side="A" isRtl={isRtl} />
              <ProsConsCard ingredient={ingB} side="B" isRtl={isRtl} />
            </div>

            {/* Recommendation */}
            {recommendation && (
              <Card className="border-primary/30 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-bold text-primary">
                    <Trophy className="h-4 w-4" />
                    {isRtl ? "التوصية" : "Recommendation"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  <p className="text-sm leading-relaxed text-foreground">
                    {recommendation.summary}
                  </p>
                  <Separator />
                  <dl className="grid grid-cols-1 gap-1.5 text-xs sm:grid-cols-2">
                    {recommendation.points.map((p, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-1.5 rounded-md bg-background/60 px-2 py-1.5"
                      >
                        <span aria-hidden="true">{p.icon}</span>
                        <span className="leading-relaxed text-foreground">{p.text}</span>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            )}

            {/* Links to detail pages */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/ingredients/${ingA.key}`}>
                  {ingA.emoji} {isRtl ? ingA.name : ingA.nameEn}
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={`/ingredients/${ingB.key}`}>
                  {ingB.emoji} {isRtl ? ingB.name : ingB.nameEn}
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <p className="rounded-lg border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
            {isRtl ? "اختر مكوّنين للبدء." : "Select two ingredients to begin."}
          </p>
        )}
      </div>
    </ContentPageLayout>
  );
}

/* ---------------- Subcomponents ---------------- */

function IngredientSelect({
  label,
  value,
  onChange,
  isRtl,
  otherKey,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  isRtl: boolean;
  otherKey: string;
}) {
  // Group ingredients by category for the dropdown.
  const grouped = useMemo(() => {
    const map = new Map<string, IngredientNutrition[]>();
    for (const ing of DEFAULT_INGREDIENTS) {
      if (!map.has(ing.category)) map.set(ing.category, []);
      map.get(ing.category)!.push(ing);
    }
    return map;
  }, []);

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-muted-foreground">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={isRtl ? "اختر مكوّناً" : "Select ingredient"} />
        </SelectTrigger>
        <SelectContent>
          {Array.from(grouped.entries()).map(([cat, items]) => (
            <div key={cat}>
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                {isRtl ? CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS] : CATEGORY_LABELS_EN[cat as keyof typeof CATEGORY_LABELS_EN]}
              </div>
              {items.map((ing) => (
                <SelectItem
                  key={ing.key}
                  value={ing.key}
                  disabled={ing.key === otherKey}
                >
                  <span aria-hidden="true">{ing.emoji}</span>
                  <span>{isRtl ? ing.name : ing.nameEn}</span>
                </SelectItem>
              ))}
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function ComparisonTable({
  a,
  b,
  isRtl,
  t,
}: {
  a: IngredientNutrition;
  b: IngredientNutrition;
  isRtl: boolean;
  t: (key: string, vars?: Record<string, string | number>) => string;
}) {
  return (
    <Card className="overflow-hidden border-border/60">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-bold text-foreground">
          <Scale className="h-4 w-4 text-primary" />
          {isRtl ? "المقارنة الغذائية" : "Nutritional Comparison"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-foreground">
                <th className="p-2.5 text-start font-bold">
                  {isRtl ? "العنصر" : "Property"}
                </th>
                <th className="p-2.5 text-center font-bold">
                  <span className="block text-[11px] text-muted-foreground">
                    {isRtl ? "الأول" : "A"}
                  </span>
                  {a.emoji} {isRtl ? a.name : a.nameEn}
                </th>
                <th className="p-2.5 text-center font-bold">
                  <span className="block text-[11px] text-muted-foreground">
                    {isRtl ? "الثاني" : "B"}
                  </span>
                  {b.emoji} {isRtl ? b.name : b.nameEn}
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => {
                const valA = a[row.key] as number;
                const valB = b[row.key] as number;
                let winner: "a" | "b" | "tie" | null = null;
                if (row.higherIsBetter === true) {
                  if (valA > valB) winner = "a";
                  else if (valB > valA) winner = "b";
                  else winner = "tie";
                } else if (row.higherIsBetter === false) {
                  if (valA < valB) winner = "a";
                  else if (valB < valA) winner = "b";
                  else winner = "tie";
                }
                const suffix =
                  row.key === "price" ? ` ${t("common.egp")}/${t("common.kg")}` : row.suffix;
                return (
                  <tr
                    key={row.key}
                    className={`border-b border-border/40 ${
                      i % 2 === 1 ? "bg-secondary/20" : ""
                    }`}
                  >
                    <td className="p-2.5 text-start font-semibold text-foreground">
                      {isRtl ? row.labelAr : row.labelEn}
                    </td>
                    <td
                      className={`p-2.5 text-center font-bold tabular-nums ${
                        winner === "a"
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                          : "text-foreground"
                      }`}
                    >
                      {valA}
                      <span className="text-xs font-normal text-muted-foreground">
                        {suffix}
                      </span>
                    </td>
                    <td
                      className={`p-2.5 text-center font-bold tabular-nums ${
                        winner === "b"
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                          : "text-foreground"
                      }`}
                    >
                      {valB}
                      <span className="text-xs font-normal text-muted-foreground">
                        {suffix}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function ProsConsCard({
  ingredient,
  side,
  isRtl,
}: {
  ingredient: IngredientNutrition;
  side: "A" | "B";
  isRtl: boolean;
}) {
  const detail = getIngredientDetail(ingredient.key);
  const name = isRtl ? ingredient.name : ingredient.nameEn;
  const pros = detail ? (isRtl ? detail.pros : detail.prosEn) : [];
  const cons = detail ? (isRtl ? detail.cons : detail.consEn) : [];

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-bold text-foreground">
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-black text-primary"
            aria-hidden="true"
          >
            {side}
          </span>
          <span className="truncate">{ingredient.emoji} {name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
            <Check className="h-3.5 w-3.5" />
            {isRtl ? "المزايا" : "Pros"}
          </div>
          {pros.length > 0 ? (
            <ul className="space-y-1">
              {pros.map((p, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs leading-relaxed text-foreground">
                  <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground">—</p>
          )}
        </div>
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400">
            <X className="h-3.5 w-3.5" />
            {isRtl ? "العيوب" : "Cons"}
          </div>
          {cons.length > 0 ? (
            <ul className="space-y-1">
              {cons.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs leading-relaxed text-foreground">
                  <X className="mt-0.5 h-3 w-3 shrink-0 text-rose-600 dark:text-rose-400" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground">—</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------------- Recommendation logic ---------------- */

interface RecPoint {
  icon: string;
  text: string;
}

interface Recommendation {
  summary: string;
  points: RecPoint[];
}

function computeRecommendation(
  a: IngredientNutrition,
  b: IngredientNutrition,
  isRtl: boolean
): Recommendation {
  const nameA = isRtl ? a.name : a.nameEn;
  const nameB = isRtl ? b.name : b.nameEn;

  // Protein-per-EGP (value index) — higher is better value.
  const valueA = a.price > 0 ? a.protein / a.price : 0;
  const valueB = b.price > 0 ? b.protein / b.price : 0;

  const points: RecPoint[] = [];

  // Protein
  if (a.protein > b.protein) {
    points.push({
      icon: "💪",
      text: isRtl
        ? `${nameA} أعلى بروتين (${a.protein}% مقابل ${b.protein}%) — أفضل للنمو وإنتاج اللبن.`
        : `${nameA} has more protein (${a.protein}% vs ${b.protein}%) — better for growth and milk.`,
    });
  } else if (b.protein > a.protein) {
    points.push({
      icon: "💪",
      text: isRtl
        ? `${nameB} أعلى بروتين (${b.protein}% مقابل ${a.protein}%) — أفضل للنمو وإنتاج اللبن.`
        : `${nameB} has more protein (${b.protein}% vs ${a.protein}%) — better for growth and milk.`,
    });
  }

  // Energy (TDN)
  if (a.tdn > b.tdn) {
    points.push({
      icon: "⚡",
      text: isRtl
        ? `${nameA} أعلى طاقة (${a.tdn}% مقابل ${b.tdn}%) — أفضل للتسمين والإنتاج العالي.`
        : `${nameA} has more energy (${a.tdn}% vs ${b.tdn}%) — better for fattening and high output.`,
    });
  } else if (b.tdn > a.tdn) {
    points.push({
      icon: "⚡",
      text: isRtl
        ? `${nameB} أعلى طاقة (${b.tdn}% مقابل ${a.tdn}%) — أفضل للتسمين والإنتاج العالي.`
        : `${nameB} has more energy (${b.tdn}% vs ${a.tdn}%) — better for fattening and high output.`,
    });
  }

  // Price
  if (a.price < b.price) {
    points.push({
      icon: "💰",
      text: isRtl
        ? `${nameA} أرخص (${a.price} مقابل ${b.price} ج.م/كجم) — أفضل اقتصادياً.`
        : `${nameA} is cheaper (${a.price} vs ${b.price} EGP/kg) — better value.`,
    });
  } else if (b.price < a.price) {
    points.push({
      icon: "💰",
      text: isRtl
        ? `${nameB} أرخص (${b.price} مقابل ${a.price} ج.م/كجم) — أفضل اقتصادياً.`
        : `${nameB} is cheaper (${b.price} vs ${a.price} EGP/kg) — better value.`,
    });
  }

  // Protein-per-EGP (value)
  if (valueA > valueB && a.protein > 0) {
    points.push({
      icon: "🎯",
      text: isRtl
        ? `${nameA} أعلى قيمة بروتينية لكل جنيه — أفضل اختيار للبروتين بكلفة منخفضة.`
        : `${nameA} gives more protein per pound — best protein value for money.`,
    });
  } else if (valueB > valueA && b.protein > 0) {
    points.push({
      icon: "🎯",
      text: isRtl
        ? `${nameB} أعلى قيمة بروتينية لكل جنيه — أفضل اختيار للبروتين بكلفة منخفضة.`
        : `${nameB} gives more protein per pound — best protein value for money.`,
    });
  }

  // Max usage headroom
  if (a.maxUsage > b.maxUsage) {
    points.push({
      icon: "📊",
      text: isRtl
        ? `${nameA} يسمح بنسبة أعلى في العليقة (حتى ${a.maxUsage}%) — مرونة أكبر في التركيب.`
        : `${nameA} allows a higher ration share (up to ${a.maxUsage}%) — more formulation flexibility.`,
    });
  } else if (b.maxUsage > a.maxUsage) {
    points.push({
      icon: "📊",
      text: isRtl
        ? `${nameB} يسمح بنسبة أعلى في العليقة (حتى ${b.maxUsage}%) — مرونة أكبر في التركيب.`
        : `${nameB} allows a higher ration share (up to ${b.maxUsage}%) — more formulation flexibility.`,
    });
  }

  // Overall summary: pick the best protein-per-EGP as overall winner; fall back to higher protein, then cheaper.
  let winner: "a" | "b" | "tie" = "tie";
  if (valueA > valueB) winner = "a";
  else if (valueB > valueA) winner = "b";
  else if (a.protein > b.protein) winner = "a";
  else if (b.protein > a.protein) winner = "b";
  else if (a.price < b.price) winner = "a";
  else if (b.price < a.price) winner = "b";

  let summary: string;
  if (winner === "a") {
    summary = isRtl
      ? `بشكل عام، ${nameA} خيار أفضل لأغلب العلائق لقيمته الغذائية مقابل السعر.`
      : `Overall, ${nameA} is the better choice for most rations based on nutrition-per-cost.`;
  } else if (winner === "b") {
    summary = isRtl
      ? `بشكل عام، ${nameB} خيار أفضل لأغلب العلائق لقيمته الغذائية مقابل السعر.`
      : `Overall, ${nameB} is the better choice for most rations based on nutrition-per-cost.`;
  } else {
    summary = isRtl
      ? `المكوّنان متكافئان تقريباً في القيمة الغذائية مقابل السعر.`
      : `Both ingredients are roughly equivalent in nutrition-per-cost.`;
  }

  return { summary, points: points.length > 0 ? points : [{ icon: "💡", text: isRtl ? "اختر حسب احتياج الحيوان والسعر المتاح." : "Choose based on animal needs and available price." }] };
}
