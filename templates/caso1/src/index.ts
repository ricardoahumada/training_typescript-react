// ============================================
// Lab 1: Introducción a TypeScript
// ============================================

import { Task, TaskPriority, TaskStatus } from "./types/tasks";

/* FILTRADO DE TAREAS */

function isCompleted(task: Task): boolean {
  return task.status === "completed";
}

function isAssigned(task: Task): task is Task & { assigneeId: string } {
  return task.assigneeId !== undefined;
}

function filterTasks(
  tasks: Task[],
  filter: {
    status?: TaskStatus;
    priority?: TaskPriority;
  },
): Task[] {
  return tasks.filter((task) => {
    if (filter.status && task.status !== filter.status) return false;
    if (filter.priority && task.priority !== filter.priority) return false;
    return true;
  });
}

const tareas: Task[] = [
  {
    id: "1",
    title: "Aprender TypeScript",
    description: "Completar el módulo 6",
    status: "inProgress",
    priority: "high",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Configurar entorno",
    description: "Instalar VS Code y extensiones",
    status: "completed",
    priority: "medium",
    assigneeId: "user-1",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Bug crítico",
    description: "Resolver bug en producción",
    status: "pending",
    priority: "critical",
    assigneeId: "user-2",
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "Tarea simple",
    description: "Sin asignación",
    status: "pending",
    priority: "low",
    createdAt: new Date(),
  },
  {
    id: "5",
    title: "Revisión de código",
    description: "Code review pendiente",
    status: "inProgress",
    priority: "medium",
    assigneeId: "user-1",
    createdAt: new Date(),
  },
];

const listaf = filterTasks(tareas, { status: "completed" });
console.log(listaf);

const listaf2 = filterTasks(tareas, { status: "completed", priority: "high" });
console.log(listaf);

console.log(isAssigned(tareas[0]));

// ----

type Status = "pending" | "approved" | "rejected";

// ...

function getStatusColor(status: Status): string {
  switch (status) {
    case "pending":
      return "yellow";
    case "approved":
      return "green";
    case "rejected":
      return "red";
    default:
      // Exhaustiveness check
      const _exhaustive: never = status;
      throw new Error(`Unknown status: ${status}`);
  }
}

