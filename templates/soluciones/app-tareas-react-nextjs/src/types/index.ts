// ============================================================
// src/types/index.ts - Tipos del dominio Sistema de Tareas
// ============================================================
// 
// Labs 3A -> 4A: ESTE ARCHIVO ESTA COMPLETO y FUNCIONAL
// - Tipos base: Task, User, enums
// - Lab 4A descomentara: Utility Types (Partial, Omit, Pick, Record)
// - Lab 8A descomentara: type guards, Zod schemas
//

import React from 'react';

// ============================================================
// TIPOS BASE (siempre activos - Lab 3A)
// ============================================================

export type TaskStatus = 'pending' | 'inProgress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  completedAt?: Date;
  assigneeId?: string;
  dueDate?: Date;
  tags?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// ============================================================
// Lab 4A.1: Utility Types
// ============================================================

// Partial<Task> - todos los campos opcionales
// Útil para updateTask(id, { title: 'nuevo' })
export type EditTaskParams = Partial<Task>;

// Omit<Task, 'id'> - sin el campo id
// Útil para crear tareas (el servidor genera el id)
export type CreateTaskParams = Omit<Task, 'id' | 'createdAt' | 'completedAt'>;

// Pick<Task, ...> - solo algunos campos
// Útil para listados donde no necesitas toda la información
export type TaskPreview = Pick<Task, 'id' | 'title' | 'status' | 'priority'>;

// Record<TaskPriority, Task[]> - índice por prioridad
// Útil para agrupar tareas
export type TasksByPriority = Record<TaskPriority, Task[]>;
export type TasksByStatus = Record<TaskStatus, Task[]>;

// ============================================================
// Lab 4A.2: Generic Constraints
// ============================================================

// Interfaz base con id para constraints genéricas
export interface WithId {
  id: string;
}

// Generic ListProps - funciona con cualquier tipo que tenga id
export interface ListProps<T extends WithId> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

// ============================================================
// Lab 8A.1: Type Guards
// ============================================================

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
// Lab 8A.2: Zod Schemas - Ver src/utils/validators.ts
// ============================================================
