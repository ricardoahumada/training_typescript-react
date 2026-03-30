// ============================================================
// src/App.tsx - Sistema de Gestion de Tareas (Caso 1r)
// ============================================================
// 
// Lab 3A -> ESTE ARCHIVO ESTA COMPLETO y FUNCIONAL
// - Webpack entry point configurado
// - Componentes TaskList, TaskForm, TaskCard integrados
// - Estado local con useState
//
// Labs futuros:
// - Lab 4A: Components se descomentan para tipado
// - Lab 8A: Context y hooks se descomentan
// - Lab 5A: Se migrara a Next.js app/
//

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
      <header className="app-header">
        <h1>Sistema de Tareas</h1>
        <p>Caso 1r - React + TypeScript</p>
      </header>

      <main className="app-main">
        <section className="panel">
          <TaskHeader stats={stats} />
        </section>

        <section className="panel">
          <h2>Nueva Tarea</h2>
          <TaskForm onSubmit={handleAddTask} />
        </section>

        <section className="panel">
          <h2>Lista de Tareas</h2>
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

// ============================================================
// TODO (lab 8A.4): Context Provider - Descomenta para activar
// ============================================================
/*
// Descomenta este bloque completo para usar TaskContext en lugar de props

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (title: string, priority: TaskPriority) => {
    const newTask: Task = {
      id: generateId(),
      title,
      priority,
      status: 'pending',
      createdAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateStatus = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status, completedAt: status === 'completed' ? new Date() : task.completedAt }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateStatus, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

// Para usar en componentes:
// const { tasks, addTask } = useTask();

*/
// ============================================================
// FIN TODO (lab 8A.4)
// ============================================================
