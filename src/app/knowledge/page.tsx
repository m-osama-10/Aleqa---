import type { Metadata } from "next";
import { KnowledgeHubContent } from "@/components/content/knowledge-hub-content";

export const metadata: Metadata = {
  title: "مركز المعرفة | عليقة",
  description:
    "مقالات وأدلة عملية لتغذية الأبقار والجاموس والأغنام والدواجن في مصر — أساسيات التغذية، تركيب العلائق، توفير التكلفة، وأخطاء شائعة.",
  alternates: {
    canonical: "/knowledge",
  },
  openGraph: {
    title: "مركز المعرفة | عليقة",
    description:
      "مقالات وأدلة عملية لتغذية الماشية والدواجن في مصر — ابدأ من هنا لتعلّم أساسيات التغذية الرشيدة.",
    type: "website",
  },
};

export default function KnowledgePage() {
  return <KnowledgeHubContent />;
}
