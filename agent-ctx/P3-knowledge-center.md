---
Task ID: P3
Agent: knowledge-center (Z.ai Code)
Task: Build Knowledge Center hub + article pages + SEO infrastructure (sitemap, robots)

Work Log:
- Read worklog.md (P1/P2/i18n history), faq-content.tsx, content-page-layout.tsx, guide-content.tsx, ingredient-list-content.tsx, ingredient-detail-content.tsx, compare-content.tsx, i18n.tsx (useLang signature, lang==="ar" pattern), layout.tsx (LanguageProvider global), ingredient-db.ts (DEFAULT_INGREDIENTS 22 keys + CATEGORY_LABELS), feed-data.ts (ANIMAL_ORDER), next.config.ts (output: "export" + trailingSlash: true), package.json (no react-markdown usage yet).
- Existing routes confirmed: /privacy, /faq, /guide, /nutrition, /ingredients, /ingredients/[key] (22 keys), /compare, /livestock-cost-calculator. No /knowledge existed. No sitemap.ts or robots.ts existed. public/robots.txt was a static file (removed to let app/robots.ts take precedence).
- Followed ContentPageLayout + "use client" + isRtl = lang === "ar" pattern from existing content components.

Files created:

1. src/lib/articles.ts (~600 lines)
   - ArticleCategoryKey type: "cattle" | "buffalo" | "sheep" | "poultry" | "ingredients" | "nutrition-values" | "calculator-guide" | "tips" | "mistakes"
   - ArticleCategory interface (key, nameAr, nameEn, descriptionAr, descriptionEn, emoji)
   - ARTICLE_CATEGORIES: 9 categories matching the task spec
   - Article interface (slug, category, title, titleEn, excerpt, excerptEn, content, contentEn, readTime, relatedSlugs, publishedAt)
   - ARTICLES: 8 articles with substantial AR + EN markdown content (4-7 paragraphs each):
     * cattle-nutrition-basics (cattle, 6 min, 2025-01-15)
     * buffalo-nutrition-guide (buffalo, 5 min, 2025-01-20) — includes markdown table
     * poultry-feed-formulation (poultry, 6 min, 2025-01-25)
     * understanding-protein-energy (nutrition-values, 5 min, 2025-02-01)
     * common-feeding-mistakes (mistakes, 6 min, 2025-02-05)
     * how-to-use-calculator (calculator-guide, 5 min, 2025-02-10)
     * saving-money-on-feed (tips, 5 min, 2025-02-15)
     * seasonal-feed-management (tips, 5 min, 2025-02-20)
   - Helpers: getArticle(slug), getCategory(key), getArticlesByCategory(key), getRelatedArticles(slug), ARTICLE_SLUGS export

2. src/components/content/knowledge-hub-content.tsx (~270 lines, "use client")
   - KnowledgeHubContent component using ContentPageLayout
   - 9 category cards (2-col mobile / 3-col desktop) with emoji + name + description + count badge; click toggles category filter (ring highlight + bg-primary/5)
   - Search input (filters by title + titleEn + excerpt + excerptEn + slug) + category Select dropdown
   - Article list below — each ArticleCard shows: category Badge, read-time + Clock icon, title, 2-line excerpt, chevron
   - Article count badge + "Clear filter" button when filtered
   - CTA card at bottom (Start calculating → /)
   - Bilingual AR + EN throughout via lang === "ar"

3. src/components/content/article-content.tsx (~390 lines, "use client")
   - ArticleContent component (takes slug prop)
   - JSON-LD Article structured data injected via <script type="application/ld+json"> with useMemo: @type=Article, headline, description, datePublished, dateModified, inLanguage, articleSection, keywords, author (Aleeqa org), publisher (Aleeqa org + logo), mainEntityOfPage
   - Breadcrumb nav: Home (icon) > Knowledge Center > Category — using ChevronLeft (flipped for RTL)
   - Article header: category Badge, read time (Clock icon + "min read" / "دقيقة قراءة"), publishedAt date
   - Article body via MarkdownRenderer (custom lightweight parser — no react-markdown dependency needed)
   - MarkdownRenderer supports: ## h2, ### h3, > blockquote, - unordered list, 1. ordered list, | a | b | GFM tables (with --- separator row), **bold** inline, paragraphs. RTL-aware paragraph dir attribute.
   - "All articles" back button at bottom
   - Related articles section: 2-col grid of related cards (category, read time, title, excerpt)
   - CTA card (Apply what you learned → /)
   - Graceful not-found fallback (amber AlertTriangle card + back to /knowledge button)

