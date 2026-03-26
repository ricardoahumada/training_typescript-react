// Tipos del dominio: Sistema de Gestion de Tareas (Caso 1r)
// Evolution: Labs 3A -> 4A -> 5A -> 8A -> 12A -> 12B

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

// Lab 4A: Utility Types
export type CreateTaskParams = Omit<Task, 'id' | 'createdAt' | 'completedAt'>;
export type UpdateTaskParams = Partial<Omit<Task, 'id' | 'createdAt'>>;
export type TaskPreview = Pick<Task, 'id' | 'title' | 'status' | 'priority'>;
export type TasksByPriority = Record<TaskPriority, Task[]>;
export type TasksByStatus = Record<TaskStatus, Task[]>;

// Lab 4A: Generic Constraints
export interface WithId {
  id: string;
}

// Lab 8A: Type Guards
export interface TaskFromAPI {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  createdAt: string;
  completedAt?: string;
}

// Lab 8A: Zod schemas (added in 8A)
export interface TaskFormData {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: Date;
}
