// ============================================================
// TODO (lab 8A.1): Type Guards - Descomenta para activar
// ============================================================


// ============================================================
// src/utils/typeGuards.ts - Type Guards para validacion de runtime
// ============================================================

import { Task } from '../types';

// Type guard basico con typeof
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

// Type guard para validar TaskFromAPI
export function isTask(obj: unknown): obj is Task {
  if (!obj || typeof obj !== 'object') return false;
  const t = obj as Record<string, unknown>;
  return (
    typeof t.id === 'string' &&
    typeof t.title === 'string' &&
    ['pending', 'inProgress', 'completed'].includes(t.status as string) &&
    ['low', 'medium', 'high'].includes(t.priority as string)
  );
}

// Type guard para API responses
export function isTaskArray(data: unknown): data is Task[] {
  return Array.isArray(data) && data.every(isTask);
}

// Discriminated union type guard
type ApiError = { kind: 'error'; message: string; code: number };
type ApiSuccess = { kind: 'success'; data: Task[] };
type ApiResult = ApiError | ApiSuccess;

export function isApiSuccess(result: ApiResult): result is ApiSuccess {
  return result.kind === 'success';
}

export function isApiError(result: ApiResult): result is ApiError {
  return result.kind === 'error';
}


// ============================================================
// FIN TODO (lab 8A.1)
// ============================================================