4. src/app/knowledge/page.tsx (~22 lines, server)
   - Static bilingual metadata (title "مركز المعرفة | عليقة", canonical /knowledge, OpenGraph)
   - Renders <KnowledgeHubContent />

5. src/app/knowledge/[slug]/page.tsx (~56 lines, server)
   - generateStaticParams() returns all 8 article slugs (from ARTICLE_SLUGS) — all pre-rendered at build time
   - generateMetadata() (async, Next.js 16 promises-based params) returns per-article: title "{article.title} | عليقة", description=excerpt, canonical /knowledge/{slug}, OpenGraph type=article + publishedTime + section + tags, Twitter summary card
   - Default export awaits params and renders <ArticleContent slug={slug} />

6. src/app/sitemap.ts (~50 lines)
   - `export const dynamic = "force-static"` (REQUIRED for output: "export" compatibility — without this, /sitemap.xml throws 500)
   - SITE_URL = "https://www.aleeqa.app" (brand from i18n brand_line)
   - Returns 39 sitemap entries:
     * 9 static routes: /, /privacy/, /faq/, /guide/, /nutrition/, /knowledge/, /ingredients/, /compare/, /livestock-cost-calculator/ (priority 1.0 for /, 0.8 for others)
     * 22 ingredient pages /ingredients/{key}/ (priority 0.6)
     * 8 article pages /knowledge/{slug}/ (priority 0.7, lastModified=article.publishedAt)

7. src/app/robots.ts (~17 lines)
   - `export const dynamic = "force-static"` (REQUIRED for output: "export")
   - Allow all user-agents on /
   - Sitemap: https://www.aleeqa.app/sitemap.xml
   - Host: https://www.aleeqa.app

8. Removed public/robots.txt (static file would have overridden app/robots.ts — verified Next.js precedence: public files win over route handlers, so deletion was necessary)

Verification:
- `bun run lint` → 0 errors, 0 warnings (clean).
- `bunx tsc --noEmit` → no new TypeScript errors in any of the 7 new files (only pre-existing errors in unrelated examples/, skills/, and src/lib/__tests__/ files).
- Dev server routes all return HTTP 200:
  - /knowledge/ → 200 (verified all 9 category labels rendered: تغذية الأبقار, تغذية الجاموس, تغذية الأغنام, تغذية الدواجن, شرح المواد الخام, شرح القيم الغذائية, كيفية استخدام الحاسبة, نصائح للمربين, أخطاء شائعة)
  - All 8 article pages → 200 (verified by curling each /knowledge/{slug}/)
  - /sitemap.xml → 200 (verified 39 <url> entries: 9 static + 22 ingredients + 8 articles)
  - /robots.txt → 200 (verified: User-Agent: * Allow: /, Sitemap: https://www.aleeqa.app/sitemap.xml, Host: https://www.aleeqa.app)
- JSON-LD verified on /knowledge/cattle-nutrition-basics/: "@type":"Article", "headline":"أساسيات تغذية الأبقار", "datePublished":"2025-01-15", "inLanguage":"ar", "articleSection":"تغذية الأبقار", "@id":"/knowledge/cattle-nutrition-basics" — all present in HTML <script type="application/ld+json">.
- Markdown rendering verified on /knowledge/buffalo-nutrition-guide/ (article with table): h2, h3, table, thead, th elements all present in HTML.
- Did NOT modify any existing calculation logic, ingredient DB schema, i18n dictionary, or existing routes.

Stage Summary:
- 7 new files created + 1 file removed (public/robots.txt).
- 8 articles × 2 languages (AR + EN) = 16 substantial article bodies.
- 9 article categories with bilingual labels + descriptions.
- 39 sitemap URLs covering all 9 static routes + 22 ingredient pages + 8 article pages.
- JSON-LD Article schema injected on every article page for SEO.
- Lightweight custom Markdown renderer (h2, h3, blockquote, ul, ol, table, bold, paragraphs) — no external markdown dependency added.
- Bilingual AR + EN throughout via lang === "ar" checks (matching existing pattern).
- All routes use ContentPageLayout + shadcn/ui (Card, CardContent, Badge, Button, Separator, Input, Select) + lucide-react icons.
- Lint clean, no new TypeScript errors, all routes serve HTTP 200, JSON-LD present in static HTML, sitemap.xml and robots.txt generated successfully.
