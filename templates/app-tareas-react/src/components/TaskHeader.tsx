// Lab 3A: TaskHeader
import React from 'react';

interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

interface TaskHeaderProps {
  stats: TaskStats;
}

export function TaskHeader({ stats }: TaskHeaderProps) {
  return (
    <header className="app-header">
      <h1>Sistema de Tareas</h1>
      <div className="task-stats">
        <span className="task-stats__item">
          Total: <strong>{stats.total}</strong>
        </span>
        <span className="task-stats__item task-stats__item--pending">
          Pendientes: <strong>{stats.pending}</strong>
        </span>
        <span className="task-stats__item task-stats__item--progress">
          En Progreso: <strong>{stats.inProgress}</strong>
        </span>
        <span className="task-stats__item task-stats__item--completed">
          Completadas: <strong>{stats.completed}</strong>
        </span>
      </div>
    </header>
  );
}
