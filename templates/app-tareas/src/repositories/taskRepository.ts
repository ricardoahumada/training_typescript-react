// ============================================
// ITaskRepository - Módulo 12
// ============================================

import { Task } from "../services/taskService";

export interface ITaskRepository {
  findAll(): Task[];
  findById(id: string): Task | null;
  save(task: Task): Task;
  delete(id: string): boolean;
}
