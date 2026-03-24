# Caso 1: Sistema de Tareas - Template

Template de proyecto TypeScript para el Caso 1 del curso.

## Estructura

`
caso1/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts          # Entry point
│   ├── types/
│   │   └── index.ts      # Enums: Status, Priority
│   │                     # Interfaces: Task, User
│   └── services/
│       └── taskService.ts # Funciones de servicio con stubs
└── tests/
    └── taskService.test.ts
`

## Comandos

`ash
npm install        # Instalar dependencias
npm run build      # Compilar TypeScript
npm run watch      # Compilar en modo watch
npm start          # Ejecutar archivo compilado
npm test           # Ejecutar tests
`

## Contenido

- **Tipos/Enums**: Definidos completamente
- **Interfaces**: Definidas completamente
- **Funciones**: Stubs con 	hrow new Error('Not implemented')
- **Tests**: Estructura vacia con // TODO: implementar test

## Uso en el Curso

Este template se usa en los labs de modulos 1-12 para practicar conceptos de TypeScript.
