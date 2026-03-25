# tsconfig.json y webpack.config.js

Ambos archivos definen cómo se procesa el código TypeScript/React, pero tienen responsabilidades diferentes y a veces contradictorias.

### El Flujo de Invocación

```
tsconfig.json ──→ webpack.config.js
      │                  │
      │    1. Webpack lee tsconfig via ts-loader o esbuild-loader
      │                  │
      └──────────────────┴──→ El loader usa la config de TS para:
                              - Validar tipos (noEmit)
                              - Resolver módulos (moduleResolution)
                              - Transformar JSX (jsx)
                              - Compilar a JS destino (target)
```

**Paso a paso**:
1. Webpack inicia y lee `webpack.config.js`
2. Encuentra archivos `.ts`/`.tsx` y los pasa a `ts-loader` o `esbuild-loader`
3. El loader lee `tsconfig.json` para saber cómo compilar
4. TypeScript compila a JavaScript (sin emitir archivos, solo transforma en memoria)
5. Webpack continúa con el JavaScript resultante

### Puntos de Fricción y Conflictos

| Aspecto | tsconfig.json | webpack.config.js | Conflicto potencial |
|---------|---------------|-------------------|-------------------|
| **Módulo destino** | `module: "ESNext"` | `output.library.type: "umd"` | Webpack puede reclamar si el output no es compatible |
| **Target de JS** | `target: "ES5"` | `browserslist` | Pueden contradecirse - TS compila a ES5 pero webpack/babel puede transformar más |
| **Resolver paths** | `paths: { "@/*": ["./src/*"] }` | `resolve.alias: { "@": path.resolve(__dirname, "src") }` | **SÍ HAY CONFLICTO** - Deben coincidir o los imports fallan |
| **Extensions** | (no tiene) | `resolve.extensions: [".tsx", ".ts", ".js"]` | Webpack ignora tsconfig aquí |
| **noEmit** | `noEmit: true` | **REQUERIDO** | Si `noEmit: false`, webpack puede recibir archivos .ts en output |
| **jsx** | `jsx: "react-jsx"` | `loader: "tsx"` | Deben ser coherentes |

### Conflictos Críticos y Cómo Resolverlos

**1. `noEmit: true` vs webpack**

```json
// tsconfig.json - INCORRECTO para webpack
{
  "compilerOptions": {
    "noEmit": false  // ❌ TypeScript intentará escribir archivos .js
  }
}
```

```json
// tsconfig.json - CORRECTO para webpack
{
  "compilerOptions": {
    "noEmit": true  // ✅ TypeScript solo transforma en memoria
  }
}
```

**2. `paths` en tsconfig vs `alias` en webpack**

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

```javascript
// webpack.config.js - DEBEN COINCIDIR
resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src')  // ✅ Coincide con paths de tsconfig
  }
}
```

**⚠️ Si no coinciden**: Los imports en código funcionarán en IDE pero fallarán en webpack.

**3. `module` en tsconfig vs `library.type` en webpack**

```json
// tsconfig.json
{
  "compilerOptions": {
    "module": "ESNext"  // ✅ Compatible con webpack 5
  }
}
```

```javascript
// webpack.config.js
output: {
  library: {
    type: 'umd'  // ⚠️ Puede causar conflicto si module es ESNext
  }
}
```

**Recomendación**: Usar `module: "ESNext"` y dejar que webpack maneje el output.

**4. `target` y `browserslist`**

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020"
  }
}
```

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'esbuild-loader',
          options: {
            target: 'es2020'  // ✅ Debe coincidir con tsconfig
          }
        }
      }
    ]
  }
};
```

### Qué Se Sobrescribe Mutuamente

| tsconfig.json | webpack.config.js | Quién gana |
|--------------|-------------------|------------|
| `paths` | `resolve.alias` | **webpack** - los alias de webpack son los que importan en runtime |
| `jsx` | loader específico | **ts-loader/esbuild** - transformado según su configuración |
| `target` | loader `target` | **loader** - el loader decide el JS output final |
| `module` | `output.library.type` | **webpack** - webpack decide el formato del bundle |
| `strict` | (nada) | **tsconfig** - webpack no toca los tipos |

### Cuidados Específicos

1. **Siempre usar `noEmit: true`** en tsconfig cuando se usa con webpack
2. **Mantener `paths` y `alias` sincronizados** - el IDE puede funcionar pero webpack fallar
3. **Verificar que `target` del loader coincide** con `target` de tsconfig
4. **No usar `outDir` ni `outFile`** - webpack maneja el output
5. **Si usas `ts-loader`** con `transpileOnly: true`, pierdes chequeo de tipos en build - usa `esbuild-loader` para velocidad sin perder tipos
6. **`isolatedModules: true`** es compatible con webpack (requerido si hay exports tipos)

### FAQ Adicional

- **P: ¿Puedo usar tsconfig.json sin webpack?** R: Sí, pero pierdes bundling, tree shaking, y HMR.
- **P: ¿Webpack ignora completamente tsconfig?** R: No completamente. Los loaders (ts-loader, esbuild-loader) leen y respetan muchas opciones de tsconfig.
- **P: ¿Puedo tener dos tsconfig para dev y prod?** R: Sí, usa `tsconfig.json` para base y `tsconfig.prod.json` que extiende. webpack puede usar `--config` flag.
- **P: ¿Por qué mi código funciona en dev pero falla en prod?** R: Verificar que `mode` de webpack y `target` en tsconfig son consistentes entre entornos.