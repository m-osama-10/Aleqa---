---
Task ID: P4
Agent: knowledge-articles-expansion (Z.ai Code)
Task: Add 20 new bilingual (AR + EN) articles to src/lib/articles.ts — 10 sheep nutrition + 10 ingredient guides

Work Log:
- Read worklog.md (P1/P2/P3 history) and P3-knowledge-center.md agent-ctx. Confirmed 8 existing articles in src/lib/articles.ts ending at line 1555 with `];`. Confirmed Article interface and ArticleCategoryKey (including already-declared "sheep" and "ingredients" categories in ARTICLE_CATEGORIES), and the bilingual content format using template-literal markdown strings.
- Verified ARTICLES array structure and helper functions (getArticle, getCategory, getArticlesByCategory, getRelatedArticles, ARTICLE_SLUGS) at the bottom of the file — preserved untouched.
- Located insertion point (line 1554 `  },` + line 1555 `];`) via Grep on `slug:\s*"`. Replaced `  },\n];\n\n/* ---------------- Lookup helpers ---------------- */` with the last article's closing `},` followed by 20 new article objects (each with the standard `/* ---- */` divider block) and final `];`.

Files modified:
1. src/lib/articles.ts — added 20 articles (sheep + ingredients categories). File grew from 1585 → 5213 lines.

Sheep category (10 new articles):
* sheep-nutrition-basics (5 min, 2025-02-05) — intro + per-ewe requirements + concentrate/roughage split + calculation example + conclusion. Related: sheep-protein-energy-fiber, sheep-fattening-rations, seasonal-feed-management.
* lamb-nutrition-by-age (6 min, 2025-02-08) — 4 age stages (colostrum, weaning, growth, finishing) with target weights, plus practical tips. Related: sheep-nutrition-basics, sheep-fattening-rations, lactating-ewe-nutrition.
* sheep-fattening-rations (6 min, 2025-02-12) — 3 sample rations (corn+soybean, economic cottonseed, summer heat-tolerant) with markdown tables, daily amount calc, switching strategy. Related: sheep-nutrition-basics, reducing-sheep-feed-cost, sheep-protein-energy-fiber.
* pregnant-ewe-nutrition (5 min, 2025-02-15) — 3 gestation stages, pregnancy toxemia prevention, practical feeding table. Related: lactating-ewe-nutrition, sheep-nutrition-basics, sheep-minerals-vitamins.
* lactating-ewe-nutrition (5 min, 2025-02-18) — peak/sustained/weaning phases, common mistakes, sample ration table. Related: pregnant-ewe-nutrition, sheep-nutrition-basics, lamb-nutrition-by-age.
* sheep-seasonal-feeding (6 min, 2025-02-22) — Egyptian clover winter vs dry summer, markdown-table rations for each season, summer management tips. Related: seasonal-feed-management, sheep-nutrition-basics, sheep-feeding-mistakes.
* sheep-feeding-mistakes (5 min, 2025-02-25) — 8 numbered common mistakes with scientific solutions (gossypol, clover neglect, single-meal feeding, water quality, sudden transitions, mineral neglect, feed storage). Related: common-feeding-mistakes, sheep-nutrition-basics, reducing-sheep-feed-cost.
* reducing-sheep-feed-cost (5 min, 2025-03-01) — 5 strategies (clover, cheaper alternatives like broken rice/sorghum/sunflower meal, urea-treated straw, bulk buying, loss reduction, Aleeqa calculator). Related: saving-money-on-feed, sheep-fattening-rations, sheep-feeding-mistakes.
* sheep-protein-energy-fiber (5 min, 2025-03-04) — detailed breakdown of CP/TDN/CF roles, requirements tables by stage, sources, balance example with calculated totals. Related: understanding-protein-energy, sheep-nutrition-basics, sheep-minerals-vitamins.
* sheep-minerals-vitamins (5 min, 2025-03-07) — macro/micro minerals + vitamins A/D/E/B with roles, requirements, sources, deficiency symptoms; sheep-specific copper toxicity warning. Related: sheep-nutrition-basics, sheep-protein-energy-fiber, pregnant-ewe-nutrition.

