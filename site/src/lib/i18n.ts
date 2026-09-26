/**
 * Pro's own strings. The course's i18n file stays where it is — these are
 * different words for a different product — but the language codes, the
 * direction map and the rule that UI text never gets hard-coded are shared.
 */

import type { AuthError } from '@course/lib/auth-errors';

export const LANGS = ['en', 'ar'] as const;
export type Lang = (typeof LANGS)[number];

export const DIR: Record<Lang, 'ltr' | 'rtl'> = { en: 'ltr', ar: 'rtl' };
export const LANG_LABEL: Record<Lang, string> = { en: 'English', ar: 'العربية' };

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

export interface Strings {
  pro: string;
  tagline: string;
  notAdvice: string;

  navDashboard: string;
  navJournal: string;
  navInstruments: string;
  navSettings: string;
  signIn: string;
  signOut: string;
  createAccount: string;
  switchLang: string;
  backToCourse: string;
  privacyLink: string;

  signInTitle: string;
  signInLede: string;
  email: string;
  password: string;
  signInAction: string;
  signUpAction: string;
  signInSwitchToUp: string;
  signInSwitchToIn: string;
  forgotPassword: string;
  courseAccountNote: string;
  checkEmail: string;
  passwordTooShort: string;
  /** Keyed by the course's own classifier, so both apps name a cause the same way. */
  authErrors: Record<Exclude<AuthError, null>, string>;

  notFoundTitle: string;
  notFoundBody: string;

  soonKicker: string;
  soonTitle: string;
  soonLede: string;
  soonNote: string;
  soonAction: string;
  notFoundHome: string;

  upgradeTitle: string;
  upgradeLede: string;
  priceLabel: string;
  pricePer: Record<'month' | 'year' | 'once', string>;
  priceUnset: string;
  howToPay: string;
  noInstructions: string;
  referenceLabel: string;
  referenceHint: string;
  requestAction: string;
  pendingTitle: string;
  pendingBody: string;
  yourReference: string;
  updateReference: string;
  rejectedNote: string;
  revokedNote: string;
  requestFailed: string;

  dashboardTitle: string;
  noAccountYet: string;
  createTradingAccount: string;
}

const en: Strings = {
  pro: 'Trading et al. Pro',
  tagline: 'Coaching and risk analysis for your own trading',
  notAdvice: 'Education, not financial advice. CFDs are complex, leveraged products and most retail traders lose money.',

  navDashboard: 'Dashboard',
  navJournal: 'Journal',
  navInstruments: 'Instruments',
  navSettings: 'Settings',
  signIn: 'Sign in',
  signOut: 'Sign out',
  createAccount: 'Create an account',
  switchLang: 'Switch language',
  backToCourse: 'The course',
  privacyLink: 'Privacy policy',

  signInTitle: 'Sign in to Pro',
  signInLede:
    'Pro reads your own trades and checks them against the risk rules the course teaches. It never places a trade and never tells you what to buy.',
  email: 'Email',
  password: 'Password',
  signInAction: 'Sign in',
  signUpAction: 'Create account',
  signInSwitchToUp: 'New here? Create an account.',
  signInSwitchToIn: 'Already have an account? Sign in.',
  forgotPassword: 'Forgot password?',
  courseAccountNote:
    'Your course account works here — the same email and password. You are asked to sign in again because the two sites sit on different addresses for now.',
  checkEmail: 'Check your email to confirm the address, then sign in.',
  passwordTooShort: 'Use at least 8 characters.',
  authErrors: {
    'bad-credentials': 'That email and password do not match an account.',
    'already-registered': 'There is already an account with that email. Sign in instead.',
    'weak-password': 'That password is too short. Use at least 8 characters.',
    'same-password': 'That is your current password. Choose a different one.',
    'invalid-email': 'That does not look like an email address.',
    'rate-limited': 'Too many attempts. Wait a minute and try again.',
    'provider-disabled': 'That sign-in method is not switched on yet.',
    network: 'Could not reach the server. Check your connection and try again.',
    failed: 'That did not work. Please try again.',
  },

  notFoundTitle: 'Page not found',
  notFoundBody: 'There is no page at this address.',

  soonKicker: 'Coming soon',
  soonTitle: 'Pro is on its way',
  soonLede:
    'Coaching and risk checks on your own trades: a trade journal, position sizing and risk rules worked out for you, and a coach that reviews your habits.',
  soonNote: 'Pro is not open yet. The course stays free, so keep learning while it is finished.',
  soonAction: 'Back to the course',
  notFoundHome: 'Go to the dashboard',

  upgradeTitle: 'Upgrade to Pro',
  upgradeLede:
    'Pro checks your own trades against the risk rules the course teaches, and coaches you on your process. Pay by the method below, tell us your payment reference, and an admin switches Pro on once the payment is confirmed.',
  priceLabel: 'Price',
  pricePer: { month: 'a month', year: 'a year', once: 'once' },
  priceUnset: 'The price has not been published yet.',
  howToPay: 'How to pay',
  noInstructions: 'Payment instructions have not been published yet. Please check back soon.',
  referenceLabel: 'Payment reference',
  referenceHint: 'The reference or transaction number from your payment, so it can be matched to you.',
  requestAction: 'I have paid — request access',
  pendingTitle: 'Awaiting approval',
  pendingBody:
    'Your request is in. An admin checks the payment and switches Pro on. You will see Pro here as soon as that happens.',
  yourReference: 'Your reference',
  updateReference: 'Update reference',
  rejectedNote: 'Your last request was not approved. If you think that is a mistake, send a new request with your payment reference.',
  revokedNote: 'Your Pro access has ended. You can request it again below.',
  requestFailed: 'That did not go through. Please try again.',

  dashboardTitle: 'Dashboard',
  noAccountYet: 'No trading account set up yet.',
  createTradingAccount: 'Set up a trading account',
};

