import { Task, Status, Priority } from '../types';

/**
 * Crea una nueva tarea con los datos proporcionados
 */
export function createTask(data: Partial<Task>): Task {
  // TODO: implementar
  throw new Error('Not implemented');
}

/**
 * Filtra tareas por estado
 */
export function filterByStatus(tasks: Task[], status: Status): Task[] {
  // TODO: implementar
  throw new Error('Not implemented');
}

/**
 * Filtra tareas por prioridad
 */
export function filterByPriority(tasks: Task[], priority: Priority): Task[] {
  // TODO: implementar
  throw new Error('Not implemented');
}

/**
 * Ordena tareas por fecha de creacion
 */
export function sortByCreatedAt(tasks: Task[], ascending: boolean = true): Task[] {
  // TODO: implementar
  throw new Error('Not implemented');
}

/**
 * Actualiza el estado de una tarea
 */
export function updateTaskStatus(taskId: string, status: Status): Task | undefined {
  // TODO: implementar
  throw new Error('Not implemented');
}

/**
 * Obtiene tareas pendientes
 */
export function getPendingTasks(tasks: Task[]): Task[] {
  // TODO: implementar
  throw new Error('Not implemented');
}

/**
 * Obtiene tareas completadas
 */
export function getCompletedTasks(tasks: Task[]): Task[] {
  // TODO: implementar
  throw new Error('Not implemented');
}
