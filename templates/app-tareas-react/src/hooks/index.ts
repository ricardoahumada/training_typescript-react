// Lab 4A/8A: Custom hooks con tipos
import { useState, useCallback } from 'react';
import { Task, TaskStatus, TasksByStatus, TasksByPriority } from '../types';

// Lab 4A: useTaskFilter - hook para filtrar tareas
export function useTaskFilter(tasks: Task[]) {
  const [filter, setFilter] = useState<TaskStatus | 'all'>('all');

  const filteredTasks = filter === 'all'
    ? tasks
    : tasks.filter((t) => t.status === filter);

  return { filter, setFilter, filteredTasks };
}

// Lab 4A: useTaskSort - hook para ordenar tareas
export function useTaskSort(tasks: Task[]) {
  const [sortBy, setSortBy] = useState<'priority' | 'createdAt'>('createdAt');

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return { sortBy, setSortBy, sortedTasks };
}

// Lab 4A: useTasksByStatus - agrupar por estado
export function useTasksByStatus(tasks: Task[]): TasksByStatus {
  return {
    pending: tasks.filter((t) => t.status === 'pending'),
    inProgress: tasks.filter((t) => t.status === 'inProgress'),
    completed: tasks.filter((t) => t.status === 'completed'),
  };
}

// Lab 4A: useTasksByPriority - agrupar por prioridad
export function useTasksByPriority(tasks: Task[]): TasksByPriority {
  return {
    high: tasks.filter((t) => t.priority === 'high'),
    medium: tasks.filter((t) => t.priority === 'medium'),
    low: tasks.filter((t) => t.priority === 'low'),
  };
}

// Lab 8A: useTaskValidation - hook con validacion
export function useTaskValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateTitle = useCallback((title: string): boolean => {
    if (!title.trim()) {
      setErrors((prev) => ({ ...prev, title: 'El titulo es requerido' }));
      return false;
    }
    if (title.length < 3) {
      setErrors((prev) => ({ ...prev, title: 'Minimo 3 caracteres' }));
      return false;
    }
    setErrors((prev) => {
      const { title: _, ...rest } = prev;
      return rest;
    });
    return true;
  }, []);

  const clearErrors = useCallback(() => setErrors({}), []);

  return { errors, validateTitle, clearErrors };
}
