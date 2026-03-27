# Caso 1r: Sistema de Tareas - Plantilla con TODOs

Plantilla para el Caso 1r del curso de TypeScript. Esta plantilla permite practicar labs de 3A a 12B descomentando bloques `// TODO (lab X.Y)`.

## Estado Inicial

```
Estado: Webpack + React CSR FUNCIONAL
npm install && npm run dev
```

La plantilla inicia con **webpack y React completamente configurados y funcionando**. Los labs avanzados (4A, 5A, 8A, 12A, 12B) están comentados con `// TODO` y se activan descomentando.

## Evolución por Lab

| Lab | Concepto | Estado | Como activar |
|-----|----------|--------|--------------|
| **3A** | Webpack + React | ✅ COMPLETO | Ya funciona |
| **4A** | Utility Types + TSX | 📝 TODO | Descomentar en `src/types/index.ts` y `src/components/*.tsx` |
| **5A** | Next.js SSR | 📝 TODO | Descomentar `next.config.js`, `src/app/` |
| **8A** | Patrones TS Avanzados | 📝 TODO | Descomentar `src/utils/`, `src/contexts/`, `src/hooks/` |
| **12A** | Vitest | 📝 TODO | Descomentar `vitest.config.ts`, `tests/` |
| **12B** | Playwright | 📝 TODO | Descomentar `playwright.config.ts`, `e2e/` |

## Quick Start

```bash
# Instalar dependencias
npm install

# Iniciar desarrollo (Webpack CSR)
npm run dev

# Verificar tipos
npm run typecheck
```

## Scripts Disponibles

```bash
npm run dev          # Webpack dev server (CSR)
npm run build        # Build produccion
npm run typecheck    # Verificacion de tipos

# Labs avanzados (descomentar primero):
npm test             # Vitest (Lab 12A)
npm run test:watch   # Vitest watch mode
npm run test:e2e    # Playwright E2E (Lab 12B)
```

## Estructura de TODOs

### Lab 4A: Utility Types

Descomenta en `src/types/index.ts`:
```typescript
// TODO (lab 4A.1): Utility Types
export type CreateTaskParams = Omit<Task, 'id' | 'createdAt' | 'completedAt'>;
export type EditTaskParams = Partial<Task>;
export type TaskPreview = Pick<Task, 'id' | 'title' | 'status' | 'priority'>;
export type TasksByPriority = Record<TaskPriority, Task[]>;
```

### Lab 5A: Next.js SSR

Descomenta:
- `next.config.js`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/api/tasks/route.ts`

### Lab 8A: Patrones Avanzados

Descomenta en `src/`:
- `utils/typeGuards.ts` — Type guards para runtime
- `utils/validators.ts` — Zod schemas
- `contexts/TaskContext.tsx` — Context con tipos
- `hooks/useTaskFilter.ts` — Hooks tipados

### Lab 12A: Vitest

Descomenta:
- `vitest.config.ts`
- `tests/setup.ts`
- `tests/taskService.test.ts`

### Lab 12B: Playwright

Descomenta:
- `playwright.config.ts`
- `e2e/taskflows.spec.ts`

## Tecnologias Incluidas

```
Dependencias:
- react ^18.2.0
- react-dom ^18.2.0
- next ^14.2.0
- zod ^3.23.0

DevDependencies:
- typescript ^5.3.3
- webpack ^5.105.4
- ts-loader ^9.5.4
- vitest ^1.4.0
- @playwright/test ^1.42.0
- @testing-library/react ^14.2.0
```

## Dominio: Sistema de Tareas

```typescript
type TaskStatus = 'pending' | 'inProgress' | 'completed';
type TaskPriority = 'low' | 'medium' | 'high';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  completedAt?: Date;
  dueDate?: Date;
  tags?: string[];
}
```
