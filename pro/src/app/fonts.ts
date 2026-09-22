import {
  IBM_Plex_Mono,
  IBM_Plex_Sans_Arabic,
  Inter_Tight,
  Newsreader,
  Noto_Naskh_Arabic,
} from 'next/font/google';

/**
 * The course loads these from Google at runtime. Pro self-hosts them: Next
 * downloads the files at build time and serves them from our own origin, so
 * there is no third-party request on a page showing somebody's account balance,
 * and no flash of fallback text while a stylesheet resolves.
 *
 * Each exposes a CSS variable that globals.css feeds into the shared tokens.
 */

export const prose = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-prose-latin',
  display: 'swap',
});

export const ui = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ui-latin',
  display: 'swap',
});

export const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-num-face',
  display: 'swap',
});

export const proseArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-prose-arabic',
  display: 'swap',
});

export const uiArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
  variable: '--font-ui-arabic',
  display: 'swap',
});

export const fontVariables = [prose, ui, mono, proseArabic, uiArabic]
  .map((f) => f.variable)
  .join(' ');
