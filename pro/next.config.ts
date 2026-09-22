import type { NextConfig } from 'next';
import path from 'node:path';

const config: NextConfig = {
  // Pro imports a few modules from the course app (the position-size maths, the
  // design tokens). They live outside this project's directory, so Next has to
  // be told it may compile them.
  experimental: {
    externalDir: true,
  },
  // The repository root, not pro/, is the tracing root — otherwise Next warns
  // about the lockfile it finds one level up and guesses wrong.
  outputFileTracingRoot: path.join(import.meta.dirname, '..'),
};

export default config;
