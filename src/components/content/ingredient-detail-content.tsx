"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Beaker,
  Check,
  X,
  Scale,
  Lightbulb,
  AlertTriangle,
  Layers,
  TrendingUp,
  ArrowLeftRight,
} from "lucide-react";
import { ContentPageLayout } from "./content-page-layout";
import { useLang } from "@/lib/i18n";
import {
  CATEGORY_LABELS,
  CATEGORY_LABELS_EN,
  DEFAULT_INGREDIENTS,
  type IngredientNutrition,
} from "@/lib/ingredient-db";
import {
  getIngredientDetail,
  type IngredientAlternative,
} from "@/lib/ingredient-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/* ---------------- Helpers ---------------- */

interface NutRow {
  key: keyof IngredientNutrition;
  labelAr: string;
  labelEn: string;
  suffix: string;
  hintAr?: string;
  hintEn?: string;
}

const NUT_ROWS: NutRow[] = [
  { key: "protein", labelAr: "البروتين الخام", labelEn: "Crude Protein", suffix: "%" },
  { key: "tdn", labelAr: "الطاقة (TDN)", labelEn: "Energy (TDN)", suffix: "%" },
  { key: "fiber", labelAr: "الألياف الخام", labelEn: "Crude Fiber", suffix: "%" },
  { key: "fat", labelAr: "الدهون", labelEn: "Fat (EE)", suffix: "%" },
  { key: "calcium", labelAr: "الكالسيوم", labelEn: "Calcium", suffix: "%" },
  { key: "phosphorus", labelAr: "الفوسفور", labelEn: "Phosphorus", suffix: "%" },
  { key: "dryMatter", labelAr: "المادة الجافة", labelEn: "Dry Matter", suffix: "%" },
];

/* ---------------- Component ---------------- */

/**
 * Ingredient detail page — /ingredients/[key]
 * Shows full info for a single ingredient: nutrition table, pros/cons, alternatives.
 */
