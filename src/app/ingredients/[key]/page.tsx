import type { Metadata } from "next";
import { DEFAULT_INGREDIENTS } from "@/lib/ingredient-db";
import { getIngredientDetail } from "@/lib/ingredient-details";
import { IngredientDetailContent } from "@/components/content/ingredient-detail-content";

/** Pre-render all 22 ingredient pages at build time (static export). */
export function generateStaticParams() {
  return DEFAULT_INGREDIENTS.map((ing) => ({ key: ing.key }));
}

/** Per-ingredient SEO metadata (bilingual title + description). */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<Metadata> {
  const { key } = await params;
  const ing = DEFAULT_INGREDIENTS.find((i) => i.key === key);
  if (!ing) {
    return {
      title: "مكوّن غير موجود | عليقة",
      description: "المكوّن المطلوب غير موجود.",
    };
  }
  const detail = getIngredientDetail(key);
  const descAr =
    detail?.description ??
    `${ing.name}: البروتين ${ing.protein}%، الطاقة ${ing.tdn}%، السعر ${ing.price} ج.م/كجم.`;
  const descEn =
    detail?.descriptionEn ??
    `${ing.nameEn}: protein ${ing.protein}%, energy (TDN) ${ing.tdn}%, price ${ing.price} EGP/kg.`;
  return {
    title: `${ing.name} | ${ing.nameEn} | عليقة`,
    description: `${descAr} — ${descEn}`,
    alternates: {
      canonical: `/ingredients/${ing.key}`,
    },
    openGraph: {
      title: `${ing.name} | ${ing.nameEn}`,
      description: descAr,
      type: "website",
    },
  };
}

export default async function IngredientDetailPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  return <IngredientDetailContent ingredientKey={key} />;
}
