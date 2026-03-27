// ============================================================
// TODO (lab 5A): API Route - Descomenta para activar
// ============================================================
/*

// ============================================================
// src/app/api/tasks/route.ts - API Route para tareas
// ============================================================

import { NextResponse } from 'next/server';
import { Task } from '@/types';

// Datos simulados
let tasks: Task[] = [
  {
    id: '1',
    title: 'Tarea desde API',
    status: 'pending',
    priority: 'medium',
    createdAt: new Date(),
  },
];

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTask: Task = {
    id: Date.now().toString(36),
    title: body.title,
    priority: body.priority || 'medium',
    status: 'pending',
    createdAt: new Date(),
  };
  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}

*/
// ============================================================
// FIN TODO (lab 5A)
// ============================================================
