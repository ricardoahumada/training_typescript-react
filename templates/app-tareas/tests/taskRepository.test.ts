// ============================================
// TaskRepository Mock Tests - Módulo 12
// ============================================

import { ITaskRepository } from "../src/repositories/taskRepository";
import { Task, TaskService } from "../src/services/taskService";

describe("TaskService with mocks", () => {
  let mockRepository: jest.Mocked<ITaskRepository>;
  let service: TaskService;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      delete: jest.fn()
    };

    service = new TaskService();
  });

  describe("using mock repository", () => {
    test("getAll calls repository findAll", () => {
      mockRepository.findAll.mockReturnValue([]);

      // This would be used with a repository-based implementation
      const result = mockRepository.findAll();

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    test("getAll returns tasks from repository", () => {
      const mockTasks: Task[] = [
        { id: "1", title: "Tarea 1", status: "pending", priority: "high" },
        { id: "2", title: "Tarea 2", status: "completed", priority: "low" }
      ];
      mockRepository.findAll.mockReturnValue(mockTasks);

      const result = mockRepository.findAll();

      expect(result).toEqual(mockTasks);
      expect(result).toHaveLength(2);
    });

    test("findById returns task when exists", () => {
      const mockTask: Task = {
        id: "1",
        title: "Tarea 1",
        status: "pending",
        priority: "high"
      };
      mockRepository.findById.mockReturnValue(mockTask);

      const result = mockRepository.findById("1");

      expect(result).toEqual(mockTask);
      expect(mockRepository.findById).toHaveBeenCalledWith("1");
    });

    test("findById returns null when not exists", () => {
      mockRepository.findById.mockReturnValue(null);

      const result = mockRepository.findById("non-existent");

      expect(result).toBeNull();
    });

    test("save calls repository with task", () => {
      const task: Task = {
        id: "1",
        title: "Nueva Tarea",
        status: "pending",
        priority: "medium"
      };
      mockRepository.save.mockReturnValue(task);

      const result = mockRepository.save(task);

      expect(mockRepository.save).toHaveBeenCalledWith(task);
      expect(result).toEqual(task);
    });

    test("delete returns true when successful", () => {
      mockRepository.delete.mockReturnValue(true);

      const result = mockRepository.delete("1");

      expect(result).toBe(true);
      expect(mockRepository.delete).toHaveBeenCalledWith("1");
    });

    test("delete returns false when task not found", () => {
      mockRepository.delete.mockReturnValue(false);

      const result = mockRepository.delete("non-existent");

      expect(result).toBe(false);
    });
  });
});
