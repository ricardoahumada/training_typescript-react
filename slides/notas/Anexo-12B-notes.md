# Tips Playwright en Proyectos React

Recomendaciones que separan a un junior de un senior en automatización con React.

---

## 1. Estrategia de Selectores "React-Friendly"

En React, las clases CSS suelen ser generadas automáticamente (ej. `css-1a2b3c`) o cambian con el refactoring.

*   **Prioridad 1: Roles y Texto Visible.**
    React Accessibility es clave. Usa lo que el usuario ve.
    ```typescript
    // ✅ Bien
    page.getByRole('button', { name: 'Guardar cambios' });
    page.getByLabel('Correo electrónico');
    
    // ❌ Mal (Frágil ante cambios de diseño)
    page.locator('.MuiButton-root-123');
    ```
*   **Prioridad 2: `data-testid` (Con moderación).**
    Úsalo solo cuando no haya texto visible o roles únicos (ej. iconos solos, tarjetas complejas).
    ```tsx
    // En tu componente React
    <button data-testid="btn-delete-user">🗑️</button>
    
    // En tu test
    page.getByTestId('btn-delete-user');
    ```
    > **Tip Pro:** Activa `strictSelectors: true` en `playwright.config.ts`. Esto te obliga a usar selectores precisos y evita errores silenciosos.

## 2. Mocking de Red (Network Interception)

Las apps React dependen de APIs. Si tu backend falla o es lento, tus tests E2E fallan. **No testes el backend en tus tests de frontend.**

*   **Intercepta y Mockea:**
    Usa `page.route()` para controlar las respuestas. Esto hace los tests **deterministas** y **rápidos**.
    ```typescript
    test('muestra error si la API falla', async ({ page }) => {
      await page.route('**/api/user', async route => {
        await route.fulfill({ status: 500, body: 'Error Server' });
      });

      await page.goto('/perfil');
      await expect(page.getByText('Error al cargar')).toBeVisible();
    });
    ```
*   **Espera a la petición (No al timeout):**
    En lugar de esperar un tiempo fijo para que llegue la data, espera a que ocurra la petición de red.
    ```typescript
    const [request] = await Promise.all([
      page.waitForRequest('**/api/save'),
      page.click('#guardar')
    ]);
    expect(request.postDataJSON()).toMatchObject({ nombre: 'Juan' });
    ```

## 3. Gestión de Autenticación (Auth State)

Loguearse en cada test es lento y propenso a errores (CAPTCHAs, 2FA).

*   **Guarda el estado de sesión:**
    Usa `globalSetup` para loguearte una vez, guardar las cookies/localStorage en un archivo JSON, y cargarlo en cada test.
    ```typescript
    // playwright.config.ts
    export default defineConfig({
      globalSetup: require.resolve('./global-setup'),
      use: {
        storageState: 'storage-state.json', // Carga las cookies guardadas
      },
    });
    ```
    > **Beneficio:** Tus tests de flujo de usuario comienzan ya logueados, ahorrando segundos valiosos por test.

## 4. Manejo de Estados Asíncronos y Re-renderizados

React actualiza el DOM de forma asíncrona. Un elemento puede desaparecer y reaparecer (unmount/mount).

*   **Evita referencias antiguas al DOM:**
    Si guardas un locator en una variable y la página se re-renderiza, esa referencia puede quedar "stale" (obsoleta).
    ```typescript
    // ❌ Riesgoso en React dinámico
    const item = page.locator('.item').first();
    await page.click('#borrar'); // Re-renderiza la lista
    await item.click(); // Error: Elemento detached
    
    // ✅ Seguro (Playwright re-querya el DOM)
    await page.locator('.item').first().click(); 
    ```
*   **Esperas Inteligentes:**
    No uses `waitForLoadState('networkidle')` en SPAs React. Las conexiones de WebSocket o polling mantendrán el estado "busy" eternamente.
    **Mejor:** Espera a que el elemento específico aparezca.
    ```typescript
    await expect(page.getByText('Datos cargados')).toBeVisible();
    ```

