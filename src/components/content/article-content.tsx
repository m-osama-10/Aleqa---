"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Home,
  BookOpen,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { ContentPageLayout } from "./content-page-layout";
import { useLang } from "@/lib/i18n";
import {
  getArticle,
  getRelatedArticles,
  getCategory,
  type Article,
} from "@/lib/articles";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ---------------- Component ---------------- */

/**
 * Article page — /knowledge/[slug]
 * Renders a single knowledge-base article with breadcrumb, content, related articles,
 * and JSON-LD Article structured data for SEO.
 */
export function ArticleContent({ slug }: { slug: string }) {
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const article = getArticle(slug);

  // JSON-LD structured data (Article schema) for SEO. Built once per render.
  const jsonLd = useMemo(() => {
    if (!article) return null;
    const cat = getCategory(article.category);
    const headline = isRtl ? article.title : article.titleEn;
    const description = isRtl ? article.excerpt : article.excerptEn;
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline,
      description,
      datePublished: article.publishedAt,
      dateModified: article.publishedAt,
      inLanguage: isRtl ? "ar" : "en",
      articleSection: cat ? (isRtl ? cat.nameAr : cat.nameEn) : undefined,
      keywords: [article.title, article.titleEn].join(", "),
      author: {
        "@type": "Organization",
        name: isRtl ? "عليقة" : "Aleeqa",
      },
      publisher: {
        "@type": "Organization",
        name: isRtl ? "عليقة" : "Aleeqa",
        logo: {
          "@type": "ImageObject",
          url: "/logo.svg",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `/knowledge/${article.slug}`,
      },
    };
  }, [article, isRtl]);

  if (!article) {
    return (
      <ContentPageLayout title={isRtl ? "مقال غير موجود" : "Article Not Found"}>
        <div className="space-y-4">
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardContent className="flex items-start gap-3 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="text-sm font-bold text-foreground">
                  {isRtl ? "المقال المطلوب غير موجود" : "The requested article was not found"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {isRtl
                    ? "ربما تم حذف المقال أو تغيير الرابط."
                    : "The article may have been removed or the link changed."}
                </p>
              </div>
            </CardContent>
          </Card>
          <Button asChild variant="outline" size="sm">
            <Link href="/knowledge">
              <BookOpen className="h-4 w-4" />
              {isRtl ? "العودة لمركز المعرفة" : "Back to Knowledge Center"}
            </Link>
          </Button>
        </div>
      </ContentPageLayout>
    );
  }

  const cat = getCategory(article.category);
  const catLabel = cat ? (isRtl ? cat.nameAr : cat.nameEn) : article.category;
  const title = isRtl ? article.title : article.titleEn;
  const excerpt = isRtl ? article.excerpt : article.excerptEn;
  const content = isRtl ? article.content : article.contentEn;
  const related = getRelatedArticles(slug);

  return (
    <ContentPageLayout title={title}>
      <div className="space-y-5">
        {/* JSON-LD structured data */}
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}

        {/* Breadcrumb */}
        <nav
          aria-label={isRtl ? "مسار التنقل" : "Breadcrumb"}
          className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1 transition-colors hover:text-primary"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">{isRtl ? "الرئيسية" : "Home"}</span>
          </Link>
          <ChevronLeft className={`h-3 w-3 ${isRtl ? "rotate-180" : ""}`} />
          <Link
            href="/knowledge"
            className="transition-colors hover:text-primary"
          >
            {isRtl ? "مركز المعرفة" : "Knowledge Center"}
          </Link>
          <ChevronLeft className={`h-3 w-3 ${isRtl ? "rotate-180" : ""}`} />
          <span className="text-foreground/80">{catLabel}</span>
        </nav>

        {/* Article header */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{catLabel}</Badge>
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
              <Clock className="h-3 w-3" />
              {article.readTime} {isRtl ? "دقيقة قراءة" : "min read"}
            </span>
            <span className="text-[11px] text-muted-foreground">
              · {article.publishedAt}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
        </div>

        {/* Article body (markdown) */}
        <article className="space-y-3 text-sm leading-relaxed text-foreground">
          <MarkdownRenderer source={content} isRtl={isRtl} />
        </article>

        {/* Back to hub */}
        <div className="pt-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/knowledge">
              {isRtl ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
              {isRtl ? "كل المقالات" : "All articles"}
            </Link>
          </Button>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="pt-2">
            <h2 className="mb-3 text-sm font-extrabold text-foreground" id="related-heading">
              {isRtl ? "مقالات ذات صلة" : "Related articles"}
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {related.map((rel) => (
                <RelatedCard key={rel.slug} article={rel} isRtl={isRtl} />
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground">
                {isRtl ? "طبّق ما تعلمته الآن" : "Apply what you learned now"}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {isRtl
                  ? "احسب أرخص عليقة متوازنة لحيواناتك مجاناً."
                  : "Compute the cheapest balanced ration for your animals for free."}
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

function RelatedCard({ article, isRtl }: { article: Article; isRtl: boolean }) {
  const cat = getCategory(article.category);
  const catLabel = cat ? (isRtl ? cat.nameAr : cat.nameEn) : article.category;
  const title = isRtl ? article.title : article.titleEn;
  const excerpt = isRtl ? article.excerpt : article.excerptEn;
  return (
    <Link href={`/knowledge/${article.slug}`} className="group block">
      <Card className="h-full border-border/60 transition-colors group-hover:border-primary/50 group-hover:shadow-sm">
        <CardContent className="space-y-1.5 p-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="shrink-0 text-[10px]">
              {catLabel}
            </Badge>
            <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
              <Clock className="h-3 w-3" />
              {article.readTime} {isRtl ? "د" : "min"}
            </span>
          </div>
          <p className="text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
            {title}
          </p>
          <p className="line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
            {excerpt}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

/* ---------------- Lightweight Markdown renderer ---------------- */

/**
 * Renders a subset of Markdown to React nodes:
 *  - `## H2`, `### H3`
 *  - `> blockquote`
 *  - `- item` unordered lists
 *  - `| a | b |` GFM-style tables (with optional `---` separator row)
 *  - `1. item` ordered lists
 *  - `**bold**` inline
 *  - blank line separates paragraphs
 */
function MarkdownRenderer({ source, isRtl }: { source: string; isRtl: boolean }) {
  const blocks = useMemo(() => parseMarkdown(source), [source]);
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-4 mb-1 text-base font-extrabold text-foreground"
              >
                {renderInline(block.text)}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="mt-3 mb-1 text-sm font-bold text-foreground"
              >
                {renderInline(block.text)}
              </h3>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-s-4 border-primary/40 bg-primary/5 ps-3 py-2 text-xs italic text-foreground/90 rounded-e-md"
              >
                {renderInline(block.text)}
              </blockquote>
            );
          case "ul":
            return (
              <ul
                key={i}
                className="list-disc space-y-1 ps-5 text-xs leading-relaxed text-foreground/90"
              >
                {block.items.map((it, j) => (
                  <li key={j}>{renderInline(it)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={i}
                className="list-decimal space-y-1 ps-5 text-xs leading-relaxed text-foreground/90"
              >
                {block.items.map((it, j) => (
                  <li key={j}>{renderInline(it)}</li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div
                key={i}
                className="overflow-x-auto rounded-lg border border-border/60"
                dir="ltr"
              >
                <table className="w-full text-xs">
                  <thead className="bg-secondary/40">
                    <tr>
                      {block.headers.map((h, j) => (
                        <th
                          key={j}
                          className="border-b border-border/60 p-2 text-start font-bold text-foreground"
                        >
                          {renderInline(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className={j % 2 === 1 ? "bg-secondary/20" : ""}>
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className="border-b border-border/40 p-2 text-foreground/90"
                          >
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "p":
          default:
            return (
              <p
                key={i}
                className="text-xs leading-relaxed text-foreground/90"
                dir={isRtl ? "rtl" : "ltr"}
              >
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </>
  );
}

type Block =
  | { type: "h2" | "h3" | "p" | "quote"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

function parseMarkdown(source: string): Block[] {
  const lines = source.split("\n");
  const blocks: Block[] = [];
  let i = 0;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length > 0) {
      blocks.push({ type: "p", text: para.join(" ").trim() });
      para = [];
    }
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Blank line → flush paragraph
    if (trimmed === "") {
      flushPara();
      i++;
      continue;
    }

    // Heading
    if (trimmed.startsWith("### ")) {
      flushPara();
      blocks.push({ type: "h3", text: trimmed.slice(4).trim() });
      i++;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      flushPara();
      blocks.push({ type: "h2", text: trimmed.slice(3).trim() });
      i++;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      flushPara();
      blocks.push({ type: "quote", text: trimmed.slice(2).trim() });
      i++;
      continue;
    }

    // Unordered list
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      flushPara();
      const items: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
      ) {
        items.push(lines[i].trim().slice(2).trim());
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // Ordered list (1. 2. 3. ...)
    if (/^\d+\.\s+/.test(trimmed)) {
      flushPara();
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, "").trim());
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // Table (line starts and ends with |)
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushPara();
      const rows: string[][] = [];
      let separatorSeen = false;
      while (
        i < lines.length &&
        lines[i].trim().startsWith("|") &&
        lines[i].trim().endsWith("|")
      ) {
        const rowText = lines[i].trim();
        // Skip separator row like | --- | --- |
        if (/^\|[\s:|-]+\|$/.test(rowText)) {
          separatorSeen = true;
          i++;
          continue;
        }
        const cells = rowText
          .slice(1, -1)
          .split("|")
          .map((c) => c.trim());
        rows.push(cells);
        i++;
      }
      if (rows.length > 0) {
        const [headers, ...body] = rows;
        blocks.push({ type: "table", headers, rows: body });
      }
      continue;
    }

    // Default: paragraph line
    para.push(trimmed);
    i++;
  }
  flushPara();
  return blocks;
}

/** Renders inline markdown: **bold** → <strong>. */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
