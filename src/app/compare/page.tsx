import type { Metadata } from "next";
import { CompareContent } from "@/components/content/compare-content";

export const metadata: Metadata = {
  title: "مقارنة المكوّنات | عليقة",
  description:
    "قارن بين أي مكوّنين من مكوّنات الأعلاف جنباً إلى جنب — القيم الغذائية، الأسعار، المزايا والعيوب، مع توصية بأفضل خيار.",
  alternates: {
    canonical: "/compare",
  },
  openGraph: {
    title: "مقارنة المكوّنات | عليقة",
    description:
      "قارن بين أي مكوّنين جنباً إلى جنب مع توصية بأفضل خيار غذائي واقتصادي.",
    type: "website",
  },
};

export default function ComparePage() {
  return <CompareContent />;
}
