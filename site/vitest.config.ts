import { defineConfig } from 'vitest/config';
import path from 'node:path';

// Financial arithmetic is verified, not assumed. Every calculation in Pro has a
// test with a worked example whose answer was derived by hand.
export default defineConfig({
  resolve: {
    alias: {
      '@course': path.resolve(import.meta.dirname, './src/course'),
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
