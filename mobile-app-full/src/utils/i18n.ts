/* ================================================================== */
/*  i18n — Arabic/English dictionary + RTL support (React Native)     */
/*  Adapted from /home/z/my-project/src/lib/i18n.tsx.                  */
/* ================================================================== */

import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";

export type Lang = "ar" | "en";
export type Dir = "rtl" | "ltr";

const LANG_KEY = "@alieqa/lang.v1";

/* ================================================================== */
/*  DICTIONARY                                                         */
/* ================================================================== */

const DICT: Record<Lang, Record<string, string>> = {
  ar: {
    // ---- common ----
    "common.app_name": "عليقة",
    "common.app_sub": "حاسبة العليقة الذكية",
    "common.offline": "أوفلاين",
    "common.free_offline": "مجاني · يعمل أوفلاين · للمربي المصري",
    "common.egp": "ج.م",
    "common.kg": "كجم",
    "common.day": "يوم",
    "common.month": "شهر",
    "common.save": "حفظ",
    "common.share": "مشاركة",
    "common.print": "طباعة",
    "common.cancel": "إلغاء",
    "common.delete": "حذف",
    "common.close": "إغلاق",
    "common.reset": "افتراضي",
    "common.updated": "آخر تحديث",
    "common.default_prices": "أسعار افتراضية",
    "common.back_home": "الصفحة الرئيسية",
    "common.start_calc": "ابدأ الحساب",
    "common.start_now": "ابدأ حساب العليقة الآن",
    "common.pdf": "تصدير PDF للطباعة",
    "common.whatsapp": "مشاركة عبر واتساب",
    "common.retry": "إعادة المحاولة",
    "common.loading": "جاري التحميل…",
    "common.error": "حدث خطأ",
    "common.empty": "لا توجد بيانات",
    "common.yes": "نعم",
    "common.no": "لا",
    "common.confirm": "تأكيد",
    "common.back": "رجوع",
    "common.next": "التالي",
    "common.done": "تم",
    "common.guest": "زائر",
    "common.admin": "مشرف",
    "common.user": "مستخدم",
    "common.online": "متصل",
    "common.synced": "متزامن",
    "common.syncing": "جاري المزامنة…",
    "common.pending": "بانتظار المزامنة",

    // ---- auth ----
    "auth.login": "تسجيل الدخول",
    "auth.register": "حساب جديد",
    "auth.forgot": "نسيت كلمة المرور؟",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.full_name": "الاسم الكامل",
    "auth.phone": "رقم الهاتف",
    "auth.confirm_password": "تأكيد كلمة المرور",
    "auth.sign_in_btn": "دخول",
    "auth.sign_up_btn": "إنشاء حساب",
    "auth.reset_btn": "إرسال رابط الاستعادة",
    "auth.guest_btn": "المتابعة كزائر",
    "auth.no_account": "ليس لديك حساب؟",
    "auth.have_account": "لديك حساب بالفعل؟",
    "auth.sign_up_link": "أنشئ حساب",
    "auth.sign_in_link": "سجّل دخول",
    "auth.invalid_email": "بريد إلكتروني غير صالح",
    "auth.invalid_password": "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
    "auth.password_mismatch": "كلمتا المرور غير متطابقتين",
    "auth.login_success": "تم تسجيل الدخول",
    "auth.login_error": "تعذّر تسجيل الدخول — تحقق من بياناتك",
    "auth.register_success": "تم إنشاء الحساب",
    "auth.register_error": "تعذّر إنشاء الحساب — ربما البريد مُسجّل",
    "auth.reset_sent": "إذا كان البريد مُسجّلاً ستصلك رسالة استعادة",
    "auth.reset_error": "تعذّر إرسال رابط الاستعادة",
    "auth.logout": "تسجيل الخروج",
    "auth.logout_confirm": "هل تريد تسجيل الخروج؟",
    "auth.guest_expired": "انتهت جلسة الزائر — سجّل الدخول للمتابعة",
    "auth.welcome_back": "أهلاً بعودتك",

    // ---- nav tabs ----
    "nav.home": "الرئيسية",
    "nav.calculator": "الحاسبة",
    "nav.favorites": "المفضلة",
    "nav.history": "السجل",
    "nav.profile": "حسابي",
    "nav.calculators": "الحاسبات",
    "nav.prices": "الأسعار",
    "nav.notifications": "الإشعارات",
    "nav.settings": "الإعدادات",
    "nav.about": "حول",
    "nav.feedback": "ملاحظات",
    "nav.admin": "لوحة المشرف",

    // ---- home ----
    "home.greeting": "أهلاً",
    "home.subtitle": "احسب عليقتك بأقل تكلفة وبأقل جهد",
    "home.quick_calc": "حاسبة سريعة",
    "home.recent": "حسابات أخيرة",
    "home.favorites_shortcut": "علائقي المفضلة",
    "home.tips_title": "نصيحة اليوم",
    "home.tip1": "حدّث أسعار السوق أسبوعياً لحساب أدق.",
    "home.tip2": "الوضع الاقتصادي يخفض التكلفة مع الحفاظ على القيمة الغذائية.",
    "home.tip3": "احفظ العليقة لتعود إليها لاحقاً بأسعار اليوم.",
    "home.no_recent": "لا توجد حسابات بعد — ابدأ أول حساب",
    "home.ads_title": "إعلانات تهمّك",

    // ---- calculator ----
    "calc.s1.title": "اختر الحيوان وحالته الإنتاجية",
    "calc.s2.title": "بيانات الحيوان",
    "calc.weight": "الوزن",
    "calc.production": "إنتاج اللبن اليومي",
    "calc.flock": "حجم القطيع",
    "calc.dmi_label": "المادة الجافة المتناولة (DMI)",
    "calc.dmi_flock_suffix": " — للقطيع",
    "calc.s3.title": "الموازن الاقتصادي",
    "calc.s3.tip":
      "الوضع الاقتصادي يرخي أهداف البروتين والطاقة والألياف الخشنة قليلاً فيختار المحرك بدائل أرخص — وتشوف الكميات تتغير والتوفير بالجنيه.",
    "calc.balanced": "عليقة متوازنة",
    "calc.balanced_sub": "تحقق كل الأهداف الغذائية",
    "calc.economy": "عليقة اقتصادية",
    "calc.economy_sub": "أرخص بديل بنفس القيمة تقريباً",
    "calc.diff_label": "الفرق عن المتوازنة:",
    "calc.s4.title": "أسعار اليوم (قابلة للتعديل)",
    "calc.s4.hint": "غيّر السعر مباشرة — التركيبة تتحسب فوراً بأسعار سوقك. الأسعار تُحفظ تلقائياً على جهازك.",
    "calc.result_title": "التركيبة المقترحة",
    "calc.result_manual": "التركيبة (تعديل يدوي)",
    "calc.lp_badge": "محسوبة بالبرمجة الخطية",
    "calc.manual_badge": "تعديل يدوي",
    "calc.edit_btn": "تعديل النسب يدوياً",
    "calc.reset_auto": "رجوع للحساب التلقائي",
    "calc.manual_toast": "وضع التعديل اليدوي — عدّل النسب وشاهد التغيير لحظياً",
    "calc.saved_toast": "تم حفظ العليقة في قائمة علائقك",
    "calc.no_export": "لا يوجد تركيبة للتصدير",
    "calc.no_save": "لا يمكن حفظ عليقة غير قابلة للتركيب",
    "calc.save_fail": "تعذّر الحفظ — امسح علائق قديمة وحاول مرة أخرى",
    "calc.saved_count": "لديك {n} عليقة محفوظة",
    "calc.compute_btn": "احسب العليقة",
    "calc.disclaimer":
      "القيم تقريبية لأغراض إرشادية على أساس الوزن كما يُقدَّم. للقطعان الإنتاجية الكبيرة أو حالات خاصة (حمل، مرض، تغيير مفاجئ في الإنتاج) استشر أخصائي تغذية. الأهداف الغذائية مبنية على متوسطات NRC ومعدّلة للسوق المصري.",

    // ---- manual editor ----
    "manual.protein": "البروتين",
    "manual.energy": "الطاقة",
    "manual.fiber": "الألياف",
    "manual.cost_day": "التكلفة/يوم",
    "manual.sum_label": "مجموع النسب",
    "manual.over": "زائد {n}% — قلّل النسب",
    "manual.under": "ناقص {n}% — زود النسب",
    "manual.save": "حفظ العليقة",

    // ---- ration result ----
    "result.dmi_day": "المادة الجافة/اليوم",
    "result.protein": "البروتين الخام",
    "result.energy": "الطاقة (TDN)",
    "result.fiber": "الألياف الخام",
    "result.target_ge": "الهدف ≥ {n}%",
    "result.max_le": "الأقصى {n}%",
    "result.cost_daily": "التكلفة اليومية",
    "result.cost_monthly": "التكلفة الشهرية",
    "result.cost_flock": "للقطيع",
    "result.cost_per_kg": "تكلفة الكيلوجرام",
    "result.cost_per_head": "تكلفة الرأس الواحد/يوم",
    "result.cost_per_bird": "تكلفة الطائر الواحد/يوم",
    "result.savings": "التوفير",
    "result.savings_sub": "{n}% أقل يومياً",
    "result.components_title": "تفصيل المكوّنات",
    "result.chart_title": "نسب التركيبة",
    "result.infeasible": "تعذّر تركيب عليقة بهذه القيود",
    "result.infeasible_desc": "جرّب توسيع الحدود المتاحة أو راجع الأسعار.",
    "result.heads_in_flock": "عدد الرؤوس في القطيع",
    "result.birds_in_flock": "عدد الطيور في القطيع",
    "result.warnings_title": "ملاحظات",
    "result.save_btn": "حفظ في المفضلة",
    "result.share_btn": "مشاركة",
    "result.print_btn": "تصدير PDF",

    // ---- prices screen ----
    "prices.title": "أسعار خامات السوق المصري",
    "prices.subtitle_count": "{n} عليقة محفوظة على جهازك",
    "prices.subtitle_none": "أسعار افتراضية — عدّلها بأسعار سوقك",
    "prices.default_hint": "السعر الافتراضي: {n} ج.م/كجم",
    "prices.note":
      "تُحفظ الأسعار على جهازك تلقائياً ويعمل التطبيق بدون إنترنت. عند توفّر الشبكة يمكنك تحديثها يدوياً بأسعار سوقك الأسبوعي. التركيبة تُعاد لحظياً مع كل تغيير سعر.",
    "prices.invalid": "أدخل سعراً صحيحاً",
    "prices.saved": "تم تحديث سعر {name}",
    "prices.reset_done": "تمت إعادة الأسعار للقيم الافتراضية",
    "prices.reset_btn": "استعادة الأسعار الافتراضية",
    "prices.egp_per_kg": "ج.م/كجم",
    "prices.updated_at": "آخر تحديث: {date}",

    // ---- favorites screen ----
    "favorites.title": "علائقي المفضلة",
    "favorites.subtitle_n": "{n} عليقة محفوظة",
    "favorites.subtitle_0": "لا توجد علائق محفوظة بعد",
    "favorites.empty_title": "لا توجد علائق محفوظة",
    "favorites.empty_desc": "احسب عليقة من تبويب «الحاسبة» ثم اضغط «حفظ» لتظهر هنا.",
    "favorites.view": "عرض",
    "favorites.delete": "حذف",
    "favorites.delete_title": "حذف العليقة؟",
    "favorites.delete_desc": "لا يمكن التراجع عن هذا الإجراء. العليقة ستُحذف نهائياً.",
    "favorites.deleted_toast": "تم حذف العليقة",
    "favorites.mode_balanced": "متوازنة",
    "favorites.mode_economy": "اقتصادية",

    // ---- history screen ----
    "history.title": "سجل الحسابات",
    "history.subtitle_n": "{n} عملية حسابية",
    "history.subtitle_0": "لا يوجد سجل بعد",
    "history.empty_title": "السجل فارغ",
    "history.empty_desc": "ستظهر هنا كل عملية حسابية تجريها على الحاسبة.",
    "history.clear_btn": "مسح السجل",
    "history.clear_confirm": "مسح كل السجل؟",
    "history.cleared": "تم مسح السجل",
    "history.reuse": "إعادة الحساب",

    // ---- notifications ----
    "notifications.title": "الإشعارات",
    "notifications.empty": "لا توجد إشعارات",
    "notifications.mark_all_read": "تعليم الكل كمقروء",
    "notifications.marked_read": "تم تعليم الإشعار كمقروء",
    "notifications.unread_count": "{n} غير مقروءة",

    // ---- settings ----
    "settings.title": "الإعدادات",
    "settings.language": "اللغة",
    "settings.arabic": "العربية",
    "settings.english": "English",
    "settings.theme": "المظهر",
    "settings.light": "فاتح",
    "settings.dark": "داكن",
    "settings.system": "تلقائي",
    "settings.account": "الحساب",
    "settings.about": "حول التطبيق",
    "settings.feedback": "أرسل ملاحظة",
    "settings.logout": "تسجيل الخروج",
    "settings.privacy": "الخصوصية",
    "settings.privacy_desc": "بياناتك محفوظة على جهازك. لا نشاركها مع أي طرف.",
    "settings.notifications": "الإشعارات",
    "settings.notifications_enable": "تفعيل الإشعارات",
    "settings.cache": "مساحة التخزين",
    "settings.clear_cache": "مسح البيانات المؤقتة",
    "settings.cache_cleared": "تم مسح البيانات المؤقتة",
    "settings.version": "الإصدار {v}",
    "settings.premium": "اشترك في النسخة المدفوعة",
    "settings.premium_desc": "احصل على مزايا إضافية ودعم التطوير.",

    // ---- profile ----
    "profile.title": "حسابي",
    "profile.name": "الاسم",
    "profile.email": "البريد الإلكتروني",
    "profile.phone": "الهاتف",
    "profile.role": "النوع",
    "profile.joined": "تاريخ الانضمام",
    "profile.edit": "تعديل الملف",
    "profile.save": "حفظ",
    "profile.saved": "تم تحديث الملف",
    "profile.subscription": "الاشتراك",
    "profile.plan_free": "مجاني",
    "profile.plan_pro": "احترافي",
    "profile.plan_premium": "مميز",

    // ---- about ----
    "about.title": "حول التطبيق",
    "about.tagline": "حاسبة العليقة الذكية للمربي المصري",
    "about.intro":
      "أداة تقنية مجانية تساعد مربي الأبقار والجاموس والأغنام والدواجن في مصر على تركيب العلائق الغذائية بدقة علمية وبأقل تكلفة، بناءً على مكوّنات السوق المصري. التطبيق لا يبيع ولا يورد مستلزمات — هو أداة حسابية بحتة.",
    "about.f1.t": "محرك برمجة خطية حقيقي",
    "about.f1.d": "يحلّ أرخص عليقة متوازنة عبر خوارزمية Simplex على جهازك نفسه — لا خوادم ولا انتظار.",
    "about.f2.t": "يعمل بدون إنترنت",
    "about.f2.d": "كل الحسابات والأسعار والعلائق محفوظة محلياً. مناسبة للمزارع ذات الشبكة الضعيفة.",
    "about.f3.t": "موازن اقتصادي",
    "about.f3.d": "يُعيد ترتيب المكوّنات لاختيار البدائل الأرخص التي تحقق نفس القيمة الغذائية تقريباً.",
    "about.f4.t": "جاهز للهاتف",
    "about.f4.d": "تصميم mobile-first يمكن تثبيته على الشاشة الرئيسية أو تحويله إلى تطبيق APK.",
    "about.how_title": "كيف يعمل التطبيق؟",
    "about.step1": "اختر نوع الحيوان وحالته الإنتاجية من تبويب الحاسبة.",
    "about.step2": "أدخل وزن الحيوان (وإنتاج اللبن للأبقار الحلوب).",
    "about.step3": "تأكد من أسعار اليوم من تبويب الأسعار — عدّلها بأسعار سوقك.",
    "about.step4": "اختر عليقة متوازنة أو اقتصادية وشاهد التركيبة لحظياً.",
    "about.step5": "احفظ العليقة أو شاركها مع عامل المزرعة عبر واتساب.",
    "about.disclaimer_title": "إخلاء مسؤولية",
    "about.disclaimer":
      "القيم الغذائية والأهداف تقريبية لأغراض إرشادية، مبنية على متوسطات NRC ومعدّلة للسوق المصري. للقطعان الإنتاجية الكبيرة أو الحالات الخاصة (حمل، مرض، تغيّر مفاجئ في الإنتاج، حيوانات صغيرة) استشر أخصائي تغذية قبل التطبيق. التطبيق لا يُغني عن الاستشارة البيطرية المتخصصة.",
    "about.components_title": "المكوّنات المدعومة",
    "about.targets_title": "الأهداف الغذائية",
    "about.version": "عليقة · الإصدار ١.٠ · صُمّم للمربي المصري",

    // ---- feedback ----
    "feedback.title": "أرسل ملاحظة",
    "feedback.subject": "الموضوع",
    "feedback.message": "رسالتك",
    "feedback.rating": "تقييمك للتطبيق",
    "feedback.contact": "طريقة تواصل (اختياري)",
    "feedback.submit": "إرسال",
    "feedback.sent": "تم إرسال ملاحظتك — شكراً لك",
    "feedback.error": "تعذّر الإرسال — حاول مرة أخرى",
    "feedback.subject_required": "أدخل الموضوع",
    "feedback.message_required": "أدخل الرسالة",

    // ---- admin ----
    "admin.dashboard": "لوحة المعلومات",
    "admin.users": "المستخدمون",
    "admin.ads": "الإعلانات",
    "admin.settings": "الإعدادات",
    "admin.notifications": "الإشعارات",
    "admin.categories": "التصنيفات",
    "admin.analytics": "التحليلات",
    "admin.stats_total_users": "إجمالي المستخدمين",
    "admin.stats_active_users": "المستخدمون النشطون",
    "admin.stats_calculators": "الحاسبات",
    "admin.stats_ads": "الإعلانات",
    "admin.stats_active_ads": "إعلانات نشطة",
    "admin.stats_feedback": "الملاحظات",
    "admin.stats_open_feedback": "ملاحظات مفتوحة",
    "admin.stats_unread": "إشعارات غير مقروءة",
    "admin.no_access": "هذه الصفحة للمشرفين فقط",
    "admin.add": "إضافة",
    "admin.edit": "تعديل",
    "admin.save": "حفظ",
    "admin.cancel": "إلغاء",
    "admin.delete": "حذف",
    "admin.enabled": "مُفعّل",
    "admin.disabled": "مُعطّل",
    "admin.confirm_delete": "تأكيد الحذف؟",
    "admin.saved": "تم الحفظ",
    "admin.deleted": "تم الحذف",
    "admin.error": "تعذّر إكمال العملية",

    // ---- data categories ----
    "data.energy": "طاقة",
    "data.protein_cat": "بروتين",
    "data.energy_fiber": "طاقة/ألياف",
    "data.fiber_cat": "ألياف خشنة",
    "data.additive_cat": "إضافات",

    // ---- share text ----
    "share.brand": "عليقة — حاسبة العليقة الذكية",
    "share.animal": "الحيوان",
    "share.weight": "الوزن",
    "share.heads": "عدد الرؤوس",
    "share.birds": "عدد الطيور",
    "share.type": "النوع",
    "share.composition": "تركيبة العليقة",
    "share.daily_cost": "التكلفة اليومية",
    "share.monthly_cost": "التكلفة الشهرية",
    "share.per_head": "تكلفة الرأس/يوم",
    "share.per_bird": "تكلفة الطائر/يوم",
    "share.dmi": "المادة الجافة",
    "share.protein": "البروتين الخام",
    "share.energy": "الطاقة (TDN)",
    "share.fiber": "الألياف",
    "share.disclaimer": "قيم تقريبية لأغراض إرشادية. راجع أخصائي التغذية للقطعان الإنتاجية الكبيرة.",

    // ---- network / sync ----
    "net.offline_title": "أنت غير متصل",
    "net.offline_msg": "التطبيق يعمل أوفلاين — ستُزامن تغييراتك عند عودة الاتصال.",
    "net.online_title": "عاد الاتصال",
    "net.syncing": "جاري مزامنة التغييرات…",
    "net.synced": "تمت المزامنة",
    "net.sync_failed": "تعذّرت المزامنة — سنعيد المحاولة",
    "net.pending_changes": "{n} تغيير بانتظار المزامنة",
  },

  en: {
    // ---- common ----
    "common.app_name": "Aleeqa",
    "common.app_sub": "Smart Feed Calculator",
    "common.offline": "Offline",
    "common.free_offline": "Free · Offline · For Egyptian farmers",
    "common.egp": "EGP",
    "common.kg": "kg",
    "common.day": "day",
    "common.month": "month",
    "common.save": "Save",
    "common.share": "Share",
    "common.print": "Print",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.close": "Close",
    "common.reset": "Defaults",
    "common.updated": "Last updated",
    "common.default_prices": "Default prices",
    "common.back_home": "Home",
    "common.start_calc": "Start",
    "common.start_now": "Start calculating now",
    "common.pdf": "Export PDF",
    "common.whatsapp": "Share via WhatsApp",
    "common.retry": "Retry",
    "common.loading": "Loading…",
    "common.error": "Something went wrong",
    "common.empty": "No data",
    "common.yes": "Yes",
    "common.no": "No",
    "common.confirm": "Confirm",
    "common.back": "Back",
    "common.next": "Next",
    "common.done": "Done",
    "common.guest": "Guest",
    "common.admin": "Admin",
    "common.user": "User",
    "common.online": "Online",
    "common.synced": "Synced",
    "common.syncing": "Syncing…",
    "common.pending": "Pending sync",

    // ---- auth ----
    "auth.login": "Sign in",
    "auth.register": "Create account",
    "auth.forgot": "Forgot password?",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.full_name": "Full name",
    "auth.phone": "Phone",
    "auth.confirm_password": "Confirm password",
    "auth.sign_in_btn": "Sign in",
    "auth.sign_up_btn": "Create account",
    "auth.reset_btn": "Send reset link",
    "auth.guest_btn": "Continue as guest",
    "auth.no_account": "No account yet?",
    "auth.have_account": "Already have an account?",
    "auth.sign_up_link": "Sign up",
    "auth.sign_in_link": "Sign in",
    "auth.invalid_email": "Invalid email address",
    "auth.invalid_password": "Password must be at least 6 characters",
    "auth.password_mismatch": "Passwords do not match",
    "auth.login_success": "Signed in",
    "auth.login_error": "Sign-in failed — check your credentials",
    "auth.register_success": "Account created",
    "auth.register_error": "Registration failed — email may already be in use",
    "auth.reset_sent": "If the email exists, a reset link has been sent",
    "auth.reset_error": "Could not send reset link",
    "auth.logout": "Sign out",
    "auth.logout_confirm": "Sign out of your account?",
    "auth.guest_expired": "Guest session expired — please sign in to continue",
    "auth.welcome_back": "Welcome back",

    // ---- nav tabs ----
    "nav.home": "Home",
    "nav.calculator": "Calculator",
    "nav.favorites": "Favorites",
    "nav.history": "History",
    "nav.profile": "Profile",
    "nav.calculators": "Calculators",
    "nav.prices": "Prices",
    "nav.notifications": "Notifications",
    "nav.settings": "Settings",
    "nav.about": "About",
    "nav.feedback": "Feedback",
    "nav.admin": "Admin panel",

    // ---- home ----
    "home.greeting": "Hello",
    "home.subtitle": "Compute your cheapest ration in seconds",
    "home.quick_calc": "Quick calculator",
    "home.recent": "Recent calculations",
    "home.favorites_shortcut": "My favorite rations",
    "home.tips_title": "Tip of the day",
    "home.tip1": "Update market prices weekly for more accurate results.",
    "home.tip2": "Economy mode lowers cost while preserving nutrition.",
    "home.tip3": "Save the ration to revisit it with today's prices.",
    "home.no_recent": "No calculations yet — start your first",
    "home.ads_title": "Sponsored",

    // ---- calculator ----
    "calc.s1.title": "Pick the animal & production stage",
    "calc.s2.title": "Animal data",
    "calc.weight": "Weight",
    "calc.production": "Daily milk production",
    "calc.flock": "Flock size",
    "calc.dmi_label": "Dry matter intake (DMI)",
    "calc.dmi_flock_suffix": " — for the flock",
    "calc.s3.title": "Cost optimizer",
    "calc.s3.tip":
      "Economy mode relaxes protein, energy and roughage targets slightly so the engine picks cheaper alternatives — you'll see quantities change and savings in EGP.",
    "calc.balanced": "Balanced ration",
    "calc.balanced_sub": "Meets all nutritional targets",
    "calc.economy": "Economy ration",
    "calc.economy_sub": "Cheaper alternative, ~same value",
    "calc.diff_label": "Difference vs balanced:",
    "calc.s4.title": "Today's prices (editable)",
    "calc.s4.hint": "Change a price directly — the ration recomputes instantly with your market prices. Prices auto-save on your device.",
    "calc.result_title": "Suggested ration",
    "calc.result_manual": "Ration (manual edit)",
    "calc.lp_badge": "Solved with Linear Programming",
    "calc.manual_badge": "Manual edit",
    "calc.edit_btn": "Edit percentages manually",
    "calc.reset_auto": "Back to automatic",
    "calc.manual_toast": "Manual edit mode — adjust percentages and see changes live",
    "calc.saved_toast": "Ration saved to your favorites",
    "calc.no_export": "No ration to export",
    "calc.no_save": "Cannot save an infeasible ration",
    "calc.save_fail": "Save failed — delete old rations and try again",
    "calc.saved_count": "You have {n} saved rations",
    "calc.compute_btn": "Compute ration",
    "calc.disclaimer":
      "Values are approximate, for advisory purposes, on an as-fed basis. For large production flocks or special cases (pregnancy, disease, sudden production change) consult a nutritionist. Targets are based on NRC averages, tuned for the Egyptian market.",

    // ---- manual editor ----
    "manual.protein": "Protein",
    "manual.energy": "Energy",
    "manual.fiber": "Fiber",
    "manual.cost_day": "Cost/day",
    "manual.sum_label": "Sum of percentages",
    "manual.over": "Over by {n}% — reduce",
    "manual.under": "Under by {n}% — add more",
    "manual.save": "Save ration",

    // ---- ration result ----
    "result.dmi_day": "Dry matter/day",
    "result.protein": "Crude protein",
    "result.energy": "Energy (TDN)",
    "result.fiber": "Crude fiber",
    "result.target_ge": "Target ≥ {n}%",
    "result.max_le": "Max {n}%",
    "result.cost_daily": "Daily cost",
    "result.cost_monthly": "Monthly cost",
    "result.cost_flock": "for the flock",
    "result.cost_per_kg": "Cost per kg",
    "result.cost_per_head": "Cost per head/day",
    "result.cost_per_bird": "Cost per bird/day",
    "result.savings": "Savings",
    "result.savings_sub": "{n}% lower daily",
    "result.components_title": "Component breakdown",
    "result.chart_title": "Ration percentages",
    "result.infeasible": "Could not formulate a ration with these constraints",
    "result.infeasible_desc": "Try widening the bounds or check your prices.",
    "result.heads_in_flock": "Heads in the flock",
    "result.birds_in_flock": "Birds in the flock",
    "result.warnings_title": "Notes",
    "result.save_btn": "Save to favorites",
    "result.share_btn": "Share",
    "result.print_btn": "Export PDF",

    // ---- prices ----
    "prices.title": "Egyptian market ingredient prices",
    "prices.subtitle_count": "{n} rations saved on your device",
    "prices.subtitle_none": "Default prices — adjust to your market",
    "prices.default_hint": "Default price: {n} EGP/kg",
    "prices.note":
      "Prices auto-save on your device and the app works offline. When online, you can update them manually with your weekly market prices. The ration recomputes instantly on every price change.",
    "prices.invalid": "Enter a valid price",
    "prices.saved": "Updated price of {name}",
    "prices.reset_done": "Prices reset to defaults",
    "prices.reset_btn": "Reset to default prices",
    "prices.egp_per_kg": "EGP/kg",
    "prices.updated_at": "Last updated: {date}",

    // ---- favorites ----
    "favorites.title": "My favorite rations",
    "favorites.subtitle_n": "{n} saved rations",
    "favorites.subtitle_0": "No saved rations yet",
    "favorites.empty_title": "No saved rations",
    "favorites.empty_desc": "Compute a ration from the Calculator tab, then tap Save to see it here.",
    "favorites.view": "View",
    "favorites.delete": "Delete",
    "favorites.delete_title": "Delete ration?",
    "favorites.delete_desc": "This cannot be undone. The ration will be permanently removed.",
    "favorites.deleted_toast": "Ration deleted",
    "favorites.mode_balanced": "Balanced",
    "favorites.mode_economy": "Economy",

    // ---- history ----
    "history.title": "Calculation history",
    "history.subtitle_n": "{n} calculations",
    "history.subtitle_0": "No history yet",
    "history.empty_title": "History is empty",
    "history.empty_desc": "Every calculation you run will appear here.",
    "history.clear_btn": "Clear history",
    "history.clear_confirm": "Clear all history?",
    "history.cleared": "History cleared",
    "history.reuse": "Re-run",

    // ---- notifications ----
    "notifications.title": "Notifications",
    "notifications.empty": "No notifications",
    "notifications.mark_all_read": "Mark all as read",
    "notifications.marked_read": "Marked as read",
    "notifications.unread_count": "{n} unread",

    // ---- settings ----
    "settings.title": "Settings",
    "settings.language": "Language",
    "settings.arabic": "العربية",
    "settings.english": "English",
    "settings.theme": "Theme",
    "settings.light": "Light",
    "settings.dark": "Dark",
    "settings.system": "System",
    "settings.account": "Account",
    "settings.about": "About the app",
    "settings.feedback": "Send feedback",
    "settings.logout": "Sign out",
    "settings.privacy": "Privacy",
    "settings.privacy_desc": "Your data is stored on your device. We never share it with third parties.",
    "settings.notifications": "Notifications",
    "settings.notifications_enable": "Enable notifications",
    "settings.cache": "Storage",
    "settings.clear_cache": "Clear cache",
    "settings.cache_cleared": "Cache cleared",
    "settings.version": "Version {v}",
    "settings.premium": "Upgrade to premium",
    "settings.premium_desc": "Unlock extra features and support development.",

    // ---- profile ----
    "profile.title": "My profile",
    "profile.name": "Name",
    "profile.email": "Email",
    "profile.phone": "Phone",
    "profile.role": "Role",
    "profile.joined": "Joined",
    "profile.edit": "Edit profile",
    "profile.save": "Save",
    "profile.saved": "Profile updated",
    "profile.subscription": "Subscription",
    "profile.plan_free": "Free",
    "profile.plan_pro": "Pro",
    "profile.plan_premium": "Premium",

    // ---- about ----
    "about.title": "About the app",
    "about.tagline": "Smart feed calculator for Egyptian farmers",
    "about.intro":
      "A free technical tool that helps Egyptian cattle, buffalo, sheep, and poultry farmers formulate rations with scientific accuracy at the lowest cost, based on Egyptian market ingredients. The app sells nothing and supplies nothing — it's a pure calculation tool.",
    "about.f1.t": "Real LP engine",
    "about.f1.d": "Solves the cheapest balanced ration via a Simplex algorithm on your own device — no servers, no waiting.",
    "about.f2.t": "Works offline",
    "about.f2.d": "All calculations, prices, and rations are stored locally. Suited for farms with weak connectivity.",
    "about.f3.t": "Cost optimizer",
    "about.f3.d": "Rearranges ingredients to pick cheaper alternatives with roughly the same nutritional value.",
    "about.f4.t": "Mobile-ready",
    "about.f4.d": "A mobile-first design that can be installed to the home screen or wrapped as an APK.",
    "about.how_title": "How does the app work?",
    "about.step1": "Pick the animal type and production stage from the Calculator tab.",
    "about.step2": "Enter the animal's weight (and milk production for dairy cows).",
    "about.step3": "Check today's prices in the Prices tab — adjust to your market.",
    "about.step4": "Choose balanced or economy and see the ration instantly.",
    "about.step5": "Save the ration or share it with farm workers via WhatsApp.",
    "about.disclaimer_title": "Disclaimer",
    "about.disclaimer":
      "Nutritional values and targets are approximate, for advisory purposes, based on NRC averages tuned for the Egyptian market. For large production flocks or special cases (pregnancy, disease, sudden production change, young animals) consult a nutritionist before applying. The app does not replace specialized veterinary consultation.",
    "about.components_title": "Supported ingredients",
    "about.targets_title": "Nutritional targets",
    "about.version": "Aleeqa · Version 1.0 · Built for Egyptian farmers",

    // ---- feedback ----
    "feedback.title": "Send feedback",
    "feedback.subject": "Subject",
    "feedback.message": "Message",
    "feedback.rating": "Your rating",
    "feedback.contact": "Contact (optional)",
    "feedback.submit": "Submit",
    "feedback.sent": "Feedback sent — thank you",
    "feedback.error": "Could not send — try again",
    "feedback.subject_required": "Enter a subject",
    "feedback.message_required": "Enter a message",

    // ---- admin ----
    "admin.dashboard": "Dashboard",
    "admin.users": "Users",
    "admin.ads": "Ads",
    "admin.settings": "Settings",
    "admin.notifications": "Notifications",
    "admin.categories": "Categories",
    "admin.analytics": "Analytics",
    "admin.stats_total_users": "Total users",
    "admin.stats_active_users": "Active users",
    "admin.stats_calculators": "Calculators",
    "admin.stats_ads": "Ads",
    "admin.stats_active_ads": "Active ads",
    "admin.stats_feedback": "Feedback",
    "admin.stats_open_feedback": "Open feedback",
    "admin.stats_unread": "Unread notifications",
    "admin.no_access": "Admin access only",
    "admin.add": "Add",
    "admin.edit": "Edit",
    "admin.save": "Save",
    "admin.cancel": "Cancel",
    "admin.delete": "Delete",
    "admin.enabled": "Enabled",
    "admin.disabled": "Disabled",
    "admin.confirm_delete": "Confirm delete?",
    "admin.saved": "Saved",
    "admin.deleted": "Deleted",
    "admin.error": "Operation failed",

    // ---- data categories ----
    "data.energy": "Energy",
    "data.protein_cat": "Protein",
    "data.energy_fiber": "Energy/Fiber",
    "data.fiber_cat": "Roughage",
    "data.additive_cat": "Additive",

    // ---- share text ----
    "share.brand": "Aleeqa — Smart Feed Calculator",
    "share.animal": "Animal",
    "share.weight": "Weight",
    "share.heads": "Heads",
    "share.birds": "Birds",
    "share.type": "Type",
    "share.composition": "Ration composition",
    "share.daily_cost": "Daily cost",
    "share.monthly_cost": "Monthly cost",
    "share.per_head": "Cost/head/day",
    "share.per_bird": "Cost/bird/day",
    "share.dmi": "Dry matter",
    "share.protein": "Crude protein",
    "share.energy": "Energy (TDN)",
    "share.fiber": "Fiber",
    "share.disclaimer": "Approximate values for advisory purposes. Consult a nutritionist for large production flocks.",

    // ---- network / sync ----
    "net.offline_title": "You're offline",
    "net.offline_msg": "The app is running offline — your changes will sync when you reconnect.",
    "net.online_title": "Back online",
    "net.syncing": "Syncing changes…",
    "net.synced": "Synced",
    "net.sync_failed": "Sync failed — we'll retry",
    "net.pending_changes": "{n} changes pending sync",
  },
};

