// ============================================================
// src/app/page.tsx - Pagina principal con Server Components
// ============================================================
// Lab 5A.3: App Router - Página Principal

import { Task, TaskStatus, TaskPriority } from '@/types';

// Server Component - puede ser async
async function getTasks(): Promise<Task[]> {
  // En produccion, esto seria un fetch a tu API
  return [
    {
      id: '1',
      title: 'Tarea desde servidor',
      status: 'pending',
      priority: 'high',
      createdAt: new Date(),
    },
  ];
}

export default async function HomePage() {
  const tasks = await getTasks();

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
      <h1>Sistema de Tareas - SSR</h1>
      <p>Esta pagina se renderiza en el servidor.</p>
      
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - <span>{task.status}</span> - <span>{task.priority}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
