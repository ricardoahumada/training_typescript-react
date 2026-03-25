// ============================================
// TaskList Component - Anexo 3A
// ============================================

import React from 'react';
import { Task } from '../types';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onStatusChange?: (id: string, status: Task["status"]) => void;
  onDelete?: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onStatusChange, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '40px',
        color: '#666',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
      }}>
        No hay tareas. ¡Crea una nueva!
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
