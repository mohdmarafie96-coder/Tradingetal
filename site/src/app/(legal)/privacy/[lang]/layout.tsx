import { notFound } from 'next/navigation';
import { fontVariables } from '@/app/fonts';
import { DIR, isLang } from '@/lib/i18n';
import '../../../(pro)/pro.css';
import '../../legal.css';

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

/**
 * The root layout for the site's legal pages. Like Pro's, it sits under the
 * language segment, so lang and dir reach the document element, which the
 * shared tokens need for the Arabic type.
 */
export default async function LegalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang} dir={DIR[lang]} data-theme="dark" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
