// ============================================================
// TODO (lab 12A): TaskService Tests - Descomenta para activar
// ============================================================
/*

// ============================================================
// tests/taskService.test.ts - Tests unitarios para TaskService
// ============================================================

import { describe, it, expect, beforeEach } from 'vitest';
import { TaskService } from '../src/services/taskService';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    service = new TaskService();
  });

  describe('createTask', () => {
    it('should create a task with given title', () => {
      const task = service.createTask('Nueva tarea', 'high');

      expect(task.title).toBe('Nueva tarea');
      expect(task.priority).toBe('high');
      expect(task.status).toBe('pending');
      expect(task.id).toBeDefined();
    });

    it('should generate unique ids', () => {
      const task1 = service.createTask('Tarea 1', 'low');
      const task2 = service.createTask('Tarea 2', 'low');

      expect(task1.id).not.toBe(task2.id);
    });

    it('should add task to internal list', () => {
      service.createTask('Tarea 1', 'medium');
      service.createTask('Tarea 2', 'low');

      expect(service.getAll()).toHaveLength(2);
    });
  });

  describe('getAll', () => {
    it('should return empty array initially', () => {
      const tasks = service.getAll();
      expect(tasks).toHaveLength(0);
    });

    it('should return a copy, not the original array', () => {
      service.createTask('Tarea 1', 'low');
      const tasks = service.getAll();

      // Modifying returned array should not affect internal state
      tasks.push({ id: 'fake', title: 'Fake', status: 'pending', priority: 'low', createdAt: new Date() });

      expect(service.getAll()).toHaveLength(1);
    });
  });

  describe('getById', () => {
    it('should return undefined for non-existent id', () => {
      const task = service.getById('non-existent');
      expect(task).toBeUndefined();
    });

    it('should return task with given id', () => {
      const created = service.createTask('Tarea 1', 'medium');
      const found = service.getById(created.id);

      expect(found).toEqual(created);
    });
  });

  describe('update', () => {
    it('should return undefined for non-existent id', () => {
      const result = service.update('non-existent', { title: 'New' });
      expect(result).toBeUndefined();
    });

    it('should update task with given id', () => {
      const created = service.createTask('Tarea 1', 'medium');
      const updated = service.update(created.id, { status: 'completed' });

      expect(updated).toBeDefined();
      expect(updated?.status).toBe('completed');
      expect(updated?.title).toBe('Tarea 1'); // Other fields unchanged
    });
  });

  describe('delete', () => {
    it('should return false for non-existent id', () => {
      const result = service.delete('non-existent');
      expect(result).toBe(false);
    });

    it('should return true and remove task', () => {
      const created = service.createTask('Tarea 1', 'medium');
      const result = service.delete(created.id);

      expect(result).toBe(true);
      expect(service.getById(created.id)).toBeUndefined();
    });
  });

  describe('filterByStatus', () => {
    it('should return only tasks with matching status', () => {
      service.createTask('Tarea 1', 'low');
      service.createTask('Tarea 2', 'medium');
      const task3 = service.createTask('Tarea 3', 'high');
      service.update(task3.id, { status: 'completed' });

      const pending = service.filterByStatus('pending');
      expect(pending).toHaveLength(2);
    });
  });
});

*/
// ============================================================
// FIN TODO (lab 12A)
// ============================================================
