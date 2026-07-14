"use client";

import Link from "next/link";
import { ContentPageLayout } from "./content-page-layout";
import { useLang } from "@/lib/i18n";
import { ANIMALS, ANIMAL_ORDER } from "@/lib/feed-data";

export function NutritionContent() {
  const { lang } = useLang();
  const isRtl = lang === "ar";

  const animalTargets = ANIMAL_ORDER.map((key) => {
    const a = ANIMALS[key];
    return {
      key,
      name: isRtl ? a.name : a.nameEn,
      emoji: a.emoji,
      cp: a.targets.cpMin,
      tdn: a.targets.tdnMin,
      fiber: a.targets.fiberMax,
      forage: a.forageMin,
      species: a.species,
    };
  });

  const categories = isRtl
    ? [
        { name: "مصادر الطاقة", emoji: "🌽", desc: "توفّر السعرات اللازمة للنمو والإنتاج. تشمل الذرة، الشعير، السورجم، الردة، المولاس." },
        { name: "مصادر البروتين", emoji: "🫘", desc: "أساسية لبناء العضلات وإنتاج اللبن. تشمل كسب الصويا، كسب القطن، كسب عباد الشمس، الفول البلدي." },
        { name: "مصادر الألياف", emoji: "🌿", desc: "ضرورية لصحة الكرش عند المجترات. تشمل البرسيم الجاف، السيلاج، التبن." },
        { name: "الأملاح المعدنية", emoji: "🪨", desc: "ضرورية للعظام والتمثيل الغذائي. تشمل كربونات الكالسيوم، الملح، البيكربونات، مخلوط الأملاح." },
        { name: "الفيتامينات", emoji: "💊", desc: "مكملات ضرورية للمناعة والصحة العامة. تُضاف بكميات صغيرة." },
        { name: "إضافات أخرى", emoji: "🛡️", desc: "مثل مضادات السموم لحماية العليقة من الفطريات." },
      ]
    : [
        { name: "Energy Sources", emoji: "🌽", desc: "Provide calories needed for growth and production. Include corn, barley, sorghum, bran, molasses." },
        { name: "Protein Sources", emoji: "🫘", desc: "Essential for muscle building and milk production. Include soybean meal, cottonseed meal, sunflower meal, fava beans." },
        { name: "Fiber Sources", emoji: "🌿", desc: "Essential for rumen health in ruminants. Include hay, silage, straw." },
        { name: "Minerals", emoji: "🪨", desc: "Essential for bones and metabolism. Include limestone, salt, bicarb, mineral mix." },
        { name: "Vitamins", emoji: "💊", desc: "Supplements essential for immunity and general health. Added in small amounts." },
        { name: "Other Additives", emoji: "🛡️", desc: "Such as toxin binders to protect feed from fungi." },
      ];

  return (
    <ContentPageLayout title={isRtl ? "دليل تغذية الحيوان" : "Animal Nutrition Guide"}>
      <div className="space-y-6">
        {/* Intro */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {isRtl
            ? "دليل شامل لتغذية الحيوانات المزرعية في مصر. تعرّف على الاحتياجات الغذائية لكل نوع، ومكونات العلائق، وكيفية تحقيق التوازن الغذائي بأقل تكلفة."
            : "A comprehensive guide to farm animal nutrition in Egypt. Learn about each species' nutritional requirements, feed ingredients, and how to balance rations at the lowest cost."}
        </p>

        {/* Nutritional targets table */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-foreground">
            {isRtl ? "الأهداف الغذائية لكل حيوان" : "Nutritional Targets per Animal"}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-secondary/30 text-foreground">
                  <th className="p-2 text-start font-bold">{isRtl ? "الحيوان" : "Animal"}</th>
                  <th className="p-2 text-center font-bold">{isRtl ? "بروتين %" : "CP %"}</th>
                  <th className="p-2 text-center font-bold">{isRtl ? "طاقة (TDN) %" : "TDN %"}</th>
                  <th className="p-2 text-center font-bold">{isRtl ? "ألياف %" : "Fiber %"}</th>
                  <th className="p-2 text-center font-bold">{isRtl ? "علف خشن %" : "Forage %"}</th>
                </tr>
              </thead>
              <tbody>
                {animalTargets.map((a) => (
                  <tr key={a.key} className="border-b border-border/50">
                    <td className="p-2 text-start font-semibold text-foreground">
                      {a.emoji} {a.name}
                    </td>
                    <td className="p-2 text-center tabular-nums">{a.cp}</td>
                    <td className="p-2 text-center tabular-nums">{a.tdn}</td>
                    <td className="p-2 text-center tabular-nums">≤ {a.fiber}</td>
                    <td className="p-2 text-center tabular-nums">
                      {a.species === "ruminant" ? `≥ ${a.forage}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">
            {isRtl
              ? "القيم تقريبية لأغراض إرشادية مبنية على متوسطات NRC ومعدّلة للسوق المصري."
              : "Values are approximate, advisory, based on NRC averages tuned for the Egyptian market."}
          </p>
        </section>

        {/* Ingredient categories */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-foreground">
            {isRtl ? "فئات المكوّنات" : "Ingredient Categories"}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="rounded-xl border border-border/60 bg-card p-3"
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xl">{cat.emoji}</span>
                  <h3 className="text-sm font-bold text-foreground">{cat.name}</h3>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{cat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key concepts */}
        <section>
          <h2 className="mb-3 text-lg font-bold text-foreground">
            {isRtl ? "مفاهيم غذائية أساسية" : "Key Nutritional Concepts"}
          </h2>
          <div className="space-y-3">
            <div className="rounded-lg border border-border/60 bg-card p-3">
              <h3 className="mb-1 text-sm font-bold text-primary">
                {isRtl ? "البروتين الخام (CP)" : "Crude Protein (CP)"}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {isRtl
                  ? "البروتين ضروري لبناء العضلات وإنتاج اللبن والنمو. النقص يؤدي إلى ضعف الإنتاج وضعف المناعة. المصادر الرئيسية: كسب الصويا، كسب القطن، الفول البلدي."
                  : "Protein is essential for muscle building, milk production, and growth. Deficiency leads to reduced production and weakened immunity. Main sources: soybean meal, cottonseed meal, fava beans."}
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card p-3">
              <h3 className="mb-1 text-sm font-bold text-primary">
                {isRtl ? "الطاقة (TDN)" : "Energy (TDN)"}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {isRtl
                  ? "الطاقة محرك الإنتاج. النقص يقلل من إنتاج اللبن ومعدل النمو. المصادر الرئيسية: الذرة، الشعير، المولاس. الأبقار عالية الإنتاج تحتاج طاقة عالية."
                  : "Energy drives production. Deficiency reduces milk output and growth rate. Main sources: corn, barley, molasses. High-producing cows need high energy."}
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card p-3">
              <h3 className="mb-1 text-sm font-bold text-primary">
                {isRtl ? "الألياف الخام (CF)" : "Crude Fiber (CF)"}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {isRtl
                  ? "الألياف ضرورية لصحة الكرش عند المجترات. الزيادة تقلل من الهضم والطاقة، والنقص يسبب حموضة الكرش. الدواجن تحتاج نسبة منخفضة (أقل من ٦٪)."
                  : "Fiber is essential for rumen health in ruminants. Excess reduces digestion and energy; deficiency causes rumen acidosis. Poultry need low fiber (under 6%)."}
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card p-3">
              <h3 className="mb-1 text-sm font-bold text-primary">
                {isRtl ? "العلف الخشن (Forage)" : "Roughage (Forage)"}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {isRtl
                  ? "البرسيم والسيلاج والتبن ضرورية للمجترات للحاظنة الكرشية وإنتاج الدهن في اللبن. الدواجن لا تحتاج علفاً خشناً."
                  : "Hay, silage, and straw are essential for ruminants for rumen maintenance and milk fat production. Poultry don't need forage."}
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card p-3">
              <h3 className="mb-1 text-sm font-bold text-primary">
                {isRtl ? "المادة الجافة (DM)" : "Dry Matter (DM)"}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {isRtl
                  ? "المادة الجافة هي ما تبقى بعد إزالة الماء. الاستهلاك اليومي من المادة الجافة (DMI) يحدد كمية العليقة. يختلف حسب وزن الحيوان ومستوى الإنتاج."
                  : "Dry matter is what remains after removing water. Daily Dry Matter Intake (DMI) determines ration quantity. It varies by animal weight and production level."}
              </p>
            </div>
          </div>
        </section>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/guide"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {isRtl ? "📖 دليل الاستخدام" : "📖 User Guide"}
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
