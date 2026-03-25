// ============================================
// Tipos del Sistema de Tareas - Anexo 3A
// ============================================

export type TaskStatus = "pending" | "inProgress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

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
}