Ingredients category (10 new articles):
* corn-yellow-nutrition (5 min, 2025-03-10) — TDN 88%, nutritional table, advantages/disadvantages, max usage by animal type, 4 economic alternatives (broken rice, barley, sorghum, biscuit by-products). Related: barley-in-rations, understanding-protein-energy, ddgs-in-feed.
* barley-in-rations (5 min, 2025-03-13) — comparison vs corn, when-best scenarios (summer, finishing), processing methods (grinding/soaking/steam), beta-glucan warning. Related: corn-yellow-nutrition, understanding-protein-energy, wheat-bran-types-benefits.
* soybean-meal-guide (6 min, 2025-03-16) — 44% vs dehulled 46-48% values, advantages (amino acid profile, digestibility 90-95%, toxin-free), disadvantages (price, anti-nutritional factors in raw), urease test, usage limits, diversification strategy. Related: sunflower-meal-guide, understanding-protein-energy, corn-yellow-nutrition.
* sunflower-meal-guide (5 min, 2025-03-19) — 3 types (decorticated/non-decorticated/solvent), nutritional value, advantages (price 35-50% cheaper, methionine-rich, toxin-free), disadvantages (high fiber, lysine deficiency), usage limits by animal, practical replacement recipe. Related: soybean-meal-guide, understanding-protein-energy, reducing-sheep-feed-cost.
* wheat-bran-types-benefits (5 min, 2025-03-22) — 4 Egyptian mill types (coarse/fine/shorts/mill-run), nutritional values, 5 benefits (phosphorus source, digestion, energy booster, binding agent, B vitamins), phytate warning, usage limits. Related: corn-yellow-nutrition, barley-in-rations, reducing-sheep-feed-cost.
* hay-silage-straw-differences (6 min, 2025-03-25) — 3 roughage types (fresh clover, hay, straw), full nutritional tables, advantages/disadvantages/usage limits for each, comparison table, treatment methods (urea, ammonia, chopping). Related: wheat-bran-types-benefits, sheep-seasonal-feeding, molasses-in-rations.
* molasses-in-rations (5 min, 2025-03-28) — nutritional value, 6 benefits (palatability, dust binder, fast energy, additive carrier, potassium source, milk production), disadvantages, usage limits by animal, practical uses (straw treatment, pelleting, UMMB blocks, sweetening). Related: wheat-bran-types-benefits, hay-silage-straw-differences, reducing-sheep-feed-cost.
* minerals-vitamins-importance (5 min, 2025-03-31) — comprehensive macro/micro minerals + vitamins guide with addition sources and amounts, practical mineral mix recipe per ton of feed, sheep copper warning, buying tips. Related: sheep-minerals-vitamins, understanding-protein-energy, soybean-meal-guide.
* ddgs-in-feed (5 min, 2025-04-03) — DDGS nutritional value, 5 advantages (high protein, energy, price 30-50% cheaper than soybean, palatability, B vitamins), 6 disadvantages (quality variability, low lysine, high sulfur, mycotoxin risk, color/odor, not for young calves), usage limits by animal, practical recipe. Related: corn-yellow-nutrition, soybean-meal-guide, gluten-feed-alternative.
* gluten-feed-alternative (5 min, 2025-04-06) — 3 corn starch by-products (Gluten Feed, Gluten Meal, Corn Germ), 2 nutritional tables, when-each-is-suitable alternatives (bran replacement, soybean replacement, fishmeal alternative), usage limits, advantages (quality stability, methionine-rich, xanthophyll color, high digestibility), practical layer ration recipe. Related: corn-yellow-nutrition, ddgs-in-feed, soybean-meal-guide.

Content quality:
- All articles have 5-7 paragraphs with proper markdown structure: ## main sections, ### subsections where appropriate, bullet lists, markdown tables for rations/nutritional values, blockquote tips.
- Practical numbers throughout: actual TDN % values, kg/day amounts, g/head/day targets, max usage % per animal type, Egyptian-relevant context (clover season Nov-Apr, Upper Egypt sorghum, local market prices, EGP/kg examples).
- Each article ends with a خلاصة/Conclusion section.
- Bilingual AR + EN content with matched structure (same headings, same tables, same key numbers).
- relatedSlugs verified to reference only existing slugs (Python cross-check showed 27 unique related-slug references, 0 missing — all 28 article slugs form a connected graph).
- publishedAt dates spaced 2025-02-05 → 2025-04-06 (after the 8 existing 2025-01-15 → 2025-02-20 articles, no overlaps).

Verification:
- `grep -cE '^\s+slug:\s*"' src/lib/articles.ts` returns **28** (was 8, added 20). Required target met.
- `bun run lint` — passed with zero errors.
- `npx tsc --noEmit --skipLibCheck src/lib/articles.ts` — passed with zero TypeScript errors.
- Dev server smoke test: started `bun run dev`, curled all 20 new article routes `/knowledge/{slug}/` (with trailing slash per Next.js trailingSlash:true), all returned HTTP 200; `/knowledge/` hub returned 200. Killed dev server cleanly.
- One initial syntax bug found and fixed: `reducing-sheep-feed-cost` content string ended with `'` (single quote) instead of `` ` `` (backtick) — detected via visual review, fixed via Edit before lint.

No other files touched. Helper functions and ARTICLE_CATEGORIES (which already declared "sheep" and "ingredients") untouched. Existing 8 articles unchanged.

Handoff to next agent:
- src/lib/articles.ts now has 28 articles. Helper functions (getArticle, getArticlesByCategory, getRelatedArticles, ARTICLE_SLUGS) work unchanged — downstream code (src/app/knowledge/[slug]/page.tsx, knowledge-hub-content.tsx, article-content.tsx) automatically picks up the new articles via these helpers.
- No build step needed; lint + tsc + dev-server HTTP 200 all confirmed.
- All new slugs are reachable as static routes (Next.js static export with trailingSlash:true means `/knowledge/{slug}/` URLs).
