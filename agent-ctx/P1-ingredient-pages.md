# Task P1 — Ingredient pages + Comparison page

**Agent:** ingredient-pages (Z.ai Code)
**Task ID:** P1
**Date:** 2025-07-14

## Context
- Project: Next.js 16 static-export app (`output: "export"`, `trailingSlash: true`) for the Alieqa feed calculator.
- Read existing patterns from `src/components/content/faq-content.tsx`, `src/components/content/nutrition-content.tsx`, `src/components/content/content-page-layout.tsx`, `src/components/aleeqa/prices-screen.tsx`, `src/lib/ingredient-db.ts`, `src/lib/ingredient-details.ts`, `src/lib/i18n.tsx`.
- Read worklog for prior i18n migration context (Task 3) — confirmed `CATEGORY_LABELS_EN`, `categoryLabel()`, `CATEGORY_ORDER` all available.

## Files created

### 1. `src/components/content/ingredient-list-content.tsx` ("use client")
- `/ingredients` index page client component.
- Uses `ContentPageLayout` with bilingual title "مكوّنات العليقة" / "Feed Ingredients".
- Renders a Compare CTA card linking to `/compare`.
- Search input (filters by AR name, EN name, or key) + category `Select` filter (All + 6 categories from `CATEGORY_ORDER`).
- Groups results by category, each section has heading + count `Badge`.
- Each ingredient is a `Card` (link to `/ingredients/[key]`) showing emoji, name, brief nutrition (protein/energy), and price.
- Empty state for no matches.
- Bilingual via `lang === "ar"` checks; uses `t("common.egp")`, `t("common.kg")` for units.

### 2. `src/components/content/ingredient-detail-content.tsx` ("use client")
- `/ingredients/[key]` detail page client component.
- Takes `ingredientKey: string` prop.
- Reads ingredient from `DEFAULT_INGREDIENTS.find(i => i.key === key)` and detail from `getIngredientDetail(key)`.
- Graceful not-found fallback when key is invalid.
- Hero card: large emoji + bilingual name + EN name + key + category `Badge` + 3 quick stats (protein/energy/price) + "Compare with another ingredient" button linking to `/compare?a=<key>`.
- Description section (from detail.description/En).
- Nutrition table: 7 rows (protein, tdn, fiber, fat, calcium, phosphorus, dryMatter) with zebra striping and primary-color values.
- Usage bounds: two cards for minUsage / maxUsage + detail.uses/En paragraph.
- Pros/cons side-by-side cards (emerald for pros with `Check` icons, rose for cons with `X` icons).
- When to use / when to avoid cards (primary + amber color-coded).
- Alternatives section: grid of `AlternativeCard` showing alt name (links to detail page), replacement ratio badge, 3-column impact grid (protein/energy/cost), and Compare button.
- Bottom action buttons linking back to `/ingredients` and `/compare`.
- All bilingual.

### 3. `src/components/content/compare-content.tsx` ("use client")
- `/compare` page client component.
- Wrapped in `Suspense` (required for `useSearchParams` in static export).
- Reads optional `?a=KEY` and `?b=KEY` query params; validates against `VALID_KEYS` constant; falls back to `corn` vs `soybean44` if invalid/missing.
- `useEffect` keeps state in sync if URL changes.
- Two `IngredientSelect` dropdowns (grouped by category, with the other side disabled to prevent duplicate selection).
- Swap button to flip A/B.
- `ComparisonTable`: 10 rows (protein, tdn, fiber, fat, calcium, phosphorus, dryMatter, price, minUsage, maxUsage) with winner highlighting (emerald background) — `higherIsBetter: true|false|null` per row (null = neutral, no highlight).
- `ProsConsCard` for each side (uses `getIngredientDetail` for pros/cons lists).
- Recommendation card: computes `protein/price` value index per ingredient, picks overall winner, generates 1–5 bilingual point sentences (protein winner, energy winner, price winner, value winner, max-usage headroom) + summary line.
- Bottom: two outline buttons linking to each ingredient's detail page.