/* ================================================================== */
/*  Helpers                                                            */
/* ================================================================== */

export function translate(
  lang: Lang,
  key: string,
  vars?: Record<string, string | number>
): string {
  let str = DICT[lang]?.[key] ?? DICT.ar[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }
  return str;
}

export function getDir(lang: Lang): Dir {
  return lang === "ar" ? "rtl" : "ltr";
}

export function isRTL(lang: Lang): boolean {
  return lang === "ar";
}

/** Persist + apply the language (RN I18nManager + AsyncStorage). */
export async function persistLang(lang: Lang): Promise<void> {
  try {
    await AsyncStorage.setItem(LANG_KEY, lang);
    const isRtl = lang === "ar";
    if (I18nManager.isRTL !== isRtl) {
      I18nManager.forceRTL(isRtl);
      // Note: changing RTL at runtime requires a reload on native.
    }
  } catch {
    /* ignore */
  }
}

export async function loadLang(): Promise<Lang> {
  try {
    const v = await AsyncStorage.getItem(LANG_KEY);
    return v === "en" || v === "ar" ? v : "ar";
  } catch {
    return "ar";
  }
}

/* ================================================================== */
/*  Hook — useLang()                                                   */
/* ================================================================== */

export interface UseLang {
  lang: Lang;
  dir: Dir;
  isRTL: boolean;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

export function useLang(initial: Lang = "ar"): UseLang {
  const [lang, setLangState] = useState<Lang>(initial);

  useEffect(() => {
    let mounted = true;
    loadLang().then((l) => {
      if (mounted && l !== lang) setLangState(l);
    });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    void persistLang(l);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "ar" ? "en" : "ar";
      void persistLang(next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) =>
      translate(lang, key, vars),
    [lang]
  );

  return {
    lang,
    dir: getDir(lang),
    isRTL: isRTL(lang),
    setLang,
    toggleLang,
    t,
  };
}