## 5. Page Object Model (POM) Adaptado a Componentes

En React, piensa en **Componentes** más que en Páginas.

```typescript
// components/Header.ts
export class HeaderComponent {
  constructor(private page: Page) {}
  
  async goToProfile() {
    await this.page.getByRole('link', { name: 'Perfil' }).click();
  }
  
  async isLoggedIn() {
    return await this.page.getByTestId('user-avatar').isVisible();
  }
}

// tests/profile.spec.ts
test('usuario ve su perfil', async ({ page }) => {
  const header = new HeaderComponent(page);
  await header.goToProfile();
  // ...
});
```
> **Tip Pro:** Si usas Storybook, puedes integrar Playwright para testear tus componentes aislados (ver punto 7).

## 6. Testing de React Router

Asegúrate de que la navegación del lado del cliente funciona.

*   **Valida la URL, no solo el contenido:**
    ```typescript
    await page.click('a[href="/dashboard"]');
    await expect(page).toHaveURL('**/dashboard');
    // Y valida que el contenido cambió
    await expect(page.locator('h1')).toHaveText('Dashboard');
    ```
*   **Manejo de rutas protegidas:**
    Testea qué pasa si un usuario no logueado intenta entrar a `/admin`. Debería redirigir a `/login`.

## 7. Playwright Component Testing (CT)

Para lógica compleja de componentes React (ej. un DatePicker, un Formulario con validación compleja), **no uses E2E**. Usa **Component Testing**.

*   **Ventaja:** No necesitas levantar todo el backend ni navegar por toda la app.
*   **Configuración:** Playwright soporta Vite, Webpack, etc.
    ```typescript
    // tests/Button.spec.tsx
    import { test, expect } from '@playwright/experimental-ct-react';
    import { Button } from '../src/Button';

    test.use({ viewport: { width: 500, height: 500 } });

    test('renderiza con texto', async ({ mount }) => {
      const component = await mount(<Button>Click me</Button>);
      await expect(component).toContainText('Click me');
    });
    ```
    > **Regla:** Usa E2E para flujos críticos (Login -> Compra). Usa CT para componentes UI complejos.

## 8. Debugging de Hydration y Errores de Consola

React a veces tiene problemas de hidratación (mismatch entre SSR y Client).

*   **Captura errores de consola:**
    ```typescript
    page.on('console', msg => {
      if (msg.type() === 'error') console.log(`Error: ${msg.text()}`);
    });
    ```
*   **Trace Viewer es vital:**
    Si un test falla en CI, el Trace Viewer te mostrará el DOM exacto antes del fallo. En React, esto te ayuda a ver si un componente estaba en estado de "loading" o "error".

## 9. Optimización para CI/CD

*   **Sharding:** Divide tus tests en múltiples máquinas/workers.
    ```bash
    npx playwright test --shard=1/4
    ```
*   **Docker:** Usa la imagen oficial de Playwright para asegurar que los navegadores y fuentes sean idénticos a tu entorno de producción.
    ```dockerfile
    FROM mcr.microsoft.com/playwright:v1.40.0-jammy
    ```

## 10. No testes implementación, testea comportamiento

*   **Mal:** Verificar que se llamó a `useState` o que una clase CSS específica se aplicó.
*   **Bien:** Verificar que al hacer click, la información se guarda y el usuario recibe feedback visual.
    *   React es una implementación. El usuario no ve React, ve la UI. Si refactorizas de `class component` a `hooks`, tus tests E2E no deberían romperse.

