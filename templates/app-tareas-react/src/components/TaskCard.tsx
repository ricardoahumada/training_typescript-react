// ============================================
// TaskCard Component - Anexo 3A
// ============================================

import React from 'react';
import { Task, TaskPriority } from '../types';

interface TaskCardProps {
  task: Task;
  onStatusChange?: (id: string, status: Task["status"]) => void;
  onDelete?: (id: string) => void;
}

const priorityColors: Record<TaskPriority, string> = {
  low: '#4CAF50',
  medium: '#FF9800',
  high: '#F44336',
};

const statusLabels: Record<Task["status"], string> = {
  pending: 'Pendiente',
  inProgress: 'En Progreso',
  completed: 'Completada',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, onDelete }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderLeft: `4px solid ${priorityColors[task.priority]}`,
      padding: '16px',
      margin: '8px 0',
      borderRadius: '4px',
      backgroundColor: '#fff',
    }}>
      <h3 style={{ margin: '0 0 8px 0' }}>{task.title}</h3>
      {task.description && (
        <p style={{ color: '#666', margin: '0 0 12px 0' }}>{task.description}</p>
      )}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{
          backgroundColor: priorityColors[task.priority],
          color: 'white',
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '12px',
        }}>
          Prioridad: {task.priority}
        </span>
        <span style={{ fontSize: '14px', color: '#333' }}>
          Estado: {statusLabels[task.status]}
        </span>
      </div>
      <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
        {onStatusChange && (
          <>
            {task.status !== 'pending' && (
              <button onClick={() => onStatusChange(task.id, 'pending')}>
                Pendiente
              </button>
            )}
            {task.status !== 'inProgress' && (
              <button onClick={() => onStatusChange(task.id, 'inProgress')}>
                En Progreso
              </button>
            )}
            {task.status !== 'completed' && (
              <button onClick={() => onStatusChange(task.id, 'completed')}>
                Completar
              </button>
            )}
          </>
        )}
        {onDelete && (
          <button onClick={() => onDelete(task.id)} style={{ backgroundColor: '#F44336' }}>
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
