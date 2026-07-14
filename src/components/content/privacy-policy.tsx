"use client";

import { ContentPageLayout } from "./content-page-layout";
import { useLang } from "@/lib/i18n";

export function PrivacyPolicyContent() {
  const { lang } = useLang();
  const isRtl = lang === "ar";

  if (!isRtl) {
    return (
      <ContentPageLayout title="Privacy Policy">
        <div className="space-y-6 text-sm leading-relaxed text-foreground">
          <p className="text-muted-foreground">Last updated: July 2025</p>

          <section>
            <h2 className="mb-2 text-lg font-bold">1. Introduction</h2>
            <p>
              Aleeqa (&quot;we&quot;, &quot;us&quot;, or &quot;the app&quot;) is a free feed ration
              calculator for Egyptian livestock farmers. We respect your privacy and are
              committed to protecting your personal data. This policy explains what data we
              collect, how we use it, and your rights.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold">2. Data We Collect</h2>
            <h3 className="mb-1 font-semibold">2.1 Data stored locally on your device</h3>
            <p className="mb-2">
              The app runs primarily in your browser. The following data is stored locally
              in your browser&apos;s localStorage and never sent to our servers unless you
              create an account:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Ingredient prices you enter or edit</li>
              <li>Saved rations (formulation results)</li>
              <li>Edited ingredient nutrition values</li>
              <li>App preferences (language, theme)</li>
            </ul>
            <h3 className="mb-1 mt-3 font-semibold">2.2 Account data (optional)</h3>
            <p>
              If you create an account (via Supabase authentication), we store your email
              address and authentication token. This is used solely for account management
              and syncing favorites/history across devices.
            </p>
            <h3 className="mb-1 mt-3 font-semibold">2.3 Automatically collected data</h3>
            <p>
              We use Google AdSense to display ads. Google may collect cookies, device
              information, and usage data as described in Google&apos;s Privacy Policy.
              We do not have access to this data individually.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold">3. How We Use Your Data</h2>
            <ul className="ml-4 list-disc space-y-1">
              <li>To provide the feed calculation functionality</li>
              <li>To save and retrieve your rations and prices</li>
              <li>To display relevant advertisements via Google AdSense</li>
              <li>To improve the app&apos;s performance and user experience</li>
            </ul>
            <p className="mt-2">
              We do <strong>not</strong> sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold">4. Cookies and Advertising</h2>
            <p>
              This app uses Google AdSense, which uses cookies to serve ads based on your
              prior visits to this and other websites. Google&apos;s use of advertising
              cookies enables it and its partners to serve ads to you based on your visit
              to our site and/or other sites on the Internet.
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Google AdSense cookies: Used for ad personalization</li>
              <li>Local storage: Used for app functionality (prices, rations, preferences)</li>
            </ul>
            <p className="mt-2">
              You may opt out of personalized advertising by visiting Google&apos;s Ads
              Settings page: https://www.google.com/settings/ads
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold">5. Data Sharing</h2>
            <p>
              We do not share your personal data with third parties except:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li>With Google AdSense for ad delivery (as described above)</li>
              <li>With Supabase (our authentication provider) for account management</li>
              <li>When required by law or to protect our rights</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold">6. Data Security</h2>
            <p>
              Your locally stored data never leaves your device unless you explicitly
              create an account. Account data is transmitted over HTTPS and stored in
              Supabase with Row-Level Security (RLS) enabled.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold">7. Your Rights</h2>
            <ul className="ml-4 list-disc space-y-1">
              <li>Clear your browser data to delete all locally stored information</li>
              <li>Delete your account at any time from the profile screen</li>
              <li>Opt out of personalized ads via Google Ads Settings</li>
              <li>Use the app without creating an account (guest mode)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold">8. Children&apos;s Privacy</h2>
            <p>
              This app is intended for adult farmers and livestock professionals. We do
              not knowingly collect data from children under 13.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold">9. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any changes will be
              posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold">10. Contact</h2>
            <p>
              If you have questions about this privacy policy, you can contact us via the
              team links on the About page.
            </p>
          </section>
        </div>
      </ContentPageLayout>
    );
  }

  return (
    <ContentPageLayout title="سياسة الخصوصية">
      <div className="space-y-6 text-sm leading-relaxed text-foreground">
        <p className="text-muted-foreground">آخر تحديث: يوليو ٢٠٢٥</p>

        <section>
          <h2 className="mb-2 text-lg font-bold">١. مقدمة</h2>
          <p>
            تطبيق &quot;عليقة&quot; هو حاسبة عليقة مجانية لمربي الماشية المصريين. نحن نحترم
            خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة البيانات التي نجمعها
            وكيفية استخدامها وحقوقك.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">٢. البيانات التي نجمعها</h2>
          <h3 className="mb-1 font-semibold">٢.١ بيانات مخزّنة محلياً على جهازك</h3>
          <p className="mb-2">
            يعمل التطبيق بشكل أساسي في متصفحك. البيانات التالية تُخزَّن محلياً في
            localStorage الخاص بمتصفحك ولا تُرسل إلى خوادمنا إلا إذا أنشأت حساباً:
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>أسعار المكوّنات التي تُدخلها أو تُعدّلها</li>
            <li>العلائق المحفوظة (نتائج التركيب)</li>
            <li>القيم الغذائية المعدّلة للمكوّنات</li>
            <li>تفضيلات التطبيق (اللغة، المظهر)</li>
          </ul>
          <h3 className="mb-1 mt-3 font-semibold">٢.٢ بيانات الحساب (اختياري)</h3>
          <p>
            إذا أنشأت حساباً (عبر مصادقة Supabase)، نخزّن عنوان بريدك الإلكتروني ورمز
            المصادقة. يُستخدم هذا فقط لإدارة الحساب ومزامنة المفضلة والسجل عبر الأجهزة.
          </p>
          <h3 className="mb-1 mt-3 font-semibold">٢.٣ بيانات تُجمع تلقائياً</h3>
          <p>
            نستخدم Google AdSense لعرض الإعلانات. قد تجمع Google ملفات تعريف الارتباط
            ومعلومات الجهاز وبيانات الاستخدام كما هو موضح في سياسة خصوصية Google. لا
            يمكننا الوصول إلى هذه البيانات بشكل فردي.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">٣. كيف نستخدم بياناتك</h2>
          <ul className="ml-4 list-disc space-y-1">
            <li>لتقديم وظائف حساب العليقة</li>
            <li>لحفظ واسترجاع علائقك وأسعارك</li>
            <li>لعرض إعلانات مناسبة عبر Google AdSense</li>
            <li>لتحسين أداء التطبيق وتجربة المستخدم</li>
          </ul>
          <p className="mt-2">
            نحن <strong>لا</strong> نبيع بياناتك الشخصية لأطراف ثالثة.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">٤. ملفات تعريف الارتباط والإعلانات</h2>
          <p>
            يستخدم هذا التطبيق Google AdSense، التي تستخدم ملفات تعريف الارتباط لعرض
            الإعلانات بناءً على زياراتك السابقة لهذا الموقع ومواقع أخرى. استخدام Google
            لملفات تعريف الارتباط الإعلانية يتيح لها ولشركائها عرض إعلانات لك بناءً على
            زيارتك لموقعنا و/أو مواقع أخرى على الإنترنت.
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>ملفات AdSense: تُستخدم لتخصيص الإعلانات</li>
            <li>التخزين المحلي: يُستخدم لوظائف التطبيق (الأسعار، العلائق، التفضيلات)</li>
          </ul>
          <p className="mt-2">
            يمكنك إلغاء الاشتراك في الإعلانات المخصصة من خلال زيارة صفحة إعدادات
            إعلانات Google: https://www.google.com/settings/ads
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">٥. مشاركة البيانات</h2>
          <p>لا نشارك بياناتك الشخصية مع أطراف ثالثة إلا في الحالات التالية:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>مع Google AdSense لعرض الإعلانات (كما هو موضح أعلاه)</li>
            <li>مع Supabase (مزود المصادقة) لإدارة الحساب</li>
            <li>عندما يقتضي القانون ذلك أو لحماية حقوقنا</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">٦. أمان البيانات</h2>
          <p>
            بياناتك المخزّنة محلياً لا تغادر جهازك إلا إذا أنشأت حساباً صراحةً. تُنقل
            بيانات الحساب عبر HTTPS وتُخزَّن في Supabase مع تفعيل أمان Row-Level Security
            (RLS).
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">٧. حقوقك</h2>
          <ul className="ml-4 list-disc space-y-1">
            <li>امسح بيانات متصفحك لحذف جميع المعلومات المخزّنة محلياً</li>
            <li>احذف حسابك في أي وقت من شاشة الملف الشخصي</li>
            <li>ألغِ الاشتراك في الإعلانات المخصصة عبر إعدادات إعلانات Google</li>
            <li>استخدم التطبيق بدون إنشاء حساب (وضع الزائر)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">٨. خصوصية الأطفال</h2>
          <p>
            هذا التطبيق مخصص للمربين والمهنيين البالغين. لا نجمع عمداً بيانات من الأطفال
            دون سن ١٣ عاماً.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">٩. التغييرات على هذه السياسة</h2>
          <p>
            قد نحدّث سياسة الخصوصية من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة مع
            تحديث تاريخ المراجعة.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">١٠. التواصل</h2>
          <p>
            إذا كان لديك أسئلة حول سياسة الخصوصية هذه، يمكنك التواصل معنا عبر روابط
            الفريق في صفحة &quot;حول&quot;.
          </p>
        </section>
      </div>
    </ContentPageLayout>
  );
}
