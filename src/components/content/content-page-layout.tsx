"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Leaf } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { LanguageToggle } from "@/components/aleeqa/language-toggle";
import { ThemeToggle } from "@/components/aleeqa/theme-toggle";

const SITE_URL = "https://aleqa.vercel.app";

/**
 * Shared layout for static content pages (privacy, faq, guide, nutrition,
 * about, contact, terms, disclaimer, ingredients, compare, knowledge, etc.).
 * Provides a header with logo + back link + language/theme toggles,
 * a BreadcrumbList JSON-LD schema (Home > Current Page), and a footer
 * with links to other content pages.
 */
export function ContentPageLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { lang } = useLang();
  const isRtl = lang === "ar";
  const pathname = usePathname() ?? "/";

  // BreadcrumbList JSON-LD schema — Home > Current Page.
  // Embedded as a raw <script> tag so it appears in the static export.
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isRtl ? "الرئيسية" : "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `${SITE_URL}${pathname === "/" ? "/" : `${pathname}/`}`,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 px-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            <Leaf className="h-5 w-5 text-primary" />
            <span className="hidden sm:inline">{isRtl ? "عليقة" : "Aleeqa"}</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          {isRtl ? "العودة للرئيسية" : "Back to home"}
        </Link>
        <h1 className="mb-6 text-2xl font-black text-foreground sm:text-3xl">
          {title}
        </h1>
        <div className="prose prose-sm max-w-none text-foreground">
          {children}
        </div>
      </main>

      {/* Footer with content page links */}
      <footer className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <Link href="/about" className="transition-colors hover:text-primary">
              {isRtl ? "من نحن" : "About"}
            </Link>
            <span>·</span>
            <Link href="/contact" className="transition-colors hover:text-primary">
              {isRtl ? "اتصل بنا" : "Contact"}
            </Link>
            <span>·</span>
            <Link href="/guide" className="transition-colors hover:text-primary">
              {isRtl ? "دليل الاستخدام" : "User Guide"}
            </Link>
            <span>·</span>
            <Link href="/nutrition" className="transition-colors hover:text-primary">
              {isRtl ? "دليل التغذية" : "Nutrition Guide"}
            </Link>
            <span>·</span>
            <Link href="/knowledge" className="transition-colors hover:text-primary">
              {isRtl ? "مركز المعرفة" : "Knowledge Center"}
            </Link>
            <span>·</span>
            <Link href="/ingredients" className="transition-colors hover:text-primary">
              {isRtl ? "المواد الخام" : "Ingredients"}
            </Link>
            <span>·</span>
            <Link href="/compare" className="transition-colors hover:text-primary">
              {isRtl ? "مقارنة المواد" : "Compare"}
            </Link>
            <span>·</span>
            <Link href="/livestock-cost-calculator" className="transition-colors hover:text-primary">
              {isRtl ? "حاسبة التربية" : "Cost Calculator"}
            </Link>
            <span>·</span>
            <Link href="/faq" className="transition-colors hover:text-primary">
              {isRtl ? "الأسئلة الشائعة" : "FAQ"}
            </Link>
            <span>·</span>
            <Link href="/privacy" className="transition-colors hover:text-primary">
              {isRtl ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
            <span>·</span>
            <Link href="/terms" className="transition-colors hover:text-primary">
              {isRtl ? "الشروط والأحكام" : "Terms"}
            </Link>
            <span>·</span>
            <Link href="/disclaimer" className="transition-colors hover:text-primary">
              {isRtl ? "إخلاء المسؤولية" : "Disclaimer"}
            </Link>
          </div>
          <p className="mt-3 text-center text-[10px] text-muted-foreground">
            {isRtl ? "عليقة · حاسبة العليقة الذكية للمربي المصري" : "Aleeqa · Smart Feed Calculator for Egyptian farmers"}
          </p>
        </div>
      </footer>
    </div>
  );
}
