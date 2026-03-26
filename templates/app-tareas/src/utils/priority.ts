// ============================================
// Sistema de Prioridades con Switch Exhaustivo - Módulo 6
// ============================================

import { Task, TaskPriority } from "../types/task";

export type Priority = TaskPriority;

// Función con switch exhaustivo
export function getPriorityLevel(priority: Priority): number {
  switch (priority) {
    case "low": return 1;
    case "medium": return 2;
    case "high": return 3;
    case "critical": return 4;
    default:
      // Exhaustiveness check - Error en compilación si falta un caso
      const _exhaustive: never = priority;
      throw new Error(`Prioridad desconocida: ${_exhaustive}`);
  }
}

// Función con descripción de prioridad
export function getPriorityDescription(priority: Priority): string {
  const descriptions: Record<Priority, string> = {
    low: "Puede esperar",
    medium: "Próxima prioridad",
    high: "Requiere atención pronto",
    critical: "Urgente - actuar inmediatamente"
  };
  return descriptions[priority];
}

// Función que retorna color según prioridad
export function getPriorityColor(priority: Priority): string {
  const colors: Record<Priority, string> = {
    low: "#4CAF50",     // verde
    medium: "#FFC107",   // amarillo
    high: "#FF9800",     // naranja
    critical: "#F44336"  // rojo
  };
  return colors[priority];
}

// Ordenar tareas por prioridad (ascendente: low -> critical)
export function sortByPriority(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    return getPriorityLevel(b.priority) - getPriorityLevel(a.priority);
  });
}
