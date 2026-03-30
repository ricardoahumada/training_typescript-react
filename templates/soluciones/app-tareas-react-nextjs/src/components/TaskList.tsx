// ============================================================
// src/components/TaskList.tsx
// ============================================================
// Lab 3A -> ESTE COMPONENTE ESTA COMPLETO y FUNCIONAL
// Lab 4A: Se enhance con tipado mas completo de useState<T>
// Lab 4A.3: Generic List Component

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

// ============================================================
// Lab 4A.3: Generic List Component
// ============================================================

// Componente generico que funciona con cualquier lista tipada
function List<T extends { id: string }>({
  items,
  renderItem,
  keyExtractor,
}: {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}) {
  return (
    <div>
      {items.map((item) => (
        <div key={keyExtractor(item)}>{renderItem(item)}</div>
      ))}
    </div>
  );
}

export { List };
