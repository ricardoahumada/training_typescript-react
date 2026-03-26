// Lab 8A: Utility functions para validacion y transformacion
// Estas funciones se usaran con Zod en Lab 8A

import { Task, TaskStatus, TaskPriority } from '../types';

// Lab 8A: Type guard simple con typeof
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Lab 8A: Type guard para status valido
export function isValidStatus(value: string): value is TaskStatus {
  return ['pending', 'inProgress', 'completed'].includes(value);
}

// Lab 8A: Type guard para priority valida
export function isValidPriority(value: string): value is TaskPriority {
  return ['low', 'medium', 'high'].includes(value);
}

// Lab 8A: Type guard para date
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

// Lab 8A: Transformar datos crudos de API a Task
export function parseTaskFromAPI(raw: Record<string, unknown>): Partial<Task> {
  return {
    id: isString(raw.id) ? raw.id : undefined,
    title: isString(raw.title) ? raw.title : undefined,
    description: isString(raw.description) ? raw.description : undefined,
    status: isValidStatus(String(raw.status)) ? String(raw.status) as TaskStatus : undefined,
    priority: isValidPriority(String(raw.priority)) ? String(raw.priority) as TaskPriority : undefined,
    createdAt: isString(raw.createdAt) ? new Date(raw.createdAt) : undefined,
    completedAt: isString(raw.completedAt) ? new Date(raw.completedAt) : undefined,
  };
}