### 4. `src/app/ingredients/page.tsx` (server component)
- Default export renders `<IngredientListContent />`.
- Static `metadata` with bilingual title + description + canonical + OpenGraph.

### 5. `src/app/ingredients/[key]/page.tsx` (server component)
- `generateStaticParams()` returns all 22 ingredient keys → 22 static HTML files at build time.
- `generateMetadata({ params })` — async (Next.js 16 promises-based params); returns per-ingredient `<title>` formatted as `"{AR name} | {EN name} | عليقة"` and bilingual description (uses `detail.description` if available, else synthesized from nutrition/price). Includes canonical + OpenGraph.
- Default export async function awaits `params` then renders `<IngredientDetailContent ingredientKey={key} />`.

### 6. `src/app/compare/page.tsx` (server component)
- Default export renders `<CompareContent />`.
- Static `metadata` with bilingual title + description + canonical + OpenGraph.

## Implementation notes
- All client components start with `"use client"`.
- All pages use `ContentPageLayout` (which provides the shared header with logo/back-link/language/theme toggles and footer with content-page links).
- Used shadcn/ui components: `Card`, `CardContent`, `CardHeader`, `CardTitle`, `Badge`, `Button`, `Separator`, `Input`, `Select` (+ `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue`).
- Used `lucide-react` icons: `Search`, `Scale`, `ChevronLeft`, `ArrowLeft`, `ArrowRight`, `Beaker`, `Check`, `X`, `Lightbulb`, `AlertTriangle`, `Layers`, `TrendingUp`, `ArrowLeftRight`, `Trophy`, `Coins`.
- Bilingual: every visible string is wrapped in `isRtl ? "AR" : "EN"` ternaries (per existing pattern in `faq-content.tsx`/`nutrition-content.tsx`). Used `t("common.egp")`, `t("common.kg")` from i18n dictionary for unit consistency.
- Did NOT modify any existing calculation logic (`feed-lp.ts`, `feed-data.ts`, etc.).
- Did NOT touch `DEFAULT_INGREDIENTS` or `INGREDIENT_DETAILS` — read-only.
- Recommendation logic in compare is pure (no side effects, no calc engine changes) — purely a UI summary layer.
- Static export compatibility:
  - `generateStaticParams` for the dynamic route.
  - `Suspense` boundary around `useSearchParams` consumer in compare page.
  - `params` typed as `Promise<{ key: string }>` and awaited (Next.js 16 async dynamic API).

## Verification
- `bun run lint` → **0 errors, 0 warnings** (clean).
- `bunx tsc --noEmit` → no new errors in any of the 6 new files (only pre-existing errors in unrelated test/example/skill files).
- Dev server routes verified (HTTP 200 + meaningful HTML payload):
  - `GET /ingredients/` → 200 (71 KB, contains all 22 ingredient links, bilingual titles, category badges).
  - `GET /ingredients/corn/` → 200 (58 KB, title `<title>ذرة صفراء | Yellow Corn | عليقة</title>`, contains nutrition table, alternatives, compare CTA).
  - `GET /ingredients/{soybean44,hay,limestone,toxin_binder,vitamins}/` → all 200.
  - `GET /compare/` → 200 (62 KB).
  - `GET /compare/?a=corn&b=soybean44` → 200 (63 KB, contains both ingredient names, recommendation block, swap button, pros/cons side-by-side, highlighted winner cells).
- Spot-checked all 22 ingredient detail links resolve from the index page.

## What was NOT done (out of scope)
- No changes to `/` (home) route — it remains as-is.
- No changes to calculation logic, ingredient DB schema, or i18n dictionary keys (used existing `common.egp` / `common.kg`).
- No unit tests (per "do not write any test code" rule).
- No new shadcn/ui components installed — used only the existing ones.
