// ============================================================
// Lab 5A: Next.js App Router - SSR Page
// ============================================================
// Este archivo se creara en Lab 5A durante la migracion CSR -> SSR
// Ubicacion: src/app/page.tsx (App Router de Next.js)

import { Task } from '@/types';

async function getTasks(): Promise<Task[]> {
  // En Lab 5A: fetch real a API o base de datos
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

export default async function Page() {
  const tasks = await getTasks();

  return (
    <main>
      <h1>Sistema de Tareas - SSR</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </main>
  );
}
