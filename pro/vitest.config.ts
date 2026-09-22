import { defineConfig } from 'vitest/config';

// Financial arithmetic is verified, not assumed. Every calculation in Pro has a
// test with a worked example whose answer was derived by hand.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
