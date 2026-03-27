// ============================================================
// src/services/taskService.ts - Servicio de Tareas
// ============================================================
// Lab 3A -> ESTE ARCHIVO ESTA COMPLETO y FUNCIONAL
// Servicio base usado en tests (Lab 12A)

import { Task } from "../types";

import { isTask, isTaskArray } from "../types";

export class TaskService {
  private tasks: Task[] = [];

  createTask(title: string, priority: Task["priority"]): Task {
    const task: Task = {
      id: this.generateId(),
      title,
      priority,
      status: "pending",
      createdAt: new Date(),
    };
    this.tasks.push(task);
    return task;
  }

  getAll(): Task[] {
    return [...this.tasks];
  }

  getById(id: string): Task | undefined {
    return this.tasks.find((t) => t.id === id);
  }

  update(id: string, updates: Partial<Task>): Task | undefined {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return undefined;

    this.tasks[index] = { ...this.tasks[index], ...updates };
    return this.tasks[index];
  }

  delete(id: string): boolean {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    return true;
  }

  filterByStatus(status: Task["status"]): Task[] {
    return this.tasks.filter((t) => t.status === status);
  }

  filterByPriority(priority: Task["priority"]): Task[] {
    return this.tasks.filter((t) => t.priority === priority);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

function loadTasksFromAPI(data: unknown): Task[] {
  if (isTaskArray(data)) {
    return data; // TypeScript sabe que es Task[]
  }
  throw new Error("Datos de API inválidos");
}
