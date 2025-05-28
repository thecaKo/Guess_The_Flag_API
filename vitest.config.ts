// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from "node:path"

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    dir: './src',
    exclude: ['**/node_modules/**', '**/dist/**', './src/env.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/__tests__/**',
        '**/*.d.ts',
        './src/env.ts',
        './src/lib/prisma.ts',
        './src/server.ts',
        './src/app.ts',
      ],
      all: true,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});