// ============================================
// Entry Point - Anexo 3A
// React + Webpack + TypeScript
// ============================================

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Header, TaskList, TaskForm } from './components';
import { useTask } from './hooks';
import './styles/main.css';

const App: React.FC = () => {
  const { tasks, addTask, updateStatus, deleteTask } = useTask();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Header />
      
      <section>
        <h2 style={{ marginBottom: '16px', color: '#333' }}>Nueva Tarea</h2>
        <TaskForm onAdd={addTask} />
      </section>

      <section>
        <h2 style={{ marginBottom: '16px', color: '#333' }}>
          Todas las Tareas ({tasks.length})
        </h2>
        <TaskList
          tasks={tasks}
          onStatusChange={updateStatus}
          onDelete={deleteTask}
        />
      </section>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
