# Tips Vitest + React

Estrategias al configurar Vitest en un ecosistema React.

---

## 1. Configuración de Entorno: `happy-dom` > `jsdom`
Por defecto Vitest usa `jsdom`, pero **`happy-dom`** es más rápido y tiene mejor soporte para APIs modernas del navegador.

```typescript
// vite.config.ts
export default defineConfig({
  test: {
    environment: 'happy-dom', // ⚡ Más rápido que jsdom
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

## 2. Setup Global Inteligente (El "Custom Render")
No importes `render` de `@testing-library/react` en cada test. Si usas Redux, React Query o ThemeProvider, tendrás que envolver tus componentes manualmente siempre.

**Crea un wrapper personalizado (`src/test/test-utils.tsx`):**

```typescript
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from '../store'

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false } }, // Evita reintentos en tests
  })
}

export function renderWithProviders(ui: React.ReactElement, options = {}) {
  const queryClient = createQueryClient()
  return render(ui, {
    wrapper: ({ children }) => (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </Provider>
    ),
    ...options,
  })
}
```
*Úsalo en todos tus tests de componentes para reducir boilerplate.*
*Tip: Crear un `QueryClient` nuevo por test evita que datos en cache persistan entre tests.*

## 3. Mocking de APIs: Usa MSW, no `vi.mock`
Mockear `axios` o `fetch` con `vi.mock` es frágil. Si cambias la URL o los headers, el test no te avisa.
**Experto usa [Mock Service Worker (MSW)](https://mswjs.io/).** Intercepta las peticiones a nivel de red.

*   **Ventaja:** Tu código React no sabe que está siendo mockeado.
*   **Config:** Inicia el servidor en `setupFiles` y resetéalo en `afterEach`.

```typescript
// src/test/setup.ts
import { setupServer } from 'msw/node'
import { handlers } from './mocks/handlers'

export const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers()) // Limpia mocks entre tests
afterAll(() => server.close())
```

*Ejemplo de handler con respuesta de error:*

```typescript
// src/test/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John Doe' },
    ])
  }),
  http.get('/api/users/:id', ({ params }) => {
    if (params.id === '999') {
      return HttpResponse.json({ error: 'User not found' }, { status: 404 })
    }
    return HttpResponse.json({ id: params.id, name: 'Jane Doe' })
  }),
]
```

## 4. Testing de Custom Hooks
No renderices un componente solo para testear un hook. Usa `renderHook`.

```typescript
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

it('incrementa el contador', () => {
  const { result } = renderHook(() => useCounter())
  
  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(1)
})
```
*Tip: Si tu hook usa contexto, pasa el `wrapper` de providers a `renderHook`.*

## 5. Evita Snapshots de Componentes Completos
**Anti-patrón:** `expect(container).toMatchSnapshot()`.
Si cambias un `div` por un `section`, el snapshot falla aunque la funcionalidad sea igual. Son frágiles y generan "ruido".

**Mejor práctica:**
*   Usa snapshots solo para objetos de datos serializables.
*   Testea **comportamiento**, no estructura HTML.
*   Si necesitas verificar estructura, usa queries de RTL (`getByRole`, `getByText`).

## 6. Manejo de Asincronía y "Act Warnings"
El error más común en React 18+ es el warning de `act`.

*   **Nunca** uses `setTimeout` manual para esperar renders.
*   **Usa** `waitFor` o los queries asíncronos (`findByText`).

```typescript
// ❌ Mal
setTimeout(() => { expect(...).toBe(...) }, 100)

// ✅ Bien
const submitButton = await screen.findByText('Enviar') // Espera hasta que aparezca
expect(submitButton).toBeDisabled()
```

*Para condiciones sin query dedicada, usa `waitFor`:*

```typescript
import { waitFor } from '@testing-library/react'

it('actualiza cuando llega data', async () => {
  render(<Dashboard />)

  await waitFor(() => {
    expect(screen.queryByText('Cargando...')).not.toBeInTheDocument()
  })

  expect(screen.getByText('Datos cargados')).toBeInTheDocument()
})
```

## 7. Type-Checking en los Tests
Vitest puede correr tus tests de tipos junto con los de lógica.

```json
// package.json
"scripts": {
  "test": "vitest",
  "test:types": "vitest --typecheck.only"
}
```
Esto asegura que si cambias una interfaz, los tests fallan si las props no coinciden, incluso antes de ejecutar el código.

## 8. Estructura de Archivos (Co-location)
No separes tests en una carpeta `__tests__` lejos del código. Ponlos junto al archivo.

```text
src/
  components/
    Button/
      Button.tsx
      Button.test.tsx  <-- Aquí
      Button.stories.tsx
      index.ts
