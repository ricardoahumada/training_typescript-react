// Lab 3A: App.tsx - Sistema de Gestion de Tareas
// EVOLUCION: 3A (CSR) -> 4A (tipado) -> 5A (Next.js SSR) -> 8A (patrones) -> 12A/12B (tests)
import React, { useState } from 'react';
import { Task, TaskPriority, TaskStatus } from './types';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { TaskHeader } from './components/TaskHeader';

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
  }
];

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleAddTask = (title: string, priority: TaskPriority) => {
    const newTask: Task = {
      id: generateId(),
      title,
      priority,
      status: 'pending',
      createdAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleStatusChange = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
              completedAt: status === 'completed' ? new Date() : task.completedAt,
            }
          : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    inProgress: tasks.filter((t) => t.status === 'inProgress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  return (
    <div className="app">
      <TaskHeader stats={stats} />

      <main className="app-main">
        <section className="panel">
          <h2>Nueva Tarea</h2>
          <TaskForm onSubmit={handleAddTask} />
        </section>

        <section className="panel">
          <h2>Tareas</h2>
          <TaskList
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