## 11. Grabación de Videos y Screenshots en CI
Cuando un test falla en CI, necesitas investigar sin reproducir localmente.

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]],
})
```
*Los videos y screenshots se adjuntan al reporte HTML. Úsalo junto con Trace Viewer para debugging profundo.*

## 12. Playwright Request API para Testear APIs Directamente
No todo necesita pasar por el navegador. Valida tu API directamente.

```typescript
test('crea usuario vía API', async ({ request }) => {
  const response = await request.post('/api/users', {
    data: { name: 'Juan', email: 'juan@test.com' },
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.name).toBe('Juan');
});
```
*Útil para testear endpoints de manera aislada antes de testers E2E completos.*

## 13. Manejo de Modales Nativos (`dialog`, `alert`, `confirm`)
Los modales nativos son fácilmente ignorados en tests.

```typescript
test('maneja dialog de confirmación', async ({ page }) => {
  page.on('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toContain('¿Eliminar?');
    await dialog.accept(); // o dialog.dismiss()
  });

  await page.getByRole('button', { name: 'Eliminar' }).click();
  await expect(page.getByText('Item eliminado')).toBeVisible();
});
```

## 14. Accessibility Testing Automatizado con axe
Añade checks automáticos de accesibilidad a tus tests.

```typescript
import AxeBuilder from '@axe-core/playwright'