```
*Beneficio:* Al refactorizar el componente, mueves la carpeta entera y el test no se "rompe" por rutas relativas.

## 9. Debugging Visual
Cuando un test falla, no adivines. Usa la utilidad `debug` de Testing Library dentro del test.

```typescript
it('muestra error', () => {
  render(<LoginForm />)
  screen.debug() // 👈 Imprime el DOM actual en la consola
  // ...
})
```
O usa el **Modo UI** de Vitest (`npm run test:ui`) para ver el DOM y los errores en tiempo real en el navegador.

## 10. Exclusión de Coverage
No inflés tu cobertura con archivos que no importan. Configura `vite.config.ts`:

```typescript
coverage: {
  exclude: [
    'src/main.tsx', // Punto de entrada
    'src/**/*.stories.tsx', // Storybook
    'src/**/*.test.tsx', // Los propios tests
    'src/vite-env.d.ts',
  ],
  thresholds: {
    lines: 80,
    functions: 80,
    branches: 70,
  },
}
```
*Los `thresholds` enforcean cobertura mínima y fallan el build si no se alcanzan.*

## 11. Paralelismo y Aislamiento
Vitest corre tests en paralelo por defecto.
*   **Cuidado:** No compartas estado global mutable (ej. una variable fuera del `describe`).
*   **Solución:** Si tienes tests que dependen de orden (ej. integración de base de datos local), usa `test.sequential` o corre ese archivo en modo single-thread (`--pool=forks`).

## 12. La Regla de Oro: Testing Library Mindset
> "Testea como lo usaría el usuario, no como está implementado."

*   ❌ `expect(component.state.isOpen).toBe(true)` (Implementación)
*   ✅ `expect(screen.getByText('Modal')).toBeVisible()` (Comportamiento)

Si refactorizas tu componente de `class` a `functional` o cambias librerías de estado, **el test no debería romperse** si el comportamiento visual es el mismo.

---

## 13. Interacciones Reales con `userEvent`
`fireEvent` es de bajo nivel. **`userEvent` simula interacciones reales** (teclado, hover, etc.):

```typescript
import userEvent from '@testing-library/user-event'

it('submit form', async () => {
  const user = userEvent.setup()
  render(<LoginForm />)

  await user.type(screen.getByLabelText('Email'), 'test@test.com')
  await user.click(screen.getByText('Enviar'))

  expect(screen.getByText('Bienvenido')).toBeInTheDocument()
})
```

## 14. Mocking de Timers
Para componentes con `setTimeout`, debounces, o animaciones:

```typescript
it('muestra toast después de 3s', async () => {
  vi.useFakeTimers()
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

  render(<Toast message="Guardado" />)

  vi.advanceTimersByTime(3000)

  expect(screen.getByText('Guardado')).toBeVisible()
  vi.useRealTimers() // Importante: restaurar al final
})
```

## 15. Testing de Error Boundaries
Error boundaries capturan errores en hijos. Para testearlos necesitas forzar el error:

```typescript
import { errorBoundaryApi } from 'test/utils'

it('muestra fallback cuando el hijo falla', () => {
  vi.spyOn(errorBoundaryApi, 'getChild').mockImplementation(() => {
    throw new Error('Error simulado')
  })

  render(<ErrorBoundary><Child /></ErrorBoundary>)
  expect(screen.getByText('Algo salió mal')).toBeInTheDocument()
})
```

## 16. Testing con React Router
Si tu componente usa `useNavigate` o `<Link>`, envuélvelo con `MemoryRouter`:

```typescript
import { MemoryRouter } from 'react-router-dom'

const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[route]}>
        {children}
      </MemoryRouter>
    ),
  })
}

it('navega a detalle', async () => {
  renderWithRouter(<ProductList />, { route: '/products' })

  await userEvent.click(screen.getByText('Ver detalles'))
  expect(screen.getByText('Página de detalle')).toBeInTheDocument()
})
```

## 17. Testing de Accesibilidad Automatizado
Añade checks automáticos de accesibilidad:

```typescript
import { expect, it } from 'vitest'
import AxeBuilder from '@axe-core/playwright'

it('no tiene violaciones de accesibilidad', async () => {
  const { container } = render(<MyComponent />)
  const results = await new AxeBuilder({ page: container }).analyze()
  expect(results).toHaveNoViolations()
})
```
*Ejecuta esto en componentes críticos para detectar problemas de aria, contraste, etc.*

## 18. Esperar Condiciones con `waitFor`
Para condiciones que no tienen query dedicada:

```typescript
import { waitFor } from '@testing-library/react'

it('actualiza cuando llega data', async () => {
  render(<Dashboard />)

  await waitFor(() => {
    expect(screen.queryByText('Cargando...')).not.toBeInTheDocument()
  })

  expect(screen.getByText('Datos loaded')).toBeInTheDocument()
})
```
*Útil cuando necesitas esperar a que desaparezca un loader o un elemento cambie de estado.*

---

### Bonus: Comando "Nuclear" para CI
En tu pipeline de CI, asegúrate de correr los tests así para evitar problemas de recursos y asegurar consistencia:

```bash
vitest run --pool=forks --coverage --reporter=verbose
```
*   `run`: Sin watch mode.
*   `pool=forks`: Mejor aislamiento en entornos CI.
*   `coverage`: Para reportes.
*   `verbose`: Para saber exactamente qué test falló sin buscar en el resumen.