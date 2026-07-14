import type { Metadata } from "next";
import { GuideContent } from "@/components/content/guide-content";

export const metadata: Metadata = {
  title: "دليل الاستخدام | عليقة",
  description: "شرح مفصل لطريقة استخدام حاسبة العليقة خطوة بخطوة.",
};

export default function GuidePage() {
  return <GuideContent />;
}
