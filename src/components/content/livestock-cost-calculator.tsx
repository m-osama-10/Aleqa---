"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Beef,
  CalendarDays,
  Coins,
  DollarSign,
  Hash,
  Minus,
  PiggyBank,
  Percent,
  Receipt,
  Scale,
  Tag,
  Target,
  TrendingUp,
  Wheat,
} from "lucide-react";
import { ContentPageLayout } from "./content-page-layout";
import { useLang } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Inputs = {
  count: string;
  purchasePrice: string;
  initialWeight: string;
  targetWeight: string;
  period: string;
  feedPerDay: string;
  feedPrice: string;
  salePrice: string;
  otherExpenses: string;
};

const DEFAULTS: Inputs = {
  count: "10",
  purchasePrice: "18000",
  initialWeight: "200",
  targetWeight: "400",
  period: "120",
  feedPerDay: "6",
  feedPrice: "12",
  salePrice: "180",
  otherExpenses: "5000",
};

/** Parse a numeric string into a finite non-negative number, or 0. */
function num(v: string): number {
  const n = parseFloat(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

/** Format a number with grouping (ar-EG for AR, en-US for EN). */
function fmt(n: number, lang: "ar" | "en", maxFrac = 2): string {
  const locale = lang === "ar" ? "ar-EG" : "en-US";
  return n.toLocaleString(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFrac,
  });
}

export function LivestockCostCalculator() {
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  // Live calculations — pure, no external state.
  const calc = useMemo(() => {
    const count = num(inputs.count);
    const purchasePrice = num(inputs.purchasePrice);
    const initialWeight = num(inputs.initialWeight);
    const targetWeight = num(inputs.targetWeight);
    const period = num(inputs.period);
    const feedPerDay = num(inputs.feedPerDay);
    const feedPrice = num(inputs.feedPrice);
    const salePrice = num(inputs.salePrice);
    const otherExpenses = num(inputs.otherExpenses);

    const totalWeightGain = Math.max(0, targetWeight - initialWeight) * count;
    const totalFeedConsumed = feedPerDay * period * count;
    const totalFeedCost = totalFeedConsumed * feedPrice;
    const totalPurchaseCost = count * purchasePrice;
    const totalCost = totalPurchaseCost + totalFeedCost + otherExpenses;
    const costPerKgGained =
      totalWeightGain > 0 ? totalCost / totalWeightGain : 0;
    const totalRevenue = targetWeight * salePrice * count;
    const netProfit = totalRevenue - totalCost;
    const profitMargin =
      totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    const breakEvenPrice =
      targetWeight * count > 0 ? totalCost / (targetWeight * count) : 0;
    const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

    // Cost breakdown ratios (guard against zero).
    const costBase = totalCost > 0 ? totalCost : 1;
    const purchaseRatio = (totalPurchaseCost / costBase) * 100;
    const feedRatio = (totalFeedCost / costBase) * 100;
    const otherRatio = (otherExpenses / costBase) * 100;

    return {
      count,
      totalWeightGain,
      totalFeedConsumed,
      totalFeedCost,
      totalPurchaseCost,
      totalCost,
      costPerKgGained,
      totalRevenue,
      netProfit,
      profitMargin,
      breakEvenPrice,
      roi,
      purchaseRatio,
      feedRatio,
      otherRatio,
    };
  }, [inputs]);

  const setField = (key: keyof Inputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((p) => ({ ...p, [key]: e.target.value }));
  };

  const reset = () => setInputs(DEFAULTS);

  // Profitability status.
  const isProfit = calc.netProfit > 0;
  const isLoss = calc.netProfit < 0;
  const isBreakEven = Math.abs(calc.netProfit) < 0.5; // within half an EGP

  // Bilingual strings.
  const L = isRtl
    ? {
        title: "حاسبة تكلفة التسمين",
        intro:
          "احسب تكلفة مشروع التسمين وصافي الربح وهامش الربح وسعر التعادل والعائد على الاستثمار لحظياً أثناء الكتابة.",
        inputsTitle: "المدخلات",
        inputsDesc: "أدخل بيانات مشروع التسمين",
        resultsTitle: "النتائج",
        resultsDesc: "محسوبة تلقائياً",
        f_count: "عدد الحيوانات",
        f_purchase: "سعر شراء الحيوان",
        f_initial: "الوزن الابتدائي",
        f_target: "الوزن المستهدف",
        f_period: "مدة التسمين",
        f_feed: "استهلاك العلف/حيوان/يوم",
        f_feedPrice: "سعر العلف",
        f_sale: "سعر البيع المتوقع",
        f_other: "مصروفات أخرى (أدوية، عمالة، نقل)",
        head: "رأس",
        kg: "كجم",
        day: "يوم",
        kgDay: "كجم/يوم",
        egpKg: "ج.م/كجم",
        egp: "ج.م",
        reset: "إعادة الضبط",
        netProfit: "صافي الربح",
        totalRevenue: "إجمالي الإيرادات",
        totalCost: "إجمالي التكلفة",
        costBreakdown: "توزيع التكلفة",
        purchase: "تكلفة الشراء",
        feed: "تكلفة التغذية",
        other: "مصروفات أخرى",
        metricsTitle: "المؤشرات الاقتصادية",
        m_gain: "إجمالي الزيادة في الوزن",
        m_feedConsumed: "إجمالي العلف المستهلك",
        m_feedCost: "إجمالي تكلفة التغذية",
        m_purchaseCost: "تكلفة الشراء",
        m_costPerKg: "تكلفة الكيلو المكتسب",
        m_margin: "هامش الربح",
        m_breakEven: "سعر التعادل/كجم",
        m_roi: "العائد على الاستثمار",
        statusProfit: "مشروع رابح",
        statusLoss: "مشروع خاسر",
        statusBreakEven: "عند نقطة التعادل",
        invalidHint: "أدخل بيانات صحيحة لحساب النتائج",
        noInput: "في انتظار إدخال البيانات",
      }
    : {
        title: "Livestock Cost Calculator",
        intro:
          "Calculate your fattening project's cost, net profit, profit margin, break-even price and ROI live as you type.",
        inputsTitle: "Inputs",
        inputsDesc: "Enter your fattening project data",
        resultsTitle: "Results",
        resultsDesc: "Auto-calculated",
        f_count: "Number of animals",
        f_purchase: "Purchase price per animal",
        f_initial: "Initial weight",
        f_target: "Target weight",
        f_period: "Fattening period",
        f_feed: "Feed consumption/animal/day",
        f_feedPrice: "Feed price",
        f_sale: "Expected sale price",
        f_other: "Other expenses (medicine, labor, transport)",
        head: "head",
        kg: "kg",
        day: "days",
        kgDay: "kg/day",
        egpKg: "EGP/kg",
        egp: "EGP",
        reset: "Reset",
        netProfit: "Net Profit",
        totalRevenue: "Total Revenue",
        totalCost: "Total Cost",
        costBreakdown: "Cost Breakdown",
        purchase: "Purchase",
        feed: "Feed",
        other: "Other",
        metricsTitle: "Economic Indicators",
        m_gain: "Total weight gain",
        m_feedConsumed: "Total feed consumed",
        m_feedCost: "Total feed cost",
        m_purchaseCost: "Purchase cost",
        m_costPerKg: "Cost per kg gained",
        m_margin: "Profit margin",
        m_breakEven: "Break-even price/kg",
        m_roi: "Return on investment",
        statusProfit: "Profitable project",
        statusLoss: "Loss-making project",
        statusBreakEven: "At break-even",
        invalidHint: "Enter valid data to see results",
        noInput: "Waiting for input",
      };

  const egp = isRtl ? "ج.م" : "EGP";

  // Status color logic.
  const statusTone = isBreakEven
    ? "amber"
    : isProfit
      ? "green"
      : "red";

  const statusClasses = {
    green: {
      card: "border-emerald-500/40 bg-emerald-500/5",
      icon: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
      text: "text-emerald-600 dark:text-emerald-400",
      badge: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      bar: "bg-emerald-500",
    },
    red: {
      card: "border-rose-500/40 bg-rose-500/5",
      icon: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
      text: "text-rose-600 dark:text-rose-400",
      badge: "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
      bar: "bg-rose-500",
    },
    amber: {
      card: "border-amber-500/40 bg-amber-500/5",
      icon: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
      text: "text-amber-600 dark:text-amber-400",
      badge: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
      bar: "bg-amber-500",
    },
  } as const;

  const tone = statusClasses[statusTone];

  // Input field definitions.
  const fields: {
    key: keyof Inputs;
    label: string;
    icon: React.ReactNode;
    unit: string;
    placeholder: string;
  }[] = [
    {
      key: "count",
      label: L.f_count,
      icon: <Hash className="h-4 w-4" />,
      unit: L.head,
      placeholder: "10",
    },
    {
      key: "purchasePrice",
      label: L.f_purchase,
      icon: <Tag className="h-4 w-4" />,
      unit: egp,
      placeholder: "18000",
    },
    {
      key: "initialWeight",
      label: L.f_initial,
      icon: <Scale className="h-4 w-4" />,
      unit: L.kg,
      placeholder: "200",
    },
    {
      key: "targetWeight",
      label: L.f_target,
      icon: <Target className="h-4 w-4" />,
      unit: L.kg,
      placeholder: "400",
    },
    {
      key: "period",
      label: L.f_period,
      icon: <CalendarDays className="h-4 w-4" />,
      unit: L.day,
      placeholder: "120",
    },
    {
      key: "feedPerDay",
      label: L.f_feed,
      icon: <Wheat className="h-4 w-4" />,
      unit: L.kgDay,
      placeholder: "6",
    },
    {
      key: "feedPrice",
      label: L.f_feedPrice,
      icon: <Coins className="h-4 w-4" />,
      unit: L.egpKg,
      placeholder: "12",
    },
    {
      key: "salePrice",
      label: L.f_sale,
      icon: <TrendingUp className="h-4 w-4" />,
      unit: L.egpKg,
      placeholder: "180",
    },
    {
      key: "otherExpenses",
      label: L.f_other,
      icon: <Receipt className="h-4 w-4" />,
      unit: egp,
      placeholder: "5000",
    },
  ];

  return (
    <ContentPageLayout title={L.title}>
      <div className="space-y-5">
        {/* Intro */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {L.intro}
        </p>

        {/* Two-column grid: inputs (right in RTL), results (left in RTL) */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* ============== INPUTS ============== */}
          <Card className="border-border/70">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Beef className="h-4 w-4" />
                  </span>
                  <div>
                    <CardTitle className="text-base">{L.inputsTitle}</CardTitle>
                    <CardDescription className="text-xs">
                      {L.inputsDesc}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={reset}
                  className="h-8 gap-1.5 text-xs text-muted-foreground"
                >
                  <Minus className="h-3.5 w-3.5" />
                  {L.reset}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3.5">
              {fields.map((f) => (
                <div key={f.key} className="space-y-1.5">
                  <Label
                    htmlFor={`f-${f.key}`}
                    className="flex items-center gap-2 text-xs font-semibold text-foreground"
                  >
                    <span className="text-muted-foreground">{f.icon}</span>
                    {f.label}
                  </Label>
                  <div className="flex items-stretch gap-2">
                    <Input
                      id={`f-${f.key}`}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      step="any"
                      value={inputs[f.key]}
                      onChange={setField(f.key)}
                      placeholder={f.placeholder}
                      className="h-10 text-sm font-semibold"
                    />
                    <span className="flex min-w-16 items-center justify-center rounded-md border border-border bg-secondary px-3 text-[11px] font-bold text-muted-foreground">
                      {f.unit}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* ============== RESULTS ============== */}
          <div className="space-y-4">
            {/* Headline: Net Profit */}
            <Card className={`${tone.card} border-2`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone.icon}`}
                    >
                      {isProfit ? (
                        <ArrowUpRight className="h-5 w-5" />
                      ) : isLoss ? (
                        <ArrowDownRight className="h-5 w-5" />
                      ) : (
                        <PiggyBank className="h-5 w-5" />
                      )}
                    </span>
                    <div>
                      <CardTitle className="text-sm font-bold">
                        {L.netProfit}
                      </CardTitle>
                      <CardDescription className="text-[11px]">
                        {L.resultsDesc}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${tone.badge} text-[10px] font-bold`}
                  >
                    {isBreakEven
                      ? L.statusBreakEven
                      : isProfit
                        ? L.statusProfit
                        : L.statusLoss}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-black tabular-nums ${tone.text}`}>
                  {fmt(calc.netProfit, lang)}{" "}
                  <span className="text-base font-bold opacity-70">{egp}</span>
                </div>
                <Separator className="my-3" />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[11px] font-medium text-muted-foreground">
                      {L.totalRevenue}
                    </div>
                    <div className="text-sm font-bold text-foreground tabular-nums">
                      {fmt(calc.totalRevenue, lang)} {egp}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-muted-foreground">
                      {L.totalCost}
                    </div>
                    <div className="text-sm font-bold text-foreground tabular-nums">
                      {fmt(calc.totalCost, lang)} {egp}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Card className="border-border/70">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BarChart3 className="h-4 w-4" />
                  </span>
                  <div>
                    <CardTitle className="text-sm font-bold">
                      {L.costBreakdown}
                    </CardTitle>
                    <CardDescription className="text-[11px]">
                      {fmt(calc.totalCost, lang)} {egp}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <BreakdownBar
                  label={L.purchase}
                  icon={<Tag className="h-3.5 w-3.5" />}
                  amount={calc.totalPurchaseCost}
                  ratio={calc.purchaseRatio}
                  color="bg-primary"
                  lang={lang}
                  egp={egp}
                />
                <BreakdownBar
                  label={L.feed}
                  icon={<Wheat className="h-3.5 w-3.5" />}
                  amount={calc.totalFeedCost}
                  ratio={calc.feedRatio}
                  color="bg-amber-500"
                  lang={lang}
                  egp={egp}
                />
                <BreakdownBar
                  label={L.other}
                  icon={<Receipt className="h-3.5 w-3.5" />}
                  amount={num(inputs.otherExpenses)}
                  ratio={calc.otherRatio}
                  color="bg-slate-500"
                  lang={lang}
                  egp={egp}
                />
              </CardContent>
            </Card>

            {/* Economic Indicators */}
            <Card className="border-border/70">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <DollarSign className="h-4 w-4" />
                  </span>
                  <div>
                    <CardTitle className="text-sm font-bold">
                      {L.metricsTitle}
                    </CardTitle>
                    <CardDescription className="text-[11px]">
                      {L.resultsDesc}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2.5">
                <Metric
                  label={L.m_gain}
                  value={fmt(calc.totalWeightGain, lang)}
                  unit={L.kg}
                  icon={<Scale className="h-3.5 w-3.5" />}
                />
                <Metric
                  label={L.m_feedConsumed}
                  value={fmt(calc.totalFeedConsumed, lang)}
                  unit={L.kg}
                  icon={<Wheat className="h-3.5 w-3.5" />}
                />
                <Metric
                  label={L.m_feedCost}
                  value={fmt(calc.totalFeedCost, lang)}
                  unit={egp}
                  icon={<Coins className="h-3.5 w-3.5" />}
                />
                <Metric
                  label={L.m_purchaseCost}
                  value={fmt(calc.totalPurchaseCost, lang)}
                  unit={egp}
                  icon={<Tag className="h-3.5 w-3.5" />}
                />
                <Metric
                  label={L.m_costPerKg}
                  value={fmt(calc.costPerKgGained, lang)}
                  unit={L.egpKg}
                  icon={<DollarSign className="h-3.5 w-3.5" />}
                />
                <Metric
                  label={L.m_breakEven}
                  value={fmt(calc.breakEvenPrice, lang)}
                  unit={L.egpKg}
                  icon={<AlertTriangle className="h-3.5 w-3.5" />}
                />
                <Metric
                  label={L.m_margin}
                  value={fmt(calc.profitMargin, lang, 1)}
                  unit="%"
                  icon={<Percent className="h-3.5 w-3.5" />}
                  tone={
                    calc.profitMargin > 0
                      ? "green"
                      : calc.profitMargin < 0
                        ? "red"
                        : "amber"
                  }
                />
                <Metric
                  label={L.m_roi}
                  value={fmt(calc.roi, lang, 1)}
                  unit="%"
                  icon={<TrendingUp className="h-3.5 w-3.5" />}
                  tone={
                    calc.roi > 0
                      ? "green"
                      : calc.roi < 0
                        ? "red"
                        : "amber"
                  }
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ContentPageLayout>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function BreakdownBar({
  label,
  icon,
  amount,
  ratio,
  color,
  lang,
  egp,
}: {
  label: string;
  icon: React.ReactNode;
  amount: number;
  ratio: number;
  color: string;
  lang: "ar" | "en";
  egp: string;
}) {
  const locale = lang === "ar" ? "ar-EG" : "en-US";
  const amountStr = amount.toLocaleString(locale, {
    maximumFractionDigits: 0,
  });
  const ratioStr = ratio.toLocaleString(locale, {
    maximumFractionDigits: 1,
  });

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-semibold text-foreground">
          <span className="text-muted-foreground">{icon}</span>
          {label}
        </span>
        <span className="tabular-nums text-muted-foreground">
          {amountStr} {egp}
          <span className="mx-1 opacity-50">·</span>
          <span className="font-bold text-foreground">{ratioStr}%</span>
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${Math.min(100, Math.max(0, ratio))}%` }}
        />
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  unit,
  icon,
  tone,
}: {
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  tone?: "green" | "red" | "amber";
}) {
  const toneText =
    tone === "green"
      ? "text-emerald-600 dark:text-emerald-400"
      : tone === "red"
        ? "text-rose-600 dark:text-rose-400"
        : tone === "amber"
          ? "text-amber-600 dark:text-amber-400"
          : "text-foreground";

  return (
    <div className="rounded-lg border border-border/60 bg-secondary/30 p-2.5">
      <div className="mb-1 flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
        <span className="opacity-70">{icon}</span>
        <span className="line-clamp-1">{label}</span>
      </div>
      <div className={`text-sm font-extrabold tabular-nums ${toneText}`}>
        {value}
        <span className="ms-1 text-[10px] font-medium opacity-70">{unit}</span>
      </div>
    </div>
  );
}
