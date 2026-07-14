import type { Metadata } from "next";
import { FaqContent } from "@/components/content/faq-content";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة | عليقة",
  description: "إجابات على أكثر الأسئلة شيوعاً حول حاسبة العليقة واستخدامها.",
};

export default function FaqPage() {
  return <FaqContent />;
}