test('no tiene violaciones de accesibilidad', async ({ page }) => {
  await page.goto('/formulario');

  const accessibilityScanResults = await new AxeBuilder({ page })
    .include('form')
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
})
```
*Ejecuta esto en páginas críticas. Detecta problemas de aria, contraste, estructura de headings, etc.*

---
---

# Playwright en Proyectos React SSR (Next.js, Remix, etc.)

Tips específicos para SSR:

---

## 1. Verifica la "Hydration" (Hidratación)
El error más común en SSR es el **Hydration Mismatch** (el HTML del servidor no coincide con lo que React renderiza inicialmente en el cliente).

*   **Tip:** Escucha los errores de consola específicamente sobre hidratación.
*   **Por qué:** En CSR, un error de renderizado suele romper la UI. En SSR, la página se ve bien inicialmente, pero la interactividad falla silenciosamente.
*   **Código:**
    ```typescript
    test('no tiene errores de hidratación', async ({ page }) => {
      let hydrationError = false;
      page.on('console', msg => {
        if (msg.text().includes('Hydration failed') || msg.text().includes('text-content-mismatch')) {
          hydrationError = true;
        }
      });

      await page.goto('/');
      await expect(hydrationError).toBe(false);
    });
    ```

## 2. Testea con JavaScript Desactivado (La prueba definitiva)
El propósito del SSR es entregar contenido sin depender del JS inicial.

*   **Tip:** Crea un suite de "Smoke Tests" que desactive JavaScript.
*   **Por qué:** Si tu sitio depende del SSR para SEO o accesibilidad, debería mostrar el contenido principal incluso sin JS.
*   **Configuración:**
    ```typescript
    // playwright.config.ts
    projects: [
      {
        name: 'chromium-no-js',
        use: { ...devices['Desktop Chrome'], javaScriptEnabled: false },
      },
    ]
    ```
    ```typescript
    // tests/ssr.spec.ts
    test('el contenido principal carga sin JS', async ({ page }) => {
      await page.goto('/blog/post-1');
      // Esto valida que el HTML vino del servidor, no inyectado por React
      await expect(page.locator('h1')).toContainText('Título del Post');
    });
    ```

## 3. Aserciones en el HTML Inicial (Antes de la Hidratación)
En CSR, esperas a que el DOM se pinte. En SSR, el contenido ya está en el HTML crudo.

*   **Tip:** Usa `page.content()` o aserciones inmediatas para validar que el servidor envió los datos correctos.
*   **Por qué:** Te asegura que tu lógica de `getServerSideProps` (Next.js) o `loader` (Remix) está funcionando, no solo la lógica del cliente.
    ```typescript
    test('el servidor envía los meta tags correctos', async ({ page }) => {
      await page.goto('/producto/123');
      
      // No esperes a que React cargue, valida el HTML crudo
      const html = await page.content();
      expect(html).toContain('<meta name="description" content="Producto barato" />');
      
      // O usa locators estándar que ya están en el DOM
      await expect(page.locator('h1')).toBeVisible(); // Visible inmediatamente
    });
    ```

## 4. Validación de Códigos de Estado HTTP (Status Codes)
En una SPA, un "404" suele ser una ruta que renderiza un componente visualmente parecido a un error, pero el status HTTP sigue siendo 200. En SSR, el servidor **debe** devolver el status correcto.

*   **Tip:** Captura la respuesta de `page.goto()` y valida el status.
*   **Por qué:** Crucial para SEO. Google penaliza soft-404s.
    ```typescript
    test('devuelve 404 real para rutas inexistentes', async ({ page }) => {
      const response = await page.goto('/ruta-que-no-existe');
      expect(response?.status()).toBe(404);
      await expect(page.locator('h1')).toHaveText('Página no encontrada');
    });
    ```

## 5. Cookies y Headers ANTES de la Navegación
En SSR, la autenticación y el renderizado condicional suelen ocurrir **en el servidor**. Si sets las cookies después de cargar la página, el servidor ya envió el HTML "no logueado".

*   **Tip:** Inyecta el estado de autenticación en el contexto del navegador **antes** del `goto`.
    ```typescript
    test('renderiza dashboard si hay cookie de sesión', async ({ context }) => {
      // Añade la cookie que el servidor leerá
      await context.addCookies([{
        name: 'session-token',
        value: 'abc-123',
        domain: 'localhost',
        path: '/'
      }]);

      const page = await context.newPage();
      await page.goto('/dashboard'); // El servidor verá la cookie y renderizará el HTML privado
      
      await expect(page.locator('h1')).toHaveText('Bienvenido al Dashboard');
    });
    ```

## 6. Manejo de Streaming y Suspense (Next.js App Router)
El SSR moderno (React 18+) usa **Streaming HTML**. El servidor envía partes de la página en chunks mientras espera datos lentos.

*   **Tip:** No uses `waitForLoadState('load')` o `networkidle` ciegamente. Pueden dispararse antes de que el contenido dinámico llegue por el stream.
*   **Estrategia:** Espera a elementos específicos que indican que el stream completó.
    ```typescript
    test('el contenido suspendido aparece eventualmente', async ({ page }) => {
      await page.goto('/dashboard-lento');
      
      // El skeleton loader aparece primero (SSR)
      await expect(page.locator('.skeleton')).toBeVisible();
      
      // Espera a que el contenido real reemplace al skeleton (Stream completo)
      await expect(page.locator('.datos-reales')).toBeVisible();
    });
    ```

## 7. Mocking es más complejo (Server-side Fetching)
En CSR, interceptas la petición del navegador (`page.route`). En SSR, la petición la hace el **servidor Node.js**, no el navegador. Playwright no puede interceptar fácilmente lo que ocurre dentro del proceso del servidor.

*   **Tip:**
    1.  **E2E Real:** Para tests críticos, usa una base de datos de test real o seeds.
    2.  **Mocking en Servidor:** Si necesitas mockear, usa variables de entorno para apuntar tu servidor a un API mock (ej. MSW en modo servidor o un servidor fake) antes de iniciar el proceso de Next.js/Remix.
    3.  **No confíes en `page.route`** para datos que vienen de `getServerSideProps`.

## 8. Métricas de Performance (Core Web Vitals)
El SSR existe principalmente para mejorar el **LCP (Largest Contentful Paint)**.

*   **Tip:** Usa la API de Performance de Playwright para validar que el SSR está mejorando los tiempos.
    ```typescript
    test('el LCP es menor a 2.5s gracias al SSR', async ({ page }) => {
      await page.goto('/');
      const metrics = await page.metrics(); // O usa performance API
      
      // Playwright tiene soporte experimental para trace de performance
      // Pero puedes medir el tiempo de respuesta inicial
      const start = Date.now();
      await page.goto('/');
      const loadTime = Date.now() - start;
      
      expect(loadTime).toBeLessThan(2000); 
    });
    ```
    > **Nota:** Para métricas reales de Web Vitals, integra `web-vitals` en tu app y envía los datos a un endpoint que puedas testear, o usa herramientas como Lighthouse CI junto a Playwright.

## 9. Redirecciones del Servidor vs. Cliente
En SSR, una redirección de autenticación suele ser un **307/302 HTTP**. En CSR, es un `router.push()` (status 200, cambia la URL en el cliente).

*   **Tip:** Valida que las redirecciones protegidas sean HTTP redirects.
    ```typescript
    test('redirige por HTTP si no hay auth', async ({ page }) => {
      let redirectUrl = '';
      page.on('response', response => {
        if (response.status() >= 300 && response.status() < 400) {
          redirectUrl = response.headers()['location'];
        }
      });
      
      await page.goto('/admin');
      expect(redirectUrl).toContain('/login');
    });
    ```

## 10. Imágenes y Optimización (Next/Image)
Los componentes de imagen de SSR (como `<Image />` de Next.js) generan HTML complejo con `srcset` y placeholders.

*   **Tip:** No valides el `src` directo si usas optimización de imágenes, ya que cambia según el dispositivo.
*   **Estrategia:** Valida el atributo `alt` (accesibilidad) y que la imagen sea visible, no la URL exacta.
    ```typescript
    // ✅ Bien
    await expect(page.locator('img[alt="Producto"]')).toBeVisible();

    // ❌ Mal (La URL puede tener hashes o parámetros de optimización)
    await expect(page.locator('img')).toHaveAttribute('src', '/img/producto.jpg');
    ```

## 11. Testing de Server Actions (Next.js 13+ App Router)
Las Server Actions se ejecutan en el servidor. Para testearlas, necesitas invocar la acción directamente.

```typescript
import { actions } from '@/app/actions'

