/* ================================================================== */
/*  WARNING TRANSLATOR                                                  */
/*                                                                     */
/*  The LP formulators (feed-lp.ts) emit Arabic warning strings with   */
/*  embedded numbers (e.g. "البروتين 14.5% أقل من المطلوب 15%.").     */
/*  This module translates those warnings to English at display time,  */
/*  without changing the formulator signatures or the FormulationResult */
/*  type. It uses pattern matching on the known Arabic warning templates. */
/* ================================================================== */

import type { Lang } from "./i18n";

/**
 * Translate a single Arabic warning string to the target language.
 * If the language is Arabic, returns the warning unchanged.
 * If no English match is found, returns the original Arabic (better than nothing).
 */
export function translateWarning(warning: string, lang: Lang): string {
  if (lang === "ar") return warning;

  // Extract numbers from the warning for re-insertion into English template
  const nums = warning.match(/[\d.]+/g) ?? [];

  // Pattern-based translation (order matters — most specific first)
  const patterns: Array<{ test: RegExp; en: (n: string[]) => string }> = [
    {
      test: /النسبة المثبتة \(([\d.]+)%\) تتجاوز 100%\. لا يمكن إكمال التركيبة\./,
      en: ([pct]) => `Locked percentage (${pct}%) exceeds 100%. Cannot complete the ration.`,
    },
    {
      test: /البروتين ([\d.]+)% أقل من المطلوب ([\d.]+)%\. لا توجد خامات قابلة للتعديل\./,
      en: ([achieved, target]) => `Protein ${achieved}% is below the required ${target}%. No adjustable ingredients available.`,
    },
    {
      test: /الطاقة ([\d.]+)% أقل من المطلوب ([\d.]+)%\. لا توجد خامات قابلة للتعديل\./,
      en: ([achieved, target]) => `Energy ${achieved}% is below the required ${target}%. No adjustable ingredients available.`,
    },
    {
      test: /الألياف ([\d.]+)% أعلى من الحد الأقصى ([\d.]+)%\./,
      en: ([achieved, max]) => `Fiber ${achieved}% exceeds the maximum ${max}%.`,
    },
    {
      test: /البروتين المتحقق ([\d.]+)% أقل من المطلوب ([\d.]+)%\. اقتراح: قلّل كمية الخامات منخفضة البروتين أو أضف مصدر بروتين\./,
      en: ([achieved, target]) => `Achieved protein ${achieved}% is below required ${target}%. Tip: reduce low-protein ingredients or add a protein source.`,
    },
    {
      test: /الطاقة المتحققة ([\d.]+)% أقل من المطلوب ([\d.]+)%\. اقتراح: زِد كمية الذرة أو مصادر الطاقة\./,
      en: ([achieved, target]) => `Achieved energy ${achieved}% is below required ${target}%. Tip: increase corn or energy sources.`,
    },
    {
      test: /الألياف المتحققة ([\d.]+)% أعلى من الحد الأقصى ([\d.]+)%\. اقتراح: قلّل الألياف الخشنة\./,
      en: ([achieved, max]) => `Achieved fiber ${achieved}% exceeds maximum ${max}%. Tip: reduce roughage.`,
    },
    {
      test: /البروتين ([\d.]+)% أقل من الهدف ([\d.]+)%\./,
      en: ([achieved, target]) => `Protein ${achieved}% is below the target ${target}%.`,
    },
    {
      test: /الطاقة ([\d.]+)% أقل من الهدف ([\d.]+)%\./,
      en: ([achieved, target]) => `Energy ${achieved}% is below the target ${target}%.`,
    },
    {
      test: /الألياف ([\d.]+)% أعلى من المحدود ([\d.]+)%\./,
      en: ([achieved, max]) => `Fiber ${achieved}% exceeds the limit ${max}%.`,
    },
    {
      test: /مجموع النسب ([\d.]+)% — قد لا تكون التركيبة متوازنة تماماً\./,
      en: ([sum]) => `Sum of percentages is ${sum}% — the ration may not be fully balanced.`,
    },
    {
      test: /مجموع النسب ([\d.]+)% — يجب أن يساوي 100%\./,
      en: ([sum]) => `Sum of percentages is ${sum}% — must equal 100%.`,
    },
    // Static (no-number) warnings
    {
      test: /لا يمكن تحقيق القيم الغذائية المستهدفة بالكامل مع الخامات المثبتة والمتاحة\./,
      en: () => `Cannot fully achieve the nutritional targets with the locked and available ingredients.`,
    },
    {
      test: /هذه أفضل تركيبة ممكنة بالقيود الحالية\. يمكنك تعديل الخامات المثبتة لتوسيع نطاق الحلول\./,
      en: () => `This is the best ration possible with current constraints. Adjust locked ingredients to expand the solution range.`,
    },
    {
      test: /البروتين أقل قليلاً من الهدف — راجع حدود الصويا\./,
      en: () => `Protein slightly below target — review soybean bounds.`,
    },
    {
      test: /الطاقة أقل من الهدف — اسمح بمزيد من الذرة\./,
      en: () => `Energy below target — allow more corn.`,
    },
    {
      test: /الألياف أعلى من الموصى — قلّل التبن\/الدريس\./,
      en: () => `Fiber above recommended — reduce straw/hay.`,
    },
    {
      test: /البروتين أقل من الهدف الموصى به\./,
      en: () => `Protein below the recommended target.`,
    },
    {
      test: /الطاقة أقل من الهدف الموصى به\./,
      en: () => `Energy below the recommended target.`,
    },
    {
      test: /الألياف أعلى من الموصى به\./,
      en: () => `Fiber above recommended.`,
    },
    {
      test: /لا يوجد حل ممكن بهذه القيود\. جرّب توسيع الحدود المتاحة أو راجع الأسعار\./,
      en: () => `No feasible solution with these constraints. Try widening the bounds or review prices.`,
    },
    {
      test: /لا توجد خامات قابلة للتعديل\. التركيبة الحالية هي الأفضل الممكنة\./,
      en: () => `No adjustable ingredients. The current ration is the best possible.`,
    },
  ];

  for (const { test, en } of patterns) {
    const match = warning.match(test);
    if (match) {
      // Pass captured groups (excluding the full match at [0])
      return en(match.slice(1));
    }
  }

  // Fallback: return original Arabic if no pattern matched
  return warning;
}

/**
 * Translate an array of warning strings.
 */
export function translateWarnings(warnings: string[], lang: Lang): string[] {
  if (lang === "ar") return warnings;
  return warnings.map((w) => translateWarning(w, lang));
}
