import type { Metadata } from "next";
import { LivestockCostCalculator } from "@/components/content/livestock-cost-calculator";

export const metadata: Metadata = {
  title: "حاسبة تكلفة التسمين | عليقة",
  description:
    "احسب تكلفة تسمين الحيوانات وصافي الربح وهامش الربح وسعر التعادل والعائد على الاستثمار بدقة.",
};

export default function LivestockCostCalculatorPage() {
  return <LivestockCostCalculator />;
}
