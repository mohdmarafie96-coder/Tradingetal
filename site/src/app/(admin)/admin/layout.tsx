import type { Metadata } from 'next';
import { fontVariables } from '@/app/fonts';
import '../../(pro)/pro.css';
import '@/admin/admin.css';

export const metadata: Metadata = {
  title: 'Admin · Trading et al.',
  // The console must never appear in a search result.
  robots: { index: false, follow: false },
};

/**
 * The admin console's own root layout: a separate page from the course and Pro,
 * sharing only the tokens and the base components.
 */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-theme="dark" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
