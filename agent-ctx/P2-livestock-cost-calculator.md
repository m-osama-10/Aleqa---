# P2 — Livestock Cost Calculator

**Agent:** main (Z.ai Code)
**Task:** Create `/livestock-cost-calculator` page (route + client component)

## Context reviewed
- `worklog.md` (existing P1/i18n work; no P2 history)
- `src/components/content/content-page-layout.tsx` — provides `ContentPageLayout` (sticky header w/ LanguageToggle + ThemeToggle, back link, footer w/ content page links)
- `src/lib/i18n.tsx` — exports `useLang()` returning `{ lang, dir, setLang, toggleLang, t }`. `lang === "ar"` for RTL/AR branch.
- `src/components/content/guide-content.tsx` — pattern for bilingual content page (`isRtl = lang === "ar"`, ternary `isRtl ? AR : EN` blocks, `ContentPageLayout` wrapper)
- `src/app/layout.tsx` — html has `dir="rtl"` hardcoded (not reactive to lang toggle), so visual RTL layout is constant; only strings switch AR↔EN.
- `src/components/ui/{card,input,label,button,badge,separator}.tsx` — shadcn New York components, all available.

## Files created

### 1. `src/app/livestock-cost-calculator/page.tsx`
- Server component (no "use client") rendering `<LivestockCostCalculator />`.
- Exports `metadata` with bilingual title + description (AR primary).
- Follows same pattern as `src/app/guide/page.tsx`.

### 2. `src/components/content/livestock-cost-calculator.tsx` ("use client")
Full feature breakdown:

**State:** single `useState<Inputs>` object holding 9 string fields (kept as strings to allow free typing; parsed to numbers in `useMemo`).

**Default values** (realistic Egyptian fattening scenario):
- 10 head, 18 000 EGP purchase/head, 200→400 kg, 120 days, 6 kg feed/day, 12 EGP/kg feed, 180 EGP/kg sale, 5 000 EGP other.

**Live calculations** (pure `useMemo`, deps `[inputs]`):
| Output | Formula | Guard |
|---|---|---|
| totalWeightGain | `max(0, target - initial) × count` | `Math.max(0,…)` |
| totalFeedConsumed | `feedPerDay × period × count` | — |
| totalFeedCost | `totalFeedConsumed × feedPrice` | — |
| totalPurchaseCost | `count × purchasePrice` | — |
| totalCost | `purchase + feed + other` | — |
| costPerKgGained | `totalCost / totalWeightGain` | `totalWeightGain > 0` |
| totalRevenue | `targetWeight × salePrice × count` | — |
| netProfit | `revenue - totalCost` | — |
| profitMargin % | `(profit / revenue) × 100` | `revenue > 0` |
| breakEvenPrice/kg | `totalCost / (targetWeight × count)` | `targetWeight × count > 0` |
| roi % | `(profit / totalCost) × 100` | `totalCost > 0` |

Plus cost-breakdown ratios (purchase/feed/other as % of totalCost) guarded with `costBase = totalCost > 0 ? totalCost : 1`.

**Helpers:**
- `num(v)` — parse string → finite non-negative number, else 0.
- `fmt(n, lang, maxFrac=2)` — `toLocaleString` with `ar-EG` (AR) or `en-US` (EN), no minimum fraction digits.

**UI layout:**
- `ContentPageLayout` wrapper with bilingual title.
- Intro paragraph (bilingual).
- `grid md:grid-cols-2` — in the page's RTL html context, the **first child (Inputs card) renders on the RIGHT**, **second child (Results stack) renders on the LEFT** on desktop, matching the spec. On mobile, stacks inputs above results.
- Sticky header + sticky footer handled by `ContentPageLayout`.

**Inputs card (right):**
- Header: Beef icon + title + description + ghost Reset button.
- 9 fields, each with: icon-prefixed Label, numeric Input (`type="number" inputMode="decimal" min={0} step="any"`), and a fixed-width unit chip (head / kg / days / kg/day / EGP/kg / EGP).

**Results stack (left) — 3 cards:**

1. **Net Profit headline card** — color-coded by status:
   - `isBreakEven` (|profit| < 0.5 EGP) → **amber** (border, icon bg, text, badge)
   - `isProfit` (profit > 0) → **emerald/green**
   - `isLoss` (profit < 0) → **rose/red**
   - Big 3xl profit number + EGP suffix.
   - Status Badge (Profitable / Loss-making / At break-even).
   - Icon switches ArrowUpRight / ArrowDownRight / PiggyBank.
   - 2-col sub-grid showing Total Revenue + Total Cost.
   - 2px colored border + tinted bg (`/5` opacity).

2. **Cost Breakdown card** — BarChart3 icon.
   - Three custom horizontal bars (not shadcn Progress, but visually identical and color-customizable per category):
     - Purchase → `bg-primary`
     - Feed → `bg-amber-500`
     - Other → `bg-slate-500`
   - Each row: icon + label + "amount EGP · ratio%" + animated width bar.
   - Header shows total cost.

3. **Economic Indicators card** — DollarSign icon, 2-col grid of 8 `Metric` tiles:
   - totalWeightGain (kg)
   - totalFeedConsumed (kg)
   - totalFeedCost (EGP)
   - totalPurchaseCost (EGP)
   - costPerKgGained (EGP/kg)
   - breakEvenPrice (EGP/kg) — AlertTriangle icon
   - profitMargin (%) — color-toned green/red/amber
   - roi (%) — color-toned green/red/amber

**Sub-components:**
- `BreakdownBar({label,icon,amount,ratio,color,lang,egp})` — single bar row.
- `Metric({label,value,unit,icon,tone?})` — single indicator tile, optional tone for profit/loss coloring.

**Bilingual strategy:** A single `L` object built once per render via `isRtl ? {AR keys} : {EN keys}`. Same pattern as `guide-content.tsx` but consolidated into one object for readability. EGP label flips between `ج.م` (AR) and `EGP` (EN).

**Accessibility:** all inputs have associated `<Label htmlFor>`, icons are decorative (aria-hidden by default in lucide), unit chips are visually styled spans, color is never the only signal (icons + text labels also present).

## Quality gates
- `bun run lint` — **PASS** (clean, no new errors)
- `bunx tsc --noEmit` (whole project) — no errors in the two new files (pre-existing unrelated errors in `rations-screen.tsx` lines 481-482 remain).
- All 4 division-by-zero cases guarded.
- All numeric outputs formatted via `toLocaleString`.
- Pure calculations inside `useMemo` — no side effects, no external state.
- Existing `ContentPageLayout` / `useLang` / shadcn components used unmodified.

## How to view
Open the Preview Panel and navigate to `/livestock-cost-calculator`. Use the language toggle (EN/ع) in the header to switch AR↔EN — all labels, units, currency suffix and number formatting update live.
