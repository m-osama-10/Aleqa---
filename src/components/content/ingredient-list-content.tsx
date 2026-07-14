"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Scale, ChevronLeft } from "lucide-react";
import { ContentPageLayout } from "./content-page-layout";
import { useLang } from "@/lib/i18n";
import {
  CATEGORY_LABELS,
  CATEGORY_LABELS_EN,
  CATEGORY_ORDER,
  DEFAULT_INGREDIENTS,
} from "@/lib/ingredient-db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Ingredient list page — /ingredients
 * Shows all 22 ingredients grouped by category with search + category filter.
 */
export function IngredientListContent() {
  const { t, lang } = useLang();
  const isRtl = lang === "ar";
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return DEFAULT_INGREDIENTS.filter((ing) => {
      const matchesSearch =
        !q ||
        ing.name.includes(search) ||
        ing.nameEn.toLowerCase().includes(q) ||
        ing.key.toLowerCase().includes(q);
      const matchesCat = catFilter === "all" || ing.category === catFilter;
      return matchesSearch && matchesCat;
    });
  }, [search, catFilter]);

  const title = isRtl ? "مكوّنات العليقة" : "Feed Ingredients";
  const subtitle = isRtl
    ? "دليل شامل لكل مكوّنات الأعلاف المدعومة في حاسبة عليقة — القيم الغذائية والأسعار والاستخدامات."
    : "Comprehensive guide to all feed ingredients supported by the Aleeqa calculator — nutrition values, prices, and usage.";

  return (
    <ContentPageLayout title={title}>
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{subtitle}</p>

        {/* Sub-section navigation */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <div className="rounded-xl border border-primary/40 bg-primary/5 p-3 text-center">
            <div className="mb-1 text-xl">🌾</div>
            <p className="text-xs font-bold text-primary">{isRtl ? "قائمة المواد" : "Ingredient List"}</p>
            <p className="text-[10px] text-muted-foreground">{isRtl ? "٢٢ مكوّن" : "22 ingredients"}</p>
          </div>
          <Link href="/compare" className="group rounded-xl border border-border/60 bg-card p-3 text-center transition-all hover:border-primary/40 hover:shadow-sm">
            <div className="mb-1 text-xl">⚖️</div>
            <p className="text-xs font-bold text-foreground">{isRtl ? "مقارنة المواد" : "Compare"}</p>
            <p className="text-[10px] text-muted-foreground">{isRtl ? "جنباً إلى جنب" : "Side by side"}</p>
          </Link>
          <Link href="/knowledge?category=ingredients" className="group rounded-xl border border-border/60 bg-card p-3 text-center transition-all hover:border-primary/40 hover:shadow-sm">
            <div className="mb-1 text-xl">📖</div>
            <p className="text-xs font-bold text-foreground">{isRtl ? "مقالات المواد" : "Ingredient Articles"}</p>
            <p className="text-[10px] text-muted-foreground">{isRtl ? "١٠ مقالات" : "10 articles"}</p>
          </Link>
        </div>

        {/* Search + filter */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isRtl ? "ابحث عن مكوّن…" : "Search ingredients…"}
              className="pl-9"
              aria-label={isRtl ? "بحث" : "Search"}
            />
          </div>
          <Select value={catFilter} onValueChange={setCatFilter}>
            <SelectTrigger className="w-full sm:w-52" aria-label={isRtl ? "فلتر الفئة" : "Category filter"}>
              <SelectValue placeholder={isRtl ? "كل الفئات" : "All categories"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isRtl ? "كل الفئات" : "All categories"}</SelectItem>
              {CATEGORY_ORDER.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {isRtl ? CATEGORY_LABELS[cat] : CATEGORY_LABELS_EN[cat]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Grouped list */}
        {filtered.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border/60 p-8 text-center text-sm text-muted-foreground">
            {isRtl ? "لا توجد نتائج مطابقة." : "No matching ingredients."}
          </p>
        ) : (
          <div className="space-y-6">
            {CATEGORY_ORDER.map((cat) => {
              const items = filtered.filter((i) => i.category === cat);
              if (items.length === 0) return null;
              return (
                <section key={cat} aria-labelledby={`cat-${cat}`}>
                  <div className="mb-2 flex items-center gap-2">
                    <h2 id={`cat-${cat}`} className="text-sm font-extrabold text-foreground">
                      {isRtl ? CATEGORY_LABELS[cat] : CATEGORY_LABELS_EN[cat]}
                    </h2>
                    <Badge variant="secondary">{items.length}</Badge>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {items.map((ing) => (
                      <Link
                        key={ing.key}
                        href={`/ingredients/${ing.key}`}
                        className="group"
                      >
                        <Card className="border-border/60 transition-colors group-hover:border-primary/50 group-hover:shadow-sm">
                          <CardContent className="flex items-center gap-3 p-3">
                            <span
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-xl"
                              aria-hidden="true"
                            >
                              {ing.emoji}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-bold text-foreground">
                                {isRtl ? ing.name : ing.nameEn}
                              </p>
                              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                                {isRtl ? "بروتين" : "Protein"}: {ing.protein}% ·{" "}
                                {isRtl ? "طاقة" : "Energy"}: {ing.tdn}%
                              </p>
                            </div>
                            <div className="flex shrink-0 flex-col items-end gap-1">
                              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                                {ing.price} {t("common.egp")}/{t("common.kg")}
                              </span>
                              <ChevronLeft
                                className={`h-4 w-4 text-muted-foreground transition-transform ${
                                  isRtl
                                    ? "rotate-180 group-hover:-translate-x-0.5"
                                    : "group-hover:translate-x-0.5"
                                }`}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </ContentPageLayout>
  );
}
