// ============================================
// useTask Hook - Anexo 3A
// ============================================

import { useState, useCallback } from 'react';
import { Task, TaskPriority, TaskStatus } from '../types';

export function useTask() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Aprender React con TypeScript',
      description: 'Fundamentos de React 18 y tipos',
      status: 'inProgress',
      priority: 'high',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Configurar Webpack',
      description: 'Crear build config desde cero',
      status: 'pending',
      priority: 'medium',
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Practicar con hooks',
      description: 'useState, useEffect, useCallback',
      status: 'completed',
      priority: 'low',
      createdAt: new Date(),
    },
  ]);

  const addTask = useCallback((title: string, priority: TaskPriority, description?: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status: 'pending',
      priority,
      createdAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const updateStatus = useCallback((id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
              completedAt: status === 'completed' ? new Date() : undefined,
            }
          : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const getTasksByStatus = useCallback((status: TaskStatus): Task[] => {
    return tasks.filter((task) => task.status === status);
  }, [tasks]);

  return {
    tasks,
    addTask,
    updateStatus,
    deleteTask,
    getTasksByStatus,
  };
}
