# Caso 1r: Sistema de Tareas - Plantilla Progresiva

## Descripcion

Plantilla del **Sistema de Gestion de Tareas** (Caso 1r) para los labs de los anexos 3A a 12B. Esta plantilla tiene la estructura necesaria para implementar todas las evoluciones del caso practico.

## Evolucion del Proyecto

| Anexo | Tecnologia | Descripcion | Tu Tarea |
|-------|------------|-------------|----------|
| **3A** | Webpack + React (CSR) | Configurar bundling desde cero | Completar `webpack.config.js` y `tsconfig.json` |
| **4A** | React 18 + TS 5 | Utility Types, hooks tipados | Tipar componentes con `useState<T>`, `Partial`, `Pick` |
| **5A** | Next.js SSR | Migracion CSR -> SSR | Crear `src/app/` y `next.config.js` |
| **8A** | Patrones TS | Type guards, contextos, Zod | Implementar validacion runtime |
| **12A** | Vitest | Tests unitarios deterministas | Completar `vitest.config.ts` y escribir tests |
| **12B** | Playwright | Tests E2E + Visual Regression | Completar `playwright.config.ts` y escribir e2e |

## Estado Inicial (Lab 3A - TU Completas)

### Estructura de Archivos

```
caso1r-plantilla/
├── public/
│   └── index.html           ← HTML base (listo)
├── src/
│   ├── types/
│   │   └── index.ts         ← Tipos del dominio (Task, User, enums)
│   ├── components/
│   │   ├── TaskCard.tsx     ← Componente tarjeta (tipos incomplete)
│   │   ├── TaskList.tsx     ← Lista de tareas
│   │   ├── TaskForm.tsx     ← Formulario nueva tarea
│   │   ├── TaskHeader.tsx   ← Header con estadisticas
│   │   └── index.ts
│   ├── services/            ← (para 8A)
│   │   └── taskService.ts   ← Service con type guards
│   ├── contexts/            ← (para 8A)
│   │   └── TaskContext.tsx  ← Contexto tipado
│   ├── hooks/               ← (para 4A y 8A)
│   │   └── index.ts         ← Hooks: useTaskFilter, useTaskSort
│   ├── utils/               ← (para 8A)
│   │   └── index.ts         ← Type guards y parsers
│   ├── app/                 ← (para 5A - Next.js)
│   │   └── page.tsx         ← SSR page (pre-creada)
│   ├── App.tsx              ← Componente principal
│   ├── index.tsx            ← Entry point webpack
│   └── styles.css           ← Estilos basicos
├── tests/                  ← (para 12A)
├── e2e/                    ← (para 12B)
├── webpack.config.js        ← COMPLETAR (Lab 3A)
├── tsconfig.json            ← COMPLETAR (Lab 3A)
├── vitest.config.ts         ← (listo para 12A)
├── playwright.config.ts     ← (listo para 12B)
└── package.json
```

### Archivos a Completar en Lab 3A

#### `webpack.config.js`

```javascript
module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
  devServer: {
    static: './dist',
    port: 3000,
    hot: true,
  },
  mode: 'development',
};
```

#### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Comandos

```bash
# Instalar dependencias
npm install
npm install --save-dev webpack webpack-cli webpack-dev-server ts-loader css-loader style-loader html-webpack-plugin

# Lab 3A: Desarrollo
npm run dev

# Lab 3A: Build
npm run build

# Lab 12A: Tests (despues de configurar vitest)
npm test

# Lab 12B: E2E (despues de instalar playwright)
npx playwright test
```

## Dependencias por Anexo

### Lab 3A (Webpack)
```bash
npm install --save-dev webpack webpack-cli webpack-dev-server ts-loader css-loader style-loader html-webpack-plugin
```

### Lab 4A (React 18 + TS 5)
- Ya tiene `@types/react`, `@types/react-dom`, `typescript` en devDependencies

### Lab 5A (Next.js SSR)
```bash
npm install next react react-dom
npm install --save-dev @types/react @types/react-dom
```

### Lab 8A (Zod)
```bash
npm install zod
```

### Lab 12A (Vitest)
```bash
npm install --save-dev vitest @vitest/coverage-v8 jsdom @testing-library/react
```

### Lab 12B (Playwright)
```bash
npm install --save-dev @playwright/test
npx playwright install --with-deps chromium
```

## Flujo de Desarrollo

```
1. npm install
2. Completar webpack.config.js (Lab 3A)
3. Completar tsconfig.json (Lab 3A)
4. npm run dev  -> http://localhost:3000
5. npm run build -> dist/
```

## Errores Comunes

- **"Cannot find module 'react'"**: Falta configurar `tsconfig.json` con `lib: ["DOM"]`
- **"JSX element implicitly has type 'any'"**: Falta `jsx: "react-jsx"` en tsconfig
- **"ts-loader not found"**: No se instalaron las devDependencies de webpack

## Para el Formador

Esta plantilla sigue el enfoque **progresivo evolucionado**:
- El alumno empieza con archivos vacios de configuracion
- Los componentes React basicos YA existen pero sin tipado completo
- La estructura de carpetas PARA TODOS los labs esta pre-creada
- El alumno llena los TODOs en orden (3A -> 4A -> 5A -> 8A -> 12A -> 12B)
