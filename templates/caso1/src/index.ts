// ============================================
// Lab 1: Introducción a TypeScript
// ============================================

// Tipo string - texto
let taskTitle: string = "Completar informe";
let userName: string = "Juan Pérez";

// Tipo number - números
// let taskPriority: number = 1;
let completedTasks: number = 42;
let averageTime: number = 3.5;

// Tipo boolean - verdadero o falso
// let isCompleted: boolean = false;
let isUrgent: boolean = true;

/* ARRAYS */

// Sintaxis 1: tipo[]
let tasks: string[] = ["Task 1", "Task 2", "Task 3"];

// Sintaxis 2: Array<tipo>
let priorities: Array<number> = [1, 2, 3, 4, 5];

/* TUPLAS */

// Tupla: [string, number]
let userInfo: [string, number] = ["Juan", 30];

// Acceso por índice
console.log(userInfo[0]); // "Juan"
console.log(userInfo[1]); // 30

// userInfo = [2, true];

// Tupla con tipos mixtos
let taskRecord: [string, number, boolean] = ["Task 1", 5, true];

/* OBJETOS */
let objecto: { key: number } = { key: 2 };

/*  ENUMS */

// Enum numérico
enum Status {
  Pending, // 0
  InProgress, // 1
  Completed, // 2
}

let taskStatus: Status = Status.Pending;

// Enum con valores de string
enum Priority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

let taskPriority: Priority = Priority.High;

/* TIPOS ESPECIALES */

let ric: { nombre: string; edad: number } | null = null;
let ana: { nombre: string; edad?: number } & { edad: number } = {
  nombre: "ana",
  edad: 35,
};

function userManager(usuario: { nombre?: string }): void {
  const nombre = usuario.nombre;
  if (nombre != null) console.log(nombre.toLocaleUpperCase());
}

function evalTarea(task: { nombre: string; estado: Status }): number | never {
  switch (task.estado) {
    case Status.Completed:
      //
      return 1;

    case Status.InProgress:
      //
      return 2;

    case Status.Pending:
      //
      return 3;

    default:
      throw Error();
  }
}

type User = { type: "user"; name: string };
type Product = { type: "product"; price: number };

function processValue(value: User | Product) {
  if (value.type === "user") {
    // TypeScript sabe que es User
    console.log(value.name); // ✓
  } else {
    // TypeScript sabe que es Product
    console.log(value.price); // ✓
  }
}

/* FILTRADO DE TAREAS */

type TaskStatus = "pending" | "inProgress" | "completed";
type TaskPriority = "low" | "medium" | "high" | "critical";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  createdAt: Date;
  completedAt?: Date;
}

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

const listaf = filterTasks(tareas, { status: "completed", priority: "high" });
console.log(listaf);

console.log(isAssigned(tareas[0]));
