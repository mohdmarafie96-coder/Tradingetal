import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fontVariables } from '../fonts';
import { DIR, isLang, stringsFor } from '@/lib/i18n';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Trading et al. Pro',
  description:
    'Coaching and risk analysis for students of the Trading et al. course. Education, not financial advice.',
};

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

/**
 * The root layout, under the language segment rather than above it.
 *
 * The shared tokens key the Arabic type off `:root[lang="ar"]`, so the language
 * has to reach the document element. Putting the root layout here is what makes
 * that possible; `/` never renders, because middleware redirects it first.
 */
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang} dir={DIR[lang]} data-theme="light" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
