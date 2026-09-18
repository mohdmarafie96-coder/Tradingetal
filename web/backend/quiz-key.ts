// Generated from quiz/*.json by scripts/build-quiz-key.mjs. Do not edit by hand.

export interface KeyQuestion {
  id: string;
  part: string | null;
  type: 'single' | 'multi';
  correct: string[];
  explanation: { en: string; ar: string };
}

export interface KeyPart {
  id: string;
  weight: number;
  /** A floor this part must clear on its own, or null when it has none. */
  minScore: number | null;
}

export interface KeyQuiz {
  passMark: number;
  parts: KeyPart[] | null;
  questions: KeyQuestion[];
}

/** Answers and explanations, by quiz id. */
export const QUIZ_KEY: Record<string, KeyQuiz> = {
  "final": {
    "passMark": 0.8,
    "parts": [
      {
        "id": "A",
        "weight": 0.2,
        "minScore": null
      },
      {
        "id": "B",
        "weight": 0.2,
        "minScore": null
      },
      {
        "id": "C",
        "weight": 0.3,
        "minScore": 0.7
      },
      {
        "id": "D",
        "weight": 0.15,
        "minScore": null
      },
      {
        "id": "E",
        "weight": 0.15,
        "minScore": null
      }
    ],
    "questions": [
      {
        "id": "A1",
        "part": "A",
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "0.45 × 100,000 = 45,000 units. Notional = 45,000 × 1.2680 = $57,060.",
          "ar": "0.45 × 100,000 = 45,000 وحدة. والقيمة الاسمية = 45,000 × 1.2680 = 57,060 دولارًا."
        }
      },
      {
        "id": "A2",
        "part": "A",
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "USD is the base currency, so divide by the price. 0.7 lots = 70,000 units. 0.01 × 70,000 = ¥700. ¥700 / 151.40 = $4.62.",
          "ar": "الدولار هو العملة الأساس، فاقسم على السعر. 0.7 لوت = 70,000 وحدة. و0.01 × 70,000 = 700 ين. و700 ÷ 151.40 = 4.62 دولارات."
        }
      },
      {
        "id": "A3",
        "part": "A",
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "Neither currency is the account currency, so convert via GBP/USD. 0.3 lots = 30,000 units. 0.0001 × 30,000 = £3.00. £3.00 × 1.2650 = $3.80. Dividing by GBP/USD instead of multiplying gives $2.37.",
          "ar": "لا العملة الأساس ولا عملة التسعير هي عملة الحساب، فحوّل عبر GBP/USD. 0.3 لوت = 30,000 وحدة. و0.0001 × 30,000 = 3.00 جنيهات. و3.00 × 1.2650 = 3.80 دولارات. والقسمة على GBP/USD بدلًا من الضرب تعطي 2.37 دولار."
        }
      },
      {
        "id": "A4",
        "part": "A",
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "Short, and price fell, so this is a profit. Gross = (1.09240 − 1.08810) × 60,000 = $258.00. Commission = 0.6 × $3.50 × 2 = −$4.20. Swap = +$1.10 × 6 × 4 = +$26.40. Net = $280.20. The positive swap materially improved the trade — check your own instrument rather than assuming financing is always a cost.",
          "ar": "مركز بيع، والسعر هبط، فهذا ربح. الإجمالي = (1.09240 − 1.08810) × 60,000 = 258.00 دولارًا. والعمولة = 0.6 × 3.50 × 2 = −4.20 دولار. والسواب = +1.10 × 6 × 4 = +26.40 دولارًا. والصافي = 280.20 دولارًا. وقد حسّن السواب الموجب الصفقة تحسينًا معتبرًا — فافحص أداتك بدلًا من افتراض أن التمويل تكلفة دائمًا."
        }
      },
      {
        "id": "A5",
        "part": "A",
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "Notional = 5 × 5,240 = $26,200. Rate = 4.5% + 2.5% = 7.0%. Per night = 26,200 × 0.07 / 365 = $5.02. Over 30 nights = $150.74. Using the benchmark alone gives $3.23 a night and the markup alone $1.79; $50.23 is a factor-of-ten slip.",
          "ar": "القيمة الاسمية = 5 × 5,240 = 26,200 دولار. والسعر = 4.5% + 2.5% = 7.0%. ولكل ليلة = 26,200 × 0.07 ÷ 365 = 5.02 دولارات. وعلى مدى 30 ليلة = 150.74 دولارًا. واستخدام سعر المرجع وحده يعطي 3.23 دولارات لليلة، والهامش وحده 1.79، و50.23 زللٌ بمقدار عشرة أمثال."
        }
      },
      {
        "id": "A6",
        "part": "A",
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "The position survives five rollovers — Tuesday, Wednesday, Thursday, Friday and Monday — and the Wednesday rollover counts as three. 4 + 3 = 7. There is no weekend rollover, because the market is closed and the weekend is what the Wednesday triple covers.",
          "ar": "المركز يمرّ بخمسة تدويرات — الثلاثاء والأربعاء والخميس والجمعة والاثنين — ويُحتسَب تدوير الأربعاء ثلاثة. 4 + 3 = 7. ولا تدوير في نهاية الأسبوع، لأن السوق مغلقة ولأن نهاية الأسبوع هي ما يغطّيه تبييت الأربعاء الثلاثي."
        }
      },
      {
        "id": "B1",
        "part": "B",
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "0.9 lots = 90,000 units. Notional = 90,000 × 1.0920 = $98,280. Margin = 98,280 / 30 = $3,276.",
          "ar": "0.9 لوت = 90,000 وحدة. والقيمة الاسمية = 90,000 × 1.0920 = 98,280 دولارًا. والهامش = 98,280 ÷ 30 = 3,276 دولارًا."
        }
      },
      {
        "id": "B2",
        "part": "B",
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "78,000 / 9,000 = 8.7 : 1, which is aggressive — a single ordinary session can do real damage, and it is well above the 5:1 ceiling recommended while learning.",
          "ar": "78,000 ÷ 9,000 = 8.7 : 1، وهي عالية المخاطرة — فجلسة عادية واحدة قد تُحدث ضررًا حقيقيًّا، وهي أعلى بكثير من سقف 5:1 الموصى به أثناء التعلّم."
        }
      },
      {
        "id": "B3",
        "part": "B",
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "1.4 lots = 140,000 units. Notional = 140,000 × 1.0900 = $152,600. Used margin = 152,600 / 30 = $5,086.67. Margin level = 7,000 / 5,086.67 = 137.6%.",
          "ar": "1.4 لوت = 140,000 وحدة. والقيمة الاسمية = 140,000 × 1.0900 = 152,600 دولارًا. والهامش المستخدَم = 152,600 ÷ 30 = 5,086.67 دولارًا. ومستوى الهامش = 7,000 ÷ 5,086.67 = 137.6%."
        }
      },
      {
        "id": "B4",
        "part": "B",
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "323.7 pips, a loss of $4,532, which is 64.7% of the account. That is a 2.97% move in EUR/USD.",
          "ar": "323.7 نقطة، وخسارة قدرها 4,532 دولارًا، أي 64.7% من الحساب. وتلك حركة قدرها 2.97% في EUR/USD."
        }
      },
      {
        "id": "B5",
        "part": "B",
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "The \"50% rule\" describes the margin ratio, not your losses. Equity starts at 137.6% of required margin and must fall to 50% of it, and on this over-leveraged account margin is a large fraction of the balance — so that decline amounts to 64.7% of the balance.",
          "ar": "«قاعدة 50%» تصف نسبة الهامش لا خسائرك. فحقوق الملكية تبدأ عند 137.6% من الهامش المطلوب ويجب أن تهبط إلى 50% منه، والهامش في هذا الحساب مفرط الرافعة كسر كبير من الرصيد — فذلك الانحدار يعادل 64.7% من الرصيد."
        }
      },
      {
        "id": "B6",
        "part": "B",
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "0.5 lots = 50,000 units, pip value $5. Intended: 60 pips × $5 = $300. Actual: 210 pips × $5 = $1,050 — 3.5 times the intended risk. The stop worked exactly as designed; the design does not cover discontinuities.",
          "ar": "0.5 لوت = 50,000 وحدة، وقيمة النقطة 5 دولارات. المقصودة: 60 نقطة × 5 = 300 دولار. والفعلية: 210 نقاط × 5 = 1,050 دولارًا — أي 3.5 أضعاف المخاطرة المقصودة. وقد عمل الوقف تمامًا كما صُمِّم، لكن التصميم لا يغطّي الانقطاعات."
        }
      },
      {
        "id": "C1",
        "part": "C",
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "Risk = $63.75. Stop = 48 pips. Units = 63.75 / (48 × 0.0001) = 13,281 → 0.13 lots. Actual risk = 48 × $1.30 = $62.40 (0.73%). Rounding up to 0.14 lots gives $67.20 and breaches the limit.",
          "ar": "المخاطرة = 63.75 دولارًا. والوقف = 48 نقطة. والوحدات = 63.75 ÷ (48 × 0.0001) = 13,281 ← 0.13 لوت. والمخاطرة الفعلية = 48 × 1.30 = 62.40 دولارًا (0.73%). والتقريب إلى الأعلى إلى 0.14 لوت يعطي 67.20 دولارًا ويخرق الحدّ."
        }
      },
      {
        "id": "C2",
        "part": "C",
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "Risk = $150. Stop = $3.30. CFDs = 150 / 3.30 = 45.45 → 45. Actual risk = $148.50. Notional = 45 × 73.40 = $3,303. Margin at 20% = $660.60. Quoting $3,303 as the margin states the notional as if it were the margin.",
          "ar": "المخاطرة = 150 دولارًا. والوقف = 3.30 دولارات. والعقود = 150 ÷ 3.30 = 45.45 ← 45. والمخاطرة الفعلية = 148.50 دولارًا. والقيمة الاسمية = 45 × 73.40 = 3,303 دولارات. والهامش عند 20% = 660.60 دولارًا. وذكر 3,303 هامشًا يجعل القيمة الاسمية كأنها الهامش."
        }
      },
      {
        "id": "C3",
        "part": "C",
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "E = (0.38 × 2.8) − (0.62 × 1) = 1.064 − 0.62 = +0.444R. With costs: +0.354R. Viable, and note it wins fewer than four trades in ten. Answering +1.064R omits the loss term entirely.",
          "ar": "ت = (0.38 × 2.8) − (0.62 × 1) = 1.064 − 0.62 = +0.444R. وبالتكاليف: +0.354R. صالحة، ولاحظ أنها تربح أقلّ من أربع صفقات من عشر. والإجابة بـ +1.064R تُغفل حدّ الخسارة تمامًا."
        }
      },
      {
        "id": "C4",
        "part": "C",
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "1 / (1 + 1.8) = 35.7%. Answering 55.6% is 1 / 1.8, the common slip.",
          "ar": "1 ÷ (1 + 1.8) = 35.7%. والإجابة بـ 55.6% هي 1 ÷ 1.8، وهو الزلل الشائع."
        }
      },
      {
        "id": "C5",
        "part": "C",
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "Drawdown = (22,000 − 15,400) / 22,000 = 30%. Recovery = 1 / 0.70 − 1 = 42.9%.",
          "ar": "التراجع = (22,000 − 15,400) ÷ 22,000 = 30%. والتعافي = 1 ÷ 0.70 − 1 = 42.9%."
        }
      },
      {
        "id": "C6",
        "part": "C",
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "0.97^9 = 0.7602, so 76.0% remains, a 24.0% drawdown. Recovery = 31.5%. Answering 73.0% subtracts 3% × 9 = 27% linearly.",
          "ar": "0.97^9 = 0.7602، أي أن 76.0% يبقى، بتراجع قدره 24.0%. والتعافي = 31.5%. والإجابة بـ 73.0% تطرح 3% × 9 = 27% طرحًا خطّيًّا."
        }
      },
      {
        "id": "C7",
        "part": "C",
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "Long EUR/USD, short USD/CHF and long AUD/USD are all short USD (3%). Long AUD/USD and long US 500 are both long risk (2%). AUD/USD appears in both, which makes it the most exposed of the four. In a strong-dollar risk-off move all four lose together, so the realistic figure is the full 4%, not the 1% each position was sized to.",
          "ar": "شراء EUR/USD وبيع USD/CHF وشراء AUD/USD كلها بيعٌ للدولار (3%). وشراء AUD/USD وشراء US 500 كلاهما شراءٌ للمخاطرة (2%). ويظهر AUD/USD في المجموعتين، ولهذا فهو أشدّ الأربعة انكشافًا. وفي حركة قوّة دولار مع نفور من المخاطرة تخسر الأربعة معًا، فيكون الرقم الواقعي هو الـ 4% كاملة، لا الـ 1% التي حُدِّد حجم كل مركز عليها."
        }
      },
      {
        "id": "D1",
        "part": "D",
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "Buying on a fall to a level is a limit (below the market, mean reversion). Selling on a break below a level is a stop (below the market, momentum).",
          "ar": "الشراء عند هبوط إلى مستوى أمر حدّي (تحت السوق، ارتداد إلى المتوسط). والبيع عند كسر دون مستوى أمر إيقافي (تحت السوق، زخم)."
        }
      },
      {
        "id": "D2",
        "part": "D",
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "The bid is 1.08055 − 0.00060 = 1.07995, below the 1.08000 stop. At the normal 1.2-pip spread the bid would have been 1.08049 and the stop would not have triggered. The spread widening alone triggered it, with no move in the mid price.",
          "ar": "سعر العرض = 1.08055 − 0.00060 = 1.07995، وهو دون الوقف عند 1.08000. وبالفارق الطبيعي البالغ 1.2 نقطة كان سعر العرض ليكون 1.08049 ولما فُعِّل الوقف. فاتّساع الفارق وحده هو الذي فعّله، دون أي حركة في السعر الوسطي."
        }
      },
      {
        "id": "D3",
        "part": "D",
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "Your losses therefore run larger than planned while your wins do not.",
          "ar": "فخسائرك إذن تكون أكبر من المخطَّط بينما أرباحك لا تكون."
        }
      },
      {
        "id": "D4",
        "part": "D",
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "2 ATR = 170 pips. Risk = $60. Units = 60 / (170 × 0.0001) = 3,529 → 0.03 lots. Actual risk = 170 × $0.30 = $51. Answering 0.07 lots uses 1 ATR instead of 2.",
          "ar": "2 ATR = 170 نقطة. والمخاطرة = 60 دولارًا. والوحدات = 60 ÷ (170 × 0.0001) = 3,529 ← 0.03 لوت. والمخاطرة الفعلية = 170 × 0.30 = 51 دولارًا. والإجابة بـ 0.07 لوت تستخدم ATR واحدًا بدلًا من اثنين."
        }
      },
      {
        "id": "D5",
        "part": "D",
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "It is a definition, not a forecast. The moving-average version and the higher-highs-only version are useful filters, but neither is the structural definition.",
          "ar": "وهو تعريف لا تنبّؤ. أما صيغة المتوسّط المتحرّك وصيغة القمم الأعلى وحدها فمصفاتان نافعتان، لكن أيًّا منهما ليس التعريف البنيوي."
        }
      },
      {
        "id": "D6",
        "part": "D",
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "Markets react to the surprise relative to expectations, not to the direction of the change itself.",
          "ar": "فالأسواق تتفاعل مع المفاجأة نسبةً إلى التوقّعات، لا مع اتجاه التغيّر نفسه."
        }
      },
      {
        "id": "E1",
        "part": "E",
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "The counterparty is the broker, and you own nothing.",
          "ar": "الطرف المقابل هو الوسيط، وأنت لا تملك شيئًا."
        }
      },
      {
        "id": "E2",
        "part": "E",
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "You also lose ombudsman access and standardised risk warnings. There is no version of a beginner's situation in which removing negative balance protection on a leveraged product is correct.",
          "ar": "وتفقد كذلك الوصول إلى أمين المظالم وتحذيرات المخاطر الموحَّدة. ولا توجد صيغة لوضع مبتدئ يكون فيها إزالة الحماية من الرصيد السالب على منتج برافعة أمرًا صحيحًا."
        }
      },
      {
        "id": "E3",
        "part": "E",
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "A genuine retail edge produces expectancy in the region of +0.1R to +0.3R, not +1.8R, and an 85% win rate alongside it is not a plausible combination.",
          "ar": "فالأفضلية الحقيقية لمتداول أفراد تُنتج توقّعًا في حدود +0.1R إلى +0.3R، لا +1.8R، ونسبة ربح 85% إلى جانبها ليست تركيبة معقولة."
        }
      },
      {
        "id": "E4",
        "part": "E",
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "You did not trade the strategy, so the data cannot be attributed to it. Do not adjust the strategy on data produced by not following it.",
          "ar": "فأنت لم تتداول الاستراتيجية، فلا يمكن نسب البيانات إليها. ولا تعدّل الاستراتيجية بناءً على بيانات أنتجها عدم اتّباعها."
        }
      },
      {
        "id": "E5",
        "part": "E",
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "The daily limit exists precisely to intervene at that point. A limit you can override is not a limit.",
          "ar": "فالحدّ اليومي موجود بالضبط للتدخّل عند تلك النقطة. والحدّ الذي تستطيع تجاوزه ليس حدًّا."
        }
      },
      {
        "id": "E6",
        "part": "E",
        "type": "multi",
        "correct": [
          "a",
          "b",
          "c",
          "d"
        ],
        "explanation": {
          "en": "Every element is a red flag, and any one of them is sufficient reason to decline.",
          "ar": "كل عنصر علامة حمراء، وأيٌّ منها سبب كافٍ للرفض."
        }
      },
      {
        "id": "E7",
        "part": "E",
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "8% a month compounds to roughly 152% a year; sustained for ten years, £10,000 becomes over £60 million, and over twenty it exceeds the value of most large companies. Nobody has achieved this, so the claim is either a lie or a scheme paying early investors with later investors' money. The claim is not that someone is a skilled trader.",
          "ar": "8% شهريًّا تتراكم إلى نحو 152% سنويًّا، وباستمرارها عشر سنوات يصبح مبلغ 10,000 أكثر من 60 مليونًا، وفي عشرين سنة يتجاوز قيمة معظم الشركات الكبرى. ولم يحقّق أحد ذلك، فالادّعاء إمّا كذب وإمّا مخطّط يدفع للمستثمرين الأوائل من أموال اللاحقين. وليس الادّعاء أن أحدًا متداول ماهر."
        }
      },
      {
        "id": "E8",
        "part": "E",
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "It is the only unfiltered sample you have access to in an information environment otherwise dominated by self-selected success. Every decision in the course — position sizing, cost analysis, testing before funding — follows from taking that number seriously.",
          "ar": "فهو العيّنة غير المصفّاة الوحيدة المتاحة لك في بيئة معلوماتية تهيمن عليها قصص نجاح ذاتية الانتقاء. وكل قرار في الدورة — تحديد حجم المركز، وتحليل التكاليف، والاختبار قبل التمويل — ينبع من أخذ ذلك الرقم على محمل الجد."
        }
      }
    ]
  },
  "m00": {
    "passMark": 0.8,
    "parts": null,
    "questions": [
      {
        "id": "q1",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "This is a regulator-mandated disclosure, audited and published by every CFD broker in the UK, EU and Australia. It is stable across market conditions because the losses are driven by the product's structure, not by market direction.",
          "ar": "هذا إفصاح تفرضه الجهات التنظيمية، مدقَّق ومنشور من كل وسيط عقود فروقات في المملكة المتحدة والاتحاد الأوروبي وأستراليا. وهو ثابت عبر ظروف السوق لأن الخسائر مدفوعة ببنية المنتج لا باتجاه السوق."
        }
      },
      {
        "id": "q2",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "All three are charged regardless of whether the trade wins. A strategy that is break-even on raw price movement is a losing strategy after costs.",
          "ar": "الثلاثة تُفرَض بصرف النظر عن ربح الصفقة. والاستراتيجية المتعادلة على حركة السعر الخام استراتيجيةٌ خاسرة بعد التكاليف."
        }
      },
      {
        "id": "q3",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "The CFTC and SEC do not permit CFDs for US retail clients. A firm offering them to a US resident is operating outside US law.",
          "ar": "لجنتا CFTC وSEC لا تسمحان بعقود الفروقات لعملاء الأفراد الأمريكيين. والشركة التي تعرضها على مقيم في الولايات المتحدة تعمل خارج القانون الأمريكي."
        }
      },
      {
        "id": "q4",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "Learning to size on $100,000 teaches nothing transferable to the $2,000 you would actually fund.",
          "ar": "التعلّم بتحديد الحجم على 100,000 دولار لا يعلّم شيئًا قابلًا للنقل إلى الـ 2,000 دولار التي ستموّل بها فعلًا."
        }
      },
      {
        "id": "q5",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "Demo fills are often better than live, and nothing about a demo replicates the feeling of real money moving against you.",
          "ar": "تنفيذات التجريبي كثيرًا ما تكون أفضل من الحقيقي، ولا شيء في التجريبي يحاكي شعور المال الحقيقي وهو يتحرّك ضدّك."
        }
      },
      {
        "id": "q6",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "Needing a specific result by a specific date is the condition under which every risk rule gets abandoned.",
          "ar": "الحاجة إلى نتيجة محدّدة بحلول تاريخ محدّد هي الظرف الذي تُهجَر فيه كل قاعدة مخاطرة."
        }
      }
    ]
  },
  "m01": {
    "passMark": 0.8,
    "parts": null,
    "questions": [
      {
        "id": "q1",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "You buy at the ask, 1.09155. Spread = 1.09155 − 1.09140 = 0.00015 = 1.5 pips. Being filled at the bid, 1.09140, is the classic error; reading 15 pips misreads the fifth decimal as a pip; and you never transact at the mid, 1.091475.",
          "ar": "تشتري عند سعر الطلب، 1.09155. والفارق = 1.09155 − 1.09140 = 0.00015 = 1.5 نقطة. والتنفيذ عند سعر العرض، 1.09140، هو الخطأ الكلاسيكي؛ وقراءة 15 نقطة تقرأ الخانة الخامسة على أنها نقطة؛ ولا تُنفَّذ صفقة عند السعر الوسطي، 1.091475، أبدًا."
        }
      },
      {
        "id": "q2",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "A market order consumes resting liquidity at whatever price is available.",
          "ar": "أمر السوق يستهلك السيولة الساكنة بأي سعر متاح."
        }
      },
      {
        "id": "q3",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "Price moves when the book changes, and orders can be added, cancelled or withdrawn with no transaction occurring. This is why prices move violently in thin conditions and why \"there was no news\" has a real answer.",
          "ar": "السعر يتحرّك حين يتغيّر دفتر الأوامر، ويمكن إضافة الأوامر أو إلغاؤها أو سحبها دون وقوع أي صفقة. ولهذا تتحرّك الأسعار بعنف في الظروف الضحلة، ولهذا فلعبارة «لم يكن هناك خبر» جوابٌ حقيقي."
        }
      },
      {
        "id": "q4",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "1 standard lot is 100,000 units; 1.2 pips = 0.00012; 100,000 × 0.00012 = $12. You buy at the ask and are marked at the bid, so the position opens at an unrealised loss of exactly the spread.",
          "ar": "اللوت القياسي 100,000 وحدة، و1.2 نقطة = 0.00012، و100,000 × 0.00012 = 12 دولارًا. فأنت تشتري عند سعر الطلب وتُقوَّم عند سعر العرض، فيُفتح المركز على خسارة غير محقّقة تساوي الفارق بالضبط."
        }
      },
      {
        "id": "q5",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "Roughly 13:00–17:00 UTC. Deepest liquidity, tightest spreads.",
          "ar": "نحو 13:00–17:00 بتوقيت غرينتش. أعمق سيولة، وأضيق فوارق."
        }
      },
      {
        "id": "q6",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "Liquidity is the ability to transact size without moving price; volatility is how much price moves. An exotic currency during a political crisis has high volatility and low liquidity — large moves and terrible fills. A quiet EUR/USD afternoon has low volatility and high liquidity.",
          "ar": "السيولة هي القدرة على تنفيذ حجم دون تحريك السعر، والتقلّب هو مقدار حركة السعر. فعملة نادرة أثناء أزمة سياسية لديها تقلّب مرتفع وسيولة منخفضة — حركات كبيرة وتنفيذ رديء. وظهيرة هادئة في EUR/USD فيها تقلّب منخفض وسيولة مرتفعة."
        }
      },
      {
        "id": "q7",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "A stop cannot be filled at a price that did not exist. Your loss is far larger than the stop implied.",
          "ar": "الوقف لا يمكن تنفيذه بسعر لم يوجد. وخسارتك أكبر بكثير ممّا أوحى به الوقف."
        }
      },
      {
        "id": "q8",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "Most index CFDs are priced off the index future, not the cash index, particularly outside the home session. The future carries cost of carry and no dividend entitlement, so it can sit above or below the cash index.",
          "ar": "معظم عقود الفروقات على المؤشرات تُسعَّر من العقد الآجل للمؤشّر لا من المؤشّر النقدي، خصوصًا خارج جلسة السوق الأمّ. فالعقد الآجل يحمل تكلفة الحمل ولا يستحقّ توزيعات، فيمكن أن يقع فوق المؤشّر النقدي أو تحته."
        }
      },
      {
        "id": "q9",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "Legal, disclosed in the terms, and standard practice, but a conflict of interest worth knowing about.",
          "ar": "قانوني، ومُفصَح عنه في الشروط، وممارسة معتادة، لكنه تضارب مصالح يستحقّ العلم به."
        }
      },
      {
        "id": "q10",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "The fifth decimal place is a tenth of a pip. The risk is a 10x error in either direction: a stop intended at 20 pips set at 20 pipettes is a 2-pip stop, and a position sized for a 2-pip stop when you meant 20 is ten times too large.",
          "ar": "الخانة العشرية الخامسة عُشر نقطة. والمخاطرة خطأ بمقدار عشرة أضعاف في أي اتجاه: فوقفٌ قُصِد عند 20 نقطة ووُضِع عند 20 نقطة جزئية هو وقف عند نقطتين، ومركزٌ حُدِّد حجمه لوقف عند نقطتين بينما قصدت 20 هو أكبر بعشرة أضعاف."
        }
      }
    ]
  },
  "m02": {
    "passMark": 0.8,
    "parts": null,
    "questions": [
      {
        "id": "q1",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "Your counterparty is your broker, not an exchange and not another trader.",
          "ar": "الطرف المقابل لك هو وسيطك، لا بورصة ولا متداول آخر."
        }
      },
      {
        "id": "q2",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "You own no shares and have no claim on the company. If the broker also fails, you are an unsecured creditor of the broker, mitigated by client money segregation and any compensation scheme.",
          "ar": "أنت لا تملك أسهمًا ولا حقّ لك في الشركة. وإن أفلس الوسيط أيضًا، كنت دائنًا غير مضمون له، ويخفّف ذلك فصلُ أموال العملاء وأي نظام تعويض."
        }
      },
      {
        "id": "q3",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "A CFD has no expiry and is leveraged. A share bought outright is fully paid, so there is nothing to fund.",
          "ar": "عقد الفروقات بلا انتهاء وبرافعة. أما السهم المشترى مباشرةً فمدفوع بالكامل، فلا شيء لتمويله."
        }
      },
      {
        "id": "q4",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "Margin % = 1 / leverage. 20:1 and 5% is the cap for non-major FX, major indices and gold, not for major pairs.",
          "ar": "نسبة الهامش = 1 ÷ الرافعة. و20:1 بهامش 5% هو السقف للعملات غير الرئيسية والمؤشرات الرئيسية والذهب، لا للأزواج الرئيسية."
        }
      },
      {
        "id": "q5",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "50% of required initial margin — not 50% of your account. The two are very different numbers.",
          "ar": "50% من الهامش الابتدائي المطلوب — لا 50% من حسابك. والرقمان مختلفان جدًّا."
        }
      },
      {
        "id": "q6",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "Negative balance protection means you cannot lose more than the money in your account; any deficit must be written off. On 15 January 2015 EUR/CHF fell about 30% in minutes with no transactable liquidity. Retail clients ended owing brokers sums far exceeding their deposits, and Alpari UK entered insolvency.",
          "ar": "الحماية من الرصيد السالب تعني أنك لا تستطيع خسارة أكثر من المال الذي في حسابك، وأي عجز يجب أن يُشطَب. وفي 15 يناير 2015 هبط EUR/CHF نحو 30% خلال دقائق بلا سيولة قابلة للتنفيذ. وانتهى الأمر بعملاء أفراد مدينين لوسطائهم بمبالغ تفوق ودائعهم بكثير، ودخلت Alpari UK في الإعسار."
        }
      },
      {
        "id": "q7",
        "part": null,
        "type": "multi",
        "correct": [
          "b",
          "d",
          "e"
        ],
        "explanation": {
          "en": "You lose negative balance protection, leverage caps, compensation scheme eligibility, ombudsman access, standardised risk warnings and the appropriateness assessment. The ability to place stop loss orders and the segregation of client money are unaffected. The correct answer to the offer is no.",
          "ar": "تفقد الحماية من الرصيد السالب وسقوف الرافعة وأهلية نظام التعويض والوصول إلى أمين المظالم وتحذيرات المخاطر الموحَّدة وتقييم الملاءمة. أما القدرة على وضع أوامر وقف الخسارة وفصل أموال العملاء فلا يتأثّران. والجواب الصحيح للعرض هو لا."
        }
      },
      {
        "id": "q8",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "Short positions are debited the gross dividend: 200 × $0.80 = $160 debited. Longs are credited the net, $0.68, so the short pays more than the long receives.",
          "ar": "تُخصَم من مراكز البيع التوزيعات الإجمالية: 200 × 0.80 = 160 دولارًا مخصومة. وتُقيَّد لمراكز الشراء القيمة الصافية، 0.68، فيدفع البائع أكثر ممّا يقبض المشتري."
        }
      },
      {
        "id": "q9",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "A long's worst case is the asset going to zero, bounding the loss at entry price × units. A short has no upper bound on price, so the loss is unbounded in principle. The close-out and negative balance protection cap the actual loss at zero — which is a cap, not a small number.",
          "ar": "أسوأ حالة لمركز الشراء هي وصول الأصل إلى الصفر، فتُحدّ الخسارة عند سعر الدخول × الوحدات. أما مركز البيع فلا حدّ أعلى لسعره، فالخسارة غير محدودة من حيث المبدأ. والإغلاق القسري والحماية من الرصيد السالب يحدّان الخسارة الفعلية عند الصفر — وهو سقف، لا رقم صغير."
        }
      },
      {
        "id": "q10",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "Bonuses to retail clients are prohibited under UK, EU and Australian rules, and 400:1 is far above every retail cap. The usual discovery is at withdrawal: the bonus carries a trading-volume requirement, often hundreds of times its value, and costs alone will consume the account first.",
          "ar": "المكافآت لعملاء الأفراد محظورة بموجب قواعد المملكة المتحدة والاتحاد الأوروبي وأستراليا، ورافعة 400:1 تفوق كل سقوف الأفراد بكثير. والاكتشاف المعتاد يقع عند السحب: فالمكافأة تحمل شرط حجم تداول، غالبًا مئات أضعاف قيمتها، والتكاليف وحدها ستستهلك الحساب أولًا."
        }
      }
    ]
  },
  "m03": {
    "passMark": 0.8,
    "parts": null,
    "questions": [
      {
        "id": "q1",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "0.35 × 100,000 = 35,000 units.",
          "ar": "0.35 × 100,000 = 35,000 وحدة."
        }
      },
      {
        "id": "q2",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "0.8 lots = 80,000 units. Notional = 80,000 × 1.2740 = $101,920. Answering $127,400 uses a full lot; $62,794 divides by the price instead of multiplying.",
          "ar": "0.8 لوت = 80,000 وحدة. والقيمة الاسمية = 80,000 × 1.2740 = 101,920 دولارًا. والإجابة بـ 127,400 تستخدم لوتًا كاملًا، و62,794 تقسم على السعر بدلًا من الضرب."
        }
      },
      {
        "id": "q3",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "0.45 lots = 45,000 units. Pip value = 0.0001 × 45,000 = $4.50.",
          "ar": "0.45 لوت = 45,000 وحدة. وقيمة النقطة = 0.0001 × 45,000 = 4.50 دولارات."
        }
      },
      {
        "id": "q4",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "USD is the base, so the pip value arrives in JPY and must be divided by the price. 0.01 × 100,000 = ¥1,000. ¥1,000 / 152.00 = $6.58. Answering $10.00 is the error of assuming every standard lot is $10 per pip; $1,000.00 leaves the answer in yen.",
          "ar": "الدولار هو العملة الأساس، فتأتي قيمة النقطة بالين ويجب قسمتها على السعر. 0.01 × 100,000 = 1,000 ين. و1,000 ÷ 152.00 = 6.58 دولارات. والإجابة بـ 10.00 دولارات هي خطأ افتراض أن كل لوت قياسي يساوي 10 دولارات للنقطة، و1,000.00 تترك الإجابة بالين."
        }
      },
      {
        "id": "q5",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "0.12 lots × 100 oz = 12 ounces. A $1.00 move = $12.00.",
          "ar": "0.12 لوت × 100 أونصة = 12 أونصة. وحركة 1.00 دولار = 12.00 دولارًا."
        }
      },
      {
        "id": "q6",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "0.6 lots = 60,000 units. (1.08790 − 1.08450) = 0.00340 × 60,000 = +$204.00.",
          "ar": "0.6 لوت = 60,000 وحدة. و(1.08790 − 1.08450) = 0.00340 × 60,000 = +204.00 دولارًا."
        }
      },
      {
        "id": "q7",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "Short, and price rose, so this is a loss. (1.26900 − 1.27310) = −0.00410 × 25,000 = −$102.50.",
          "ar": "مركز بيع، والسعر ارتفع، فهذه خسارة. (1.26900 − 1.27310) = −0.00410 × 25,000 = −102.50 دولارًا."
        }
      },
      {
        "id": "q8",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "1 / (1 − 0.35) − 1 = 1 / 0.65 − 1 = 53.85%. Answering 35% is the symmetry error the whole lesson exists to correct.",
          "ar": "1 ÷ (1 − 0.35) − 1 = 1 ÷ 0.65 − 1 = 53.85%. والإجابة بـ 35% هي خطأ التماثل الذي وُجد الدرس كلّه لتصحيحه."
        }
      },
      {
        "id": "q9",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "Notional = 4 × 5,150 = $20,600. Annual rate = 5.0% + 2.5% = 7.5%. 20,600 × 0.075 / 365 = $4.23 per night. Answering $2.82 uses the benchmark alone; $1.41 uses the markup alone.",
          "ar": "القيمة الاسمية = 4 × 5,150 = 20,600 دولار. والسعر السنوي = 5.0% + 2.5% = 7.5%. و20,600 × 0.075 ÷ 365 = 4.23 دولارات لكل ليلة. والإجابة بـ 2.82 تستخدم سعر المرجع وحده، و1.41 تستخدم هامش الوسيط وحده."
        }
      },
      {
        "id": "q10",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "Three days of financing are charged on that one night. Every other weekday rollover is one day, and there is no rollover at the weekend because the market is closed.",
          "ar": "تُفرَض ثلاثة أيام من التمويل في تلك الليلة وحدها. وكل تدوير في سائر أيام الأسبوع يوم واحد، ولا تدوير في نهاية الأسبوع لأن السوق مغلقة."
        }
      },
      {
        "id": "q11",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "At 0.5 lots (50,000 units): A = spread 1.2 pips × 50,000 = $6.00, commission $0, total $6.00. B = spread 0.2 pips × 50,000 = $1.00, commission 0.5 × $3.50 × 2 = $3.50, total $4.50. B is cheaper by $1.50. The answer would flip at a small enough size, so run it at your own typical size.",
          "ar": "عند 0.5 لوت (50,000 وحدة): أ = الفارق 1.2 نقطة × 50,000 = 6.00 دولارات، والعمولة 0، والإجمالي 6.00 دولارات. وب = الفارق 0.2 نقطة × 50,000 = 1.00 دولار، والعمولة 0.5 × 3.50 × 2 = 3.50 دولارات، والإجمالي 4.50 دولارات. فـ ب أرخص بـ 1.50 دولار. والجواب ينقلب عند حجم صغير بما يكفي، فأجرِ الحساب بحجمك المعتاد."
        }
      },
      {
        "id": "q12",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "Cost ratio = 9.50 / 25 = 38%, which sits in the \"fighting the cost structure\" band. The trade would need an unusually good reward-to-risk to be worth taking, and the underlying problem is that the position is too small relative to its fixed costs, the account is too small for this instrument, or the holding period is too short.",
          "ar": "نسبة التكلفة = 9.50 ÷ 25 = 38%، وهذا يقع في نطاق «مصارعة هيكل التكاليف». وستحتاج الصفقة إلى عائد إلى مخاطرة جيد على نحو غير معتاد لتستحقّ الدخول، والمشكلة الكامنة أن المركز صغير جدًّا نسبةً إلى تكاليفه الثابتة، أو أن الحساب أصغر من أن يناسب هذه الأداة، أو أن مدة الاحتفاظ قصيرة جدًّا."
        }
      }
    ]
  },
  "m04": {
    "passMark": 0.8,
    "parts": null,
    "questions": [
      {
        "id": "q1",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "Margin % = 1 / leverage. 20:1 → 5%.",
          "ar": "نسبة الهامش = 1 ÷ الرافعة. و20:1 ← 5%."
        }
      },
      {
        "id": "q2",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "1 / 30 = 3.33%. Put that against real behaviour: an index can move 3% on an ordinary bad day.",
          "ar": "1 ÷ 30 = 3.33%. وضع ذلك في مواجهة السلوك الحقيقي: يمكن للمؤشّر أن يتحرّك 3% في يوم سيئ عادي."
        }
      },
      {
        "id": "q3",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "Both lose 30 pips × the pip value of a 0.2-lot position. Leverage determines how much capital is reserved as margin, not how much you lose. This surprises beginners because the platform presents leverage as a risk setting; it is a permission setting.",
          "ar": "كلاهما يخسر 30 نقطة × قيمة النقطة لمركز قدره 0.2 لوت. والرافعة تحدّد مقدار رأس المال المحجوز هامشًا، لا مقدار ما تخسره. وهذا يفاجئ المبتدئين لأن المنصّة تقدّم الرافعة على أنها إعداد مخاطرة، وهي إعداد إذن."
        }
      },
      {
        "id": "q4",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "Used margin is capital reserved against open positions — reserved, not spent. Note that the version dividing used margin by equity inverts the margin level ratio.",
          "ar": "الهامش المستخدَم رأس مال محجوز مقابل المراكز المفتوحة — محجوز لا منفَق. ولاحظ أن الصيغة التي تقسم الهامش المستخدَم على حقوق الملكية تقلب نسبة مستوى الهامش."
        }
      },
      {
        "id": "q5",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "A trader watching balance during a losing position sees nothing happening. Equity is the truth.",
          "ar": "المتداول الذي يراقب الرصيد أثناء مركز خاسر لا يرى شيئًا يحدث. وحقوق الملكية هي الحقيقة."
        }
      },
      {
        "id": "q6",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "Not 50% of the account. The two are very different numbers, and confusing them is the most common error in this module.",
          "ar": "لا 50% من الحساب. والرقمان مختلفان جدًّا، والخلط بينهما أشيع خطأ في هذه الوحدة."
        }
      },
      {
        "id": "q7",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "1.2 lots = 120,000 units. Notional = 120,000 × 1.0900 = $130,800. Used margin = 130,800 / 30 = $4,360. Margin level = 6,000 / 4,360 = 137.6%. Answering 45.9% inverts the ratio.",
          "ar": "1.2 لوت = 120,000 وحدة. والقيمة الاسمية = 120,000 × 1.0900 = 130,800 دولارًا. والهامش المستخدَم = 130,800 ÷ 30 = 4,360 دولارًا. ومستوى الهامش = 6,000 ÷ 4,360 = 137.6%. والإجابة بـ 45.9% تقلب النسبة."
        }
      },
      {
        "id": "q8",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "Solving with margin recalculated as price falls gives 323.7 pips, a loss of $3,885, which is 64.7% of the account. Note that this is a 2.97% move in EUR/USD — uncommon in a day, entirely routine over a week. Answering about 250 pips and a 50% loss is the 100% margin call level, not the close-out.",
          "ar": "بالحلّ مع إعادة حساب الهامش مع هبوط السعر تكون النتيجة 323.7 نقطة، وخسارة قدرها 3,885 دولارًا، أي 64.7% من الحساب. ولاحظ أن هذه حركة قدرها 2.97% في EUR/USD — غير شائعة في يوم واحد، وروتينية تمامًا على مدى أسبوع. والإجابة بنحو 250 نقطة وخسارة 50% هي مستوى نداء الهامش عند 100% لا الإغلاق القسري."
        }
      },
      {
        "id": "q9",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "Under 5:1 while learning; under 2:1 is better. It is the single best one-glance summary of account risk because it accounts for five positions at 2:1 each adding up to 10:1.",
          "ar": "دون 5:1 أثناء التعلّم، ودون 2:1 أفضل. وهي أفضل ملخّص يُدرَك بنظرة واحدة لمخاطرة الحساب لأنها تأخذ في الحسبان أن خمسة مراكز برافعة 2:1 لكلٍّ منها تجتمع لتصبح 10:1."
        }
      },
      {
        "id": "q10",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "No price existed at your level to fill against. A stop gives you an exit instruction, not an exit price.",
          "ar": "لم يوجد سعر عند مستواك لتُنفَّذ مقابله. فالوقف يعطيك تعليمة خروج، لا سعر خروج."
        }
      },
      {
        "id": "q11",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "The deficit is written off. The worst case is zero, not small. It also does not apply per position, offshore, or to professional clients.",
          "ar": "العجز يُشطَب. وأسوأ الحالات هو الصفر، لا مبلغ صغير. وهي كذلك لا تنطبق على كل مركز على حدة، ولا خارج تلك الولايات، ولا على العملاء المحترفين."
        }
      },
      {
        "id": "q12",
        "part": null,
        "type": "multi",
        "correct": [
          "a",
          "b"
        ],
        "explanation": {
          "en": "The stop cannot protect you across a gap, and earnings are deliberately released outside the trading session, so the share can open well below your stop and you are filled at the open. Tightening the stop does nothing about a gap, and averaging down increases the loss.",
          "ar": "الوقف لا يستطيع حمايتك عبر فجوة، وإعلانات الأرباح تُنشَر عمدًا خارج جلسة التداول، فيمكن أن يفتح السهم أدنى بكثير من وقفك وتُنفَّذ عند الافتتاح. وتضييق الوقف لا يفعل شيئًا حيال الفجوة، وتخفيض المتوسط يزيد الخسارة."
        }
      }
    ]
  },
  "m05": {
    "passMark": 0.8,
    "parts": null,
    "questions": [
      {
        "id": "q1",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "Every order type is a variation on that trade-off; choosing one is choosing which of the two you give up.",
          "ar": "وكل نوع من الأوامر تنويع على تلك المقايضة، واختيار أحدها هو اختيار أيّ الأمرين تتخلّى عنه."
        }
      },
      {
        "id": "q2",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "Stop orders to buy are placed above the current price. A buy limit at 1.0920 would fill immediately and worse, since it sits above the market.",
          "ar": "أوامر الشراء الإيقافية توضع فوق السعر الحالي. وأمر شراء حدّي عند 1.0920 كان سيُنفَّذ فورًا وبسعر أسوأ، لأنه فوق السوق."
        }
      },
      {
        "id": "q3",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "Confusing them produces immediate and expensive errors.",
          "ar": "والخلط بينهما يُنتج أخطاءً فورية ومكلفة."
        }
      },
      {
        "id": "q4",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "The scenario it protects against is exactly the scenario in which it fails. Its legitimate use is entries where a bad fill makes the trade not worth taking.",
          "ar": "فالسيناريو الذي يحميك منه هو بالضبط السيناريو الذي يفشل فيه. واستخدامه المشروع في أوامر الدخول التي يجعل فيها التنفيذ السيئ الصفقةَ غير جديرة بالدخول."
        }
      },
      {
        "id": "q5",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "A long's stop triggers off the bid. At a 9-pip spread with a mid of 1.08560, the bid is 1.08560 − 0.00045 = 1.08515. The stop at 1.08500 is not triggered — but only by 1.5 pips. A slightly wider spread would trigger it with no change in the mid at all. That mechanism is the point, not the specific answer.",
          "ar": "وقف الشراء يُفعَّل على سعر العرض. وبفارق 9 نقاط ووسطي 1.08560، يكون سعر العرض 1.08560 − 0.00045 = 1.08515. فالوقف عند 1.08500 غير مفعَّل — لكن بفارق 1.5 نقطة فقط. وفارقٌ أوسع قليلًا كان سيفعّله دون أي تغيّر في الوسطي إطلاقًا. وتلك الآلية هي المقصد، لا الإجابة بعينها."
        }
      },
      {
        "id": "q6",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "Your losses therefore run larger than planned while your wins do not run larger than planned. Build that asymmetry into your expectations.",
          "ar": "فخسائرك إذن تكون أكبر من المخطَّط بينما أرباحك لا تكون أكبر من المخطَّط. فاجعل ذلك اللاتماثل جزءًا من توقّعاتك."
        }
      },
      {
        "id": "q7",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "3 / 25 = 12% more risk than planned. A 25-pip stop is a 28-pip stop in expectation, so a \"1% risk\" trade is really 1.12%.",
          "ar": "3 ÷ 25 = مخاطرة أكبر بـ 12% ممّا خُطِّط. فوقف 25 نقطة هو وقف 28 نقطة في التوقّع، فصفقة «مخاطرتها 1%» هي في الحقيقة 1.12%."
        }
      },
      {
        "id": "q8",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "Moving a stop further away converts a defined, planned, survivable loss into an undefined one. Every account destroyed by a single trade involved a stop that was moved.",
          "ar": "نقل الوقف بعيدًا يحوّل خسارةً محدّدةً ومخطَّطة وقابلة للنجاة إلى خسارة غير محدّدة. وكل حساب دمّرته صفقة واحدة كان فيه وقف قد نُقل."
        }
      },
      {
        "id": "q9",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "A win that came from violating the plan is the most dangerous outcome available, because it reinforces the habit that will eventually be very expensive.",
          "ar": "والربح الآتي من مخالفة الخطة أخطر نتيجة ممكنة، لأنه يرسّخ العادة التي ستصبح مكلفة جدًّا في النهاية."
        }
      },
      {
        "id": "q10",
        "part": null,
        "type": "multi",
        "correct": [
          "a",
          "b",
          "d",
          "e",
          "f"
        ],
        "explanation": {
          "en": "How confident you feel is not a pre-trade check — confidence is uncorrelated with accuracy, and sizing by conviction is explicitly warned against. The others all appear on the pre-trade checklist.",
          "ar": "شعورك بالثقة ليس فحصًا قبل الصفقة — فالثقة غير مرتبطة بالدقّة، وتحديد الحجم بالقناعة محذَّر منه صراحةً. أما البقية فكلها ترد في قائمة ما قبل الصفقة."
        }
      }
    ]
  },
  "m06": {
    "passMark": 0.8,
    "parts": null,
    "questions": [
      {
        "id": "q1",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "That reversal is how risk rules get abandoned without ever being consciously broken. Size = risk budget / (stop distance × value per point per unit).",
          "ar": "وهذا الانعكاس هو كيف تُهجَر قواعد المخاطرة دون أن تُخرَق عن وعي قطّ. والحجم = ميزانية المخاطرة ÷ (مسافة الوقف × القيمة لكل نقطة لكل وحدة)."
        }
      },
      {
        "id": "q2",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "Risk = $60. Stop = 42 pips. Units = 60 / (42 × 0.0001) = 14,286 → 0.14 lots rounded down. Actual risk = 42 × $1.40 = $58.80 (0.98%). Rounding up to 0.15 lots gives $63.00, which breaches the limit.",
          "ar": "المخاطرة = 60 دولارًا. والوقف = 42 نقطة. والوحدات = 60 ÷ (42 × 0.0001) = 14,286 ← 0.14 لوت مقرَّبًا إلى الأسفل. والمخاطرة الفعلية = 42 × 1.40 = 58.80 دولارًا (0.98%). والتقريب إلى الأعلى إلى 0.15 لوت يعطي 63.00 دولارًا، وهو ما يخرق الحدّ."
        }
      },
      {
        "id": "q3",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "You can then see whether the strategy works independently of how much money you happened to have at the time.",
          "ar": "فترى بعدها هل تعمل الاستراتيجية بمعزل عن مقدار المال الذي صادف أن يكون لديك حينها."
        }
      },
      {
        "id": "q4",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "1 / (1 + 2.5) = 28.6%. Answering 40.0% is 1 / 2.5, the common slip.",
          "ar": "1 ÷ (1 + 2.5) = 28.6%. والإجابة بـ 40.0% هي 1 ÷ 2.5، وهو الزلل الشائع."
        }
      },
      {
        "id": "q5",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "E = (0.72 × 0.35) − (0.28 × 1) = 0.252 − 0.28 = −0.028R. Not viable, despite winning 72% of the time. With costs: −0.088R, worse. This is the classic shape of a losing system that feels excellent.",
          "ar": "ت = (0.72 × 0.35) − (0.28 × 1) = 0.252 − 0.28 = −0.028R. غير صالحة، رغم الربح في 72% من الصفقات. وبالتكاليف: −0.088R، أسوأ. وهذا هو الشكل الكلاسيكي لنظام خاسر يبدو ممتازًا."
        }
      },
      {
        "id": "q6",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "Expectancy is (0.9 × 1) − (0.1 × 10) = −0.1 per trade: a 90% win rate with losses ten times the size of wins loses money. Only the combination matters, and the combination is expectancy.",
          "ar": "التوقّع = (0.9 × 1) − (0.1 × 10) = −0.1 لكل صفقة: فنسبة ربح 90% مع خسائر تعادل عشرة أمثال الأرباح تخسر المال. والتركيبة وحدها هي ما يهمّ، والتركيبة هي التوقّع."
        }
      },
      {
        "id": "q7",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "Drawdown = (14,000 − 9,800) / 14,000 = 30%. Recovery = 1 / 0.70 − 1 = 42.9%. Answering 30% for both is the symmetry error.",
          "ar": "التراجع = (14,000 − 9,800) ÷ 14,000 = 30%. والتعافي = 1 ÷ 0.70 − 1 = 42.9%. والإجابة بـ 30% للاثنين هي خطأ التماثل."
        }
      },
      {
        "id": "q8",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "At a 45% win rate a five-loss streak is close to certain within any hundred trades. A trader who abandons a plan after five losses will abandon every plan they ever adopt.",
          "ar": "عند نسبة ربح 45% تكون سلسلة من خمس خسائر شبه مؤكّدة ضمن أي مئة صفقة. والمتداول الذي يهجر خطة بعد خمس خسائر سيهجر كل خطة يتبنّاها."
        }
      },
      {
        "id": "q9",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "0.95^10 = 0.5987, so 59.9% remains, a 40.1% drawdown. Recovery = 1 / 0.5987 − 1 = 67.0%. Answering that 50% remains is the error of multiplying 5% × 10 linearly.",
          "ar": "0.95^10 = 0.5987، أي أن 59.9% يبقى، بتراجع قدره 40.1%. والتعافي = 1 ÷ 0.5987 − 1 = 67.0%. والإجابة ببقاء 50% هي خطأ ضرب 5% × 10 ضربًا خطّيًّا."
        }
      },
      {
        "id": "q10",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "Fixed fractional sizing on falling equity does this automatically, which is what makes ruin asymptotically unreachable. The instinct to size up in a drawdown is exactly inverted.",
          "ar": "والتحديد الكسري الثابت على حقوق ملكية هابطة يفعل ذلك تلقائيًّا، وهو ما يجعل الإفلاس غير قابل للبلوغ مقاربيًّا. والغريزة إلى تكبير الحجم في التراجع مقلوبة تمامًا."
        }
      },
      {
        "id": "q11",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "Long EUR/USD, long GBP/USD and short USD/CHF all profit from dollar weakness. Being long EUR/USD and long USD/CHF would be the same bet twice, not a hedge — the pairs are inverse.",
          "ar": "شراء EUR/USD وشراء GBP/USD وبيع USD/CHF كلها تربح من ضعف الدولار. وأن تكون مشتريًا لـ EUR/USD ومشتريًا لـ USD/CHF هو الرهان نفسه مرّتين لا تحوّطًا — فالزوجان متعاكسان."
        }
      },
      {
        "id": "q12",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "The diversification you measured in calm markets is not the diversification you have when you need it.",
          "ar": "فالتنويع الذي قِسته في أسواق هادئة ليس التنويع الذي تملكه حين تحتاج إليه."
        }
      }
    ]
  },
  "m07": {
    "passMark": 0.8,
    "parts": null,
    "questions": [
      {
        "id": "q1",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "The body is the net movement over the period; the wicks are the extremes reached but not held.",
          "ar": "الجسم هو صافي الحركة خلال الفترة، والفتائل هي الأطراف التي بُلغت ولم تُحتفَظ."
        }
      },
      {
        "id": "q2",
        "part": null,
        "type": "multi",
        "correct": [
          "a",
          "b",
          "d"
        ],
        "explanation": {
          "en": "A 1.5-pip spread is 1.5% of a 100-pip stop but 15% of a 10-pip stop. The misconception is that lower timeframes are technically more advanced: they are not, they are harder, more expensive and more punishing of small errors.",
          "ar": "فارق 1.5 نقطة يمثّل 1.5% من وقف 100 نقطة و15% من وقف 10 نقاط. والمفهوم الخاطئ هو أن الأطر الأدنى أكثر تقدّمًا تقنيًّا: فهي ليست كذلك، بل أصعب وأغلى وأشدّ معاقبةً للأخطاء الصغيرة."
        }
      },
      {
        "id": "q3",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "That is a change in description, not a forecast — it does not mean price will fall, only that any rule conditioned on \"uptrend\" no longer applies.",
          "ar": "وذلك تغيّر في الوصف لا تنبّؤ — فهو لا يعني أن السعر سيهبط، بل أن أي قاعدة مشروطة بـ«اتجاه صاعد» لم تعد تنطبق."
        }
      },
      {
        "id": "q4",
        "part": null,
        "type": "multi",
        "correct": [
          "b",
          "c",
          "e"
        ],
        "explanation": {
          "en": "Fewer is better — three to five on a chart. Drawing as many as possible makes levels unfalsifiable and useless; redrawing a level after price passes it is curve-fitting your own chart in real time.",
          "ar": "والأقلّ أفضل — من ثلاثة إلى خمسة على الرسم. فرسم أكبر عدد ممكن يجعل المستويات غير قابلة للتكذيب وعديمة النفع، وإعادة رسم مستوى بعد تجاوز السعر له هي مواءمة منحنى رسمك أنت في الزمن الحقيقي."
        }
      },
      {
        "id": "q5",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "What indicators provide is objectivity, quantification and consistency — not information and not prediction.",
          "ar": "وما توفّره المؤشّرات هو الموضوعية والتكميم والاتّساق — لا المعلومة ولا التنبّؤ."
        }
      },
      {
        "id": "q6",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "RSI is better used as a filter within a direction established elsewhere — for example, buying pullbacks to RSI 40–50 in an established uptrend.",
          "ar": "ويُستخدَم المؤشّر استخدامًا أفضل مصفاةً ضمن اتجاه حُدِّد في مكان آخر — كشراء الارتدادات عند 40–50 في اتجاه صاعد راسخ."
        }
      },
      {
        "id": "q7",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "2 ATR = 120 pips. Risk = $80. Units = 80 / (120 × 0.0001) = 6,667 → 0.06 lots. Actual risk = 120 × $0.60 = $72. Answering 0.13 lots uses 1 ATR instead of 2.",
          "ar": "2 ATR = 120 نقطة. والمخاطرة = 80 دولارًا. والوحدات = 80 ÷ (120 × 0.0001) = 6,667 ← 0.06 لوت. والمخاطرة الفعلية = 120 × 0.60 = 72 دولارًا. والإجابة بـ 0.13 لوت تستخدم ATR واحدًا بدلًا من اثنين."
        }
      },
      {
        "id": "q8",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "Since markets range most of the time, that is the dominant experience of a crossover system.",
          "ar": "وبما أن الأسواق في نطاق معظم الوقت، فتلك هي التجربة المهيمنة لنظام التقاطع."
        }
      },
      {
        "id": "q9",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "Markets price expectations and react to surprises — actual versus forecast, not actual versus previous.",
          "ar": "فالأسواق تسعّر التوقّعات وتتفاعل مع المفاجآت — الفعلي مقابل المتوقَّع، لا الفعلي مقابل السابق."
        }
      },
      {
        "id": "q10",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "Two actions address it: close or substantially reduce before the announcement, or use a guaranteed stop loss.",
          "ar": "وإجراءان يعالجانها: الإغلاق أو التقليص الكبير قبل الإعلان، أو استخدام وقف خسارة مضمون."
        }
      }
    ]
  },
  "m08": {
    "passMark": 0.8,
    "parts": null,
    "questions": [
      {
        "id": "q1",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "\"After costs\" eliminates them quietly, because they look profitable right up until the spread, commission and financing are subtracted.",
          "ar": "و«بعد التكاليف» تستبعدها في صمت، لأنها تبدو رابحة إلى أن يُطرَح الفارق السعري والعمولة والتمويل."
        }
      },
      {
        "id": "q2",
        "part": null,
        "type": "multi",
        "correct": [
          "a",
          "b",
          "d"
        ],
        "explanation": {
          "en": "None of the real sources involves better analysis, because a retail trader has no advantage in speed, information, capital or cost. Indicator settings are available to everyone with the same defaults. The remaining advantages are behavioural.",
          "ar": "ولا يتضمّن أيٌّ من المصادر الحقيقية تحليلًا أفضل، لأن متداول الأفراد لا أفضلية له في السرعة ولا المعلومات ولا رأس المال ولا التكلفة. وإعدادات المؤشّرات متاحة للجميع بالإعدادات الافتراضية نفسها. فالأفضليات المتبقّية سلوكية."
        }
      },
      {
        "id": "q3",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "It is a style, not a strategy. A style cannot be tested.",
          "ar": "فهي أسلوب لا استراتيجية. والأسلوب لا يمكن اختباره."
        }
      },
      {
        "id": "q4",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "If not, the rules are not specified.",
          "ar": "فإن لم يستطع، فالقواعد غير محدّدة."
        }
      },
      {
        "id": "q5",
        "part": null,
        "type": "multi",
        "correct": [
          "a",
          "b",
          "c",
          "e",
          "f"
        ],
        "explanation": {
          "en": "A monthly profit target in currency is not a plan component — it is the pressure that causes rules to be abandoned. Objectives should be process-based, not outcome-based.",
          "ar": "وهدف ربح شهري بالعملة ليس مكوّنًا في الخطة — بل هو الضغط الذي يدفع إلى هجر القواعد. والأهداف ينبغي أن تكون قائمة على العملية لا على النتيجة."
        }
      },
      {
        "id": "q6",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "They prevent the plan becoming a record of your emotional history rather than a strategy.",
          "ar": "وهي تمنع الخطة من أن تصبح سجلًّا لتاريخك العاطفي لا استراتيجية."
        }
      },
      {
        "id": "q7",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "Only reasoning recorded in advance is evidence about your decision-making.",
          "ar": "والتعليل المسجَّل مسبقًا وحده دليلٌ على طريقة اتّخاذك للقرار."
        }
      },
      {
        "id": "q8",
        "part": null,
        "type": "multi",
        "correct": [
          "a",
          "b",
          "c",
          "d"
        ],
        "explanation": {
          "en": "A low win rate does not affect the size of the average loss — those are independent statistics. The diagnosis is only available because you recorded R-multiples, which is the argument for doing so.",
          "ar": "ونسبة الربح المنخفضة لا تؤثّر في حجم متوسط الخسارة — فهما إحصاءان مستقلّان. والتشخيص لا يتاح إلا لأنك سجّلت مضاعفات R، وتلك هي الحجّة لفعل ذلك."
        }
      },
      {
        "id": "q9",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "Look-ahead bias is using information that was not available at the time of the decision. Testing only the instruments that still exist is survivorship bias, tuning a parameter until performance improves is over-fitting, and omitting commission is ignoring costs — all real errors, but different ones.",
          "ar": "تحيّز النظر إلى الأمام هو استخدام معلومة لم تكن متاحة وقت القرار. واختبار الأدوات الباقية وحدها تحيّز بقاء، وضبط معامِل حتى يتحسّن الأداء إفراط في المواءمة، وإغفال العمولة تجاهل للتكاليف — وكلها أخطاء حقيقية لكنها مختلفة."
        }
      },
      {
        "id": "q10",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "The divergence has a cause and it is usually locatable. Re-optimising the parameters is over-fitting with extra steps.",
          "ar": "فللتباعد سبب وهو قابل للتحديد عادةً. وإعادة تحسين المعاملات إفراط في المواءمة بخطوات إضافية."
        }
      }
    ]
  },
  "m09": {
    "passMark": 0.75,
    "parts": null,
    "questions": [
      {
        "id": "q1",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "Driven by loss aversion: closing a winner feels good, closing a loser is the moment of pain, so it is deferred. It is quantitatively the most damaging bias in retail trading.",
          "ar": "مدفوع بالنفور من الخسارة: فإغلاق الرابحة يُشعر بالرضا، وإغلاق الخاسرة لحظة الألم، فيُؤجَّل. وهو كمّيًّا أشدّ التحيّزات ضررًا في تداول الأفراد."
        }
      },
      {
        "id": "q2",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "The reckless trade that happened to win gets recorded as validation. The countermeasure is the process-compliance flag and grading on the four-cell grid rather than on P&L.",
          "ar": "فالصفقة المتهوّرة التي صادف أن ربحت تُسجَّل تبريرًا. والتدبير المضادّ هو علامة الالتزام بالعملية والتقييم على الشبكة ذات الخانات الأربع لا على الربح والخسارة."
        }
      },
      {
        "id": "q3",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "Steps 1 and 2 are normal and unavoidable. The whole spiral typically completes within a single session — most accounts that are destroyed are destroyed in one sitting, not by gradual attrition.",
          "ar": "فالخطوتان 1 و2 طبيعيتان ولا مفرّ منهما. والدوّامة كلها تكتمل عادةً خلال جلسة واحدة — فمعظم الحسابات التي تُدمَّر تُدمَّر في جلسة واحدة لا بتآكل تدريجي."
        }
      },
      {
        "id": "q4",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "The test: can you name the specific rule or condition causing hesitation? If yes, it is analysis. If no, it is fear — reduce your size until the hesitation disappears.",
          "ar": "الاختبار: أتستطيع تسمية القاعدة أو الشرط المحدّد المسبّب للتردّد؟ فإن استطعت فهو تحليل، وإن لم تستطع فهو خوف — فقلّل حجمك حتى يزول التردّد."
        }
      },
      {
        "id": "q5",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "A strategy producing four signals a month leaves a great deal of empty time. A large share of rule violations happen in tedium rather than distress, so the response is structural rather than motivational: use price alerts and fixed review times, and do not sit in front of the platform between them.",
          "ar": "الاستراتيجية التي تُنتج أربع إشارات شهريًّا تترك وقتًا فارغًا كبيرًا. وحصة كبيرة من مخالفات القواعد تقع في الضجر لا في الضيق، فالاستجابة بنيوية لا تحفيزية: استخدم تنبيهات الأسعار وأوقات مراجعة ثابتة، ولا تجلس أمام المنصّة بينها."
        }
      },
      {
        "id": "q6",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "It is dangerous because it is a coherent-sounding goal that has nothing to do with the market. Each trade is independent; the previous loss is a sunk cost.",
          "ar": "وهو خطر لأنه هدف يبدو متماسكًا ولا علاقة له بالسوق. فكل صفقة مستقلّة، والخسارة السابقة تكلفة غارقة."
        }
      },
      {
        "id": "q7",
        "part": null,
        "type": "multi",
        "correct": [
          "a",
          "b",
          "c",
          "e"
        ],
        "explanation": {
          "en": "Reminding yourself each morning to be disciplined is a willpower control wearing the costume of a system. A structure changes the situation; an intention does not.",
          "ar": "وتذكير نفسك كل صباح بأن تكون منضبطًا ضابطُ إرادة يرتدي زيّ نظام. فالبنية تغيّر الموقف، أما النيّة فلا."
        }
      },
      {
        "id": "q8",
        "part": null,
        "type": "multi",
        "correct": [
          "a",
          "b",
          "c",
          "d"
        ],
        "explanation": {
          "en": "Three losing trades in a row is ordinary variance, not a stop condition — at a 45% win rate it is close to certain within any hundred trades. Also stop if you are trading money you cannot afford to lose, or hiding your trading from people close to you.",
          "ar": "وثلاث صفقات خاسرة متتالية تباينٌ عادي لا شرط توقّف — فعند نسبة ربح 45% تكون شبه مؤكّدة ضمن أي مئة صفقة. وتوقّف كذلك إن كنت تتداول بمال لا تستطيع تحمّل خسارته، أو تخفي تداولك عمّن هم قريبون منك."
        }
      }
    ]
  },
  "m10": {
    "passMark": 0.8,
    "parts": null,
    "questions": [
      {
        "id": "q1",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "Regulation comes first because it determines whether you can get your money back at all, and whether you can lose more than you deposited. A broker with the tightest spreads and no meaningful regulation is not cheap; it is a risk of total loss with a small discount attached.",
          "ar": "يأتي التنظيم أولًا لأنه يحدّد هل تستطيع استرداد مالك أصلًا، وهل يمكن أن تخسر أكثر ممّا أودعت. فالوسيط ذو أضيق الفوارق وبلا تنظيم ذي معنى ليس رخيصًا، بل هو مخاطرة خسارة كاملة مع خصم صغير مرفق."
        }
      },
      {
        "id": "q2",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "The website, platform and staff are identical. The entity name is stated in plain text in your client agreement — read it before depositing.",
          "ar": "فالموقع والمنصّة والموظّفون متطابقون. واسم الكيان مذكور بنصّ صريح في اتفاقية عميلك — فاقرأها قبل الإيداع."
        }
      },
      {
        "id": "q3",
        "part": null,
        "type": "multi",
        "correct": [
          "a",
          "b",
          "c",
          "e"
        ],
        "explanation": {
          "en": "Advertised spreads are best-case averages measured in the most liquid hours, often quoted as \"from\" figures. There is no separately disclosed profit margin — the broker's margin is inside the spread and commission.",
          "ar": "فالفوارق المعلَنة متوسّطات لأفضل الحالات مقيسة في أكثر الساعات سيولةً، وكثيرًا ما تُقتبَس أرقامًا «ابتداءً من». ولا يوجد هامش ربح مُفصَح عنه على حدة — فهامش الوسيط داخل الفارق والعمولة."
        }
      },
      {
        "id": "q4",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "A firm that makes deposits instant and withdrawals difficult is telling you something important, cheaply. It is also the most common complaint pattern for problematic firms.",
          "ar": "فالشركة التي تجعل الإيداع فوريًّا والسحب صعبًا تخبرك بشيء مهمّ بتكلفة زهيدة. وهو كذلك نمط الشكوى الأشيع بشأن الشركات الإشكالية."
        }
      },
      {
        "id": "q5",
        "part": null,
        "type": "multi",
        "correct": [
          "a",
          "b",
          "c",
          "d",
          "f"
        ],
        "explanation": {
          "en": "Also expiry or rollover behaviour and denomination currency. There is no such thing as an instrument's historical win rate — that is a property of a strategy, not an instrument.",
          "ar": "وكذلك سلوك الانتهاء أو التدوير وعملة التقويم. ولا وجود لشيء اسمه نسبة ربح تاريخية للأداة — فتلك خاصّية استراتيجية لا أداة."
        }
      },
      {
        "id": "q6",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "Reducing friction on the decision to trade reliably increases the number of trades that are not in your plan.",
          "ar": "فتقليل الاحتكاك على قرار التداول يزيد بانتظام عدد الصفقات التي ليست في خطّتك."
        }
      },
      {
        "id": "q7",
        "part": null,
        "type": "single",
        "correct": [
          "b"
        ],
        "explanation": {
          "en": "A journal built from entry and exit prices omits it entirely. Traders who do not reconcile routinely overstate their performance by the amount of financing they forgot about.",
          "ar": "فالسجلّ المبني على أسعار الدخول والخروج يُغفله تمامًا. والمتداولون الذين لا يطابقون يبالغون بانتظام في أدائهم بمقدار التمويل الذي نسوه."
        }
      },
      {
        "id": "q8",
        "part": null,
        "type": "single",
        "correct": [
          "c"
        ],
        "explanation": {
          "en": "The volume requirement is often hundreds of times the bonus amount, and costs alone will consume the account before it can be reached.",
          "ar": "وشرط الحجم غالبًا مئات أضعاف مبلغ المكافأة، والتكاليف وحدها ستستهلك الحساب قبل بلوغه."
        }
      },
      {
        "id": "q9",
        "part": null,
        "type": "single",
        "correct": [
          "d"
        ],
        "explanation": {
          "en": "The economics of selling signals only work when the signals do not. Published results are typically selectively reported, include only closed winners, or come from an account that does not exist.",
          "ar": "فاقتصاديات بيع الإشارات لا تعمل إلا حين لا تعمل الإشارات. والنتائج المنشورة عادةً منتقاة، أو لا تتضمّن إلا الصفقات الرابحة المغلقة، أو تأتي من حساب غير موجود."
        }
      },
      {
        "id": "q10",
        "part": null,
        "type": "single",
        "correct": [
          "a"
        ],
        "explanation": {
          "en": "A contact you have never met in person, an unregistered platform, and a small successful early withdrawal are the signature. This category takes more money from individuals than all the others combined. Stop sending money, document everything, contact your bank at once and report it: chargebacks are sometimes possible if you act quickly, and any later recovery offer is the second phase of the same fraud.",
          "ar": "جهةُ اتصال لم تلتقِ بها شخصيًّا قط، ومنصّة غير مسجّلة، وسحب صغير مبكّر ناجح: هذه هي البصمة. وهذه الفئة تأخذ من الأفراد مالًا أكثر من كل الفئات الأخرى مجتمعة. توقّف عن إرسال المال، ووثّق كل شيء، واتّصل بمصرفك في الحال، وأبلغ: فاسترداد المدفوعات ممكن أحيانًا إن تصرّفت سريعًا، وأي عرض استرداد لاحق هو الطور الثاني من الاحتيال نفسه."
        }
      }
    ]
  }
};

/** Course page id to quiz id, so a route can be marked without a second table. */
export const PAGE_TO_QUIZ: Record<string, string> = {
  "m11/02-assessment": "final",
  "m00/quiz": "m00",
  "m01/quiz": "m01",
  "m02/quiz": "m02",
  "m03/quiz": "m03",
  "m04/quiz": "m04",
  "m05/quiz": "m05",
  "m06/quiz": "m06",
  "m07/quiz": "m07",
  "m08/quiz": "m08",
  "m09/quiz": "m09",
  "m10/quiz": "m10"
};

/** Quiz id to the module whose answer key it unlocks. */
export function quizIds(): string[] {
  return Object.keys(QUIZ_KEY);
}
