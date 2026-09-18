import { useCallback } from 'react';

export type Lang = 'en' | 'ar';

export const LANGS: Lang[] = ['en', 'ar'];

export const LANG_LABEL: Record<Lang, string> = {
  en: 'English',
  ar: 'العربية',
};

export const DIR: Record<Lang, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ar: 'rtl',
};

interface Strings {
  brandSub: string;
  progress: string;
  modules: string;
  reference: string;
  templates: string;
  riskDisclosure: string;
  calculator: string;
  tools: string;
  course: string;
  module: string;
  quiz: string;
  start: string;
  search: string;
  searchPlaceholder: string;
  searchHint: string;
  searchLoading: string;
  searchNoResults: string;
  onThisPage: string;
  minRead: string;
  markComplete: string;
  completed: string;
  previous: string;
  next: string;
  notFound: string;
  notFoundBody: string;
  backToCourse: string;
  openNav: string;
  toDark: string;
  toLight: string;
  switchLang: string;
  pageLoadFailed: string;
  pendingTitle: string;
  pendingBody: string;
  pendingCta: string;

  heroTitle: string;
  heroLede: string;
  riskCardTitle: string;
  riskCardBody1: string;
  riskCardBody2: string;
  readFullDisclosure: string;
  startCourse: string;
  continueAt: string;
  openCalculator: string;
  statModules: string;
  statLessons: string;
  statTime: string;
  statCompleted: string;
  studyTime: string;
  curriculum: string;
  homeFooter1: string;
  homeFooter2: string;

  gateKicker: string;
  gateTitle: string;
  gateStatNum: string;
  gateStatText: string;
  gateP1a: string;
  gateP1b: string;
  gateP2a: string;
  gateP2b: string;
  gateP3a: string;
  gateP3b: string;
  gateP4a: string;
  gateP4b: string;
  gateButton: string;
  gateFoot: string;

  signInKicker: string;
  signInLede: string;
  signInWhyTitle: string;
  signInWhy1: string;
  signInWhy2: string;
  signInWhy3: string;
  signInButton: string;
  signInBusy: string;
  signInProviders: string;
  signInBlocked: string;
  signInClosed: string;
  signInFailed: string;
  signInRetry: string;
  signOut: string;
  account: string;

  quizClosedBook: string;
  quizCalculatorNote: string;
  quizSelectOne: string;
  quizSelectAll: string;
  quizQuestions: string;
  quizPassMark: string;
  quizSubmit: string;
  quizSubmitting: string;
  quizAnswerAll: string;
  quizUnanswered: string;
  quizScore: string;
  quizPassed: string;
  quizNotPassed: string;
  quizRetake: string;
  quizReview: string;
  quizYourAnswer: string;
  quizCorrectAnswer: string;
  quizNoAnswer: string;
  quizWhy: string;
  quizCorrectLabel: string;
  quizIncorrectLabel: string;
  quizAttempts: string;
  quizBest: string;
  quizLatest: string;
  quizAttemptsNote: string;
  quizPartTable: string;
  quizPartFloor: string;
  quizPartFloorMissed: string;
  quizSaveFailed: string;
  quizLoadFailed: string;
  quizRetry: string;
  quizLoading: string;
  quizShowPaper: string;

  keyIntro: string;
  keyLocked: string;
  keyLockedBody: string;
  keyOpenQuiz: string;
  keyUnlocked: string;
  keyShow: string;
  keyHide: string;
  keyQuestion: string;
  keyLoading: string;

  syncFailed: string;

