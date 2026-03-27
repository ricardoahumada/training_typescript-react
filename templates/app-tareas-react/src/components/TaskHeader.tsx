// ============================================================
// src/components/TaskHeader.tsx
// ============================================================
// Lab 3A -> ESTE COMPONENTE ESTA COMPLETO y FUNCIONAL

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
    <div className="task-stats">
      <div className="task-stats__item">
        <div className="task-stats__value">{stats.total}</div>
        <div className="task-stats__label">Total</div>
      </div>
      <div className="task-stats__item">
        <div className="task-stats__value">{stats.pending}</div>
        <div className="task-stats__label">Pendientes</div>
      </div>
      <div className="task-stats__item">
        <div className="task-stats__value">{stats.inProgress}</div>
        <div className="task-stats__label">En Progreso</div>
      </div>
      <div className="task-stats__item">
        <div className="task-stats__value">{stats.completed}</div>
        <div className="task-stats__label">Completadas</div>
      </div>
    </div>
  );
}