const ar: Strings = {
  pro: 'Trading et al. Pro',
  tagline: 'تدريب وتحليل للمخاطر على تداولك أنت',
  notAdvice: 'تعليم لا نصيحة مالية. عقود الفروقات أدوات معقّدة ذات رافعة، وأغلب المتداولين الأفراد يخسرون أموالهم.',

  navDashboard: 'لوحة المتابعة',
  navJournal: 'السجل',
  navInstruments: 'الأدوات',
  navSettings: 'الإعدادات',
  signIn: 'تسجيل الدخول',
  signOut: 'تسجيل الخروج',
  createAccount: 'أنشئ حسابًا',
  switchLang: 'تغيير اللغة',
  backToCourse: 'الدورة',
  privacyLink: 'سياسة الخصوصية',

  signInTitle: 'تسجيل الدخول إلى Pro',
  signInLede:
    'يقرأ Pro صفقاتك أنت ويفحصها وفق قواعد المخاطرة التي تعلّمها الدورة. لا ينفّذ صفقة أبدًا ولا يخبرك بما تشتري.',
  email: 'البريد الإلكتروني',
  password: 'كلمة المرور',
  signInAction: 'تسجيل الدخول',
  signUpAction: 'إنشاء حساب',
  signInSwitchToUp: 'أول مرة هنا؟ أنشئ حسابًا.',
  signInSwitchToIn: 'لديك حساب بالفعل؟ سجّل الدخول.',
  forgotPassword: 'نسيت كلمة المرور؟',
  courseAccountNote:
    'حسابك في الدورة يعمل هنا — البريد وكلمة المرور نفسهما. نطلب منك تسجيل الدخول مرة أخرى لأن الموقعين على عنوانين مختلفين في الوقت الحالي.',
  checkEmail: 'تحقّق من بريدك لتأكيد العنوان، ثم سجّل الدخول.',
  passwordTooShort: 'استخدم ٨ أحرف على الأقل.',
  authErrors: {
    'bad-credentials': 'لا يطابق هذا البريد وكلمة المرور أي حساب.',
    'already-registered': 'يوجد حساب بهذا البريد بالفعل. سجّل الدخول بدلًا من ذلك.',
    'weak-password': 'كلمة المرور قصيرة جدًّا. استخدم ثمانية أحرف على الأقل.',
    'same-password': 'هذه كلمة مرورك الحالية. اختر كلمة مختلفة.',
    'invalid-email': 'هذا لا يبدو عنوان بريد إلكتروني.',
    'rate-limited': 'محاولات كثيرة جدًّا. انتظر دقيقة ثم أعد المحاولة.',
    'provider-disabled': 'طريقة الدخول هذه غير مفعَّلة بعد.',
    network: 'تعذّر الوصول إلى الخادم. تحقّق من اتصالك ثم أعد المحاولة.',
    failed: 'لم ينجح ذلك. أعد المحاولة من فضلك.',
  },

  notFoundTitle: 'الصفحة غير موجودة',
  notFoundBody: 'لا توجد صفحة على هذا العنوان.',

  soonKicker: 'قريبًا',
  soonTitle: 'Pro في الطريق',
  soonLede:
    'تدريب وفحص للمخاطر على صفقاتك أنت: سجلّ للصفقات، وحجم المركز وقواعد المخاطر محسوبة لك، ومدرّب يراجع عاداتك في التداول.',
  soonNote: 'لم يُفتح Pro بعد. تبقى الدورة مجانية، فتابع التعلّم ريثما يكتمل.',
  soonAction: 'العودة إلى الدورة',
  notFoundHome: 'إلى لوحة المتابعة',

  upgradeTitle: 'الترقية إلى Pro',
  upgradeLede:
    'يفحص Pro صفقاتك أنت وفق قواعد المخاطرة التي تعلّمها الدورة، ويدرّبك على طريقتك في التداول. ادفع بالطريقة الموضّحة أدناه، وأرسل لنا مرجع الدفع، وسيُفعِّل المشرف Pro بعد تأكيد الدفع.',
  priceLabel: 'السعر',
  pricePer: { month: 'شهريًا', year: 'سنويًا', once: 'مرة واحدة' },
  priceUnset: 'لم يُعلَن السعر بعد.',
  howToPay: 'طريقة الدفع',
  noInstructions: 'لم تُنشر تعليمات الدفع بعد. يُرجى العودة قريبًا.',
  referenceLabel: 'مرجع الدفع',
  referenceHint: 'المرجع أو رقم العملية من دفعتك، لنتمكّن من مطابقتها معك.',
  requestAction: 'دفعتُ — أطلب التفعيل',
  pendingTitle: 'بانتظار الموافقة',
  pendingBody: 'وصلنا طلبك. يتحقّق المشرف من الدفع ثم يفعّل Pro، وستجده هنا فور ذلك.',
  yourReference: 'مرجعك',
  updateReference: 'تحديث المرجع',
  rejectedNote: 'لم تتم الموافقة على طلبك الأخير. إن كنت ترى أن ذلك خطأ، فأرسل طلبًا جديدًا مع مرجع الدفع.',
  revokedNote: 'انتهى اشتراكك في Pro. يمكنك طلبه مجددًا أدناه.',
  requestFailed: 'لم يتم ذلك. أعد المحاولة من فضلك.',

  dashboardTitle: 'لوحة المتابعة',
  noAccountYet: 'لم تُنشئ حساب تداول بعد.',
  createTradingAccount: 'أنشئ حساب تداول',
};

const TABLE: Record<Lang, Strings> = { en, ar };

export function stringsFor(lang: Lang): Strings {
  return TABLE[lang];
}
