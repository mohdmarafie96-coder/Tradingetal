// The search index is derived from the rendered content chunks rather than
// shipped as a second copy of every lesson. This module is only ever reached
// through a dynamic import, so the cost is paid on first search.
import type { Lang } from '../lib/i18n';
import { courseFor } from './manifest';
import type { Chunk } from './loader';

import enM00 from './chunks/en/m00';
import enM01 from './chunks/en/m01';
import enM02 from './chunks/en/m02';
import enM03 from './chunks/en/m03';
import enM04 from './chunks/en/m04';
import enM05 from './chunks/en/m05';
import enM06 from './chunks/en/m06';
import enM07 from './chunks/en/m07';
import enM08 from './chunks/en/m08';
import enM09 from './chunks/en/m09';
import enM10 from './chunks/en/m10';
import enM11 from './chunks/en/m11';
import enMisc from './chunks/en/misc';
import enReference from './chunks/en/reference';
import enTemplates from './chunks/en/templates';

import arM00 from './chunks/ar/m00';
import arM01 from './chunks/ar/m01';
import arM02 from './chunks/ar/m02';
import arM03 from './chunks/ar/m03';
import arM04 from './chunks/ar/m04';
import arM05 from './chunks/ar/m05';
import arM06 from './chunks/ar/m06';
import arM07 from './chunks/ar/m07';
import arM08 from './chunks/ar/m08';
import arM09 from './chunks/ar/m09';
import arM10 from './chunks/ar/m10';
import arM11 from './chunks/ar/m11';
import arMisc from './chunks/ar/misc';
import arReference from './chunks/ar/reference';
import arTemplates from './chunks/ar/templates';

export interface SearchDoc {
  id: string;
  title: string;
  text: string;
}

const BY_LANG: Record<Lang, Chunk[]> = {
  en: [
    enMisc, enM00, enM01, enM02, enM03, enM04, enM05, enM06,
    enM07, enM08, enM09, enM10, enM11, enReference, enTemplates,
  ],
  ar: [
    arMisc, arM00, arM01, arM02, arM03, arM04, arM05, arM06,
    arM07, arM08, arM09, arM10, arM11, arReference, arTemplates,
  ],
};

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&nbsp;': ' ',
  '&mdash;': '—',
  '&ndash;': '–',
  '&hellip;': '…',
  '&middot;': '·',
};

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, (entity) => ENTITIES[entity.toLowerCase()] ?? ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const cached: Partial<Record<Lang, SearchDoc[]>> = {};

export default function getDocs(lang: Lang): SearchDoc[] {
  const existing = cached[lang];
  if (existing) return existing;

  const { pageById } = courseFor(lang);
  const docs: SearchDoc[] = [];
  for (const chunk of BY_LANG[lang]) {
    for (const [id, page] of Object.entries(chunk)) {
      docs.push({
        id,
        title: pageById.get(id)?.title ?? id,
        text: stripHtml(page.html),
      });
    }
  }
  cached[lang] = docs;
  return docs;
}
