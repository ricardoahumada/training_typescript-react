// ============================================================
// tests/setup.ts - Setup de testing
// ============================================================
// Lab 12A.2: Test Setup

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup despues de cada test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.useRealTimers();
});
