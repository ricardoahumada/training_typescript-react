// ============================================================
// vitest.config.ts - Configuracion para testing con Vitest
// ============================================================
// Lab 12A.1: Configuración de Vitest

import { defineConfig } from 'vitest/config.js';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom', // ⚡ Mas rapido que jsdom
    setupFiles: ['./tests/setup.ts'],
    isolate: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'src/main.tsx',
        'src/**/*.stories.tsx',
        'src/**/*.test.tsx',
        'src/vite-env.d.ts',
        'tests/**',
      ],
    },
    include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
