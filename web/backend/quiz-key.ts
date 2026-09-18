// Generated from quiz/*.json by scripts/build-quiz-key.mjs. Do not edit by hand.

export interface KeyQuestion {
  id: string;
  part: string | null;
  type: 'single' | 'multi';
  correct: string[];
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
    passMark: 0.8,
    parts: [{"id":"A","weight":0.2,"minScore":null},{"id":"B","weight":0.2,"minScore":null},{"id":"C","weight":0.3,"minScore":0.7},{"id":"D","weight":0.15,"minScore":null},{"id":"E","weight":0.15,"minScore":null}],
    questions: [
      {"id":"A1","part":"A","type":"single","correct":["a"]},
      {"id":"A2","part":"A","type":"single","correct":["b"]},
      {"id":"A3","part":"A","type":"single","correct":["c"]},
      {"id":"A4","part":"A","type":"single","correct":["d"]},
      {"id":"A5","part":"A","type":"single","correct":["a"]},
      {"id":"A6","part":"A","type":"single","correct":["b"]},
      {"id":"B1","part":"B","type":"single","correct":["c"]},
      {"id":"B2","part":"B","type":"single","correct":["d"]},
      {"id":"B3","part":"B","type":"single","correct":["a"]},
      {"id":"B4","part":"B","type":"single","correct":["b"]},
      {"id":"B5","part":"B","type":"single","correct":["c"]},
      {"id":"B6","part":"B","type":"single","correct":["d"]},
      {"id":"C1","part":"C","type":"single","correct":["a"]},
      {"id":"C2","part":"C","type":"single","correct":["b"]},
      {"id":"C3","part":"C","type":"single","correct":["c"]},
      {"id":"C4","part":"C","type":"single","correct":["d"]},
      {"id":"C5","part":"C","type":"single","correct":["a"]},
      {"id":"C6","part":"C","type":"single","correct":["b"]},
      {"id":"C7","part":"C","type":"single","correct":["c"]},
      {"id":"D1","part":"D","type":"single","correct":["d"]},
      {"id":"D2","part":"D","type":"single","correct":["a"]},
      {"id":"D3","part":"D","type":"single","correct":["b"]},
      {"id":"D4","part":"D","type":"single","correct":["c"]},
      {"id":"D5","part":"D","type":"single","correct":["d"]},
      {"id":"D6","part":"D","type":"single","correct":["a"]},
      {"id":"E1","part":"E","type":"single","correct":["b"]},
      {"id":"E2","part":"E","type":"single","correct":["c"]},
      {"id":"E3","part":"E","type":"single","correct":["d"]},
      {"id":"E4","part":"E","type":"single","correct":["a"]},
      {"id":"E5","part":"E","type":"single","correct":["b"]},
      {"id":"E6","part":"E","type":"multi","correct":["a","b","c","d"]},
      {"id":"E7","part":"E","type":"single","correct":["c"]},
      {"id":"E8","part":"E","type":"single","correct":["d"]},
    ],
  },
  "m00": {
    passMark: 0.8,
    parts: null,
    questions: [
      {"id":"q1","part":null,"type":"single","correct":["c"]},
      {"id":"q2","part":null,"type":"single","correct":["a"]},
      {"id":"q3","part":null,"type":"single","correct":["b"]},
      {"id":"q4","part":null,"type":"single","correct":["c"]},
      {"id":"q5","part":null,"type":"single","correct":["d"]},
      {"id":"q6","part":null,"type":"single","correct":["a"]},
    ],
  },
  "m01": {
    passMark: 0.8,
    parts: null,
    questions: [
      {"id":"q1","part":null,"type":"single","correct":["b"]},
      {"id":"q2","part":null,"type":"single","correct":["c"]},
      {"id":"q3","part":null,"type":"single","correct":["d"]},
      {"id":"q4","part":null,"type":"single","correct":["a"]},
      {"id":"q5","part":null,"type":"single","correct":["b"]},
      {"id":"q6","part":null,"type":"single","correct":["c"]},
      {"id":"q7","part":null,"type":"single","correct":["d"]},
      {"id":"q8","part":null,"type":"single","correct":["a"]},
      {"id":"q9","part":null,"type":"single","correct":["b"]},
      {"id":"q10","part":null,"type":"single","correct":["c"]},
    ],
  },
  "m02": {
    passMark: 0.8,
    parts: null,
    questions: [
      {"id":"q1","part":null,"type":"single","correct":["d"]},
      {"id":"q2","part":null,"type":"single","correct":["a"]},
      {"id":"q3","part":null,"type":"single","correct":["b"]},
      {"id":"q4","part":null,"type":"single","correct":["c"]},
      {"id":"q5","part":null,"type":"single","correct":["c"]},
      {"id":"q6","part":null,"type":"single","correct":["d"]},
      {"id":"q7","part":null,"type":"multi","correct":["b","d","e"]},
      {"id":"q8","part":null,"type":"single","correct":["a"]},
      {"id":"q9","part":null,"type":"single","correct":["b"]},
      {"id":"q10","part":null,"type":"single","correct":["c"]},
    ],
  },
  "m03": {
    passMark: 0.8,
    parts: null,
    questions: [
      {"id":"q1","part":null,"type":"single","correct":["b"]},
      {"id":"q2","part":null,"type":"single","correct":["d"]},
      {"id":"q3","part":null,"type":"single","correct":["b"]},
      {"id":"q4","part":null,"type":"single","correct":["a"]},
      {"id":"q5","part":null,"type":"single","correct":["b"]},
      {"id":"q6","part":null,"type":"single","correct":["c"]},
      {"id":"q7","part":null,"type":"single","correct":["d"]},
      {"id":"q8","part":null,"type":"single","correct":["c"]},
      {"id":"q9","part":null,"type":"single","correct":["c"]},
      {"id":"q10","part":null,"type":"single","correct":["a"]},
      {"id":"q11","part":null,"type":"single","correct":["b"]},
      {"id":"q12","part":null,"type":"single","correct":["c"]},
    ],
  },
  "m04": {
    passMark: 0.8,
    parts: null,
    questions: [
      {"id":"q1","part":null,"type":"single","correct":["d"]},
      {"id":"q2","part":null,"type":"single","correct":["c"]},
      {"id":"q3","part":null,"type":"single","correct":["a"]},
      {"id":"q4","part":null,"type":"single","correct":["b"]},
      {"id":"q5","part":null,"type":"single","correct":["c"]},
      {"id":"q6","part":null,"type":"single","correct":["d"]},
      {"id":"q7","part":null,"type":"single","correct":["a"]},
      {"id":"q8","part":null,"type":"single","correct":["b"]},
      {"id":"q9","part":null,"type":"single","correct":["c"]},
      {"id":"q10","part":null,"type":"single","correct":["d"]},
      {"id":"q11","part":null,"type":"single","correct":["a"]},
      {"id":"q12","part":null,"type":"multi","correct":["a","b"]},
    ],
  },
  "m05": {
    passMark: 0.8,
    parts: null,
    questions: [
      {"id":"q1","part":null,"type":"single","correct":["b"]},
      {"id":"q2","part":null,"type":"single","correct":["c"]},
      {"id":"q3","part":null,"type":"single","correct":["d"]},
      {"id":"q4","part":null,"type":"single","correct":["a"]},
      {"id":"q5","part":null,"type":"single","correct":["b"]},
      {"id":"q6","part":null,"type":"single","correct":["c"]},
      {"id":"q7","part":null,"type":"single","correct":["b"]},
      {"id":"q8","part":null,"type":"single","correct":["d"]},
      {"id":"q9","part":null,"type":"single","correct":["a"]},
      {"id":"q10","part":null,"type":"multi","correct":["a","b","d","e","f"]},
    ],
  },
  "m06": {
    passMark: 0.8,
    parts: null,
    questions: [
      {"id":"q1","part":null,"type":"single","correct":["b"]},
      {"id":"q2","part":null,"type":"single","correct":["c"]},
      {"id":"q3","part":null,"type":"single","correct":["d"]},
      {"id":"q4","part":null,"type":"single","correct":["b"]},
      {"id":"q5","part":null,"type":"single","correct":["a"]},
      {"id":"q6","part":null,"type":"single","correct":["b"]},
      {"id":"q7","part":null,"type":"single","correct":["c"]},
      {"id":"q8","part":null,"type":"single","correct":["d"]},
      {"id":"q9","part":null,"type":"single","correct":["a"]},
      {"id":"q10","part":null,"type":"single","correct":["b"]},
      {"id":"q11","part":null,"type":"single","correct":["c"]},
      {"id":"q12","part":null,"type":"single","correct":["d"]},
    ],
  },
  "m07": {
    passMark: 0.8,
    parts: null,
    questions: [
      {"id":"q1","part":null,"type":"single","correct":["a"]},
      {"id":"q2","part":null,"type":"multi","correct":["a","b","d"]},
      {"id":"q3","part":null,"type":"single","correct":["b"]},
      {"id":"q4","part":null,"type":"multi","correct":["b","c","e"]},
      {"id":"q5","part":null,"type":"single","correct":["c"]},
      {"id":"q6","part":null,"type":"single","correct":["d"]},
      {"id":"q7","part":null,"type":"single","correct":["a"]},
      {"id":"q8","part":null,"type":"single","correct":["b"]},
      {"id":"q9","part":null,"type":"single","correct":["c"]},
      {"id":"q10","part":null,"type":"single","correct":["d"]},
    ],
  },
  "m08": {
    passMark: 0.8,
    parts: null,
    questions: [
      {"id":"q1","part":null,"type":"single","correct":["a"]},
      {"id":"q2","part":null,"type":"multi","correct":["a","b","d"]},
      {"id":"q3","part":null,"type":"single","correct":["b"]},
      {"id":"q4","part":null,"type":"single","correct":["c"]},
      {"id":"q5","part":null,"type":"multi","correct":["a","b","c","e","f"]},
      {"id":"q6","part":null,"type":"single","correct":["d"]},
      {"id":"q7","part":null,"type":"single","correct":["a"]},
      {"id":"q8","part":null,"type":"multi","correct":["a","b","c","d"]},
      {"id":"q9","part":null,"type":"single","correct":["b"]},
      {"id":"q10","part":null,"type":"single","correct":["c"]},
    ],
  },
  "m09": {
    passMark: 0.75,
    parts: null,
    questions: [
      {"id":"q1","part":null,"type":"single","correct":["d"]},
      {"id":"q2","part":null,"type":"single","correct":["a"]},
      {"id":"q3","part":null,"type":"single","correct":["b"]},
      {"id":"q4","part":null,"type":"single","correct":["c"]},
      {"id":"q5","part":null,"type":"single","correct":["d"]},
      {"id":"q6","part":null,"type":"single","correct":["a"]},
      {"id":"q7","part":null,"type":"multi","correct":["a","b","c","e"]},
      {"id":"q8","part":null,"type":"multi","correct":["a","b","c","d"]},
    ],
  },
  "m10": {
    passMark: 0.8,
    parts: null,
    questions: [
      {"id":"q1","part":null,"type":"single","correct":["b"]},
      {"id":"q2","part":null,"type":"single","correct":["c"]},
      {"id":"q3","part":null,"type":"multi","correct":["a","b","c","e"]},
      {"id":"q4","part":null,"type":"single","correct":["d"]},
      {"id":"q5","part":null,"type":"multi","correct":["a","b","c","d","f"]},
      {"id":"q6","part":null,"type":"single","correct":["a"]},
      {"id":"q7","part":null,"type":"single","correct":["b"]},
      {"id":"q8","part":null,"type":"single","correct":["c"]},
      {"id":"q9","part":null,"type":"single","correct":["d"]},
      {"id":"q10","part":null,"type":"single","correct":["a"]},
    ],
  },
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
