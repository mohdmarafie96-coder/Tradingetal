/**
 * Pro's own strings. The course's i18n file stays where it is — these are
 * different words for a different product — but the language codes, the
 * direction map and the rule that UI text never gets hard-coded are shared.
 */

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

  signInTitle: string;
  signInLede: string;
  email: string;
  password: string;
  signInAction: string;
  signUpAction: string;
  signInSwitchToUp: string;
  signInSwitchToIn: string;
  courseAccountNote: string;
  checkEmail: string;
  passwordTooShort: string;

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

  signInTitle: 'Sign in to Pro',
  signInLede:
    'Pro reads your own trades and checks them against the risk rules the course teaches. It never places a trade and never tells you what to buy.',
  email: 'Email',
  password: 'Password',
  signInAction: 'Sign in',
  signUpAction: 'Create account',
  signInSwitchToUp: 'New here? Create an account.',
  signInSwitchToIn: 'Already have an account? Sign in.',
  courseAccountNote:
    'Your course account works here — the same email and password. You are asked to sign in again because the two sites sit on different addresses for now.',
  checkEmail: 'Check your email to confirm the address, then sign in.',
  passwordTooShort: 'Use at least 8 characters.',

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

  signInTitle: 'تسجيل الدخول إلى Pro',
  signInLede:
    'يقرأ Pro صفقاتك أنت ويفحصها وفق قواعد المخاطرة التي تعلّمها الدورة. لا ينفّذ صفقة أبدًا ولا يخبرك بما تشتري.',
  email: 'البريد الإلكتروني',
  password: 'كلمة المرور',
  signInAction: 'تسجيل الدخول',
  signUpAction: 'إنشاء حساب',
  signInSwitchToUp: 'أول مرة هنا؟ أنشئ حسابًا.',
  signInSwitchToIn: 'لديك حساب بالفعل؟ سجّل الدخول.',
  courseAccountNote:
    'حسابك في الدورة يعمل هنا — البريد وكلمة المرور نفسهما. نطلب منك تسجيل الدخول مرة أخرى لأن الموقعين على عنوانين مختلفين في الوقت الحالي.',
  checkEmail: 'تحقّق من بريدك لتأكيد العنوان، ثم سجّل الدخول.',
  passwordTooShort: 'استخدم ٨ أحرف على الأقل.',

  dashboardTitle: 'لوحة المتابعة',
  noAccountYet: 'لم تُنشئ حساب تداول بعد.',
  createTradingAccount: 'أنشئ حساب تداول',
};

const TABLE: Record<Lang, Strings> = { en, ar };

export function stringsFor(lang: Lang): Strings {
  return TABLE[lang];
}
