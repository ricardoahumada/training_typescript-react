# TSC - Resumen de Parámetros Importantes

### Parámetros Esenciales (siempre usar)

| Parámetro | Descripción | Valor Recomendado |
|-----------|-------------|------------------|
| `strict` | Habilita verificaciones estrictas de tipos | `true` |
| `target` | Versión de JavaScript destino | `ES2020` |
| `outDir` | Carpeta de salida para archivos compilados | `dist` |
| `rootDir` | Carpeta raíz del código fuente | `src` |

### Parámetros Recomendados (proyectos profesionales)

| Parámetro | Descripción | Valor Recomendado |
|-----------|-------------|------------------|
| `module` | Sistema de módulos del output | `CommonJS` (Node) o `ESNext` (bundlers) |
| `lib` | Bibliotecas de tipos disponibles | Depende del entorno |
| `esModuleInterop` | Mejora interoperabilidad ES Modules | `true` |
| `forceConsistentCasingInFileNames` | Evita errores de mayúsculas | `true` |
| `skipLibCheck` | Omite verificación de tipos en librerías | `true` |
| `noUnusedLocals` | Detecta variables no usadas | `true` |
| `noUnusedParameters` | Detecta parámetros no usados | `true` |
| `incremental` | Compilación incremental | `true` (proyectos grandes) |

### Parámetros Opcionales (casos específicos)

| Parámetro | Descripción | Cuando Usarlo |
|-----------|-------------|--------------|
| `noEmit` | Solo verifica tipos, no genera .js | CI/CD, con bundlers |
| `declaration` | Genera archivos .d.ts | Al publicar paquetes npm |
| `sourceMap` | Genera mapas de debugging | Desarrollo |
| `moduleResolution` | Estrategia de resolución de imports | Módulos especiales |

### Uso en Línea de Comandos

La mayoría de parámetros pueden usarse como flags al invocar `tsc`:

```bash
# Verificación de tipos sin compilar (ideal para CI)
tsc --noEmit

# Compilación normal
tsc

# Modo watch (recompila al cambiar archivos)
tsc --watch

# Con parámetros en línea
tsc --strict --forceConsistentCasingInFileNames --noEmit
```

**Nota**: Los parámetros `include`, `exclude` y `extends` solo funcionan en `tsconfig.json`, no en línea.