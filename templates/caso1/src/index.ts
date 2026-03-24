import { Task } from './types';
import * as taskService from './services/taskService';

export { Task, Status, Priority } from './types';
export { taskService };

// Punto de entrada - ejemplos de uso
const sampleTask: Task = {
  id: '1',
  title: 'Tarea de ejemplo',
  status: Status.PENDING,
  priority: Priority.MEDIUM,
  createdAt: new Date(),
  updatedAt: new Date()
};

console.log('Caso 1: Sistema de Gestion de Tareas');
console.log('Ejecuta npm install y luego implementa los labs');
