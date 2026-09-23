import type { NextConfig } from 'next';

const config: NextConfig = {
  env: {
    // Carried over from the Vite build, which read VITE_GOOGLE_ENABLED. Either
    // name switches the Google button on, so the existing Vercel setting keeps
    // working after the move.
    NEXT_PUBLIC_GOOGLE_ENABLED:
      process.env.NEXT_PUBLIC_GOOGLE_ENABLED ?? process.env.VITE_GOOGLE_ENABLED ?? '',
  },
};

export default config;
