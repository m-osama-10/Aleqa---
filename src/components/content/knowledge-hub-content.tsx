"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Clock,
  ChevronLeft,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { ContentPageLayout } from "./content-page-layout";
import { useLang } from "@/lib/i18n";
import {
  ARTICLES,
  ARTICLE_CATEGORIES,
  type Article,
  type ArticleCategory,
} from "@/lib/articles";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ---------------- Component ---------------- */

/**
 * Knowledge Center hub — /knowledge
 * Shows article categories as cards plus a searchable list of all articles.
 */
export function KnowledgeHubContent() {
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState<string>("all");

  const title = isRtl ? "مركز المعرفة" : "Knowledge Center";
  const subtitle = isRtl
    ? "مقالات وأدلة عملية لتغذية الماشية والدواجن في مصر — ابدأ من الفئات أو ابحث عن موضوع محدد."
    : "Practical articles and guides for livestock and poultry nutrition in Egypt — start from categories or search for a specific topic.";

  // Category counts (static, computed once)
  const catCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of ARTICLE_CATEGORIES) counts[c.key] = 0;
    for (const a of ARTICLES) counts[a.category] = (counts[a.category] ?? 0) + 1;
    return counts;
  }, []);

  // Filtered articles
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      const matchesCat = catFilter === "all" || a.category === catFilter;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        a.title.includes(search) ||
        a.titleEn.toLowerCase().includes(q) ||
        a.excerpt.includes(search) ||
        a.excerptEn.toLowerCase().includes(q) ||
        a.slug.includes(q)
      );
    });
  }, [search, catFilter]);

  return (
    <ContentPageLayout title={title}>
      <div className="space-y-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{subtitle}</p>

        {/* Category cards */}
        <section aria-labelledby="categories-heading">
          <h2
            id="categories-heading"
            className={`mb-3 flex items-center gap-1.5 text-sm font-extrabold text-foreground ${
              isRtl ? "flex-row-reverse text-right" : ""
            }`}
          >
            <BookOpen className="h-4 w-4 text-primary" />
            <span>{isRtl ? "تصفّح حسب الفئة" : "Browse by category"}</span>
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {ARTICLE_CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.key}
                category={cat}
                count={catCounts[cat.key] ?? 0}
                isRtl={isRtl}
                active={catFilter === cat.key}
                onClick={() =>
                  setCatFilter((prev) => (prev === cat.key ? "all" : cat.key))
                }
              />
            ))}
          </div>
        </section>

        {/* Search + filter */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isRtl ? "ابحث في المقالات…" : "Search articles…"}
              className="pl-9"
              aria-label={isRtl ? "بحث" : "Search"}
            />
          </div>
          <Select value={catFilter} onValueChange={setCatFilter}>
            <SelectTrigger className="w-full sm:w-56" aria-label={isRtl ? "فلتر الفئة" : "Category filter"}>
              <SelectValue placeholder={isRtl ? "كل الفئات" : "All categories"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isRtl ? "كل الفئات" : "All categories"}</SelectItem>
              {ARTICLE_CATEGORIES.map((cat) => (
                <SelectItem key={cat.key} value={cat.key}>
                  {isRtl ? cat.nameAr : cat.nameEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Articles list */}
        <section aria-labelledby="articles-heading">
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-sm font-extrabold text-foreground" id="articles-heading">
              {isRtl ? "كل المقالات" : "All articles"}
            </h2>
            <Badge variant="secondary">{filtered.length}</Badge>
            {catFilter !== "all" && (
              <button
                type="button"
                onClick={() => setCatFilter("all")}
                className="ms-auto text-xs text-muted-foreground underline-offset-2 transition-colors hover:text-primary hover:underline"
              >
                {isRtl ? "إلغاء الفلتر" : "Clear filter"}
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
              {isRtl ? "لا توجد مقالات مطابقة." : "No matching articles."}
            </p>
          ) : (
            <div className="space-y-2">
              {filtered.map((article) => (
                <ArticleCard key={article.slug} article={article} isRtl={isRtl} />
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground">
                {isRtl ? "جاهز لتطبيق ما تعلمته؟" : "Ready to apply what you learned?"}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {isRtl
                  ? "احسب أرخص عليقة متوازنة لحيواناتك في دقائق."
                  : "Compute the cheapest balanced ration for your animals in minutes."}
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {isRtl ? "ابدأ الحساب" : "Start calculating"}
              <ArrowRight className={`h-3.5 w-3.5 ${isRtl ? "rotate-180" : ""}`} />
            </Link>
          </CardContent>
        </Card>
      </div>
    </ContentPageLayout>
  );
}

/* ---------------- Subcomponents ---------------- */

function CategoryCard({
  category,
  count,
  isRtl,
  active,
  onClick,
}: {
  category: ArticleCategory;
  count: number;
  isRtl: boolean;
  active: boolean;
  onClick: () => void;
}) {
  const name = isRtl ? category.nameAr : category.nameEn;
  const desc = isRtl ? category.descriptionAr : category.descriptionEn;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group text-start transition-all ${
        active ? "ring-2 ring-primary" : ""
      }`}
    >
      <Card
        className={`h-full border-border/60 transition-colors group-hover:border-primary/50 group-hover:shadow-sm ${
          active ? "border-primary/50 bg-primary/5" : ""
        }`}
      >
        <CardContent className="flex h-full flex-col gap-1.5 p-3">
          <div className="flex items-center justify-between gap-2">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-lg"
              aria-hidden="true"
            >
              {category.emoji}
            </span>
            <Badge variant="outline" className="shrink-0 tabular-nums">
              {count}
            </Badge>
          </div>
          <p className="text-sm font-bold leading-tight text-foreground">{name}</p>
          <p className="line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
            {desc}
          </p>
        </CardContent>
      </Card>
    </button>
  );
}

function ArticleCard({ article, isRtl }: { article: Article; isRtl: boolean }) {
  const cat = ARTICLE_CATEGORIES.find((c) => c.key === article.category);
  const catLabel = cat ? (isRtl ? cat.nameAr : cat.nameEn) : article.category;
  const title = isRtl ? article.title : article.titleEn;
  const excerpt = isRtl ? article.excerpt : article.excerptEn;

  return (
    <Link href={`/knowledge/${article.slug}`} className="group block">
      <Card className="border-border/60 transition-colors group-hover:border-primary/50 group-hover:shadow-sm">
        <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-start sm:gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="shrink-0">
                {catLabel}
              </Badge>
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="h-3 w-3" />
                {article.readTime} {isRtl ? "دقيقة" : "min"}
              </span>
            </div>
            <h3 className="text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
              {title}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
              {excerpt}
            </p>
          </div>
          <ChevronLeft
            className={`hidden h-5 w-5 shrink-0 text-muted-foreground transition-transform sm:block ${
              isRtl
                ? "rotate-180 group-hover:-translate-x-0.5"
                : "group-hover:translate-x-0.5"
            }`}
          />
        </CardContent>
      </Card>
    </Link>
  );
}
