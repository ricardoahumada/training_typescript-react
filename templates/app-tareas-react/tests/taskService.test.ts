// ============================================================
// Lab 12A: Tests Unitarios con Vitest
// ============================================================
// Archivo de ejemplo para el laboratorio de testing
// El alumno escribira los tests siguiendo el guion del Lab 12A

import { describe, it, expect, beforeEach } from 'vitest';
import { TaskService, isTask, isTaskArray } from '../src/services/taskService';
import { Task } from '../src/types';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    service = new TaskService();
  });

  describe('createTask', () => {
    it('should create a task with given title and priority', () => {
      const task = service.createTask({ title: 'Nueva tarea', priority: 'high' });

      expect(task.title).toBe('Nueva tarea');
      expect(task.priority).toBe('high');
      expect(task.status).toBe('pending');
      expect(task.id).toBeDefined();
    });

    it('should generate unique ids', () => {
      const task1 = service.createTask({ title: 'Tarea 1', priority: 'low' });
      const task2 = service.createTask({ title: 'Tarea 2', priority: 'low' });

      expect(task1.id).not.toBe(task2.id);
    });

    it('should add task to internal list', () => {
      service.createTask({ title: 'Tarea 1', priority: 'medium' });
      service.createTask({ title: 'Tarea 2', priority: 'low' });

      expect(service.getAll()).toHaveLength(2);
    });
  });

  describe('fromAPI', () => {
    it('should return null for invalid data', () => {
      const result = service.fromAPI({ invalid: 'data' });
      expect(result).toBeNull();
    });

    it('should parse valid API data', () => {
      const apiData = {
        id: '1',
        title: 'API Task',
        status: 'pending',
        priority: 'high',
        createdAt: '2026-03-01T00:00:00Z',
      };

      const task = service.fromAPI(apiData);

      expect(task).not.toBeNull();
      expect(task!.title).toBe('API Task');
      expect(task!.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('isTask', () => {
    it('should return true for valid task', () => {
      const task: Task = {
        id: '1',
        title: 'Test',
        status: 'pending',
        priority: 'medium',
        createdAt: new Date(),
      };
      expect(isTask(task)).toBe(true);
    });

    it('should return false for invalid object', () => {
      expect(isTask({ title: 'No task' })).toBe(false);
      expect(isTask(null)).toBe(false);
      expect(isTask('string')).toBe(false);
    });
  });
});
