import type { Metadata } from "next";
import { IngredientListContent } from "@/components/content/ingredient-list-content";

export const metadata: Metadata = {
  title: "مكوّنات العليقة | عليقة",
  description:
    "دليل شامل لكل مكوّنات الأعلاف (٢٢ مكوّناً) المدعومة في حاسبة عليقة — القيم الغذائية، الأسعار، الاستخدامات، والبدائل لكل مكوّن.",
  alternates: {
    canonical: "/ingredients",
  },
  openGraph: {
    title: "مكوّنات العليقة | عليقة",
    description:
      "دليل كامل لمكوّنات الأعلاف مع القيم الغذائية والأسعار والاستخدامات.",
    type: "website",
  },
};

export default function IngredientsPage() {
  return <IngredientListContent />;
}
