import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Arabic, Space_Grotesk } from 'next/font/google';

/**
 * The course loads these from Google at runtime. Pro self-hosts them: Next
 * downloads the files at build time and serves them from our own origin, so
 * there is no third-party request on a page showing somebody's account balance,
 * and no flash of fallback text while a stylesheet resolves.
 *
 * Each exposes a CSS variable that globals.css feeds into the shared tokens.
 */

export const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display-face',
  display: 'swap',
});

export const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-body-face',
  display: 'swap',
});

export const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-num-face',
  display: 'swap',
});

export const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic-face',
  display: 'swap',
});

export const fontVariables = [display, body, mono, arabic].map((f) => f.variable).join(' ');
