// ============================================
// Type Guards - Módulo 6
// ============================================

import { Task, TaskPriority } from "../types/task";

// Type guard básico - verifica estado completado
export function isCompleted(task: Task): boolean {
  return task.status === "completed";
}

// Type guard con type predicate - verifica si tiene asignado
export function isAssigned(task: Task): task is Task & { assigneeId: string } {
  return task.assigneeId !== undefined;
}

// Type guard para prioridad alta
export function isHighPriority(task: Task): task is Task & { priority: "high" | "critical" } {
  return task.priority === "high" || task.priority === "critical";
}

// Type guard para verificar si la tarea está pendiente
export function isPending(task: Task): task is Task & { status: "pending" } {
  return task.status === "pending";
}

// Type guard para prioridad específica
export function hasPriority(task: Task, priority: TaskPriority): boolean {
  return task.priority === priority;
}
