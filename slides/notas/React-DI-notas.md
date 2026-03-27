# Dependency Injection en React: Guía con Ejemplos de Código

## 1. ¿Qué es Dependency Injection?

**Definición**: Es un patrón de diseño que permite inyectar dependencias en un componente desde una fuente externa, promoviendo el acoplamiento flojo y mejorando la reutilización de código.

### Ejemplo básico

```typescript
// Servicio de dependencia
class ApiService {
  getData() {
    // Realizar solicitud API y retornar datos
  }
}

// Componente con dependency injection
class MyComponent {
  constructor(apiService) {
    this.apiService = apiService;
  }
  
  fetchData() {
    this.apiService.getData()
      .then(data => { /* manejar datos */ })
      .catch(error => { /* manejar errores */ });
  }
}

// Crear instancia del servicio
const apiService = new ApiService();
// Crear componente con la dependencia inyectada
const myComponent = new MyComponent(apiService);
```

**Beneficios**:
- Mayor flexibilidad y reutilización
- Fácil sustitución o mock del servicio durante testing
- Separación de preocupaciones

---

## 2. Dependency Injection en React

### 2.1 Prop Drilling: Pasando Dependencias por Props

```tsx
import React from 'react';
import { ApiService } from './services/ApiService';

function ChildComponent({ apiService }) {
  // Usar el ApiService inyectado
}

function IntermediateComponent({ apiService }) {
  return <ChildComponent apiService={apiService} />;
}

function ParentComponent() {
  const apiService = new ApiService();
  return <IntermediateComponent apiService={apiService} />;
}
```

**Cuándo usarlo**: 
- Árbol de componentes pequeño
- Pocos componentes necesitan acceso a la dependencia

**Desventajas**:
- Puede volverse difícil de mantener en árboles profundos
- Propagación innecesaria a través de componentes que no lo necesitan

### 2.2 Inyección via Props (Diseño desde el inicio)

```tsx
import React from 'react';
import { ApiService } from './services/ApiService';

// Componente diseñado para recibir la dependencia como prop
function MyComponent({ apiService }) {
  // Usar el servicio inyectado
}

// Crear instancia del servicio
const apiService = new ApiService();

// Usar el componente con dependency injection
function App() {
  return <MyComponent apiService={apiService} />;
}
```

**Beneficios del diseño con DI en mente**:
- Componente desacoplado de la implementación específica del servicio
- Más modular y reutilizable
- Más fácil de testear (puedes pasar mocks)

---

## 3. React Context API para Dependency Injection

### Pattern: Provider + useContext

```tsx
import React, { createContext, useContext } from 'react';
import { ApiService } from './services/ApiService';

// Crear contexto para el ApiService
const ApiContext = createContext(null);

// Componente que provee el ApiService a través del contexto
function ApiProvider({ children }) {
  const apiService = new ApiService();
  return (
    <ApiContext.Provider value={apiService}>
      {children}
    </ApiContext.Provider>
  );
}

// Componente que consume el ApiService a través del contexto
function MyComponent() {
  const apiService = useContext(ApiContext);
  // Usar el servicio inyectado
  return (
    <div>
      {/* Renderizar contenido */}
    </div>
  );
}

// App envuelve los componentes relevantes con el ApiProvider
function App() {
  return (
    <ApiProvider>
      <MyComponent />
    </ApiProvider>
  );
}
```

**Ventajas**:
- No requiere prop drilling
- Escala bien en aplicaciones grandes
- Acceso centralizado a dependencias

### Ejemplo con múltiples componentes

```tsx
import React, { createContext, useContext } from 'react';
import { ApiService } from './services/ApiService';

const ApiContext = createContext(null);

function App() {
  const apiService = new ApiService();
  return (
    <ApiContext.Provider value={apiService}>
      <div>
        <IntermediateComponent />
      </div>
    </ApiContext.Provider>
  );
}

function IntermediateComponent() {
  const apiService = useContext(ApiContext);
  return (
    <div>
      {/* Usar el ApiService */}
    </div>
  );
}

function ChildComponent() {
  const apiService = useContext(ApiContext);
  return (
    <div>
      {/* Usar el ApiService */}
    </div>
  );
}
```

**Nota**: Para instancias múltiples o gestión más compleja, considera usar librerías DI como Awilix o InversifyJS.

---

## 4. Componentes Funcionales con Hooks Personalizados

