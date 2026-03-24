# Caso 2: Sistema de Biblioteca - Template

Template de proyecto TypeScript para el Caso 2 del curso.

## Estructura

```
caso2/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts
│   ├── types/
│   │   └── index.ts          # Enums: Genre, MembershipType, LoanStatus
│   │                         # Interfaces: Book, Member, Loan
│   ├── models/
│   │   └── LibraryItem.ts    # Clases: LibraryItem, BookItem, DigitalItem
│   ├── services/
│   │   ├── loanService.ts   # Funciones de prestamos
│   │   └── library.ts       # Funciones de biblioteca
│   ├── utils/
│   │   ├── generics.ts       # Utilidades genericas
│   │   └── validators.ts     # Type guards
│   └── repositories/
│       └── Repository.ts     # Interfaz y clase repositorio
└── tests/
    ├── generics.test.ts
    ├── loanService.test.ts
    ├── library.test.ts
    └── validators.test.ts
```

## Comandos

```bash
npm install        # Instalar dependencias
npm run build      # Compilar TypeScript
npm run watch      # Compilar en modo watch
npm start          # Ejecutar archivo compilado
npm test           # Ejecutar tests
```

## Contenido

- **Tipos/Enums**: Definidos completamente
- **Interfaces**: Definidas completamente
- **Clases**: Definidas completamente
- **Funciones**: Stubs con `throw new Error('Not implemented')`
- **Tests**: Estructura vacia con `// TODO: implementar test`
