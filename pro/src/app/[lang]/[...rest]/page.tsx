import { notFound } from 'next/navigation';

/**
 * Any path under a language that no page claims. Without this catch-all an
 * unmatched URL never reaches [lang]/not-found.tsx and gets Next's default page.
 */
export default function Unmatched() {
  notFound();
}