### Custom Hook como contenedor de dependencia

```tsx
function useApiService() {
  const dependency = new MyDependency();
  return dependency;
}

function MyComponent() {
  const dependency = useDependency();
  // Usar la dependencia inyectada
}
```

```tsx
function useApiService() {
  const apiService = new ApiService();
  return apiService;
}

function MyComponent() {
  const apiService = useApiService();
  // Usar el servicio inyectado
}
```

**Ventajas**:
- Reutilizable en múltiples componentes
- Abstrae la creación y gestión de la dependencia
- Código más limpio y mantenible

---

## 5. Librerías de Dependency Injection

### 5.1 InversifyJS

```typescript
import { injectable, inject, Container } from 'inversify';

@injectable()
class ApiService {
  getData() {
    // Realizar solicitud API
  }
}

@injectable()
class LoggerService {
  log(message: string) {
    console.log(message);
  }
}

@injectable()
class MyComponent {
  constructor(
    @inject(ApiService) private apiService: ApiService,
    @inject(LoggerService) private loggerService: LoggerService
  ) {}

  fetchData() {
    this.apiService.getData()
      .then(data => { /* manejar datos */ })
      .catch(error => {
        this.loggerService.log(`Error: ${error}`);
      });
  }
}

// Crear contenedor IoC
const container = new Container();

// Bindear dependencias
container.bind(ApiService).to(ApiService);
container.bind(LoggerService).to(LoggerService);
container.bind(MyComponent).to(MyComponent);

// Resolver componente
const myComponent = container.resolve(MyComponent);
```

### 5.2 Awilix

```typescript
import { createContainer, asClass, asValue } from 'awilix';

class ApiService {
  getData() {
    // Realizar solicitud API
  }
}

class LoggerService {
  log(message: string) {
    console.log(message);
  }
}

// Crear contenedor
const container = createContainer();

// Registrar dependencias
container.register({
  apiService: asClass(ApiService).singleton(),
  loggerService: asClass(LoggerService).singleton(),
  appName: asValue('My App'),
});

// Resolver dependencias
const apiService = container.resolve('apiService');
const loggerService = container.resolve('loggerService');
```

### 5.3 tsyringe

```typescript
import { container, singleton, injectable, inject } from 'tsyringe';

@singleton()
class ApiService {
  getData() {
    // Realizar solicitud API
  }
}

@singleton()
class LoggerService {
  log(message: string) {
    console.log(message);
  }
}

@injectable()
class MyComponent {
  constructor(
    @inject(ApiService) private apiService: ApiService,
    @inject(LoggerService) private loggerService: LoggerService
  ) {}
}

// Registrar dependencias
container.register(ApiService);
container.register(LoggerService);
container.register(MyComponent);

// Resolver componente
const myComponent = container.resolve(MyComponent);
```

---

## 6. Mejores Prácticas

### 6.1 Gestión del Ciclo de Vida

```tsx
import React, { useEffect, useState } from 'react';
import { ApiService } from './services/ApiService';

function MyComponent() {
  const [apiService, setApiService] = useState(null);

  useEffect(() => {
    // Crear instancia cuando el componente monta
    const apiService = new ApiService();
    setApiService(apiService);

    // Limpiar cuando el componente desmonta
    return () => {
      apiService.dispose();
    };
  }, []);

  // Usar la instancia cuando esté disponible
  useEffect(() => {
    if (apiService) {
      // Realizar operaciones con el servicio
    }
  }, [apiService]);

  return (
    <div>
      {/* Contenido del componente */}
    </div>
  );
}
```

### 6.2 Evitar Anti-patterns

```tsx
import React, { useEffect, useState } from 'react';
import { ApiService } from './services/ApiService';

function MyComponent({ apiService }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (apiService) {
      apiService.getData()
        .then(response => setData(response))
        .catch(error => console.error(error));
    }
  }, [apiService]);

  return (
    <div>
      {/* Contenido */}
    </div>
  );
}
```

**Buenos hábitos**:
1. **Evitar acoplamiento fuerte**: No crear instancias dentro del componente
2. **Manejo de errores**: Usar try-catch y manejar errores apropiadamente
3. **Separación de concerns**: El componente no necesita saber cómo se crea el servicio

### 6.3 Consideraciones de Rendimiento

- Considerar el scope y límites del contexto para evitar re-renders innecesarios
- Para aplicaciones grandes con muchas dependencias, usar librerías DI dedicadas
- Evaluar cuándo usar singleton vs. instancias por componente

