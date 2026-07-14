"use client";

import { ContentPageLayout } from "./content-page-layout";
import { useLang } from "@/lib/i18n";

interface QA {
  q: string;
  a: string;
}

const FAQ_AR: QA[] = [
  {
    q: "هل التطبيق مجاني؟",
    a: "نعم، التطبيق مجاني تماماً. لا يحتاج تسجيلاً ويعمل بدون إنترنت. يعرض إعلانات Google AdSense لدعم استمرار المشروع.",
  },
  {
    q: "هل يحتاج التطبيق اتصال بالإنترنت؟",
    a: "لا. كل الحسابات تتم على جهازك. الأسعار والعلائق المحفوظة تُخزَّن محلياً في المتصفح. تحتاج للإنترنت فقط لتحميل الصفحة أول مرة وعرض الإعلانات.",
  },
  {
    q: "كيف تُحسب العليقة؟",
    a: "يستخدم التطبيق خوارزمية البرمجة الخطية (Simplex) لإيجاد أرخص تركيبة تلبي الاحتياجات الغذائية للحيوان (بروتين، طاقة، ألياف) مع احترام الحدود الدنيا والعليا لكل مكوّن.",
  },
  {
    q: "ما هي الأهداف الغذائية المستخدمة؟",
    a: "الأهداف مبنية على معايير NRC (المجلس القومي للبحث الأمريكي) ومعدّلة للسوق المصري. يمكنك الاطلاع على الأهداف لكل حيوان في صفحة دليل التغذية.",
  },
  {
    q: "كيف أعدّل أسعار المكوّنات؟",
    a: "من تبويب الأسعار داخل التطبيق، يمكنك تعديل سعر كل مكوّن. تُحفظ الأسعار تلقائياً على جهازك وتُستخدم في كل الحسابات القادمة.",
  },
  {
    q: "ما الفرق بين العليقة المتوازنة والاقتصادية؟",
    a: "العليقة المتوازنة تحقق كل الأهداف الغذائية بدقة. العليقة الاقتصادية تسمح بتخفيف بعض الأهداف بنسبة بسيطة لتقليل التكلفة مع الحفاظ على قيمة غذائية مقبولة.",
  },
  {
    q: "كيف أعدّل النسب يدوياً؟",
    a: "بعد عرض النتيجة، اضغط زر تعديل النسب يدوياً. ستظهر بطاقات لكل مكوّن مع شريط تمرير وزر قفل. عند تعديل أي نسبة، تُوزَّع باقي النسب تلقائياً ليبقى المجموع ١٠٠٪.",
  },
  {
    q: "ما زر إعادة التوازن الذكي؟",
    a: "يعيد تشغيل محلل البرمجة الخطية مع احترام المواد المقفلة. مفيد بعد تعديل النسب يدوياً لإيجاد أفضل تركيبة مع الحفاظ على المواد التي تريد تثبيتها.",
  },
  {
    q: "هل يمكنني تعديل القيم الغذائية للمكوّنات؟",
    a: "نعم. من تبويب الأسعار، اضغط على أي مكوّن لتعديل نسب البروتين والطاقة والألياف وغيرها. تُحفظ القيم المعدّلة على جهازك.",
  },
  {
    q: "كيف أحفظ وأشارك العليقة؟",
    a: "اضغط زر الحفظ لتخزين العليقة في سجل العلائق. يمكنك مشاركتها عبر واتساب أو طباعتها كتقرير PDF من أزرار المشاركة والطباعة.",
  },
  {
    q: "هل بياناتي آمنة؟",
    a: "نعم. كل بياناتك (الأسعار، العلائق، التفضيلات) تُخزَّن محلياً على جهازك. لا تُرسل لأي خادم إلا إذا أنشأت حساباً اختيارياً. اقرأ سياسة الخصوصية للتفاصيل.",
  },
  {
    q: "كم عدد أنواع الحيوانات المدعومة؟",
    a: "٩ أنواع: بقرة حلوب، جاموس حلوب، جاموس تسمين، عجول تسمين، خروف تسمين، دجاج بياض، أمهات دجاج بياض، دجاج تسمين، وكتاكيت بادي.",
  },
  {
    q: "كم عدد المكوّنات المتاحة؟",
    a: "٢٢ مكوّن مقسّمة على ٦ فئات: مصادر الطاقة، مصادر البروتين، مصادر الألياف، الأملاح المعدنية، الفيتامينات، والإضافات.",
  },
  {
    q: "هل يمكنني استخدام التطبيق على الهاتف؟",
    a: "نعم، التطبيق مصمم بأسلوب mobile-first ويعمل على أي متصفح حديث. يمكنك إضافته للشاشة الرئيسية كهاتف ويب (PWA).",
  },
  {
    q: "ماذا أفعل إذا لم يجد المحلل حلاً؟",
    a: "جرّب توسيع الحدود (استخدم وضع العليقة الاقتصادية) أو فكّ بعض المواد المقفلة في التعديل اليدوي. إذا استمرت المشكلة، تأكد من أن الأسعار معقولة وأن هناك تنوّع كافٍ في المكوّنات المختارة.",
  },
];

