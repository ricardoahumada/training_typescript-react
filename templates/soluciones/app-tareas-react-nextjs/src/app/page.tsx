'use client';

// ============================================================
// src/app/page.tsx - Sistema de Tareas (Caso 1r) Next.js SSR
// ============================================================
// Lab 5A.3: App Router - Página Principal con Client Components

import { useState } from 'react';
import { Task, TaskPriority, TaskStatus } from '@/types';
import { TaskList } from '@/components/TaskList';
import { TaskForm } from '@/components/TaskForm';

// Datos iniciales - Sistema de Tareas
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Configurar Webpack',
    description: 'Configurar webpack.config.js desde cero',
    status: 'completed',
    priority: 'high',
    createdAt: new Date('2026-03-01'),
    completedAt: new Date('2026-03-02'),
    tags: ['webpack', 'setup']
  },
  {
    id: '2',
    title: 'Tipos en React',
    description: 'Aplicar Utility Types a componentes',
    status: 'inProgress',
    priority: 'high',
    createdAt: new Date('2026-03-10'),
    tags: ['react', 'typescript']
  },
  {
    id: '3',
    title: 'Migrar a Next.js',
    description: 'CSR -> SSR con Next.js',
    status: 'pending',
    priority: 'medium',
    createdAt: new Date('2026-03-15'),
    dueDate: new Date('2026-03-30'),
    tags: ['nextjs', 'ssr']
  },
  {
    id: '4',
    title: 'Testing con Vitest',
    description: 'Tests unitarios para componentes',
    status: 'pending',
    priority: 'low',
    createdAt: new Date('2026-03-20'),
    tags: ['testing', 'vitest']
  },
];

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (title: string, priority: TaskPriority) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description: '',
      status: 'pending',
      priority,
      createdAt: new Date(),
      tags: [],
    };
    setTasks([...tasks, newTask]);
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, status, completedAt: status === 'completed' ? new Date() : undefined }
          : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const pendingTasks = tasks.filter((t) => t.status === 'pending').length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sistema de Tareas - Next.js SSR</h1>
      </header>

      <main className="app-main">
        <div className="task-stats">
          <div className="task-stats__item">
            <div className="task-stats__value">{pendingTasks}</div>
            <div className="task-stats__label">Pendientes</div>
          </div>
          <div className="task-stats__item">
            <div className="task-stats__value">{completedTasks}</div>
            <div className="task-stats__label">Completadas</div>
          </div>
        </div>

        <div className="panel">
          <h2>Nueva Tarea</h2>
          <TaskForm onSubmit={addTask} />
        </div>

        <div className="panel">
          <h2>Lista de Tareas</h2>
          <TaskList
            tasks={tasks}
            onStatusChange={updateTaskStatus}
            onDelete={deleteTask}
          />
        </div>
      </main>
    </div>
  );
}
