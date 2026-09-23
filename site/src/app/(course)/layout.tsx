import type { Metadata, Viewport } from 'next';
import { fontVariables } from '@/app/fonts';
import './course.css';

export const metadata: Metadata = {
  title: 'Trading et al.',
  description:
    'Trading et al. — a complete, self-paced course on the basics of trading Contracts for Difference, in English and Arabic. Manuals, calculators and risk management. Education, not financial advice.',
  icons: {
    icon: [
      { url: '/logo/favicon-32.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/logo/favicon-16.svg', sizes: '16x16', type: 'image/svg+xml' },
    ],
    apple: '/logo/mark.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0F1C',
  colorScheme: 'light dark',
};

/**
 * Applies a stored light-mode choice before the first paint, so a reader who
 * chose light does not see the dark default flash while the course boots.
 * Mirrors read() in src/course/lib/theme.ts.
 */
const THEME_BOOT = `try{var t=localStorage.getItem('cfd-course:theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark')}catch(e){document.documentElement.setAttribute('data-theme','dark')}`;

/**
 * Root layout for the course. The course sets lang and dir on the document
 * itself as the reader switches language, so these are only the starting values.
 */
export default function CourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-theme="dark" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