  calcIntro: string;
  tabSize: string;
  tabMargin: string;
  tabExpectancy: string;
  tabDrawdown: string;
  fAccountEquity: string;
  fRiskPct: string;
  fRiskPctHint: string;
  fEntry: string;
  fStop: string;
  fPipSize: string;
  fPipSizeHint: string;
  fPipValue: string;
  fPipValueHint: string;
  fCost: string;
  fCostHint: string;
  fUnits: string;
  fUnitsHint: string;
  fPrice: string;
  fLeverage: string;
  fLeverageHint: string;
  fWinRate: string;
  fAvgWin: string;
  fAvgLoss: string;
  fAvgLossHint: string;
  fCostR: string;
  fTrades: string;
  fDrawdownPct: string;
  fLosses: string;
  rPositionSize: string;
  rLots: string;
  rRiskBudget: string;
  rStopDistance: string;
  rPips: string;
  rUnits: string;
  rPipValueOnPosition: string;
  rActualRisk: string;
  rActualRiskPct: string;
  rCostRatio: string;
  rEffectiveLeverage: string;
  rClassification: string;
  rNotional: string;
  rMarginRequired: string;
  rMarginRequirement: string;
  rFreeMargin: string;
  rMarginLevel: string;
  rWipeout: string;
  rNetExpectancy: string;
  rVerdict: string;
  rViable: string;
  rNotViable: string;
  rGrossExpectancy: string;
  rRewardToRisk: string;
  rBreakeven: string;
  rTotalOver: string;
  rRecoveryGain: string;
  rAssessment: string;
  rLosingStreak: string;
  rRemaining: string;
  rStreakDrawdown: string;
  rGainToRecover: string;
  clsRuin: string;
  clsSevere: string;
  clsAggressive: string;
  clsModerate: string;
  clsConservative: string;
  ddDouble: string;
  ddHard: string;
  ddOk: string;
  warnBelowMin: string;
  warnCostRatio: string;
  infoRoundDown: string;
  infoLeverage: string;
  infoWinRate: string;
  infoStreak: string;
  seeModule: string;
}

