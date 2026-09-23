import type { NextConfig } from 'next';

const config: NextConfig = {
  // Lets a test build sit beside the real one (NEXT_DIST_DIR=.next-test).
  distDir: process.env.NEXT_DIST_DIR || '.next',
  env: {
    // Carried over from the Vite build, which read VITE_GOOGLE_ENABLED. Either
    // name switches the Google button on, so the existing Vercel setting keeps
    // working after the move.
    NEXT_PUBLIC_GOOGLE_ENABLED:
      process.env.NEXT_PUBLIC_GOOGLE_ENABLED ?? process.env.VITE_GOOGLE_ENABLED ?? '',
  },
};

export default config;
