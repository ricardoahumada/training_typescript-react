// ============================================
// TaskService Tests - Módulo 12
// ============================================

import { TaskService, Task, TaskStatus, TaskPriority } from "../src/services/taskService";

describe("TaskService", () => {
  let service: TaskService;

  beforeEach(() => {
    service = new TaskService();
  });

  describe("createTask", () => {
    it("should create a task with given title", () => {
      const task = service.createTask("Nueva tarea", "high");

      expect(task.title).toBe("Nueva tarea");
      expect(task.priority).toBe("high");
      expect(task.status).toBe("pending");
      expect(task.id).toBeDefined();
    });

    it("should generate unique ids", () => {
      const task1 = service.createTask("Tarea 1", "low");
      const task2 = service.createTask("Tarea 2", "low");

      expect(task1.id).not.toBe(task2.id);
    });

    it("should add task to internal list", () => {
      service.createTask("Tarea 1", "medium");
      service.createTask("Tarea 2", "low");

      expect(service.getAll()).toHaveLength(2);
    });
  });

  describe("getAll", () => {
    it("should return empty array initially", () => {
      const tasks = service.getAll();
      expect(tasks).toHaveLength(0);
    });

    it("should return all created tasks", () => {
      service.createTask("Tarea 1", "low");
      service.createTask("Tarea 2", "high");

      const tasks = service.getAll();
      expect(tasks).toHaveLength(2);
    });

    it("should return a copy, not the original array", () => {
      service.createTask("Tarea 1", "low");
      const tasks = service.getAll();
      
      // Modifying returned array should not affect internal state
      tasks.push({ id: "fake", title: "Fake", status: "pending", priority: "low" });
      
      expect(service.getAll()).toHaveLength(1);
    });
  });

  describe("getTaskById", () => {
    it("should return null for non-existent task", () => {
      const result = service.getTaskById("non-existent");
      expect(result).toBeNull();
    });

    it("should return task when exists", () => {
      const created = service.createTask("Tarea", "medium");
      const result = service.getTaskById(created.id);

      expect(result).not.toBeNull();
      expect(result?.title).toBe("Tarea");
    });

    it("should return correct task properties", () => {
      const created = service.createTask("Buscarme", "high");
      const result = service.getTaskById(created.id);

      expect(result).toEqual({
        id: created.id,
        title: "Buscarme",
        status: "pending",
        priority: "high"
      });
    });
  });

  describe("updateTaskStatus", () => {
    it("should update task status", () => {
      const task = service.createTask("Tarea", "high");
      const updated = service.updateTaskStatus(task.id, "completed");

      expect(updated).toBe(true);
      expect(task.status).toBe("completed");
    });

    it("should return false for non-existent task", () => {
      const result = service.updateTaskStatus("non-existent", "completed");
      expect(result).toBe(false);
    });

    it("should update to inProgress status", () => {
      const task = service.createTask("Tarea", "medium");
      const result = service.updateTaskStatus(task.id, "inProgress");

      expect(result).toBe(true);
      expect(task.status).toBe("inProgress");
    });
  });

  describe("filterByStatus", () => {
    it("should return empty array when no tasks match", () => {
      service.createTask("Tarea 1", "low");
      const completed = service.filterByStatus("completed");
      
      expect(completed).toHaveLength(0);
    });

    it("should filter tasks by status", () => {
      const task1 = service.createTask("Tarea 1", "low");
      const task2 = service.createTask("Tarea 2", "high");
      service.updateTaskStatus(task2.id, "completed");

      const pending = service.filterByStatus("pending");
      const completed = service.filterByStatus("completed");

      expect(pending).toHaveLength(1);
      expect(pending[0].title).toBe("Tarea 1");
      expect(completed).toHaveLength(1);
      expect(completed[0].title).toBe("Tarea 2");
    });

    it("should return multiple tasks with same status", () => {
      service.createTask("Tarea 1", "low");
      service.createTask("Tarea 2", "medium");
      service.createTask("Tarea 3", "high");

      const pending = service.filterByStatus("pending");
      expect(pending).toHaveLength(3);
    });
  });

  describe("deleteTask", () => {
    it("should delete existing task", () => {
      const task = service.createTask("Tarea", "low");
      const deleted = service.deleteTask(task.id);

      expect(deleted).toBe(true);
      expect(service.getAll()).toHaveLength(0);
    });

    it("should return false for non-existent task", () => {
      const result = service.deleteTask("non-existent");
      expect(result).toBe(false);
    });

    it("should only delete specified task", () => {
      const task1 = service.createTask("Tarea 1", "low");
      const task2 = service.createTask("Tarea 2", "high");
      service.deleteTask(task1.id);

      expect(service.getAll()).toHaveLength(1);
      expect(service.getTaskById(task2.id)).not.toBeNull();
    });
  });
});
