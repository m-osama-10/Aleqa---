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
