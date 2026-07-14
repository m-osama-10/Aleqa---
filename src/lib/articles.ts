/* ================================================================== */
/*  KNOWLEDGE CENTER — Article database (bilingual AR + EN)             */
/*  Each article is a self-contained markdown document.                 */
/* ================================================================== */

export type ArticleCategoryKey =
  | "cattle"
  | "buffalo"
  | "sheep"
  | "poultry"
  | "ingredients"
  | "nutrition-values"
  | "calculator-guide"
  | "tips"
  | "mistakes";

export interface ArticleCategory {
  key: ArticleCategoryKey;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  /** Stable emoji used as a visual marker on category cards. */
  emoji: string;
}

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  {
    key: "cattle",
    nameAr: "تغذية الأبقار",
    nameEn: "Cattle Nutrition",
    descriptionAr: "أساسيات تغذية الأبقار الحلوب والتمسين وفق احتياجاتها من البروتين والطاقة.",
    descriptionEn: "Fundamentals of feeding dairy and fattening cattle to meet protein and energy needs.",
    emoji: "🐄",
  },
  {
    key: "buffalo",
    nameAr: "تغذية الجاموس",
    nameEn: "Buffalo Nutrition",
    descriptionAr: "احتياجات الجاموس الحلوب والتمسين والفروق الجوهرية بينه وبين الأبقار.",
    descriptionEn: "Nutritional needs of dairy and fattening buffalo and key differences from cattle.",
    emoji: "🐃",
  },
  {
    key: "sheep",
    nameAr: "تغذية الأغنام",
    nameEn: "Sheep Nutrition",
    descriptionAr: "تغذية الأغنام في مراحل التسمين المختلفة والاحتياجات حسب العمر والوزن.",
    descriptionEn: "Feeding sheep across fattening stages, with needs varying by age and weight.",
    emoji: "🐑",
  },
  {
    key: "poultry",
    nameAr: "تغذية الدواجن",
    nameEn: "Poultry Nutrition",
    descriptionAr: "تركيب علائق الدجاج البياض واللحم وفق المرحلة العمرية وهدف الإنتاج.",
    descriptionEn: "Formulating layer and broiler rations according to age stage and production goal.",
    emoji: "🐔",
  },
  {
    key: "ingredients",
    nameAr: "شرح المواد الخام",
    nameEn: "Ingredient Guide",
    descriptionAr: "شرح تفصيلي لمكوّنات الأعلاف: القيم الغذائية والأسعار وحدود الاستخدام والبدائل.",
    descriptionEn: "Detailed guide to feed ingredients: nutrition values, prices, usage bounds, and alternatives.",
    emoji: "🌾",
  },
  {
    key: "nutrition-values",
    nameAr: "شرح القيم الغذائية",
    nameEn: "Nutrition Values",
    descriptionAr: "فهم البروتين والطاقة والألياف والمعادن ودور كل منها في صحة الحيوان وإنتاجه.",
    descriptionEn: "Understanding protein, energy, fiber, and minerals and their role in animal health and output.",
    emoji: "📊",
  },
  {
    key: "calculator-guide",
    nameAr: "كيفية استخدام الحاسبة",
    nameEn: "Calculator Guide",
    descriptionAr: "خطوات استخدام حاسبة عليقة للحصول على أرخص عليقة متوازنة في دقائق.",
    descriptionEn: "Step-by-step guide to using the Aleeqa calculator to get the cheapest balanced ration in minutes.",
    emoji: "🧮",
  },
  {
    key: "tips",
    nameAr: "نصائح للمربين",
    nameEn: "Farmer Tips",
    descriptionAr: "نصائح عملية من الميدان لتوفير التكلفة وتحسين الإنتاجية وصحة القطيع.",
    descriptionEn: "Practical field tips to cut costs, boost productivity, and keep your herd healthy.",
    emoji: "💡",
  },
  {
    key: "mistakes",
    nameAr: "أخطاء شائعة",
    nameEn: "Common Mistakes",
    descriptionAr: "أخطاء يقع فيها المربي عند تركيب العليقة وكيفية تجنبها بأسلوب علمي.",
    descriptionEn: "Common mistakes farmers make when formulating rations and how to avoid them scientifically.",
    emoji: "⚠️",
  },
];

export interface Article {
  slug: string;
  category: ArticleCategoryKey;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  /** Arabic body in lightweight Markdown (##, ###, paragraphs, - lists). */
  content: string;
  /** English body in lightweight Markdown. */
  contentEn: string;
  /** Estimated reading time in minutes. */
  readTime: number;
  /** Slugs of related articles shown at the bottom. */
  relatedSlugs: string[];
  /** ISO date string for SEO (date published). */
  publishedAt: string;
}