test('crea usuario via server action', async () => {
  const formData = new FormData()
  formData.set('name', 'Juan')
  formData.set('email', 'juan@test.com')

  const result = await actions.createUser(formData)

  expect(result.success).toBe(true)
  expect(result.data.name).toBe('Juan')
})
```
*Para E2E, verifica que la UI se actualiza después de llamar a la server action.*

## 12. Validación de Cache Headers y ETag
El caching es crítico en SSR. Valida que el servidor envía headers correctos.

```typescript
test('respuesta tiene cache headers apropiados', async ({ page }) => {
  const response = await page.goto('/pagina-estatica')

  const cacheControl = response.headers()['cache-control']
  expect(cacheControl).toContain('public')
  // Páginas estáticas deberían tener max-age largo
  expect(cacheControl).toMatch(/max-age=\d+/)

  // Para contenido dinámico, no debería ser cacheable
  const dynamicResponse = await page.goto('/dashboard')
  const dynamicCache = dynamicResponse.headers()['cache-control']
  expect(dynamicCache).not.toContain('public')
})
```

## 13. Prefetch y Link Hover en Next.js
En Next.js, los links hacen prefetch cuando haces hover. Esto afecta el timing de navegación.

```typescript
test('navegación es instantánea por prefetch', async ({ page }) => {
  // Hover sobre el link para disparar prefetch
  await page.locator('a[href="/productos"]').hover()
  await page.waitForTimeout(100) // Dar tiempo al prefetch

  const start = Date.now()
  await page.click('a[href="/productos"]')
  const navigationTime = Date.now() - start

  // Navegación debería ser casi instantánea si el prefetch funcionó
  expect(navigationTime).toBeLessThan(500)
})
```
*Si tienes navegación lenta, verifica que el prefetch no esté deshabilitado o que la red no esté limitada.*

---
---

# Visual Regression Testing (VRT) en React SSR

Hacer Visual Regression Testing en una aplicación **Server-Side Rendered (SSR)** (Next.js, Remix, Astro, etc.) es significativamente más complejo que en una SPA tradicional. El servidor envía HTML inicial, luego el cliente hidrata, y a menudo hay **streaming** de componentes.

---

## 1. El Problema del Streaming (Next.js App Router / Suspense)
En SSR moderno, el HTML llega en "chunks" (trozos). Si haces el screenshot apenas carga la página, capturarás los **Skeleton Loaders** o estados de carga, no el contenido final.

*   **El Tip:** No confíes en `loadState('load')`. Espera a que los componentes suspendidos se resuelvan.
*   **Implementación:**
    ```typescript
    test('dashboard completo tras streaming', async ({ page }) => {
      await page.goto('/dashboard');
      
      // ❌ Mal: Podría capturar el skeleton
      // await expect(page).toHaveScreenshot('dashboard.png'); 
      
      // ✅ Bien: Espera a que el contenido real esté visible
      await expect(page.locator('.datos-financieros')).toBeVisible();
      
      // Pequeña pausa para asegurar que las animaciones de entrada terminaron
      await page.waitForTimeout(500); 
      
      await expect(page).toHaveScreenshot('dashboard-final.png');
    });
    ```

## 2. Estabilidad de Fuentes (FOUT/FOIT)
El servidor envía HTML inmediatamente, pero las fuentes web (Google Fonts, etc.) se descargan en el cliente. Esto causa **FOUT** (Flash of Unstyled Text) o cambios de layout cuando la fuente carga.

*   **El Tip:** Espera explícitamente a que las fuentes estén listas antes de capturar.
*   **Implementación:**
    ```typescript
    test('fuentes cargadas correctamente', async ({ page }) => {
      await page.goto('/');
      
      // Espera a que todas las fuentes estén listas
      await page.evaluate(() => document.fonts.ready);
      
      await expect(page).toHaveScreenshot('typography.png');
    });
    ```
    > **Nota:** Sin esto, tu test fallará intermitentemente dependiendo de la caché del navegador o la velocidad de red en CI.

## 3. Imágenes Optimizadas (Next/Image, Remix Image)
Los componentes de imagen en SSR suelen usar **lazy loading** o placeholders (blur-up). Un test visual puede capturar el placeholder borroso en lugar de la imagen real.

*   **El Tip:** Espera a que las imágenes tengan el atributo `complete` o estén visibles realmente.
*   **Implementación:**
    ```typescript
    test('imágenes cargadas sin placeholders', async ({ page }) => {
      await page.goto('/gallery');
      
      const img = page.locator('img[src*="producto"]');
      
      // Espera a que la imagen haya terminado de cargar en el cliente
      await expect(img).toBeVisible();
      await page.waitForFunction(() => {
        const imgEl = document.querySelector('img[src*="producto"]') as HTMLImageElement;
        return imgEl && imgEl.complete;
      });
      
      await expect(page).toHaveScreenshot('gallery.png');
    });
    ```

## 4. Mocking de Datos en SSR (El desafío mayor)
En una SPA, usas `page.route()` para mockear APIs. **En SSR, la petición la hace el servidor Node.js**, no el navegador. `page.route()` **NO interceptará** las llamadas que hace `getServerSideProps` o `Server Components`.

*   **El Tip:** Para VRT consistente, necesitas datos deterministas.
    1.  **Opción A (Seed DB):** Prepara tu base de datos de test con datos fijos antes de correr los tests.
    2.  **Opción B (Mock Server):** Levanta un servidor API mock (ej. MSW en modo servidor o WireMock) y apunta tu app SSR a él mediante variables de entorno (`API_URL`).
    3.  **Opción C (Middleware):** Si usas Next.js, usa middleware para inyectar datos falsos en las respuestas del servidor durante los tests.
*   **Por qué:** Si el SSR trae la fecha de hoy o un usuario aleatorio, el screenshot siempre será diferente.

## 5. Detectar Hydration Shifts (CLS)
A veces el HTML del servidor y el React del cliente no coinciden exactamente en dimensiones, causando un **Layout Shift** justo después de la hidratación.

*   **El Tip:** Toma dos screenshots. Uno inmediato (HTML puro) y otro tras la hidratación. O valida que no haya saltos.
*   **Implementación:**
    ```typescript
    test('sin layout shift tras hidratación', async ({ page }) => {
      await page.goto('/producto');
      
      // Captura estado inicial (SSR)
      // (Opcional, para debug)
      
      // Espera hidratación (React se conecta)
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
      
      // Valida que el elemento clave no se movió bruscamente
      // (Playwright no mide CLS nativamente en VRT, pero puedes validar posición)
      const box = await page.locator('h1').boundingBox();
      expect(box?.y).toBeLessThan(100); // Ejemplo simple
    });
    ```
    > **Recomendación:** Usa **Lighthouse CI** junto a Playwright para medir CLS real, ya que VRT solo compara píxeles estáticos.

## 6. Control del Esquema de Color (Dark/Light Mode)
El SSR puede detectar las preferencias del sistema (`prefers-color-scheme`) y renderizar HTML diferente (clases `dark` en el `<html>`). Tu CI (Linux) podría tener una configuración diferente a tu Mac/Windows local.

*   **El Tip:** Fuerza el esquema de color en el contexto de Playwright.
*   **Configuración (`playwright.config.ts`):**
    ```typescript
    use: {
      colorScheme: 'light', // O 'dark', pero sé consistente
      // ...
    },
    ```
*   **Por qué:** Si no lo fuerzas, un test puede pasar en tu local (modo oscuro) y fallar en CI (modo claro), generando diffs masivos.

## 7. Enmascarar Contenido Dinámico del Servidor
El SSR suele incluir datos que cambian constantemente: footers con copyright año, mensajes de "Última actualización: hace 5 min", banners de promociones temporales.

*   **El Tip:** Usa la opción `mask` de `toHaveScreenshot` para ignorar esas zonas.
    ```typescript
    test('home sin fechas dinámicas', async ({ page }) => {
      await page.goto('/');
      
      await expect(page).toHaveScreenshot('home.png', {
        mask: [
          page.locator('.fecha-actualizacion'),
          page.locator('.banner-promo-temporal'),
          page.locator('footer .copyright-year')
        ],
      });
    });
    ```

## 8. Viewport Consistente en SSR
Algunas soluciones SSR (como imágenes responsivas o CSS crítico) sirven recursos diferentes según el **User-Agent** o el ancho de ventana detectado en el servidor.

*   **El Tip:** Define el `viewport` explícitamente en el test, no confíes en el default.
    ```typescript
    test('mobile view', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/'); 
      // El servidor podría haber enviado CSS móvil basado en headers si configuraste detección
      await expect(page).toHaveScreenshot('mobile.png');
    });
    ```

## 9. Docker es Obligatorio para SSR VRT
Las fuentes del sistema y el renderizado de fuentes varían entre macOS, Windows y Linux. En SSR, el HTML depende de esto para calcular layouts iniciales.

*   **El Tip:** Ejecuta los tests de VRT **siempre** en el contenedor Docker oficial de Playwright, incluso en local si es posible.
    ```bash
    # No corras VRT en tu Mac local para comparar con CI
    docker run --rm --network host -v $(pwd):/work/ -w /work/ mcr.microsoft.com/playwright:v1.40.0-jammy npx playwright test
    ```
    > **Regla:** Si el diff es menor al 1% y solo ocurre entre OS, es un problema de renderizado de fuentes. Usa Docker para eliminar esta variable.

## 10. Estrategia Híbrida: Componentes vs. Páginas
En SSR, testear toda la página es lento y frágil.

*   **El Tip:** Usa **Playwright Component Testing** para componentes UI aislados (botones, cards) y **E2E VRT** solo para layouts críticos (Header, Footer, Grids principales).
*   **Por qué:** Los componentes aislados no sufren de problemas de hidratación complejos ni fetching de datos del servidor, haciendo el VRT más rápido y estable.
