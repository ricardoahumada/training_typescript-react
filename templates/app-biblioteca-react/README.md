# Caso 2r: Sistema de Biblioteca - Plantilla

## Instrucciones para el alumno

Esta plantilla es el punto de partida para configurar el **Sistema de Biblioteca** con React y Webpack.

### Tu misión (Anexo 3A - Ejercicio 14)

Configurar webpack y TypeScript para que esta aplicación React funcione.

### Archivos a completar

| Archivo | Estado | Tu tarea |
|---------|--------|----------|
| `webpack.config.js` | VACÍO | Configurar entry, output, loaders, plugins, devServer |
| `tsconfig.json` | INCOMPLETO | Configurar jsx, lib, module, strict, etc. |
| `package.json` | Solo deps | Instalar: `npm install` luego `npm install --save-dev webpack webpack-cli webpack-dev-server ts-loader css-loader style-loader html-webpack-plugin` |

### Pasos sugeridos

1. **Instalar dependencias**:
   ```bash
   npm install
   npm install --save-dev webpack webpack-cli webpack-dev-server ts-loader css-loader style-loader html-webpack-plugin
   ```

2. **Configurar `tsconfig.json`**: Activar JSX para React

3. **Configurar `webpack.config.js`**: Entry point, loaders, plugins

4. **Probar el build**:
   ```bash
   npm run build
   ```

5. **Iniciar desarrollo**:
   ```bash
   npm run dev
   ```

### Estructura del proyecto

```
caso2r-plantilla/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── BookCard.tsx
│   │   ├── BookList.tsx
│   │   ├── MemberPanel.tsx
│   │   └── LoanForm.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── styles.css
├── webpack.config.js   ← COMPLETAR
├── tsconfig.json       ← COMPLETAR
├── package.json
└── README.md
```

### Tipos del dominio (ya definidos)

- `Book`, `Member`, `Loan` - Entidades
- `Genre`, `MembershipType`, `LoanStatus` - Enums

### Componentes disponibles

- `BookCard` - Muestra info de un libro
- `BookList` - Lista de libros con lazy loading
- `MemberPanel` - Panel de socios
- `LoanForm` - Formulario para crear préstamos