const en: Strings = {
  brandSub: 'Manuals · Calculators · Risk',
  progress: 'Progress',
  modules: 'Modules',
  reference: 'Reference',
  templates: 'Templates',
  riskDisclosure: 'Risk disclosure',
  calculator: 'Calculator',
  tools: 'Tools',
  course: 'Course',
  module: 'Module',
  quiz: 'Quiz',
  start: 'Start',
  search: 'Search',
  searchPlaceholder: 'Search the course…',
  searchHint: 'Type at least two characters. Try “margin”, “pip value” or “expectancy”.',
  searchLoading: 'Loading the index…',
  searchNoResults: 'No results for',
  onThisPage: 'On this page',
  minRead: 'min read',
  markComplete: 'Mark complete',
  completed: 'Completed',
  previous: 'Previous',
  next: 'Next',
  notFound: 'Page not found',
  notFoundBody: 'That page does not exist.',
  backToCourse: 'Return to the course overview',
  openNav: 'Open navigation',
  toDark: 'Switch to dark theme',
  toLight: 'Switch to light theme',
  switchLang: 'Switch to Arabic',
  pageLoadFailed: 'This page could not be loaded.',
  pendingTitle: 'Translation in progress',
  pendingBody: 'This page has not been translated yet. The English original is complete.',
  pendingCta: 'Read this page in English',

  heroTitle: 'CFD Trading Fundamentals',
  heroLede:
    'A complete, self-paced course on Contracts for Difference: what the contract is, how the arithmetic works, what it costs, how leverage and margin behave, and how to build and test a trading plan. No prior experience assumed. No money required.',
  riskCardTitle: 'Before anything else',
  riskCardBody1:
    '70% to 85% of retail CFD accounts lose money. That figure is audited and legally required to be published by regulated brokers in the UK, EU and Australia, and it is stable across rising and falling markets.',
  riskCardBody2:
    'This course is education, not financial advice, and it will not make you money. CFDs are not available to retail clients in the United States.',
  readFullDisclosure: 'Read the full risk disclosure',
  startCourse: 'Start the course',
  continueAt: 'Continue',
  openCalculator: 'Open the calculator',
  statModules: 'Modules',
  statLessons: 'Lessons and quizzes',
  statTime: 'Study time',
  statCompleted: 'Completed',
  studyTime: '~40h',
  curriculum: 'Curriculum',
  homeFooter1:
    'Work the modules in order. The arithmetic in Modules 3 and 4 carries everything after it. If you read only one module, read',
  homeFooter2:
    '— it determines whether an account survives long enough for anything else to matter.',

  gateKicker: 'Read before you begin',
  gateTitle: 'This course is about a product that loses most people money.',
  gateStatNum: '70–85%',
  gateStatText:
    'of retail Contract for Difference accounts lose money. That is not marketing caution. It is an audited figure that regulated brokers in the UK, EU and Australia are legally required to publish, and it barely moves between rising and falling markets.',
  gateP1a: 'Losing is the default outcome',
  gateP1b:
    ', not the result of insufficient effort. Everything taught here follows from taking that seriously.',
  gateP2a: 'This is education, not financial advice.',
  gateP2b: ' Nothing here recommends any instrument, strategy or broker.',
  gateP3a: 'CFDs are not available to retail clients in the United States.',
  gateP3b: ' The material is still useful as an explanation of leverage and margin.',
  gateP4a: 'Every practical exercise runs on a demo account.',
  gateP4b:
    ' You need no money to take this course, and deciding not to trade is a successful outcome.',
  gateButton: 'I understand — start the course',
  gateFoot:
    'If trading ever stops feeling like a decision — chasing losses, hiding it from people close to you, or trading money you said you would not — support is listed in the full risk disclosure, which is the first page of the course.',

  signInKicker: 'Sign in to continue',
  signInLede:
    'The course is free and self-paced. An account is what keeps your progress and your quiz results, so you can stop on one device and carry on from another.',
  signInWhyTitle: 'What the account is for',
  signInWhy1: 'Your place in the course, saved as you read.',
  signInWhy2: 'Every quiz attempt, marked and kept, with the answers unlocked once you have sat the paper.',
  signInWhy3: 'Nothing else. No payment, no trading account, and nothing is sold to a broker.',
  signInButton: 'Sign in',
  signInBusy: 'Opening sign-in\u2026',
  signInProviders: 'Continue with Google, Apple or X.',
  signInBlocked: 'Your browser blocked the sign-in window. Allow pop-ups for this site and try again.',
  signInClosed: 'The sign-in window closed before it finished.',
  signInFailed: 'Sign-in did not complete. Please try again.',
  signInRetry: 'Try again',
  signOut: 'Sign out',
  account: 'Account',

  quizClosedBook: 'Closed book. Your answers are marked when you submit, not before.',
  quizCalculatorNote: 'Calculator permitted.',
  quizSelectOne: 'Select one',
  quizSelectAll: 'Select all that apply',
  quizQuestions: 'questions',
  quizPassMark: 'Pass mark',
  quizSubmit: 'Submit answers',
  quizSubmitting: 'Marking\u2026',
  quizAnswerAll: 'Answer every question before submitting.',
  quizUnanswered: '{} still unanswered',
  quizScore: 'Score',
  quizPassed: 'Passed',
  quizNotPassed: 'Below the pass mark',
  quizRetake: 'Take it again',
  quizReview: 'Your marked paper',
  quizYourAnswer: 'You answered',
  quizCorrectAnswer: 'Correct answer',
  quizNoAnswer: 'No answer given',
  quizWhy: 'Why',
  quizCorrectLabel: 'Correct',
  quizIncorrectLabel: 'Incorrect',
  quizAttempts: 'Attempts',
  quizBest: 'Best',
  quizLatest: 'Latest',
  quizAttemptsNote: 'Attempts are unlimited and every one is kept. The best and the most recent are both shown, because a score you cannot repeat is not a score.',
  quizPartTable: 'By part',
  quizPartFloor: 'needs {}%',
  quizPartFloorMissed: 'This part is below its own floor, so the paper is not passed whatever the total.',
  quizSaveFailed: 'Your answers could not be marked. Check your connection and submit again.',
  quizLoadFailed: 'This paper could not be loaded.',
  quizRetry: 'Try again',
  quizLoading: 'Loading the paper\u2026',
  quizShowPaper: 'Review my answers',

  keyIntro:
    'Each module\u2019s answers open once you have submitted that module\u2019s quiz. Work the questions first: the reasoning is the point, and reading the answer key beforehand tells you nothing about what you actually know.',
  keyLocked: 'Locked',
  keyLockedBody: 'Sit this quiz to open its answers.',
  keyOpenQuiz: 'Open the quiz',
  keyUnlocked: 'Open',
  keyShow: 'Show answers',
  keyHide: 'Hide answers',
  keyQuestion: 'Question',
  keyLoading: 'Loading answers\u2026',

  syncFailed: 'Your progress could not be saved to your account.',

  calcIntro:
    'The arithmetic from Modules 3, 4 and 6. Work it by hand first — this is for checking, not for replacing.',
  tabSize: 'Position size',
  tabMargin: 'Margin',
  tabExpectancy: 'Expectancy',
  tabDrawdown: 'Drawdown',
  fAccountEquity: 'Account equity',
  fRiskPct: 'Risk %',
  fRiskPctHint: '0.5 to 1% while learning',
  fEntry: 'Entry price',
  fStop: 'Stop price',
  fPipSize: 'Pip size',
  fPipSizeHint: '0.0001, or 0.01 for JPY',
  fPipValue: 'Pip value per lot',
  fPipValueHint: '10 for USD-quoted FX',
  fCost: 'Round-trip cost',
  fCostHint: 'Spread plus commission',
  fUnits: 'Units',
  fUnitsHint: '1 standard lot = 100,000',
  fPrice: 'Price',
  fLeverage: 'Leverage (x to 1)',
  fLeverageHint: '30 majors, 5 shares',
  fWinRate: 'Win rate %',
  fAvgWin: 'Average win (R)',
  fAvgLoss: 'Average loss (R)',
  fAvgLossHint: 'Normally about 1',
  fCostR: 'Cost per trade (R)',
  fTrades: 'Trades',
  fDrawdownPct: 'Drawdown %',
  fLosses: 'Consecutive losses',
  rPositionSize: 'Position size',
  rLots: 'lots',
  rRiskBudget: 'Risk budget',
  rStopDistance: 'Stop distance',
  rPips: 'pips',
  rUnits: 'Units',
  rPipValueOnPosition: 'Pip value on this position',
  rActualRisk: 'Actual risk',
  rActualRiskPct: 'Actual risk as % of equity',
  rCostRatio: 'Cost ratio',
  rEffectiveLeverage: 'Effective leverage',
  rClassification: 'Classification',
  rNotional: 'Notional exposure',
  rMarginRequired: 'Margin required',
  rMarginRequirement: 'Margin requirement',
  rFreeMargin: 'Free margin',
  rMarginLevel: 'Margin level',
  rWipeout: 'Adverse move that eliminates margin',
  rNetExpectancy: 'Net expectancy per trade',
  rVerdict: 'Verdict',
  rViable: 'Positive after costs',
  rNotViable: 'Loses money after costs',
  rGrossExpectancy: 'Gross expectancy',
  rRewardToRisk: 'Reward-to-risk',
  rBreakeven: 'Break-even win rate',
  rTotalOver: 'Total over',
  rRecoveryGain: 'Gain required to recover',
  rAssessment: 'Assessment',
  rLosingStreak: 'Losing streak',
  rRemaining: 'Account remaining',
  rStreakDrawdown: 'Drawdown from the streak',
  rGainToRecover: 'Gain needed to recover',
  clsRuin: 'Ruin is a matter of when',
  clsSevere: 'A single ordinary day can do severe damage',
  clsAggressive: 'Aggressive',
  clsModerate: 'Moderate',
  clsConservative: 'Conservative',
  ddDouble: 'Recovery requires doubling what remains',
  ddHard: 'Recovery becomes very difficult from here',
  ddOk: 'Recoverable with a working process',
  warnBelowMin:
    'The calculated size is below the usual 0.01 lot minimum trade size. Use a different instrument, a longer timeframe with a wider stop, or do not take the trade.',
  warnCostRatio:
    'A cost ratio above 25% means you are fighting the cost structure. The position is too small relative to its fixed costs, the stop is too tight, or the account is too small for this instrument.',
  infoRoundDown:
    'Size is always rounded down. Rounding up breaches the risk limit, and a risk limit only works if it is never breached.',
  infoLeverage:
    'Leverage does not determine your risk. Position size does. The leverage setting only caps the size available to you.',
  infoWinRate:
    'Win rate alone means nothing. A 90% win rate loses money if the losses are ten times the wins. You need 100+ trades before this estimate says anything, and 300+ to be reasonably confident.',
  infoStreak:
    'At a 45% win rate, a five-loss streak occurs in about 89% of any 100-trade sequence. Streaks of ordinary length are not evidence that a strategy has failed.',
  seeModule: 'See',
};