export const ARTICLES: Article[] = [
  /* --------------------------------------------------------------- */
  {
    slug: "cattle-nutrition-basics",
    category: "cattle",
    title: "أساسيات تغذية الأبقار",
    titleEn: "Cattle Nutrition Basics",
    excerpt:
      "دليل شامل لفهم احتياجات الأبقار الحلوب من البروتين والطاقة والألياف، وكيفية تركيب عليقة متوازنة بأقل تكلفة.",
    excerptEn:
      "A complete guide to understanding dairy cattle needs for protein, energy, and fiber, and how to build a balanced ration at the lowest cost.",
    readTime: 6,
    publishedAt: "2025-01-15",
    relatedSlugs: ["understanding-protein-energy", "saving-money-on-feed", "common-feeding-mistakes"],
    content: `## مقدمة إلى تغذية الأبقار

تعتبر التغذية السليمة هي العامل الأهم في تحديد إنتاج اللبن وصحة البقرة الحلوب وربحية المربي. البقرة التي تنتج 30 كجم لبن يومياً تحتاج لكمية وطاقة أعلى بكثير من بقرة تنتج 10 كجم فقط، ولذلك فإن تركيب العليقة لا يكون ثابتاً بل يتغير حسب مرحلة الإنتاج والوزن والموسم.

## الاحتياجات الأساسية للبقرة الحلوب

تحتاج البقرة الحلوب إلى أربعة عناصر غذائية رئيسية يجب توازنها في العليقة:

- **البروتين الخام (CP):** ضروري لبناء خلايا اللبن وأنسجة الجسم. البقرة الحلوب تحتاج 14-18% بروتين خام في المادة الجافة حسب مستوى الإنتاج.
- **الطاقة (TDN):** المصدر الرئيسي لتشغيل عمليات الحليب. كل كجم لبن يحتاج حوالي 0.35 وحدة طاقة، ولذلك تُعتمد الذرة والشعير كمصادر طاقة أساسية.
- **الألياف (CF):** ضرورية لصحة الكرش ومنع الحماض. يجب ألا تقل الألياف عن 17% من العليقة، ويفضل توفيرها من البرسيم الجاف أو السيلاج.
- **المعادن والفيتامينات:** الكالسيوم والفوسفور ضروريان لإنتاج اللبن وقوة العظام، ويُضاف مخلوط الأملاح المعدنية بنسبة 1-2%.

## حساب الكمية اليومية من العليقة

استهلاك البقرة من المادة الجافة يعادل تقريباً 3-4% من وزنها الحي. بقرة وزنها 500 كجم ستأكل حوالي 15-20 كجم مادة جافة يومياً، توزّع على العليقة المركزة والأقلية الخضراء بنسبة 60:40 في حالات الإنتاج العالي.

> القاعدة الذهبية: كل زيادة 1 كجم مادة جافة تنتج 2 كجم لبن إضافي، شرط أن يكون التوازن الغذائي محققاً.

## تقسيم العليقة حسب مرحلة الإنتاج

### 1. فترة الجفاف (آخر 60 يوم قبل الولادة)
تُخفض كمية العليقة المركزة إلى 1-2 كجم/يوم مع زيادة الألياف للتحضير للولادة وتجنب السمنة وحماية الكرش.

### 2. فترة Transition (آخر 21 يوم قبل الولادة + 21 يوم بعدها)
أهم فترة في حياة البقرة. تُرفع الطاقة تدريجياً (NIC حوالي 1.4-1.5 Mcal/kg) مع إضافة نياسين وكولين لحماية الكبد من الدهون الزائدة.

### 3. فترة الإنتاج المبكر (0-100 يوم حليب)
البقرة في حالة سلب طاقة، تستهلك أكثر مما تأكل. يجب رفع الطاقة والبروتين لأقصى حد ممكن مع إضافة الدهون المحمية بنسبة 2-3%.

### 4. فترة الإنتاج المتوسط والمتأخر
يُخفض تركيز العليقة تدريجياً مع المحافظة على التوازن الغذائي لاستعادة مخزون الجسم استعداداً للجفاف.

## كيف تساعدك حاسبة عليقة؟

بدلاً من الحسابات اليدوية المعقدة، تستخدم حاسبة عليقة خوارزمية البرمجة الخطية (Simplex) لإيجاد أرخص تركيبة تحقق احتياجات البقرة من البروتين والطاقة والألياف مع مراعاة الحدود الدنيا والعليا لكل مكوّن. تختار نوع الحيوان (بقرة حلوب)، تدخل وزن البقرة وإنتاجها من اللبن، فتحصل على النسب المثلى بالكجم والنسبة المئوية مع حساب التكلفة اليومية والشهرية.

## خلاصة

التغذية السليمة للأبقار ليست مجرد إعطاء كميات كبيرة من العلف، بل هي توازن دقيق بين البروتين والطاقة والألياف والمعادن حسب مرحلة الإنتاج. الاستثمار في فهم هذه الأساسيات سيوفر عليك آلاف الجنيهات سنوياً ويزيد إنتاج اللبن بشكل ملحوظ.`,
    contentEn: `## Introduction to Cattle Nutrition

Proper nutrition is the single most important factor determining milk yield, cow health, and farmer profitability. A cow producing 30 kg of milk daily needs far more energy and protein than one producing 10 kg, so ration formulation must change with production stage, body weight, and season.

## Core Requirements of the Dairy Cow

A dairy cow requires four main nutrient groups balanced in the ration:

- **Crude Protein (CP):** Essential for building milk protein and body tissue. Dairy cows need 14-18% CP in dry matter depending on production level.
- **Energy (TDN):** The main driver of milk synthesis. Each kg of milk requires roughly 0.35 energy units, which is why corn and barley are the primary energy sources.
- **Crude Fiber (CF):** Critical for rumen health and preventing acidosis. Fiber should never drop below 17% of the ration, ideally supplied by hay or silage.
- **Minerals & Vitamins:** Calcium and phosphorus are essential for milk production and bone strength. A mineral mix is typically added at 1-2%.

## Calculating Daily Ration Intake

A cow's dry matter intake equals about 3-4% of her body weight. A 500 kg cow will eat 15-20 kg of dry matter daily, split between concentrate and forage at a 60:40 ratio for high-production animals.

> Rule of thumb: each additional 1 kg of dry matter intake produces 2 kg more milk, provided nutritional balance is maintained.

## Ration Split by Production Stage

### 1. Dry period (last 60 days before calving)
Concentrate is reduced to 1-2 kg/day with higher fiber to prepare for calving, prevent obesity, and protect the rumen.

### 2. Transition period (last 21 days before + 21 days after calving)
The most critical window in a cow's life. Energy is gradually raised (NIC ~1.4-1.5 Mcal/kg) with added niacin and choline to protect the liver from fatty infiltration.

### 3. Early lactation (0-100 days in milk)
The cow is in negative energy balance, producing more than she can eat. Energy and protein should be maximized with 2-3% protected fat.

### 4. Mid and late lactation
Ration concentration is gradually reduced while maintaining nutritional balance to restore body reserves before the dry period.

## How the Aleeqa Calculator Helps

Instead of tedious manual calculations, the Aleeqa calculator uses a Linear Programming (Simplex) algorithm to find the cheapest formulation that meets the cow's protein, energy, and fiber needs while respecting each ingredient's min/max bounds. Select the animal type (dairy cow), enter the cow's weight and milk yield, and you get optimal percentages in kg and % with daily and monthly cost.

## Conclusion

Proper cattle feeding is not about giving large amounts of feed — it's a precise balance between protein, energy, fiber, and minerals tailored to production stage. Investing in understanding these basics will save you thousands of pounds annually and noticeably boost milk production.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "buffalo-nutrition-guide",
    category: "buffalo",
    title: "دليل تغذية الجاموس",
    titleEn: "Buffalo Nutrition Guide",
    excerpt:
      "احتياجات الجاموس الحلوب والتمسين تختلف عن الأبقار في الطاقة والماء والأملاح — تعرّف على الفروق وكيف تركّب عليقته.",
    excerptEn:
      "Dairy and fattening buffalo have different energy, water, and mineral needs than cattle — learn the differences and how to formulate their ration.",
    readTime: 5,
    publishedAt: "2025-01-20",
    relatedSlugs: ["cattle-nutrition-basics", "seasonal-feed-management", "saving-money-on-feed"],
    content: `## لماذا تختلف تغذية الجاموس عن الأبقار؟

الجاموس حيوان شبه مائي تطور في البيئات الحارة والرطبة، وله فروق فسيولوجية مهمة تجعل تغذيته تختلف عن الأبقار. معظم المربين في مصر يتعاملون مع الجاموس بنفس منطق الأبقار، وهذا خطأ شائع يكلفهم إنتاجاً وفروقاً في الربح.

## الفروق الرئيسية في الاحتياجات

### 1. استهلاك الماء
الجاموس يستهلك ماء أكثر من البقرة بنسبة 30-40%، خصوصاً في الصيف. نقص الماء يؤدي مباشرة إلى انخفاض إنتاج اللبن وضعف الشهية.

### 2. احتياجات الطاقة
الجاموس أقل كفاءة في تحويل الطاقة إلى لبن مقارنة بالبقرة، ولذلك يحتاج عليقة أكثر تركيزاً (TDN أعلى بنسبة 5-8%) لنفس مستوى الإنتاج.

### 3. الاحتياجات البروتينية
الجاموس الحلوب يحتاج 13-16% بروتين خام، أقل قليلاً من البقرة بنفس الإنتاج، لأنه أكثر كفاءة في إعادة تدوير النيتروجين في الكرش.

### 4. الأملاح المعدنية
الجاموس يفرز المزيد من البوتاسيوم عبر العرق في الحر، ولذلك يحتاج لمخلوط أملاح يحتوي على بوتاسيوم إضافي وملح بنسبة 1-1.5% من العليقة المركزة.

## تركيب عليقة الجاموس الحلوب

عليقة متوازنة لجاموس حلوب ينتج 8-12 كجم لبن يومياً تكون تقريباً:

| المكوّن | النسبة | الكمية/يوم |
|--------|-------|-----------|
| ذرة صفراء | 35% | 5.25 كجم |
| كسب صويا 44% | 18% | 2.7 كجم |
| ردة قمح | 15% | 2.25 كجم |
| برسيم جاف | 25% | 3.75 كجم |
| مخلوط أملاح | 2% | 0.3 كجم |
| ملح + بيكربونات | 1% | 0.15 كجم |

## تغذية جاموس التسمين

جاموس التسمين يحتاج:
- **بروتين 12-14%** في المرحلة الأولى (200-300 كجم)
- **بروتين 10-12%** في المرحلة النهائية (300-450 كجم)
- **TDN 70-75%** طوال فترة التسمين
- **زيادة وزن يومية مستهدفة:** 800-1200 جم/يوم

العليقة الاقتصادية لجاموس التسمين في مصر تعتمد على الذرة + ردة القمح + كسب القطن + تبن القمح مع البرسيم في الشتاء.

## نصائح عملية للمربي المصري

- قدّم الماء النظيف والبارد باستمرار، خصوصاً في الصيف (40-60 لتر/يوم للجاموس الحلوب).
- أضف 1% بيكربونات صوديوم في الصيف لتعادل حموضة الكرش الناتجة عن الحرارة.
- وزّع العليقة على 3-4 وجبات بدلاً من وجبة واحدة لتجنب اضطراب الكرش.
- أضف فيتامين A و E بمعدل 50,000 وحدة/يوم لتحسين الخصوبة في الجاموس.
- استخدم حاسبة عليقة لاختيار نوع "جاموس حلوب" أو "جاموس تسمين" لتحسب النسب تلقائياً.

## خلاصة

الجاموس ليس بقرة ذات قرون ملفوفة — هو حيوان بفسيولوجيا مختلفة واحتياجات خاصة. فهم هذه الفروق ومراعاتها في تركيب العليقة يضيف 1-2 كجم لبن يومياً ويحسن معدل التحويل الغذائي في التسمين بنسبة 10-15%.`,
    contentEn: `## Why Buffalo Feeding Differs from Cattle

The buffalo is a semi-aquatic animal that evolved in hot, humid environments, with important physiological differences that make its nutrition distinct from cattle. Most Egyptian farmers feed buffalo using cattle logic — a common mistake that costs them production and profit.

## Key Differences in Requirements

### 1. Water Intake
Buffalo drink 30-40% more water than cattle, especially in summer. Even mild dehydration directly lowers milk yield and suppresses appetite.

### 2. Energy Needs
Buffalo convert energy to milk less efficiently than cattle, so they need a more concentrated ration (5-8% higher TDN) for the same production level.

### 3. Protein Requirements
Dairy buffalo need 13-16% crude protein, slightly lower than cattle at the same yield, because they recycle rumen nitrogen more efficiently.

### 4. Mineral Needs
Buffalo lose more potassium through sweat in heat, so they need a mineral mix containing extra potassium and 1-1.5% salt in the concentrate.

## Dairy Buffalo Ration Formulation

A balanced ration for a dairy buffalo producing 8-12 kg milk daily is approximately:

| Ingredient | % | Daily Amount |
|-----------|---|--------------|
| Yellow Corn | 35% | 5.25 kg |
| Soybean Meal 44% | 18% | 2.7 kg |
| Wheat Bran | 15% | 2.25 kg |
| Hay | 25% | 3.75 kg |
| Mineral Mix | 2% | 0.3 kg |
| Salt + Bicarb | 1% | 0.15 kg |

## Feeding Fattening Buffalo

Fattening buffalo need:
- **12-14% protein** in the early stage (200-300 kg)
- **10-12% protein** in the finishing stage (300-450 kg)
- **70-75% TDN** throughout fattening
- **Target daily gain:** 800-1200 g/day

The economic fattening ration in Egypt relies on corn + wheat bran + cottonseed meal + wheat straw, with clover in winter.

## Practical Tips for Egyptian Farmers

- Provide clean, cool water continuously, especially in summer (40-60 liters/day for dairy buffalo).
- Add 1% sodium bicarbonate in summer to buffer rumen acidity from heat stress.
- Distribute the ration over 3-4 meals instead of one to avoid rumen upset.
- Supplement vitamins A and E at 50,000 IU/day to improve buffalo fertility.
- Use the Aleeqa calculator with the "dairy buffalo" or "fattening buffalo" type to compute ratios automatically.

## Conclusion

The buffalo is not a cow with curled horns — it's an animal with distinct physiology and specific needs. Understanding and respecting these differences in ration formulation adds 1-2 kg of milk daily and improves feed conversion in fattening by 10-15%.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "poultry-feed-formulation",
    category: "poultry",
    title: "تركيب علائق الدواجن",
    titleEn: "Poultry Feed Formulation",
    excerpt:
      "دليل عملي لتركيب علائق الدجاج البياض ولاحم اللحم وفق المرحلة العمرية واحتياجات البروتين والطاقة والأحماض الأمينية.",
    excerptEn:
      "A practical guide to formulating layer and broiler rations by age stage, with protein, energy, and amino acid requirements.",
    readTime: 6,
    publishedAt: "2025-01-25",
    relatedSlugs: ["understanding-protein-energy", "saving-money-on-feed", "common-feeding-mistakes"],
    content: `## أساسيات تركيب علائق الدواجن

الدواجن من أسرع الحيوانات في تحويل العلف إلى منتج (بيض أو لحم)، ولذلك فإن دقة تركيب العليقة تؤثر مباشرة على الربحية. خطأ بنسبة 1% في البروتين أو الطاقة قد يكلف المربي آلاف الجنيهات في دورة واحدة.

## احتياجات الدجاج البياض

### البادي (0-6 أسابيع)
- بروتين: 19-20%
- طاقة: 2900 كيلو كالوري/كجم
- كالسيوم: 1%
- هدف: نمو قوي للأعضاء والعظام

### النامي (6-18 أسبوع)
- بروتين: 15-16%
- طاقة: 2750 كيلو كالوري/كجم
- كالسيوم: 1.5%
- هدف: نمو متوازن دون سمنة

### الإنتاج (18+ أسبوع)
- بروتين: 16-17%
- طاقة: 2800 كيلو كالوري/كجم
- كالسيوم: 3.5-4% (ضروري لقوة البيضة)
- هدف: أقصى إنتاج بيض بأعلى جودة

## احتياجات دجاج اللحم (Broiler)

### البادي (0-10 يوم)
- بروتين: 23%
- طاقة: 3000 كيلو كالوري/كجم
- هدف: نمو الأعضاء الداخلية والهيكل العظمي

### النامي (11-24 يوم)
- بروتين: 21%
- طاقة: 3100 كيلو كالوري/كجم
- هدف: نمو العضلات بسرعة

### الناهي (25+ يوم)
- بروتين: 19%
- طاقة: 3200 كيلو كالوري/كجم
- هدف: زيادة الوزن النهائية قبل التسويق

## المكوّنات الأساسية للعليقة

تتكون عليقة الدواجن في مصر من:
- **مصدر طاقة (60-70%):** ذرة صفراء هي الأساس، مع إمكانية استخدام الشعير أو السورجم.
- **مصدر بروتين (20-30%):** كسب الصويا 44% أو 46% هو الأفضل، مع كسب القطن كبدءيل أرخص.
- **ألياف (3-7%):** من ردة القمح أو نخالة الأرز.
- **دهون (1-3%):** زيت الصويا أو دهون الدواجن لرفع الطاقة.
- **إضافات (2-3%):** حجر الكلس، فوسفات ثنائي الكالسيوم، ملح، مخلوط فيتامينات وأملاح، ميثيونين وليسين، مضاد سموم.

## الأحماض الأمينية المحدودة

أهم الأحماض الأمينية في تغذية الدواجن:
1. **الميثيونين:** مهم لجودة الريش ونمو العضلات
2. **الليسين:** ضروري لنمو العضلات
3. **التربتوفان والثريونين:** يضاف في العلائق عالية البروتين

نقص أي منها يؤدي لتأخر النمو وانخفاض الإنتاج رغم كفاية البروتين الكلي.

## الأخطاء الشائعة في تركيب علائق الدواجن

- **استخدام كسب القطن بدون معالجة:** يحتوي على جوسيبول السام ويؤثر على الخصوبة في الأمهات.
- **إهمال مضادات السموم:** الأعلاف المصرية معرضة للأفلاتوكسين خصوصاً في الصيف.
- **عدم موازنة الكالسيوم والفوسفور:** نسبة 2:1 في الإنتاج، 1.5:1 في النمو.
- **الاعتماد على البروتين الكلي فقط:** يجب مراعاة الأحماض الأمينية المحدودة.
- **تغيير التركيبة فجأة:** يسبب اضطراباً معوياً وانخفاضاً في الإنتاج لمدة أسبوع.

## استخدام حاسبة عليقة في علائق الدواجن

حاسبة عليقة تدعم 4 أنواع دواجن: دجاج بياض، أمهات دجاج بياض، دجاج تسمين، وكتاكيت بادي. تختار النوع المناسب، تدخل وزن القطيع وعدد الطيور، فتحصل على:
- النسب المثلى لكل مكوّن
- الكمية الكلية بالكجم/يوم للقطيع
- التكلفة اليومية والشهرية
- قيم البروتين والطاقة الناتجة

## خلاصة

تركيب علائق الدواجن علم دقيق يحتاج معرفة بالمرحلة العمرية واحتياجات الإنتاج والأحماض الأمينية المحدودة. الاستثمار في تركيبة جيدة يؤتي ثماره خلال أسابيع قليلة، بينما التركيبة الرديئة تكلف المربي أضعاف ما وفّرته في تكلفة العلف.`,
    contentEn: `## Poultry Feed Formulation Basics

Poultry are among the fastest converters of feed into product (eggs or meat), so ration precision directly affects profitability. A 1% error in protein or energy can cost a farmer thousands of pounds in a single cycle.

## Layer Chicken Requirements

### Starter (0-6 weeks)
- Protein: 19-20%
- Energy: 2900 kcal/kg
- Calcium: 1%
- Goal: strong organ and bone development

### Grower (6-18 weeks)
- Protein: 15-16%
- Energy: 2750 kcal/kg
- Calcium: 1.5%
- Goal: balanced growth without obesity

### Production (18+ weeks)
- Protein: 16-17%
- Energy: 2800 kcal/kg
- Calcium: 3.5-4% (essential for shell strength)
- Goal: maximum egg production with high quality

## Broiler Requirements

### Starter (0-10 days)
- Protein: 23%
- Energy: 3000 kcal/kg
- Goal: internal organ and skeletal growth

### Grower (11-24 days)
- Protein: 21%
- Energy: 3100 kcal/kg
- Goal: rapid muscle growth

### Finisher (25+ days)
- Protein: 19%
- Energy: 3200 kcal/kg
- Goal: final weight gain before marketing

## Core Ration Ingredients

Egyptian poultry rations consist of:
- **Energy source (60-70%):** Yellow corn is the base, with barley or sorghum as alternatives.
- **Protein source (20-30%):** Soybean meal 44% or 46% is best; cottonseed meal is a cheaper supplement.
- **Fiber (3-7%):** From wheat bran or rice bran.
- **Fats (1-3%):** Soybean oil or poultry fat to raise energy.
- **Additives (2-3%):** Limestone, dicalcium phosphate, salt, vitamin & mineral premix, methionine and lysine, toxin binder.

## Limiting Amino Acids

The most important amino acids in poultry nutrition:
1. **Methionine:** critical for feather quality and muscle growth
2. **Lysine:** essential for muscle development
3. **Tryptophan and threonine:** supplemented in high-protein rations

A deficiency in any of these causes growth depression and production drops even when total protein is sufficient.

## Common Mistakes in Poultry Ration Formulation

- **Using untreated cottonseed meal:** contains toxic gossypol and affects breeder fertility.
- **Neglecting toxin binders:** Egyptian feed is exposed to aflatoxin, especially in summer.
- **Poor calcium-phosphorus balance:** aim for 2:1 in production, 1.5:1 in growth.
- **Relying only on crude protein:** must consider limiting amino acids.
- **Sudden ration changes:** cause digestive upset and production drops for a week.

## Using the Aleeqa Calculator for Poultry

The Aleeqa calculator supports 4 poultry types: layer, layer breeder, broiler, and broiler starter. Select the right type, enter flock weight and bird count, and get:
- Optimal ratio for each ingredient
- Total daily amount in kg for the flock
- Daily and monthly cost
- Resulting protein and energy values

## Conclusion

Poultry ration formulation is a precise science requiring knowledge of age stage, production needs, and limiting amino acids. Investing in a good formulation pays off within weeks, while a poor one costs the farmer multiples of what was saved on feed cost.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "understanding-protein-energy",
    category: "nutrition-values",
    title: "فهم البروتين والطاقة في العليقة",
    titleEn: "Understanding Protein and Energy in the Ration",
    excerpt:
      "البروتين والطاقة هما العمود الفقري لأي عليقة — ما الفرق بينهما؟ كيف يقاس كل منهما؟ ومتى تحتاج لرفع أحدهما دون الآخر؟",
    excerptEn:
      "Protein and energy are the backbone of any ration — what's the difference? How is each measured? And when should you raise one without the other?",
    readTime: 5,
    publishedAt: "2025-02-01",
    relatedSlugs: ["cattle-nutrition-basics", "poultry-feed-formulation", "saving-money-on-feed"],
    content: `## لماذا البروتين والطاقة هما الأساس؟

كل مكوّن في العليقة له دور، لكن البروتين والطاقة هما الأهم من حيث التكلفة والتأثير على الإنتاج. معاً يمثلان 80-90% من تكلفة العليقة، وأي خلل في توازنهما يعني إما إهدار مال أو انخفاض إنتاج.

## البروتين الخام (Crude Protein - CP)

### ما هو البروتين الخام؟
البروتين الخام هو مجموع المركبات النيتروجينية في العليقة، ويشمل:
- **البروتين الحقيقي:** سلاسل أحماض أمينية يستفيد منها الحيوان مباشرة
- **المركبات النيتروجينية غير البروتينية (NPN):** مثل اليوريا، يستفيد منها الكرش فقط بعد تحويلها

### مصادر البروتين في العليقة
- **نباتية:** كسب الصويا (44-46%)، كسب القطن (24%)، كسب عباد الشمس (30%)
- **حيوانية:** مسحوق السمك (60-70%)، مسحوق اللحم — نادر في مصر
- **غير بروتينية:** اليوريا (للمجترات فقط، بنسبة لا تتجاوز 1-2%)

### متى نرفع البروتين؟
- في بداية الإنتاج اللبني
- في فرق التسمين المبكرة
- في فترات النمو السريع للدواجن
- للأمهات الحوامل والمرضعات

### أعراض نقص البروتين
- انخفاض إنتاج اللبن أو البيض
- ضعف النمو وفقد الوزن
- ضعف الخصوبة وتأخر الشبق
- ضعف المناعة وزيادة الأمراض

## الطاقة (TDN - Total Digestible Nutrients)

### ما هي الطاقة في العليقة؟
الطاقة هي السعرات الحرارية المتاحة للحيوان بعد هضم العلف. تُقاس بعدة وحدات:
- **TDN (Total Digestible Nutrients):** الأكثر شيوعاً في مصر، نسبة مئوية
- **ME (Metabolizable Energy):** للدواجن، بالكيلو كالوري/كجم
- **NE (Net Energy):** الأدق، يستخدم في المعامل المتقدمة

### مصادر الطاقة في العليقة
- **نشوية:** الذرة (88% TDN)، الشعير (84%)، السورجم (82%)
- **سكرية:** المولاس (72% TDN) — يحدد بـ 5-10% لخطورته على الكرش
- **دهنية:** زيت الصويا، الدهون المحمية — أعلى طاقة (2.25 مرة النشويات)
- **ألياف مهضومة:** البرسيم والسيلاج

### متى نرفع الطاقة؟
- في فترات الإنتاج العالي للبن
- في الحر الشديد (للتعويض عن انخفاض الشهية)
- في نهاية فترة التسمين (لزيادة الوزن النهائية)
- في حالات السلب الطاقة بعد الولادة

### أعراض نقص الطاقة
- انخفاض الإنتاج وفقد الوزن
- ضعف الخصوبة وتأخر الشبق
- في الدواجن: انخفاض وزن الجسم والإنتاج
- في المجترات: الحماض إذا رفعت الطاقة فجأة بدون ألياف كافية

## التوازن بين البروتين والطاقة

النسبة المثالية بين البروتين والطاقة تختلف حسب الحيوان:
- **بقرة حلوب عالية الإنتاج:** 16% بروتين، 70% TDN
- **عجول تسمين:** 12% بروتين، 75% TDN
- **دجاج بياض إنتاج:** 17% بروتين، 2800 kcal/kg
- **دجاج تسمين بادي:** 23% بروتين، 3000 kcal/kg

> قاعدة عامة: رفع البروتين دون طاقة = إهدار بروتين. رفع الطاقة دون بروتين = تراكم دهون.

## كيف يساعدك فهم هذه القيم في الحاسبة؟

حاسبة عليقة تعرض في نتيجة الحساب:
- نسبة البروتين الناتجة في العليقة
- نسبة الطاقة (TDN) الناتجة
- نسبة الألياف
- التكلفة لكل كجم بروتين أو طاقة

يمكنك مقارنة الناتج بالاحتياجات المطلوبة لحيوانك، وتعديل المكوّنات حتى تصل للنسب المستهدفة بأقل تكلفة.

## خلاصة

فهم الفرق بين البروتين والطاقة، ومتى نحتاج لرفع كل منهما، هو المفتاح لتغذية ناجحة. البروتين يبني والطاقة تشغّل — وكلاهما لا غنى عنه. التوازن الصحيح بينهما بأقل تكلفة هو ما تجيده حاسبة عليقة عبر خوارزمية البرمجة الخطية.`,
    contentEn: `## Why Protein and Energy Are the Foundation

Every ingredient in a ration plays a role, but protein and energy dominate cost and production impact. Together they represent 80-90% of ration cost, and any imbalance means either wasted money or reduced output.

## Crude Protein (CP)

### What is Crude Protein?
Crude protein is the sum of nitrogen compounds in the ration, including:
- **True protein:** amino acid chains the animal uses directly
- **Non-protein nitrogen (NPN):** like urea, used only by the rumen after conversion

### Protein Sources in the Ration
- **Plant-based:** soybean meal (44-46%), cottonseed meal (24%), sunflower meal (30%)
- **Animal-based:** fish meal (60-70%), meat meal — rare in Egypt
- **Non-protein:** urea (ruminants only, max 1-2%)

### When to Raise Protein
- At the start of milk production
- In early fattening stages
- During rapid poultry growth
- For pregnant and lactating mothers

### Symptoms of Protein Deficiency
- Lower milk or egg production
- Stunted growth and weight loss
- Poor fertility and delayed estrus
- Weak immunity and more disease

## Energy (TDN - Total Digestible Nutrients)

### What is Energy in a Ration?
Energy is the calories available to the animal after digestion. Measured in several units:
- **TDN (Total Digestible Nutrients):** most common in Egypt, percentage
- **ME (Metabolizable Energy):** for poultry, kcal/kg
- **NE (Net Energy):** most precise, used in advanced labs

### Energy Sources in the Ration
- **Starchy:** corn (88% TDN), barley (84%), sorghum (82%)
- **Sugary:** molasses (72% TDN) — limited to 5-10% due to rumen risk
- **Fats:** soybean oil, protected fats — highest energy (2.25x starches)
- **Digestible fiber:** hay and silage

### When to Raise Energy
- During high milk production
- In extreme heat (to compensate for low appetite)
- At the end of fattening (for final weight gain)
- During post-calving negative energy balance

### Symptoms of Energy Deficiency
- Production drops and weight loss
- Poor fertility and delayed estrus
- In poultry: lower body weight and output
- In ruminants: acidosis if energy is raised suddenly without enough fiber

## The Protein-Energy Balance

The ideal protein-to-energy ratio varies by animal:
- **High-production dairy cow:** 16% protein, 70% TDN
- **Fattening calf:** 12% protein, 75% TDN
- **Production layer:** 17% protein, 2800 kcal/kg
- **Broiler starter:** 23% protein, 3000 kcal/kg

> General rule: raising protein without energy = wasted protein. Raising energy without protein = fat deposition.

## How Understanding These Values Helps in the Calculator

The Aleeqa calculator displays in its results:
- Resulting protein percentage in the ration
- Resulting energy (TDN) percentage
- Fiber percentage
- Cost per kg of protein or energy

You can compare the output with your animal's required needs, and adjust ingredients until you reach the target ratios at the lowest cost.

## Conclusion

Understanding the difference between protein and energy — and when to raise each — is the key to successful feeding. Protein builds, energy fuels — both are essential. The right balance at the lowest cost is exactly what the Aleeqa calculator's linear programming algorithm does best.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "common-feeding-mistakes",
    category: "mistakes",
    title: "أخطاء شائعة في تغذية الماشية",
    titleEn: "Common Feeding Mistakes in Livestock",
    excerpt:
      "تعرّف على أكثر الأخطاء شيوعاً في تغذية الأبقار والجاموس والأغنام والدواجن، وكيف تتجنبها بأسلوب علمي.",
    excerptEn:
      "Learn the most common mistakes in feeding cattle, buffalo, sheep, and poultry, and how to avoid them scientifically.",
    readTime: 6,
    publishedAt: "2025-02-05",
    relatedSlugs: ["cattle-nutrition-basics", "understanding-protein-energy", "saving-money-on-feed"],
    content: `## أخطاء تكلفك آلاف الجنيهات سنوياً

على مدار سنوات من العمل مع المربين في مصر، تكررت مجموعة من الأخطاء في تغذية الماشية. هذه الأخطاء تبدو بسيطة لكنها مجتمعة قد تكلف المربي 20-30% من ربحيته. إليك قائمة بأهمها وكيفية تجنبها.

## الخطأ 1: تغيير العليقة فجأة

**المشكلة:** المجترات تحتاج 10-14 يوماً لتكييف بكتيريا الكرش مع أي تغيير في التركيبة. التغيير المفاجئ يؤدي إلى:
- اضطراب الكرش والحماض
- انخفاض الإنتاج لمدة 2-3 أسابيع
- في الحالات الشديدة: نفوق الحيوان

**الحل:** التغيير التدريجي عبر 7-10 أيام، بمزج 25% من العليقة الجديدة في الأيام 1-3، 50% في الأيام 4-6، 75% في الأيام 7-9، 100% في اليوم 10.

## الخطأ 2: إهمال الألياف في عليقة الإنتاج العالي

**المشكلة:** لرفع الطاقة في علائق الإنتاج العالي، يلجأ البعض لتقليل البرسيم والتبن وزيادة الذرة، مما يخفض الألياف تحت 17%. النتيجة:
- حماض الكرش المزمن
- التهاب الضرع وفقدان الوزن
- انخفاض نسبة الدهون في اللبن

**الحل:** لا تنزل بالألياف تحت 17-18% من المادة الجافة، ولو على حساب زيادة تكلفة العليقة.

## الخطأ 3: استخدام مكوّن واحد للطاقة أو البروتين

**المشكلة:** الاعتماد على الذرة فقط كمصدر طاقة، أو كسب الصويا فقط كمصدر بروتين، يزيد من:
- تكلفة العليقة (لا تستفيد من البدائل الأرخص)
- خطر نقص الأحماض الأمينية
- خطر السموم (تتركز في مكوّن واحد)

**الحل:** استخدم 2-3 مصادر لكل من الطاقة والبروتين. حاسبة عليقة تختار أوتوماتيكياً أرخص توليفة من المكوّنات المتاحة.

## الخطأ 4: تجاهل جودة الماء

**المشكلة:** الماء هو أهم عنصر غذائي (يشكل 60-70% من وزن الحيوان)، لكن كثيراً ما يُهمل. ماء ملوث أو دافئ يقلل الاستهلاك ويخفض الإنتاج بنسبة 10-20%.

**الحل:** قدّم ماء نظيف وبارد باستمرار، نظّف الحوض يومياً، وافحص الماء في المعمل مرة كل 6 أشهر.

## الخطأ 5: عدم موازنة الكالسيوم والفوسفور

**المشكلة:** النسبة الخاطئة بينهما (أقل من 1:1 أو أكثر من 3:1) تؤدي إلى:
- ضعف العظام والكسور
- انخفاض إنتاج اللبن
- حصيات في المسالك البولية (خصوصاً في الذكور)

**الحل:** النسبة المثالية:
- أبقار حلوب: 1.5-2:1
- عجول تسمين: 1.5:1
- دواجن إنتاج: 4:1 (للقشرة)

## الخطأ 6: إهمال مضادات السموم

**المشكلة:** الأعلاف المصرية معرضة للأفلاتوكسين خصوصاً في الصيف. السموم الفطرية تسبب:
- انخفاض الإنتاج والمناعة
- مشاكل في الكبد والكلى
- في الدواجن: نفوق عشوائي وانخفاض التحويل الغذائي

**الحل:** أضف مضاد سموم جيد بنسبة 1-2 كجم/طن، خصوصاً في الصيف. تكلفته بسيطة لكن فوائده كبيرة.

## الخطأ 7: عدم تقسيم العليقة على وجبات

**المشكلة:** تقديم العليقة في وجبة واحدة يسبب:
- اضطراب الكرش (حموضة)
- هدر العلف (تناثر وتبديد)
- انخفاض الهضم والإنتاج

**الحل:** قسّم العليقة على وجبتين (صباحاً ومساءً) للمجترات، 3-4 وجبات للدواجن، مع توفير ألياف باستمرار للمجترات.

## الخطأ 8: تجاهل وزن الحيوان وحالته الإنتاجية

**المشكلة:** إعطاء نفس العليقة لكل الحيوانات بغض النظر عن:
- الوزن (بقرة 400 كجم مقابل 600 كجم)
- مرحلة الإنتاج (بداية مقابل نهاية الحليب)
- الحالة الصحية (حامل، مريض، نامٍ)

**الحل:** صنّف القطيع إلى مجموعات متجانسة وركّب عليقة لكل مجموعة. حاسبة عليقة تسمح بإدخال وزن الحيوان ومستوى الإنتاج فتحسب الاحتياجات بدقة.

## الخطأ 9: عدم تسجيل الأسعار والاستهلاك

**المشكلة:** دون تسجيل دقيق:
- لا تعرف إن كنت تربح أم تخسر
- لا تكتشف هدر العلف
- لا تستطيع مقارنة العلائق

**الحل:** سجّل يومياً: كمية العلف المقدمة، الأسعار، الإنتاج. حاسبة عليقة تحفظ العلائق تلقائياً وتحسب التكلفة اليومية والشهرية لكل منها.

## الخطأ 10: التقليد الأعمى للجار

**المشكلة:** نسخ عليقة الجار دون فهم احتياجات حيواناتك قد يكلفك كثيراً. ما يصلح لقطيع قد لا يصلح لآخر بسبب:
- اختلاف الوزن والسلالة
- اختلاف جودة الأعلاف المتاحة
- اختلاف مرحلة الإنتاج

**الحل:** افهم مبادئ التغذية، استخدم الحاسبة لتحسب احتياجاتك الخاصة، وقارن النتائج مع الجار للتعلّم وليس للتقليد.

## خلاصة

تجنب هذه الأخطاء العشرة قد يحسن ربحيتك بنسبة 20-30% دون استثمار إضافي. التغذية علم، والمعرفة بهذه المبادئ هي ما يميز المربي الناجح عن غيره. استخدم حاسبة عليقة لتجنب معظم هذه الأخطاء تلقائياً، واستشر بيطرى مختص للحالات الخاصة.`,
    contentEn: `## Mistakes That Cost You Thousands Annually

After years of working with Egyptian farmers, a recurring set of feeding mistakes has emerged. These may seem small, but together they can cost a farmer 20-30% of their profit. Here are the most important ones and how to avoid them.

## Mistake 1: Sudden Ration Changes

**The problem:** Ruminants need 10-14 days to adapt rumen bacteria to any ration change. Sudden shifts cause:
- Rumen upset and acidosis
- Production drops lasting 2-3 weeks
- In severe cases: animal death

**The fix:** Gradual change over 7-10 days: 25% new ration days 1-3, 50% days 4-6, 75% days 7-9, 100% on day 10.

## Mistake 2: Neglecting Fiber in High-Production Rations

**The problem:** To boost energy in high-production rations, some cut hay and straw while increasing corn, lowering fiber below 17%. Result:
- Chronic rumen acidosis
- Mastitis and weight loss
- Lower milk fat percentage

**The fix:** Never drop fiber below 17-18% of dry matter, even at higher ration cost.

## Mistake 3: Using a Single Energy or Protein Source

**The problem:** Relying only on corn for energy or only on soybean meal for protein increases:
- Ration cost (no benefit from cheaper alternatives)
- Risk of amino acid deficiency
- Toxin risk (concentrated in one ingredient)

**The fix:** Use 2-3 sources for both energy and protein. The Aleeqa calculator automatically selects the cheapest combination from available ingredients.

## Mistake 4: Ignoring Water Quality

**The problem:** Water is the most important nutrient (60-70% of body weight) but is often neglected. Dirty or warm water reduces intake and drops production by 10-20%.

**The fix:** Provide clean, cool water continuously, clean troughs daily, and test water in a lab every 6 months.

## Mistake 5: Poor Calcium-Phosphorus Balance

**The problem:** Wrong ratio (below 1:1 or above 3:1) causes:
- Weak bones and fractures
- Lower milk production
- Urinary stones (especially in males)

**The fix:** Ideal ratios:
- Dairy cattle: 1.5-2:1
- Fattening calves: 1.5:1
- Production poultry: 4:1 (for shells)

## Mistake 6: Neglecting Toxin Binders

**The problem:** Egyptian feed is exposed to aflatoxin, especially in summer. Mycotoxins cause:
- Production and immunity drops
- Liver and kidney issues
- In poultry: random mortality and lower feed conversion

**The fix:** Add a good toxin binder at 1-2 kg/ton, especially in summer. Cost is small but benefits are large.

## Mistake 7: Feeding Ration in One Meal

**The problem:** Feeding the whole ration at once causes:
- Rumen upset (acidosis)
- Feed waste (scatter and trampling)
- Lower digestion and production

**The fix:** Split ration into 2 meals (morning and evening) for ruminants, 3-4 for poultry, with continuous forage access for ruminants.

## Mistake 8: Ignoring Animal Weight and Production Stage

**The problem:** Feeding all animals the same ration regardless of:
- Weight (400 kg vs 600 kg cow)
- Production stage (early vs late lactation)
- Health status (pregnant, sick, growing)

**The fix:** Group your herd into homogeneous batches and formulate a ration for each. The Aleeqa calculator lets you enter animal weight and production level to compute needs precisely.

## Mistake 9: Not Recording Prices and Consumption

**The problem:** Without accurate records:
- You don't know if you're profitable
- You can't detect feed waste
- You can't compare rations

**The fix:** Record daily: feed amount, prices, production. The Aleeqa calculator saves rations automatically and computes daily and monthly cost for each.

## Mistake 10: Blind Imitation of Your Neighbor

**The problem:** Copying your neighbor's ration without understanding your animals' needs can be costly. What works for one herd may not work for another due to:
- Different weight and breed
- Different feed quality available
- Different production stage

**The fix:** Understand feeding principles, use the calculator for your own needs, and compare results with neighbors to learn — not to copy.

## Conclusion

Avoiding these ten mistakes can improve your profitability by 20-30% with no extra investment. Feeding is a science, and knowing these principles is what separates successful farmers from the rest. Use the Aleeqa calculator to avoid most of these mistakes automatically, and consult a specialized vet for special cases.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "how-to-use-calculator",
    category: "calculator-guide",
    title: "كيف تستخدم حاسبة العليقة",
    titleEn: "How to Use the Feed Calculator",
    excerpt:
      "شرح خطوة بخطوة لاستخدام حاسبة عليقة لإيجاد أرخص عليقة متوازنة لحيواناتك في دقائق معدودة.",
    excerptEn:
      "A step-by-step walkthrough of using the Aleeqa calculator to find the cheapest balanced ration for your animals in minutes.",
    readTime: 5,
    publishedAt: "2025-02-10",
    relatedSlugs: ["cattle-nutrition-basics", "understanding-protein-energy", "saving-money-on-feed"],
    content: `## لماذا حاسبة عليقة؟

قبل حاسبة عليقة، كان تركيب العليقة عملية يدوية معقدة تحتاج خبيراً وحسابات ساعات. الآن، في أقل من 3 دقائق، يمكنك الحصول على أرخص تركيبة متوازنة لحيواناتك — مجاناً، بدون إنترنت، وبجودة علمية معتمدة على معايير NRC.

## الخطوة 1: اختر نوع الحيوان

عند فتح الحاسبة، اختر نوع الحيوان المناسب من 9 أنواع مدعومة:

**المجترات:**
- بقرة حلوب
- جاموس حلوب
- جاموس تسمين
- عجول تسمين
- خروف تسمين

**الدواجن:**
- دجاج بياض
- أمهات دجاج بياض
- دجاج تسمين
- كتاكيت بادي

كل نوع له احتياجات غذائية مختلفة مبنية على معايير NRC المعدّلة للسوق المصري.

## الخطوة 2: أدخل بيانات الحيوان

في الخطوة التالية، أدخل:
- **وزن الحيوان بالكجم**
- **مستوى الإنتاج:** كمية اللبن يومياً للأبقار والجاموس الحلوب، أو متوسط الزيادة اليومية للحيوانات التسمين، أو عدد الطيور للدواجن
- **حجم القطيع:** عدد الرؤوس

هذه البيانات تؤثر على:
- كمية المادة الجافة المستهلكة يومياً
- احتياجات البروتين والطاقة
- التكلفة الإجمالية

## الخطوة 3: اختر المكوّنات

لديك خياران:

### الوضع التلقائي (موصى به للمبتدئين)
النظام يختار أفضل 8-12 مكوّن من بين 22 متاحاً بناءً على:
- السعر الحالي
- القيم الغذائية
- حدود الاستخدام
- ملاءمتها لنوع الحيوان

### الوضع اليدوي (للمربي المحترف)
اختر بنفسك المكوّنات المتوفرة لديك من القائمة. مفيد إذا كان لديك مكوّن معين تريد استخدامه أو تجنب مكوّن غير متوفر.

> نصيحة: ابدأ بالوضع التلقائي، ثم عدّل حسب حاجتك.

## الخطوة 4: اختر نوع العليقة

- **عليقة متوازنة:** تحقق كل الأهداف الغذائية بدقة 100%. مثالية للإنتاج العالي والحيوانات الحساسة.
- **عليقة اقتصادية:** أرخص، مع تخفيف بسيط في الأهداف (5-10%). مناسبة للقطعان العادية والمربين الذين يريدون أقصى توفير.

## الخطوة 5: راجع الأسعار

قبل الحساب النهائي، راجع أسعار المكوّنات:
- الأسعار الافتراضية مبنية على السوق المصري وتُحدّث دورياً
- عدّل الأسعار حسب سوقك المحلي
- الأسعار تُحفظ تلقائياً على جهازك وتُستخدم في كل الحسابات القادمة

## الخطوة 6: احسب العليقة

اضغط زر "احسب العليقة" وستظهر النتيجة فوراً:

### النسب والكميات
- نسبة كل مكوّن في العليقة (%)
- الكمية بالكجم لكل رأس ولو لكل القطيع
- المجموع الكلي

### القيم الغذائية الناتجة
- البروتين الخام %
- الطاقة (TDN) %
- الألياف %
- التكلفة اليومية والشهرية

### رسم بياني للتركيبة
مخطط دائري يوضح توزيع المكوّنات بصرياً.

## الخطوة 7: عدّل يدوياً (اختياري)

بعد عرض النتيجة، يمكنك:
- **تعديل النسب يدوياً** عبر شريط تمرير لكل مكوّن
- **قفل مكوّنات معينة** 🔒 لتثبيتها أثناء الموازنة
- **إعادة التوازن الذكي** لإعادة حساب العليقة مع احترام المكوّنات المقفلة

## الخطوة 8: احفظ وشارك

- **حفظ العليقة** في سجل العلائق للرجوع إليها لاحقاً
- **مشاركة عبر واتساب** مباشرة مع شريك أو طبيب بيطري
- **طباعة كتقرير PDF** للأرشفة أو لعرضها على موظف العلف

## نصائح متقدمة

- **جرّب عدة سيناريوهات:** احسب العليقة بالوضع المتوازن والاقتصادي وقارن التكلفة والقيم الغذائية.
- **استخدم القفل بذكاء:** قفل مكوّن رخيص ومتوفر قد يخفض التكلفة بشكل كبير.
- **حدّث الأسعار أسبوعياً:** أسعار الأعلاف في مصر تتغير بسرعة، والأسعار القديمة قد تخدعك.
- **قارن بين العلائق:** احفظ علائق مختلفة وقارن بينها لاختيار الأفضل.
- **استخدم حاسبة تكلفة التسمين:** لحيوانات التسمين، استخدم الحاسبة الإضافية لحساب صافي الربح وهامش الربح والعائد على الاستثمار.

## خلاصة

حاسبة عليقة أداة قوية وسهلة الاستخدام، لكن قيمتها الحقيقية تظهر عند فهم خطواتها واستخدامها بذكاء. اتبع هذه الخطوات الثماني، وجرّب عدة سيناريوهات، لتصل إلى أرخص عليقة متوازنة لحيواناتك في دقائق.`,
    contentEn: `## Why Use the Aleeqa Calculator?

Before the Aleeqa calculator, ration formulation was a tedious manual process requiring an expert and hours of calculation. Now, in under 3 minutes, you can get the cheapest balanced ration for your animals — free, offline, and at scientific quality based on NRC standards.

## Step 1: Choose Animal Type

When you open the calculator, select the right animal from 9 supported types:

**Ruminants:**
- Dairy cow
- Dairy buffalo
- Fattening buffalo
- Fattening calf
- Fattening sheep

**Poultry:**
- Layer chicken
- Layer breeder
- Broiler
- Broiler starter

Each type has different nutritional requirements based on NRC standards tuned for the Egyptian market.

## Step 2: Enter Animal Data

In the next step, enter:
- **Animal weight in kg**
- **Production level:** daily milk for dairy cattle and buffalo, or average daily gain for fattening animals, or bird count for poultry
- **Flock size:** number of head

These affect:
- Daily dry matter intake
- Protein and energy needs
- Total cost

## Step 3: Select Ingredients

You have two options:

### Automatic Mode (Recommended for Beginners)
The system picks the best 8-12 ingredients from 22 available based on:
- Current price
- Nutritional values
- Usage bounds
- Suitability for the animal type

### Manual Mode (For Advanced Farmers)
Choose yourself which ingredients you have available from the list. Useful if you want to use a specific ingredient or avoid an unavailable one.

> Tip: Start with automatic mode, then adjust as needed.

## Step 4: Choose Ration Type

- **Balanced ration:** meets all nutritional targets 100%. Ideal for high production and sensitive animals.
- **Economy ration:** cheaper, with slight target relaxation (5-10%). Suitable for normal herds and farmers who want maximum savings.

## Step 5: Review Prices

Before final calculation, review ingredient prices:
- Default prices are based on the Egyptian market and updated periodically
- Adjust prices to your local market
- Prices are auto-saved on your device and used in all future calculations

## Step 6: Calculate the Ration

Press "Calculate Ration" and results appear instantly:

### Ratios and Quantities
- Each ingredient's percentage in the ration (%)
- Quantity in kg per head and per flock
- Grand total

### Resulting Nutritional Values
- Crude protein %
- Energy (TDN) %
- Fiber %
- Daily and monthly cost

### Composition Chart
A pie chart showing ingredient distribution visually.

## Step 7: Adjust Manually (Optional)

After viewing results, you can:
- **Manually adjust ratios** via a slider for each ingredient
- **Lock specific ingredients** 🔒 to fix them during balancing
- **Smart Rebalance** to recalculate the ration while respecting locked ingredients

## Step 8: Save and Share

- **Save the ration** to history for later reference
- **Share via WhatsApp** directly with a partner or vet
- **Print as PDF report** for archiving or showing to your feed manager

## Advanced Tips

- **Try multiple scenarios:** calculate the ration in balanced and economy modes and compare cost and nutritional values.
- **Use lock smartly:** locking a cheap, available ingredient can significantly cut cost.
- **Update prices weekly:** feed prices in Egypt change quickly, and old prices can mislead you.
- **Compare rations:** save different rations and compare them to pick the best.
- **Use the Livestock Cost Calculator:** for fattening animals, use the additional calculator to compute net profit, profit margin, and ROI.

## Conclusion

The Aleeqa calculator is a powerful and easy tool, but its true value emerges when you understand its steps and use it smartly. Follow these eight steps, try multiple scenarios, and you'll reach the cheapest balanced ration for your animals in minutes.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "saving-money-on-feed",
    category: "tips",
    title: "كيف توفر في تكلفة العليقة",
    titleEn: "How to Save on Feed Costs",
    excerpt:
      "نصائح عملية من الميدان لتقليل تكلفة العليقة دون التأثير على الإنتاج — استفد من البدائل الرخيصة والتوقيت الذكي.",
    excerptEn:
      "Practical field tips to cut ration costs without hurting production — use cheap alternatives and smart timing.",
    readTime: 5,
    publishedAt: "2025-02-15",
    relatedSlugs: ["how-to-use-calculator", "seasonal-feed-management", "common-feeding-mistakes"],
    content: `## تكلفة العليقة = 60-70% من تكلفة الإنتاج

في معظم مشروعات الإنتاج الحيواني، تمثل العليقة 60-70% من إجمالي التكاليف. أي توفير 10% في تكلفة العليقة يعني زيادة 6-7% في صافي الربح. هذا الدليل يعرض أكثر الطرق عملية لتوفير المال دون التضحية بالإنتاج.

## 1. استخدم البدائل المحلية الرخيصة

بدلاً من الاعتماد على الذرة وكسب الصويا فقط، استكشف البدائل المتوفرة في سوقك:

### بدائل الطاقة
- **الشعير:** أرخص 15-20% من الذرة، بطاقة أقل بقليل (84% مقابل 88% TDN)
- **السورجم:** أرخص 25%، طاقة 82%، مناسب للأبقار والجاموس
- **ردة القمح:** أرخص 35%، طاقة 70%، لكن حدّ استخدامها بـ 20-25%
- **نخالة الأرز:** أرخص 40%، لكن احذر ارتفاع الدهون والأفلاتوكسين

### بدائل البروتين
- **كسب القطن:** أرخص 40% من كسب الصويا، بروتين 24%
- **كسب عباد الشمس:** أرخص 45%، بروتين 30%
- **كسب الكتان:** أرخص 35%، بروتين 32%
- **الفول البلدي:** بروتين 24%، بديل محلي ممتاز في الشتاء

> نصيحة: حاسبة عليقة تختار أوتوماتيكياً أرخص توليفة من البدائل المتاحة، فلا تحتاج لحفظ الأسعار.

## 2. اشترِ في الوقت المناسب

أسعار الأعلاف في مصر تتذبذب بشكل كبير حسب الموسم:

- **الذرة:** أرخص في أكتوبر-ديسمبر (بعد الحصاف) — اشترِ مخزون 3-4 أشهر
- **البرسيم:** أرخص في فبراير-مارس، احتفظ به جافاً (دريس) لاستخدامه في الصيف
- **كسب الصويا:** أرخص في الصيف (وفرة الواردات)
- **كسب القطن:** أرخص في الخريف (بعد قطف القطن)

## 3. خزّن الأعلاف بشكل صحيح

التخزين السيئ يسبب فقد:
- 10-20% من القيمة الغذائية بسبب الرطوبة والعفن
- 5-10% بسبب القوارض والحشرات
- 5% بسبب التسرب والتناثر

**قواعد التخزين:**
- مخزن جاف جيد التهوية (رطوبة أقل من 12%)
- على منصات خشبية 15 سم عن الأرض
- بعيد عن أشعة الشمس المباشرة
- معالجة دورية للقوارض والحشرات
- فحص دوري للعفن والسموم الفطرية

## 4. قلّل الهدر في التغذية

الإحصائيات تشير إلى فقد 5-15% من العليقة بسبب:
- التناثر أثناء التوزيع
- التبديد في المعلف
- الفساد في الحقل (للأعلاف الخضراء)

**طرق تقليل الهدر:**
- استخدم معلفاً جيداً يمنع التناثر (مع حافة عالية)
- قدّم العليقة على دفعات صغيرة (3-4 مرات يومياً)
- نظّف المعلف يومياً
- قدّم العليقة المركزة قبل الألياف لتحسين الهضم

## 5. ركّب عليقتك بدقة

الفروق الدقيقة في التركيبة تُحدث فرقاً كبيراً في التكلفة:
- **زيادة 5% ردة قمح على حساب الذرة** توفر 4-5% من التكلفة دون تأثير ملحوظ على الإنتاج
- **استخدام كسب قطن 10%** يخفض تكلفة البروتين بنسبة 8-10%
- **الحد الأقصى من المولاس** (5-8%) يحسّن الطعم ويقلل الغبار دون تكلفة

حاسبة عليقة تعمل على إيجاد هذه التركيبة المثلى أوتوماتيكياً عبر البرمجة الخطية.

## 6. استغل الأعلاف الخضراء الموسمية

في مصر، البرسيم متوفر ورخيص جداً في الشتاء (نصف تكلفة العليقة الجافة تقريباً). استغل ذلك بـ:
- زيادة نسبة البرسيم في العليقة الشتوية إلى 30-40%
- حفظ البرسيم كدريس (تبن برسيم) لاستخدامه في الصيف
- زراعة محاصيل علفية مكمّلة (ذرة سيلوج، سورجم)

## 7. راقب الاستهلاك والإنتاج

بدون بيانات دقيقة، تستمر في دفع تكاليف زائدة دون أن تشعر:
- **وزن العليقة المقدمة** يومياً لكل رأس
- **الإنتاج** اليومي من اللبن أو الزيادة في الوزن
- **التكلفة الفعلية** لكل كجم إنتاج

> القاعدة الذهبية: تكلفة العليقة لكل كجم لبن يجب ألا تتجاوز 50% من سعر بيع اللبن.

حاسبة عليقة تحسب التكلفة اليومية والشهرية لكل عليقة، وحاسبة تكلفة التسمين تحسب صافي الربح وهامش الربح.

## 8. تجنب العلائق الفاخرة

بعض الإضافات قد لا تكون ضرورية:
- **الفيتامينات الإضافية:** تحتاجها فقط إذا كانت الأعلاف فقيرة (احفظ فيتامين A و E للجاموس فقط)
- **الأحماض الأمينية الاصطناعية:** ضرورية للدواجن، أقل أهمية للمجترات
- **الدهون المحمية:** مفيدة للإنتاج العالي جداً، إهدار للمال في الإنتاج المتوسط
- **مضادات السموم:** ضرورية في الصيف، قد لا تحتاجها في الشتاء

## 9. لا تضحي بالإنتاج من أجل التوفير

التوفير المفرط قد يكلف أكثر مما يوفر:
- نقص البروتين 2% يخفض إنتاج اللبن 5-8% (خسارة أكبر من التوفير)
- نقص الطاقة 3% يؤخر الشبق ويقلل الخصوبة
- نقص الألياف يسبب حماض الكرش وتكاليف بيطرية باهظة

**القاعدة:** خفّض التكلفة عبر البدائل والتركيبة، لا عبر تقليل الاحتياجات الأساسية.

## خلاصة

توفير تكلفة العليقة ممكن وعملي، لكنه يحتاج فهماً ومعرفة وساعة من المتابعة الأسبوعية. ابدأ باستخدام حاسبة عليقة لتحسب التركيبة الأرخص المتوازنة، ثم طبّق هذه النصائح التسع تدريجياً. نتائجك ستتحسن خلال أسابيع قليلة.`,
    contentEn: `## Feed Cost = 60-70% of Production Cost

In most livestock production projects, feed represents 60-70% of total costs. Any 10% savings on feed cost means a 6-7% increase in net profit. This guide shows the most practical ways to save money without sacrificing production.

## 1. Use Cheap Local Alternatives

Instead of relying only on corn and soybean meal, explore alternatives available in your market:

### Energy Alternatives
- **Barley:** 15-20% cheaper than corn, slightly less energy (84% vs 88% TDN)
- **Sorghum:** 25% cheaper, 82% energy, suitable for cattle and buffalo
- **Wheat bran:** 35% cheaper, 70% energy, but limit to 20-25%
- **Rice bran:** 40% cheaper, but watch for high fat and aflatoxin

### Protein Alternatives
- **Cottonseed meal:** 40% cheaper than soybean meal, 24% protein
- **Sunflower meal:** 45% cheaper, 30% protein
- **Linseed meal:** 35% cheaper, 32% protein
- **Fava bean:** 24% protein, excellent local alternative in winter

> Tip: The Aleeqa calculator automatically picks the cheapest combination of alternatives — no need to memorize prices.

## 2. Buy at the Right Time

Feed prices in Egypt fluctuate significantly by season:

- **Corn:** cheapest October-December (after harvest) — buy 3-4 months of stock
- **Clover:** cheapest February-March, save as hay for summer use
- **Soybean meal:** cheapest in summer (import arrivals)
- **Cottonseed meal:** cheapest in autumn (after cotton picking)

## 3. Store Feed Properly

Poor storage causes loss of:
- 10-20% nutritional value due to moisture and mold
- 5-10% to rodents and insects
- 5% to spillage and scattering

**Storage rules:**
- Dry, well-ventilated warehouse (moisture below 12%)
- On wooden pallets 15 cm off the ground
- Away from direct sunlight
- Periodic rodent and insect control
- Periodic inspection for mold and mycotoxins

## 4. Reduce Feeding Waste

Statistics show 5-15% ration loss due to:
- Scatter during distribution
- Waste at the trough
- Field spoilage (for green fodder)

**Waste reduction methods:**
- Use a good trough that prevents scatter (with high edge)
- Feed in small batches (3-4 times daily)
- Clean troughs daily
- Offer concentrate before forage to improve digestion

## 5. Formulate Your Ration Precisely

Subtle formulation differences make a big cost difference:
- **Increasing wheat bran 5% at the expense of corn** saves 4-5% with no noticeable production impact
- **Using 10% cottonseed meal** cuts protein cost by 8-10%
- **Maximum molasses (5-8%)** improves taste and reduces dust at low cost

The Aleeqa calculator finds this optimal formulation automatically via linear programming.

## 6. Use Seasonal Green Fodder

In Egypt, clover is very available and cheap in winter (about half the cost of dry feed). Leverage this by:
- Increasing clover to 30-40% in the winter ration
- Saving clover as hay for summer use
- Planting supplementary forage crops (silage corn, sorghum)

## 7. Monitor Consumption and Production

Without accurate data, you keep paying extra costs without noticing:
- **Ration weight** offered daily per head
- **Production** daily milk or weight gain
- **Actual cost** per kg of production

> Golden rule: ration cost per kg milk should not exceed 50% of milk sale price.

The Aleeqa calculator computes daily and monthly cost for each ration, and the Livestock Cost Calculator computes net profit and margin.

## 8. Avoid Luxury Rations

Some additives may not be necessary:
- **Extra vitamins:** needed only if feeds are poor (save A and E for buffalo)
- **Synthetic amino acids:** essential for poultry, less so for ruminants
- **Protected fats:** useful for very high production, wasted money in medium production
- **Toxin binders:** essential in summer, may not need in winter

## 9. Don't Sacrifice Production to Save

Over-saving can cost more than it saves:
- 2% protein deficiency drops milk production 5-8% (loss bigger than savings)
- 3% energy deficiency delays estrus and reduces fertility
- Fiber deficiency causes rumen acidosis and costly vet bills

**Rule:** Cut cost through alternatives and formulation, not by reducing essential needs.

## Conclusion

Saving on feed cost is possible and practical, but requires understanding, knowledge, and an hour of weekly monitoring. Start with the Aleeqa calculator to compute the cheapest balanced ration, then apply these nine tips gradually. Your results will improve within weeks.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "seasonal-feed-management",
    category: "tips",
    title: "إدارة العليقة حسب المواسم",
    titleEn: "Seasonal Feed Management",
    excerpt:
      "تتغير احتياجات الحيوان حسب الموسم — تعلّم كيف تعدّل العليقة في الصيف الحار والشتاء البارد ومواسم وفرة العلف.",
    excerptEn:
      "Animal needs change by season — learn how to adjust the ration in hot summer, cold winter, and feed-abundance seasons.",
    readTime: 5,
    publishedAt: "2025-02-20",
    relatedSlugs: ["saving-money-on-feed", "cattle-nutrition-basics", "buffalo-nutrition-guide"],
    content: `## لماذا تتغير العليقة حسب الموسم؟

في مصر، تتراوح درجات الحرارة بين 5°م في الشتاء و45°م في الصيف، وهذا الفارق الكبير يؤثر على:
- استهلاك العلف (ينخفض 10-20% في الصيف)
- احتياجات الطاقة (ترتفع في البرد للأبقار، تنخفض في الحر)
- توافر الأعلاف الخضراء (وفرة في الشتاء، ندرة في الصيف)
- احتياجات الماء والأملاح (ترتفع بشدة في الصيف)

تركيب عليقة ثابتة طوال العام هو خطأ شائع يكلف المربي إنتاجاً ومالاً. هذا الدليل يعرض التعديلات الموسمية اللازمة.

## الربيع (مارس - مايو)

الربيع في مصر هو موسم البرسيم، حيث تتوافر الأعلاف الخضراء بأسعار رخيصة جداً.

### التعديلات الموصى بها
- **زيادة البرسيم** في العليقة إلى 30-40% من المادة الجافة
- **تقليل العليقة المركزة** بنسبة 10-15%
- **الاستفادة من وفرة البرسيم** لصناعة الدريس (تبن برسيم جاف) لاستخدامه صيفاً
- **مراقبة نسبة البروتين** لأن البرسيم غني بالبروتين (17-20%)

### احذر من
- نقص الطاقة بسبب الإفراط في البرسيم (البرسيم طاقته 58% فقط)
- النفاخ لدى المجترات عند الانتقال المفاجئ للبرسيم الأخضر

## الصيف (يونيو - أغسطس)

الصيف هو أصعب موسم للماشية في مصر، حيث تتجاوز الحرارة 35°م لفترات طويلة، مما يسبب:

### مشاكل التغذية في الصيف
- انخفاض الشهية 15-25%
- انخفاض إنتاج اللبن 10-20%
- ضعف الخصوبة وتأخر الشبق
- خطر الحماض واضطراب الكرش

### التعديلات الموصى بها
- **رفع تركيز الطاقة** بنسبة 5-10% لتعويض انخفاض الشهية
- **إضافة دهون محمية** بنسبة 2-3% (طاقة عالية دون عبء على الكرش)
- **إضافة بيكربونات الصوديوم** بنسبة 1% لمعادلة حموضة الكرش
- **زيادة مخلوط الأملاح** إلى 2% مع بوتاسيوم إضافي
- **تقديم العليقة في الصباح البكر والمساء** (أبرد الأوقات)
- **توفير ماء بارد ونظيف** باستمرار (50-60 لتر/يوم للبقرة الحلوب)

### احذر من
- الأعلاف المتعفنة (تتكاثر السموم الفطرية في الحرارة)
- الإفراط في المولاس (يسبب حماض)
- نقص فيتامين A و E (يستهلك بسرعة في الحر)

## الخريف (سبتمبر - نوفمبر)

الخريف فترة انتقالية تنخفض فيها الحرارة تدريجياً وتنتهي موسم البرسيم.

### التعديلات الموصى بها
- **العودة للعليقة المركزة العادية** تدريجياً
- **استخدام الدريس المحفوظ** من البرسيم كمصدر ألياف
- **رفع نسبة الذرة** مع توفرها بعد الحصاد (أسعار أرخص)
- **زيادة فيتامين A و E** استعداداً لفصل الشتاء
- **تطعيم القطيع** ضد الأمراض الشتوية

### احذر من
- الانتقال المفاجئ من البرسيم للعليقة الجافة (يسبب اضطراب هضمي)
- عدم تخزين كميات كافية من الدريس للشتاء

## الشتاء (ديسمبر - فبراير)

الشتاء في مصر معتدل عموماً، لكن البرد في الصباح الباكر والليل يؤثر على الحيوانات الصغيرة والفروعة.

### التعديلات الموصى بها
- **رفع الطاقة 5-8%** لتعويض فاقد الحرارة (خصوصاً للحيوانات الصغيرة)
- **توفير ماء دافئ** (15-20°م) لزيادة الاستهلاك
- **زيادة الألياف** قليلاً لتوليد حرارة الكرش (التخمر يولد حرارة)
- **تقديم العليقة في وجبات متعددة** خلال النهار
- **حماية الحيوانات من التيارات الهوائية الباردة** دون الإغلاق الكامل

### احذر من
- الأعلاف الرطبة (تكثر فيها السموم الفطرية)
- برودة ماء الشرب (تقلل الاستهلاك والإنتاج)
- نقص فيتامين D (يقل ضوء الشمس في الشتاء)

## التعديلات حسب نوع الحيوان

### الأبقار الحلوب
الأكثر حساسية للتغيرات الموسمية. انخفاض الإنتاج الصيفي قد يصل 25% دون تعديلات.

### الجاموس
الأكثر تأثراً بالحر (يفقد الماء بسرعة عبر العرق). يحتاج ماء أكثر بـ 30% من البقرة.

### الأغنام
تتحمل البرد أكثر من الحر. في الصيف، قد تتوقف عن الأكل في ذروة الحرارة.

### الدواجن
الأكثر تأثراً. الدجاج البياض يخفض إنتاجه 15-30% في الحر، والدجاج اللاحم قد ينفق بسبب الإجهاد الحراري.

## نصائح عملية شاملة

1. **غيّر العليقة تدريجياً** عبر 7-10 أيام بين المواسم
2. **سجّل الأسعار والاحتياجات** شهرياً لتخطيط التخزين
3. **استخدم حاسبة عليقة** لإعادة حساب العليقة كل موسم بالأسعار الحالية
4. **استثمر في مظلات ومراوح** للقطيع الصيفي (تكلفتها تعود خلال موسم واحد)
5. **لا تنتظر انخفاض الإنتاج** لتعدّل العليقة — اجعل التغيير استباقياً

## خلاصة

إدارة العليقة حسب المواسم ليست رفاهية، بل ضرورة اقتصادية. التعديلات الموسمية المناسبة تحافظ على الإنتاج وتقلل التكلفة وتحسن صحة القطيع. ابدأ بمراجعة عليقتك الحالية وتطبيق التعديلات الموصى بها للموسم القادم، واستخدم حاسبة عليقة لإعادة الحساب بأسعار اليوم.`,
    contentEn: `## Why Does the Ration Change by Season?

In Egypt, temperatures range from 5°C in winter to 45°C in summer, and this large difference affects:
- Feed intake (drops 10-20% in summer)
- Energy needs (rise in cold for cattle, drop in heat)
- Green feed availability (abundant in winter, scarce in summer)
- Water and mineral needs (rise sharply in summer)

A fixed year-round ration is a common mistake that costs farmers production and money. This guide shows the seasonal adjustments needed.

## Spring (March - May)

Spring in Egypt is clover season, when green feed is available at very cheap prices.

### Recommended Adjustments
- **Increase clover** in the ration to 30-40% of dry matter
- **Reduce concentrate** by 10-15%
- **Leverage clover abundance** to make hay for summer use
- **Monitor protein percentage** since clover is protein-rich (17-20%)

### Watch out for
- Energy deficiency from excess clover (clover energy is only 58%)
- Bloat in ruminants when transitioning suddenly to fresh clover

## Summer (June - August)

Summer is the hardest season for livestock in Egypt, with temperatures exceeding 35°C for long periods, causing:

### Summer Feeding Issues
- 15-25% appetite drop
- 10-20% milk production drop
- Poor fertility and delayed estrus
- Risk of acidosis and rumen upset

### Recommended Adjustments
- **Raise energy concentration** 5-10% to compensate for low appetite
- **Add protected fats** at 2-3% (high energy without rumen burden)
- **Add sodium bicarbonate** at 1% to buffer rumen acidity
- **Increase mineral mix** to 2% with extra potassium
- **Feed in early morning and evening** (coolest times)
- **Provide cool, clean water** continuously (50-60 liters/day for dairy cow)

### Watch out for
- Moldy feed (mycotoxins multiply in heat)
- Excess molasses (causes acidosis)
- Vitamin A and E deficiency (consumed quickly in heat)

## Autumn (September - November)

Autumn is a transitional period when temperatures drop gradually and clover season ends.

### Recommended Adjustments
- **Gradually return** to normal concentrate ration
- **Use saved clover hay** as a fiber source
- **Increase corn ratio** with post-harvest availability (cheaper prices)
- **Boost vitamins A and E** in preparation for winter
- **Vaccinate the herd** against winter diseases

### Watch out for
- Sudden transition from clover to dry ration (causes digestive upset)
- Not storing enough hay for winter

## Winter (December - February)

Winter in Egypt is generally mild, but cold early morning and night affects young and growing animals.

### Recommended Adjustments
- **Raise energy 5-8%** to compensate for heat loss (especially for young animals)
- **Provide warm water** (15-20°C) to increase intake
- **Slightly increase fiber** to generate rumen heat (fermentation produces heat)
- **Offer ration in multiple meals** throughout the day
- **Protect animals from cold drafts** without full enclosure

### Watch out for
- Wet feed (more mycotoxins)
- Cold drinking water (reduces intake and production)
- Vitamin D deficiency (less winter sunlight)

## Adjustments by Animal Type

### Dairy Cows
Most sensitive to seasonal changes. Summer production drop can reach 25% without adjustments.

### Buffalo
Most affected by heat (loses water quickly through sweat). Needs 30% more water than cattle.

### Sheep
Tolerate cold better than heat. In summer, they may stop eating during peak heat.

### Poultry
Most affected. Layers drop production 15-30% in heat, and broilers may die from heat stress.

## Comprehensive Practical Tips

1. **Change ration gradually** over 7-10 days between seasons
2. **Record prices and needs** monthly to plan storage
3. **Use the Aleeqa calculator** to recalculate the ration each season with current prices
4. **Invest in shades and fans** for the summer flock (cost pays back in one season)
5. **Don't wait for production drop** to adjust the ration — make changes proactively

## Conclusion

Seasonal ration management is not a luxury but an economic necessity. Proper seasonal adjustments maintain production, cut cost, and improve herd health. Start by reviewing your current ration and applying recommended adjustments for the upcoming season, and use the Aleeqa calculator to recalculate with today's prices.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "sheep-nutrition-basics",
    category: "sheep",
    title: "أساسيات تغذية الأغنام",
    titleEn: "Sheep Nutrition Basics",
    excerpt:
      "دليل عملي لفهم احتياجات الأغنام من البروتين والطاقة والألياف، وكيفية تركيب عليقة متوازنة تحقق نمواً وإنتاجاً بأقل تكلفة.",
    excerptEn:
      "A practical guide to sheep nutrition needs — protein, energy, and fiber — and how to build a balanced ration that maximizes gain at the lowest cost.",
    readTime: 5,
    publishedAt: "2025-02-05",
    relatedSlugs: ["sheep-protein-energy-fiber", "sheep-fattening-rations", "seasonal-feed-management"],
    content: `## مقدمة في تغذية الأغنام

الأغنام من أكثر الحيوانات الاقتصادية في مصر، وتتميز بكفاءة تحويل غذائي عالية عند ضبط العليقة. كثير من المربين يكتفون بإطلاق القطيع في المرعى ثم تقديم بعض العلف المركز، لكن هذا الأسلوب لا يحقق أقصى ربح ممكن. التغذية العلمية تبدأ بفهم احتياجات الحيوان حسب الوزن والعمر والهدف (تسمين، تناسل، حلاب).

## الاحتياجات الأساسية للنعجة الواحدة

تحتاج النعجة البالغة (وزن 50-60 كجم) يومياً إلى:

- **مادة جافة:** 1.2-1.5 كجم/يوم (2.5-3% من الوزن الحي).
- **بروتين خام:** 11-13% في عليقة التسمين، و9-11% في علائق الصيانة.
- **طاقة (TDN):** 55-65% حسب حالة الإنتاج.
- **ألياف:** لا تقل عن 12% لضمان صحة الكرش.
- **مياه نظيفة:** 4-8 لتر/يوم في الشتاء وقد تصل لـ 10 لتر في الصيف.

## تقسيم العليقة بين المركز والخشن

قاعدة عامة في مصر: العليقة المركزة تشكل 40-60% من المادة الجافة في فترة التسمين، والباقي من الأعلاف الخضراء (البرسيم في الشتاء) أو الجافة (دريس، تبن). الاعتماد الكامل على العلف المركز يرفع التكلفة ويرهق الكرش، بينما الاعتماد الكامل على الخشن يبطئ النمو.

> نصيحة عملية: قدّم البرسيم الأخضر بمعدل 3-5 كجم/رأس/يوم في موسمه (ديسمبر-أبريل) لتقليل استهلاك المركز بنسبة 30%.

## كيف تحسب كمية العليقة لقطيعك؟

إذا كان لديك 10 رؤوس تسمين متوسط وزنها 40 كجم، فتحتاج يومياً حوالي 12-15 كجم مادة جافة. تقسم على وجبتين صباحاً ومساءً، مع توفير المياه في الحوض باستمرار. استخدم حاسبة عليقة واختر نوع "أغنام تسمين"، أدخل متوسط الوزن ومعدل النمو المستهدف لتحصل على النسب المثلى.

## خلاصة

نجاح تربية الأغنام يبدأ من فهم احتياجاتها الغذائية الأساسية وضبط التوازن بين المركز والخشن. المربي الذي يقيس الكميات ويوزّعها علمياً يحقق زيادة وزن يومية 150-250 جم، مقارنة بـ 80-120 جم فقط في التربية العشوائية.`,
    contentEn: `## Introduction to Sheep Nutrition

Sheep are among the most economical livestock in Egypt, with high feed conversion efficiency when the ration is properly balanced. Many farmers simply release the flock to graze and add some concentrate, but this approach does not maximize profit. Scientific feeding begins with understanding the animal's needs by weight, age, and goal (fattening, breeding, or dairy).

## Basic Requirements per Ewe

A mature ewe (50-60 kg) needs daily:

- **Dry matter:** 1.2-1.5 kg/day (2.5-3% of body weight).
- **Crude protein:** 11-13% in fattening rations, 9-11% in maintenance.
- **Energy (TDN):** 55-65% depending on production stage.
- **Fiber:** No less than 12% to maintain rumen health.
- **Clean water:** 4-8 liters/day in winter, up to 10 liters in summer.

## Splitting Ration Between Concentrate and Roughage

A general rule in Egypt: concentrate makes up 40-60% of dry matter in fattening, with the rest from green forage (clover in winter) or dry roughage (hay, straw). Relying only on concentrate raises cost and stresses the rumen, while relying only on roughage slows growth.

> Practical tip: Offer fresh clover at 3-5 kg/head/day in season (December-April) to cut concentrate use by 30%.

## How to Calculate Ration for Your Flock

If you have 10 fattening heads averaging 40 kg, they need about 12-15 kg of dry matter daily, split into two meals (morning and evening), with water available at all times. Use the Aleeqa calculator, select "fattening sheep," enter average weight and target growth rate to get optimal ratios.

## Conclusion

Successful sheep farming starts with understanding basic nutritional needs and balancing concentrate vs. roughage. A farmer who measures and distributes scientifically achieves 150-250 g daily gain, compared to only 80-120 g in random management.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "lamb-nutrition-by-age",
    category: "sheep",
    title: "احتياجات الحملان الغذائية حسب العمر",
    titleEn: "Lamb Nutrition Needs by Age",
    excerpt:
      "برنامج تغذية متكامل للحملان من الولادة حتى التسويق: السرسوب، الفطام، النمو، التشطيب — بالنسب والكميات العملية.",
    excerptEn:
      "A complete lamb feeding program from birth to market: colostrum, weaning, growth, and finishing — with practical ratios and quantities.",
    readTime: 6,
    publishedAt: "2025-02-08",
    relatedSlugs: ["sheep-nutrition-basics", "sheep-fattening-rations", "lactating-ewe-nutrition"],
    content: `## مراحل تغذية الحملان

الحمل لا يولد بكرش فعّال، بل يمر بمراحل تطور فسيولوجي تتطلب تغذية متدرجة. الخطأ في أي مرحلة قد يكلف المربي 20-30% من وزن التسويق النهائي.

## المرحلة الأولى: الولادة حتى 3 أسابيع (الاعتماد الكلي على اللبن)

- **السرسوب:** ضروري خلال أول 4-6 ساعات بعد الولادة. يحتوي على أجسام مضادة تحمي الحمل من الأمراض.
- **التغذية الكاملة:** الحمل يعتمد 100% على لبن الأم، ويزن 4-6 كجم عند الولادة، ويحتاج 1-1.5 لتر لبن/يوم.
- **ملاحظة:** تأكد من رضاعة الحمل لثدي الأم خلال أول ساعتين، خصوصاً إذا كانت النعجة أول مرة أم.

## المرحلة الثانية: 3-8 أسابيع (الفطام التدريجي)

في هذه المرحلة يبدأ الكرش بالنمو، ويجب تقديم علف بادي:
- **علف بادي:** بروتين 18-20%، طاقة 2900 كيلوكالوري/كجم.
- **برسيم جاف أو دريس:** يقدم بحرية لتشجيع نمو الكرش.
- **مياه نظيفة:** متوفرة دائماً بجوار العلف.
- **هدف وزني عند الفطام (8 أسابيع):** 18-22 كجم.

> القاعدة: لا تفطم الحمل قبل أن يأكل 200 جم علف بادي/يوم لمدة 3 أيام متتالية.

## المرحلة الثالثة: 2-4 شهور (مرحلة النمو)

بعد الفطام، يكون البروتين هو المحدد الأساسي للنمو:
- **بروتين خام:** 16-18%
- **طاقة (TDN):** 68-70%
- **استهلاك يومي:** 600-900 جم علف مركز + 300-500 جم دريس.
- **معدل النمو المستهدف:** 200-250 جم/يوم.
- **وزن مستهدف عند 4 شهور:** 30-35 كجم.

## المرحلة الرابعة: 4-6 شهور (مرحلة التشطيب)

خفض البروتين ورفع الطاقة للحصول على تكوين عضلي ودهني متوازن:
- **بروتين خام:** 13-14%
- **طاقة (TDN):** 70-72%
- **استهلاك يومي:** 900-1200 جم مركز + 400 جم قش.
- **معدل النمو المستهدف:** 150-200 جم/يوم.
- **وزن التسويق:** 45-55 كجم.

## نصائح لتحسين أداء الحملان

- قدّم العلف البادي منذ الأسبوع الثاني لتحفيز نمو الكرش مبكراً.
- لا تقدم الحبوب الكاملة قبل 8 أسابيع (الحمل لا يستطيع هضمها جيداً).
- أضف مضادات السموم الفطرية في الصيف (200 جم/طن).
- أضف مخلوط أملاح معدنية بنسبة 1-1.5% في العليقة.
- افصل الحملان الذكور عن الإناث في عمر 3 شهور لتفادي التلقيح المبكر.

## خلاصة

بروتين البرمجة الغذائية للحملان يعتمد على التدرج من اللبن إلى العلف الصلب، مع ضبط نسب البروتين والطاقة في كل مرحلة. الالتزام بهذه المراحل يضمن وصول الحمل لوزن 50 كجم في 5-6 شهور بدلاً من 8 شهور في التربية التقليدية.`,
    contentEn: `## Stages of Lamb Nutrition

A lamb is not born with a functional rumen; it passes through stages of physiological development requiring gradual feeding. A mistake in any stage can cost the farmer 20-30% of the final market weight.

## Stage 1: Birth to 3 Weeks (Full Dependence on Milk)

- **Colostrum:** Essential within the first 4-6 hours after birth. Contains antibodies protecting the lamb from disease.
- **Complete nutrition:** The lamb depends 100% on mother's milk, weighs 4-6 kg at birth, and needs 1-1.5 liters of milk/day.
- **Note:** Make sure the lamb suckles within the first two hours, especially if the ewe is a first-time mother.

## Stage 2: 3-8 Weeks (Gradual Weaning)

At this stage the rumen begins developing, and starter feed should be offered:
- **Starter feed:** 18-20% protein, 2900 kcal/kg energy.
- **Clover hay:** Offered freely to encourage rumen development.
- **Clean water:** Always available near feed.
- **Target weaning weight (8 weeks):** 18-22 kg.

> Rule: Do not wean the lamb before it eats 200 g of starter/day for 3 consecutive days.

## Stage 3: 2-4 Months (Growth Stage)

After weaning, protein is the main driver of growth:
- **Crude protein:** 16-18%
- **Energy (TDN):** 68-70%
- **Daily intake:** 600-900 g concentrate + 300-500 g hay.
- **Target growth rate:** 200-250 g/day.
- **Target weight at 4 months:** 30-35 kg.

## Stage 4: 4-6 Months (Finishing Stage)

Lower protein and raise energy for balanced muscle and fat formation:
- **Crude protein:** 13-14%
- **Energy (TDN):** 70-72%
- **Daily intake:** 900-1200 g concentrate + 400 g straw.
- **Target growth rate:** 150-200 g/day.
- **Market weight:** 45-55 kg.

## Tips to Improve Lamb Performance

- Offer starter feed from the second week to stimulate early rumen development.
- Do not offer whole grains before 8 weeks (lambs cannot digest them well).
- Add mycotoxin binders in summer (200 g/ton).
- Add a mineral mix at 1-1.5% of the ration.
- Separate male lambs from females at 3 months to avoid early breeding.

## Conclusion

The lamb feeding program relies on gradual transition from milk to solid feed, with balanced protein and energy ratios at each stage. Following these stages ensures the lamb reaches 50 kg in 5-6 months instead of 8 months in traditional rearing.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "sheep-fattening-rations",
    category: "sheep",
    title: "أفضل علائق لتسمين الأغنام",
    titleEn: "Best Sheep Fattening Rations",
    excerpt:
      "تركيبات عملية مجربة لتسمين الأغنام في مصر بالذرة والصويا والردة وكسب القطن، مع النسب والكميات والتكلفة التقريبية.",
    excerptEn:
      "Proven practical fattening rations for Egyptian sheep using corn, soybean, bran, and cottonseed meal — with ratios, quantities, and approximate cost.",
    readTime: 6,
    publishedAt: "2025-02-12",
    relatedSlugs: ["sheep-nutrition-basics", "reducing-sheep-feed-cost", "sheep-protein-energy-fiber"],
    content: `## ما الذي يميز عليقة التسمين الجيدة؟

عليقة التسمين الجيدة تحقق ثلاثة أهداف: نمو سريع (معدل تحويل غذائي من 4:1 إلى 6:1)، تكلفة منخفضة، وسلامة صحية. لا يوجد عليقة واحدة مثالية لكل المربين، بل تختلف حسب المواد الخام المتوفرة وأسعارها في كل موسم.

## عليقة 1: عليقة الذرة والصويا (الأعلى أداءً)

| المكوّن | النسبة |
|---------|--------|
| ذرة صفراء | 50% |
| كسب صويا 44% | 20% |
| ردة قمح | 18% |
| دريس برسيم | 8% |
| مخلوط أملاح + ملح | 3% |
| حجر كلس + فوسفات | 1% |

**التقييم:** بروتين 15.5%، طاقة TDN 72%، مناسبة لمرحلة النمو (2-4 شهور). تعطي نمواً يومياً 220-280 جم.

## عليقة 2: عليقة اقتصادية بكسب القطن (الأوفر تكلفة)

| المكوّن | النسبة |
|---------|--------|
| ذرة صفراء | 40% |
| كسب قطن مقشور | 25% |
| ردة قمح | 20% |
| تبن قمح | 10% |
| مخلوط أملاح + ملح | 3% |
| مولاس | 2% |

**التقييم:** بروتين 14%، طاقة TDN 68%، أرخص بنسبة 20-25% من عليقة الصويا. نمو يومي 180-220 جم. ملاحظة: لا تتجاوز كسب القطن 30% بسبب السمية من الجوسيبول.

## عليقة 3: عليقة الصيف (تتحمل الحرارة)

| المكوّن | النسبة |
|---------|--------|
| ذرة صفراء | 45% |
| شعير | 15% |
| كسب صويا | 18% |
| ردة قمح | 15% |
| تبن | 4% |
| مخلوط أملاح (بوتاسيوم عالٍ) | 2% |
| بيكربونات صوديوم | 1% |

**التقييم:** إضافة الشعير والبيكربونات تحمي الكرش من الحماض الناتج عن الإجهاد الحراري. نسبة النمو تنخفض 10-15% في الصيف مقارنة بالشتاء.

## حساب كمية العليقة اليومية

لحمل تسمين وزنه 35 كجم، الكمية اليومية = 1.4 كجم مادة جافة (4% من الوزن). توزّع على:
- 900 جم علف مركز
- 400 جم دريس أو تبن
- 100 جم إضافات (أملاح، فيتامينات)

> نصيحة: استخدم حاسبة عليقة واختر "أغنام تسمين"، أدخل أسعار المواد الخام في منطقتك لتحصل على أرخص عليقة متوازنة تلقائياً.

## متى تنتقل بين العلائق؟

- ابدأ بعليقة 1 (الصويا) في الفطام لـ 4 أسابيع لتحفيز النمو.
- انتقل لعليقة 2 (الاقتصادية) من 3-5 شهور.
- استخدم عليقة 3 (الصيف) في يونيو-أغسطس.

## خلاصة

أفضل عليقة تسمين ليست الأغنى دائماً، بل الأكثر توازناً مع السعر المتاح. حدد هدفك (نمو سريع أم تكلفة أقل)، اختر عليقة مناسبة، وعدّلها حسب أسعار المواد الخام في موسمك باستخدام حاسبة عليقة.`,
    contentEn: `## What Makes a Good Fattening Ration?

A good fattening ration achieves three goals: fast growth (feed conversion 4:1 to 6:1), low cost, and health safety. No single ration is ideal for all farmers; it varies by available raw materials and seasonal prices.

## Ration 1: Corn + Soybean (Highest Performance)

| Ingredient | % |
|------------|---|
| Yellow corn | 50% |
| Soybean meal 44% | 20% |
| Wheat bran | 18% |
| Clover hay | 8% |
| Mineral mix + salt | 3% |
| Limestone + phosphate | 1% |

**Evaluation:** Protein 15.5%, TDN 72%, suitable for the growth stage (2-4 months). Daily gain 220-280 g.

## Ration 2: Economic Cottonseed Ration (Most Cost-Effective)

| Ingredient | % |
|------------|---|
| Yellow corn | 40% |
| Decorticated cottonseed meal | 25% |
| Wheat bran | 20% |
| Wheat straw | 10% |
| Mineral mix + salt | 3% |
| Molasses | 2% |

**Evaluation:** Protein 14%, TDN 68%, 20-25% cheaper than the soybean ration. Daily gain 180-220 g. Note: Do not exceed 30% cottonseed meal due to gossypol toxicity.

## Ration 3: Summer Ration (Heat-Tolerant)

| Ingredient | % |
|------------|---|
| Yellow corn | 45% |
| Barley | 15% |
| Soybean meal | 18% |
| Wheat bran | 15% |
| Straw | 4% |
| Mineral mix (high potassium) | 2% |
| Sodium bicarbonate | 1% |

**Evaluation:** Adding barley and bicarb protects the rumen from acidosis caused by heat stress. Growth drops 10-15% in summer vs. winter.

## Calculating Daily Ration Amount

For a 35 kg fattening lamb, daily amount = 1.4 kg dry matter (4% of body weight). Split into:
- 900 g concentrate
- 400 g hay or straw
- 100 g additives (minerals, vitamins)

> Tip: Use the Aleeqa calculator, select "fattening sheep," and enter your local raw material prices to get the cheapest balanced ration automatically.

## When to Switch Rations?

- Start with Ration 1 (soybean) at weaning for 4 weeks to stimulate growth.
- Switch to Ration 2 (economic) from 3-5 months.
- Use Ration 3 (summer) in June-August.

## Conclusion

The best fattening ration is not always the richest, but the most balanced for the price available. Define your goal (fast growth or lower cost), pick a suitable ration, and adjust it according to seasonal raw material prices using the Aleeqa calculator.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "pregnant-ewe-nutrition",
    category: "sheep",
    title: "تغذية النعاج الحوامل",
    titleEn: "Feeding Pregnant Ewes",
    excerpt:
      "احتياجات النعاج الحوامل في مراحل الحمل المختلفة، مع التركيز على الشهر الأخير لضمان ولادة قوية وحملان صحية.",
    excerptEn:
      "Pregnant ewe needs across gestation stages, with special focus on the last month to ensure strong lambing and healthy lambs.",
    readTime: 5,
    publishedAt: "2025-02-15",
    relatedSlugs: ["lactating-ewe-nutrition", "sheep-nutrition-basics", "sheep-minerals-vitamins"],
    content: `## مراحل حمل النعجة

حمل النعجة يستمر حوالي 147-150 يوماً (5 أشهر)، وينقسم لثلاث مراحل لكل منها احتياجات غذائية مختلفة. إهمال التغذية في أي مرحلة قد يؤدي لإجهاض، أو ولادة حملان ضعيفة، أو نقص وزن الحملان عند الولادة.

## المرحلة الأولى: أول 100 يوم (الحمل المبكر)

في هذه المرحلة يكون الجنين صغيراً ولا يستهلك طاقة كبيرة:
- **احتياج طاقة:** نفس احتياج الصيانة (1.2 كجم مادة جافة/يوم).
- **بروتين:** 9-10%.
- **هدف أساسي:** الحفاظ على وزن النعجة دون سمنة.
- **تحذير:** تجنب الأعلاف الفاسدة أو المتعفنة لأنها قد تسبب إجهاض.

## المرحلة الثانية: 100-130 يوم (منتصف الحمل)

- زيادة طفيفة في العليقة المركزة (200-300 جم/يوم).
- توفير برسيم أو دريس بحرية.
- متابعة الوزن: يجب ألا يزيد وزن النعجة بأكثر من 10-15% عن وزنها قبل الحمل.

## المرحلة الثالثة: آخر 3-4 أسابيع (الحمل المتأخر)

هذه أهم فترة لأن 70% من نمو الجنين يحدث فيها:
- **احتياج طاقة:** يرتفع 40-50% فوق احتياج الصيانة.
- **احتياج بروتين:** 11-12%.
- **كمية مركز يومياً:** 600-900 جم/يوم.
- **كالسيوم وفوسفور:** ضروريان لنمو عظام الجنين، أضف 1% حجر كلس و0.5% فوسفات ثنائي الكالسيوم.
- **سيلينيوم وفيتامين E:** حقنة عضلية قبل الولادة بـ 3-4 أسابيع لمنع مرض العضل الأبيض في الحملان.

## مشكلة toxemia الحمل (تسمم الحمل)

تصيب النعاج في آخر 3 أسابيع، خاصة عند توأم أو ثلاث توائم. الأعراض: فقدان شهية، خمول، رائحة أسيتون من الفم. الوقاية:
- لا تجوع النعجة أبداً في آخر شهر.
- وفر طاقة عالية (ذرة) لتجنب تحلل الدهون.
- أضف جليكول البروبيلين (30 جم/يوم) آخر 3 أسابيع.

## جدول تغذية عملي للنعجة الحامل

| المرحلة | مركز (جم/يوم) | خشن (جم/يوم) |
|---------|----------------|----------------|
| 0-100 يوم | 300-400 | 800-1000 |
| 100-130 يوم | 400-600 | 700-900 |
| 130-145 يوم | 700-900 | 500-700 |

## خلاصة

تغذية النعجة الحامل ليست موحدة طوال فترة الحمل، بل يجب رفع الطاقة والبروتين بشكل ملحوظ في الشهر الأخير. اهتمامك بهذه الفترة يضمن ولادة 1-3 حملان قوية وزنها 4-6 كجم، مع نسبة نفوق أقل من 5% بدلاً من 15-20% عند الإهمال.`,
    contentEn: `## Stages of Ewe Pregnancy

A ewe's pregnancy lasts about 147-150 days (5 months) and is divided into three stages with different nutritional needs. Neglecting nutrition at any stage can cause abortion, weak lambs at birth, or low birth weight.

## Stage 1: First 100 Days (Early Gestation)

The fetus is small and does not consume much energy:
- **Energy need:** Same as maintenance (1.2 kg dry matter/day).
- **Protein:** 9-10%.
- **Main goal:** Maintain the ewe's weight without obesity.
- **Warning:** Avoid spoiled or moldy feed, which can cause abortion.

## Stage 2: 100-130 Days (Mid-Gestation)

- Slight increase in concentrate (200-300 g/day).
- Free-choice clover or hay.
- Monitor weight: The ewe should not gain more than 10-15% above her pre-pregnancy weight.

## Stage 3: Last 3-4 Weeks (Late Gestation)

The most critical stage because 70% of fetal growth occurs here:
- **Energy need:** 40-50% above maintenance.
- **Protein:** 11-12%.
- **Daily concentrate:** 600-900 g/day.
- **Calcium and phosphorus:** Essential for fetal bone growth; add 1% limestone and 0.5% dicalcium phosphate.
- **Selenium and vitamin E:** Intramuscular injection 3-4 weeks before lambing to prevent white muscle disease in lambs.

## Pregnancy Toxemia

Affects ewes in the last 3 weeks, especially with twins or triplets. Symptoms: loss of appetite, lethargy, acetone breath. Prevention:
- Never starve the ewe in the last month.
- Provide high energy (corn) to avoid fat breakdown.
- Add propylene glycol (30 g/day) in the last 3 weeks.

## Practical Feeding Table for Pregnant Ewe

| Stage | Concentrate (g/day) | Roughage (g/day) |
|-------|---------------------|-------------------|
| 0-100 days | 300-400 | 800-1000 |
| 100-130 days | 400-600 | 700-900 |
| 130-145 days | 700-900 | 500-700 |

## Conclusion

Ewe feeding during pregnancy is not uniform throughout; energy and protein must rise significantly in the last month. Attention to this stage ensures 1-3 strong lambs weighing 4-6 kg, with mortality under 5% instead of 15-20% when neglected.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "lactating-ewe-nutrition",
    category: "sheep",
    title: "تغذية النعاج المرضعة",
    titleEn: "Feeding Lactating Ewes",
    excerpt:
      "احتياجات النعاج في أول 8 أسابيع بعد الولادة لإنتاج لبن وفير يدعم نمو الحملان، مع تجنب فقدان الوزن المفرط.",
    excerptEn:
      "Ewe needs in the first 8 weeks after lambing to produce abundant milk that supports lamb growth, while avoiding excessive weight loss.",
    readTime: 5,
    publishedAt: "2025-02-18",
    relatedSlugs: ["pregnant-ewe-nutrition", "sheep-nutrition-basics", "lamb-nutrition-by-age"],
    content: `## أهمية فترة الرضاعة

فترة الرضاعة (8-12 أسبوع بعد الولادة) هي الأكثر استهلاكاً للطاقة في حياة النعجة. النعجة التي ترضع حملين أو ثلاثة قد تنتج 2-3 لتر لبن/يوم، ما يتطلب عليقة مركزة بشكل أكبر من مرحلة الحمل نفسها.

## احتياجات النعجة المرضعة

- **مادة جافة:** 1.8-2.5 كجم/يوم (4-5% من الوزن الحي).
- **بروتين خام:** 13-15% (ضروري لإنتاج بروتين اللبن).
- **طاقة (TDN):** 65-70%.
- **مياه:** 8-12 لتر/يوم.
- **كالسيوم:** 0.6-0.8% من العليقة.
- **فوسفور:** 0.3-0.4% من العليقة.

## تقسيم فترة الرضاعة

### الأسبوع 1-3: ذروة إنتاج اللبن

- قدم 800-1200 جم مركز/يوم للنعجة بحمل واحد.
- قدم 1200-1500 جم مركز/يوم للنعجة بتوأم.
- وفر برسيم أخضر أو دريس بحرية (1-1.5 كجم/يوم).
- أضف 1% بيكربونات صوديوم لمنع الحماض.

### الأسبوع 4-8: استمرار إنتاج اللبن

- قلّب المركز تدريجياً (700-900 جم/يوم).
- ابدأ بتقديم علف بادي للحملان (يقلل اعتمادها على اللبن).
- راقب حالة النعجة الجسدية: يجب ألا يهبط وزنها بأكثر من 10%.

### الأسبوع 9+: فطام الحملان

- قلل المركز تدريجياً على مدى 7-10 أيام.
- افصل الحملان نهاراً وأعيد ضمها ليلاً لفترة قصيرة.
- اقلب النعجة لعليقة الصيانة بعد الفطام الكامل.

## أخطاء شائعة في تغذية المرضعة

- **نقص الطاقة:** النعجة تفقد وزنها بسرعة وتتوقف عن إنتاج اللبن.
- **نقص الماء:** يخفض إنتاج اللبن 30-50%.
- **فطام مفاجئ:** يسبب التهاب الضرع. افطم تدريجياً.
- **إهمال الكالسيوم:** يسبب حمى الحليب (نقص كالسيوم الدم) خاصة في النعاج الحلاب.

## عليقة مقترحة للنعجة المرضعة

| المكوّن | النسبة |
|---------|--------|
| ذرة صفراء | 45% |
| كسب صويا 44% | 22% |
| ردة قمح | 18% |
| دريس برسيم | 10% |
| مخلوط أملاح + ملح | 3% |
| حجر كلس + فوسفات | 2% |

هذه العليقة تعطي: بروتين 14.5%، TDN 69%، تكلفة معقولة وتدعم إنتاج 1.5-2.5 لتر لبن/يوم.

## خلاصة

النعجة المرضعة تحتاج ضعف ما تحتاجه في الصيانة. التركيز على الطاقة والبروتين والكالسيوم في أول 8 أسابيع يضمن نمو الحملان بسرعة (250 جم/يوم) وعودة النعجة لوزنها الطبيعي قبل موسم التناسل التالي.`,
    contentEn: `## Importance of the Lactation Period

The lactation period (8-12 weeks after lambing) is the highest energy-demanding period in a ewe's life. A ewe nursing twins or triplets may produce 2-3 liters of milk/day, requiring more concentrate than even pregnancy.

## Lactating Ewe Requirements

- **Dry matter:** 1.8-2.5 kg/day (4-5% of body weight).
- **Crude protein:** 13-15% (essential for milk protein production).
- **Energy (TDN):** 65-70%.
- **Water:** 8-12 liters/day.
- **Calcium:** 0.6-0.8% of ration.
- **Phosphorus:** 0.3-0.4% of ration.

## Lactation Period Breakdown

### Weeks 1-3: Peak Milk Production

- Offer 800-1200 g concentrate/day for a ewe with single lamb.
- Offer 1200-1500 g concentrate/day for a ewe with twins.
- Provide clover or hay free choice (1-1.5 kg/day).
- Add 1% sodium bicarbonate to prevent acidosis.

### Weeks 4-8: Sustained Milk Production

- Gradually reduce concentrate (700-900 g/day).
- Start offering starter feed to lambs (reduces dependence on milk).
- Monitor body condition: weight loss should not exceed 10%.

### Week 9+: Lamb Weaning

- Reduce concentrate gradually over 7-10 days.
- Separate lambs during the day, reunite at night briefly.
- Switch the ewe to maintenance ration after full weaning.

## Common Mistakes in Lactating Ewe Feeding

- **Energy deficiency:** Ewe loses weight rapidly and stops producing milk.
- **Water deficiency:** Drops milk production 30-50%.
- **Sudden weaning:** Causes mastitis. Wean gradually.
- **Calcium neglect:** Causes milk fever (hypocalcemia), especially in dairy ewes.

## Suggested Lactating Ewe Ration

| Ingredient | % |
|------------|---|
| Yellow corn | 45% |
| Soybean meal 44% | 22% |
| Wheat bran | 18% |
| Clover hay | 10% |
| Mineral mix + salt | 3% |
| Limestone + phosphate | 2% |

This ration gives: protein 14.5%, TDN 69%, reasonable cost, supports 1.5-2.5 liters milk/day.

## Conclusion

A lactating ewe needs double what she needs for maintenance. Focus on energy, protein, and calcium in the first 8 weeks to ensure rapid lamb growth (250 g/day) and return the ewe to her normal weight before the next breeding season.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "sheep-seasonal-feeding",
    category: "sheep",
    title: "برنامج تغذية الأغنام في الصيف والشتاء",
    titleEn: "Sheep Feeding Program for Summer and Winter",
    excerpt:
      "دليل موسمي لتغذية الأغنام يواكب وفرة البرسيم شتاءً وندرة الخضراء صيفاً، مع تعديلات الطاقة والمياه والأملاح.",
    excerptEn:
      "A seasonal sheep feeding guide that follows winter clover abundance and summer green forage scarcity, with energy, water, and mineral adjustments.",
    readTime: 6,
    publishedAt: "2025-02-22",
    relatedSlugs: ["seasonal-feed-management", "sheep-nutrition-basics", "sheep-feeding-mistakes"],
    content: `## لماذا تختلف التغذية موسمياً؟

مصر لها موسمان أساسيان للتغذية: موسم البرسيم (نوفمبر-أبريل) وموسم الجفاف (مايو-أكتوبر). كل موسم يتطلب علائق مختلفة، وعدم التكيف مع الموسم يخفض الإنتاجية 15-30% ويرفع التكلفة.

## الشتاء: موسم البرسيم (نوفمبر-أبريل)

البرسيم المصري غني بالبروتين (18-22%) والرطوبة (75-80%)، وهو فرصة ذهبية لتقليل تكلفة التغذية.

### مميزات موسم البرسيم
- بروتين وفير ورخيص.
- يقلل الحاجة لكسب الصويا بنسبة 50-70%.
- يحسن الهضم بفضل الألياف اللينة.

### عليقة شتوية اقتصادية

| المكوّن | النسبة |
|---------|--------|
| برسيم أخضر | 50% (3-5 كجم/رأس) |
| ذرة صفراء | 25% |
| ردة قمح | 15% |
| كسب قطن | 8% |
| مخلوط أملاح | 2% |

> تحذير: البرسيم الرطب جداً يسبب نفاخ. جففه في الشمس ساعة قبل تقديمه، وقدم التبن أولاً.

## الصيف: موسم التحدي (مايو-أغسطس)

في الصيف ترتفع الحرارة لأكثر من 35°م، وتنعدم الأعلاف الخضراء، ويرتفع إجهاد الأغنام الحراري.

### مشاكل الصيف الرئيسية
- انخفاض الشهية 20-30%.
- نقص البوتاسيوم والصوديوم بسبب التعرق.
- خطر الحماض من العليقة المركزة.
- زيادة السموم الفطرية في العلف المخزن.

### عليقة صيفية متوازنة

| المكوّن | النسبة |
|---------|--------|
| ذرة صفراء | 40% |
| شعير | 15% |
| كسب صويا | 18% |
| ردة قمح | 15% |
| تبن قمح | 8% |
| مخلوط أملاح (بوتاسيوم عالٍ) | 2% |
| بيكربونات صوديوم | 1% |
| مولاس | 1% |

### نصائح إدارة الصيف

- قدّم العليقة في الصباح الباكر (5-7 صباحاً) والمساء (6-8 مساءً).
- وفر ظلاً كافياً وتجويد هواء في الحظيرة.
- غيّر مياه الشرب مرتين يومياً وابقها باردة.
- أضف فيتامين C (3 جم/رأس/يوم) لمقاومة الإجهاد الحراري.
- راقب وزن القطيع أسبوعياً؛ انخفاض 5% يستدعي مراجعة العليقة.

## الخريف والربيع: فترات انتقالية

هذه الفترات تحتاج انتقالاً تدريجياً بين العلائق على مدى 7-10 أيام:
- انتقل من البرسيم للتبن في الربيع تدريجياً.
- استعد لبرسيم الخريف بتخزين تبن جيد في سبتمبر.

## خلاصة

النجاح في تغذية الأغنام يأتي من مواكبة الموسم: استغل البرسيم في الشتاء لتقليل التكلفة، وادفع تكلفة الصيف بعلائق مركزة عالية الطاقة مع بيكربونات وأملاح. المربي الذي يخطط موسمياً يوفر 20-30% من التكلفة السنوية ويحافظ على إنتاجية مستقرة.`,
    contentEn: `## Why Seasonal Feeding Matters

Egypt has two main feeding seasons: the clover season (November-April) and the dry season (May-October). Each requires different rations, and failure to adapt lowers productivity 15-30% and raises cost.

## Winter: Clover Season (November-April)

Egyptian clover is rich in protein (18-22%) and moisture (75-80%) — a golden opportunity to cut feeding cost.

### Advantages of Clover Season
- Abundant, cheap protein.
- Reduces need for soybean meal by 50-70%.
- Improves digestion via soft fiber.

### Economic Winter Ration

| Ingredient | % |
|------------|---|
| Fresh clover | 50% (3-5 kg/head) |
| Yellow corn | 25% |
| Wheat bran | 15% |
| Cottonseed meal | 8% |
| Mineral mix | 2% |

> Warning: Very wet clover causes bloat. Sun-dry it for an hour before feeding, and offer straw first.

## Summer: The Challenge Season (May-August)

In summer, temperatures exceed 35°C, green forage disappears, and heat stress rises.

### Main Summer Problems
- 20-30% appetite drop.
- Loss of potassium and sodium through sweating.
- Acidosis risk from high concentrate rations.
- Increased mycotoxins in stored feed.

### Balanced Summer Ration

| Ingredient | % |
|------------|---|
| Yellow corn | 40% |
| Barley | 15% |
| Soybean meal | 18% |
| Wheat bran | 15% |
| Wheat straw | 8% |
| Mineral mix (high potassium) | 2% |
| Sodium bicarbonate | 1% |
| Molasses | 1% |

### Summer Management Tips

- Feed in early morning (5-7 am) and evening (6-8 pm).
- Provide adequate shade and ventilation in the barn.
- Change drinking water twice daily and keep it cool.
- Add vitamin C (3 g/head/day) to combat heat stress.
- Monitor flock weight weekly; a 5% drop requires ration review.

## Autumn and Spring: Transitional Periods

These periods require gradual transition between rations over 7-10 days:
- Transition gradually from clover to straw in spring.
- Prepare for autumn clover by storing good straw in September.

## Conclusion

Success in sheep feeding comes from matching the season: exploit clover in winter to cut cost, and pay summer's cost with high-energy concentrate rations plus bicarb and minerals. A farmer who plans seasonally saves 20-30% of annual cost and maintains stable productivity.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "sheep-feeding-mistakes",
    category: "sheep",
    title: "أكثر الأخطاء شيوعًا في تغذية الأغنام",
    titleEn: "Most Common Sheep Feeding Mistakes",
    excerpt:
      "تعرف على أكثر الأخطاء التي يقع فيها مربو الأغنام في مصر — من إهمال البرسيم إلى سوء استخدام كسب القطن — وكيف تتجنبها.",
    excerptEn:
      "Learn the most common mistakes Egyptian sheep farmers make — from neglecting clover to misusing cottonseed meal — and how to avoid them.",
    readTime: 5,
    publishedAt: "2025-02-25",
    relatedSlugs: ["common-feeding-mistakes", "sheep-nutrition-basics", "reducing-sheep-feed-cost"],
    content: `## أخطاء تكلف المربي أكثر مما يظن

كثير من مربي الأغنام في مصر يقعون في أخطاء متكررة تقلل الربحية بنسبة 20-40% دون أن ينتبهوا. إليك أكثر هذه الأخطاء شيوعاً والحلول العلمية.

## الخطأ 1: الإفراط في كسب القطن

كسب القطن رخيص ومتوفر، لكن الإفراط فيه خطر:
- **الجوسيبول:** مادة سامة تسبب ضعف الخصوبة وتلف الكبد.
- **حد آمن:** لا يتجاوز 25-30% من العليقة، خاصة للنعاج في موسم التناسل.
- **الحل:** استخدم كسب القطن المقشور، وناوب مع كسب الصويا أو عباد الشمس.

## الخطأ 2: إهمال البرسيم في موسمه

بعض المربين يفضلون إطعام العلف المركز فقط لتوفير الوقت، فيخسرون 50-70% من قيمة البرسيم الاقتصادية.
- **الصح:** البرسيم يوفر 30-50% من تكلفة العليقة في موسمه.
- **الحل:** قدّم البرسيم بمعدل 3-5 كجم/رأس/يوم مع تخفيض المركز.

## الخطأ 3: تغذية القطيع كله بالتساوي

تغذية الحملان والنعاج والكباش بنفس العليقة خطأ كبير:
- **الحملان** تحتاج بروتين 16-18%.
- **النعاج المرضعة** تحتاج طاقة عالية وكالسيوم.
- **الكباش** تحتاج طاقة أقل (1 كجم مركز/يوم).
- **الحل:** افصل القطيع لمجموعات وتغذية كل مجموعة باحتياجاتها.

## الخطأ 4: تقديم العليقة في وجبة واحدة

وجبة واحدة كبيرة تسبب:
- اضطراب الكرش والحماض.
- عدم استفادة كاملة من العناصر الغذائية.
- تنافس بين الحيوانات يقلل استهلاك الضعيف.
- **الحل:** وزّع العليقة على 2-3 وجبات بفاصل 6-8 ساعات.

## الخطأ 5: إهمال المياه النظيفة

الأغنام حساسة جداً لنوعية المياه:
- المياه الراكدة أو الدافئة تقلل الاستهلاك 30-50%.
- نقص الماء يخفض النمو 20% في الصيف.
- **الحل:** وفر حوض مياه نظيف، غيّر الماء مرتين يومياً خاصة في الصيف.

## الخطأ 6: التغيير المفاجئ في العليقة

تغيير العليقة من يوم لآخر يسبب:
- نفخة وإسهال.
- انخفاض النمو لمدة 7-14 يوم.
- **الحل:** انتقل تدريجياً على مدى 7-10 أيام (25% جديد يوم 1-3، 50% يوم 4-6، 100% يوم 7+).

## الخطأ 7: إهمال مخلوط الأملاح المعدنية

كثير من المربين يعتمدون على العليقة فقط، لكن:
- العليقة المنزلية تنقصها السيلينيوم والكوبالت واليود.
- نقص المعادن يسبب ضعف الخصوبة ومشاكل الولادة.
- **الحل:** أضف مخلوط أملاح معدنية بنسبة 1-2% من العليقة.

## الخطأ 8: تخزين العلف بشكل خاطئ

- العلف المخزن في الرطوبة يتعفن وينتج سموم فطرية.
- الكسب الزائد عن الحاجة يفسد بعد 2-3 شهور.
- **الحل:** خزّن العلف في مكان جاف جيد التهوية، واشترِ كميات تكفي 1-2 شهر فقط.

## خلاصة

تجنب هذه الأخطاء الثمانية قد يضيف 20-30% لربحك السنوي دون أي استثمار إضافي. راجع ممارساتك الحالية، حدد الأخطاء التي تقع فيها، وابدأ بتصحيحها واحدة تلو الأخرى.`,
    contentEn: `## Mistakes That Cost More Than You Think

Many Egyptian sheep farmers repeat mistakes that reduce profitability 20-40% without noticing. Here are the most common and their scientific solutions.

## Mistake 1: Overusing Cottonseed Meal

Cottonseed meal is cheap and available, but excess is dangerous:
- **Gossypol:** A toxic substance causing fertility problems and liver damage.
- **Safe limit:** Do not exceed 25-30% of ration, especially for ewes in breeding season.
- **Solution:** Use decorticated cottonseed meal and rotate with soybean or sunflower meal.

## Mistake 2: Neglecting Clover in Season

Some farmers prefer feeding concentrate only to save time, losing 50-70% of clover's economic value.
- **Truth:** Clover saves 30-50% of ration cost in season.
- **Solution:** Offer clover at 3-5 kg/head/day with reduced concentrate.

## Mistake 3: Feeding the Whole Flock Equally

Feeding lambs, ewes, and rams the same ration is a big mistake:
- **Lambs** need 16-18% protein.
- **Lactating ewes** need high energy and calcium.
- **Rams** need less energy (1 kg concentrate/day).
- **Solution:** Separate the flock into groups and feed each by its needs.

## Mistake 4: Feeding in One Meal

One large meal causes:
- Rumen upset and acidosis.
- Incomplete nutrient absorption.
- Competition among animals reducing the weaker ones' intake.
- **Solution:** Distribute the ration over 2-3 meals, 6-8 hours apart.

## Mistake 5: Neglecting Clean Water

Sheep are very sensitive to water quality:
- Stagnant or warm water reduces intake 30-50%.
- Water deficiency lowers growth 20% in summer.
- **Solution:** Provide a clean water trough, change water twice daily especially in summer.

## Mistake 6: Sudden Ration Change

Changing the ration overnight causes:
- Bloat and diarrhea.
- Growth drop for 7-14 days.
- **Solution:** Transition gradually over 7-10 days (25% new on days 1-3, 50% on days 4-6, 100% on day 7+).

## Mistake 7: Neglecting Mineral Mix

Many farmers rely on ration only, but:
- Home-mixed rations lack selenium, cobalt, and iodine.
- Mineral deficiency causes fertility problems and lambing issues.
- **Solution:** Add mineral mix at 1-2% of the ration.

## Mistake 8: Wrong Feed Storage

- Feed stored in humidity molds and produces mycotoxins.
- Excess meal spoils after 2-3 months.
- **Solution:** Store feed in a dry, well-ventilated place, and buy only 1-2 month quantities.

## Conclusion

Avoiding these eight mistakes can add 20-30% to your annual profit without any additional investment. Review your current practices, identify your mistakes, and start fixing them one by one.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "reducing-sheep-feed-cost",
    category: "sheep",
    title: "كيفية تقليل تكلفة علائق الأغنام",
    titleEn: "How to Reduce Sheep Feed Cost",
    excerpt:
      "استراتيجيات عملية لتقليل تكلفة علائق الأغنام بنسبة 20-30% دون التضحية بالإنتاجية: البدائل، الشراء بالجملة، والاستفادة من المخلفات.",
    excerptEn:
      "Practical strategies to cut sheep ration cost by 20-30% without sacrificing productivity: alternatives, bulk buying, and using by-products.",
    readTime: 5,
    publishedAt: "2025-03-01",
    relatedSlugs: ["saving-money-on-feed", "sheep-fattening-rations", "sheep-feeding-mistakes"],
    content: `## لماذا التكلفة أهم من السعر؟

ليس سعر العليقة هو ما يحدد الربح، بل تكلفة كجم النمو. عليقة بـ 8 جنيه/كجم تعطي نمواً سريعاً (250 جم/يوم) قد تكون أرخص فعلياً من عليقة بـ 6 جنيه/كجم تعطي نمواً بطيئاً (120 جم/يوم). احسب دائماً تكلفة كجم النمو وليس سعر الطن.

## استراتيجية 1: استغل البرسيم بذكاء

البرسيم المصري في موسمه (نوفمبر-أبريل) يقدم بروتين بأقل من نصف سعر كسب الصويا:
- استبدل 50-70% من كسب الصويا بالبرسيم الأخضر.
- اصنع دريساً من البرسيم الفائض لاستخدامه في الصيف.
- تخزين الدريس: 1 فدان برسيم ينتج 2-3 طن دريس يكفي 50 رأس لـ 3 أشهر.

## استراتيجية 2: استخدم البدائل الأرخص

### بديل الذرة: مخلفات المطاحن والكسارات
- كسر الأرز: 60-70% من سعر الذرة، طاقة 65% TDN.
- ذرة بيضاء (في موسمها): تنافسية في صعيد مصر.
- كسر البسكويت والخبز: مصدر طاقة ممتاز عند توفره.

### بديل كسب الصويا: كسب عباد الشمس
- أرخص بنسبة 30-40% من الصويا.
- بروتين 28-32% (أقل من الصويا 44%).
- استخدمه حتى 15-20% من العليقة.

### بديل الدريس: تبن القمح المعالج باليوريا
- ارفع قيمة تبن القمح بإضافة 1-2% يوريا ذائبة.
- يضاعف قيمته البروتينية من 3% إلى 8-10%.
- احذر: لا تتجاوز 1% يوريا من العليقة الكلية.

## استراتيجية 3: الشراء بالجملة والتخزين

- اشترِ الذرة في أغسطس-سبتمبر بعد الحصاد مباشرة (أرخص بنسبة 15-25%).
- اشترِ الكسب من المصنع مباشرة، تجنّب الوسطاء.
- خزّن في أكياس محكمة على منصات خشبية.
- لا تتجاوز كمية الشراء 2-3 شهور استهلاك لتفادي التعرض.

## استراتيجية 4: تقليل الفقد

- **فقد العلف:** 5-15% يُهدر على الأرض. استخدم معالف عميقة بكسّارات داخلية.
- **فقد بسبب الحشرات والقوارض:** 2-5%. خزّن في مكان محكم.
- **فقد من التنافس:** 5-10% في القطيع الكبير. افصل الحملان الضعيفة.

## استراتيجية 5: استخدام حاسبة عليقة

حاسبة عليقة تستخدم خوارزمية البرمجة الخطية لتجد أرخص تركيبة تحقق احتياجات الأغنام من البروتين والطاقة والألياف. أدخل أسعار المواد الخام المتاحة في منطقتك، واختر "أغنام تسمين" أو "نعاج مرضعة"، فتحصل على النسب المثلى بالكجم والتكلفة اليومية والشهرية تلقائياً.

> مثال: في فبراير 2025، حاسبة عليقة قدمت تركيبة بـ 7.2 جنيه/كجم بدلاً من 9.5 جنيه/كجم للتركيبة التقليدية، بنفس القيمة الغذائية.

## خلاصة

تقليل تكلفة العليقة لا يعني استخدام مواد رديئة، بل الاستفادة من البدائل المتاحة وتخزين المواد في موسمها واستخدام أدوات حسابية علمية. المربي الذي يطبق هذه الاستراتيجيات يخفض التكلفة 20-30% ويحافظ على معدل النمو.`,
    contentEn: `## Why Cost Matters More Than Price

It's not the ration price that determines profit, but the cost per kg of gain. A ration at EGP 8/kg giving fast growth (250 g/day) may actually be cheaper than one at EGP 6/kg giving slow growth (120 g/day). Always calculate cost per kg of gain, not the ton price.

## Strategy 1: Use Clover Wisely

Egyptian clover in season (November-April) provides protein at less than half the cost of soybean meal:
- Replace 50-70% of soybean meal with fresh clover.
- Make hay from surplus clover for summer use.
- Hay storage: 1 feddan of clover produces 2-3 tons of hay, enough for 50 head for 3 months.

## Strategy 2: Use Cheaper Alternatives

### Corn Alternative: Milling By-Products
- Broken rice: 60-70% of corn price, energy 65% TDN.
- White sorghum (in season): competitive in Upper Egypt.
- Broken biscuits and bread: excellent energy source when available.

### Soybean Alternative: Sunflower Meal
- 30-40% cheaper than soybean.
- Protein 28-32% (lower than soybean 44%).
- Use up to 15-20% of ration.

### Hay Alternative: Urea-Treated Wheat Straw
- Increase wheat straw value by adding 1-2% dissolved urea.
- Doubles protein content from 3% to 8-10%.
- Caution: Do not exceed 1% urea of total ration.

## Strategy 3: Bulk Buying and Storage

- Buy corn in August-September right after harvest (15-25% cheaper).
- Buy meal directly from the factory, avoiding middlemen.
- Store in sealed bags on wooden pallets.
- Don't exceed 2-3 months of consumption per purchase to avoid spoilage.

## Strategy 4: Reduce Losses

- **Feed loss:** 5-15% wasted on the ground. Use deep feeders with inner breakers.
- **Insect/rodent loss:** 2-5%. Store in sealed areas.
- **Competition loss:** 5-10% in large flocks. Separate weak lambs.

## Strategy 5: Use the Aleeqa Calculator

The Aleeqa calculator uses linear programming to find the cheapest formulation meeting sheep needs for protein, energy, and fiber. Enter prices of available raw materials in your area, select "fattening sheep" or "lactating ewe," and get optimal ratios in kg with daily and monthly cost automatically.

> Example: In February 2025, the Aleeqa calculator produced a formulation at EGP 7.2/kg instead of EGP 9.5/kg for the traditional mix, with the same nutritional value.

## Conclusion

Reducing ration cost does not mean using inferior materials, but leveraging available alternatives, storing materials in season, and using scientific calculation tools. A farmer who applies these strategies cuts cost 20-30% while maintaining growth rate.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "sheep-protein-energy-fiber",
    category: "sheep",
    title: "الاحتياجات من البروتين والطاقة والألياف",
    titleEn: "Protein, Energy, and Fiber Requirements",
    excerpt:
      "فهم تفصيلي لاحتياجات الأغنام من البروتين والطاقة والألياف، وكيف توازن بينها لتحقيق أفضل نمو وإنتاج بأقل تكلفة.",
    excerptEn:
      "A detailed understanding of sheep protein, energy, and fiber needs, and how to balance them for the best growth and production at the lowest cost.",
    readTime: 5,
    publishedAt: "2025-03-04",
    relatedSlugs: ["understanding-protein-energy", "sheep-nutrition-basics", "sheep-minerals-vitamins"],
    content: `## الثلاثي الذهبي في تغذية الأغنام

البروتين والطاقة والألياف هي الأعمدة الثلاثة لأي عليقة أغنام. أي خلل بينها ينعكس مباشرة على النمو والصحة والتناسل. لنفهم كل منها وحدوده العملية.

## البروتين الخام (CP)

### دوره في الجسم
- بناء العضلات والأنسجة.
- إنتاج اللبن للنعاج المرضعة.
- تكوين الصوف والكرش.

### الاحتياجات حسب المرحلة
| المرحلة | بروتين خام % |
|---------|---------------|
| حملان رضيعة (بادي) | 18-20% |
| حملان نمو (2-4 شهور) | 16-18% |
| حملان تشطيب (4-6 شهور) | 13-14% |
| نعاج صيانة | 9-10% |
| نعاج حمل متأخر | 11-12% |
| نعاج مرضعة | 13-15% |
| كباش | 10-11% |

### مصادر البروتين
- **بروتين نباتي:** كسب الصويا (44%)، كسب القطن (32-40%)، كسب عباد الشمس (28-32%).
- **بروتين غير بروتيني (NPN):** يوريا (46% نيتروجين)، تُستخدم بحذر بنسبة لا تتجاوز 1% من العليقة.
- **البرسيم:** بروتين 18-22% في المادة الجافة.

> تنبيه: الأغنام تحول اليوريا لبروتين في الكرش، لكن الإفراط يسبب تسمم الأمونيا والموت.

## الطاقة (TDN)

### دورها في الجسم
- تشغيل عمليات الأيض.
- نمو العضلات والدهون.
- إنتاج اللبن.

### الاحتياجات حسب المرحلة
| المرحلة | TDN % |
|---------|--------|
| حملان نمو | 68-70% |
| حملان تشطيب | 70-72% |
| نعاج صيانة | 55-60% |
| نعاج مرضعة | 65-70% |

### مصادر الطاقة
- **نشويات:** ذرة صفراء (TDN 88%)، شعير (TDN 78%)، كسر الأرز (TDN 75%).
- **دهون:** زيت الصويا، دهون محمية (طاقة عالية 2.25 ضعف النشويات).
- **مولاس:** TDN 70% ويحسن طعم العليقة.

### العلاقة بين البروتين والطاقة
بروتين بلا طاقة = هدر. طاقة بلا بروتين = سمنة بلا نمو. النسبة المثالية 1 جم بروتين لكل 7-10 جم طاقة. حاسبة عليقة تحسب هذه النسبة تلقائياً.

## الألياف (CF)

### دورها في الجسم
- تحافظ على صحة الكرش ومنع الحماض.
- تحفز عملية الاجترار وإنتاج اللعاب.
- تنتج حمض الخليك (طاقة للدهون في اللبن).

### الاحتياجات
- **الحد الأدنى:** 12% من العليقة.
- **الحد الأعلى:** 20-25% (أعلى يخفض النمو).
- **الطول المثالي للألياف:** 2-5 سم (قصيرة جداً لا تحفز الاجترار، طويلة جداً تقلل الاستهلاك).

### مصادر الألياف
- تبن القمح (CF 35-40%).
- دريس البرسيم (CF 25-30%).
- قش الأرز (CF 35%).
- قصب السكر (CF 30%).

## أمثلة عملية على التوازن

### عليقة متوازنة لحملان النمو (35 كجم)
| المكوّن | % | بروتين | TDN | ألياف |
|---------|---|---------|------|--------|
| ذرة | 50% | 4.5 | 44 | 1 |
| كسب صويا | 20% | 9 | 15 | 1.4 |
| ردة قمح | 18% | 2.7 | 13 | 3.6 |
| دريس | 8% | 1.1 | 4.5 | 2.2 |
| إضافات | 4% | 0 | 0 | 0 |
| **المجموع** | 100% | **17.3%** | **76.5%** | **8.2%** |

> ملاحظة: الألياف الكلية هنا 8.2% من المركز، لكن عند إضافة الدريس المقدم منفصلاً ترتفع لـ 14-16% من العليقة الكلية.

## خلاصة

البروتين والطاقة والألياف ثلاثية مترابطة. البروتين يحدد كمية النمو، الطاقة تحدد سرعته، والألياف تحافظ على صحة الكرش. استخدم حاسبة عليقة لضبط هذه النسب تلقائياً حسب نوع وعمر ووزن أغنامك.`,
    contentEn: `## The Golden Trio in Sheep Nutrition

Protein, energy, and fiber are the three pillars of any sheep ration. Any imbalance among them directly affects growth, health, and reproduction. Let's understand each and its practical limits.

## Crude Protein (CP)

### Its Role in the Body
- Building muscles and tissues.
- Milk production for lactating ewes.
- Wool and rumen tissue formation.

### Requirements by Stage
| Stage | Crude Protein % |
|-------|------------------|
| Suckling lamb (starter) | 18-20% |
| Growing lamb (2-4 months) | 16-18% |
| Finishing lamb (4-6 months) | 13-14% |
| Maintenance ewes | 9-10% |
| Late pregnant ewes | 11-12% |
| Lactating ewes | 13-15% |
| Rams | 10-11% |

### Protein Sources
- **Plant protein:** Soybean meal (44%), cottonseed meal (32-40%), sunflower meal (28-32%).
- **Non-protein nitrogen (NPN):** Urea (46% nitrogen), used cautiously at no more than 1% of ration.
- **Clover:** 18-22% protein in dry matter.

> Note: Sheep convert urea to protein in the rumen, but excess causes ammonia toxicity and death.

## Energy (TDN)

### Its Role in the Body
- Powering metabolism.
- Muscle and fat growth.
- Milk production.

### Requirements by Stage
| Stage | TDN % |
|-------|-------|
| Growing lambs | 68-70% |
| Finishing lambs | 70-72% |
| Maintenance ewes | 55-60% |
| Lactating ewes | 65-70% |

### Energy Sources
- **Starches:** Yellow corn (TDN 88%), barley (TDN 78%), broken rice (TDN 75%).
- **Fats:** Soybean oil, protected fats (high energy, 2.25x starches).
- **Molasses:** TDN 70% and improves ration palatability.

### Protein-Energy Relationship
Protein without energy = waste. Energy without protein = fat without growth. Ideal ratio is 1 g protein per 7-10 g energy. The Aleeqa calculator computes this automatically.

## Crude Fiber (CF)

### Its Role in the Body
- Maintains rumen health and prevents acidosis.
- Stimulates rumination and saliva production.
- Produces acetate (energy for milk fat).

### Requirements
- **Minimum:** 12% of ration.
- **Maximum:** 20-25% (higher lowers growth).
- **Ideal fiber length:** 2-5 cm (too short doesn't stimulate rumination, too long reduces intake).

### Fiber Sources
- Wheat straw (CF 35-40%).
- Clover hay (CF 25-30%).
- Rice straw (CF 35%).
- Sugarcane (CF 30%).

## Practical Balance Examples

### Balanced Ration for Growing Lamb (35 kg)
| Ingredient | % | Protein | TDN | Fiber |
|------------|---|---------|------|--------|
| Corn | 50% | 4.5 | 44 | 1 |
| Soybean meal | 20% | 9 | 15 | 1.4 |
| Wheat bran | 18% | 2.7 | 13 | 3.6 |
| Hay | 8% | 1.1 | 4.5 | 2.2 |
| Additives | 4% | 0 | 0 | 0 |
| **Total** | 100% | **17.3%** | **76.5%** | **8.2%** |

> Note: Total fiber here is 8.2% of concentrate, but when hay offered separately is added, total ration fiber rises to 14-16%.

## Conclusion

Protein, energy, and fiber are an interconnected trio. Protein determines growth amount, energy determines growth speed, and fiber maintains rumen health. Use the Aleeqa calculator to automatically balance these ratios according to your sheep type, age, and weight.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "sheep-minerals-vitamins",
    category: "sheep",
    title: "المعادن والفيتامينات الضرورية للأغنام",
    titleEn: "Essential Minerals and Vitamins for Sheep",
    excerpt:
      "دليل شامل لاحتياجات الأغنام من المعادن الكبرى والصغرى والفيتامينات، مع أعراض النقص والمصادر والإضافات اللازمة.",
    excerptEn:
      "A comprehensive guide to sheep needs for macro and micro minerals and vitamins, with deficiency symptoms, sources, and required supplements.",
    readTime: 5,
    publishedAt: "2025-03-07",
    relatedSlugs: ["sheep-nutrition-basics", "sheep-protein-energy-fiber", "pregnant-ewe-nutrition"],
    content: `## لماذا المعادن والفيتامينات مهمة؟

حتى لو قدّمت بروتيناً وطاقة ممتازين، فإن نقص معدن واحد أو فيتامين واحد قد يخفض الإنتاج 15-30% ويسبب أمراضاً صامتة. المعادن والفيتامينات هي "المفاتيح" التي تشغّل عمليات الأيض.

## المعادن الكبرى (Macrominerals)

### الكالسيوم (Ca)
- **الدور:** بناء العظام، انقباض العضلات، إنتاج اللبن.
- **الاحتياج:** 0.4-0.6% من العليقة (0.8% للنعاج المرضعة).
- **المصادر:** حجر الكلس (38% Ca)، فوسفات ثنائي الكالسيوم (22% Ca).
- **أعراض النقص:** كساح في الحملان، حمى الحليب في النعاج.

### الفوسفور (P)
- **الدور:** الطاقة، نمو العظام، الخصوبة.
- **الاحتياج:** 0.3-0.4% من العليقة.
- **المصادر:** فوسفات ثنائي الكالسيوم (18% P)، نخالة القمح (1.1% P).
- **أعراض النقص:** ضعف شهية، تأخر شبق، ضعف عظام.

> ملاحظة: نسبة Ca:P يجب أن تكون 2:1 للأغنام عموماً، 1:1 للنعاج المرضعة.

### الصوديوم والكلور (ملح الطعام)
- **الاحتياج:** 0.5% من العليقة، 1% في الصيف.
- **المصدر:** ملح الطعام، يمكن إضافة 1% للعليقة المركزة.

### البوتاسيوم (K)
- **الاحتياج:** 0.6-0.8%، يرتفع في الصيف.
- **المصادر:** مخلوط أملاح غني بالبوتاسيوم، المولاس.

### المغنيسيوم (Mg)
- **الاحتياج:** 0.2%، ضروري جداً للنعاج المرضعة.
- **أعراض النقص:** مرض العشب (تيتانيا) قاتل خلال ساعات.

### الكبريت (S)
- **الاحتياج:** 0.2% من العليقة.
- **ضروري لـ:** تكوين الصوف والأحماض الأمينية.

## المعادن الصغرى (Microminerals)

### السيلينيوم (Se)
- **الاحتياج:** 0.1-0.3 ملجم/كجم علف.
- **أهمية:** مع فيتامين E يمنع مرض العضل الأبيض في الحملان.
- **طريقة الإعطاء:** حقنة عضلية للنعاج قبل الولادة بـ 3-4 أسابيع.

### النحاس (Cu)
- **تحذير:** الأغنام شديدة الحساسية للنحاس، السمية قاتلة.
- **الاحتياج:** 5-10 ملجم/كجم فقط.
- **ملاحظة:** لا تستخدم مخلوط أملاح دواجن أو أبقار للأغنام (يحتوي على نحاس عالٍ).

### الزنك (Zn)
- **الاحتياج:** 20-40 ملجم/كجم.
- **أعراض النقص:** تقرحات جلدية، ضعف خصوبة، تشوه قرون.

### الكوبالت (Co)
- **الاحتياج:** 0.1-0.2 ملجم/كجم.
- **ضروري لـ:** تكوين فيتامين B12 في الكرش.

### اليود (I)
- **الاحتياج:** 0.5 ملجم/كجم.
- **أعراض النقص:** تضخم الغدة الدرقية في الحملان حديثة الولادة.

## الفيتامينات الأساسية

### فيتامين A
- **مهم لـ:** الرؤية، الجلد، الأغشية المخاطية، الخصوبة.
- **المصادر:** البرسيم الأخضر، الدريس الجيد، إضافة اصطناعية.
- **الاحتياج:** 2000-5000 وحدة دولية/كجم علف.

### فيتامين D
- **مهم لـ:** امتصاص الكالسيوم والفوسفور.
- **المصدر:** التعرض للشمس، إضافة اصطناعية.

### فيتامين E
- **مهم لـ:** المناعة، مع السيلينيوم يحمي العضلات.
- **الاحتياج:** 15-30 ملجم/كجم علف.

### فيتامينات B
- الأغنام تنتجها في الكرش، لا حاجة لإضافتها للكبار.
- الحملان الصغيرة قد تحتاج إضافة B12 حتى ينضج الكرش.

## كيف تضيف المعادن عملياً؟

- استخدم مخلوط أملاح معدنية مخصص للأغنام (وليس للدواجن أو الأبقار).
- أضف بنسبة 1-2% من العليقة المركزة.
- وفر "مخلوط أملاح حر" في معلف منفصل للحيوانات التي تحتاج أكثر.
- للنعاج الحوامل والمرضعة: حقن بالسيلينيوم + فيتامين E قبل الولادة.

## خلاصة

المعادن والفيتامينات تكلفة ضئيلة (1-3% من تكلفة العليقة) لكنها تحدد 20-30% من النجاح. لا تستخدم مخاليط غير مخصصة للأغنام، واعتمد على مخلوط أملاح موثوق، وأضف حقن السيلينيوم + E للنعاج قبل الولادة لضمان حملان صحية.`,
    contentEn: `## Why Minerals and Vitamins Matter

Even with excellent protein and energy, deficiency in a single mineral or vitamin can lower production 15-30% and cause silent diseases. Minerals and vitamins are the "keys" that turn metabolism on.

## Macrominerals

### Calcium (Ca)
- **Role:** Bone building, muscle contraction, milk production.
- **Requirement:** 0.4-0.6% of ration (0.8% for lactating ewes).
- **Sources:** Limestone (38% Ca), dicalcium phosphate (22% Ca).
- **Deficiency symptoms:** Rickets in lambs, milk fever in ewes.

### Phosphorus (P)
- **Role:** Energy, bone growth, fertility.
- **Requirement:** 0.3-0.4% of ration.
- **Sources:** Dicalcium phosphate (18% P), wheat bran (1.1% P).
- **Deficiency symptoms:** Weak appetite, delayed estrus, weak bones.

> Note: Ca:P ratio should be 2:1 for sheep generally, 1:1 for lactating ewes.

### Sodium and Chloride (Salt)
- **Requirement:** 0.5% of ration, 1% in summer.
- **Source:** Table salt, can be added at 1% to concentrate.

### Potassium (K)
- **Requirement:** 0.6-0.8%, rises in summer.
- **Sources:** Potassium-rich mineral mix, molasses.

### Magnesium (Mg)
- **Requirement:** 0.2%, critical for lactating ewes.
- **Deficiency:** Grass tetany, fatal within hours.

### Sulfur (S)
- **Requirement:** 0.2% of ration.
- **Needed for:** Wool formation and amino acids.

## Microminerals

### Selenium (Se)
- **Requirement:** 0.1-0.3 mg/kg feed.
- **Importance:** With vitamin E, prevents white muscle disease in lambs.
- **Method:** Intramuscular injection for ewes 3-4 weeks before lambing.

### Copper (Cu)
- **Warning:** Sheep are highly sensitive to copper; toxicity is fatal.
- **Requirement:** 5-10 mg/kg only.
- **Note:** Do not use poultry or cattle mineral mixes for sheep (high copper).

### Zinc (Zn)
- **Requirement:** 20-40 mg/kg.
- **Deficiency:** Skin lesions, fertility issues, horn deformities.

### Cobalt (Co)
- **Requirement:** 0.1-0.2 mg/kg.
- **Needed for:** Vitamin B12 formation in rumen.

### Iodine (I)
- **Requirement:** 0.5 mg/kg.
- **Deficiency:** Goiter in newborn lambs.

## Essential Vitamins

### Vitamin A
- **Important for:** Vision, skin, mucous membranes, fertility.
- **Sources:** Fresh clover, good hay, synthetic supplement.
- **Requirement:** 2000-5000 IU/kg feed.

### Vitamin D
- **Important for:** Calcium and phosphorus absorption.
- **Source:** Sun exposure, synthetic supplement.

### Vitamin E
- **Important for:** Immunity, with selenium protects muscles.
- **Requirement:** 15-30 mg/kg feed.

### B Vitamins
- Sheep produce them in the rumen; no need to add for adults.
- Young lambs may need B12 supplementation until the rumen matures.

## How to Add Minerals Practically?

- Use a mineral mix specifically for sheep (not poultry or cattle).
- Add at 1-2% of the concentrate ration.
- Provide "free-choice mineral mix" in a separate feeder for animals needing more.
- For pregnant and lactating ewes: Inject selenium + vitamin E before lambing.

## Conclusion

Minerals and vitamins are a tiny cost (1-3% of ration cost) but determine 20-30% of success. Do not use non-sheep mixes, rely on a trusted mineral mix, and add selenium + E injections for ewes before lambing to ensure healthy lambs.`,
  },

  /* --------------------------------------------------------------- */
  /* ---------- Ingredients category starts here -------------------- */
  /* --------------------------------------------------------------- */
  {
    slug: "corn-yellow-nutrition",
    category: "ingredients",
    title: "الذرة الصفراء: القيمة الغذائية والاستخدامات",
    titleEn: "Yellow Corn: Nutritional Value and Uses",
    excerpt:
      "الذرة الصفراء هي ملك مصادر الطاقة في تركيب العلائق — تعرّف على قيمتها الغذائية وحدود استخدامها والبدائل الاقتصادية المتاحة.",
    excerptEn:
      "Yellow corn is the king of energy sources in ration formulation — learn its nutritional value, usage limits, and available economic alternatives.",
    readTime: 5,
    publishedAt: "2025-03-10",
    relatedSlugs: ["barley-in-rations", "understanding-protein-energy", "ddgs-in-feed"],
    content: `## الذرة الصفراء: مصدر الطاقة رقم 1

الذرة الصفراء هي المكوّن الأساسي في 90% من علائق الحيوان في مصر. تحتل هذه المكانة لسببين: قيمتها الطاقية العالية (TDN 88%) وسعرها المنافس مقارنة بالحبوب الأخرى. لكنها ليست مثالية، وفهم نقاط قوتها وضعفها أساسي لتركيب عليقة متوازنة.

## القيمة الغذائية للذرة الصفراء (لكل 1 كجم)

| العنصر | القيمة |
|--------|--------|
| البروتين الخام | 8.5-9.5% |
| الطاقة (TDN) | 88% |
| الألياف | 2-3% |
| الدهون | 3.5-4% |
| الكالسيوم | 0.02% |
| الفوسفور | 0.28% |
| الكاروتين (فيتامين A) | عالٍ |

## مزايا الذرة الصفراء

- **طاقة عالية:** أعلى من الشعير بنسبة 10-12%.
- **هضم ممتاز:** النشا سريع الهضم في الكرش.
- **مستساغة عالية:** الحيوانات تقبل عليها بسهولة.
- **وفرة وتوفر:** متوفرة طوال السنة في السوق المصري.
- **محتوى كاروتين:** يحول لفيتامين A، مفيد للأغنام والأبقار.

## عيوب الذرة الصفراء

- **بروتين منخفض:** 8.5-9.5% فقط، تحتاج لمصدر بروتين تكميلي.
- **نقص كالسيوم:** 0.02% فقط، تحتاج لإضافة حجر كلس.
- **خطر الحماض:** استخدامها بأكثر من 60% من العليقة يسبب حماض الكرش.
- **تقلب السعر:** تتأثر بالأسعار العالمية والمواسم.

## حدود الاستخدام العملية

| نوع الحيوان | الحد الأقصى للذرة في المركز |
|--------------|-----------------------------|
| أبقار حلوب | 50-55% |
| أبقار تسمين | 60-65% |
| جاموس | 50-55% |
| أغنام تسمين | 55-60% |
| دواجن لاحم | 60-65% |
| دواجن بياض | 60-65% |

## البدائل الاقتصادية للذرة

عند ارتفاع سعر الذرة، يمكنك استخدام:

### 1. كسر الأرز
- **القيمة:** TDN 70-75%، بروتين 8-9%.
- **السعر:** 60-70% من سعر الذرة.
- **حد الاستخدام:** 30% من العليقة (يحتوي على ألياف عالية).

### 2. الشعير
- **القيمة:** TDN 78%، بروتين 11%.
- **الميزة:** أقل خطراً للكرش من الذرة.
- **السعر:** مماثل أو أرخص قليلاً.

### 3. السورجم (الذرة الرفيعة)
- **القيمة:** TDN 80%، بروتين 9-10%.
- **الميزة:** يتحمل الجفاف، ينمو في الأراضي الفقيرة.
- **حد الاستخدام:** 40% من العليقة.

### 4. مخلفات البسكويت والخبز
- **القيمة:** TDN 80-85%، بروتين 10-12%.
- **الميزة:** رخيصة جداً عند توفرها من المصانع.
- **حد الاستخدام:** 20-30% (ترتفع الدهون).

## نصائح عملية عند استخدام الذرة

- **اطحنها:** الذرة المجروشة أفضل هضماً من الكاملة.
- **اختبر الرطوبة:** أعلى من 14% تسبب تعفن.
- **افحص السموم الفطرية:** الأفلاتوكسين خطر على الدواجن خاصة.
- **خزن على منصات:** لا تضع الأكياس على الأرض مباشرة.

## خلاصة

الذرة الصفراء ملك العلائق الطاقية، لكنها لا تكفي وحدها. وازنها مع مصدر بروتين (كسب صويا)، مصدر كالسيوم (حجر كلس)، وألياف (دريس أو تبن). عند ارتفاع سعرها، استخدم بدائل مثل كسر الأرز أو الشعير بنسب مدروسة. استخدم حاسبة عليقة لتختار أرخص مصدر طاقة متاح في منطقتك تلقائياً.`,
    contentEn: `## Yellow Corn: The #1 Energy Source

Yellow corn is the base ingredient in 90% of Egyptian animal rations. It holds this position for two reasons: its high energy value (TDN 88%) and its competitive price compared to other grains. But it is not perfect, and understanding its strengths and weaknesses is essential for formulating a balanced ration.

## Nutritional Value of Yellow Corn (per 1 kg)

| Nutrient | Value |
|----------|-------|
| Crude Protein | 8.5-9.5% |
| Energy (TDN) | 88% |
| Fiber | 2-3% |
| Fat | 3.5-4% |
| Calcium | 0.02% |
| Phosphorus | 0.28% |
| Carotene (Vitamin A) | High |

## Advantages of Yellow Corn

- **High energy:** 10-12% higher than barley.
- **Excellent digestion:** Starch is rapidly digested in the rumen.
- **High palatability:** Animals accept it readily.
- **Availability:** Available year-round in the Egyptian market.
- **Carotene content:** Converted to vitamin A, beneficial for sheep and cattle.

## Disadvantages of Yellow Corn

- **Low protein:** Only 8.5-9.5%, requires complementary protein source.
- **Calcium deficiency:** Only 0.02%, needs limestone addition.
- **Acidosis risk:** Use above 60% of ration causes rumen acidosis.
- **Price volatility:** Affected by global prices and seasons.

## Practical Usage Limits

| Animal Type | Max Corn in Concentrate |
|-------------|-------------------------|
| Dairy cows | 50-55% |
| Beef cattle | 60-65% |
| Buffalo | 50-55% |
| Fattening sheep | 55-60% |
| Broilers | 60-65% |
| Layers | 60-65% |

## Economic Alternatives to Corn

When corn prices rise, you can use:

### 1. Broken Rice
- **Value:** TDN 70-75%, protein 8-9%.
- **Price:** 60-70% of corn price.
- **Usage limit:** 30% of ration (high fiber content).

### 2. Barley
- **Value:** TDN 78%, protein 11%.
- **Advantage:** Less rumen risk than corn.
- **Price:** Similar or slightly cheaper.

### 3. Sorghum
- **Value:** TDN 80%, protein 9-10%.
- **Advantage:** Drought-tolerant, grows in poor soils.
- **Usage limit:** 40% of ration.

### 4. Biscuit and Bread By-Products
- **Value:** TDN 80-85%, protein 10-12%.
- **Advantage:** Very cheap when available from factories.
- **Usage limit:** 20-30% (high fat).

## Practical Tips When Using Corn

- **Grind it:** Crushed corn is better digested than whole.
- **Test moisture:** Above 14% causes mold.
- **Check mycotoxins:** Aflatoxin is especially dangerous for poultry.
- **Store on pallets:** Do not place bags directly on the floor.

## Conclusion

Yellow corn is the king of energy rations, but it is not sufficient alone. Balance it with a protein source (soybean meal), calcium source (limestone), and fiber (hay or straw). When prices rise, use alternatives like broken rice or barley in measured proportions. Use the Aleeqa calculator to automatically select the cheapest available energy source in your area.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "barley-in-rations",
    category: "ingredients",
    title: "الشعير واستخدامه في علائق الحيوانات",
    titleEn: "Barley and Its Use in Animal Rations",
    excerpt:
      "الشعير بديل ممتاز للذرة في بعض الحالات — تعرف على قيمته الغذائية وحدود استخدامه ومتى يكون أفضل اختيار للمربي المصري.",
    excerptEn:
      "Barley is an excellent alternative to corn in some cases — learn its nutritional value, usage limits, and when it is the best choice for Egyptian farmers.",
    readTime: 5,
    publishedAt: "2025-03-13",
    relatedSlugs: ["corn-yellow-nutrition", "understanding-protein-energy", "wheat-bran-types-benefits"],
    content: `## الشعير: البديل الآمن للذرة

الشعير من أقدم الحبوب المستخدمة في تغذية الحيوان، وله خصائص تجعله مفضلاً في حالات معينة على الذرة الصفراء. في مصر يزرع الشعير في الساحل الشمالي وبعض مناطق الصعيد، لكنه يستورد أيضاً بكميات كبيرة.

## القيمة الغذائية للشعير (لكل 1 كجم)

| العنصر | القيمة |
|--------|--------|
| البروتين الخام | 11-12% |
| الطاقة (TDN) | 78% |
| الألياف | 5-6% (أعلى من الذرة) |
| الدهون | 1.5-2% |
| الكالسيوم | 0.05% |
| الفوسفور | 0.35% |

## مقارنة الشعير بالذرة

| المعيار | الذرة الصفراء | الشعير |
|---------|----------------|--------|
| الطاقة | 88% TDN | 78% TDN |
| البروتين | 8.5% | 11% |
| الألياف | 2.5% | 5.5% |
| السعر (نسبي) | 100% | 85-95% |
| خطر الحماض | عالٍ | منخفض |

## متى يكون الشعير الخيار الأفضل؟

### 1. في الصيف للحيوانات الحلوب
الشعير ينتج حرارة كرش أقل من الذرة، ولذلك يقلل الإجهاد الحراري. استبدل 30-50% من الذرة بالشعير في علائق الصيف.

### 2. للأغنام والأبقار في مرحلة التشطيب
محتوى الألياف في الشعير يحمي الكرش من الحماض عند التغذية المركزة.

### 3. للدواجن في فترات الإجهاد
يستخدم في علائق الدواجن في الصيف بنسبة 15-25% من العليقة.

### 4. عند ارتفاع سعر الذرة
إذا تجاوز سعر الذرة 95% من سعر الشعير، فالشعير خيار اقتصادي أفضل.

## حدود الاستخدام

| نوع الحيوان | الحد الأقصى للشعير في المركز |
|--------------|------------------------------|
| أبقار حلوب | 40% |
| أبقار تسمين | 50% |
| أغنام | 50% |
| دواجن لاحم | 25% (أعلى يخفض النمو) |
| دواجن بياض | 30% |
| خيول | 60% (الشعير أفضل للخيول من الذرة) |

## معالجة الشعير قبل الاستخدام

الشعير يحتوي على قشور صلبة وعوامل مضادة للتغذية، ويجب معالجته:

### 1. الطحن
مهم جداً للدواجن، يكسر القشور ويحسن الهضم. اطحن ناعماً للدجاج وخشناً للأغنام والأبقار.

### 2. التخمير أو النقع
للأغنام والأبقار: انقع الشعير 12-24 ساعة لزيادة الهضم وتقليل العوامل المضادة.

### 3. التبخير بالبخار
يستخدم في مصانع الأعلاف لتكسير البيتاجلوكان (مسبب اللزوجة في الدواجن).

## تحذيرات هامة

- **بيتاجلوكان:** مادة لزجة في الشعير تخفض هضم الدواجن، أضف إنزيم بيتاجلوكانيز للعليقة (500 جم/طن).
- **سعرات أقل:** الشعير يحتاج كميات أعلى 10-12% من الذرة لنفس الطاقة.
- **سمنة أقل:** الشعير ينتج دهوناً بيضاء صلبة في الذبيحة (ميزة للأغنام، عيب للأبقار الحلوب).

## عليقة عملية باستخدام الشعير (للأغنام)

| المكوّن | النسبة |
|---------|--------|
| شعير مطحون | 40% |
| ذرة صفراء | 15% |
| كسب صويا | 18% |
| ردة قمح | 18% |
| دريس | 6% |
| مخلوط أملاح + ملح | 3% |

## خلاصة

الشعير بديل ممتاز للذرة في حالات: الصيف، التشطيب، ارتفاع أسعار الذرة. قيمته البروتينية أعلى من الذرة لكن طاقته أقل. عالجه بالطحن وأضف إنزيم بيتاجلوكانيز للدواجن. حاسبة عليقة تساعدك في الاختيار بين الذرة والشعير بناءً على أسعارهما في منطقتك لتحديد أرخص عليقة متوازنة.`,
    contentEn: `## Barley: The Safe Alternative to Corn

Barley is one of the oldest grains used in animal feeding, with properties that make it preferable to yellow corn in certain cases. In Egypt, barley is grown on the North Coast and in some Upper Egypt regions, but is also imported in large quantities.

## Nutritional Value of Barley (per 1 kg)

| Nutrient | Value |
|----------|-------|
| Crude Protein | 11-12% |
| Energy (TDN) | 78% |
| Fiber | 5-6% (higher than corn) |
| Fat | 1.5-2% |
| Calcium | 0.05% |
| Phosphorus | 0.35% |

## Barley vs. Corn Comparison

| Criterion | Yellow Corn | Barley |
|-----------|-------------|--------|
| Energy | 88% TDN | 78% TDN |
| Protein | 8.5% | 11% |
| Fiber | 2.5% | 5.5% |
| Price (relative) | 100% | 85-95% |
| Acidosis risk | High | Low |

## When Is Barley the Best Choice?

### 1. In Summer for Dairy Animals
Barley produces less rumen heat than corn, reducing heat stress. Replace 30-50% of corn with barley in summer rations.

### 2. For Sheep and Cattle in Finishing Stage
Barley fiber content protects the rumen from acidosis during high-concentrate feeding.

### 3. For Poultry During Stress Periods
Use in poultry rations in summer at 15-25% of the ration.

### 4. When Corn Prices Rise
If corn price exceeds 95% of barley price, barley is the better economic choice.

## Usage Limits

| Animal Type | Max Barley in Concentrate |
|-------------|---------------------------|
| Dairy cows | 40% |
| Beef cattle | 50% |
| Sheep | 50% |
| Broilers | 25% (higher lowers growth) |
| Layers | 30% |
| Horses | 60% (barley is better for horses than corn) |

## Barley Processing Before Use

Barley has hard husks and anti-nutritional factors that must be processed:

### 1. Grinding
Essential for poultry, breaks husks and improves digestion. Grind finely for chickens and coarsely for sheep and cattle.

### 2. Soaking or Fermentation
For sheep and cattle: Soak barley for 12-24 hours to increase digestion and reduce anti-nutritional factors.

### 3. Steam Treatment
Used in feed factories to break down beta-glucans (causes viscosity in poultry).

## Important Warnings

- **Beta-glucan:** A viscous substance in barley that lowers poultry digestion; add beta-glucanase enzyme to the ration (500 g/ton).
- **Lower calories:** Barley needs 10-12% higher amounts than corn for the same energy.
- **Less fat:** Barley produces white solid fat in carcasses (advantage for sheep, disadvantage for dairy cows).

## Practical Barley Ration (for Sheep)

| Ingredient | % |
|------------|---|
| Ground barley | 40% |
| Yellow corn | 15% |
| Soybean meal | 18% |
| Wheat bran | 18% |
| Hay | 6% |
| Mineral mix + salt | 3% |

## Conclusion

Barley is an excellent alternative to corn in cases: summer, finishing, high corn prices. Its protein value is higher than corn but its energy is lower. Process it by grinding and add beta-glucanase for poultry. The Aleeqa calculator helps you choose between corn and barley based on your local prices to determine the cheapest balanced ration.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "soybean-meal-guide",
    category: "ingredients",
    title: "كسب فول الصويا: المميزات والعيوب",
    titleEn: "Soybean Meal: Advantages and Disadvantages",
    excerpt:
      "كسب الصويا هو الملك المتوّج لمصادر البروتين في علائق الحيوان — تعرّف على قيمته الغذائية وأنواعه وحدود استخدامه وطرق معالجته.",
    excerptEn:
      "Soybean meal is the crowned king of protein sources in animal rations — learn its nutritional value, types, usage limits, and processing methods.",
    readTime: 6,
    publishedAt: "2025-03-16",
    relatedSlugs: ["sunflower-meal-guide", "understanding-protein-energy", "corn-yellow-nutrition"],
    content: `## كسب الصويا: المعيار الذهبي للبروتين

كسب فول الصويا هو مصدر البروتين الأكثر استخداماً في العالم، وفي مصر يعد المرجع الذي تقاس عليه بقية مصادر البروتين. مع ذلك، لا يعرف كثير من المربين الفروق بين أنواعه وطرق معالجته، مما يؤدي لخسائر اقتصادية وصحية.

## القيمة الغذائية لكسب الصويا

### كسب الصويا 44% (غير مقشور)
| العنصر | القيمة |
|--------|--------|
| البروتين الخام | 44% |
| الطاقة (TDN) | 75% |
| الألياف | 7% |
| الدهون | 1% |
| الكالسيوم | 0.3% |
| الفوسفور | 0.65% |

### كسب الصويا 46-48% (مقشور)
| العنصر | القيمة |
|--------|--------|
| البروتين الخام | 46-48% |
| الطاقة (TDN) | 82% |
| الألياف | 3-4% |
| الدهون | 1.5% |

## مميزات كسب الصويا

### 1. نمط أحماض أمينية متوازن
كسب الصويا غني باللايسين (2.9%) والميثيونين (0.65%) والتربتوفان، وهي الأحماض المحددة في علائق الدواجن والأغنام. هذا يقلل الحاجة لإضافات أحماض أمينية صناعية.

### 2. هضم عالٍ
هضم بروتين الصويا يصل لـ 90-95%، مقارنة بـ 70-80% لكسب القطن أو عباد الشمس.

### 3. خالٍ من السموم
على عكس كسب القطن (جوسيبول) أو كسب عباد الشمس (كلوروجينيك أسيد)، كسب الصويا المعامل آمن لكل الحيوانات.

### 4. مستساغة عالية
الحيوانات تقبله بسهولة وتحسن شهيتها للعليقة الكاملة.

## عيوب كسب الصويا

### 1. السعر المرتفع
كسب الصويا أغلى من كسب القطن بنسبة 30-50% ومن كسب عباد الشمس بنسبة 40-60%.

### 2. عوامل مضادة للتغذية (في الصويا الخام)
الصويا الخام تحتوي على:
- **مثبطات التربسين:** تمنع هضم البروتين.
- **ليكتينات:** تضر ببطانة الأمعاء.
- **يورياز:** يسبب تسمم أمونيا.
لذلك يجب استخدامه معاملاً حرارياً (محمص أو مكبوس).

### 3. حساسية العجول الصغيرة
البروتينات النباتية في الصويا قد تسبب حساسية معوية للعجول قبل عمر 3 أسابيع.

## كيف تتأكد من جودة الكسب؟

### اختبار اليورياز
- **الطريقة:** اختبار بسيط بالماء الساخن. إذا تحول لون المحلول للأحمر بسرعة، فالكسب غير معامل جيداً.
- **القياس المثالي:** نشاط اليورياز 0.05-0.2 (pH rise).

### الفحص البصري
- لون بني فاتح إلى ذهبي: معاملة جيدة.
- لون أخضر مصفر: معاملة ناقصة (خطر).
- لون بني داكن جداً: معاملة زائدة (هدر بروتين).

## حدود الاستخدام

| نوع الحيوان | الحد الأقصى لكسب الصويا |
|--------------|--------------------------|
| أبقار حلوب | 25-30% |
| أبقار تسمين | 25% |
| أغنام | 25% |
| دواجن لاحم | 35% |
| دواجن بياض | 25% |
| عجول صغيرة | 20% (بعد عمر 3 أسابيع) |

## استراتيجيات تقليل الاعتماد على كسب الصويا

### 1. تنويع مصادر البروتين
- 50% صويا + 30% كسب قطن مقشور + 20% كسب عباد شمس.
- يوفر 15-25% من التكلفة دون فقدان جودة.

### 2. إضافة أحماض أمينية صناعية
- ميثيونين صناعي (10 جم/طن علف دواجن) يقلل الحاجة للصويا.
- لايسين صناعي (10 جم/طن) يحسن نمو الحملان.

### 3. استخدام البدائل البروتينية
- كسب الفول السوداني: بروتين 45% لكن أخطر من الصويا (أفلاتوكسين).
- بذور القطن الكاملة: بروتين 23%، رخيصة للأبقار.

## خلاصة

كسب الصويا مصدر بروتين لا غنى عنه في العلائق عالية الإنتاجية، لكنه مكلف. المربي الذكي يتنوّع بين مصادر البروتين ويضيف أحماض أمينية صناعية لخفض التكلفة دون التضحية بالأداء. استخدم حاسبة عليقة لتحديد المزيج الأمثل بين كسب الصويا والبدائل بناءً على الأسعار الحالية في منطقتك.`,
    contentEn: `## Soybean Meal: The Gold Standard for Protein

Soybean meal is the most widely used protein source in the world, and in Egypt it is the reference against which other protein sources are measured. However, many farmers do not know the differences between its types and processing methods, leading to economic and health losses.

## Nutritional Value of Soybean Meal

### Soybean Meal 44% (Non-Dehulled)
| Nutrient | Value |
|----------|-------|
| Crude Protein | 44% |
| Energy (TDN) | 75% |
| Fiber | 7% |
| Fat | 1% |
| Calcium | 0.3% |
| Phosphorus | 0.65% |

### Soybean Meal 46-48% (Dehulled)
| Nutrient | Value |
|----------|-------|
| Crude Protein | 46-48% |
| Energy (TDN) | 82% |
| Fiber | 3-4% |
| Fat | 1.5% |

## Advantages of Soybean Meal

### 1. Balanced Amino Acid Profile
Soybean meal is rich in lysine (2.9%), methionine (0.65%), and tryptophan — the limiting amino acids in poultry and sheep rations. This reduces the need for synthetic amino acid supplements.

### 2. High Digestibility
Soybean protein digestibility reaches 90-95%, compared to 70-80% for cottonseed or sunflower meal.

### 3. Toxin-Free
Unlike cottonseed meal (gossypol) or sunflower meal (chlorogenic acid), properly processed soybean meal is safe for all animals.

### 4. High Palatability
Animals accept it readily and it improves appetite for the complete ration.

## Disadvantages of Soybean Meal

### 1. High Price
Soybean meal is 30-50% more expensive than cottonseed meal and 40-60% more than sunflower meal.

### 2. Anti-Nutritional Factors (in Raw Soybeans)
Raw soybeans contain:
- **Trypsin inhibitors:** Prevent protein digestion.
- **Lectins:** Damage intestinal lining.
- **Urease:** Causes ammonia toxicity.
Therefore, it must be heat-treated (roasted or extruded).

### 3. Sensitivity in Young Calves
Plant proteins in soybeans may cause intestinal sensitivity in calves before 3 weeks of age.

## How to Verify Meal Quality?

### Urease Test
- **Method:** Simple hot water test. If the solution turns red quickly, the meal is poorly processed.
- **Ideal measure:** Urease activity 0.05-0.2 (pH rise).

### Visual Inspection
- Light brown to golden color: Good processing.
- Yellowish-green color: Insufficient processing (risk).
- Very dark brown: Excessive processing (protein waste).

## Usage Limits

| Animal Type | Max Soybean Meal |
|-------------|------------------|
| Dairy cows | 25-30% |
| Beef cattle | 25% |
| Sheep | 25% |
| Broilers | 35% |
| Layers | 25% |
| Young calves | 20% (after 3 weeks of age) |

## Strategies to Reduce Soybean Meal Dependence

### 1. Diversify Protein Sources
- 50% soybean + 30% decorticated cottonseed + 20% sunflower meal.
- Saves 15-25% of cost without losing quality.

### 2. Add Synthetic Amino Acids
- Synthetic methionine (10 g/ton poultry feed) reduces soybean need.
- Synthetic lysine (10 g/ton) improves lamb growth.

### 3. Use Alternative Protein Sources
- Peanut meal: 45% protein but riskier than soybean (aflatoxin).
- Whole cottonseed: 23% protein, cheap for cattle.

## Conclusion

Soybean meal is an indispensable protein source in high-production rations, but it is expensive. The smart farmer diversifies protein sources and adds synthetic amino acids to cut cost without sacrificing performance. Use the Aleeqa calculator to determine the optimal mix between soybean meal and alternatives based on current local prices.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "sunflower-meal-guide",
    category: "ingredients",
    title: "كسب عباد الشمس ومتى يستخدم",
    titleEn: "Sunflower Meal and When to Use It",
    excerpt:
      "كسب عباد الشمس بديل اقتصادي لكسب الصويا — تعرّف على قيمته الغذائية وأنواعه وحدود استخدامه ومتى يكون الخيار الأمثل.",
    excerptEn:
      "Sunflower meal is an economic alternative to soybean meal — learn its nutritional value, types, usage limits, and when it is the optimal choice.",
    readTime: 5,
    publishedAt: "2025-03-19",
    relatedSlugs: ["soybean-meal-guide", "understanding-protein-energy", "reducing-sheep-feed-cost"],
    content: `## كسب عباد الشمس: بديل واعد

كسب عباد الشمس ينتج بعد استخلاص زيت عباد الشمس، ويأتي في المرتبة الثانية بعد كسب الصويا من حيث القيمة الغذائية. في مصر يزرع عباد الشمس في محافظات الوادي الجديد واسيوط، لكن الإنتاج المحلي محدود والكثير يُستورد.

## أنواع كسب عباد الشمس

### 1. كسب مقشور (Decorticated)
- **البروتين:** 36-42%.
- **الألياف:** 8-12%.
- **الأفضل:** للدواجن والحيوانات أحادية المعدة.

### 2. كسب غير مقشور (Non-Decorticated)
- **البروتين:** 28-32%.
- **الألياف:** 18-22%.
- **الأفضل:** للأغنام والأبقار (تتحمل الألياف العالية).

### 3. كسب مستخلص بالمذيب (Solvent Extracted)
- **الدهون:** 1-2%.
- **البروتين:** أعلى قليلاً (40-44%).
- **الأكثر شيوعاً في الأسواق.**

## القيمة الغذائية (لكوب عباد شمس مقشور)

| العنصر | القيمة |
|--------|--------|
| البروتين الخام | 40% |
| الطاقة (TDN) | 65% |
| الألياف | 12% |
| الدهون | 2% |
| الكالسيوم | 0.3% |
| الفوسفور | 1.0% |
| الميثيونين | 0.7% (أعلى من الصويا) |

## مميزات كسب عباد الشمس

### 1. سعر اقتصادي
أرخص من كسب الصويا بنسبة 35-50%، مما يجعله خياراً جاذباً للمربين الباحثين عن خفض التكلفة.

### 2. غني بالميثيونين
يحتوي على الميثيونين بنسبة 0.7%، أعلى من الصويا (0.65%). الميثيونين مهم لتكوين الريش في الدواجن وإنتاج الصوف في الأغنام.

### 3. خالٍ من السموم
على عكس كسب القطن (جوسيبول) أو كسب الفول السوداني (أفلاتوكسين)، كسب عباد الشمس خالٍ من السموم الطبيعية.

### 4. يحسن صحة الكرش
محتوى الألياف في الكسب غير المقشور يحفز نمو بكتيريا السليلوز في الكرش.

## عيوب كسب عباد الشمس

### 1. محتوى ألياف عالٍ
يجعل استخدامه محدوداً للدواجن (لا يتجاوز 15% من العليقة).

### 2. نقص اللايسين
لايسين منخفض (1.2%) مقارنة بالصويا (2.9%). يجب إضافة لايسين صناعي عند استخدامه للدواجن.

### 3. طعم مر قليلاً
قد يخفض الشهية في البداية، لكن الحيوانات تتأقلم خلال 5-7 أيام.

### 4. أكسدة الدهون
الدهون المتبقية في الكسب تتأكسد بسرعة، لذا يجب تخزينه في مكان جاف بارد لمدة لا تتجاوز 2-3 شهور.

## حدود الاستخدام

| نوع الحيوان | الحد الأقصى لكسب عباد الشمس |
|--------------|------------------------------|
| أبقار حلوب | 25% |
| أبقار تسمين | 30% |
| أغنام | 25% |
| دواجن لاحم | 10-15% (مقشور فقط) |
| دواجن بياض | 15-20% |
| خيول | 20% |

## وصفة عملية: استبدال جزء من كسب الصويا

### عليقة أغنام تسمين اقتصادية

| المكوّن | النسبة |
|---------|--------|
| ذرة صفراء | 50% |
| كسب صويا 44% | 10% |
| كسب عباد شمس مقشور | 15% |
| ردة قمح | 16% |
| دريس | 6% |
| مخلوط أملاح + ملح | 3% |

هذه العليقة توفر 15-20% من التكلفة مقارنة بعليقة الصويا الكاملة، مع بروتين كافٍ (14.5%) لنمو 200-250 جم/يوم.

## متى يكون كسب عباد الشمس الخيار الأفضل؟

- **في الأغنام والأبقار:** بديل ممتاز عند ارتفاع سعر الصويا.
- **في الدواجن البياضة:** يرفع من إنتاج البيض ويحسن قشرة البيضة (بسبب الميثيونين).
- **في الدواجن اللاحم:** استخدمه بحذر (لا يتجاوز 15%) مع إضافة لايسين صناعي.

## خلاصة

كسب عباد الشمس بديل اقتصادي وآمن لكسب الصويا، خاصة في علائق الأغنام والأبقار والدواجن البياضة. عيوبه الرئيسية (الألياف العالية ونقص اللايسين) يمكن تجاوزها باختيار النوع المناسب وإضافة الأحماض الأمينية الصناعية. استخدم حاسبة عليقة لتحديد النسبة المثلى من كسب عباد الشمس في عليقتك بناءً على سعره وسعر البدائل.`,
    contentEn: `## Sunflower Meal: A Promising Alternative

Sunflower meal is produced after extracting sunflower oil and ranks second after soybean meal in nutritional value. In Egypt, sunflower is grown in New Valley and Assiut governorates, but local production is limited and much is imported.

## Types of Sunflower Meal

### 1. Decorticated Meal
- **Protein:** 36-42%.
- **Fiber:** 8-12%.
- **Best for:** Poultry and monogastric animals.

### 2. Non-Decorticated Meal
- **Protein:** 28-32%.
- **Fiber:** 18-22%.
- **Best for:** Sheep and cattle (tolerate high fiber).

### 3. Solvent Extracted Meal
- **Fat:** 1-2%.
- **Protein:** Slightly higher (40-44%).
- **Most common in markets.**

## Nutritional Value (Decorticated Sunflower Meal)

| Nutrient | Value |
|----------|-------|
| Crude Protein | 40% |
| Energy (TDN) | 65% |
| Fiber | 12% |
| Fat | 2% |
| Calcium | 0.3% |
| Phosphorus | 1.0% |
| Methionine | 0.7% (higher than soybean) |

## Advantages of Sunflower Meal

### 1. Economic Price
35-50% cheaper than soybean meal, making it attractive for cost-conscious farmers.

### 2. Rich in Methionine
Contains methionine at 0.7%, higher than soybean (0.65%). Methionine is important for feather formation in poultry and wool production in sheep.

### 3. Toxin-Free
Unlike cottonseed meal (gossypol) or peanut meal (aflatoxin), sunflower meal is free of natural toxins.

### 4. Improves Rumen Health
The fiber content in non-decorticated meal stimulates cellulolytic bacteria growth in the rumen.

## Disadvantages of Sunflower Meal

### 1. High Fiber Content
Makes its use limited in poultry (no more than 15% of ration).

### 2. Lysine Deficiency
Lysine is low (1.2%) compared to soybean (2.9%). Synthetic lysine must be added when used for poultry.

### 3. Slightly Bitter Taste
May reduce appetite initially, but animals adapt within 5-7 days.

### 4. Fat Oxidation
Residual fats in the meal oxidize rapidly, so it should be stored in a dry, cool place for no more than 2-3 months.

## Usage Limits

| Animal Type | Max Sunflower Meal |
|-------------|---------------------|
| Dairy cows | 25% |
| Beef cattle | 30% |
| Sheep | 25% |
| Broilers | 10-15% (decorticated only) |
| Layers | 15-20% |
| Horses | 20% |

## Practical Recipe: Partial Soybean Meal Replacement

### Economic Fattening Sheep Ration

| Ingredient | % |
|------------|---|
| Yellow corn | 50% |
| Soybean meal 44% | 10% |
| Decorticated sunflower meal | 15% |
| Wheat bran | 16% |
| Hay | 6% |
| Mineral mix + salt | 3% |

This ration saves 15-20% of cost compared to full soybean ration, with sufficient protein (14.5%) for 200-250 g/day growth.

## When Is Sunflower Meal the Best Choice?

- **For sheep and cattle:** Excellent alternative when soybean price is high.
- **For laying hens:** Boosts egg production and improves eggshell (due to methionine).
- **For broilers:** Use cautiously (no more than 15%) with synthetic lysine addition.

## Conclusion

Sunflower meal is an economic and safe alternative to soybean meal, especially in sheep, cattle, and laying poultry rations. Its main drawbacks (high fiber and lysine deficiency) can be overcome by choosing the right type and adding synthetic amino acids. Use the Aleeqa calculator to determine the optimal sunflower meal ratio in your ration based on its price and alternatives.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "wheat-bran-types-benefits",
    category: "ingredients",
    title: "الردة وأنواعها وفوائدها",
    titleEn: "Wheat Bran: Types and Benefits",
    excerpt:
      "الردة من أهم مكونات العلائق في مصر — تعرف على أنواعها (خشنة، ناعمة، نواشف) وقيمتها الغذائية وحدود استخدامها وفوائدها العملية.",
    excerptEn:
      "Wheat bran is one of the most important ration components in Egypt — learn its types (coarse, fine, shorts), nutritional value, usage limits, and practical benefits.",
    readTime: 5,
    publishedAt: "2025-03-22",
    relatedSlugs: ["corn-yellow-nutrition", "barley-in-rations", "reducing-sheep-feed-cost"],
    content: `## الردة: العمود الفقري للعلائق المصرية

ردة القمح (Wheat Bran) هي من أهم وأكثر المواد الخام استخداماً في علائق الحيوان في مصر، لسببين: وفرة إنتاجها من مطاحن القمح المحلية، وسعرها المنخفض مقارنة بالذرة والكسب. لكن كثيراً من المربين لا يدركون الفروق بين أنواع الردة وتأثيرها على جودة العليقة.

## أنواع الردة في المطاحن المصرية

### 1. الردة الخشنة (Coarse Bran)
- **الوصف:** قشور القمح الكبيرة.
- **الألياف:** 12-14%.
- **البروتين:** 14-15%.
- **الطاقة (TDN):** 65%.
- **الأفضل لـ:** الأغنام والأبقار (تحفز الاجترار).

### 2. الردة الناعمة (Fine Bran)
- **الوصف:** قشور ناعمة مع بعض الدقيق.
- **الألياف:** 9-11%.
- **البروتين:** 15-16%.
- **الطاقة (TDN):** 70%.
- **الأفضل لـ:** الدواجن والحيوانات أحادية المعدة.

### 3. النواشف (Wheat Shorts)
- **الوصف:** خليط من الدقيق والردة الناعمة.
- **الألياف:** 5-7%.
- **البروتين:** 16-18%.
- **الطاقة (TDN):** 75%.
- **الأفضل لـ:** الدواجن والخنازير (عند توفرها).

### 4. الردة المخلطة (Mill Run)
- **الوصف:** خليط من الردة الخشنة والناعمة والنواشف.
- **البروتين:** 15-16%.
- **الألياف:** 9-12%.
- **الأكثر شيوعاً في السوق المصري.**

## القيمة الغذائية للردة المتوسطة (لكل 1 كجم)

| العنصر | القيمة |
|--------|--------|
| البروتين الخام | 15.5% |
| الطاقة (TDN) | 70% |
| الألياف | 10% |
| الدهون | 4% |
| الكالسيوم | 0.1% |
| الفوسفور | 1.1% (مرتفع) |

## فوائد الردة في العليقة

### 1. مصدر فوسفور طبيعي
تحتوي الردة على 1.1% فوسفور، أعلى من معظم الحبوب. هذا يقلل الحاجة لإضافة فوسفات ثنائي الكالسيوم (DCP) ويوفر تكلفة.

### 2. محسّن للهضم
الألياف اللينة في الردة تحفز حركة الأمعاء وتمنع الإمساك، خاصة في الأبقار الحلوب والأغنام.

### 3. رافع للطاقة المركزة
الردة ترفع طاقة العليقة دون خطر الحماض، لأنها لا تحتوي على نسبة عالية من النشا سريع التخمر.

### 4. مادة ربط
تساعد في تماسك العليقة المضغوطة (Pellets) وتقلل الفقد في المعالف.

### 5. مصدر فيتامينات B
غنية بالثيامين والنياسين والريبوفلافين، ضرورية للأعصاب والطاقة.

## عيوب الردة

### 1. محتوى طاقة أقل من الذرة
TDN 70% مقابل 88% للذرة. استخدامها بأكثر من 30% يخفض طاقة العليقة.

### 2. محتوى فيتات عالٍ
حمض الفيتيك في الردة يربط الكالسيوم والزنك والحديد ويقلل امتصاصها. أضف إنزيم فيتاز (500 جم/طن) للدواجن.

### 3. تقلب الجودة
الردة منتج ثانوي للمطاحن، وجودتها تختلف حسب القمح المستخدم ونوع الطحن.

### 4. خطر العفن
نسبة الدهون (4%) تجعلها عرضة للأكسدة والتعفن في الصيف.

## حدود الاستخدام

| نوع الحيوان | الحد الأقصى للردة |
|--------------|--------------------|
| أبقار حلوب | 25-30% |
| أبقار تسمين | 25% |
| جاموس | 25-30% |
| أغنام | 20-25% |
| دواجن لاحم | 10-15% |
| دواجن بياض | 15-20% |
| خيول | 30% |

## وصفة عملية: استخدام الردة في عليقة أغنام

| المكوّن | النسبة |
|---------|--------|
| ذرة صفراء | 45% |
| كسب صويا 44% | 18% |
| ردة قمح | 20% |
| دريس | 12% |
| مخلوط أملاح + ملح | 3% |
| حجر كلس + فوسفات | 2% |

## خلاصة

الردة مادة خام ممتازة واقتصادية في العلائق المصرية، تجمع بين البروتين والفوسفور والألياف اللينة. أعلى استخدام لها في الأبقار والأغنام، وأقل في الدواجن. تأكد من جودة الردة (خالية من العفن) وخزنها في مكان جاف. استخدم حاسبة عليقة لتحديد النسبة المثلى للردة في عليقتك بناءً على أسعار المواد الخام المتاحة.`,
    contentEn: `## Wheat Bran: The Backbone of Egyptian Rations

Wheat bran is one of the most important and widely used raw materials in Egyptian animal rations, for two reasons: abundant local production from wheat mills, and its low price compared to corn and meal. However, many farmers do not realize the differences between bran types and their effect on ration quality.

## Types of Bran in Egyptian Mills

### 1. Coarse Bran
- **Description:** Large wheat hulls.
- **Fiber:** 12-14%.
- **Protein:** 14-15%.
- **Energy (TDN):** 65%.
- **Best for:** Sheep and cattle (stimulates rumination).

### 2. Fine Bran
- **Description:** Fine hulls with some flour.
- **Fiber:** 9-11%.
- **Protein:** 15-16%.
- **Energy (TDN):** 70%.
- **Best for:** Poultry and monogastric animals.

### 3. Wheat Shorts
- **Description:** Mixture of flour and fine bran.
- **Fiber:** 5-7%.
- **Protein:** 16-18%.
- **Energy (TDN):** 75%.
- **Best for:** Poultry and pigs (when available).

### 4. Mill Run
- **Description:** Mixture of coarse bran, fine bran, and shorts.
- **Protein:** 15-16%.
- **Fiber:** 9-12%.
- **Most common in the Egyptian market.**

## Nutritional Value of Medium Bran (per 1 kg)

| Nutrient | Value |
|----------|-------|
| Crude Protein | 15.5% |
| Energy (TDN) | 70% |
| Fiber | 10% |
| Fat | 4% |
| Calcium | 0.1% |
| Phosphorus | 1.1% (high) |

## Benefits of Bran in the Ration

### 1. Natural Phosphorus Source
Bran contains 1.1% phosphorus, higher than most grains. This reduces the need for dicalcium phosphate (DCP) addition and saves cost.

### 2. Digestion Improver
Soft bran fibers stimulate intestinal motility and prevent constipation, especially in dairy cows and sheep.

### 3. Concentrate Energy Booster
Bran raises ration energy without acidosis risk, as it does not contain high levels of rapidly fermentable starch.

### 4. Binding Agent
Helps hold pelleted ration together and reduces feeder waste.

### 5. Source of B Vitamins
Rich in thiamine, niacin, and riboflavin, essential for nerves and energy.

## Disadvantages of Bran

### 1. Lower Energy Than Corn
TDN 70% vs. 88% for corn. Use above 30% lowers ration energy.

### 2. High Phytate Content
Phytic acid in bran binds calcium, zinc, and iron, reducing absorption. Add phytase enzyme (500 g/ton) for poultry.

### 3. Quality Variability
Bran is a mill by-product, and quality varies by wheat used and milling type.

### 4. Mold Risk
Fat content (4%) makes it susceptible to oxidation and mold in summer.

## Usage Limits

| Animal Type | Max Bran |
|-------------|----------|
| Dairy cows | 25-30% |
| Beef cattle | 25% |
| Buffalo | 25-30% |
| Sheep | 20-25% |
| Broilers | 10-15% |
| Layers | 15-20% |
| Horses | 30% |

## Practical Recipe: Using Bran in Sheep Ration

| Ingredient | % |
|------------|---|
| Yellow corn | 45% |
| Soybean meal 44% | 18% |
| Wheat bran | 20% |
| Hay | 12% |
| Mineral mix + salt | 3% |
| Limestone + phosphate | 2% |

## Conclusion

Bran is an excellent and economical raw material in Egyptian rations, combining protein, phosphorus, and soft fiber. Its highest use is in cattle and sheep, lower in poultry. Ensure bran quality (mold-free) and store in a dry place. Use the Aleeqa calculator to determine the optimal bran ratio in your ration based on available raw material prices.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "hay-silage-straw-differences",
    category: "ingredients",
    title: "الدريس والبرسيم والتبن: الفروق والاستخدامات",
    titleEn: "Hay, Clover, and Straw: Differences and Uses",
    excerpt:
      "ثلاثة أنواع من الأعلاف الخشنة شائعة في مصر — تعرف على الفروق بين الدريس والبرسيم الأخضر والتبن، ومتى تستخدم كل منها لتحقيق أفضل نتيجة.",
    excerptEn:
      "Three types of roughage common in Egypt — learn the differences between hay, fresh clover, and straw, and when to use each for the best results.",
    readTime: 6,
    publishedAt: "2025-03-25",
    relatedSlugs: ["wheat-bran-types-benefits", "sheep-seasonal-feeding", "molasses-in-rations"],
    content: `## الأعلاف الخشنة: أساس صحة الحيوان

الأعلاف الخشنة (Roughage) هي العمود الفقري لأي عليقة، خاصة في الحيوانات المجترة (الأبقار، الجاموس، الأغنام). توفر الألياف الضرورية لصحة الكرش، وتقلل تكلفة العليقة. في مصر لدينا ثلاثة أنواع رئيسية: البرسيم الأخضر، الدريس، والتبن. لكل منها استخداماته ومميزاته.

## البرسيم الأخضر (Fresh Berseem Clover)

### الوصف
البرسيم المصري (Trifolium alexandrinum) هو محاصيل العلف الشتوية الرئيسية في مصر، يُزرع من أكتوبر ويُحصد من نوفمبر حتى أبريل.

### القيمة الغذائية
| العنصر | القيمة |
|--------|--------|
| المادة الجافة | 18-22% |
| البروتين الخام (في المادة الجافة) | 18-22% |
| الطاقة (TDN) | 60-65% |
| الألياف | 20-25% |
| الكالسيوم | 1.5% |
| الرطوبة | 75-82% |

### المميزات
- بروتين عالي ورخيص (نصف سعر كسب الصويا).
- مستساغ جداً للحيوانات.
- يحسن الخصوبة وإنتاج اللبن.
- يخفض تكلفة العليقة 30-50% في موسمه.

### العيوب
- موسمي (متوفر 5 شهور فقط).
- رطوبة عالية (75-82%) تسبب نفاخ عند الإفراط.
- صعب التخزين بحالته الخضراء.

### حدود الاستخدام
- أبقار حلوب: 25-35 كجم/يوم.
- أغنام: 3-5 كجم/يوم.
- يحذر تقديمه رطباً جداً (جففه ساعة في الشمس أولاً).

## الدريس (Hay)

### الوصف
الدريس هو البرسيم أو الفصة المجففة إلى رطوبة 15-20%، ويُخزن للاستخدام في غير موسم البرسيم.

### القيمة الغذائية
| العنصر | القيمة |
|--------|--------|
| المادة الجافة | 85-90% |
| البروتين الخام | 12-15% |
| الطاقة (TDN) | 55-60% |
| الألياف | 28-32% |
| الكالسيوم | 1.2% |

### المميزات
- متوفر طوال السنة (مخزن).
- يحفظ البروتين لفترات طويلة.
- سهل التداول والوزن.
- يحمي من النفاخ.

### العيوب
- بروتين أقل من البرسيم الأخضر (بسبب فقد الأوراق أثناء التجفيف).
- يفقد 20-30% من فيتامين A بسبب الشمس.
- يتأثر الجودة بطريقة التجفيف والتخزين.

### جودة الدريس
- **ممتاز:** لون أخضر، أوراق كاملة، رائحة عطرة.
- **متوسط:** لون أصفر باهت، بعض الأوراق.
- **رديء:** لون بني، سيقان صلبة، رائحة عفن (لا تستخدم).

## التبن (Straw)

### الوصف
التبن هو سيقان المحاصيل الحبوبية (قمح، شعير، أرز) بعد حصاد الحبوب. في مصر، تبن القمح هو الأكثر شيوعاً.

### القيمة الغذائية (تبن القمح)
| العنصر | القيمة |
|--------|--------|
| المادة الجافة | 90-92% |
| البروتين الخام | 3-4% |
| الطاقة (TDN) | 40-45% |
| الألياف | 35-40% |
| الكالسيوم | 0.3% |

### المميزات
- رخيص جداً ومتوفر بكثرة.
- مصدر ألياف ممتاز يحمي الكرش.
- يمنع النفخ عند تقديمه مع البرسيم.
- يدوم لفترات طويلة دون تلف.

### العيوب
- بروتين منخفض جداً (3-4%).
- طاقة منخفضة (TDN 40-45%).
- لا يكفي وحده للنمو أو الإنتاج.
- سيقانه صلبة قد تجرح فم الحيوان.

### معالجة التبن لرفع قيمته
- **معالجة باليوريا:** رش التبن بمحلول يوريا 2-3% يرفع البروتين إلى 8-10%.
- **معالجة بالأمونيا:** ترفع الهضم من 40% إلى 55%.
- **التقطيع:** تقطيع التبن لقطع 2-3 سم يحسن الاستهلاك.

## مقارنة شاملة

| المعيار | البرسيم الأخضر | الدريس | التبن |
|---------|----------------|---------|--------|
| البروتين | 18-22% | 12-15% | 3-4% |
| الطاقة (TDN) | 60-65% | 55-60% | 40-45% |
| السعر | متوسط | مرتفع | منخفض |
| التوفر | موسمي | طوال السنة | طوال السنة |
| خطر النفخ | عالٍ | منخفض | منعدم |
| التخزين | صعب | سهل | سهل جداً |

## متى تستخدم كل نوع؟

### البرسيم الأخضر
- في موسمه (نوفمبر-أبريل) لتقليل التكلفة.
- للنعاج المرضعة (بروتين عالٍ للبن).
- للحملان النامية (تحفز النمو السريع).

### الدريس
- في الصيف والخريف (لا يوجد برسيم).
- كحفظ للنفاخ عند تقديمه مع البرسيم الرطب.
- للحيوانات التي تحتاج ألياف عالية (الأبقار الجافة).

### التبن
- في العليقة الأساسية كجزء من الألياف.
- للحيوانات في فترة الصيانة (لا تحتاج إنتاجاً).
- معالجاً باليوريا لرفع قيمته البروتينية.

## خلاصة

كل من البرسيم الأخضر والدريس والتبن له دور في عليقة الحيوان. البرسيم الأخضر في موسمه يخفض التكلفة 30-50%، الدريس يوفر البروتين خارج الموسم، والتبن يوفر الألياف الرخيصة. المربي الذكي يوازن بينها حسب الموسم والسعر واحتياجات الحيوان. استخدم حاسبة عليقة لتحديد النسب المثلى لكل منها في عليقتك بناءً على الأسعار الحالية.`,
    contentEn: `## Roughage: The Foundation of Animal Health

Roughage is the backbone of any ration, especially for ruminants (cattle, buffalo, sheep). It provides the fiber essential for rumen health and reduces ration cost. In Egypt, we have three main types: fresh clover, hay, and straw. Each has its uses and advantages.

## Fresh Berseem Clover

### Description
Egyptian clover (Trifolium alexandrinum) is the main winter forage crop in Egypt, planted in October and harvested from November to April.

### Nutritional Value
| Nutrient | Value |
|----------|-------|
| Dry Matter | 18-22% |
| Crude Protein (in DM) | 18-22% |
| Energy (TDN) | 60-65% |
| Fiber | 20-25% |
| Calcium | 1.5% |
| Moisture | 75-82% |

### Advantages
- High, cheap protein (half the price of soybean meal).
- Highly palatable to animals.
- Improves fertility and milk production.
- Reduces ration cost 30-50% in season.

### Disadvantages
- Seasonal (available only 5 months).
- High moisture (75-82%) causes bloat when overfed.
- Difficult to store green.

### Usage Limits
- Dairy cows: 25-35 kg/day.
- Sheep: 3-5 kg/day.
- Caution: do not feed very wet (sun-dry for an hour first).

## Hay

### Description
Hay is clover or alfalfa dried to 15-20% moisture, stored for use outside clover season.

### Nutritional Value
| Nutrient | Value |
|----------|-------|
| Dry Matter | 85-90% |
| Crude Protein | 12-15% |
| Energy (TDN) | 55-60% |
| Fiber | 28-32% |
| Calcium | 1.2% |

### Advantages
- Available year-round (stored).
- Preserves protein for long periods.
- Easy to handle and weigh.
- Protects against bloat.

### Disadvantages
- Lower protein than fresh clover (due to leaf loss during drying).
- Loses 20-30% of vitamin A due to sun exposure.
- Quality affected by drying and storage methods.

### Hay Quality
- **Excellent:** Green color, intact leaves, fragrant smell.
- **Medium:** Pale yellow color, some leaves.
- **Poor:** Brown color, stiff stems, moldy smell (do not use).

## Straw

### Description
Straw is the stems of cereal crops (wheat, barley, rice) after grain harvest. In Egypt, wheat straw is most common.

### Nutritional Value (Wheat Straw)
| Nutrient | Value |
|----------|-------|
| Dry Matter | 90-92% |
| Crude Protein | 3-4% |
| Energy (TDN) | 40-45% |
| Fiber | 35-40% |
| Calcium | 0.3% |

### Advantages
- Very cheap and widely available.
- Excellent fiber source protecting the rumen.
- Prevents bloat when fed with clover.
- Lasts long without spoiling.

### Disadvantages
- Very low protein (3-4%).
- Low energy (TDN 40-45%).
- Insufficient alone for growth or production.
- Stiff stems may injure the animal's mouth.

### Straw Treatment to Increase Value
- **Urea treatment:** Spraying straw with 2-3% urea solution raises protein to 8-10%.
- **Ammonia treatment:** Raises digestibility from 40% to 55%.
- **Chopping:** Cutting straw to 2-3 cm pieces improves intake.

## Comprehensive Comparison

| Criterion | Fresh Clover | Hay | Straw |
|-----------|--------------|------|-------|
| Protein | 18-22% | 12-15% | 3-4% |
| Energy (TDN) | 60-65% | 55-60% | 40-45% |
| Price | Medium | High | Low |
| Availability | Seasonal | Year-round | Year-round |
| Bloat risk | High | Low | None |
| Storage | Difficult | Easy | Very easy |

## When to Use Each Type?

### Fresh Clover
- In season (November-April) to reduce cost.
- For lactating ewes (high protein for milk).
- For growing lambs (stimulates rapid growth).

### Hay
- In summer and autumn (no clover).
- As protection against bloat when fed with wet clover.
- For animals needing high fiber (dry cows).

### Straw
- In the basic ration as part of fiber.
- For animals in maintenance (no production needed).
- Treated with urea to raise protein value.

## Conclusion

Each of fresh clover, hay, and straw has a role in the animal ration. Fresh clover in season cuts cost 30-50%, hay provides protein outside season, and straw provides cheap fiber. The smart farmer balances them according to season, price, and animal needs. Use the Aleeqa calculator to determine the optimal ratios in your ration based on current prices.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "molasses-in-rations",
    category: "ingredients",
    title: "المولاس ودوره في تحسين العليقة",
    titleEn: "Molasses and Its Role in Ration Improvement",
    excerpt:
      "المولاس سكر العصر الصناعي — تعرّف على دوره في تحسين طعم العليقة وتقليل الفقد ورفع الطاقة، وحدود استخدامه في كل نوع حيوان.",
    excerptEn:
      "Molasses — learn its role in improving ration taste, reducing waste, and raising energy, with usage limits for each animal type.",
    readTime: 5,
    publishedAt: "2025-03-28",
    relatedSlugs: ["wheat-bran-types-benefits", "hay-silage-straw-differences", "reducing-sheep-feed-cost"],
    content: `## المولاس: السكر الصناعي بفوائد متعددة

المولاس (Molasses) هو سائل لزج بني داكن ينتج كمنتج ثانوي من صناعة قصب السكر أو البنجر. في مصر يتوفر مولاس قصب السكر بكميات كبيرة، ويستخدم في علائق الحيوان بنسب مختلفة لتحسين العليقة.

## القيمة الغذائية للمولاس

| العنصر | القيمة |
|--------|--------|
| المادة الجافة | 75% |
| السكريات | 45-50% |
| الطاقة (TDN) | 70% |
| البروتين الخام | 3-5% |
| الكالسيوم | 0.8% |
| البوتاسيوم | 3.5% (مرتفع) |
| الرماد | 8-10% |

## فوائد المولاس في العليقة

### 1. محسّن للطعم (Palatability Enhancer)
المولاس حلو الطعم، ويحسن قبول الحيوانات للعليقة الجافة. مهم خاصة عند استخدام مواد رديئة الطعم مثل كسب القطن أو اليوريا.

### 2. مقلل للفقد (Dust Binder)
إضافة 3-5% مولاس للعليقة المطحونة يقلل الغبار ويربط المكونات، مما يخفض الفقد من 10% إلى 3%.

### 3. مصدر طاقة سريع
سكريات المولاس (سكروز، جلوكوز، فركتوز) تتخمر بسرعة في الكرش، مما يمد بكتيريا الكرش بالطاقة فوراً. هذا يحسن هضم الألياف ويزيد إنتاج الأحماض الدهنية الطيارة.

### 4. حامل للإضافات
المولاس يُستخدم كحامل لليوريا والفيتامينات والأملاح المعدنية، مما يضمن توزيعها المتساوي في العليقة.

### 5. مصدر للبوتاسيوم
المولاس غني بالبوتاسيوم (3.5%)، مفيد للحيوانات في الصيف التي تفقد البوتاسيوم بالتعرق.

### 6. يحسن إنتاج اللبن
السكريات السريعة في المولاس تحفز إنتاج حمض البيوتيريك في الكرش، الذي يستخدم لإنتاج دهن اللبن.

## عيوب المولاس

### 1. محتوى ماء عالٍ
25% من وزن المولاس ماء، مما يخفض الطاقة الفعلية لكل كجم.

### 2. خطر الحماض عند الإفراط
السكريات السريعة التخمر قد تسبب انخفاض pH الكرش إذا تجاوزت 15% من العليقة.

### 3. صعوبة التخزين
المولاس لزج ويحتاج خزانات خاصة ومضخات للتعامل معه.

### 4. يجذب الحشرات
في الصيف، المولاس يجذب النحل والذباب، مما يخلق مشاكل صحية في الحظيرة.

### 5. تقلب السعر
سعر المولاس يرتفع في موسم إنتاج الإيثانول، مما يخفض جدواه الاقتصادية.

## حدود الاستخدام

| نوع الحيوان | النسبة المثلى | الحد الأقصى |
|--------------|----------------|--------------|
| أبقار حلوب | 5-8% | 12% |
| أبقار تسمين | 5-10% | 15% |
| جاموس | 5-8% | 10% |
| أغنام | 4-6% | 10% |
| دواجن | 2-3% | 5% |
| خيول | 5-10% | 15% |

## استخدامات عملية للمولاس

### 1. معالجة التبن بالمولاس
- اخلط 5% مولاس + 95% تبن + 1% يوريا.
- يرفع الاستهلاك من 3 كجم إلى 5 كجم/يوم للأبقار.
- يرفع قيمة الطاقة بشكل ملحوظ.

### 2. تكوير العليقة (Pelleting)
- أضف 3-5% مولاس أثناء عملية التكوير.
- يحسن جودة الحبيبات ويقلل الفقد.

### 3. شراب اليوريا-مولاس (UMMB)
- مكعبات صلبة من مولاس + يوريا + أملاح + فيتامينات.
- توفر للحيوانات في المرعى كمكمل غذائي.
- مفيدة للأغنام والأبقار في المناطق الجافة.

### 4. تحلية العليقة
- أضف 2-3% مولاس عند استخدام كسب القطن أو كسب الفول السوداني (طعم مر).
- يحسن قبول الحيوان للعليقة بنسبة 30-50%.

## وصفة عملية: عليقة أغنام مع مولاس

| المكوّن | النسبة |
|---------|--------|
| ذرة صفراء | 45% |
| كسب قطن مقشور | 25% |
| ردة قمح | 18% |
| مولاس | 5% |
| تبن قمح | 4% |
| مخلوط أملاح + ملح | 3% |

## نصائح عملية عند استخدام المولاس

- **خزنه:** في خزانات ستانلس أو بلاستيك، تجنب الحديد (يتأكسد).
- **التسخين:** في الشتاء، سخّن المولاس لـ 40°م لتسهيل ضخه ومزجه.
- **الخلط:** أضفه تدريجياً أثناء الخلط لتجنب الكتل.
- **الفحص:** تأكد من خلوه من الشوائب والمعادن الثقيلة.
- **الكمية:** ابدأ بنسبة 2-3% وارفعها تدريجياً على مدى أسبوع.

## خلاصة

المولاس إضافة قيّمة للعليقة بفوائد متعددة: تحسين الطعم، تقليل الفقد، رفع الطاقة، توفير البوتاسيوم. استخدامه الأمثل 5-8% في علائق المجترات، وأقل في الدواجن. حاسبة عليقة تأخذ المولاس في الاعتبار عند حساب أرخص عليقة متوازنة، فاستخدمها لتحديد النسبة المثلى بناءً على سعر المولاس في منطقتك.`,
    contentEn: `## Molasses: Industrial Sugar with Multiple Benefits

Molasses is a thick, dark brown liquid produced as a by-product of sugarcane or sugar beet processing. In Egypt, sugarcane molasses is widely available and used in animal rations at various ratios to improve the ration.

## Nutritional Value of Molasses

| Nutrient | Value |
|----------|-------|
| Dry Matter | 75% |
| Sugars | 45-50% |
| Energy (TDN) | 70% |
| Crude Protein | 3-5% |
| Calcium | 0.8% |
| Potassium | 3.5% (high) |
| Ash | 8-10% |

## Benefits of Molasses in the Ration

### 1. Palatability Enhancer
Molasses is sweet and improves animal acceptance of dry rations. Important when using bad-tasting materials like cottonseed meal or urea.

### 2. Dust Binder
Adding 3-5% molasses to ground ration reduces dust and binds components, lowering waste from 10% to 3%.

### 3. Fast Energy Source
Molasses sugars (sucrose, glucose, fructose) ferment rapidly in the rumen, providing instant energy to rumen bacteria. This improves fiber digestion and increases volatile fatty acid production.

### 4. Additive Carrier
Molasses is used as a carrier for urea, vitamins, and minerals, ensuring their even distribution in the ration.

### 5. Potassium Source
Molasses is rich in potassium (3.5%), beneficial for animals in summer that lose potassium through sweating.

### 6. Improves Milk Production
Fast-fermenting sugars in molasses stimulate butyric acid production in the rumen, used for milk fat production.

## Disadvantages of Molasses

### 1. High Water Content
25% of molasses weight is water, lowering actual energy per kg.

### 2. Acidosis Risk When Overused
Rapidly fermenting sugars may lower rumen pH if exceeding 15% of ration.

### 3. Storage Difficulty
Molasses is viscous and requires special tanks and pumps for handling.

### 4. Attracts Insects
In summer, molasses attracts bees and flies, creating health problems in the barn.

### 5. Price Volatility
Molasses prices rise during ethanol production season, reducing economic feasibility.

## Usage Limits

| Animal Type | Optimal % | Max |
|-------------|-----------|-----|
| Dairy cows | 5-8% | 12% |
| Beef cattle | 5-10% | 15% |
| Buffalo | 5-8% | 10% |
| Sheep | 4-6% | 10% |
| Poultry | 2-3% | 5% |
| Horses | 5-10% | 15% |

## Practical Uses of Molasses

### 1. Treating Straw with Molasses
- Mix 5% molasses + 95% straw + 1% urea.
- Raises intake from 3 kg to 5 kg/day for cattle.
- Significantly raises energy value.

### 2. Pelleting Rations
- Add 3-5% molasses during pelleting.
- Improves pellet quality and reduces waste.

### 3. Urea-Molasses Blocks (UMMB)
- Solid blocks of molasses + urea + minerals + vitamins.
- Provided to grazing animals as a supplement.
- Useful for sheep and cattle in dry areas.

### 4. Sweetening the Ration
- Add 2-3% molasses when using cottonseed or peanut meal (bitter taste).
- Improves animal acceptance by 30-50%.

## Practical Recipe: Sheep Ration with Molasses

| Ingredient | % |
|------------|---|
| Yellow corn | 45% |
| Decorticated cottonseed meal | 25% |
| Wheat bran | 18% |
| Molasses | 5% |
| Wheat straw | 4% |
| Mineral mix + salt | 3% |

## Practical Tips When Using Molasses

- **Storage:** In stainless or plastic tanks, avoid iron (oxidizes).
- **Heating:** In winter, heat molasses to 40°C to ease pumping and mixing.
- **Mixing:** Add gradually during mixing to avoid clumps.
- **Inspection:** Ensure free of impurities and heavy metals.
- **Quantity:** Start at 2-3% and raise gradually over a week.

## Conclusion

Molasses is a valuable ration addition with multiple benefits: improving taste, reducing waste, raising energy, providing potassium. Optimal use is 5-8% in ruminant rations, less in poultry. The Aleeqa calculator considers molasses when computing the cheapest balanced ration, so use it to determine the optimal ratio based on your local molasses price.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "minerals-vitamins-importance",
    category: "ingredients",
    title: "الأملاح المعدنية والفيتامينات وأهميتها",
    titleEn: "Mineral Salts and Vitamins and Their Importance",
    excerpt:
      "الأملاح المعدنية والفيتامينات مفتاح الأداء الحيواني العالي — تعرف على أهم المعادن والفيتامينات ومصادرها وكميات الإضافة اللازمة.",
    excerptEn:
      "Mineral salts and vitamins are the key to high animal performance — learn the most important minerals and vitamins, their sources, and required addition amounts.",
    readTime: 5,
    publishedAt: "2025-03-31",
    relatedSlugs: ["sheep-minerals-vitamins", "understanding-protein-energy", "soybean-meal-guide"],
    content: `## لماذا نضيف الأملاح والفيتامينات؟

حتى أفضل علائق الحبوب والكسب تنقصها بعض العناصر الضرورية. التربة المصرية فقيرة في السيلينيوم والزنك والكوبالت، والذرة والكسب منخفضة في الصوديوم والكالسيوم. لذلك يجب إضافة مخلوط أملاح معدنية وفيتامينات لكل عليقة متوازنة.

## المعادن الكبرى (Macrominerals)

### الكالسيوم (Ca)
- **الدور:** بناء العظام، إنتاج اللبن، انقباض العضلات.
- **مصادر الإضافة:** حجر كلس (38% Ca)، طباشير (40% Ca).
- **كمية الإضافة:** 1-2% من العليقة.

### الفوسفور (P)
- **الدور:** الطاقة، الخصوبة، نمو العظام.
- **مصادر الإضافة:** فوسفات ثنائي الكالسيوم DCP (18% P، 22% Ca)، فوسفات أحادي الكالسيوم MCP (21% P).
- **كمية الإضافة:** 0.5-1% من العليقة.

### الصوديوم والكلور (NaCl)
- **الدور:** توازن السوائل، نقل الأعصاب، الشهية.
- **مصدر الإضافة:** ملح الطعام (39% Na، 60% Cl).
- **كمية الإضافة:** 0.5% شتاءً، 1% صيفاً.

### البوتاسيوم (K)
- **الدور:** توازن السوائل، خاصة في الصيف.
- **مصدر الإضافة:** كلوريد البوتاسيوم (52% K)، مخلوط أملاح.
- **كمية الإضافة:** 0.5-1% صيفاً للحيوانات المنتجة.

### المغنيسيوم (Mg)
- **الدور:** استقلاب الطاقة، يمنع تيتانيا العشب.
- **مصدر الإضافة:** أكسيد المغنيسيوم (54% Mg).
- **كمية الإضافة:** 0.2% للنعاج المرضعة.

### الكبريت (S)
- **الدور:** تكوين الأحماض الأمينية (ميثيونين، سيستين)، الصوف.
- **مصدر الإضافة:** كبريتات الأمونيوم، كبريت عنصري.
- **كمية الإضافة:** 0.2% للأغنام.

## المعادن الصغرى (Microminerals)

### السيلينيوم (Se)
- **الدور:** مع فيتامين E، مضاد أكسدة ومنع مرض العضل الأبيض.
- **مصدر الإضافة:** سيلينيت الصوديوم (45% Se).
- **كمية الإضافة:** 0.1-0.3 ملجم/كجم علف.

### الزنك (Zn)
- **الدور:** مناعة، صحة الجلد، الخصوبة.
- **مصدر الإضافة:** كبريتات الزنك (36% Zn)، أكسيد الزنك (80% Zn).
- **كمية الإضافة:** 30-50 ملجم/كجم علف.

### النحاس (Cu)
- **تحذير:** سامة للأغنام بكميات صغيرة!
- **كمية الإضافة:** 5-10 ملجم/كجم فقط للأغنام، 10-15 ملجم/كجم للأبقار والدواجن.

### المنجنيز (Mn)
- **الدور:** نمو العظام، إنتاج اللبن، الخصوبة.
- **مصدر الإضافة:** كبريتات المنجنيز (32% Mn).
- **كمية الإضافة:** 40-60 ملجم/كجم علف.

### الكوبالت (Co)
- **الدور:** ضروري لإنتاج فيتامين B12 في الكرش.
- **مصدر الإضافة:** كبريتات الكوبالت (24% Co).
- **كمية الإضافة:** 0.1-0.2 ملجم/كجم علف.

### اليود (I)
- **الدور:** هرمونات الغدة الدرقية.
- **مصدر الإضافة:** يودات البوتاسيوم (60% I).
- **كمية الإضافة:** 0.5 ملجم/كجم علف.

### الحديد (Fe)
- **الدور:** تكوين الهيموجلوبين.
- **مصدر الإضافة:** كبريتات الحديدوز (32% Fe).
- **ملاحظة:** نادراً ما يحتاج إضافته للحيوانات البالغة.

## الفيتامينات الضرورية

### فيتامين A
- **الدور:** الرؤية، الجلد، الخصوبة، المناعة.
- **الاحتياج:** 3000-5000 وحدة دولية/كجم علف.
- **المصادر:** كاروتين البرسيم، إضافة صناعية.

### فيتامين D3
- **الدور:** امتصاص الكالسيوم والفوسفور.
- **الاحتياج:** 500-1000 وحدة دولية/كجم علف.
- **المصادر:** التعرض للشمس، إضافة صناعية.

### فيتامين E
- **الدور:** مضاد أكسدة، مع السيلينيوم.
- **الاحتياج:** 20-40 ملجم/كجم علف.
- **المصادر:** البذور الزيتية، إضافة صناعية.

### فيتامين K
- **الدور:** تجلط الدم.
- **الاحتياج:** 1-2 ملجم/كجم علف للدواجن.

### فيتامينات B Complex
- **للمجترات:** تنتج في الكرش، لا حاجة لإضافتها للكبار.
- **للدواجن:** يجب إضافة B1، B2، B6، B12، حمض الفوليك، حمض البانتوثينيك.
- **للخنازير:** إضافة شاملة لـ B Complex ضرورية.

## تكوين مخلوط أملاح عملي (للأغنام)

| المكوّن | الكمية/طن علف |
|---------|----------------|
| ملح طعام | 5 كجم |
| حجر كلس | 10 كجم |
| فوسفات ثنائي الكالسيوم | 5 كجم |
| أكسيد المغنيسيوم | 2 كجم |
| سيلينيت الصوديوم | 0.5 جم |
| كبريتات الزنك | 100 جم |
| كبريتات المنجنيز | 80 جم |
| كبريتات الكوبالت | 2 جم |
| يودات البوتاسيوم | 1 جم |
| فيتامين A + D3 + E (Premix) | حسب التعليمات |

> ملاحظة: لا تضف النحاس في مخلوط الأغنام! استخدم مخاليط مخصصة لكل نوع حيوان.

## كيف تشتري مخلوط أملاح جيد؟

- اختر مخلوط مخصص لنوع الحيوان (أغنام، أبقار، دواجن).
- اقرأ الملصق: نسب العناصر واضحة ومكتوبة.
- اشترِ من مصدر موثوق (شركة أعلاف معروفة).
- تخزين: في مكان جاف بارد، بعيد عن الشمس.
- العمر الافتراضي: لا تستخدم بعد 6 شهور من الإنتاج.

## خلاصة

إضافة الأملاح المعدنية والفيتامينات تكلف 1-3% من قيمة العليقة لكنها ترفع الإنتاجية 15-30%. استخدم مخلوط أملاح مخصص لكل نوع حيوان (خاصة احذر النحاس للأغنام)، وأضف بنسب مدروسة. حاسبة عليقة تأخذ احتياجات المعادن في الاعتبار عند حساب أرخص عليقة متوازنة، فاستخدمها لتحديد الكميات المثلى لكل عنصر في عليقتك.`,
    contentEn: `## Why Add Minerals and Vitamins?

Even the best grain and meal rations lack some essential elements. Egyptian soil is deficient in selenium, zinc, and cobalt, and corn and meal are low in sodium and calcium. Therefore, a mineral and vitamin mix must be added to every balanced ration.

## Macrominerals

### Calcium (Ca)
- **Role:** Bone building, milk production, muscle contraction.
- **Addition sources:** Limestone (38% Ca), chalk (40% Ca).
- **Addition amount:** 1-2% of ration.

### Phosphorus (P)
- **Role:** Energy, fertility, bone growth.
- **Addition sources:** Dicalcium phosphate DCP (18% P, 22% Ca), monocalcium phosphate MCP (21% P).
- **Addition amount:** 0.5-1% of ration.

### Sodium and Chloride (NaCl)
- **Role:** Fluid balance, nerve transmission, appetite.
- **Addition source:** Table salt (39% Na, 60% Cl).
- **Addition amount:** 0.5% in winter, 1% in summer.

### Potassium (K)
- **Role:** Fluid balance, especially in summer.
- **Addition source:** Potassium chloride (52% K), mineral mix.
- **Addition amount:** 0.5-1% in summer for producing animals.

### Magnesium (Mg)
- **Role:** Energy metabolism, prevents grass tetany.
- **Addition source:** Magnesium oxide (54% Mg).
- **Addition amount:** 0.2% for lactating ewes.

### Sulfur (S)
- **Role:** Amino acid formation (methionine, cysteine), wool.
- **Addition source:** Ammonium sulfate, elemental sulfur.
- **Addition amount:** 0.2% for sheep.

## Microminerals

### Selenium (Se)
- **Role:** With vitamin E, antioxidant and prevents white muscle disease.
- **Addition source:** Sodium selenite (45% Se).
- **Addition amount:** 0.1-0.3 mg/kg feed.

### Zinc (Zn)
- **Role:** Immunity, skin health, fertility.
- **Addition source:** Zinc sulfate (36% Zn), zinc oxide (80% Zn).
- **Addition amount:** 30-50 mg/kg feed.

### Copper (Cu)
- **Warning:** Toxic to sheep in small amounts!
- **Addition amount:** 5-10 mg/kg only for sheep, 10-15 mg/kg for cattle and poultry.

### Manganese (Mn)
- **Role:** Bone growth, milk production, fertility.
- **Addition source:** Manganese sulfate (32% Mn).
- **Addition amount:** 40-60 mg/kg feed.

### Cobalt (Co)
- **Role:** Essential for vitamin B12 production in rumen.
- **Addition source:** Cobalt sulfate (24% Co).
- **Addition amount:** 0.1-0.2 mg/kg feed.

### Iodine (I)
- **Role:** Thyroid hormones.
- **Addition source:** Potassium iodate (60% I).
- **Addition amount:** 0.5 mg/kg feed.

### Iron (Fe)
- **Role:** Hemoglobin formation.
- **Addition source:** Ferrous sulfate (32% Fe).
- **Note:** Rarely needs addition for adult animals.

## Essential Vitamins

### Vitamin A
- **Role:** Vision, skin, fertility, immunity.
- **Requirement:** 3000-5000 IU/kg feed.
- **Sources:** Clover carotene, synthetic supplement.

### Vitamin D3
- **Role:** Calcium and phosphorus absorption.
- **Requirement:** 500-1000 IU/kg feed.
- **Sources:** Sun exposure, synthetic supplement.

### Vitamin E
- **Role:** Antioxidant, with selenium.
- **Requirement:** 20-40 mg/kg feed.
- **Sources:** Oilseeds, synthetic supplement.

### Vitamin K
- **Role:** Blood clotting.
- **Requirement:** 1-2 mg/kg feed for poultry.

### B Complex Vitamins
- **For ruminants:** Produced in rumen, no need to add for adults.
- **For poultry:** Must add B1, B2, B6, B12, folic acid, pantothenic acid.
- **For pigs:** Comprehensive B Complex addition essential.

## Practical Mineral Mix (for Sheep)

| Component | Amount/ton feed |
|-----------|------------------|
| Table salt | 5 kg |
| Limestone | 10 kg |
| Dicalcium phosphate | 5 kg |
| Magnesium oxide | 2 kg |
| Sodium selenite | 0.5 g |
| Zinc sulfate | 100 g |
| Manganese sulfate | 80 g |
| Cobalt sulfate | 2 g |
| Potassium iodate | 1 g |
| Vitamin A + D3 + E (Premix) | per instructions |

> Note: Do not add copper to sheep mix! Use mixes specific to each animal type.

## How to Buy a Good Mineral Mix?

- Choose a mix specific to the animal type (sheep, cattle, poultry).
- Read the label: clear element ratios and written.
- Buy from a trusted source (known feed company).
- Storage: in a dry, cool place, away from sun.
- Shelf life: do not use after 6 months from production.

## Conclusion

Adding minerals and vitamins costs 1-3% of ration value but raises productivity 15-30%. Use a mineral mix specific to each animal type (especially beware copper for sheep), and add in measured amounts. The Aleeqa calculator considers mineral needs when computing the cheapest balanced ration, so use it to determine optimal amounts for each element in your ration.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "ddgs-in-feed",
    category: "ingredients",
    title: "DDGS واستخداماته في التغذية",
    titleEn: "DDGS and Its Uses in Animal Feed",
    excerpt:
      "DDGS (Distillers Dried Grains with Solubles) منتج ثانوي لصناعة الإيثانول — تعرف على قيمته الغذائية وحدود استخدامه ومتى يكون خياراً اقتصادياً.",
    excerptEn:
      "DDGS (Distillers Dried Grains with Solubles) is an ethanol industry by-product — learn its nutritional value, usage limits, and when it is an economic choice.",
    readTime: 5,
    publishedAt: "2025-04-03",
    relatedSlugs: ["corn-yellow-nutrition", "soybean-meal-guide", "gluten-feed-alternative"],
    content: `## ما هو DDGS؟

DDGS (Distillers Dried Grains with Solubles) هو منتج ثانوي لصناعة الإيثانول من الذرة. في هذه العملية، يتم تخمير نشا الذرة لاستخراج الإيثانول، فتتبقى الحبوب المجففة مع المواد الذائبة، وهي غنية بالبروتين والدهون والألياف والمعادن. في مصر، الـ DDGS يستورد من أمريكا وأوروبا بكميات متزايدة.

## القيمة الغذائية للـ DDGS (لكل 1 كجم)

| العنصر | القيمة |
|--------|--------|
| المادة الجافة | 88-92% |
| البروتين الخام | 27-30% |
| الطاقة (TDN) | 80-85% |
| الدهون | 8-12% |
| الألياف | 7-10% |
| الكالسيوم | 0.2% |
| الفوسفور | 0.8% |
| لايسين | 0.7% (منخفض) |
| ميثيونين | 0.6% (جيد) |

## مميزات DDGS

### 1. بروتين عالٍ ومناسب
بروتين DDGS (27-30%) أعلى من الذرة (8.5%) بثلاث مرات ونصف، مما يجعله مصدر بروتين تكميلي ممتاز.

### 2. طاقة مرتفعة
TDN 80-85% أعلى من الذرة تقريباً، بفضل الدهون العالية (8-12%).

### 3. سعر اقتصادي
DDGS أرخص من كسب الصويا بنسبة 30-50%، ويوفر بروتيناً وطاقة معاً.

### 4. مستساغ للحيوانات المجترة
الأبقار والأغنام تقبل عليه بسهولة، ويفيد بكتيريا الكرش.

### 5. غني بفيتامينات B
العملية التخمرية تزيد محتوى فيتامينات B في DDGS.

## عيوب DDGS

### 1. تقلب الجودة
الجودة تختلف من مصنع لآخر، وقد تختلف الدفعات. يجب فحص كل شحنة.

### 2. لايسين منخفض
لايسين في DDGS (0.7%) أقل من كسب الصويا (2.9%). يجب إضافة لايسين صناعي للدواجن.

### 3. محتوى كبريت عالٍ
بعض أنواع DDGS تحتوي على كبريت عالٍ (0.5-1%)، يسبب مشاكل صحية عند الإفراط.

### 4. خطر السموم الفطرية
إذا كانت الذرة الأصلية تحتوي على أفلاتوكسين، فإن DDGS يركزه 3 أضعاف.

### 5. لون و رائحة قوية
اللون البني الداكن والرائحة القوية قد تخفض قبول بعض الحيوانات في البداية.

### 6. غير مناسب للعجول الصغيرة
لا يستخدم للعجول قبل 4 شهور لاحتوائه على دهون عالية.

## حدود الاستخدام

| نوع الحيوان | الحد الأقصى لـ DDGS |
|--------------|----------------------|
| أبقار حلوب | 20% |
| أبقار تسمين | 30-40% |
| جاموس | 25% |
| أغنام | 25% |
| دواجن لاحم | 10-15% |
| دواجن بياض | 15% |
| خنازير | 30% |

## استخدامات عملية لـ DDGS

### 1. في علائق الأبقار الحلوب
- استبدل 5-8% من الذرة + 5-7% من كسب الصويا بـ 15-20% DDGS.
- يوفر 10-15% من تكلفة العليقة.
- يحسن إنتاج اللبن بنسبة 3-5%.

### 2. في علائق الأغنام التسمين
- استخدم 15-25% DDGS في العليقة.
- يوفر 15-20% من تكلفة البروتين.
- يحسن النمو بنسبة 5-10% مقارنة بكسب القطن.

### 3. في علائق الدواجن البياضة
- استخدم 10-15% DDGS مع إضافة لايسين صناعي (1-2 كجم/طن).
- يحسن قشرة البيضة بفضل محتوى الكبريت.

### 4. في علائق الدجاج اللاحم
- استخدم 8-12% DDGS في علائق النامي والناهي.
- لا تستخدمه في علائق البادي (أول 10 أيام).

## وصفة عملية: عليقة أبقار حلوب مع DDGS

| المكوّن | النسبة |
|---------|--------|
| ذرة صفراء | 35% |
| DDGS | 20% |
| كسب صويا 44% | 10% |
| ردة قمح | 15% |
| دريس | 15% |
| مخلوط أملاح + ملح | 3% |
| حجر كلس + فوسفات + بيكربونات | 2% |

هذه العليقة تحقق: بروتين 16%، TDN 70%، بتكلفة أقل 12-15% من العليقة التقليدية.

## نصائح عند شراء DDGS

- **اللون:** ذهبي إلى بني فاتح = جودة جيدة. بني داكن جداً = جودة رديئة (احتراق حراري).
- **الرطوبة:** أقل من 12% (أعلى يسبب تعفن).
- **الرائحة:** حلوة خميرة = جيدة. رائحة نفاذة = تلف.
- **السموم:** اطلب شهادة فحص الأفلاتوكسين (أقل من 20 ppb).
- **المورد:** اشترِ من مورد موثوق يوفر شهادات تحليل.

## خلاصة

DDGS مادة خام واعدة في علائق الحيوان، خاصة للأبقار والأغنام. يجمع بين البروتين العالي والطاقة المرتفعة بسعر اقتصادي. عيوبه (تقلب الجودة، نقص اللايسين، السموم المحتملة) يمكن تجاوزها بفحص الجودة وإضافة لايسين صناعي. استخدم حاسبة عليقة لتحديد النسبة المثلى من DDGS في عليقتك بناءً على سعره في السوق المحلي وقيمته الغذائية.`,
    contentEn: `## What Is DDGS?

DDGS (Distillers Dried Grains with Solubles) is a by-product of ethanol production from corn. In this process, corn starch is fermented to extract ethanol, leaving dried grains with solubles — rich in protein, fat, fiber, and minerals. In Egypt, DDGS is imported from America and Europe in increasing quantities.

## Nutritional Value of DDGS (per 1 kg)

| Nutrient | Value |
|----------|-------|
| Dry Matter | 88-92% |
| Crude Protein | 27-30% |
| Energy (TDN) | 80-85% |
| Fat | 8-12% |
| Fiber | 7-10% |
| Calcium | 0.2% |
| Phosphorus | 0.8% |
| Lysine | 0.7% (low) |
| Methionine | 0.6% (good) |

## Advantages of DDGS

### 1. High Suitable Protein
DDGS protein (27-30%) is 3.5x higher than corn (8.5%), making it an excellent complementary protein source.

### 2. High Energy
TDN 80-85% is nearly higher than corn, thanks to high fat (8-12%).

### 3. Economic Price
DDGS is 30-50% cheaper than soybean meal and provides both protein and energy.

### 4. Palatable to Ruminants
Cattle and sheep accept it readily and it benefits rumen bacteria.

### 5. Rich in B Vitamins
The fermentation process increases B vitamin content in DDGS.

## Disadvantages of DDGS

### 1. Quality Variability
Quality varies from factory to factory and between batches. Each shipment must be tested.

### 2. Low Lysine
Lysine in DDGS (0.7%) is lower than soybean meal (2.9%). Synthetic lysine must be added for poultry.

### 3. High Sulfur Content
Some DDGS types contain high sulfur (0.5-1%), causing health issues when overused.

### 4. Mycotoxin Risk
If original corn contains aflatoxin, DDGS concentrates it 3x.

### 5. Strong Color and Odor
Dark brown color and strong odor may reduce some animals' acceptance initially.

### 6. Not for Young Calves
Not used for calves before 4 months due to high fat content.

## Usage Limits

| Animal Type | Max DDGS |
|-------------|----------|
| Dairy cows | 20% |
| Beef cattle | 30-40% |
| Buffalo | 25% |
| Sheep | 25% |
| Broilers | 10-15% |
| Layers | 15% |
| Pigs | 30% |

## Practical Uses of DDGS

### 1. In Dairy Cow Rations
- Replace 5-8% corn + 5-7% soybean meal with 15-20% DDGS.
- Saves 10-15% of ration cost.
- Improves milk production by 3-5%.

### 2. In Sheep Fattening Rations
- Use 15-25% DDGS in the ration.
- Saves 15-20% of protein cost.
- Improves growth by 5-10% compared to cottonseed meal.

### 3. In Layer Rations
- Use 10-15% DDGS with synthetic lysine addition (1-2 kg/ton).
- Improves eggshell due to sulfur content.

### 4. In Broiler Rations
- Use 8-12% DDGS in grower and finisher rations.
- Do not use in starter rations (first 10 days).

## Practical Recipe: Dairy Cow Ration with DDGS

| Ingredient | % |
|------------|---|
| Yellow corn | 35% |
| DDGS | 20% |
| Soybean meal 44% | 10% |
| Wheat bran | 15% |
| Hay | 15% |
| Mineral mix + salt | 3% |
| Limestone + phosphate + bicarb | 2% |

This ration achieves: protein 16%, TDN 70%, at 12-15% lower cost than traditional ration.

## Tips When Buying DDGS

- **Color:** Golden to light brown = good quality. Very dark brown = poor quality (heat damage).
- **Moisture:** Below 12% (higher causes mold).
- **Odor:** Sweet yeasty = good. Strong pungent = spoiled.
- **Toxins:** Request aflatoxin test certificate (below 20 ppb).
- **Supplier:** Buy from a trusted supplier providing analysis certificates.

## Conclusion

DDGS is a promising raw material in animal rations, especially for cattle and sheep. It combines high protein and high energy at an economic price. Its drawbacks (quality variability, lysine deficiency, potential toxins) can be overcome by quality testing and synthetic lysine addition. Use the Aleeqa calculator to determine the optimal DDGS ratio in your ration based on its local market price and nutritional value.`,
  },

  /* --------------------------------------------------------------- */
  {
    slug: "gluten-feed-alternative",
    category: "ingredients",
    title: "الجلوتين ومتى يكون بديلاً مناسبًا",
    titleEn: "Gluten Feed and When It Is a Suitable Alternative",
    excerpt:
      "الجلوتين فيد والجلوتين ميل بمنتجات ثانوية لصناعة النشا من الذرة — تعرف على قيمتهما الغذائية وحدود استخدامهما ومتى يكونان بديلاً مناسباً.",
    excerptEn:
      "Gluten feed and gluten meal are by-products of corn starch production — learn their nutritional value, usage limits, and when they are suitable alternatives.",
    readTime: 5,
    publishedAt: "2025-04-06",
    relatedSlugs: ["corn-yellow-nutrition", "ddgs-in-feed", "soybean-meal-guide"],
    content: `## منتجات الجلوتين: كنز صناعة النشا

عند استخراج النشا من الذرة الصفراء في صناعات النشا والجلوكوز، تنتج ثلاثة منتجات ثانوية قيّمة: الجلوتين فيد (Gluten Feed)، الجلوتين ميل (Gluten Meal)، والجرم (Corn Germ). كل منها له قيمة غذائية واستخدامات مختلفة في علائق الحيوان.

## الفرق بين المنتجات الثلاثة

### 1. Gluten Feed (الجلوتين فيد)
- **الوصف:** خليط من الردة الناتجة + الجلوتين + بعض الجرم.
- **البروتين:** 18-22%.
- **الطاقة (TDN):** 75-80%.
- **الاستخدام:** للأبقار والأغنام والدواجن.

### 2. Gluten Meal (الجلوتين ميل)
- **الوصف:** بروتين نقي مركّز من الذرة.
- **البروتين:** 60-65%.
- **الطاقة (TDN):** 85%.
- **الاستخدام:** للدواجن والأحياء المائية (سمك).

### 3. Corn Germ (الجرم)
- **الوصف:** جنين الذرة، غني بالدهون.
- **البروتين:** 14-16%.
- **الدهون:** 15-20%.
- **الاستخدام:** للأبقار (طاقة عالية) أو لاستخراج زيت الذرة.

## القيمة الغذائية للجلوتين فيد (لكل 1 كجم)

| العنصر | القيمة |
|--------|--------|
| المادة الجافة | 90% |
| البروتين الخام | 20% |
| الطاقة (TDN) | 78% |
| الألياف | 8-10% |
| الدهون | 3-5% |
| الكالسيوم | 0.3% |
| الفوسفور | 0.6% |
| لايسين | 0.6% (منخفض) |
| ميثيونين | 0.4% |

## القيمة الغذائية للجلوتين ميل (لكل 1 كجم)

| العنصر | القيمة |
|--------|--------|
| المادة الجافة | 92% |
| البروتين الخام | 62% |
| الطاقة (TDN) | 85% |
| الألياف | 1-2% |
| الدهون | 2-3% |
| الكالسيوم | 0.2% |
| الفوسفور | 0.5% |
| الميثيونين | 1.5% (مرتفع جداً) |
| لايسين | 1.0% |
| الزانثوفيل | عالٍ (يصفر البيض والدجاج) |

## متى يكون الجلوتين بديلاً مناسباً؟

### الجلوتين فيد (Gluten Feed) كبديل:

#### 1. للردة في علائق الأبقار
- استبدل 50-100% من الردة بالجلوتين فيد.
- الجلوتين فيد أعلى بروتيناً من الردة (20% مقابل 15%).
- يوفر 10-15% من تكلفة البروتين.

#### 2. لكسب الصويا في علائق الأغنام
- استبدل 30-50% من كسب الصويا بالجلوتين فيد.
- يوفر 15-20% من التكلفة.
- يحتاج إضافة لايسين صناعي للدواجن فقط.

### الجلوتين ميل (Gluten Meal) كبديل:

#### 1. لكسب الصويا في علائق الدواجن
- استبدل 20-30% من كسب الصويا بالجلوتين ميل.
- مصدر ممتاز للميثيونين (1.5%).
- يحسن لون البيض والذبيحة (بفضل الزانثوفيل).

#### 2. لعلائق الأسماك
- يستخدم بنسبة 20-40% من العليقة.
- بروتين عالٍ (62%) يقلل الحاجة لمسحوق السمك المكلف.

#### 3. لعلائق العجول الصغيرة
- بديل ممتاز لمسحوق السمك في علائق العجول قبل الفطام.
- بروتين عالي الهضم وخالٍ من السموم.

## حدود الاستخدام

### الجلوتين فيد
| نوع الحيوان | الحد الأقصى |
|--------------|--------------|
| أبقار حلوب | 25-30% |
| أبقار تسمين | 30% |
| أغنام | 25% |
| دواجن لاحم | 10-15% |
| دواجن بياض | 15% |

### الجلوتين ميل
| نوع الحيوان | الحد الأقصى |
|--------------|--------------|
| دواجن لاحم | 10% |
| دواجن بياض | 8% |
| أسماك | 40% |
| عجول | 15% |

## مميزات الجلوتين

### 1. ثبات الجودة
عكس DDGS، الجلوتين فيد/ميل جودته ثابتة نسبياً لأن صناعة النشا منضبطة.

### 2. خالٍ من السموم
نفس مستوى سموم الذرة الأصلية، لا يركزها مثل DDGS.

### 3. غني بالميثيونين
الجلوتين ميل من أغنى مصادر الميثيونين الطبيعية.

### 4. يحسن لون المنتجات
الزانثوفيل في الجلوتين ميل يحسن لون صفار البيض وذبيحة الدجاج.

### 5. هضم عالٍ
بروتين الجلوتين هضمه 90-95% للدواجن.

## عيوب الجلوتين

### 1. لايسين منخفض
الجلوتين فيد (0.6%) والجلوتين ميل (1.0%) أقل من كسب الصويا (2.9%).

### 2. سعر مرتفع للجلوتين ميل
الجلوتين ميل أغلى من كسب الصويا في بعض الأحيان، لكنه أرخص من مسحوق السمك.

### 3. توفر محدود
في مصر، الجلوتين متوفر بكميات محدودة من مصانع النشا المحلية أو مستورد.

### 4. حساسية للرطوبة
يجب تخزينه في مكان جاف جداً لتجنب التعفن.

## وصفة عملية: عليقة دواجن بياض مع جلوتين ميل

| المكوّن | النسبة |
|---------|--------|
| ذرة صفراء | 58% |
| كسب صويا 44% | 15% |
| جلوتين ميل 60% | 6% |
| ردة قمح | 10% |
| حجر كلس | 7% |
| فوسفات + مخلوط أملاح | 3% |
| ميثيونين صناعي | 0.1% |
| فيتامينات + premix | 0.9% |

هذه العليقة تحقق: بروتين 16.5%، طاقة 2800 كيلوكالوري/كجم، كالسيوم 3.8%، مع لون ممتاز لصفار البيض بفضل الزانثوفيل.

## خلاصة

منتجات الجلوتين (فيد وميل) بدائل ممتازة في علائق الحيوان، خاصة الجلوتين فيد للأبقار والأغنام والجلوتين ميل للدواجن والأسماك. مميزاتها: ثبات الجودة، غنى بالميثيونين، تحسين لون المنتجات. عيوبها الرئيسية (نقص اللايسين، التوفر المحدود) يمكن تجاوزها بالتخطيط الجيد. استخدم حاسبة عليقة لتحديد النسبة المثلى للجلوتين في عليقتك بناءً على سعره وقيمته الغذائية مقارنة بالبدائل.`,
    contentEn: `## Gluten Products: A Treasure of Starch Industry

When starch is extracted from yellow corn in starch and glucose industries, three valuable by-products result: Gluten Feed, Gluten Meal, and Corn Germ. Each has different nutritional value and uses in animal rations.

## Difference Between the Three Products

### 1. Gluten Feed
- **Description:** Mixture of resulting bran + gluten + some germ.
- **Protein:** 18-22%.
- **Energy (TDN):** 75-80%.
- **Use:** For cattle, sheep, and poultry.

### 2. Gluten Meal
- **Description:** Pure concentrated corn protein.
- **Protein:** 60-65%.
- **Energy (TDN):** 85%.
- **Use:** For poultry and aquaculture (fish).

### 3. Corn Germ
- **Description:** Corn embryo, fat-rich.
- **Protein:** 14-16%.
- **Fat:** 15-20%.
- **Use:** For cattle (high energy) or corn oil extraction.

## Nutritional Value of Gluten Feed (per 1 kg)

| Nutrient | Value |
|----------|-------|
| Dry Matter | 90% |
| Crude Protein | 20% |
| Energy (TDN) | 78% |
| Fiber | 8-10% |
| Fat | 3-5% |
| Calcium | 0.3% |
| Phosphorus | 0.6% |
| Lysine | 0.6% (low) |
| Methionine | 0.4% |

## Nutritional Value of Gluten Meal (per 1 kg)

| Nutrient | Value |
|----------|-------|
| Dry Matter | 92% |
| Crude Protein | 62% |
| Energy (TDN) | 85% |
| Fiber | 1-2% |
| Fat | 2-3% |
| Calcium | 0.2% |
| Phosphorus | 0.5% |
| Methionine | 1.5% (very high) |
| Lysine | 1.0% |
| Xanthophyll | High (yolk and chicken color) |

## When Is Gluten a Suitable Alternative?

### Gluten Feed as Alternative:

#### 1. For Bran in Cattle Rations
- Replace 50-100% of bran with gluten feed.
- Gluten feed is higher in protein than bran (20% vs. 15%).
- Saves 10-15% of protein cost.

#### 2. For Soybean Meal in Sheep Rations
- Replace 30-50% of soybean meal with gluten feed.
- Saves 15-20% of cost.
- Needs synthetic lysine addition only for poultry.

### Gluten Meal as Alternative:

#### 1. For Soybean Meal in Poultry Rations
- Replace 20-30% of soybean meal with gluten meal.
- Excellent methionine source (1.5%).
- Improves egg and carcass color (due to xanthophyll).

#### 2. For Fish Rations
- Use at 20-40% of ration.
- High protein (62%) reduces need for expensive fishmeal.

#### 3. For Young Calf Rations
- Excellent alternative to fishmeal in pre-weaning calf rations.
- High digestibility protein and toxin-free.

## Usage Limits

### Gluten Feed
| Animal Type | Max |
|-------------|-----|
| Dairy cows | 25-30% |
| Beef cattle | 30% |
| Sheep | 25% |
| Broilers | 10-15% |
| Layers | 15% |

### Gluten Meal
| Animal Type | Max |
|-------------|-----|
| Broilers | 10% |
| Layers | 8% |
| Fish | 40% |
| Calves | 15% |

## Advantages of Gluten

### 1. Quality Stability
Unlike DDGS, gluten feed/meal quality is relatively stable because starch production is regulated.

### 2. Toxin-Free
Same mycotoxin level as original corn, does not concentrate like DDGS.

### 3. Methionine-Rich
Gluten meal is one of the richest natural methionine sources.

### 4. Improves Product Color
Xanthophyll in gluten meal improves egg yolk and chicken carcass color.

### 5. High Digestibility
Gluten protein digestibility is 90-95% for poultry.

## Disadvantages of Gluten

### 1. Low Lysine
Gluten feed (0.6%) and gluten meal (1.0%) are lower than soybean meal (2.9%).

### 2. High Price for Gluten Meal
Gluten meal is sometimes more expensive than soybean meal, but cheaper than fishmeal.

### 3. Limited Availability
In Egypt, gluten is available in limited quantities from local starch factories or imported.

### 4. Moisture Sensitivity
Must be stored in very dry places to prevent mold.

## Practical Recipe: Layer Ration with Gluten Meal

| Ingredient | % |
|------------|---|
| Yellow corn | 58% |
| Soybean meal 44% | 15% |
| Gluten meal 60% | 6% |
| Wheat bran | 10% |
| Limestone | 7% |
| Phosphate + mineral mix | 3% |
| Synthetic methionine | 0.1% |
| Vitamins + premix | 0.9% |

This ration achieves: protein 16.5%, energy 2800 kcal/kg, calcium 3.8%, with excellent yolk color due to xanthophyll.

## Conclusion

Gluten products (feed and meal) are excellent alternatives in animal rations, especially gluten feed for cattle and sheep, and gluten meal for poultry and fish. Their advantages: quality stability, methionine richness, and improved product color. Their main drawbacks (lysine deficiency, limited availability) can be overcome by good planning. Use the Aleeqa calculator to determine the optimal gluten ratio in your ration based on its price and nutritional value compared to alternatives.`,
  },
];

/* ---------------- Lookup helpers ---------------- */

/** Get an article by slug, or undefined. */
export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Get a category by key, or undefined. */
export function getCategory(key: string): ArticleCategory | undefined {
  return ARTICLE_CATEGORIES.find((c) => c.key === key);
}

/** Get all articles in a given category. */
export function getArticlesByCategory(category: ArticleCategoryKey): Article[] {
  return ARTICLES.filter((a) => a.category === category);
}

/** Get related articles by slug list (filtering out missing slugs). */
export function getRelatedArticles(slug: string): Article[] {
  const article = getArticle(slug);
  if (!article) return [];
  return article.relatedSlugs
    .map((s) => getArticle(s))
    .filter((a): a is Article => Boolean(a));
}

/** All article slugs — used for generateStaticParams. */
export const ARTICLE_SLUGS = ARTICLES.map((a) => a.slug);
