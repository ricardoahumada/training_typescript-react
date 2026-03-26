// Lab 3A: Componente TaskList
// Lab 4A: Se tipara con useState<T>
import React from 'react';
import { Task } from '../types';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: string, status: Task['status']) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="task-list__empty">
        <p>No hay tareas. Crea una nueva.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
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
}