const FAQ_EN: QA[] = [
  {
    q: "Is the app free?",
    a: "Yes, the app is completely free. No sign-up required, works offline. It displays Google AdSense ads to support the project.",
  },
  {
    q: "Does the app need internet?",
    a: "No. All calculations run on your device. Prices and saved rations are stored locally in the browser. You only need internet to load the page the first time and display ads.",
  },
  {
    q: "How is the ration calculated?",
    a: "The app uses a Linear Programming (Simplex) algorithm to find the cheapest ration that meets the animal's nutritional requirements (protein, energy, fiber) while respecting each ingredient's min/max bounds.",
  },
  {
    q: "What nutritional targets are used?",
    a: "Targets are based on NRC (National Research Council) standards, tuned for the Egyptian market. You can view targets for each animal on the Nutrition Guide page.",
  },
  {
    q: "How do I edit ingredient prices?",
    a: "From the Prices tab in the app, you can edit each ingredient's price. Prices are auto-saved on your device and used in all future calculations.",
  },
  {
    q: "What's the difference between balanced and economy ration?",
    a: "Balanced meets all nutritional targets precisely. Economy relaxes some targets slightly to reduce cost while maintaining acceptable nutritional value.",
  },
  {
    q: "How do I edit percentages manually?",
    a: "After viewing the result, press the manual edit button. Cards appear for each ingredient with a slider and lock button. When you change any percentage, the rest auto-adjust to keep the total at 100%.",
  },
  {
    q: "What does Smart Rebalance do?",
    a: "It re-runs the LP solver while respecting locked ingredients. Useful after manual edits to find the best ration while keeping the ingredients you want fixed.",
  },
  {
    q: "Can I edit ingredient nutrition values?",
    a: "Yes. From the Prices tab, tap any ingredient to edit protein, energy, fiber, and other values. Custom values are saved on your device.",
  },
  {
    q: "How do I save and share a ration?",
    a: "Press the save button to store the ration in your history. You can share it via WhatsApp or print it as a PDF report from the share and print buttons.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. All your data (prices, rations, preferences) is stored locally on your device. It's never sent to any server unless you create an optional account. Read the Privacy Policy for details.",
  },
  {
    q: "How many animal types are supported?",
    a: "9 types: dairy cow, dairy buffalo, fattening buffalo, fattening calf, fattening sheep, layer chicken, layer breeder, broiler, and broiler starter.",
  },
  {
    q: "How many ingredients are available?",
    a: "22 ingredients divided into 6 categories: energy sources, protein sources, fiber sources, minerals, vitamins, and additives.",
  },
  {
    q: "Can I use the app on my phone?",
    a: "Yes, the app is designed mobile-first and works on any modern browser. You can add it to your home screen as a PWA.",
  },
  {
    q: "What if the solver can't find a solution?",
    a: "Try widening bounds (use economy mode) or unlock some ingredients in manual mode. If the problem persists, ensure prices are reasonable and there's enough variety in selected ingredients.",
  },
];

export function FaqContent() {
  const { lang } = useLang();
  const faqs = lang === "ar" ? FAQ_AR : FAQ_EN;
  const title = lang === "ar" ? "الأسئلة الشائعة" : "Frequently Asked Questions";

  return (
    <ContentPageLayout title={title}>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/60 bg-card p-4"
          >
            <h3 className="mb-1.5 flex items-start gap-2 text-sm font-bold text-foreground">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-black text-primary">
                {lang === "ar" ? ["١","٢","٣","٤","٥","٦","٧","٨","٩","١٠","١١","١٢","١٣","١٤","١٥"][i] : i + 1}
              </span>
              {faq.q}
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{faq.a}</p>
          </div>
        ))}
      </div>
    </ContentPageLayout>
  );
}
