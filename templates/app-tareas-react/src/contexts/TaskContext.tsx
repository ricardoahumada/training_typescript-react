// ============================================================
// TODO (lab 8A.3): TaskContext - Descomenta para activar
// ============================================================


// ============================================================
// src/contexts/TaskContext.tsx - Context con tipos seguros
// ============================================================

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Task, TaskStatus, TaskPriority } from '../types';

interface TaskContextValue {
  tasks: Task[];
  addTask: (title: string, priority: TaskPriority) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
  filterByStatus: (status: TaskStatus | 'all') => Task[];
  filterByPriority: (priority: TaskPriority | 'all') => Task[];
}

const TaskContext = createContext<TaskContextValue | null>(null);

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Tarea de ejemplo',
    status: 'pending',
    priority: 'medium',
    createdAt: new Date(),
  },
];

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = useCallback((title: string, priority: TaskPriority) => {
    const newTask: Task = {
      id: Date.now().toString(36),
      title,
      priority,
      status: 'pending',
      createdAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const getTask = useCallback(
    (id: string) => tasks.find((task) => task.id === id),
    [tasks]
  );

  const filterByStatus = useCallback(
    (status: TaskStatus | 'all') =>
      status === 'all' ? tasks : tasks.filter((t) => t.status === status),
    [tasks]
  );

  const filterByPriority = useCallback(
    (priority: TaskPriority | 'all') =>
      priority === 'all' ? tasks : tasks.filter((t) => t.priority === priority),
    [tasks]
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        getTask,
        filterByStatus,
        filterByPriority,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within TaskProvider');
  }
  return context;
}


// ============================================================
// FIN TODO (lab 8A.3)
// ============================================================
