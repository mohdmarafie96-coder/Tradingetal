// The search index is derived from the rendered content chunks rather than
// shipped as a second copy of every lesson. This module is only ever reached
// through a dynamic import, so the cost is paid on first search.
import { pageById } from './manifest';
import m00 from './chunks/m00';
import m01 from './chunks/m01';
import m02 from './chunks/m02';
import m03 from './chunks/m03';
import m04 from './chunks/m04';
import m05 from './chunks/m05';
import m06 from './chunks/m06';
import m07 from './chunks/m07';
import m08 from './chunks/m08';
import m09 from './chunks/m09';
import m10 from './chunks/m10';
import m11 from './chunks/m11';
import misc from './chunks/misc';
import reference from './chunks/reference';
import templates from './chunks/templates';

export interface SearchDoc {
  id: string;
  title: string;
  text: string;
}

const allChunks: Record<string, string>[] = [
  misc,
  m00,
  m01,
  m02,
  m03,
  m04,
  m05,
  m06,
  m07,
  m08,
  m09,
  m10,
  m11,
  reference,
  templates,
];

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

function build(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  for (const chunk of allChunks) {
    for (const [id, html] of Object.entries(chunk)) {
      docs.push({
        id,
        title: pageById.get(id)?.title ?? id,
        text: stripHtml(html),
      });
    }
  }
  return docs;
}

let cached: SearchDoc[] | null = null;

export default function getDocs(): SearchDoc[] {
  if (!cached) cached = build();
  return cached;
}
