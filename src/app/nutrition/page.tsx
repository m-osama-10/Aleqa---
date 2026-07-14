import type { Metadata } from "next";
import { NutritionContent } from "@/components/content/nutrition-content";

export const metadata: Metadata = {
  title: "دليل تغذية الحيوان | عليقة",
  description: "مقالات وشرح عن تغذية الحيوانات ومكونات العلائق والأهداف الغذائية.",
};

export default function NutritionPage() {
  return <NutritionContent />;
}
