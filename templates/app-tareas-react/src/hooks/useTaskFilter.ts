// ============================================================
// TODO (lab 8A.4): Hooks - Descomenta para activar
// ============================================================


// ============================================================
// src/hooks/useTaskFilter.ts - Hook para filtrar tareas
// ============================================================

import { useState, useMemo } from 'react';
import { Task, TaskStatus, TaskPriority } from '../types';

export function useTaskFilter<T extends {id:string}>(tasks: T[]) {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      return matchesStatus && matchesPriority;
    });
  }, [tasks, statusFilter, priorityFilter]);

  return {
    filteredTasks,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
  };
}


// ============================================================
// FIN TODO (lab 8A.4)
// ============================================================
