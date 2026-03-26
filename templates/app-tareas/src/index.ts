// ============================================
// Lab 6: Estructuras de Control
// ============================================

import { Task, TaskStatus, TaskPriority } from "./types/task";
import { isCompleted, isAssigned, isHighPriority } from "./utils/typeGuards";
import { filterTasks, getHighPriorityTasks, getCompletedTasks } from "./utils/taskFilters";
import { getPriorityLevel, getPriorityDescription, getPriorityColor, sortByPriority } from "./utils/priority";

console.log("=== Lab 6: Estructuras de Control ===\n");

// ============================================
// Datos de prueba
// ============================================

const tareas: Task[] = [
  {
    id: "1",
    title: "Aprender TypeScript",
    description: "Completar el módulo 6",
    status: "inProgress",
    priority: "high",
    createdAt: new Date()
  },
  {
    id: "2",
    title: "Configurar entorno",
    description: "Instalar VS Code y extensiones",
    status: "completed",
    priority: "medium",
    assigneeId: "user-1",
    createdAt: new Date()
  },
  {
    id: "3",
    title: "Bug crítico",
    description: "Resolver bug en producción",
    status: "pending",
    priority: "critical",
    assigneeId: "user-2",
    createdAt: new Date()
  },
  {
    id: "4",
    title: "Tarea simple",
    description: "Sin asignación",
    status: "pending",
    priority: "low",
    createdAt: new Date()
  },
  {
    id: "5",
    title: "Revisión de código",
    description: "Code review pendiente",
    status: "inProgress",
    priority: "medium",
    assigneeId: "user-1",
    createdAt: new Date()
  }
];

// ============================================
// Type Guards
// ============================================

console.log("--- Type Guards ---");

// isCompleted
const tareaCompletada = tareas.find(t => isCompleted(t));
console.log("Primera tarea completada:", tareaCompletada?.title);

// isAssigned
const tareasAsignadas = tareas.filter(isAssigned);
console.log("Tareas asignadas:", tareasAsignadas.length);

// isHighPriority
const tareasUrgentes = tareas.filter(isHighPriority);
console.log("Tareas de alta prioridad:", tareasUrgentes.map(t => t.title));

// ============================================
// Filtros
// ============================================

console.log("\n--- Filtros ---");

// Filtrar por estado
const pendientes = filterTasks(tareas, { status: "pending" });
console.log("Tareas pendientes:", pendientes.length);

// Filtrar por prioridad
const criticas = filterTasks(tareas, { priority: "critical" });
console.log("Tareas críticas:", criticas.map(t => t.title));

// Filtrar combinando
const asignadasAltaPrioridad = filterTasks(tareas, { 
  assigned: true, 
  priority: "high" 
});
console.log("Asignadas de alta prioridad:", asignadasAltaPrioridad.map(t => t.title));

// ============================================
// Switch Exhaustivo
// ============================================

console.log("\n--- Switch Exhaustivo ---");

for (const prioridad of ["low", "medium", "high", "critical"] as TaskPriority[]) {
  console.log(`${prioridad}: nivel ${getPriorityLevel(prioridad)} - ${getPriorityDescription(prioridad)}`);
}

// ============================================
// Utilidades de Prioridad
// ============================================

console.log("\n--- Utilidades de Prioridad ---");

const tareaEjemplo = tareas[2]; // La tarea crítica
console.log(`Color para prioridad "${tareaEjemplo.priority}":`, getPriorityColor(tareaEjemplo.priority));

// Ordenar por prioridad
const ordenadas = sortByPriority(tareas);
console.log("\nTareas ordenadas por prioridad:");
ordenadas.forEach((t, i) => {
  console.log(`  ${i + 1}. [${t.priority.toUpperCase()}] ${t.title}`);
});

console.log("\n=== Lab 6 Completado ===");