export function IngredientDetailContent({
  ingredientKey,
}: {
  ingredientKey: string;
}) {
  const { t, lang } = useLang();
  const isRtl = lang === "ar";
  const ingredient = DEFAULT_INGREDIENTS.find((i) => i.key === ingredientKey);
  const detail = getIngredientDetail(ingredientKey);

  if (!ingredient) {
    return (
      <ContentPageLayout title={isRtl ? "غير موجود" : "Not Found"}>
        <p className="text-sm text-muted-foreground">
          {isRtl
            ? "المكوّن المطلوب غير موجود في قاعدة البيانات."
            : "The requested ingredient was not found in the database."}
        </p>
        <Button asChild variant="outline" size="sm" className="mt-4">
          <Link href="/ingredients">
            {isRtl ? "العودة لقائمة المكوّنات" : "Back to ingredients"}
          </Link>
        </Button>
      </ContentPageLayout>
    );
  }

  const name = isRtl ? ingredient.name : ingredient.nameEn;
  const catLabel = isRtl
    ? CATEGORY_LABELS[ingredient.category]
    : CATEGORY_LABELS_EN[ingredient.category];

  return (
    <ContentPageLayout title={name}>
      <div className="space-y-5">
        {/* Hero */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="space-y-3 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-background text-3xl shadow-sm"
                  aria-hidden="true"
                >
                  {ingredient.emoji}
                </span>
                <div className="min-w-0">
                  <h2 className="text-lg font-black leading-tight text-foreground">
                    {name}
                  </h2>
                  <p className="mt-0.5 text-[11px] text-muted-foreground" dir="ltr">
                    {ingredient.nameEn} · {ingredient.key}
                  </p>
                  <Badge variant="secondary" className="mt-1.5">
                    {catLabel}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2">
              <QuickStat
                value={`${ingredient.protein}%`}
                label={isRtl ? "بروتين" : "Protein"}
              />
              <QuickStat
                value={`${ingredient.tdn}%`}
                label={isRtl ? "طاقة (TDN)" : "Energy"}
              />
              <QuickStat
                value={`${ingredient.price} ${t("common.egp")}`}
                label={isRtl ? "سعر/كجم" : "Price/kg"}
              />
            </div>

            <Separator />

            {/* Compare CTA */}
            <Button asChild size="sm" className="w-full">
              <Link href={`/compare?a=${ingredient.key}`}>
                <Scale className="h-4 w-4" />
                {isRtl ? "قارن مع مكوّن آخر" : "Compare with another ingredient"}
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Description */}
        {detail && (
          <section>
            <SectionTitle icon={Beaker} isRtl={isRtl}>
              {isRtl ? "الوصف" : "Description"}
            </SectionTitle>
            <p className="text-sm leading-relaxed text-foreground">
              {isRtl ? detail.description : detail.descriptionEn}
            </p>
          </section>
        )}

        {/* Nutrition table */}
        <section>
          <SectionTitle icon={TrendingUp} isRtl={isRtl}>
            {isRtl ? "القيم الغذائية" : "Nutritional Values"}
          </SectionTitle>
          <Card className="overflow-hidden border-border/60">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <tbody>
                  {NUT_ROWS.map((row, i) => (
                    <tr
                      key={row.key}
                      className={i % 2 === 1 ? "bg-secondary/30" : ""}
                    >
                      <td className="p-2.5 text-start font-semibold text-foreground">
                        {isRtl ? row.labelAr : row.labelEn}
                      </td>
                      <td className="p-2.5 text-end font-bold tabular-nums text-primary">
                        {ingredient[row.key] as number}
                        <span className="ms-0.5 text-xs font-normal text-muted-foreground">
                          {row.suffix}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          <p className="mt-1.5 text-[10px] text-muted-foreground">
            {isRtl
              ? "القيم كنسبة مئوية كما هي (as-fed) ما لم يُذكر عكس ذلك."
              : "Values are % as-fed unless otherwise noted."}
          </p>
        </section>

        {/* Usage bounds */}
        <section>
          <SectionTitle icon={Layers} isRtl={isRtl}>
            {isRtl ? "حدود الاستخدام في العليقة" : "Usage Bounds in Ration"}
          </SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            <Card className="border-border/60">
              <CardContent className="p-3 text-center">
                <p className="text-[11px] text-muted-foreground">
                  {isRtl ? "الحد الأدنى" : "Minimum"}
                </p>
                <p className="text-xl font-black tabular-nums text-foreground">
                  {ingredient.minUsage}%
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardContent className="p-3 text-center">
                <p className="text-[11px] text-muted-foreground">
                  {isRtl ? "الحد الأقصى" : "Maximum"}
                </p>
                <p className="text-xl font-black tabular-nums text-foreground">
                  {ingredient.maxUsage}%
                </p>
              </CardContent>
            </Card>
          </div>
          {detail && (
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {isRtl ? detail.uses : detail.usesEn}
            </p>
          )}
        </section>

        {/* Pros + Cons */}
        {detail && (detail.pros.length > 0 || detail.cons.length > 0) && (
          <div className="grid gap-3 sm:grid-cols-2">
            {detail.pros.length > 0 && (
              <Card className="border-emerald-500/30 bg-emerald-500/5">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400">
                    <Check className="h-4 w-4" />
                    {isRtl ? "المزايا" : "Pros"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1.5">
                    {(isRtl ? detail.pros : detail.prosEn).map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-foreground">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            {detail.cons.length > 0 && (
              <Card className="border-rose-500/30 bg-rose-500/5">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-bold text-rose-700 dark:text-rose-400">
                    <X className="h-4 w-4" />
                    {isRtl ? "العيوب" : "Cons"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1.5">
                    {(isRtl ? detail.cons : detail.consEn).map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-foreground">
                        <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-600 dark:text-rose-400" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* When to use / not to use */}
        {detail && (detail.whenToUse || detail.whenNotToUse) && (
          <div className="grid gap-3 sm:grid-cols-2">
            {detail.whenToUse && (
              <Card className="border-primary/20">
                <CardContent className="space-y-1.5 p-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                    <Lightbulb className="h-3.5 w-3.5" />
                    {isRtl ? "متى تستخدمه" : "When to use"}
                  </div>
                  <p className="text-xs leading-relaxed text-foreground">
                    {isRtl ? detail.whenToUse : detail.whenToUseEn}
                  </p>
                </CardContent>
              </Card>
            )}
            {detail.whenNotToUse && (
              <Card className="border-amber-500/30 bg-amber-500/5">
                <CardContent className="space-y-1.5 p-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    {isRtl ? "متى تتجنبه" : "When to avoid"}
                  </div>
                  <p className="text-xs leading-relaxed text-foreground">
                    {isRtl ? detail.whenNotToUse : detail.whenNotToUseEn}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Alternatives */}
        {detail && detail.alternatives.length > 0 && (
          <section>
            <SectionTitle icon={ArrowLeftRight} isRtl={isRtl}>
              {isRtl ? "البدائل المقترحة" : "Suggested Alternatives"}
            </SectionTitle>
            <div className="grid gap-2 sm:grid-cols-2">
              {detail.alternatives.map((alt) => (
                <AlternativeCard key={alt.key} alt={alt} isRtl={isRtl} />
              ))}
            </div>
          </section>
        )}

        {/* Bottom actions */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/ingredients">
              {isRtl ? (
                <ArrowRight className="h-4 w-4" />
              ) : (
                <ArrowLeft className="h-4 w-4" />
              )}
              {isRtl ? "كل المكوّنات" : "All ingredients"}
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/compare">
              <Scale className="h-4 w-4" />
              {isRtl ? "صفحة المقارنة" : "Compare page"}
            </Link>
          </Button>
        </div>
      </div>
    </ContentPageLayout>
  );
}

/* ---------------- Subcomponents ---------------- */

function QuickStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg bg-background px-2 py-2 text-center shadow-sm">
      <p className="text-base font-black tabular-nums text-foreground">{value}</p>
      <p className="mt-0.5 text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  children,
  isRtl,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  isRtl: boolean;
}) {
  return (
    <h2
      className={`mb-2 flex items-center gap-1.5 text-sm font-extrabold text-foreground ${
        isRtl ? "flex-row-reverse text-right" : ""
      }`}
    >
      <Icon className="h-4 w-4 text-primary" />
      <span>{children}</span>
    </h2>
  );
}

function AlternativeCard({
  alt,
  isRtl,
}: {
  alt: IngredientAlternative;
  isRtl: boolean;
}) {
  const altName = isRtl ? alt.name : alt.nameEn;
  return (
    <Card className="border-border/60 transition-colors hover:border-primary/40">
      <CardContent className="space-y-2 p-3">
        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/ingredients/${alt.key}`}
            className="truncate text-sm font-bold text-foreground transition-colors hover:text-primary"
          >
            {altName}
          </Link>
          <Badge variant="outline" className="shrink-0 tabular-nums">
            {isRtl ? "نسبة الاستبدال" : "Ratio"}: ×{alt.replacementRatio}
          </Badge>
        </div>
        <Separator />
        <dl className="grid grid-cols-3 gap-1 text-[11px]">
          <div>
            <dt className="text-muted-foreground">{isRtl ? "البروتين" : "Protein"}</dt>
            <dd className="font-semibold text-foreground">{alt.proteinImpact}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{isRtl ? "الطاقة" : "Energy"}</dt>
            <dd className="font-semibold text-foreground">{alt.energyImpact}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{isRtl ? "التكلفة" : "Cost"}</dt>
            <dd className="font-semibold text-foreground">{alt.costImpact}</dd>
          </div>
        </dl>
        <Button asChild size="sm" variant="secondary" className="w-full">
          <Link href={`/compare?a=${alt.key}`}>
            <Scale className="h-3.5 w-3.5" />
            {isRtl ? "قارن" : "Compare"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
