/**
 * The privacy policy, in both languages.
 *
 * Every statement here must stay true of the code and the providers. When
 * something changes (a new table, a new provider, Pro opening with the AI
 * coach), change this file in the same commit and move UPDATED forward.
 */

import type { Lang } from '@/lib/i18n';

export const CONTACT_EMAIL = 'mohdmarafie96@gmail.com';
export const CONTROLLER = 'Mohammed Marafie';
/** ISO date of the last change to the policy's substance. */
export const UPDATED = '2026-09-26';

/**
 * Wraps a left-to-right run (a name, an email address) for use inside Arabic
 * text, so the browser keeps its punctuation with it instead of moving it to
 * the other end of the run.
 */
function LTR(text: string): string {
  return `\u2066${text}\u2069`;
}

export interface Section {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  after?: string[];
}

export interface Policy {
  title: string;
  updatedLabel: string;
  updated: string;
  intro: string[];
  sections: Section[];
  backToCourse: string;
  switchLang: string;
}

export const POLICY: Record<Lang, Policy> = {
  en: {
    title: 'Privacy policy',
    updatedLabel: 'Last updated',
    updated: '26 September 2026',
    intro: [
      `Trading et al. is a free course on CFD trading, with a paid coaching tool, Pro, to come. It is run by ${CONTROLLER}, who is responsible for your data under this policy. Anywhere this page says "we", it means ${CONTROLLER}.`,
      'This page says what the site collects, why, who else handles it, and what you can ask us to do with it. You can read the course home page without an account; this policy matters once you create one.',
    ],
    sections: [
      {
        heading: 'What we collect',
        paragraphs: ['When you create an account:'],
        list: [
          'Your email address.',
          'Your password, but never in readable form. Our sign-in provider stores only a one-way scrambled version, which nobody, including us, can turn back into the password.',
          'If you choose "Continue with Google": the name, email address and profile picture link that Google shares with us.',
          'When you signed up and when you last signed in.',
        ],
        after: [
          'While you use the course: which lessons you mark as done, and each quiz you take, with your answers, your score and the date.',
          'When Pro opens, and only if you use it: your language setting; the trading accounts you describe (name, currency, balance, leverage, risk per trade); the trades you enter or import (instrument, direction, size, prices, times, result, fees, and any notes, mood tag or screenshot link you add); your membership status; the payment reference you give us; and the payments we record against your account (amount, currency, method, reference and date).',
          'Our hosting and database providers keep short technical logs of requests to the site: IP address, browser, the address requested and the time. They are used to keep the site running and secure.',
        ],
      },
      {
        heading: 'What we do not collect',
        list: [
          'No analytics, advertising or tracking tools. Nothing on the site follows you around the web.',
          'No broker logins. Pro never connects to a trading account and never places, changes or closes a trade.',
          'No card details. Payment is made outside the site, and we record only the reference and amount.',
        ],
        after: ['We do not sell your data, and we do not share it for advertising.'],
      },
      {
        heading: 'Why we use it',
        list: [
          'To give you the course and keep your progress and quiz results: this is the service you signed up for.',
          'To sign you in, keep your account secure and send the emails you ask for (confirming your address, resetting your password).',
          'To run Pro memberships: checking a payment, approving access and keeping payment records, including where the law requires financial records to be kept.',
          'To keep the site working and protect it from misuse, using the technical logs.',
        ],
      },
      {
        heading: 'Cookies and storage in your browser',
        paragraphs: [
          'The site sets cookies only to keep you signed in. They are needed for the site to work, so there is no cookie banner, and they are removed when you sign out.',
          'The site also keeps a few settings in your browser\'s own storage: light or dark reading mode, your language, and that you have read the risk notice. Visits from before accounts existed may also have left lesson progress there; it is moved into your account the first time you sign in and then removed. None of this is sent to us.',
          'Fonts are served by the site itself, so no font service learns that you visited.',
        ],
      },
      {
        heading: 'Who else handles your data',
        paragraphs: ['A few companies handle data on our behalf, only to run the site:'],
        list: [
          'Supabase stores the database and handles sign-in and account emails. Your account data is stored in the European Union (Frankfurt, Germany).',
          'Vercel hosts the site. The servers that answer requests are in the United States, and Vercel handles that data under its data processing terms.',
          'Google, only if you choose "Continue with Google". Google\'s own privacy policy covers what happens on its side.',
        ],
        after: [
          'Whoever you pay for Pro (for example your bank) handles that payment under their own terms. We see only what you and they tell us: the reference and the amount.',
          'Before Pro opens with its AI coach, this policy will be updated to say exactly what is shared with the AI provider, and when.',
        ],
      },
      {
        heading: 'How long we keep it',
        list: [
          'Your account, progress, quiz results and Pro data: until you delete your account, or ask us to.',
          'Payment records: as long as the law requires financial records to be kept, even after an account is deleted.',
          'Technical logs: for the short periods our providers set, usually days to weeks.',
        ],
      },
      {
        heading: 'Your choices and rights',
        paragraphs: [
          `You can ask us for a copy of your data, to correct it, to delete it or your whole account, or to stop using it for a particular purpose. Email ${CONTACT_EMAIL} from the address on your account, and we will reply within 30 days.`,
          'You can change your password at any time from the course, and sign out on any device.',
          'If you think we have handled your data wrongly, please tell us first. You can also complain to the data protection authority where you live.',
        ],
      },
      {
        heading: 'Keeping it safe',
        paragraphs: [
          'Each account can read only its own data; the database enforces this, not just the website. Quiz answers are marked inside the database, so the answer key is never sent to a browser. Only named admins can see other accounts, and every change an admin makes is logged.',
          'No system is perfectly secure. If a breach affected your data, we would tell you and the authorities as the law requires.',
        ],
      },
      {
        heading: 'Age',
        paragraphs: [
          'The course is meant for adults. Trading CFDs is for people aged 18 and over, and we do not knowingly collect data from children.',
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'When the site changes what it collects or who handles it, we update this page and the date at the top. If a change matters to how your data is used, we will say so on the site before it takes effect.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [`${CONTROLLER}, ${CONTACT_EMAIL}.`],
      },
    ],
    backToCourse: 'Back to the course',
    switchLang: 'العربية',
  },

  ar: {
    title: 'سياسة الخصوصية',
    updatedLabel: 'آخر تحديث',
    updated: '26 سبتمبر 2026',
    intro: [
      `${LTR('Trading et al.')} دورة مجانية في تداول عقود الفروقات، ومعها أداة تدريب مدفوعة قادمة اسمها Pro. يديرها ${LTR(CONTROLLER)}، وهو المسؤول عن بياناتك بموجب هذه السياسة. وحيثما تقول هذه الصفحة «نحن» فالمقصود ${LTR(CONTROLLER)}.`,
      'توضّح هذه الصفحة ما يجمعه الموقع، ولماذا، ومن يتعامل معه غيرنا، وما يمكنك أن تطلبه منا بشأنه. يمكنك قراءة الصفحة الرئيسية للدورة دون حساب؛ وتصبح هذه السياسة مهمة حين تُنشئ حسابًا.',
    ],
    sections: [
      {
        heading: 'ما نجمعه',
        paragraphs: ['عند إنشاء حساب:'],
        list: [
          'عنوان بريدك الإلكتروني.',
          'كلمة المرور، ولكن ليس بصيغة مقروءة أبدًا. يحتفظ مزوّد تسجيل الدخول بنسخة مشفّرة باتجاه واحد فقط، لا يستطيع أحد، ونحن منهم، إعادتها إلى كلمة المرور.',
          'إن اخترت «المتابعة عبر Google»: الاسم والبريد الإلكتروني ورابط صورة الملف الشخصي التي تشاركها Google معنا.',
          'تاريخ تسجيلك وآخر مرة سجّلت فيها الدخول.',
        ],
        after: [
          'أثناء استخدامك للدورة: الدروس التي تحدّدها منجزة، وكل اختبار تؤدّيه، مع إجاباتك ونتيجتك وتاريخه.',
          'عند افتتاح Pro، وفقط إن استخدمته: إعداد اللغة؛ وحسابات التداول التي تصفها (الاسم والعملة والرصيد والرافعة ونسبة المخاطرة لكل صفقة)؛ والصفقات التي تُدخلها أو تستوردها (الأداة والاتجاه والحجم والأسعار والأوقات والنتيجة والرسوم، وأي ملاحظات أو وسم للحالة النفسية أو رابط صورة تضيفه)؛ وحالة عضويتك؛ ومرجع الدفع الذي تعطينا إياه؛ والدفعات التي نسجّلها على حسابك (المبلغ والعملة والطريقة والمرجع والتاريخ).',
          'يحتفظ مزوّدا الاستضافة وقاعدة البيانات بسجلات تقنية قصيرة للطلبات الواردة إلى الموقع: عنوان IP والمتصفح والعنوان المطلوب والوقت. وتُستخدم لإبقاء الموقع عاملًا وآمنًا.',
        ],
      },
      {
        heading: 'ما لا نجمعه',
        list: [
          'لا أدوات تحليل ولا إعلانات ولا تتبّع. لا شيء في الموقع يتبعك في أرجاء الإنترنت.',
          'لا بيانات دخول إلى حسابات الوسطاء. لا يتصل Pro بأي حساب تداول، ولا يفتح صفقة أو يعدّلها أو يغلقها أبدًا.',
          'لا بيانات بطاقات. يتم الدفع خارج الموقع، ولا نسجّل سوى المرجع والمبلغ.',
        ],
        after: ['لا نبيع بياناتك، ولا نشاركها لأغراض إعلانية.'],
      },
      {
        heading: 'لماذا نستخدمها',
        list: [
          'لنقدّم لك الدورة ونحفظ تقدّمك ونتائج اختباراتك: وهذه هي الخدمة التي اشتركت فيها.',
          'لتسجيل دخولك، والحفاظ على أمان حسابك، وإرسال الرسائل التي تطلبها (تأكيد عنوانك، وإعادة تعيين كلمة المرور).',
          'لإدارة عضويات Pro: التحقق من الدفعة، والموافقة على الوصول، والاحتفاظ بسجلات الدفع، بما في ذلك حين يفرض القانون الاحتفاظ بالسجلات المالية.',
          'لإبقاء الموقع عاملًا وحمايته من سوء الاستخدام، باستخدام السجلات التقنية.',
        ],
      },
      {
        heading: 'ملفات تعريف الارتباط والتخزين في متصفحك',
        paragraphs: [
          'لا يضع الموقع ملفات تعريف الارتباط إلا لإبقائك مسجّلًا للدخول. وهي ضرورية لعمل الموقع، ولذلك لا توجد نافذة موافقة عليها، وتُحذف عند تسجيل الخروج.',
          'ويحتفظ الموقع أيضًا ببعض الإعدادات في تخزين متصفحك نفسه: وضع القراءة الفاتح أو الداكن، ولغتك، وأنك قرأت إشعار المخاطر. وربما تركت زيارات سابقة لوجود الحسابات تقدّمًا في الدروس هناك؛ فيُنقل إلى حسابك عند أول تسجيل دخول ثم يُحذف. ولا يُرسَل شيء من ذلك إلينا.',
          'يقدّم الموقع الخطوط بنفسه، فلا تعلم أي خدمة خطوط بزيارتك.',
        ],
      },
      {
        heading: 'من يتعامل مع بياناتك غيرنا',
        paragraphs: ['تتعامل بعض الشركات مع البيانات نيابةً عنا، لتشغيل الموقع فقط:'],
        list: [
          'Supabase تخزّن قاعدة البيانات وتتولّى تسجيل الدخول ورسائل الحساب. وتُخزَّن بيانات حسابك في الاتحاد الأوروبي (فرانكفورت، ألمانيا).',
          'Vercel تستضيف الموقع. والخوادم التي تستقبل الطلبات موجودة في الولايات المتحدة، وتتعامل Vercel مع تلك البيانات وفق شروط معالجة البيانات الخاصة بها.',
          'Google، فقط إن اخترت «المتابعة عبر Google». وتحكم سياسة الخصوصية الخاصة بـ Google ما يحدث من جهتها.',
        ],
        after: [
          'الجهة التي تدفع لها مقابل Pro (مصرفك مثلًا) تتعامل مع تلك الدفعة وفق شروطها. ولا نرى إلا ما تخبرنا به أنت وهي: المرجع والمبلغ.',
          'قبل افتتاح Pro بمدرّبه المعتمد على الذكاء الاصطناعي، ستُحدَّث هذه السياسة لتوضّح بالضبط ما يُشارَك مع مزوّد الذكاء الاصطناعي، ومتى.',
        ],
      },
      {
        heading: 'مدة الاحتفاظ',
        list: [
          'حسابك وتقدّمك ونتائج اختباراتك وبيانات Pro: إلى أن تحذف حسابك أو تطلب منا ذلك.',
          'سجلات الدفع: طوال المدة التي يفرض فيها القانون الاحتفاظ بالسجلات المالية، حتى بعد حذف الحساب.',
          'السجلات التقنية: للمدد القصيرة التي يحدّدها مزوّدونا، عادةً من أيام إلى أسابيع.',
        ],
      },
      {
        heading: 'خياراتك وحقوقك',
        paragraphs: [
          `يمكنك أن تطلب منا نسخة من بياناتك، أو تصحيحها، أو حذفها أو حذف حسابك كاملًا، أو التوقّف عن استخدامها لغرض معيّن. راسل ${LTR(CONTACT_EMAIL)} من العنوان المسجّل في حسابك، وسنردّ خلال 30 يومًا.`,
          'يمكنك تغيير كلمة المرور في أي وقت من داخل الدورة، وتسجيل الخروج على أي جهاز.',
          'إن رأيت أننا تعاملنا مع بياناتك بشكل خاطئ، فأخبرنا أولًا من فضلك. ويمكنك أيضًا تقديم شكوى إلى هيئة حماية البيانات في بلدك.',
        ],
      },
      {
        heading: 'حماية البيانات',
        paragraphs: [
          'لا يستطيع أي حساب قراءة سوى بياناته؛ وتفرض قاعدة البيانات ذلك، لا الموقع وحده. وتُصحَّح إجابات الاختبارات داخل قاعدة البيانات، فلا يُرسَل مفتاح الإجابات إلى أي متصفح. ولا يرى الحسابات الأخرى إلا مشرفون محدّدون بالاسم، ويُسجَّل كل تغيير يجريه المشرف.',
          'لا يوجد نظام آمن تمامًا. وإن مسّ اختراقٌ بياناتك، فسنبلغك ونبلغ الجهات المختصة كما يقتضي القانون.',
        ],
      },
      {
        heading: 'العمر',
        paragraphs: [
          'الدورة موجّهة للبالغين. تداول عقود الفروقات لمن بلغوا 18 عامًا فأكثر، ولا نجمع عن علمٍ بياناتٍ من الأطفال.',
        ],
      },
      {
        heading: 'التغييرات على هذه السياسة',
        paragraphs: [
          'حين يغيّر الموقع ما يجمعه أو من يتعامل معه، نحدّث هذه الصفحة والتاريخ في أعلاها. وإن كان التغيير يمسّ طريقة استخدام بياناتك، فسنعلن عنه في الموقع قبل أن يسري.',
        ],
      },
      {
        heading: 'التواصل',
        paragraphs: [`${LTR(CONTROLLER)}، ${LTR(CONTACT_EMAIL)}.`],
      },
    ],
    backToCourse: 'العودة إلى الدورة',
    switchLang: 'English',
  },
};
