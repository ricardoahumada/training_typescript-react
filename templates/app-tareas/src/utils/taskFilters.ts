// ============================================
// Filtros de Tareas - Módulo 6
// ============================================

import { Task, TaskFilter as TaskFilterType } from "../types/task";
import { isAssigned, isHighPriority, isPending, isCompleted } from "./typeGuards";

export function filterTasks(tasks: Task[], filter: TaskFilterType): Task[] {
  return tasks.filter((task: Task) => {
    // Filtrar por estado
    if (filter.status !== undefined && task.status !== filter.status) {
      return false;
    }
    // Filtrar por prioridad
    if (filter.priority !== undefined && task.priority !== filter.priority) {
      return false;
    }
    // Filtrar por asignación
    if (filter.assigned !== undefined) {
      if (filter.assigned && !isAssigned(task)) return false;
      if (!filter.assigned && isAssigned(task)) return false;
    }
    return true;
  });
}

// Filtrar solo tareas de alta prioridad
export function getHighPriorityTasks(tasks: Task[]): Task[] {
  return tasks.filter(isHighPriority);
}

// Filtrar tareas pendientes
export function getPendingTasks(tasks: Task[]): Task[] {
  return tasks.filter(isPending);
}

// Filtrar tareas completadas
export function getCompletedTasks(tasks: Task[]): Task[] {
  return tasks.filter(isCompleted);
}

// Filtrar tareas asignadas
export function getAssignedTasks(tasks: Task[]): Task[] {
  return tasks.filter(isAssigned);
}
