import type { Metadata } from "next";
import { ARTICLE_SLUGS, getArticle, getCategory } from "@/lib/articles";
import { ArticleContent } from "@/components/content/article-content";

/** Pre-render all article pages at build time (static export). */
export function generateStaticParams() {
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

/** Per-article SEO metadata (bilingual title + description). */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return {
      title: "مقال غير موجود | عليقة",
      description: "المقال المطلوب غير موجود.",
    };
  }
  const cat = getCategory(article.category);
  const catLabelAr = cat?.nameAr ?? article.category;
  const catLabelEn = cat?.nameEn ?? article.category;
  return {
    title: `${article.title} | عليقة`,
    description: article.excerpt,
    alternates: {
      canonical: `/knowledge/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      section: catLabelAr,
      tags: [article.title, article.titleEn, catLabelAr, catLabelEn],
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticleContent slug={slug} />;
}
