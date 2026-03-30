# Caso 1r - Solución: Sistema de Tareas

Solución completa delCaso 1r (Sistema de Tareas) con todos los labs descomentados.

## Estructura

```
src/
├── types/index.ts          # Tipos + Utility Types (4A.1) + Generic Constraints (4A.2)
├── components/            # Componentes React
├── services/              # TaskService
├── utils/                 # Type Guards (8A.1) + Zod (8A.2)
├── contexts/              # TaskContext (8A.3)
├── hooks/                 # useTaskFilter (8A.4)
├── app/                   # Next.js App Router (5A.2-5A.4)
├── styles.css             # Estilos
└── index.tsx              # Entry point Webpack
```

## Labs Incluidos

| Lab | Tema | Archivos |
|-----|------|----------|
| 4A.1 | Utility Types | `types/index.ts` |
| 4A.2 | Generic Constraints | `types/index.ts` |
| 4A.3 | Generic List | `components/TaskList.tsx` |
| 5A.1 | Next.js Config | `next.config.js` |
| 5A.2 | Layout | `app/layout.tsx` |
| 5A.3 | Page | `app/page.tsx` |
| 5A.4 | API Route | `app/api/tasks/route.ts` |
| 8A.1 | Type Guards | `utils/typeGuards.ts` |
| 8A.2 | Zod | `utils/validators.ts` |
| 8A.3 | Context | `contexts/TaskContext.tsx` |
| 8A.4 | Hooks | `hooks/useTaskFilter.ts` |
| 12A.1 | Vitest Config | `vitest.config.ts` |
| 12A.2 | Test Setup | `tests/setup.ts` |
| 12A.3 | TaskService Tests | `tests/taskService.test.ts` |
| 12B.1 | Playwright Config | `playwright.config.ts` |
| 12B.2 | E2E Tests | `e2e/taskflows.spec.ts` |

## Instalación

```bash
npm install
```

## Verificación

```bash
# Verificar tipos
npm run typecheck

# Webpack dev server
npm run dev

# Tests unitarios
npm test

# Tests E2E
npm run test:e2e
```