const ar: Strings = {
  brandSub: 'أدلة · حاسبات · إدارة مخاطر',
  progress: 'التقدّم',
  modules: 'الوحدات',
  reference: 'المراجع',
  templates: 'النماذج',
  riskDisclosure: 'إفصاح المخاطر',
  calculator: 'الحاسبة',
  tools: 'الأدوات',
  course: 'الدورة',
  module: 'الوحدة',
  quiz: 'اختبار',
  start: 'ابدأ',
  search: 'بحث',
  searchPlaceholder: 'ابحث في الدورة…',
  searchHint: 'اكتب حرفين على الأقل. جرّب «الهامش» أو «قيمة النقطة» أو «التوقّع».',
  searchLoading: 'جارٍ تحميل الفهرس…',
  searchNoResults: 'لا توجد نتائج لـ',
  onThisPage: 'في هذه الصفحة',
  minRead: 'دقيقة قراءة',
  markComplete: 'تحديد كمكتمل',
  completed: 'مكتمل',
  previous: 'السابق',
  next: 'التالي',
  notFound: 'الصفحة غير موجودة',
  notFoundBody: 'هذه الصفحة غير موجودة.',
  backToCourse: 'العودة إلى صفحة الدورة',
  openNav: 'فتح القائمة',
  toDark: 'التبديل إلى المظهر الداكن',
  toLight: 'التبديل إلى المظهر الفاتح',
  switchLang: 'Switch to English',
  pageLoadFailed: 'تعذّر تحميل هذه الصفحة.',
  pendingTitle: 'الترجمة قيد الإنجاز',
  pendingBody: 'لم تُترجَم هذه الصفحة بعد. والنسخة الإنجليزية منها كاملة.',
  pendingCta: 'اقرأ هذه الصفحة بالإنجليزية',

  heroTitle: 'أساسيات تداول عقود الفروقات',
  heroLede:
    'دورة متكاملة ذاتية الوتيرة في عقود الفروقات: ما هو العقد، وكيف تعمل حساباته، وكم يكلّف، وكيف تتصرّف الرافعة المالية والهامش، وكيف تبني خطة تداول وتختبرها. لا تفترض خبرة سابقة، ولا تتطلّب أي مال.',
  riskCardTitle: 'قبل أي شيء آخر',
  riskCardBody1:
    'يخسر ما بين 70% و85% من حسابات الأفراد في عقود الفروقات أموالهم. هذا الرقم مدقّق، وتُلزم الجهات التنظيمية في المملكة المتحدة والاتحاد الأوروبي وأستراليا الوسطاء بنشره، وهو ثابت في الأسواق الصاعدة والهابطة على حدّ سواء.',
  riskCardBody2:
    'هذه الدورة تعليمية وليست نصيحة مالية، ولن تجعلك تربح المال. عقود الفروقات غير متاحة لعملاء الأفراد في الولايات المتحدة.',
  readFullDisclosure: 'اقرأ إفصاح المخاطر كاملًا',
  startCourse: 'ابدأ الدورة',
  continueAt: 'متابعة',
  openCalculator: 'افتح الحاسبة',
  statModules: 'وحدة',
  statLessons: 'درسًا واختبارًا',
  statTime: 'ساعة دراسة',
  statCompleted: 'أُنجزت',
  studyTime: '40',
  curriculum: 'المنهج',
  homeFooter1:
    'ادرس الوحدات بالترتيب. حسابات الوحدتين الثالثة والرابعة تحمل كل ما يليها. وإن لم تقرأ إلا وحدة واحدة، فاقرأ',
  homeFooter2: '— فهي التي تحدّد ما إذا كان الحساب سيصمد بما يكفي ليصبح لأي شيء آخر معنى.',

  gateKicker: 'اقرأ هذا قبل أن تبدأ',
  gateTitle: 'هذه الدورة تتناول منتجًا يخسر معه أغلب الناس أموالهم.',
  gateStatNum: '70–85%',
  gateStatText:
    'من حسابات الأفراد في عقود الفروقات تخسر المال. هذا ليس تحذيرًا تسويقيًا، بل رقم مدقّق تُلزم الجهات التنظيمية في المملكة المتحدة والاتحاد الأوروبي وأستراليا الوسطاء بنشره، ولا يكاد يتغيّر بين الأسواق الصاعدة والهابطة.',
  gateP1a: 'الخسارة هي النتيجة الافتراضية',
  gateP1b: '، لا نتيجة تقصير في الجهد. وكل ما تُعلّمه هذه الدورة ينبع من أخذ ذلك على محمل الجد.',
  gateP2a: 'هذا محتوى تعليمي، وليس نصيحة مالية.',
  gateP2b: ' لا شيء هنا يوصي بأداة أو استراتيجية أو وسيط.',
  gateP3a: 'عقود الفروقات غير متاحة لعملاء الأفراد في الولايات المتحدة.',
  gateP3b: ' وتبقى هذه المادة مفيدة بوصفها شرحًا للرافعة المالية والهامش.',
  gateP4a: 'كل تمرين عملي هنا يُنفَّذ على حساب تجريبي.',
  gateP4b: ' لا تحتاج إلى أي مال لدراسة هذه الدورة، وقرارك بعدم التداول نتيجة ناجحة.',
  gateButton: 'أفهم ذلك — ابدأ الدورة',
  gateFoot:
    'إذا توقّف التداول يومًا عن كونه قرارًا — مطاردةً للخسائر، أو إخفاءً له عمّن حولك، أو تداولًا بمال قلتَ إنك لن تخاطر به — فستجد جهات الدعم مذكورة في إفصاح المخاطر الكامل، وهو أول صفحة في الدورة.',

  signInKicker: 'سجّل الدخول للمتابعة',
  signInLede:
    'الدورة مجانية وبوتيرتك أنت. والحساب هو ما يحفظ تقدّمك ونتائج اختباراتك، فتتوقّف على جهاز وتكمل من آخر.',
  signInWhyTitle: 'ما فائدة الحساب',
  signInWhy1: 'موضعك في الدورة، محفوظًا أولًا بأول.',
  signInWhy2: 'كل محاولة اختبار، مصحَّحة ومحفوظة، مع فتح الإجابات بعد أن تؤدّي الاختبار.',
  signInWhy3: 'ولا شيء غير ذلك. لا دفع، ولا حساب تداول، ولا بيع لبياناتك لأي وسيط.',
  signInButton: 'تسجيل الدخول',
  signInBusy: 'جارٍ فتح نافذة الدخول\u2026',
  signInProviders: 'تابع بحساب Google أو Apple أو X.',
  signInBlocked: 'حجب متصفّحك نافذة الدخول. اسمح بالنوافذ المنبثقة لهذا الموقع ثم أعد المحاولة.',
  signInClosed: 'أُغلقت نافذة الدخول قبل اكتمالها.',
  signInFailed: 'لم يكتمل تسجيل الدخول. أعد المحاولة من فضلك.',
  signInRetry: 'أعد المحاولة',
  signOut: 'تسجيل الخروج',
  account: 'الحساب',

  quizClosedBook: 'كتاب مغلق. تُصحَّح إجاباتك عند التسليم لا قبله.',
  quizCalculatorNote: 'والآلة الحاسبة مسموحة.',
  quizSelectOne: 'اختر إجابة واحدة',
  quizSelectAll: 'اختر كل ما ينطبق',
  quizQuestions: 'سؤالًا',
  quizPassMark: 'درجة النجاح',
  quizSubmit: 'سلّم الإجابات',
  quizSubmitting: 'جارٍ التصحيح\u2026',
  quizAnswerAll: 'أجب عن كل سؤال قبل التسليم.',
  quizUnanswered: 'بقي {} بلا إجابة',
  quizScore: 'الدرجة',
  quizPassed: 'ناجح',
  quizNotPassed: 'دون درجة النجاح',
  quizRetake: 'أعد الاختبار',
  quizReview: 'ورقتك المصحَّحة',
  quizYourAnswer: 'إجابتك',
  quizCorrectAnswer: 'الإجابة الصحيحة',
  quizNoAnswer: 'لم تُعطَ إجابة',
  quizWhy: 'التعليل',
  quizCorrectLabel: 'صحيحة',
  quizIncorrectLabel: 'خاطئة',
  quizAttempts: 'المحاولات',
  quizBest: 'الأفضل',
  quizLatest: 'الأخيرة',
  quizAttemptsNote: 'المحاولات غير محدودة وكلها محفوظة. وتُعرَض الأفضل والأحدث معًا، لأن درجةً لا تستطيع تكرارها ليست درجة.',
  quizPartTable: 'بحسب الأجزاء',
  quizPartFloor: 'تتطلّب {}%',
  quizPartFloorMissed: 'هذا الجزء دون الحدّ الأدنى الخاص به، فلا تُعدّ الورقة ناجحة مهما بلغ المجموع.',
  quizSaveFailed: 'تعذّر تصحيح إجاباتك. تحقّق من اتصالك وسلّم مرة أخرى.',
  quizLoadFailed: 'تعذّر تحميل هذه الورقة.',
  quizRetry: 'أعد المحاولة',
  quizLoading: 'جارٍ تحميل الورقة\u2026',
  quizShowPaper: 'راجع إجاباتي',

  keyIntro:
    'تُفتح إجابات كل وحدة بعد تسليمك اختبار تلك الوحدة. اعمل على الأسئلة أولًا: فالتعليل هو المقصود، وقراءة الإجابات مسبقًا لا تخبرك بشيء عمّا تعرفه فعلًا.',
  keyLocked: 'مقفلة',
  keyLockedBody: 'أدِّ هذا الاختبار لفتح إجاباته.',
  keyOpenQuiz: 'افتح الاختبار',
  keyUnlocked: 'مفتوحة',
  keyShow: 'اعرض الإجابات',
  keyHide: 'أخفِ الإجابات',
  keyQuestion: 'سؤال',
  keyLoading: 'جارٍ تحميل الإجابات\u2026',

  syncFailed: 'تعذّر حفظ تقدّمك في حسابك.',

  calcIntro:
    'حسابات الوحدات الثالثة والرابعة والسادسة. احسبها بيدك أولًا — هذه الأداة للتحقّق لا للاستعاضة.',
  tabSize: 'حجم المركز',
  tabMargin: 'الهامش',
  tabExpectancy: 'التوقّع',
  tabDrawdown: 'التراجع',
  fAccountEquity: 'حقوق ملكية الحساب',
  fRiskPct: 'نسبة المخاطرة %',
  fRiskPctHint: '0.5 إلى 1% أثناء التعلّم',
  fEntry: 'سعر الدخول',
  fStop: 'سعر وقف الخسارة',
  fPipSize: 'حجم النقطة',
  fPipSizeHint: 'استخدم 0.0001، أو 0.01 لأزواج الين',
  fPipValue: 'قيمة النقطة لكل عقد',
  fPipValueHint: '10 للأزواج المسعّرة بالدولار',
  fCost: 'تكلفة الصفقة كاملة',
  fCostHint: 'الفارق السعري مع العمولة',
  fUnits: 'الوحدات',
  fUnitsHint: 'العقد القياسي = 100,000',
  fPrice: 'السعر',
  fLeverage: 'الرافعة المالية (× : 1)',
  fLeverageHint: '30 للعملات الرئيسية، 5 للأسهم',
  fWinRate: 'نسبة الصفقات الرابحة %',
  fAvgWin: 'متوسط الربح (R)',
  fAvgLoss: 'متوسط الخسارة (R)',
  fAvgLossHint: 'عادةً نحو 1',
  fCostR: 'التكلفة لكل صفقة (R)',
  fTrades: 'عدد الصفقات',
  fDrawdownPct: 'نسبة التراجع %',
  fLosses: 'خسائر متتالية',
  rPositionSize: 'حجم المركز',
  rLots: 'لوت',
  rRiskBudget: 'ميزانية المخاطرة',
  rStopDistance: 'مسافة وقف الخسارة',
  rPips: 'نقطة',
  rUnits: 'الوحدات',
  rPipValueOnPosition: 'قيمة النقطة على هذا المركز',
  rActualRisk: 'المخاطرة الفعلية',
  rActualRiskPct: 'المخاطرة الفعلية كنسبة من الحساب',
  rCostRatio: 'نسبة التكلفة',
  rEffectiveLeverage: 'الرافعة الفعلية',
  rClassification: 'التصنيف',
  rNotional: 'القيمة الاسمية للانكشاف',
  rMarginRequired: 'الهامش المطلوب',
  rMarginRequirement: 'نسبة الهامش',
  rFreeMargin: 'الهامش الحر',
  rMarginLevel: 'مستوى الهامش',
  rWipeout: 'الحركة المعاكسة التي تمحو الهامش',
  rNetExpectancy: 'صافي التوقّع لكل صفقة',
  rVerdict: 'الحكم',
  rViable: 'موجب بعد التكاليف',
  rNotViable: 'خاسر بعد التكاليف',
  rGrossExpectancy: 'التوقّع الإجمالي',
  rRewardToRisk: 'العائد إلى المخاطرة',
  rBreakeven: 'نسبة الربح عند التعادل',
  rTotalOver: 'الإجمالي خلال',
  rRecoveryGain: 'الربح اللازم للتعافي',
  rAssessment: 'التقييم',
  rLosingStreak: 'سلسلة الخسائر',
  rRemaining: 'المتبقّي من الحساب',
  rStreakDrawdown: 'التراجع الناتج عن السلسلة',
  rGainToRecover: 'الربح اللازم للتعافي',
  clsRuin: 'الإفلاس مسألة وقت',
  clsSevere: 'يوم عادي واحد قد يُحدث ضررًا بالغًا',
  clsAggressive: 'عالية المخاطرة',
  clsModerate: 'معتدلة',
  clsConservative: 'متحفّظة',
  ddDouble: 'التعافي يتطلّب مضاعفة ما تبقّى',
  ddHard: 'التعافي يصبح صعبًا للغاية من هنا',
  ddOk: 'قابل للتعافي بعملية سليمة',
  warnBelowMin:
    'الحجم المحسوب أقل من الحد الأدنى المعتاد للصفقة وهو 0.01 عقد. استخدم أداة أخرى، أو إطارًا زمنيًا أطول بوقف خسارة أوسع، أو لا تدخل الصفقة.',
  warnCostRatio:
    'نسبة تكلفة تتجاوز 25% تعني أنك تصارع هيكل التكاليف. المركز صغير جدًا مقارنةً بتكاليفه الثابتة، أو وقف الخسارة ضيّق جدًا، أو الحساب أصغر من أن يناسب هذه الأداة.',
  infoRoundDown:
    'يُقرَّب الحجم دائمًا إلى الأسفل. التقريب إلى الأعلى يخرق حد المخاطرة، وحد المخاطرة لا يعمل إلا إذا لم يُخرَق أبدًا.',
  infoLeverage:
    'الرافعة المالية لا تحدّد مخاطرتك. حجم المركز هو الذي يحدّدها. إعداد الرافعة يضع سقفًا للحجم المتاح لك، لا أكثر.',
  infoWinRate:
    'نسبة الربح وحدها لا تعني شيئًا. نسبة ربح 90% تخسر المال إذا كانت الخسائر عشرة أضعاف الأرباح. تحتاج إلى أكثر من 100 صفقة قبل أن يقول هذا التقدير شيئًا، وإلى أكثر من 300 لتثق به.',
  infoStreak:
    'عند نسبة ربح 45%، تحدث سلسلة من خمس خسائر متتالية في نحو 89% من أي مئة صفقة. السلاسل ذات الطول المعتاد ليست دليلًا على فشل الاستراتيجية.',
  seeModule: 'راجع',
};

const TABLE: Record<Lang, Strings> = { en, ar };

export function stringsFor(lang: Lang): Strings {
  return TABLE[lang];
}

export function isLang(value: string): value is Lang {
  return value === 'en' || value === 'ar';
}

const KEY = 'cfd-course:lang';

export function storedLang(): Lang | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw && isLang(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function rememberLang(lang: Lang): void {
  try {
    window.localStorage.setItem(KEY, lang);
  } catch {
    /* storage unavailable: the route still carries the language */
  }
}

export function preferredLang(): Lang {
  const stored = storedLang();
  if (stored) return stored;
  const nav = typeof navigator !== 'undefined' ? navigator.language : 'en';
  return nav && nav.toLowerCase().startsWith('ar') ? 'ar' : 'en';
}

export function useStrings(lang: Lang) {
  const t = stringsFor(lang);
  const fmt = useCallback(
    (template: string, value: string | number) => template.replace('{}', String(value)),
    []
  );
  return { t, fmt };
}
