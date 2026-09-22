import type { Metadata } from 'next';
import { fontVariables } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Trading et al. Pro',
  description:
    'Coaching and risk analysis for students of the Trading et al. course. Education, not financial advice.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-theme="light" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
