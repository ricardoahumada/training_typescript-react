// ============================================================
// src/types/index.ts - Tipos del dominio Sistema de Tareas
// ============================================================
// 
// Labs 3A -> 4A: ESTE ARCHIVO ESTA COMPLETO y FUNCIONAL
// - Tipos base: Task, User, enums
// - Lab 4A descomentara: Utility Types (Partial, Omit, Pick, Record)
// - Lab 8A descomentara: type guards, Zod schemas
//

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
// TODO (lab 4A.1): Utility Types - Descomenta para activar
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
// FIN TODO (lab 4A.1)
// ============================================================

// ============================================================
// TODO (lab 4A.2): Generic Constraints - Descomenta para activar
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
// FIN TODO (lab 4A.2)
// ============================================================

// ============================================================
// TODO (lab 8A.1): Type Guards - Descomenta para activar
// ============================================================


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


// ============================================================
// FIN TODO (lab 8A.1)
// ============================================================

// ============================================================
// TODO (lab 8A.2): Zod Schemas - Descomenta para activar
// ============================================================
/*

import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  status: z.enum(['pending', 'inProgress', 'completed']),
  priority: z.enum(['low', 'medium', 'high']),
  createdAt: z.date(),
  completedAt: z.date().optional(),
  assigneeId: z.string().optional(),
  dueDate: z.date().optional(),
  tags: z.array(z.string()).optional(),
});

export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export type TaskFromAPI = z.infer<typeof TaskSchema>;
export type CreateTaskFromForm = z.infer<typeof CreateTaskSchema>;

*/
// ============================================================
// FIN TODO (lab 8A.2)
// ============================================================

// ============================================================
// TODO (lab 8A.3): Compound Components - Descomenta para activar
// ============================================================
/*

export interface TaskFilterContextValue {
  filter: TaskStatus | 'all';
  setFilter: (filter: TaskStatus | 'all') => void;
  priority: TaskPriority | 'all';
  setPriority: (priority: TaskPriority | 'all') => void;
}

*/
// ============================================================
// FIN TODO (lab 8A.3)
// ============================================================
