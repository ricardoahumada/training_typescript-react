// ============================================================
// vitest.config.ts - Lab 12A: Testing con Vitest
// ============================================================
// Configuracion para tests unitarios deterministas
// Lab 12A ensenara a configurar y escribir tests

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/'],
    },
  },
});
