// Lab 3A: Componente TaskCard
// Lab 4A: Se tipara con props
import React from 'react';
import { Task, TaskPriority } from '../types';

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: Task['status']) => void;
  onDelete: (id: string) => void;
}

const priorityColors: Record<TaskPriority, string> = {
  low: '#22c55e',
  medium: '#eab308',
  high: '#ef4444',
};

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const isCompleted = task.status === 'completed';

  return (
    <div className={`task-card ${isCompleted ? 'task-card--completed' : ''}`}>
      <div className="task-card__header">
        <h3 className="task-card__title">{task.title}</h3>
        <span
          className="task-card__priority"
          style={{ backgroundColor: priorityColors[task.priority] }}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="task-card__description">{task.description}</p>
      )}

      <div className="task-card__footer">
        <select
          className="task-card__status"
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
        >
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          className="task-card__delete"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          ×
        </button>
      </div>
    </div>
  );
}
