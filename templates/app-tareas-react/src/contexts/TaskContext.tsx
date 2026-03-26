// Lab 8A: TaskContext - Contexto tipado para React
// Este archivo se expandira en el Lab 8A
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task, TaskStatus, TaskPriority } from '../types';

interface TaskContextValue {
  tasks: Task[];
  addTask: (title: string, priority: TaskPriority) => void;
  updateStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextValue | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string, priority: TaskPriority) => {
    const newTask: Task = {
      id: Date.now().toString(36),
      title,
      priority,
      status: 'pending',
      createdAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateStatus = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status, completedAt: status === 'completed' ? new Date() : t.completedAt }
          : t
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateStatus, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext(): TaskContextValue {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
}
