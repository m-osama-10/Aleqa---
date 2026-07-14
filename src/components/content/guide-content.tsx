"use client";

import Link from "next/link";
import { ContentPageLayout } from "./content-page-layout";
import { useLang } from "@/lib/i18n";

export function GuideContent() {
  const { lang } = useLang();
  const isRtl = lang === "ar";

  const steps = isRtl
    ? [
        {
          n: "١",
          t: "اختر نوع الحيوان",
          d: "من شاشة الحاسبة، اختر نوع الحيوان المناسب (بقرة حلوب، جاموس، أغنام، دواجن...). كل نوع له احتياجات غذائية مختلفة مبنية على معايير NRC.",
        },
        {
          n: "٢",
          t: "أدخل بيانات الحيوان",
          d: "حدّد وزن الحيوان، ومستوى الإنتاج (مثل إنتاج اللبن للأبقار)، وحجم القطيع. هذه البيانات تؤثر على كمية العليقة اليومية والتكلفة الإجمالية.",
        },
        {
          n: "٣",
          t: "اختر المكوّنات",
          d: "اختر تلقائياً (النظام يختار الأفضل) أو يدوياً من ٢٢ مكوّن متاح. يمكنك تخصيص القائمة حسب ما يتوفر في سوقك.",
        },
        {
          n: "٤",
          t: "اختر نوع العليقة",
          d: "عليقة متوازنة (تحقق كل الأهداف الغذائية بدقة) أو عليقة اقتصادية (أرخص مع تخفيف بسيط في الأهداف لتوفير التكلفة).",
        },
        {
          n: "٥",
          t: "عدّل الأسعار",
          d: "تأكد من أسعار اليوم وعدّلها حسب سوقك. تُحفظ الأسعار تلقائياً على جهازك وتُستخدم في كل الحسابات القادمة.",
        },
        {
          n: "٦",
          t: "استلم التركيبة",
          d: "اضغط احسب العليقة لرؤية النتيجة: الكميات بالكجم والنسبة، البروتين والطاقة والألياف، التكلفة اليومية والشهرية، ورسم بياني للتركيبة.",
        },
      ]
    : [
        {
          n: "1",
          t: "Choose Animal Type",
          d: "From the calculator screen, select the appropriate animal type (dairy cow, buffalo, sheep, poultry...). Each type has different nutritional requirements based on NRC standards.",
        },
        {
          n: "2",
          t: "Enter Animal Data",
          d: "Set the animal's weight, production level (e.g., milk production for dairy), and flock size. These affect the daily ration quantity and total cost.",
        },
        {
          n: "3",
          t: "Select Ingredients",
          d: "Choose automatically (system picks the best) or manually from 22 available ingredients. You can customize the list based on what's available in your market.",
        },
        {
          n: "4",
          t: "Choose Ration Type",
          d: "Balanced ration (meets all nutritional targets precisely) or economy ration (cheaper with slight target relaxation to save cost).",
        },
        {
          n: "5",
          t: "Adjust Prices",
          d: "Verify today's prices and adjust them to your market. Prices are auto-saved on your device and used in all future calculations.",
        },
        {
          n: "6",
          t: "Get the Ration",
          d: "Press calculate to see the result: quantities in kg and %, protein/energy/fiber, daily and monthly cost, and a chart of the composition.",
        },
      ];

  const tips = isRtl
    ? [
        "اضغط زر تعديل النسب يدوياً لتعديل أي مكوّن. التوزيع الذكي يضمن بقاء المجموع ١٠٠٪.",
        "استخدم زر القفل 🔒 لتثبيت مكوّنات لا تريد تغييرها أثناء الموازنة التلقائية.",
        "زر إعادة التوازن الذكي يعيد حساب العليقة مع احترام المكوّنات المقفلة.",
        "احفظ العليقة للرجوع إليها لاحقاً أو قارنها مع علائق أخرى.",
        "شارك العليقة عبر واتساب مباشرة أو اطبعها كتقرير PDF.",
        "عدّل القيم الغذائية للمكوّنات من تبويب الأسعار إذا اختلفت عن القيم الافتراضية.",
      ]
    : [
        "Press the manual edit button to adjust any ingredient. Smart distribution keeps the total at 100%.",
        "Use the lock button 🔒 to fix ingredients you don't want changed during auto-balancing.",
        "Smart Rebalance recalculates the ration while respecting locked ingredients.",
        "Save rations to revisit them later or compare with other rations.",
        "Share rations via WhatsApp directly or print them as PDF reports.",
        "Edit ingredient nutrition values from the Prices tab if they differ from defaults.",
      ];

  return (
    <ContentPageLayout title={isRtl ? "دليل الاستخدام" : "User Guide"}>
      <div className="space-y-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {isRtl
            ? "دليل خطوة بخطوة لاستخدام حاسبة العليقة الذكية. التطبيق يعمل بمعالج من ٦ خطوات بسيطة."
            : "A step-by-step guide to using the smart feed calculator. The app works with a simple 6-step wizard."}
        </p>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step) => (
            <div
              key={step.n}
              className="flex gap-3 rounded-xl border border-border/60 bg-card p-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">
                {step.n}
              </span>
              <div>
                <h3 className="mb-1 text-sm font-bold text-foreground">{step.t}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{step.d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <h2 className="mb-3 text-sm font-extrabold text-foreground">
            {isRtl ? "نصائح متقدمة" : "Advanced Tips"}
          </h2>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs leading-relaxed text-foreground"
              >
                <span className="mt-0.5 text-primary">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/nutrition"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {isRtl ? "📖 دليل التغذية" : "📖 Nutrition Guide"}
          </Link>
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {isRtl ? "❓ الأسئلة الشائعة" : "❓ FAQ"}
          </Link>
        </div>
      </div>
    </ContentPageLayout>
  );
}
