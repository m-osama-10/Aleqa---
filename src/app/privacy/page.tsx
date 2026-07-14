import type { Metadata } from "next";
import { PrivacyPolicyContent } from "@/components/content/privacy-policy";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | عليقة",
  description: "سياسة خصوصية تطبيق عليقة — حاسبة العليقة الذكية للمربي المصري.",
};

export default function PrivacyPage() {
  return <PrivacyPolicyContent />;
}
