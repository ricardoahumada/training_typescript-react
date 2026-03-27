// ============================================================
// TODO (lab 8A.2): Zod Schemas - Descomenta para activar
// ============================================================
/*

// ============================================================
// src/utils/validators.ts - Validacion con Zod
// ============================================================

import { z } from 'zod';

// Schema para Task
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

// Schema para crear tarea (sin id, createdAt, completedAt)
export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

// Schema para actualizar tarea (parcial)
export const UpdateTaskSchema = CreateTaskSchema.partial();

// Inferir tipos de schemas
export type TaskFromAPI = z.infer<typeof TaskSchema>;
export type CreateTaskFromForm = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskFromForm = z.infer<typeof UpdateTaskSchema>;

// Funciones de validacion
export function validateTask(data: unknown) {
  return TaskSchema.safeParse(data);
}

export function validateCreateTask(data: unknown) {
  return CreateTaskSchema.safeParse(data);
}

export function validateUpdateTask(data: unknown) {
  return UpdateTaskSchema.safeParse(data);
}

*/
// ============================================================
// FIN TODO (lab 8A.2)
// ============================================================
