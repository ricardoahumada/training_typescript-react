// ============================================
// TaskService - Módulo 12
// ============================================

export type TaskStatus = "pending" | "inProgress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
}

export class TaskService {
  private tasks: Task[] = [];

  createTask(title: string, priority: TaskPriority): Task {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      status: "pending",
      priority
    };
    this.tasks.push(task);
    return task;
  }

  getAll(): Task[] {
    return [...this.tasks];
  }

  getTaskById(id: string): Task | null {
    return this.tasks.find(t => t.id === id) || null;
  }

  updateTaskStatus(id: string, status: TaskStatus): boolean {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = status;
      return true;
    }
    return false;
  }

  filterByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter(t => t.status === status);
  }

  deleteTask(id: string): boolean {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index > -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }
}