---

## 7. Comparación de Enfoques

| Enfoque | Pros | Contras |
|---------|------|----------|
| **Props** | Simple, explícito | Prop drilling en árboles profundos |
| **Context API** | Sin prop drilling, escalable | Puede causar re-renders si no se usa correctamente |
| **Awilix/Inversify/tsyringe** | Gestión centralizada, lifecycle avanzado | Más complejo, mayor overhead |

---

## 8. Recomendaciones

1. **Para proyectos pequeños**: Context API es suficiente
2. **Para proyectos medianos/grandes**: Considerar librerías DI
3. **Para testing**: Siempre inyectar dependencias (nunca hardcodear)
4. **Diseño**: Diseña componentes pensando en DI desde el inicio

**Librerías populares**:
- **Awilix**: Excelente integración con React, buena documentación
- **InversifyJS**: Muy popular, muchos features
- **tsyringe**: Ligero, mantenido por Microsoft

---

## 9. Service Layer Pattern (Capa de Servicios)

El Service Layer Pattern es una arquitectura que separa la lógica de negocio en servicios independientes, promoviendo DI y testabilidad.

```typescript
// services/api.ts
export class ApiService {
  private baseUrl: string;
  
  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }
  
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    return response.json();
  }
}

// serviceContainer.ts - Contenedor de servicios
const ServiceContext = createContext<{
  api: ApiService;
  logger: LoggerService;
} | null>(null);

function ServiceProvider({ children }) {
  const services = {
    api: new ApiService('/api'),
    logger: new LoggerService(),
  };
  
  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
}
```

---

## 10. Service Locator Pattern

Alternativa al DI tradicional: los componentes solicitan servicios a un locator centralizado.

```typescript
// serviceLocator.ts
class ServiceLocator {
  private services = new Map<string, unknown>();
  
  register<T>(key: string, instance: T): void {
    this.services.set(key, instance);
  }
  
  resolve<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) throw new Error(`Service ${key} not registered`);
    return service as T;
  }
}

export const serviceLocator = new ServiceLocator();
```

---

## 11. DI para Testing y Storybook

```tsx
// Mock via props para testing
function UserProfile({ useUser = useUserData }) {
  const { user, isLoading } = useUser();
  return isLoading ? <Spinner /> : <div>{user.name}</div>;
}

// En test
function mockUseUser() {
  return { user: { name: 'Test' }, isLoading: false };
}

render(<UserProfile useUser={mockUseUser} />);

// Storybook config
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, cacheTime: Infinity } },
});
```

---

## 12. Librerías de Estado como Alternativa a DI Tradicional

### Zustand (57.5k stars) - No requiere providers

```typescript
import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// Uso directo sin provider
function Profile() {
  const user = useStore((state) => state.user);
}
```

### Jotai (21.1k stars) - Estado atómico

```typescript
import { atom, useAtom } from 'jotai';

const countAtom = atom(0);
const doubledAtom = atom((get) => get(countAtom) * 2);

function Counter() {
  const [count] = useAtom(countAtom);
  const [doubled] = useAtom(doubledAtom);
}
```

---

## 13. Errores Comunes

| Error | Solución |
|-------|----------|
| Hardcodear `new ApiService()` | Usar inyección por props |
| No hacer cleanup en useEffect | Retornar función de cleanup |
| Un solo Context para todo | Dividir en múltiples contexts |
| No tipar dependencias | Usar interfaces TypeScript |

---

## 14. Cuándo usar cada enfoque

| Escenario | Enfoque |
|-----------|---------|
| App pequeña | Props + Context |
| App mediana | Service Layer + Context |
| App grande | Awilix/Inversify/tsyringe |
| Testing frecuente | Props injection |
| Estado simple | Zustand |
| Estado atómico | Jotai |

---

## Referencias

- [Dependency Injection in React: A Good Guide with Code Examples - Matthew Hill](https://medium.com/@matthill8286/dependency-injection-in-react-a-good-guide-with-code-examples-4afc8adc6cdb)
- [LogRocket: Dependency Injection in React](https://blog.logrocket.com/dependency-injection-react/)
- [Zustand Docs](https://zustand.docs.pmnd.rs/)
- [Jotai Docs](https://jotai.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- Documentación oficial de React Context
- Documentación de InversifyJS, Awilix y tsyringe
