// Lab 8A: TaskService - Type-safe service con type guards
import { Task, TaskFromAPI, CreateTaskParams } from '../types';

// Lab 8A: Type guard para validar datos de API
export function isTask(obj: unknown): obj is Task {
  if (typeof obj !== 'object' || obj === null) return false;
  const task = obj as Record<string, unknown>;
  return (
    typeof task.id === 'string' &&
    typeof task.title === 'string' &&
    typeof task.status === 'string' &&
    typeof task.priority === 'string'
  );
}

// Lab 8A: Type guard para array de API
export function isTaskArray(obj: unknown): obj is Task[] {
  return Array.isArray(obj) && obj.every(isTask);
}

// Lab 8A: Servicio que simula llamadas a API
export class TaskService {
  private tasks: Task[] = [];

  createTask(params: CreateTaskParams): Task {
    const task: Task = {
      id: Date.now().toString(36),
      ...params,
      status: 'pending',
      createdAt: new Date(),
    };
    this.tasks.push(task);
    return task;
  }

  getAll(): Task[] {
    return [...this.tasks];
  }

  // Lab 8A: Método que recibe datos de API (unknown)
  fromAPI(data: unknown): Task | null {
    if (!isTask(data)) {
      console.error('Invalid task data from API');
      return null;
    }
    return {
      ...data,
      createdAt: new Date(data.createdAt),
      completedAt: data.completedAt ? new Date(data.completedAt) : undefined,
    };
  }

  // Lab 8A: Bulk from API
  fromAPIArray(data: unknown): Task[] {
    if (!isTaskArray(data)) {
      console.error('Invalid task array from API');
      return [];
    }
    return data.map((t) => this.fromAPI(t)!).filter(Boolean) as Task[];
  }
}
